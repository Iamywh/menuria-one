// ===================== i18n.js (clean, production-safe) =====================
// - Usa entrambe le chiavi localStorage: LANG e lang (compat)
// - Popup lingue: solo prima visita o con ?lang=select
// - Checkbox "non mostrare più" (id="neverShowLangPopup")
// - Espone window.setLanguage e window.selectLanguagePopup

// ---- Traduzioni (solo ES per ora) ----
window.I18N = window.I18N || {};
window.I18N.es = Object.assign({}, window.I18N.es, {
  // Popup idioma
  lang_popup_title: "🌐 Elige tu idioma",
  lang_popup_choose: "Selecciona tu idioma preferido para continuar.",
  lang_never_again: "No volver a mostrar",

  // Filtros alergias (per menus)
  filter_celiac: "Celíacos",
  filter_lactose_free: "Sin lactosa",
  filter_vegan: "Veganos",
  filter_nuts: "Frutos secos",
  filter_crustaceans: "Crustáceos",
  filter_reset: "Restablecer",

  // Menús
  menus_select_category: "Selecciona una categoría"
});

// Prepara contenitori per altre lingue (fallback a ES)
["en","it","fr","de","pt","ru"].forEach(k => { window.I18N[k] = window.I18N[k] || {}; });
["fr","de","pt","ru"].forEach(k => { window.I18N[k] = Object.assign({}, window.I18N.es); });

// ---- Storage helpers ----
const LANG_KEYS = ["LANG","lang"];
const FALLBACK_LANG = "es";
const POPUP_NEVER_KEY = "i18n_popup_never";

function getSavedLang(){
  for (const k of LANG_KEYS){ const v = localStorage.getItem(k); if (v) return v.toLowerCase(); }
  return null;
}
function saveLang(lang){ LANG_KEYS.forEach(k => localStorage.setItem(k, lang)); }
function hasSavedLang(){ return !!getSavedLang(); }

// ---- Stato ----
window.currentLang = getSavedLang() || FALLBACK_LANG;

// ---- Apply & Flags ----
function applyTranslations(){
  const dict = (window.I18N?.[window.currentLang]) || window.I18N.es || {};
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
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
function setLanguage(lang){
  window.currentLang = (lang || FALLBACK_LANG).toLowerCase();
  saveLang(window.currentLang);
  applyTranslations();
  updateActiveFlags();
  const pop = document.getElementById("languagePopup");
  if (pop) pop.style.display = "none";
  try { window.onLanguageChange && window.onLanguageChange(window.currentLang); } catch(e){}
}
function selectLanguagePopup(lang){ setLanguage(lang); }

window.setLanguage = setLanguage;
window.selectLanguagePopup = selectLanguagePopup;

// ---- Popup init ----
function shouldShowLangPopup(){
  const never = localStorage.getItem(POPUP_NEVER_KEY) === "true";
  const force = new URLSearchParams(location.search).get("lang") === "select";
  return force || (!hasSavedLang() && !never);
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
}

// ---- Boot ----
document.addEventListener("DOMContentLoaded", () => {
  initLangPopup();
  applyTranslations();
  updateActiveFlags();
});
// =====================================================================
// --- PASTE PATCH IN i18n.js ---

// consume 'force' solo una volta per pagina
window._i18nForceConsumed = false;

function clearLangForceFromURL() {
  const url = new URL(window.location.href);
  if (url.searchParams.has('lang')) {
    url.searchParams.delete('lang'); // rimuovi ?lang=select
    history.replaceState(null, '', url.toString());
  }
  if (url.searchParams.has('forcePopup')) {
    url.searchParams.delete('forcePopup');
    history.replaceState(null, '', url.toString());
  }
}

function shouldShowLangPopup(){
  const never = localStorage.getItem('i18n_popup_never') === 'true';
  const hasLang = !!(localStorage.getItem('lang') || localStorage.getItem('LANG'));
  const force = new URLSearchParams(location.search).get('lang') === 'select';
  if (force && !_i18nForceConsumed) {
    // lo mostri una sola volta; poi segna "consumato"
    window._i18nForceConsumed = true;
    return true;
  }
  return !hasLang && !never;
}

// CHIUSURA POPUP LINGUA (usala quando clicchi X o “Cerrar”)
function closeLanguagePopupHard() {
  const pop = document.getElementById('languagePopup');
  if (pop) pop.style.display = 'none';
  // se l’utente ha spuntato "non mostrare più", persistilo ora
  const cb = document.getElementById('neverShowLangPopup');
  if (cb && cb.checked) localStorage.setItem('i18n_popup_never', 'true');
  // IMPORTANT: rimuovi il force dall’URL così non torna più
  clearLangForceFromURL();
}

// override leggero della tua setLanguage: chiudi + pulisci URL + rispetta checkbox
window.setLanguage = (function(prev){
  return function(lang){
    // chiama la precedente se esiste
    if (typeof prev === 'function') try{ prev(lang); }catch(e){}
    // rinforzo: chiudi e ripulisci URL
    closeLanguagePopupHard();
  };
})(window.setLanguage);

// se usi selectLanguagePopup nel markup, puntalo a setLanguage
window.selectLanguagePopup = function(lang){ window.setLanguage(lang); };

// inizializzazione sicura (una sola volta)
document.addEventListener('DOMContentLoaded', () => {
  const pop = document.getElementById('languagePopup');
  if (pop) pop.style.display = shouldShowLangPopup() ? 'flex' : 'none';

  // wire del checkbox
  const cb = document.getElementById('neverShowLangPopup');
  if (cb){
    cb.checked = localStorage.getItem('i18n_popup_never') === 'true';
    cb.addEventListener('change', e => {
      localStorage.setItem('i18n_popup_never', e.target.checked ? 'true' : 'false');
    });
  }

  // se il popup si è mostrato per "force", rimuovi il param dall’URL già ora
  if (window._i18nForceConsumed) clearLangForceFromURL();
});
