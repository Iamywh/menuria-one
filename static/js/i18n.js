// ===================== i18n.js (clean) =====================
// Funziona con /data/lang.json (se presente) o con window.I18N pre-caricato.
// Compat con localStorage "LANG" e "lang". Popup: prima visita o ?lang=select.

// ---- Config ----
const LS_KEYS = ["MENURIA_LANG", "LANG", "lang"]; // priorità a MENURIA_LANG
const FALLBACK_LANG = "es";
const POPUP_NEVER_KEY = "i18n_popup_never";
const LANG_PARAM = "lang"; // ?lang=select forza popup
const EVENT_LANG_CHANGED = "menuria:languageChanged";

// ---- Stato ----
let _dictCache = null;            // cache di /data/lang.json
let _forceConsumed = false;       // per consumare ?lang=select una volta
window.currentLang = getSavedLang() || FALLBACK_LANG;

// ---- Helpers LS ----
function getSavedLang(){
  for (const k of LS_KEYS){ const v = localStorage.getItem(k); if (v) return v.toLowerCase(); }
  return null;
}
function saveLang(lang){
  LS_KEYS.forEach(k => localStorage.setItem(k, lang));
}

// ---- URL utils ----
function clearParamFromURL(param){
  const url = new URL(window.location.href);
  if (url.searchParams.has(param)) {
    url.searchParams.delete(param);
    history.replaceState(null, "", url.toString());
  }
}

// ---- Popup logic ----
function shouldShowLangPopup(){
  const never = localStorage.getItem(POPUP_NEVER_KEY) === "true";
  const hasLang = !!getSavedLang();
  const force = new URLSearchParams(location.search).get(LANG_PARAM) === "select";
  if (force && !_forceConsumed){ _forceConsumed = true; return true; }
  return !hasLang && !never;
}
function initLangPopup(){
  const pop = document.getElementById("languagePopup");
  if (!pop) return;
  pop.style.display = shouldShowLangPopup() ? "flex" : "none";
  const cb = document.getElementById("neverShowLangPopup");
  if (cb){
    cb.checked = localStorage.getItem(POPUP_NEVER_KEY) === "true";
    cb.addEventListener("change", e => {
      localStorage.setItem(POPUP_NEVER_KEY, e.target.checked ? "true" : "false");
    });
  }
  if (_forceConsumed) clearParamFromURL(LANG_PARAM);
}
function closeLanguagePopupHard(){
  const pop = document.getElementById("languagePopup");
  if (pop) pop.style.display = "none";
  const cb = document.getElementById("neverShowLangPopup");
  if (cb && cb.checked) localStorage.setItem(POPUP_NEVER_KEY, "true");
  clearParamFromURL(LANG_PARAM);
}

// ---- Dizionari ----
function ensureWindowI18N(){
  // Garantisce struttura minima di fallback in RAM
  window.I18N = window.I18N || {};
  window.I18N.es = window.I18N.es || {};
  ["en","it","fr","de","pt","ru"].forEach(k => { window.I18N[k] = window.I18N[k] || {}; });
}
function getDict(lang){
  // 1) prova cache JSON
  if (_dictCache && _dictCache[lang]) return _dictCache[lang];
  // 2) prova window.I18N
  ensureWindowI18N();
  return window.I18N[lang] || window.I18N[FALLBACK_LANG] || {};
}

// ---- Apply ----
function applyTranslations(){
  const dict = getDict(window.currentLang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict && dict[key] != null) el.innerHTML = dict[key];
  });
  document.documentElement.setAttribute("lang", window.currentLang);
}
function updateActiveFlags(){
  const cur = window.currentLang;
  document.querySelectorAll(".language-flags img, .flag-grid img").forEach(img => {
    const alt = (img.getAttribute("alt") || "").toLowerCase();
    const on = alt === cur;
    img.classList.toggle("active", on);
    img.classList.toggle("active-flag", on);
  });
}

// ---- API pubblica ----
window.loadLanguage = function loadLanguage(lang){
  const target = (lang || window.currentLang || FALLBACK_LANG).toLowerCase();
  // prova a caricare /data/lang.json solo la prima volta
  if (_dictCache === null){
    fetch("/data/lang.json")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(json => { _dictCache = json || {}; window.currentLang = target; applyTranslations(); updateActiveFlags(); })
      .catch(() => { window.currentLang = target; applyTranslations(); updateActiveFlags(); });
  } else {
    window.currentLang = target;
    applyTranslations();
    updateActiveFlags();
  }
};

window.setLanguage = function setLanguage(lang){
  const next = (lang || FALLBACK_LANG).toLowerCase();
  saveLang(next);
  window.currentLang = next;
  window.loadLanguage(next);
  closeLanguagePopupHard();
  try { window.dispatchEvent(new CustomEvent(EVENT_LANG_CHANGED, { detail:{ lang: next } })); } catch(e){}
};

// Alias per click sulle bandiere nel popup
window.selectLanguagePopup = function(lang){ window.setLanguage(lang); };

// ---- Boot ----
document.addEventListener("DOMContentLoaded", () => {
  // inizializza popup e traduzioni
  initLangPopup();
  // se l'utente aveva già scelto una lingua, usala; altrimenti fallback
  const initial = getSavedLang() || FALLBACK_LANG;
  window.loadLanguage(initial);
});
