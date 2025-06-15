function openPDF(file) {
  window.open(`/static/menus/${file}`, '_blank');
}

function toggleFAQ() {
  const popup = document.getElementById('faq-popup');
  popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}

function fillInput(text) {
  // Integrazione con l'input del chatbot se presente
  alert(`Auto-riempimento: ${text}`);
}

function sendMessage() {
      const input = document.getElementById('userInput');
      const message = input.value.trim();
      if (!message) return;
      addMessage('user', message);
      input.value = '';

      fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message })
      })
      .then(response => response.json())
      .then(data => {
        addMessage('bot', data.response);
      })
      .catch(() => {
        addMessage('bot', "Hubo un problema al comunicarse con el servidor.");
      });
    }

    function addMessage(role, text) {
      const messages = document.getElementById('messages');
      const div = document.createElement('div');
      div.className = 'message ' + role;
      div.textContent = (role === 'user' ? 'Tú: ' : 'Menuria: ') + text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function ask(question) {
      document.getElementById('userInput').value = question;
      sendMessage();
    }

function closePopup() {
  const popup = document.getElementById('welcomePopup');
  if (popup) {
    popup.style.display = 'none';
    // Puoi anche salvare un flag per non mostrarlo di nuovo
    localStorage.setItem('menuriaPopupShown', 'true');
  }
}

function sendFeedback(type) {
  alert("Gracias por tu opinión: " + type);
  // Puoi poi inviarlo al backend qui se vuoi
}

// Contatore visitatori simulato (solo client-side per ora)
document.addEventListener('DOMContentLoaded', () => {
  let count = localStorage.getItem('visitCount');
  if (!count) count = 1;
  else count = parseInt(count) + 1;
  localStorage.setItem('visitCount', count);
  const counterSpan = document.getElementById('counter');
  if (counterSpan) counterSpan.innerText = count;
});

function toggleFAQSection() {
  const faq = document.getElementById('faq');
  faq.classList.toggle('hidden');
}
// Mostra popup lingua se non è stata ancora scelta
window.addEventListener('load', () => {
  const selectedLang = localStorage.getItem('lang');
  if (!selectedLang) {
    document.getElementById('languagePopup').style.display = 'flex';
  } else {
    setLanguage(selectedLang);
  }
});

// Imposta lingua da bandierina
function chooseLanguage(langCode) {
  localStorage.setItem('lang', langCode);
  setLanguage(langCode);
  document.getElementById('languagePopup').style.display = 'none';
}

// Imposta lingua da menu selettore
function changeLanguageFromSelector(selectElement) {
  const langCode = selectElement.value;
  localStorage.setItem('lang', langCode);
  setLanguage(langCode);
}

// Funzione centrale per applicare la lingua (può essere estesa per traduzioni future)
function setLanguage(lang) {
  console.log("Lingua attiva:", lang);
  document.documentElement.lang = lang;
  const langSelector = document.getElementById('langSelect');
  if (langSelector) langSelector.value = lang;
  // Qui puoi caricare testi dinamici o file JSON se vuoi traduzioni automatiche future
}
