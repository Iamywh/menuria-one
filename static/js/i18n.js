// ===================== i18n.js (clean) =====================
// Funziona con /data/lang.json (se presente) o con window.I18N pre-caricato.
// Compat con localStorage "MENURIA_LANG", "LANG", "lang". Popup: prima visita o ?lang=select.

// ---- Config ----
const LS_KEYS = ["MENURIA_LANG", "LANG", "lang"]; // priorità a MENURIA_LANG
const FALLBACK_LANG = "es";
const POPUP_NEVER_KEY = "i18n_popup_never";
const LANG_PARAM = "lang"; // ?lang=select forza popup
const EVENT_LANG_CHANGED = "menuria:languageChanged";

// ---- Stato ----
let _dictCache = null;            // cache di /data/lang.json { es:{}, en:{}, ... }
let _forceConsumed = false;       // per consumare ?lang=select una volta sola
window.currentLang = getSavedLang() || FALLBACK_LANG;

// ===========================================================
// LocalStorage helpers
function getSavedLang(){
  for (const k of LS_KEYS){
    const v = localStorage.getItem(k);
    if (v) return String(v).toLowerCase();
  }
  return null;
}
function saveLang(lang){
  LS_KEYS.forEach(k => localStorage.setItem(k, lang));
}

// URL utils
function clearParamFromURL(param){
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      history.replaceState(null, "", url.toString());
    }
  } catch(e){}
}

// ===========================================================
// Popup lingua
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

// ===========================================================
// Dizionari
function ensureWindowI18N(){
  window.I18N = window.I18N || {};
  // garantisci tutte le lingue che usi
  ["es","en","it","fr","de","pt","ru"].forEach(k => { window.I18N[k] = window.I18N[k] || {}; });
}
function getDict(langCode){
  const lang = (langCode || window.currentLang || FALLBACK_LANG).toLowerCase();
  // 1) cache da /data/lang.json
  if (_dictCache && _dictCache[lang]) return _dictCache[lang];
  // 2) fallback a window.I18N (runtime)
  ensureWindowI18N();
  return window.I18N[lang] || window.I18N[FALLBACK_LANG] || {};
}

// Ritorna traduzione oppure null (NON stringa vuota)
function tr(dict, key){
  if (!dict || !key) return null;
  if (Object.prototype.hasOwnProperty.call(dict, key)){
    const v = dict[key];
    if (v === "" || v === null || v === undefined) return null;
    return v;
  }
  return null;
}

// API util
function T(key, fallback = ""){
  const dict = getDict();
  const v = tr(dict, key);
  return v !== null ? v : fallback;
}
window.T = T; // opzionale, se vuoi usarlo altrove

// ===========================================================
// Auto-attr (non distruttivo): se manca data-i18n-attr prova a dedurlo
function autoAssignI18nAttr(root=document){
  root.querySelectorAll("[data-i18n]").forEach(el => {
    if (el.hasAttribute("data-i18n-attr")) return;
    if (el.tagName === "IMG") {
      el.setAttribute("data-i18n-attr", "alt");
      return;
    }
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      if (el.hasAttribute("placeholder")) el.setAttribute("data-i18n-attr", "placeholder");
      else el.setAttribute("data-i18n-attr", "text");
      return;
    }
    // gallery/lightbox: se ha data-sub-html, traducilo
    if (el.tagName === "A" && el.hasAttribute("data-sub-html")) {
      el.setAttribute("data-i18n-attr", "data-sub-html");
      return;
    }
    // default sicuro: testo
    el.setAttribute("data-i18n-attr", "text");
  });
}

// ===========================================================
// Apply traduzioni (ANTIBUCHI): non sovrascrive se manca la traduzione
function applyTranslations(langCode){
  const dict = getDict(langCode);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key  = el.getAttribute("data-i18n");
    if (!key) return;

    const attr = el.getAttribute("data-i18n-attr"); // "alt" | "title" | "placeholder" | "data-sub-html" | "text" | "html"
    const val  = tr(dict, key);

    if (attr === "html") {
      if (val !== null) el.innerHTML = val;
      return;
    }
    if (attr === "text" || !attr) {
      if (val !== null) el.textContent = val; // altrimenti lascia il contenuto esistente
      return;
    }
    // Attributi normali
    if (val !== null) el.setAttribute(attr, val);
  });

  document.documentElement.setAttribute("lang", (langCode || window.currentLang || FALLBACK_LANG).toLowerCase());
}
window.applyTranslations = applyTranslations;

// Aggiorna lo stato visivo delle bandiere (opzionale)
function updateActiveFlags(){
  const cur = (window.currentLang || FALLBACK_LANG).toLowerCase();
  document.querySelectorAll(".language-flags img, .flag-grid img").forEach(img => {
    const alt = (img.getAttribute("alt") || "").toLowerCase();
    const on = alt === cur;
    img.classList.toggle("active", on);
    img.classList.toggle("active-flag", on);
  });
}

// ===========================================================
// Caricamento lingua
window.loadLanguage = function loadLanguage(lang){
  const target = (lang || window.currentLang || FALLBACK_LANG).toLowerCase();

  // carica /data/lang.json solo la prima volta
  if (_dictCache === null){
    fetch("/data/lang.json", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject(new Error("lang.json missing")))
      .then(json => {
        _dictCache = json || {};
        ensureWindowI18N(); // garantisci struttura
        window.currentLang = target;
        autoAssignI18nAttr(document); // prova ad assegnare attr mancanti
        applyTranslations();
        updateActiveFlags();
      })
      .catch(() => {
        // fallback solo a window.I18N in RAM
        ensureWindowI18N();
        window.currentLang = target;
        autoAssignI18nAttr(document);
        applyTranslations();
        updateActiveFlags();
      });
  } else {
    window.currentLang = target;
    autoAssignI18nAttr(document);
    applyTranslations();
    updateActiveFlags();
    try {
  window.dispatchEvent(new CustomEvent("menuria:languageChanged", { detail:{ lang: window.currentLang, boot:true } }));
} catch(e){}
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

// alias per popup
window.selectLanguagePopup = function(lang){ window.setLanguage(lang); };

// ===========================================================
// Boot
document.addEventListener("DOMContentLoaded", async () => {
  initLangPopup();

  // Se inietti header/footer o altre parti asincrone, assicurati di chiamare
  // autoAssignI18nAttr + applyTranslations DOPO averle aggiunte al DOM.
  // Qui carichiamo la lingua PER ULTIMO così evitiamo il "flash" vuoto.
  const initial = getSavedLang() || FALLBACK_LANG;
  window.loadLanguage(initial);
});
