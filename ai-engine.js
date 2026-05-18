/* ═══════════════════════════════════════════
   ai-engine.js — Prompt generation + model advice
═══════════════════════════════════════════ */

// ── Model Catalog ─────────────────────────────
const MODEL_CATALOG = {
  'claude-opus': {
    id: 'claude-opus',
    name: 'Claude Opus 4',
    vendor: 'Anthropic',
    logo: '◆',
    color: '#C9A84C',
    strengths: ['Multi-jurisdictional analysis', 'Nuanced legal reasoning', 'Long-form policy drafting', 'Ambiguous regulatory interpretation'],
    bestFor: ['National security / DSP', 'Multi-jurisdiction stacks', 'Complex litigation support', 'Board-level governance docs'],
    inputFormat: 'Provide full context in a single system prompt. Use XML tags to separate sections (<task>, <context>, <constraints>). Claude handles very long documents well.',
    promptTip: 'Begin with role assignment: "You are a senior data protection counsel with 20+ years experience…". Then state the jurisdiction explicitly. Use headings and numbered phases for complex tasks.',
    apiModel: 'claude-opus-4-20250514',
    pricePer1M: '$15 / $75',
  },
  'claude-sonnet': {
    id: 'claude-sonnet',
    name: 'Claude Sonnet 4',
    vendor: 'Anthropic',
    logo: '◆',
    color: '#C9A84C',
    strengths: ['Fast structured output', 'Policy template generation', 'Checklist creation', 'Gap analysis'],
    bestFor: ['GDPR', 'HIPAA', 'CCPA', 'ISO 27001', 'Standard compliance programs'],
    inputFormat: 'Structured prompt with clear output format specified. Request JSON or Markdown output explicitly. Use numbered lists for multi-part deliverables.',
    promptTip: 'Specify exact output format upfront: "Return a numbered list of…" or "Format as a table with columns…". Claude Sonnet follows instructions very precisely.',
    apiModel: 'claude-sonnet-4-20250514',
    pricePer1M: '$3 / $15',
  },
  'gpt4o': {
    id: 'gpt4o',
    name: 'GPT-4o',
    vendor: 'OpenAI',
    logo: '○',
    color: '#74AA9C',
    strengths: ['Template generation', 'Document drafting', 'Clause-by-clause analysis', 'Structured output with JSON mode'],
    bestFor: ['Contract templates', 'Policy documents', 'BAA / DPA drafting', 'Checklist creation'],
    inputFormat: 'Use system + user message split. System message: role and constraints. User message: specific task. GPT-4o handles tool calls well for structured output.',
    promptTip: 'Use JSON mode for structured output (set response_format: { type: "json_object" }). For documents, provide a detailed template schema in the system message.',
    apiModel: 'gpt-4o',
    pricePer1M: '$2.50 / $10',
  },
  'gcai': {
    id: 'gcai',
    name: 'Harvey / GC AI',
    vendor: 'Harvey AI',
    logo: '⚖',
    color: '#8B9FD4',
    strengths: ['Legal research', 'Contract review', 'Regulatory memo writing', 'Precedent analysis'],
    bestFor: ['Legal research memos', 'Contract negotiation points', 'Regulatory interpretation', 'Enforcement action analysis'],
    inputFormat: 'Harvey is optimized for legal documents. Upload source materials directly. Frame requests as a lawyer would to a junior associate: "Analyze this agreement for GDPR compliance issues and flag any Art. 28 gaps."',
    promptTip: 'Harvey performs best with source documents attached. Ask for specific legal deliverables ("draft a legal memo", "identify risk provisions") rather than general questions.',
    apiModel: 'harvey-v3',
    pricePer1M: 'Contact Harvey',
  },
  'gemini': {
    id: 'gemini',
    name: 'Gemini 1.5 Pro',
    vendor: 'Google',
    logo: '✦',
    color: '#6BA4E8',
    strengths: ['Very long context (1M tokens)', 'Multi-document analysis', 'Data extraction', 'Processing large regulatory texts'],
    bestFor: ['Full regulation text analysis', 'Large document sets', 'Multi-language compliance (EU)', 'Regulatory change monitoring'],
    inputFormat: 'Upload full regulation texts directly. Gemini can process entire legal frameworks in one context. Ask comparative questions across multiple documents.',
    promptTip: 'Leverage the long context window by providing the full regulation text alongside your company documents. Ask: "Compare our current policies against these GDPR articles and identify gaps."',
    apiModel: 'gemini-1.5-pro',
    pricePer1M: '$3.50 / $10.50',
  },
  'perplexity': {
    id: 'perplexity',
    name: 'Perplexity Pro',
    vendor: 'Perplexity AI',
    logo: '⟳',
    color: '#A78BFA',
    strengths: ['Real-time regulatory research', 'Cited sources', 'Enforcement action tracking', 'Recent regulatory guidance'],
    bestFor: ['Current enforcement trends', 'Regulatory news monitoring', 'Recent DPA decisions', 'Pre-research before prompt building'],
    inputFormat: 'Ask research questions with citation requirements. Perplexity returns sourced answers. Best used as a research layer before feeding findings into Claude or GPT-4o for drafting.',
    promptTip: 'Use for research phases: "What are the most recent GDPR enforcement actions in Germany in 2025?" Then feed the research findings into a drafting model.',
    apiModel: 'llama-3.1-sonar-large-128k-online',
    pricePer1M: '$1 / $1',
  },
};

