/* ═══════════════════════════════════════════
   app.js — Main application logic
═══════════════════════════════════════════ */

// ── State ──────────────────────────────────
const APP = {
  page: 'landing',
  step: 1,
  framework: null,
  intake: {},
  generatedPrompt: '',
  generating: false,
};

// ── Boot ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  startTerminalDemo();
  buildCatalog();
  setupFilterButtons();
  setupFrameworkRadios();
  updateAuthNav();

  // Auto-restore session
  const client = LP_STORE.getCurrentClient();
  if (client) updateAuthNav(client);

  // Deep link from catalog cards
  document.querySelectorAll('[data-fw-select]').forEach(el => {
    el.addEventListener('click', () => selectFramework(el.dataset.fwSelect));
  });
});

// ── Navigation ─────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById('page-' + id);
  if (t) { t.classList.add('active'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  APP.page = id;
  if (id === 'catalog')   buildCatalog();
  if (id === 'dashboard') buildDashboard();
}

function requireAuth(then) {
  if (LP_STORE.getCurrentClient()) { then(); return; }
  openAuthModal('login', then);
}

// ── Auth Nav ───────────────────────────────
function updateAuthNav(client) {
  const c = client || LP_STORE.getCurrentClient();
  const el = document.getElementById('nav-auth-area');
  if (!el) return;
  if (c) {
    const plan = c.plan === 'free' ? `Free · ${LP_STORE.getFreeRemaining()}/${LP_STORE.FREE_LIMIT}` : c.plan.charAt(0).toUpperCase() + c.plan.slice(1);
    el.innerHTML = `
      <span class="nav-user-name">${c.name.split(' ')[0]}</span>
      <span class="nav-plan-badge ${c.plan}">${plan}</span>
      <button class="nav-link-btn" onclick="showPage('dashboard')">Dashboard</button>
      <button class="nav-link-btn" onclick="doLogout()">Sign out</button>
    `;
  } else {
    el.innerHTML = `
      <button class="nav-link-btn" onclick="openAuthModal('login')">Sign in</button>
      <button class="nav-cta" onclick="openAuthModal('register')">Get Started Free</button>
    `;
  }
}

function doLogout() {
  LP_STORE.logout();
  updateAuthNav();
  showPage('landing');
}

// ── Auth Modal ─────────────────────────────
let authCallback = null;

function openAuthModal(mode, cb) {
  authCallback = cb || null;
  const modal = document.getElementById('auth-modal');
  modal.classList.add('open');
  switchAuthMode(mode);
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('open');
  authCallback = null;
}

function switchAuthMode(mode) {
  document.getElementById('auth-login-form').style.display  = mode === 'login'    ? 'block' : 'none';
  document.getElementById('auth-register-form').style.display = mode === 'register' ? 'block' : 'none';
  document.getElementById('auth-modal-title').textContent = mode === 'login' ? 'Sign In' : 'Create Free Account';
  document.getElementById('auth-switch-text').innerHTML =
    mode === 'login'
      ? `No account? <a onclick="switchAuthMode('register')">Create one free →</a>`
      : `Already have an account? <a onclick="switchAuthMode('login')">Sign in →</a>`;
  clearAuthErrors();
}

function clearAuthErrors() {
  document.querySelectorAll('.auth-error').forEach(e => e.textContent = '');
}

function doLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value;
  const result   = LP_STORE.login(email, password);
  if (result.error) {
    document.getElementById('login-error').textContent = result.error;
    return;
  }
  closeAuthModal();
  updateAuthNav(result.client);
  if (authCallback) authCallback();
  else showPage('dashboard');
}

function doRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-pass').value;
  if (!name)          { document.getElementById('reg-error').textContent = 'Please enter your name.'; return; }
  if (password.length < 6) { document.getElementById('reg-error').textContent = 'Password must be at least 6 characters.'; return; }
  const result = LP_STORE.register(name, email, password);
  if (result.error) { document.getElementById('reg-error').textContent = result.error; return; }
  closeAuthModal();
  updateAuthNav(result.client);
  if (authCallback) authCallback();
  else showPage('dashboard');
}


