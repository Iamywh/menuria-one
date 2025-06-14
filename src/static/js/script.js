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