// ── Framework → Model Recommendations ────────
const FRAMEWORK_MODEL_MAP = {
  'gdpr':      ['claude-sonnet', 'gpt4o', 'gcai', 'gemini'],
  'dsp':       ['claude-opus', 'claude-sonnet', 'gcai', 'gpt4o'],
  'hipaa':     ['claude-sonnet', 'gpt4o', 'gcai', 'claude-opus'],
  'ai-act':    ['claude-opus', 'claude-sonnet', 'gemini', 'perplexity'],
  'ccpa':      ['claude-sonnet', 'gpt4o', 'gcai', 'perplexity'],
  'iso27001':  ['claude-sonnet', 'gpt4o', 'claude-opus', 'gemini'],
  'multi':     ['claude-opus', 'gemini', 'claude-sonnet', 'gcai'],
  'lgpd':      ['claude-sonnet', 'gpt4o', 'claude-opus', 'perplexity'],
  'pipl':      ['claude-opus', 'gemini', 'claude-sonnet', 'perplexity'],
  'dpdp':      ['claude-sonnet', 'claude-opus', 'perplexity', 'gpt4o'],
  'vendor':    ['claude-sonnet', 'gpt4o', 'gcai', 'claude-opus'],
  'custom':    ['claude-opus', 'claude-sonnet', 'gpt4o', 'gcai'],
};

function getModelRecs(frameworkId) {
  const ids = FRAMEWORK_MODEL_MAP[frameworkId] || FRAMEWORK_MODEL_MAP['custom'];
  return ids.map(id => MODEL_CATALOG[id]).filter(Boolean);
}

