window.initHeader = function initHeader() {
  // === VISITORS COUNTER (locale, per pagina/utente)
  try {
    const key = 'menuria_visits';
    const n = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, String(n));
    const vc = document.getElementById('visitorCount');
    if (vc) vc.textContent = n.toLocaleString();
  } catch (_) {}

  // === YEAR FOOTER
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();

  // === Nascondi la voce del menu relativa alla pagina corrente
  const seg = (() => {
    let p = window.location.pathname.toLowerCase()
      .replace(/\/index\.html$/, '')   // rimuove index.html finale
      .replace(/\/+$/, '');            // rimuove slash finali
    if (p === '' || p === '/') return 'home';
    const first = p.split('/').filter(Boolean)[0];
    return ['home','restaurant','menus','gallery'].includes(first) ? first : 'home';
  })();

  document.querySelectorAll('.dropdown-content a[data-route]').forEach(a => {
    const r = a.getAttribute('data-route');
    if (r === seg) {
      a.style.display = 'none'; // nascondi voce corrente
    } else {
      a.style.display = '';
      a.style.pointerEvents = '';
      a.style.opacity = '';
    }
  });

  // === ACCESSIBILITÀ / TOGGLES
  const drop = document.querySelector('#mainMenu .dropbtn');
  const dropContent = document.querySelector('#mainMenu .dropdown-content');
  const submenuBtn = document.querySelector('.submenu-btn');
  const submenuContent = document.querySelector('.submenu-content');

  function setExpanded(btn, content, expanded){
    if (!btn || !content) return;
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  if (drop && dropContent){
    drop.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = drop.getAttribute('aria-expanded') === 'true';
      setExpanded(drop, dropContent, !isOpen);
      dropContent.style.display = isOpen ? 'none' : 'block';
    });
    document.addEventListener('click', (e) => {
      if (!dropContent.contains(e.target) && e.target !== drop){
        dropContent.style.display = 'none';
        setExpanded(drop, dropContent, false);
      }
    });
  }

  if (submenuBtn && submenuContent){
    submenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = submenuBtn.getAttribute('aria-expanded') === 'true';
      submenuBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      submenuContent.style.display = isOpen ? 'none' : 'block';
    });
  }

// === LANGUAGE HANDLER
document.querySelectorAll('.lang-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    try { localStorage.setItem('menuria_lang', lang); } catch(_) {}
    
    // Dispatch evento globale
    window.dispatchEvent(new CustomEvent('menuria:languageChanged', { detail:{ lang } }));
    
    // Aggiorna subito le traduzioni (se i18n.js ha la funzione loadLanguage)
    if (typeof window.loadLanguage === 'function') {
      window.loadLanguage(lang);
    }

    // Feedback sul pulsante
    if (submenuBtn) submenuBtn.textContent = `🌐 Idiomas · ${btn.textContent.trim()}`;
  });
});
}
