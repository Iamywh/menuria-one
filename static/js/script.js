// === Variabili globali
let currentLanguage = "es"; // Rimosso localStorage per evitare errori
let languageData = {}; // Qui finiranno le traduzioni

// === Carica traduzioni da lang.json
fetch("/data/lang.json")
  .then(res => res.json())
  .then(data => {
    languageData = data;
    loadLanguageContent(); // Carica i testi dopo aver ottenuto le traduzioni
    showWelcomePopup(); // Mostra il popup DOPO aver caricato le traduzioni
  })
  .catch(error => {
    console.error("Errore nel caricamento delle traduzioni:", error);
  });

function loadLanguageContent() {
  if (!languageData[currentLanguage]) return;

  const lang = languageData[currentLanguage];

  // === Traduzioni degli elementi base ===
  // Titolo principale
  const titolo = document.getElementById("titolo");
  if (titolo && lang.titolo) titolo.innerText = lang.titolo;

  // Visitor label
  const visitorLabel = document.getElementById("visitorLabel");
  if (visitorLabel && lang.visitors_label) visitorLabel.innerText = lang.visitors_label;

  // Analytics link
  const analyticsLink = document.getElementById("analyticsLink");
  if (analyticsLink && lang.analytics_link) analyticsLink.innerText = lang.analytics_link;

  // === Traduzioni del popup di benvenuto ===
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

  // === Traduzioni del chat ===
  const chatTitolo = document.getElementById("chat_titolo");
  if (chatTitolo && lang.chat_titolo) chatTitolo.innerText = lang.chat_titolo;

  const welcomeMessage = document.getElementById("welcomeMessage");
  if (welcomeMessage && lang.welcomeMessage) welcomeMessage.innerText = lang.welcomeMessage;

  const placeholderMensaje = document.getElementById("placeholder_mensaje");
  if (placeholderMensaje && lang.placeholder_mensaje) {
    placeholderMensaje.placeholder = lang.placeholder_mensaje;
  }

  const botonEnviar = document.getElementById("boton_enviar");
  if (botonEnviar && lang.boton_enviar) botonEnviar.innerText = lang.boton_enviar;

  // === Traduzioni del feedback ===
  const ratingPregunta = document.getElementById("rating_pregunta");
  if (ratingPregunta && lang.rating_pregunta) ratingPregunta.innerText = lang.rating_pregunta;

  // === Traduzioni delle FAQ ===
  const faqTitulo = document.getElementById("faq_titulo");
  if (faqTitulo && lang.faq_titulo) faqTitulo.innerText = lang.faq_titulo;

  // Traduci tutti i bottoni FAQ
  for (let i = 1; i <= 19; i++) {
    const faqBtn = document.getElementById(`faq_${i}`);
    const faqKey = `faq_${i}`;
    if (faqBtn && lang[faqKey]) {
      faqBtn.innerText = lang[faqKey];
      // Aggiorna anche l'onclick con la domanda tradotta
      faqBtn.setAttribute("onclick", `ask('${lang[faqKey]}')`);
    }
  }
}

// === Mostra popup se lingua non selezionata
window.addEventListener("DOMContentLoaded", () => {
  // Carica sempre il contatore visitatori e le anteprime menu
  loadVisitorCount();
  loadMenuPreviews();
  // Il popup di benvenuto viene mostrato dopo il caricamento delle traduzioni
});

// === Imposta lingua
function setLanguage(lang) {
  currentLanguage = lang;
  
  // Carica i contenuti tradotti
  loadLanguageContent();
  loadMenuPreviews(); // Ricarica le anteprime con la nuova lingua
  
  // Se le traduzioni sono già caricate, mostra il popup
  if (languageData[currentLanguage]) {
    showWelcomePopup();
  }
}

// === Popup benvenuto tradotto
function showWelcomePopup() {
  // Controlla se abbiamo già visto il popup (puoi riattivare localStorage se funziona)
  // const seenPopup = localStorage.getItem("welcomeSeen");
  // if (seenPopup) return;
  
  const popup = document.getElementById("welcomePopup");
  if (popup && languageData[currentLanguage]) {
    // Aggiorna i testi del popup con le traduzioni
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
    
    popup.style.display = "flex"; // CAMBIATO da "block" a "flex"
    console.log("Popup mostrato"); // Debug
  }
}

// === FUNZIONE CORRETTA per chiudere popup ===
function closeWelcomePopup() {
  console.log("Tentativo di chiusura popup"); // Debug
  
  // localStorage.setItem("welcomeSeen", "true");
  const popup = document.getElementById("welcomePopup");
  if (popup) {
    popup.style.display = "none";
    console.log("Popup chiuso"); // Debug
  } else {
    console.log("Popup non trovato!"); // Debug
  }
}

// === AGGIUNGI EVENT LISTENER ALTERNATIVO ===
document.addEventListener('DOMContentLoaded', function() {
  const popupButton = document.getElementById("popup_button");
  if (popupButton) {
    popupButton.addEventListener('click', function(e) {
      e.preventDefault();
      closeWelcomePopup();
    });
    console.log("Event listener aggiunto al pulsante popup");
  }
});

// === Invia messaggio
function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) {
    console.error("Input userInput non trovato");
    return;
  }
  
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

// === Aggiungi messaggio in chat
function appendMessage(sender, text) {
  const messages = document.getElementById("messages");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${sender}</strong>: ${text}`;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

// === Carica contatore visitatori
function loadVisitorCount() {
  fetch("/data/visitor-count")
    .then(res => res.json())
    .then(data => {
      const counter = document.getElementById("visitorCounter");
      if (counter) {
        counter.innerText = data.count;
      }
    })
    .catch(error => {
      console.error("Errore nel caricamento del contatore:", error);
      const counter = document.getElementById("visitorCounter");
      if (counter) {
        counter.innerText = "Error";
      }
    });
}

// === Feedback emoji
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

// === FAQ toggle
function toggleFAQ() {
  const faq = document.getElementById("faq");
  if (faq) {
    faq.classList.toggle("hidden");
  }
}

function toggleFAQSection() {
  toggleFAQ();
}

// === Chat toggle
function toggleChatWindow() {
  const chatWindow = document.getElementById("chatWindow");
  if (chatWindow) {
    chatWindow.classList.toggle("hidden");
  }
}

// === PDF Viewer multilingua
function openPDF(filename) {
  const lang = currentLanguage || "es";
  const path = `/static/menus/${lang}/${filename}`;
  window.open(path, '_blank');
}

// === Mostra domanda + risposta in chat
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

// === Mostra anteprime menu da PDF
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