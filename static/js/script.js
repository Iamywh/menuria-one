// === Variabili globali
let currentLanguage = "es";
let languageData = {};

// === Carica traduzioni da lang.json
fetch("/data/lang.json")
  .then(res => res.json())
  .then(data => {
    languageData = data;
    loadLanguageContent();
  })
  .catch(error => {
    console.error("Errore nel caricamento delle traduzioni:", error);
  });

  localStorage.setItem("lang", "es"); // es, it, en, etc.


function loadLanguageContent() {
  if (!languageData[currentLanguage]) return;
  const lang = languageData[currentLanguage];

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

  for (let i = 1; i <= 26; i++) {
    const faqBtn = document.getElementById(`faq_${i}`);
    const faqKey = `faq_${i}`;
    if (faqBtn && lang[faqKey]) {
      faqBtn.innerText = lang[faqKey];
      faqBtn.setAttribute("onclick", `ask('${lang[faqKey]}')`);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadVisitorCount();
  loadMenuPreviews();
});

function setLanguage(lang) {
  currentLanguage = lang;
  loadLanguageContent();
  loadMenuPreviews();
  if (languageData[currentLanguage]) {
    showWelcomePopup();
  }
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
    body: JSON.stringify({ message, lang: currentLanguage || "es" })
  })
    .then(res => res.json())
    .then(data => {
      appendMessage("🤖", data.response);
    })
    .catch(error => {
      console.error("Errore nella chat:", error);
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

function sendFeedback(rating) {
  fetch("/rate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, lang: currentLanguage || "unknown" })
  })
    .catch(error => {
      console.error("Errore nell'invio del feedback:", error);
    });
}

/*document.getElementById("clearChatBtn").addEventListener("click", function() {
  const chatBox = document.getElementById("messages");
  if (chatBox) {
    chatBox.innerHTML = "";
    const systemMsg = document.createElement("div");
    systemMsg.className = "system-msg";
    systemMsg.innerText = "Chat reset!";
    chatBox.appendChild(systemMsg);
  }
}); */

function toggleFAQ() {
  const faq = document.getElementById("faq");
  if (faq) faq.classList.toggle("hidden");
}

function toggleFAQSection() {
  toggleFAQ();
}

/*function toggleChatWindow() {
  const chatWindow = document.getElementById("chatWindow");
  if (chatWindow) chatWindow.classList.toggle("hidden");
} */

function openPDF(filename) {
  const lang = currentLanguage || "es";
  const path = `/static/menus/${lang}/${filename}`;
  window.open(path, '_blank');
}

function ask(question) {
  appendMessage("👤", question);
  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question, lang: currentLanguage || "es" })
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

function loadMenuPreviews() {
  const lang = currentLanguage || "es";
  const langLabels = languageData[lang] || {};
  const menuItems = [
    { name: langLabels.menu_desayunos || "Desayunos", file: "menu_desayunos_es" },
    { name: langLabels.menu_comida || "Comida", file: "menu_comida_es" },
    { name: langLabels.menu_bebidas || "Bebidas", file: "menu_bebidas_es" },
    { name: langLabels.menu_cafes || "Cafés y Frappés", file: "menu_cafes_frapes_es" }
  ];

  const gallery = document.getElementById("menuGallery");
  if (!gallery) return;
  gallery.innerHTML = "";

  menuItems.forEach(item => {
    const wrapper = document.createElement("div");
    wrapper.className = "menu-wrapper";

    const frame = document.createElement("div");
    frame.className = "menu-frame";
    frame.onclick = () => openPDF(item.file + ".pdf");

    const iframe = document.createElement("iframe");
    iframe.src = `/static/menus/${lang}/${item.file}.pdf#toolbar=0&navpanes=0&scrollbar=0`;
    iframe.className = "menu-preview";

    const caption = document.createElement("p");
    caption.className = "menu-caption";
    caption.textContent = item.name;

    frame.appendChild(iframe);
    wrapper.appendChild(frame);
    wrapper.appendChild(caption);
    gallery.appendChild(wrapper);
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
    document.getElementById("languagePopup").style.display = "none";
    showWelcomePopup();
  }

function showLanguagePopupOnLoad() {
  const welcomePopup = document.getElementById("welcomePopup");
    if (welcomePopup) welcomePopup.style.display = "none";
    const languagePopup = document.getElementById("languagePopup");
    if (languagePopup) languagePopup.style.display = "flex";
}

