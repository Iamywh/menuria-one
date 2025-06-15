// === Variabili globali
let currentLanguage = localStorage.getItem("language") || null;

// === Mostra popup se lingua non selezionata
window.addEventListener("DOMContentLoaded", () => {
  if (!currentLanguage) {
    document.getElementById("languagePopup").style.display = "block";
  } else {
    document.getElementById("languagePopup").style.display = "none";
    loadVisitorCount();
    showWelcomePopup();
  }

  document.getElementById("languageSelector").value = currentLanguage || "es";
});

// === Imposta lingua
function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  document.getElementById("languagePopup").style.display = "none";
  document.getElementById("languageSelector").value = lang;
  showWelcomePopup();
  loadVisitorCount();
}

// === Popup benvenuto
function showWelcomePopup() {
  const seenPopup = localStorage.getItem("welcomeSeen");
  if (!seenPopup) {
    document.getElementById("welcomePopup").style.display = "block";
  }
}

function closeWelcomePopup() {
  localStorage.setItem("welcomeSeen", "true");
  document.getElementById("welcomePopup").style.display = "none";
}

// === Invia messaggio
function sendMessage() {
  const input = document.getElementById("userInput");
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
    .catch(() => {
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
  fetch("/visitor-count")
    .then(res => res.json())
    .then(data => {
      document.getElementById("counter").innerText = data.count;
    });
}

// === Feedback emoji
function sendFeedback(rating) {
  fetch("/rate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating, lang: currentLanguage || "unknown" })
  });
}

// === FAQ toggle
function toggleFAQ() {
  const faq = document.getElementById("faq");
  faq.classList.toggle("hidden");
}
function toggleFAQSection() {
  toggleFAQ();
}

// === PDF Viewer
function openPDF(filename) {
  window.open(`/static/pdf/${filename}`, '_blank');
}
