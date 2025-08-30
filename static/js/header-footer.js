window.initHeader = function initHeader() {
  // === VISITORS COUNTER (locale, per pagina/utente)
  try {
    const key = 'menuria_visits';
    const n = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, String(n));
    const vc = document.getElementById('visitorCount');
    if (vc) {
      vc.textContent = n.toLocaleString();
      vc.style.display = 'inline'; // Assicura che sia visibile
    }
  } catch (_) {
    // Fallback se localStorage non è disponibile
    const vc = document.getElementById('visitorCount');
    if (vc) {
      vc.textContent = '—';
    }
  }

  // === YEAR FOOTER
  const y = document.getElementById('currentYear');
  if (y) y.textContent = new Date().getFullYear();

  // === Nascondi la voce del menu relativa alla pagina corrente
  const getCurrentSegment = () => {
    let path = window.location.pathname.toLowerCase()
      .replace(/\/index\.html$/, '')   // rimuove index.html finale
      .replace(/\/+$/, '');            // rimuove slash finali
    
    if (path === '' || path === '/') return 'home';
    
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    // Mappa più robusta delle routes
    const routeMap = {
      'home': 'home',
      'restaurant': 'restaurant', 
      'menu': 'menus',
      'menus': 'menus',
      'gallery': 'gallery',
      'galeria': 'gallery'
    };
    
    return routeMap[firstSegment] || 'home';
  };

  const currentSegment = getCurrentSegment();
  
  // Nascondi la voce corrente dal menu
  document.querySelectorAll('.dropdown-content a[data-route]').forEach(link => {
    const route = link.getAttribute('data-route');
    if (route === currentSegment) {
      link.style.display = 'none';
    } else {
      link.style.display = 'block';
    }
  });

  // === ACCESSIBILITÀ / TOGGLES MIGLIORATI
  const drop = document.querySelector('#mainMenu .dropbtn') || document.querySelector('[data-nav-toggle]');
  const dropContent = document.querySelector('#mainMenu .dropdown-content');
  const submenuBtn = document.querySelector('.submenu-btn');
  const submenuContent = document.querySelector('.submenu-content');

  function setExpanded(btn, content, expanded) {
    if (!btn) return;
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    if (content) {
      content.style.display = expanded ? 'block' : 'none';
    }
  }

  // Gestione menu principale migliorata
  if (drop && dropContent) {
    let isMenuOpen = false;

    const toggleMenu = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      isMenuOpen = !isMenuOpen;
      setExpanded(drop, dropContent, isMenuOpen);
      
      // Aggiorna aria-label per accessibility
      drop.setAttribute('aria-label', isMenuOpen ? 'Chiudi menu' : 'Apri menu');
    };

    const closeMenu = () => {
      if (isMenuOpen) {
        isMenuOpen = false;
        setExpanded(drop, dropContent, false);
        drop.setAttribute('aria-label', 'Apri menu');
      }
    };

    drop.addEventListener('click', toggleMenu);

    // Chiudi menu quando si clicca su un link
    dropContent.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (link && !link.classList.contains('submenu-btn')) {
        closeMenu();
      }
    });

    // Chiudi menu con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
        drop.focus(); // Riporta focus al bottone
      }
    });

    // Chiudi menu cliccando fuori (con debounce)
    let clickOutsideTimeout;
    document.addEventListener('click', (e) => {
      if (clickOutsideTimeout) clearTimeout(clickOutsideTimeout);
      
      clickOutsideTimeout = setTimeout(() => {
        if (!drop.contains(e.target) && !dropContent.contains(e.target) && isMenuOpen) {
          closeMenu();
        }
      }, 10);
    });
  }

  // Gestione sottomenu lingue
  if (submenuBtn && submenuContent) {
    submenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = submenuBtn.getAttribute('aria-expanded') === 'true';
      setExpanded(submenuBtn, submenuContent, !isOpen);
    });

    // Chiudi sottomenu quando si seleziona una lingua
    submenuContent.addEventListener('click', () => {
      setExpanded(submenuBtn, submenuContent, false);
    });
  }

  // === LANGUAGE HANDLER MIGLIORATO
  document.querySelectorAll('.lang-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      
      try { 
        localStorage.setItem('menuria_lang', lang); 
      } catch(_) {
        console.warn('localStorage non disponibile');
      }
      
      // Dispatch evento globale
      window.dispatchEvent(new CustomEvent('menuria:languageChanged', { 
        detail: { lang } 
      }));
      
      // Aggiorna subito le traduzioni
      if (typeof window.loadLanguage === 'function') {
        window.loadLanguage(lang);
      }

      // Feedback visivo sul pulsante
      if (submenuBtn) {
        const langText = btn.textContent.trim();
        submenuBtn.innerHTML = `🌐 <span data-i18n="nav_languages">Idiomas</span> · ${langText}`;
      }

      // Chiudi il menu dopo la selezione
      if (dropContent) {
        dropContent.style.display = 'none';
      }
    });
  });

  // === HIDE/SHOW HEADER ON SCROLL (MIGLIORATO)
  let lastScrollTop = 0;
  let scrollTimeout;
  const header = document.querySelector('.site-header');
  const scrollThreshold = 10; // Pixel di tolleranza prima di nascondere

  if (header) {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDelta = Math.abs(scrollTop - lastScrollTop);

      // Solo se lo scroll è significativo
     /* if (scrollDelta > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scroll down e siamo oltre i primi 100px: nascondi
      //    header.classList.add('hidden');
        } else {
          // Scroll up: mostra
       //   header.classList.remove('hidden');
        }
      } */

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    // Throttle dello scroll per performance
    window.addEventListener('scroll', () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    }, { passive: true });

    // Mostra sempre header quando si è in cima alla pagina
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop <= 50) {
        header.classList.remove('hidden');
      }
    }, { passive: true });
  }
}

// === NAV TOGGLER ROBUSTO ===
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  
  if (!burger || !nav) return;

  const openClass = 'is-open';
  let isNavOpen = false;

  const open = () => {
    if (isNavOpen) return;
    nav.classList.add(openClass);
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    isNavOpen = true;
  };

  const close = () => {
    if (!isNavOpen) return;
    nav.classList.remove(openClass);
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    isNavOpen = false;
  };

  const toggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    isNavOpen ? close() : open();
  };

  // Event listeners
  burger.addEventListener('click', toggle);

  // Chiudi con click esterno
  document.addEventListener('click', (e) => {
    if (isNavOpen && !nav.contains(e.target) && !burger.contains(e.target)) {
      close();
    }
  });

  // Chiudi con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen) {
      close();
    }
  });

  // Chiudi quando si clicca su un link del menu
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (link) {
      close();
    }
  });

  // Chiudi menu quando si ridimensiona la finestra (responsive)
  window.addEventListener('resize', () => {
    if (isNavOpen) close();
  });
});

// === INIZIALIZZAZIONE AUTOMATICA ===
document.addEventListener('DOMContentLoaded', () => {
  if (typeof window.initHeader === 'function') {
    window.initHeader();
  }
});

// Global function per cambiare lingua (per compatibilità)
window.setLanguage = function(lang) {
  try {
    localStorage.setItem('menuria_lang', lang);
    window.dispatchEvent(new CustomEvent('menuria:languageChanged', { 
      detail: { lang } 
    }));
    if (typeof window.loadLanguage === 'function') {
      window.loadLanguage(lang);
    }
  } catch(e) {
    console.warn('Errore nel cambio lingua:', e);
  }
};