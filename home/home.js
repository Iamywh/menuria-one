// === Variabili globali
let currentLanguage = (localStorage.getItem("menuria_lang") || localStorage.getItem("lang") || "es").toLowerCase();
let languageData = {};

// === Carica traduzioni da lang.json
fetch("/data/lang.json")
  .then(res => res.json())
  .then(data => {
    languageData = data;
    loadLanguageContent();
    renderHighlightBox();
    showFaqCategory('venue');
  })
  .catch(error => console.error("Errore nel caricamento delle traduzioni:", error));


function getLang() {
  return (currentLanguage || localStorage.getItem("menuria_lang") || localStorage.getItem("lang") || "es").toLowerCase();
}
function setLang(lang) {
  currentLanguage = (lang || "es").toLowerCase();
  localStorage.setItem("menuria_lang", currentLanguage);
  localStorage.setItem("lang", currentLanguage); // compat vecchio codice
}


function renderHighlightBox() {
  const box = document.getElementById("esHighlight");
  if (!box) return;

  if (currentLanguage === "es" && languageData.es) {
    const L = languageData.es;
    const title = L.popup_welcome || "¡Bienvenido a Menuria!";
    const t1 = L.popup_text_1 || "";
    const t2 = L.popup_text_2 || "";
    const t3 = L.popup_text_3 || "";
    box.innerHTML = `
      <div class="hb-title">🎉 ${title}</div>
      <p>${t1}</p>
      <p>${t2}</p>
      <p>${t3}</p>
    `;
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}

function loadLanguageContent() {
  if (!languageData[currentLanguage]) return;
  const lang = languageData[currentLanguage];

  const clearBtn = document.getElementById("clearChatBtn");
  if (clearBtn && lang.clear_chat) clearBtn.innerText = lang.clear_chat;

  const titolo = document.getElementById("titolo");
  if (titolo && lang.titolo) titolo.innerText = lang.titolo;

  const visitorLabel = document.getElementById("visitorLabel");
  if (visitorLabel && lang.visitorLabel) visitorLabel.innerText = lang.visitorLabel;

  const analyticsLink = document.getElementById("analyticsLink");
  if (analyticsLink && lang.analytics_link) analyticsLink.innerText = lang.analytics_link;

  const popupWelcome = document.getElementById("popup_welcome");
  if (popupWelcome && lang.popup_welcome) popupWelcome.innerText = lang.popup_welcome;

  const popupText1 = document.getElementById("popup_text_1");
  if (popupText1 && lang.popup_text_1) popupText1.innerText = lang.popup_text_1;

  const popupText2 = document.getElementById("popup_text_2");
  if (popupText2 && lang.popup_text_2) popupText2.innerText = lang.popup_text_2;

  const popupText3 = document.getElementById("popup_text_3");
  if (popupText3 && lang.popup_text_3) popupText3.innerText = lang.popup_text_3;

  const popupButton = document.getElementById("popup_button");
  if (popupButton && lang.popup_button) popupButton.innerText = lang.popup_button;

  const chatTitolo = document.getElementById("chat_titolo");
  if (chatTitolo && lang.chat_titolo) chatTitolo.innerText = lang.chat_titolo;

  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage && lang.welcomeMessage) welcomeMessage.innerText = lang.welcomeMessage;

  const rfoot1 = document.getElementById("rFoot1");
  if (rfoot1 && lang.rFoot1) rfoot1.innerText = lang.rFoot1;

  const rfoot2 = document.getElementById("rFoot2");
  if (rfoot2 && lang.rFoot2) rfoot2.innerText = lang.rFoot2;

  const menuFrame1 = document.getElementById("menuFrame1");
  if (menuFrame1 && lang.menuFrame1) menuFrame1.innerText = lang.menuFrame1;

  const menuFrame2 = document.getElementById("menuFrame2");
  if (menuFrame2 && lang.menuFrame2) menuFrame2.innerText = lang.menuFrame2;

  const menuFrame3 = document.getElementById("menuFrame3");
  if (menuFrame3 && lang.menuFrame3) menuFrame3.innerText = lang.menuFrame3;

  const placeholderMensaje = document.getElementById("userInput");
  if (placeholderMensaje && lang.placeholder_mensaje) {
    placeholderMensaje.placeholder = lang.placeholder_mensaje;
  }

  const botonEnviar = document.getElementById("boton_enviar");
  if (botonEnviar && lang.boton_enviar) botonEnviar.innerText = lang.boton_enviar;

  const ratingPregunta = document.getElementById("rating_pregunta");
  if (ratingPregunta && lang.rating_pregunta) ratingPregunta.innerText = lang.rating_pregunta;

  const faqTitle = document.getElementById("faqTitle");
  if (faqTitle && lang.faqTitle) faqTitle.innerText = lang.faqTitle;

  const tabMap = { venue: 'tab_venue', menu: 'tab_menu', servizi: 'tab_servizi' };
  Object.entries(tabMap).forEach(([cat, key]) => {
    const el = document.getElementById('tab_' + cat);
    if (el && lang[key]) el.textContent = lang[key];
  });

  for (let i = 1; i <= 50; i++) {
    const faqBtn = document.getElementById(`faq_${i}`);
    const faqKey = `faq_${i}`;
    if (faqBtn && lang[faqKey]) {
      faqBtn.innerText = lang[faqKey];
faqBtn.dataset.faqKey = faqKey;
faqBtn.onclick = () => askFAQ(faqKey);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadVisitorCount();
  loadMenuPreviews();
  showFaqCategory('venue');
  renderHighlightBox();
});

// L'header dispatcha menuria:languageChanged con {detail:{lang:'..'}}
window.addEventListener("menuria:languageChanged", (e) => {
  if (e && e.detail && e.detail.lang) setLang(e.detail.lang);
  loadLanguageContent();
  loadMenuPreviews();
  showFaqCategory('venue');
  renderHighlightBox();
});


function setLanguage(lang) {
  setLang(lang);
  loadLanguageContent();
  loadMenuPreviews();
  showFaqCategory('venue');
  renderHighlightBox();
  // niente popup qui
  window.dispatchEvent(new Event('menuria:languageChanged'));
}



function showWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  if (popup && languageData[currentLanguage]) {
    const lang = languageData[currentLanguage];
    const popupWelcome = document.getElementById("popup_welcome");
    if (popupWelcome && lang.popup_welcome) popupWelcome.innerText = lang.popup_welcome;
    const popupText1 = document.getElementById("popup_text_1");
    if (popupText1 && lang.popup_text_1) popupText1.innerText = lang.popup_text_1;
    const popupText2 = document.getElementById("popup_text_2");
    if (popupText2 && lang.popup_text_2) popupText2.innerText = lang.popup_text_2;
    const popupText3 = document.getElementById("popup_text_3");
    if (popupText3 && lang.popup_text_3) popupText3.innerText = lang.popup_text_3;
    const popupButton = document.getElementById("popup_button");
    if (popupButton && lang.popup_button) popupButton.innerText = lang.popup_button;
    popup.style.display = "flex";
  }
}

function closeWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  if (popup) popup.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
  const popupButton = document.getElementById("popup_button");
  if (popupButton) {
    popupButton.addEventListener('click', function(e) {
      e.preventDefault();
      closeWelcomePopup();
    });
  }
});

function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;
  appendMessage("👤", message);

  input.value = "";

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      lang: getLang(),          // ✅ lingua attuale vera
      source: "free_text"
    })
  })
  .then(res => res.json())
  .then(data => appendMessage("🤖", data.response))
  .catch(err => {
    console.error("Errore nella chat:", err);
    appendMessage("🤖", "⚠️ Error connecting to the server.");
  });
}


function appendMessage(sender, text) {
  const messages = document.getElementById("messages");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}</strong>: ${text}`;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

function loadVisitorCount() {
  fetch("/data/visitor-count")
    .then(res => res.json())
    .then(data => {
      const counter = document.getElementById("visitorCounter");
      if (counter) counter.innerText = data.count;
    })
    .catch(error => {
      console.error("Errore nel caricamento del contatore:", error);
      const counter = document.getElementById("visitorCounter");
      if (counter) counter.innerText = "Error";
    });
}

/*function sendFeedback(rating) {
  fetch("/rate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, lang: currentLanguage || "unknown" })
  })
    .catch(error => {
      console.error("Errore nell'invio del feedback:", error);
    });
} */

function toggleFAQ() {
  const faq = document.getElementById("faq");
  if (faq) faq.classList.toggle("hidden");
}

function toggleFAQSection() {
  toggleFAQ();
}

function ask(question) {
  appendMessage("👤", question); // mostra quello localizzato che l’utente ha cliccato

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: question,        // testo localizzato
      lang: getLang(),          // ✅ lingua attuale vera
      source: "faq_click"
    })
  })
  .then(res => res.json())
  .then(data => appendMessage("🤖", data.response))
  .catch(error => {
    console.error("Errore nella FAQ:", error);
    appendMessage("🤖", "⚠️ Error de conexión.");
  });
}


function askFAQ(faqKey) {
  const lang = (currentLanguage || "es").toLowerCase();
  const L = languageData[lang] || {};
  const LES = (languageData.es || {});
  const questionLocalized = L[faqKey] || "";     // testo mostrato all’utente
  const questionES        = LES[faqKey] || "";   // fallback per il backend

  // Mostra in chat ciò che l’utente ha cliccato (nella sua lingua)
  appendMessage("👤", questionLocalized || `[${faqKey}]`);

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // per compat: tieni anche "message" localizzato
      message: questionLocalized || questionES || faqKey,
      // passa la lingua corrente
      lang,
      // passa un ID STABILE per il routing lato server
      faq_key: faqKey,
      // e il testo ES come “ancora” per i matcher esistenti
      message_es: questionES
    })
  })
    .then(res => res.json())
    .then(data => {
      appendMessage("🤖", data.response);
    })
    .catch(error => {
      console.error("Errore nella FAQ:", error);
      appendMessage("🤖", "⚠️ Error de conexión.");
    });
}


function showFaqCategory(category, btn){
  // Mostra/Nasconde i box FAQ
  document.querySelectorAll('.faq-category-box').forEach(box=>{
    const match = box.id === `faq-${category}`;
    box.classList.toggle('active', match);
    box.classList.toggle('hidden', !match);
  });

  const target = document.getElementById('faq-' + category);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }

  // Aggiorna bottone attivo
  document.querySelectorAll('.faq-categories-tabs button').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`.faq-categories-tabs button[onclick*="${category}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

function scrollFAQ(direction) {
  const container = document.getElementById("faq-carousel-box");
  if (!container) return;
  const scrollAmount = 300;
  container.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
}
function selectLanguagePopup(lang) {
    currentLanguage = lang;
    loadLanguageContent();
    loadMenuPreviews();
    document.getElementById("languagePopup").style.display = "flex";
    showWelcomePopup();
  }

function showLanguagePopupOnLoad() {
  const welcomePopup = document.getElementById("welcomePopup");
    if (welcomePopup) welcomePopup.style.display = "none";
    const languagePopup = document.getElementById("languagePopup");
    if (languagePopup) languagePopup.style.display = "flex";
};
// Fallback no-op se non è stato definito altrove
window.loadMenuPreviews = window.loadMenuPreviews || function(){
  // opzionale: qui potremmo rigenerare le anteprime usando window.menus
  // per ora basta evitare il crash.
};

// Se vuoi aggiornare le anteprime quando cambia lingua:
window.onLanguageChange = window.onLanguageChange || function(){
  try { window.loadMenuPreviews(); } catch(e){}
};

function renderHighlightBox() {
  const box = document.getElementById("esHighlight");
  if (!box) return;

  const L = (languageData && languageData[currentLanguage]) ? languageData[currentLanguage] : {};
  const title = L.popup_welcome || "¡Bienvenido!";
  const t1 = L.popup_text_1 || "";
  const t2 = L.popup_text_2 || "";
  const t3 = L.popup_text_3 || "";

  box.innerHTML = `
    <div class="hb-title">🎉 ${title}</div>
    ${t1 ? `<p>${t1}</p>` : ""}
    ${t2 ? `<p>${t2}</p>` : ""}
    ${t3 ? `<p>${t3}</p>` : ""}
  `;
  box.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("highlightClose");
  const highlight = document.getElementById("highlightBox");
  if (closeBtn && highlight) {
    closeBtn.addEventListener("click", () => {
      highlight.style.display = "none";
    });
  }
});
// === Bind descrizione ristorante (5 paragrafi) ===
function applyRestaurantDescription() {
  // prova a leggere la lingua da i18n, poi fallback
  const lang = (window.currentLang || window.currentLanguage || "es").toLowerCase();
  const dict = (window.I18N && (I18N[lang] || I18N.es)) || {};

  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`restaurant_description_${i}`);
    const key = `restaurant_description_${i}`;
    if (el) el.innerText = (dict[key] || "");
  }
}