// ── Dashboard ──────────────────────────────
function buildDashboard() {
  requireAuth(() => {
    const client  = LP_STORE.getCurrentClient();
    const prompts = LP_STORE.getClientPrompts();
    const count   = LP_STORE.getPromptCount();
    const rem     = LP_STORE.getFreeRemaining();
    const pct     = Math.min(100, Math.round((count / LP_STORE.FREE_LIMIT) * 100));

    document.getElementById('dash-name').textContent    = client.name;
    document.getElementById('dash-email').textContent   = client.email;
    document.getElementById('dash-plan').textContent    = client.plan === 'free' ? 'Free Plan' : client.plan;
    document.getElementById('dash-count').textContent   = count;
    document.getElementById('dash-rem').textContent     = client.plan === 'free' ? rem + ' remaining' : 'Unlimited';
    document.getElementById('usage-bar-fill').style.width = (client.plan === 'free' ? pct : 100) + '%';
    document.getElementById('usage-bar-fill').className = 'usage-fill ' + (pct >= 90 ? 'danger' : pct >= 70 ? 'warn' : '');

    // History list
    const histEl = document.getElementById('dash-history');
    if (!prompts.length) {
      histEl.innerHTML = '<div class="empty-state">No prompts generated yet. <a onclick="showPage(\'form\')">Build your first →</a></div>';
    } else {
      histEl.innerHTML = prompts.slice(0, 20).map(p => `
        <div class="history-item" onclick="viewHistoryPrompt('${p.id}')">
          <div class="hi-left">
            <div class="hi-fw">${p.framework}</div>
            <div class="hi-meta">${p.industry || ''} · ${formatDate(p.createdAt)}</div>
          </div>
          <button class="hi-copy" onclick="event.stopPropagation();copyPrompt('${p.id}')">Copy</button>
        </div>
      `).join('');
    }

    // Pre-fill profile section
    const profile = LP_STORE.getProfile();
    if (profile.industry) document.getElementById('dash-pref-industry').value = profile.industry;
    if (profile.size)     document.querySelectorAll(`input[name="dash-size"][value="${profile.size}"]`).forEach(r => r.checked = true);
  });
}

function viewHistoryPrompt(promptId) {
  const prompts = LP_STORE.getClientPrompts();
  const p = prompts.find(x => x.id === promptId);
  if (!p) return;
  document.getElementById('history-modal-fw').textContent = p.framework;
  document.getElementById('history-modal-date').textContent = formatDate(p.createdAt);
  document.getElementById('history-modal-content').textContent = p.content;
  document.getElementById('history-modal').classList.add('open');
}

function closeHistoryModal() {
  document.getElementById('history-modal').classList.remove('open');
}

function copyPrompt(promptId) {
  const prompts = LP_STORE.getClientPrompts();
  const p = prompts.find(x => x.id === promptId);
  if (!p) return;
  navigator.clipboard.writeText(p.content).then(() => showToast('Prompt copied to clipboard.'));
}

