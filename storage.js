/* ═══════════════════════════════════════════
   storage.js — Client data persistence layer
   Uses localStorage; swap for backend API
═══════════════════════════════════════════ */

const STORAGE_KEYS = {
  SESSION:  'lp_session',
  CLIENTS:  'lp_clients',
  PROMPTS:  'lp_prompts',
  API_KEY:  'lp_apikey',
};

const FREE_LIMIT = 100;

// ── Clients ─────────────────────────────────
function getClients() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '{}');
}
function saveClients(clients) {
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
}

// ── Session ─────────────────────────────────
function getSession() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION) || 'null');
}
function setSession(clientId) {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ clientId, ts: Date.now() }));
}
function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}
function getCurrentClient() {
  const s = getSession();
  if (!s) return null;
  const clients = getClients();
  return clients[s.clientId] || null;
}
function getCurrentClientId() {
  const s = getSession();
  return s ? s.clientId : null;
}

// ── Register / Login ──────────────────────
function register(name, email, password) {
  const clients = getClients();
  const existingId = Object.keys(clients).find(id => clients[id].email === email.toLowerCase());
  if (existingId) return { error: 'An account with this email already exists.' };

  const id = 'c_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  clients[id] = {
    id, name, email: email.toLowerCase(),
    passwordHash: simpleHash(password),
    plan: 'free',
    createdAt: Date.now(),
    profile: {},       // saved form answers
    subscription: null,
  };
  saveClients(clients);
  setSession(id);
  return { success: true, client: clients[id] };
}

function login(email, password) {
  const clients = getClients();
  const id = Object.keys(clients).find(id => clients[id].email === email.toLowerCase());
  if (!id) return { error: 'No account found with that email.' };
  const client = clients[id];
  if (client.passwordHash !== simpleHash(password)) return { error: 'Incorrect password.' };
  setSession(id);
  return { success: true, client };
}

function logout() {
  clearSession();
}

// Very basic hash — replace with bcrypt in a real backend
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i), h |= 0;
  return 'h_' + Math.abs(h).toString(36);
}

// ── Client Profile (saved form answers) ──────
function saveProfile(updates) {
  const clients = getClients();
  const id = getCurrentClientId();
  if (!id || !clients[id]) return;
  clients[id].profile = { ...clients[id].profile, ...updates };
  saveClients(clients);
}

function getProfile() {
  const client = getCurrentClient();
  return client ? (client.profile || {}) : {};
}

// ── Prompt History ────────────────────────────
function getAllPrompts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROMPTS) || '{}');
}
function savePromptRecord(record) {
  const all = getAllPrompts();
  const id = getCurrentClientId();
  if (!id) return;
  if (!all[id]) all[id] = [];
  all[id].unshift({ ...record, id: 'p_' + Date.now(), createdAt: Date.now() });
  localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(all));
}
function getClientPrompts() {
  const id = getCurrentClientId();
  if (!id) return [];
  const all = getAllPrompts();
  return all[id] || [];
}
function getPromptCount() {
  return getClientPrompts().length;
}
function canGenerateFree() {
  const client = getCurrentClient();
  if (!client) return false;
  if (client.plan !== 'free') return true;
  return getPromptCount() < FREE_LIMIT;
}
function getFreeRemaining() {
  return Math.max(0, FREE_LIMIT - getPromptCount());
}

// ── API Key ────────────────────────────────
function getApiKey() {
  return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
}
function setApiKey(key) {
  localStorage.setItem(STORAGE_KEYS.API_KEY, key);
}

// ── Plan Upgrade (stub — wire to Stripe) ──────
function upgradePlan(planId) {
  const clients = getClients();
  const id = getCurrentClientId();
  if (!id || !clients[id]) return false;
  clients[id].plan = planId;
  clients[id].subscription = { planId, startedAt: Date.now() };
  saveClients(clients);
  return true;
}

window.LP_STORE = {
  FREE_LIMIT,
  register, login, logout,
  getCurrentClient, getCurrentClientId, getSession,
  saveProfile, getProfile,
  savePromptRecord, getClientPrompts, getPromptCount,
  canGenerateFree, getFreeRemaining,
  getApiKey, setApiKey,
  upgradePlan,
};