// ── Meta-prompt builder ────────────────────────
// Builds the prompt we send to Claude to GENERATE the user's compliance prompt
function buildMetaPrompt(intake) {
  const { framework, industry, size, jurisdictions, eudata, users, maturity, deliverables, riskNotes, outputStyle, customText } = intake;

  const fwLabel = FRAMEWORK_LABELS[framework] || framework.toUpperCase();
  const delList = deliverables.join(', ') || 'gap assessment, policy templates';
  const jxList  = jurisdictions.join(', ') || 'US, EU';
  const sizeMap = { startup: 'startup (<50 employees)', smb: 'SMB (50–500 employees)', mid: 'mid-market (500–5,000 employees)', enterprise: 'enterprise (5,000+ employees)' };
  const matMap  = { zero: 'starting from zero (no formal compliance program)', partial: 'partial/ad-hoc (some policies, no systematic approach)', established: 'established program needing gap analysis', audit: 'responding to a regulator audit or enforcement inquiry' };
  const styleMap = { structured: 'structured framework with clear phases and subheadings', stepbystep: 'step-by-step implementation playbook with numbered actions', memo: 'formal legal memorandum format', checklist: 'actionable checklist with prioritized items' };

  return `You are a world-class AI prompt engineer specializing in legal and compliance workflows. Your task is to write a professional, comprehensive compliance prompt that a lawyer or compliance officer will copy and paste into an AI model (Claude, GPT-4, or similar) to build their ${fwLabel} compliance program.

The prompt you write will be USED by the lawyer — it is not the compliance output itself, but the instruction set that guides an AI to produce high-quality compliance work.

COMPANY PROFILE:
- Regulatory framework needed: ${fwLabel}${framework === 'custom' ? ` — specifically: ${customText}` : ''}
- Industry: ${industry}
- Company size: ${sizeMap[size] || size}
- Operating jurisdictions: ${jxList}
- EU/UK data subjects: ${eudata === 'yes' ? 'Yes' : eudata === 'no' ? 'No' : 'Unknown'}
- Number of end users/data subjects: ${users || 'unspecified'}
- Current compliance maturity: ${matMap[maturity] || maturity}
- Deliverables required: ${delList}
- Risk notes: ${riskNotes || 'None specified'}
- Preferred output format: ${styleMap[outputStyle] || outputStyle}

REQUIREMENTS FOR THE PROMPT YOU WRITE:
1. Open with a detailed SYSTEM/ROLE definition — assign the AI a specific expert persona with jurisdiction expertise
2. Provide rich context about the company profile (embed the details above naturally)
3. Structure the task in clear phases (at minimum 4 phases) with specific, actionable sub-tasks under each
4. Include explicit instructions for output format, depth, and legal citation standards
5. Add a CONSTRAINTS section (what to avoid, ethical guardrails, disclaimer requirements)
6. Include a QUALITY CHECK section with criteria the AI should verify before finalizing
7. End with a FOLLOW-UP PROMPTS section — 3–5 recommended follow-up prompts for iterative refinement
8. The prompt should be production-ready — a practicing lawyer should be able to copy it directly and get professional-grade output
9. Use clear headers with ── or ═══ dividers for visual structure
10. The total prompt should be 600–1200 words — comprehensive but not padded

Write ONLY the compliance prompt itself. No preamble, no explanation, no markdown wrapper. Start directly with the prompt content.`;
}

const FRAMEWORK_LABELS = {
  'gdpr':     'GDPR (EU General Data Protection Regulation)',
  'dsp':      'DOJ Data Security Program (28 CFR Part 202)',
  'hipaa':    'HIPAA Privacy, Security & Breach Notification Rules',
  'ai-act':   'EU AI Act (Regulation 2024/1689)',
  'ccpa':     'CCPA / CPRA (California Consumer Privacy Act)',
  'iso27001': 'ISO 27001:2022 / SOC 2 (Information Security)',
  'multi':    'Multi-Jurisdiction Privacy Stack',
  'lgpd':     'LGPD (Brazil Lei Geral de Proteção de Dados)',
  'pipl':     'PIPL (China Personal Information Protection Law)',
  'dpdp':     'DPDP Act 2023 (India)',
  'vendor':   'Third-Party / AI Vendor Risk Management',
  'custom':   'Custom Compliance Framework',
};

// ── Call Anthropic API directly ───────────────────────
async function generatePromptWithAI(intake, onChunk, onDone, onError) {
  const cfg    = window.LP_CONFIG || {};
  const apiKey = cfg.ANTHROPIC_API_KEY || '';

  if (window.location.protocol === 'file:') {
    onError('FILE_PROTOCOL'); return;
  }
  if (!apiKey || apiKey.includes('YOUR-KEY')) {
    onError('NO_KEY'); return;
  }

  const metaPrompt = buildMetaPrompt(intake);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':                      'application/json',
        'x-api-key':                         apiKey,
        'anthropic-version':                '2023-06-01',
        'anthropic-dangerous-allow-browser': 'true',
      },
      body: JSON.stringify({
        model:      cfg.MODEL      || 'claude-sonnet-4-20250514',
        max_tokens: cfg.MAX_TOKENS || 2000,
        stream:     true,
        messages:   [{ role: 'user', content: metaPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      onError(err.error?.message || 'API error ' + response.status);
      return;
    }

    const reader  = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText  = '';
    let buffer    = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
            fullText += parsed.delta.text;
            onChunk(parsed.delta.text, fullText);
          }
          if (parsed.type === 'error') { onError(parsed.error?.message || 'Stream error'); return; }
        } catch { /* skip malformed SSE lines */ }
      }
    }
    onDone(fullText);

  } catch (err) {
    onError('CORS_OR_NETWORK');
  }
}

window.LP_AI = {
  MODEL_CATALOG, getModelRecs, generatePromptWithAI, FRAMEWORK_LABELS, buildMetaPrompt,
};