function copyCurrentPrompt() {
  navigator.clipboard.writeText(APP.generatedPrompt).then(() => showToast('Prompt copied to clipboard.'));
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Form ────────────────────────────────────
function selectFramework(fw) {
  APP.framework = fw;
  const r = document.querySelector(`input[name="framework"][value="${fw}"]`);
  if (r) r.checked = true;
  requireAuth(() => { showPage('form'); goToStep(1); });
}

function goToStep(n) {
  if (n === 2 && !validateStep1()) return;
  if (n === 3 && !validateStep2()) return;
  APP.step = n;
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  const step = document.getElementById('step-' + n);
  if (step) step.classList.add('active');
  document.querySelectorAll('.prog-step').forEach(s => {
    const num = parseInt(s.dataset.step);
    s.classList.remove('active', 'done');
    if (num === n) s.classList.add('active');
    if (num < n)   s.classList.add('done');
  });
  window.scrollTo({ top: 0 });
}

function validateStep1() {
  const fw = document.querySelector('input[name="framework"]:checked');
  if (!fw) { showToast('Please select a framework.', 'error'); return false; }
  APP.framework = fw.value;
  return true;
}
function validateStep2() {
  const industry = document.getElementById('industry').value;
  const size     = document.querySelector('input[name="size"]:checked');
  const jx       = document.querySelectorAll('#jurisdictions input:checked');
  if (!industry) { showToast('Please select your industry.', 'error'); return false; }
  if (!size)     { showToast('Please select company size.', 'error'); return false; }
  if (!jx.length){ showToast('Please select at least one jurisdiction.', 'error'); return false; }
  return true;
}

function setupFrameworkRadios() {
  document.querySelectorAll('input[name="framework"]').forEach(r => {
    r.addEventListener('change', () => {
      const ci = document.getElementById('custom-framework-input');
      if (r.value === 'custom') ci.style.display = 'block';
      else ci.style.display = 'none';
    });
  });
}

function prefillFormFromProfile() {
  const profile = LP_STORE.getProfile();
  if (!profile) return;
  if (profile.industry) {
    const sel = document.getElementById('industry');
    if (sel) sel.value = profile.industry;
  }
  if (profile.size) {
    const r = document.querySelector(`input[name="size"][value="${profile.size}"]`);
    if (r) r.checked = true;
  }
  if (profile.jurisdictions) {
    profile.jurisdictions.forEach(v => {
      const cb = document.querySelector(`#jurisdictions input[value="${v}"]`);
      if (cb) cb.checked = true;
    });
  }
  if (profile.eudata) {
    const r = document.querySelector(`input[name="eudata"][value="${profile.eudata}"]`);
    if (r) r.checked = true;
  }
  if (profile.outputStyle) {
    const r = document.querySelector(`input[name="output"][value="${profile.outputStyle}"]`);
    if (r) r.checked = true;
  }
}

// ── Generate Prompt ──────────────────────────
async function generatePrompt() {
  const maturity = document.querySelector('input[name="maturity"]:checked');
  if (!maturity) { showToast('Please select compliance maturity.', 'error'); return; }

  if (!LP_STORE.getCurrentClient()) {
    openAuthModal('register', () => generatePrompt());
    return;
  }
  if (!LP_STORE.canGenerateFree()) {
    showUpgradeModal();
    return;
  }

  // Collect intake
  const deliverables = [];
  ['gap','policy','ropa','dpia','vendor','breach','training','board'].forEach(k => {
    const el = document.getElementById('del-' + k);
    if (el && el.checked) deliverables.push(el.nextElementSibling?.textContent || k);
  });
  const jx = Array.from(document.querySelectorAll('#jurisdictions input:checked')).map(c => c.value);

  const intake = {
    framework:   APP.framework || document.querySelector('input[name="framework"]:checked')?.value || 'gdpr',
    industry:    document.getElementById('industry').value,
    size:        document.querySelector('input[name="size"]:checked')?.value || '',
    jurisdictions: jx,
    eudata:      document.querySelector('input[name="eudata"]:checked')?.value || 'unknown',
    users:       document.getElementById('users')?.value || '',
    maturity:    maturity.value,
    deliverables,
    riskNotes:   document.getElementById('risk-notes').value,
    outputStyle: document.querySelector('input[name="output"]:checked')?.value || 'structured',
    customText:  document.getElementById('custom-framework-text')?.value || '',
  };
  APP.intake = intake;

  // Save profile
  LP_STORE.saveProfile({
    industry: intake.industry, size: intake.size,
    jurisdictions: intake.jurisdictions, eudata: intake.eudata,
    outputStyle: intake.outputStyle,
  });

  // Switch to result step
  goToStepResult();
  renderModelRecs(intake.framework);

  startStreaming(intake);
}

function goToStepResult() {
  APP.step = 4;
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step-4').classList.add('active');
  document.querySelectorAll('.prog-step').forEach(s => {
    const num = parseInt(s.dataset.step);
    s.classList.remove('active', 'done');
    if (num === 4) s.classList.add('active');
    else s.classList.add('done');
  });
  const fw = APP.intake.framework;
  document.getElementById('result-title').textContent = (LP_AI.FRAMEWORK_LABELS[fw] || fw) + ' — Generated Prompt';
  window.scrollTo({ top: 0 });
}

function startStreaming(intake) {
  APP.generating = true;
  APP.generatedPrompt = '';

  const area = document.getElementById('generate-area');
  area.innerHTML = `
    <div class="stream-header">
      <span class="stream-indicator"></span>
      <span class="stream-status">Generating your compliance prompt…</span>
      <span class="stream-model">claude-sonnet-4</span>
    </div>
    <div class="prompt-output" id="prompt-output"></div>
  `;
  const output = document.getElementById('prompt-output');

  LP_AI.generatePromptWithAI(
    intake,
    (chunk, full) => {
      APP.generatedPrompt = full;
      output.textContent = full;
      output.scrollTop = output.scrollHeight;
    },
    (full) => {
      APP.generating = false;
      APP.generatedPrompt = full;
      output.textContent = full;
      // Add action bar
      area.insertAdjacentHTML('beforeend', `
        <div class="prompt-actions">
          <button class="btn-primary" onclick="copyCurrentPrompt()">Copy Prompt</button>
          <button class="btn-ghost" onclick="downloadPrompt()">Download .txt</button>
          <button class="btn-ghost" onclick="generatePromptAgain()">↻ Regenerate</button>
        </div>
      `);
      // Save to history
      LP_STORE.savePromptRecord({
        framework: LP_AI.FRAMEWORK_LABELS[intake.framework] || intake.framework,
        industry: intake.industry,
        intake,
        content: full,
      });
      // Refresh usage
      updateAuthNav();
      showToast('Prompt saved to your history.');
    },
    (err) => {
      APP.generating = false;
      const ERRORS = {
        FILE_PROTOCOL:   '<b>Open the site via a web server, not as a file.</b><br>In your terminal: <code>npx serve .</code> &rarr; open <code>http://localhost:3000</code>',
        NO_KEY:          '<b>API key not set.</b><br>Open <code>config.js</code> and replace <code>YOUR-KEY-HERE</code> with your Anthropic key.<br><a href="https://console.anthropic.com" target="_blank">Get a key &rarr;</a>',
        CORS_OR_NETWORK: '<b>Network error.</b><br>Make sure you opened the site with <code>npx serve .</code> and your API key in <code>config.js</code> is correct.',
      };
      const msg = ERRORS[err] || 'Generation failed: ' + err;
      area.innerHTML = '<div class="stream-error">' + msg + '<br><br><button class="btn-ghost" onclick="startStreaming(APP.intake)">&circlearrowleft; Try again</button></div>';
    }
  );
}

function generatePromptAgain() {
  if (APP.intake && Object.keys(APP.intake).length) startStreaming(APP.intake);
}

function downloadPrompt() {
  if (!APP.generatedPrompt) return;
  const blob = new Blob([APP.generatedPrompt], { type: 'text/plain' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = (APP.intake.framework || 'compliance') + '-prompt.txt';
  a.click();
}

// ── Model Recommendations ─────────────────
function renderModelRecs(fw) {
  const recs   = LP_AI.getModelRecs(fw);
  const container = document.getElementById('model-recs');
  if (!container) return;
  container.innerHTML = recs.map((m, i) => `
    <div class="model-rec ${i === 0 ? 'top-pick' : ''}">
      ${i === 0 ? '<div class="model-badge">Top Pick</div>' : ''}
      <div class="model-header">
        <span class="model-logo" style="color:${m.color}">${m.logo}</span>
        <div>
          <div class="model-name">${m.name}</div>
          <div class="model-vendor">${m.vendor}</div>
        </div>
        ${i === 0 ? '<span class="model-rank">#1</span>' : `<span class="model-rank muted">#${i+1}</span>`}
      </div>
      <div class="model-strengths">${m.strengths.slice(0, 3).map(s => `<span>${s}</span>`).join('')}</div>
      <div class="model-tip-label">How to use this prompt with ${m.name}:</div>
      <div class="model-tip">${m.promptTip}</div>
      <details class="model-details">
        <summary>Input format guidance</summary>
        <div class="model-format">${m.inputFormat}</div>
      </details>
    </div>
  `).join('');
}

// ── Upgrade Modal ─────────────────────────
function showUpgradeModal() {
  document.getElementById('upgrade-modal').classList.add('open');
}
function closeUpgradeModal() {
  document.getElementById('upgrade-modal').classList.remove('open');
}
function selectPlan(planId) {
  // In production: trigger Stripe Checkout with planId
  // For demo: upgrade immediately
  LP_STORE.upgradePlan(planId);
  closeUpgradeModal();
  updateAuthNav();
  showToast(`Upgraded to ${planId} plan! (Stripe integration pending)`, 'success');
}

// ── Catalog ────────────────────────────────
const ALL_FRAMEWORKS = [
  { id:'gdpr',    cat:'eu',    flag:'🇪🇺', name:'GDPR',              full:'GDPR Compliance Framework',              desc:'Full EU data protection program: ROPA, DPIAs, processor agreements, breach response, and DPO analysis.', tags:['EU','UK','Data Privacy'], price:'Free / $19 mo' },
  { id:'dsp',     cat:'us',    flag:'🇺🇸', name:'DOJ DSP',           full:'DOJ Data Security Program',              desc:'28 CFR Part 202: covered data transaction analysis, prohibited/restricted party policies, audit prep.', tags:['US Federal','National Security'], price:'Free / $29 mo' },
  { id:'hipaa',   cat:'sector',flag:'🇺🇸', name:'HIPAA',             full:'HIPAA Compliance Program',               desc:'Privacy Rule, Security Rule, Breach Notification. BAA templates, risk assessments, workforce training.', tags:['Healthcare','US Federal'], price:'Free / $19 mo' },
  { id:'ai-act',  cat:'eu',    flag:'🇪🇺', name:'EU AI Act',         full:'EU AI Act Governance',                   desc:'Risk classification, conformity assessment, technical documentation, transparency obligations.', tags:['EU','AI Governance'], price:'Free / $29 mo' },
  { id:'ccpa',    cat:'us',    flag:'🇺🇸', name:'CCPA / CPRA',       full:'CCPA / CPRA Program',                   desc:'Consumer rights: opt-out mechanisms, data inventory, vendor contracts, enforcement defense.', tags:['California','Consumer Privacy'], price:'Free / $19 mo' },
  { id:'iso27001',cat:'intl',  flag:'🌐',  name:'ISO 27001',         full:'ISO 27001 / SOC 2 Program',              desc:'ISMS gap analysis, control mapping, audit evidence collection, certification readiness.', tags:['International','InfoSec'], price:'Free / $19 mo' },
  { id:'multi',   cat:'intl',  flag:'🌐',  name:'Multi-Jurisdiction',full:'Multi-Jurisdiction Stack',               desc:'Harmonized compliance for GDPR + CCPA + LGPD + PIPL — resolve overlapping and conflicting obligations.', tags:['Global','Cross-Border'], price:'Pro plan' },
  { id:'lgpd',    cat:'intl',  flag:'🇧🇷', name:'LGPD',             full:'LGPD — Brazil',                          desc:'ANPD requirements, DPO obligations, legal bases mapping, and cross-border transfer mechanisms.', tags:['Brazil','LatAm'], price:'Free / $19 mo' },
  { id:'pipl',    cat:'intl',  flag:'🇨🇳', name:'PIPL',             full:'PIPL — China',                           desc:'CAC compliance: personal information handler obligations, cross-border transfer standard contracts.', tags:['China','APAC'], price:'Free / $19 mo' },
  { id:'dpdp',    cat:'intl',  flag:'🇮🇳', name:'DPDP Act',         full:'DPDP Act 2023 — India',                  desc:'Data fiduciary obligations, consent manager framework, significant data fiduciary requirements.', tags:['India','APAC'], price:'Free / $19 mo' },
  { id:'vendor',  cat:'sector',flag:'📋',  name:'Vendor Risk',      full:'Vendor Risk Management',                 desc:'Third-party and AI vendor due diligence: security questionnaires, DPA reviews, right-to-audit clauses.', tags:['Cross-Framework','Procurement'], price:'Free / $19 mo' },
  { id:'custom',  cat:'sector',flag:'✏️',  name:'Custom',           full:'Custom Compliance Framework',            desc:'Describe any regulatory requirement. Our AI generates a bespoke compliance prompt for your specific context.', tags:['Bespoke','Any Regulation'], price:'Pro plan' },
];

function buildCatalog() {
  renderCatalog(ALL_FRAMEWORKS);
}
function filterCatalog(filter) {
  const items = filter === 'all' ? ALL_FRAMEWORKS : ALL_FRAMEWORKS.filter(f => f.cat === filter);
  renderCatalog(items);
}
function renderCatalog(items) {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;
  grid.innerHTML = items.map(f => `
    <div class="catalog-item" onclick="selectFramework('${f.id}')">
      <div style="font-size:1.5rem;margin-bottom:0.5rem">${f.flag}</div>
      <h3>${f.full}</h3>
      <p>${f.desc}</p>
      <div class="card-tags">${f.tags.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="catalog-item-meta">
        <span class="catalog-price">${f.price}</span>
        <span class="catalog-btn">Build Prompt →</span>
      </div>
    </div>
  `).join('');
}

function setupFilterButtons() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterCatalog(btn.dataset.filter);
    });
  });
}

// ── Toast ──────────────────────────────────
function showToast(msg, type) {
  const t = document.createElement('div');
  t.className = 'toast ' + (type || 'info');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}

// ── Terminal Demo ──────────────────────────
const terminalLines = [
  { type: 'comment', text: '# GDPR Compliance Framework — AI-Generated Prompt' },
  { type: 'comment', text: '# Industry: Health Technology | Users: 16M+ | EU + US' },
  { type: 'blank' },
  { type: 'section', text: '▸ ROLE & SYSTEM CONTEXT' },
  { type: 'text',    text: 'You are a senior data protection counsel with 20+ years...' },
  { type: 'blank' },
  { type: 'section', text: '▸ PHASE 1 — DATA MAPPING' },
  { type: 'key', key: 'task:',        val: ' Build ROPA per Art. 30 GDPR' },
  { type: 'key', key: 'special_cat:', val: ' Health data — Art. 9 applies' },
  { type: 'key', key: 'legal_basis:', val: ' Art. 6(1)(a) Consent + Art. 9(2)(a)' },
  { type: 'blank' },
  { type: 'section', text: '▸ PHASE 2 — PROCESSOR AGREEMENTS' },
  { type: 'key', key: 'scope:',       val: ' All vendors with PHI access' },
  { type: 'key', key: 'template:',    val: ' Art. 28 DPA with Annex' },
  { type: 'blank' },
  { type: 'section', text: '▸ RECOMMENDED MODELS' },
  { type: 'key', key: '#1:',   val: ' Claude Sonnet 4 — best balance' },
  { type: 'key', key: '#2:',   val: ' GPT-4o — structured templates' },
  { type: 'blank' },
  { type: 'prompt', text: '> prompt ready — copy & deploy ✓' },
];

let termIdx = 0;
function startTerminalDemo() {
  const body = document.getElementById('terminal-demo');
  if (!body) return;
  body.innerHTML = '';
  termIdx = 0;
  setTimeout(() => typeNextLine(body), 500);
}
function typeNextLine(body) {
  if (termIdx >= terminalLines.length) {
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    body.appendChild(cursor);
    setTimeout(() => { body.innerHTML = ''; termIdx = 0; typeNextLine(body); }, 5000);
    return;
  }
  const line = terminalLines[termIdx++];
  if (line.type === 'blank') {
    body.appendChild(document.createElement('br'));
    setTimeout(() => typeNextLine(body), 60);
    return;
  }
  const el = document.createElement('span');
  if (line.type === 'section') {
    el.className = 't-section';
    typeText(el, line.text, body, 22, () => typeNextLine(body));
  } else if (line.type === 'comment') {
    el.className = 't-line t-comment';
    typeText(el, line.text, body, 15, () => typeNextLine(body));
  } else if (line.type === 'prompt') {
    el.className = 't-line t-prompt';
    typeText(el, line.text, body, 28, () => typeNextLine(body));
  } else if (line.type === 'key') {
    el.className = 't-line';
    const kSpan = document.createElement('span'); kSpan.className = 't-key';
    const vSpan = document.createElement('span'); vSpan.className = 't-val';
    el.appendChild(kSpan); el.appendChild(vSpan);
    body.appendChild(el);
    typeText(kSpan, line.key, null, 20, () => typeText(vSpan, line.val, null, 16, () => typeNextLine(body)));
    return;
  } else {
    el.className = 't-line';
    typeText(el, line.text, body, 14, () => typeNextLine(body));
  }
}
function typeText(el, text, parent, speed, cb) {
  if (parent) parent.appendChild(el);
  let i = 0;
  function next() {
    if (i < text.length) { el.textContent += text[i++]; setTimeout(next, speed + Math.random() * speed * 0.5); }
    else if (cb) setTimeout(cb, 55);
  }
  next();
}

// ── Prompt Library ──────────────────────────────────
let currentLibrary = 'gdpr';

function switchLibrary(id) {
  currentLibrary = id;
  document.querySelectorAll('.lib-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.lib === id);
  });
  renderLibrary(id);
}

function renderLibrary(id) {
  const lib = window.PROMPT_LIBRARIES[id];
  if (!lib) return;

  // Header
  const header = document.getElementById('lib-header');
  header.innerHTML = `
    <div class="lib-header-inner">
      <div class="lib-header-flag">${lib.flag}</div>
      <div>
        <div class="lib-header-name">${lib.name}</div>
        <div class="lib-header-desc">${lib.description}</div>
      </div>
    </div>
  `;

  // Grid
  const grid = document.getElementById('lib-grid');
  grid.innerHTML = lib.prompts.map(p => {
    const chainBadge = p.chainId
      ? `<div class="prompt-chain-badge">${p.chainTitle} · ${p.chainStep}</div>`
      : '';
    const typeBadge = p.type === 'standalone'
      ? '<span class="prompt-type-badge solo">Single Prompt</span>'
      : '<span class="prompt-type-badge chain">Prompt Chain</span>';
    return `
      <div class="prompt-card" onclick="openPromptModal('${id}', '${p.id}')">
        <div class="prompt-card-top">
          <div class="prompt-card-num">${p.num}</div>
          ${typeBadge}
        </div>
        ${chainBadge}
        <h3 class="prompt-card-title">${p.title}</h3>
        <p class="prompt-card-desc">${p.description}</p>
        <div class="prompt-card-tags">${p.tags.slice(0,3).map(t => `<span>${t}</span>`).join('')}</div>
        <div class="prompt-card-footer">
          <span class="prompt-card-model">⌘ ${p.model}</span>
          <span class="prompt-card-time">~${p.time}</span>
        </div>
      </div>
    `;
  }).join('');
}

function openPromptModal(libId, promptId) {
  const lib = window.PROMPT_LIBRARIES[libId];
  const p   = lib.prompts.find(x => x.id === promptId);
  if (!p) return;

  const prevBtn = p.prevPromptId
    ? `<button class="btn-ghost chain-nav" onclick="openPromptModal('${libId}', '${p.prevPromptId}')">← ${p.chainStep.replace(/Step \d+ of \d+/, 'Previous step')}</button>`
    : '';
  const nextBtn = p.nextPromptId
    ? `<button class="btn-primary chain-nav" onclick="openPromptModal('${libId}', '${p.nextPromptId}')">Next step →</button>`
    : '';

  const chainInfo = p.chainId ? `
    <div class="prompt-modal-chain">
      <span class="chain-tag">${p.chainTitle}</span>
      <span class="chain-step-tag">${p.chainStep}</span>
    </div>` : '';

  document.getElementById('prompt-modal-inner').innerHTML = `
    <div class="prompt-modal-header">
      <div class="prompt-modal-num">${p.num}</div>
      <div class="prompt-modal-meta">
        ${chainInfo}
        <h2 class="prompt-modal-title">${p.title}</h2>
        <div class="prompt-modal-tags">
          ${p.tags.map(t => `<span>${t}</span>`).join('')}
          <span class="tag-model">⌘ ${p.model}</span>
          <span class="tag-time">~${p.time}</span>
        </div>
      </div>
    </div>

    <div class="prompt-modal-section">
      <div class="prompt-section-label">
        <span>// PROMPT</span>
        <button class="copy-btn" onclick="copyText('prompt-text-${p.id}')">Copy Prompt</button>
      </div>
      <pre class="prompt-text" id="prompt-text-${p.id}">${escapeHtml(p.prompt)}</pre>
    </div>

    <div class="prompt-modal-section">
      <div class="prompt-section-label">
        <span>// EXPECTED OUTPUT</span>
        <button class="copy-btn" onclick="copyText('output-text-${p.id}')">Copy Output</button>
      </div>
      <div class="expected-output" id="output-text-${p.id}">${renderMarkdown(p.expectedOutput)}</div>
    </div>

    ${p.prevPromptId || p.nextPromptId ? `<div class="prompt-chain-nav">${prevBtn}${nextBtn}</div>` : ''}
  `;

  document.getElementById('prompt-modal').classList.add('open');
}

function closePromptModal() {
  document.getElementById('prompt-modal').classList.remove('open');
}

function copyText(elementId) {
  const el = document.getElementById(elementId);
  const text = el.innerText || el.textContent;
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard.'));
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// Minimal markdown renderer for expected outputs
function renderMarkdown(md) {
  return md
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h2>$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code inline
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Table rows
    .replace(/^\|(.+)\|$/gm, (match, inner) => {
      const cells = inner.split('|').map(c => c.trim());
      const isDivider = cells.every(c => /^[-: ]+$/.test(c));
      if (isDivider) return '';
      return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
    })
    // Wrap consecutive tr in table
    .replace(/(<tr>.*?<\/tr>\n?)+/gs, m => `<table>${m}</table>`)
    // Horizontal rule
    .replace(/^---+$/gm, '<hr>')
    // Blockquote
    .replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>')
    // List items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*?<\/li>\n?)+/gs, m => `<ul>${m}</ul>`)
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[htulipcb])(.+)$/gm, (m) => m ? m : '')
    .replace(/^<\/p><p>(<[htulipcb])/gm, '$1');
}

// Init library on page show
const _origShowPage = showPage;
window.showPage = function(id) {
  _origShowPage(id);
  if (id === 'library') {
    switchLibrary(currentLibrary);
  }
};