// al boot e ad ogni cambio lingua
document.addEventListener("DOMContentLoaded", () => {
  applyRestaurantDescription();
});
window.addEventListener("menuria:languageChanged", () => {
  applyRestaurantDescription();
});

function clearChat(confirmAsk = true){
  const messages = document.getElementById("messages");
  if (!messages) return;

  if (confirmAsk){
    const lang = (currentLanguage || "es").toLowerCase();
    const msg = {
      es: "¿Vaciar el chat?",
      it: "Svuotare la chat?",
      en: "Clear the chat?",
      fr: "Vider le chat ?",
      de: "Chat leeren?",
      pt: "Limpar o chat?",
      ru: "Очистить чат?"
    }[lang] || "Clear the chat?";
    if (!window.confirm(msg)) return;
  }

  messages.innerHTML = "";
  const systemMsg = document.createElement("div");
  systemMsg.className = "system-msg";
  systemMsg.textContent = "— chat resettata —";
  messages.appendChild(systemMsg);
  messages.scrollTop = messages.scrollHeight;
}

// bind al click + scorciatoia tastiera
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clearChatBtn");
  if (clearBtn){
    clearBtn.addEventListener("click", () => clearChat(true));
  }

  // Ctrl/Cmd + K per pulire (come molti editor)
  document.addEventListener("keydown", (e)=>{
    const ctrlOrCmd = e.ctrlKey || e.metaKey;
    if (ctrlOrCmd && e.key.toLowerCase() === "k"){
      e.preventDefault();
      clearChat(false);
    }
  });
});

