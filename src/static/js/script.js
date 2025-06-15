// ================== GESTIONE LINGUA ===================
function setLanguage(langCode) {
  localStorage.setItem("selectedLanguage", langCode);
  location.reload(); // Ricarica per applicare traduzioni
}

function getLanguage() {
  return localStorage.getItem("selectedLanguage") || "es";
}

// ================== VISITOR COUNT =====================
function updateVisitorCounter() {
  fetch("/visitor-count")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("counter").textContent = data.count;
    })
    .catch((err) => console.error("Visitor count error:", err));
}

// ================== CHAT CONVERSAZIONE =================
function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  const lang = getLanguage();

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, lang }),
  })
    .then((res) => res.json())
    .then((data) => {
      appendMessage("bot", data.response);
    })
    .catch((err) => {
      console.error("Errore invio:", err);
      appendMessage("bot", "Error en la comunicación.");
    });
}

function appendMessage(sender, text) {
  const container = document.getElementById("messages");
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = `<p>${text}</p>`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

// ================== FAQ DINAMICHE =====================
function loadFAQs() {
  const lang = getLanguage();
  const faqPath = `/static/data/faqs/faq_${lang}.json`;

  fetch(faqPath)
    .then((res) => res.json())
    .then((faqs) => {
      const container = document.getElementById("faq");
      container.innerHTML = "";
      Object.entries(faqs).forEach(([key, value]) => {
        const btn = document.createElement("button");
        btn.className = "faq-btn";
        btn.innerText = value.domanda;
        btn.onclick = () => sendFAQ(value.domanda);
        container.appendChild(btn);
      });
    })
    .catch((err) => console.warn("FAQ non caricate:", err));
}

function toggleFAQSection() {
  document.getElementById("faq").classList.toggle("hidden");
}

function sendFAQ(question) {
  document.getElementById("userInput").value = question;
  sendMessage();
}

// ================== FEEDBACK ==========================
function sendFeedback(rating) {
  const lang = getLanguage();

  fetch("/rate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rating,
      lang,
    }),
  })
    .then((res) => res.json())
    .then(() => alert("¡Gracias por tu feedback!"))
    .catch((err) => console.error("Feedback error:", err));
}

// ================== POPUP DI BENVENUTO =================
function closeWelcomePopup() {
  const popup = document.getElementById("welcomePopup");
  popup.style.display = "none";
  localStorage.setItem("welcomeShown", "true");
}

function showWelcomeIfNeeded() {
  const shown = localStorage.getItem("welcomeShown");
  if (!shown) {
    document.getElementById("welcomePopup").style.display = "block";
  }
}

// ================== AVVIO ==============================
document.addEventListener("DOMContentLoaded", () => {
  const lang = getLanguage();

  // Imposta lingua attiva nel selettore
  const selector = document.getElementById("languageSelector");
  if (selector) {
    selector.value = lang;
    selector.addEventListener("change", () => {
      setLanguage(selector.value);
    });
  }

  updateVisitorCounter();
  loadFAQs();
  showWelcomeIfNeeded();
});
