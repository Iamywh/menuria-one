  const LANG_KEY = "menuria_lang";
  const fallbackLang = "es";
  let currentLang = (localStorage.getItem(LANG_KEY) || fallbackLang).toLowerCase();

  const I18N = {
    es: {
      home_title: "Restaurante La Casita del Nazareno",
      visitors: "👥 Visitantes:",
      analytics: "📊 Analíticas",
      faq_1: "¿Cómo puedo ver el menú?",
      faq_2: "¿Cómo puedo hacer una reserva?",
      faq_3: "¿Se puede reservar la terraza en la azotea?",
      faq_4: "¿Cuántos asientos tiene el local?",
      main_menus: "🍽️ Menú",
      main_restaurant: "🏠 El Restaurante",
      main_gallery: "📸 Galería",
      faq_title: "❓ Preguntas Frecuentes",
      chat_title: "Chatbot",
      chat_placeholder: "Escribe tu mensaje...",
      send: "Enviar",
      rate_q: "¿Cómo calificarías nuestro asistente?",
      foot_rest: "Contáctanos - Restaurante La Casita del Nazareno",
      foot_men: "Contáctanos - Menuria",

      gallery_title: "Nuestra Galería",
      gallery_intro: "Descubre nuestros platos, cócteles, tartas y cafés en una experiencia visual única.",
      filter_all: "Todos", filter_platos: "Platos", filter_cocktail: "Cócteles", filter_tartas: "Tartas", filter_cafe: "Cafés",

      menus_title: "Nuestros Menús", choose_menu: "Elige un menú:",
      prev: "Anterior", next: "Siguiente",
      iva_note: "Precios IVA incluido · Ambiente familiar y casero",

      ristorante_titolo: "Nuestro Restaurante",
      promo_titolo: "Nuestras Promociones",
      promo_cubo_titolo: "Cubo de Cerveza",
      promo_tardeo_titolo: "Promo Tardeo"
    },
    it: {
      home_title: "Ristorante La Casita del Nazareno",
      visitors: "👥 Visitatori:",
      analytics: "📊 Analytics",
      main_menus: "🍽️ Menù",
      main_restaurant: "🏠 Il Ristorante",
      main_gallery: "📸 Galleria",
      faq_title: "❓ Domande Frequenti",
      chat_title: "Chatbot",
      chat_placeholder: "Scrivi il tuo messaggio...",
      send: "Invia",
      rate_q: "Come valuteresti il nostro assistente?",
      foot_rest: "Contattaci - Ristorante La Casita del Nazareno",
      foot_men: "Contattaci - Menuria",

      gallery_title: "La Nostra Galleria",
      gallery_intro: "Scopri i nostri piatti, cocktail, torte e caffè in un'esperienza visiva unica.",
      filter_all: "Tutti", filter_platos: "Piatti", filter_cocktail: "Cocktail", filter_tartas: "Torte", filter_cafe: "Caffè",

      menus_title: "I Nostri Menù", choose_menu: "Scegli un menù:",
      prev: "Indietro", next: "Avanti",
      iva_note: "Prezzi IVA inclusa · Ambiente familiare e casalingo",

      ristorante_titolo: "Il nostro Ristorante",
      promo_titolo: "Le nostre Promozioni",
      promo_cubo_titolo: "Secchiello Birre",
      promo_tardeo_titolo: "Promo Tardeo"
    },
    en: {
      home_title: "La Casita del Nazareno Restaurant",
      visitors: "👥 Visitors:",
      analytics: "📊 Analytics",
      main_menus: "🍽️ Menus",
      main_restaurant: "🏠 The Restaurant",
      main_gallery: "📸 Gallery",
      faq_title: "❓ Frequently Asked Questions",
      chat_title: "Chatbot",
      chat_placeholder: "Type your message...",
      send: "Send",
      rate_q: "How would you rate our assistant?",
      foot_rest: "Contact us - La Casita del Nazareno",
      foot_men: "Contact us - Menuria",

      gallery_title: "Our Gallery",
      gallery_intro: "Discover our dishes, cocktails, cakes and coffees in a unique visual experience.",
      filter_all: "All", filter_platos: "Dishes", filter_cocktail: "Cocktails", filter_tartas: "Cakes", filter_cafe: "Coffees",

      menus_title: "Our Menus", choose_menu: "Choose a menu:",
      prev: "Prev", next: "Next",
      iva_note: "VAT included · Cozy family atmosphere",

      ristorante_titolo: "Our Restaurant",
      promo_titolo: "Our Promotions",
      promo_cubo_titolo: "Beer Bucket",
      promo_tardeo_titolo: "Tardeo Promo"
    }
  };

  function applyI18n(root = document) {
    root.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const txt = I18N[currentLang]?.[key] ?? I18N[fallbackLang]?.[key];
      if (txt != null) {
        if (el.tagName === "INPUT" && el.hasAttribute("placeholder")) el.placeholder = txt;
        else el.innerText = txt;
      }
    });
    // badge visitors/analytics se sono su una riga
    const visLabel = document.getElementById("visitorLabel");
    if (visLabel && visLabel.firstChild && visLabel.firstChild.nodeType === 3) {
      visLabel.firstChild.textContent = (I18N[currentLang]?.visitors || I18N[fallbackLang].visitors) + " ";
    }
    const a = document.getElementById("analyticsLink");
    if (a) a.textContent = I18N[currentLang]?.analytics || I18N[fallbackLang].analytics;
  }

  function setLanguage(lang) {
    currentLang = (lang || fallbackLang).toLowerCase();
    localStorage.setItem(LANG_KEY, currentLang);
    applyI18n();
  }

  function bindFlags() {
    document.querySelectorAll(".language-flags img[alt], .lang-switch img[alt]").forEach(img => {
      img.addEventListener("click", () => setLanguage(img.alt));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindFlags();
    applyI18n();
  });

  // per popup iniziale
  window.selectLanguagePopup = setLanguage;