// Carica e mostra i contatori (opzionale: mostrali in badge vicino alle emoji)
async function renderRatingCounts() {
  try {
    const res = await fetch('/data/rating_counts.json', { cache: 'no-store' });
    if (!res.ok) return;
    const counts = await res.json(); // { happy: 12, neutral: 5, sad: 3 }
    // Se vuoi, aggiorna badge in DOM (aggiungi <span class="count"> nel markup)
    const map = { happy: '.emoji-happy', neutral: '.emoji-neutral', sad: '.emoji-sad' };
    Object.entries(map).forEach(([k, sel]) => {
      const btn = document.querySelector(sel);
      if (!btn) return;
      let badge = btn.querySelector('.count');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'count';
        badge.style.marginLeft = '6px';
        badge.style.opacity = '0.7';
        btn.appendChild(badge);
      }
      if (counts && typeof counts[k] !== 'undefined') badge.textContent = counts[k];
    });
  } catch (_) {}
}

// Evita doppio voto per sessione
function canVote() {
  return !localStorage.getItem('menuria_voted');
}
function markVoted() {
  localStorage.setItem('menuria_voted', String(Date.now()));
}

// === Utility per messaggi tradotti
function t(key, fallback) {
  const lang = (currentLanguage || 'es').toLowerCase();
  const dict = languageData[lang] || {};
  return dict[key] || fallback;
}

// === Toast popup
function showToast(message, ms=3000){
  const el = document.getElementById('menuriaToast');
  if(!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> el.classList.remove('show'), ms);
}

// === Feedback con emoji
function sendFeedback(rating) {
  if (!canVote()) {
    appendMessage('ℹ️', t('feedback_already', 'Feedback già inviato in questa sessione.'));
    return;
  }
  fetch('/rate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rating, 
      lang: (currentLanguage || 'unknown').toLowerCase(),
      url: location.pathname
    })
  })
  .then(r => {
    if (!r.ok) throw new Error('rate failed');
    markVoted();
    appendMessage('🤖', t('feedback_thanks', 'Grazie per il tuo feedback!'));
    showToast(t('toast_thanks_rating', '¡Gracias por tu valoración!'));
    renderRatingCounts();
  })
  .catch(err => {
    console.error('Errore nell\'invio del feedback:', err);
    appendMessage('🤖', t('feedback_error', '⚠️ Problema con il salvataggio del feedback.'));
  });
}

// === Commenti testuali
function submitComment() {
  const ta = document.getElementById('userComment');
  if (!ta) return;
  const text = (ta.value || '').trim();
  if (!text) {
    appendMessage('ℹ️', t('feedback_write_first', 'Scrivi un commento prima di inviare.'));
    return;
  }
  const payload = {
    comment: text,
    lang: (currentLanguage || 'es').toLowerCase(),
    url: location.pathname,
    ts: new Date().toISOString()
  };

  fetch('/feedback', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
  .then(r => {
    if (!r.ok) throw new Error('feedback failed');
    ta.value = '';
    appendMessage('🤖', t('feedback_comment_received', 'Grazie! Commento ricevuto.'));
    showToast(
      t('toast_thanks_comment', 
        "Gracias por tu comentario, es muy importante para nosotros conocer tu opinión.")
    );
  })
  .catch(err => {
    console.error('Errore nell\'invio del commento:', err);
    appendMessage('🤖', t('feedback_comment_error', '⚠️ Non sono riuscito a salvare il commento.'));
  });
}




