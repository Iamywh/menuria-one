// ===== restaurant.js — i18n-ready =====

// Dati offerte
const OFFERS = [
  {
    id: "of1",
    title_i18n: "rest_card1_title",
    title: "Cubo de Cerveza",
    img: "/static/img/galleries/Promos/promocubo.png",
    desc_i18n: "rest_card1_desc",
    desc: "5 cervezas frías en un cubo con hielo + 1/2 ración de nachos. Ideal para compartir con amigos en la terraza. ¡Refrescante y a buen precio!",
    price: "20,00 €",
    badge_i18n: "rest_badge_afternoon",
    badge: "Tarde"
  },
  {
    id: "of2",
    title_i18n: "rest_card2_title",
    title: "Promo Tardeo",
    img: "/static/img/galleries/Promos/promotardeo.png",
    desc_i18n: "rest_card2_desc",
    desc: "2 cócteles + 1/2 ración de nachos.<br> Perfecto para disfrutar de una tarde con amigos.",
    price: "18,00 €",
    badge_i18n: "rest_badge_afternoon",
    badge: "Tarde"
  }
];

// ---- i18n helper (usa window.T se presente) ----
function t(key, fb){
  if (typeof window.T === "function") return window.T(key, fb || "");
  // fallback minimo se T non è ancora definita
  const lang = (window.currentLang || "es").toLowerCase();
  const dict = (window.I18N && (I18N[lang] || I18N.es)) || {};
  const v = (key && Object.prototype.hasOwnProperty.call(dict, key)) ? dict[key] : null;
  return (v === null || v === undefined || v === "") ? (fb || "") : v;
}
const TT = {
  title: o => t(o.title_i18n, o.title),
  desc:  o => t(o.desc_i18n,  o.desc),
  badge: o => t(o.badge_i18n, o.badge || ""),
  cta:      () => t("rest_cta_view", "Ver"),
  ariaMore: () => t("rest_aria_details", "Detalles"),
  modalClose: () => t("rest_modal_close", "Cerrar")
};

// ===== Render Cards =====
function renderOffers(containerId="offers") {
  const host = document.getElementById(containerId);
  if (!host) return;

  host.innerHTML = "";
  OFFERS.forEach(o => {
    const card = document.createElement("article");
    card.className = "rest-card";
    card.innerHTML = `
      <div class="rest-img" style="background-image:url('${o.img}')"></div>
      <div class="rest-body">
        ${TT.badge(o) ? `<span class="rest-badge">${TT.badge(o)}</span>` : ""}
        <h3 class="rest-title">${TT.title(o)}</h3>
        <p class="rest-desc"></p>
        <div class="rest-meta">
          <span class="rest-price">${o.price || ""}</span>
          <button class="rest-more" aria-label="${TT.ariaMore()}">${TT.cta()}</button>
        </div>
      </div>
    `;
    // descrizione può contenere <br>
    card.querySelector(".rest-desc").innerHTML = TT.desc(o);

    // interazioni
    card.querySelector(".rest-more").addEventListener("click", ()=> openOfferModal(o));
    card.addEventListener("click", e=>{
      if (!e.target.classList.contains("rest-more")) openOfferModal(o);
    });

    host.appendChild(card);
  });
}

// ===== Modal =====
function openOfferModal(o) {
  let modal = document.getElementById("rest-offer-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "rest-offer-modal";
    modal.className = "rest-modal";
    modal.innerHTML = `
      <div class="rest-modal-backdrop"></div>
      <div class="rest-modal-box">
        <button class="rest-modal-close" aria-label="${TT.modalClose()}">✕</button>
        <div class="rest-modal-media"><img alt=""></div>
        <div class="rest-modal-info">
          <h3 class="m-title"></h3>
          <p class="m-desc"></p>
          <div class="m-price"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector(".rest-modal-backdrop").addEventListener("click", closeOfferModal);
    modal.querySelector(".rest-modal-close").addEventListener("click", closeOfferModal);
  }
  modal.querySelector("img").src = o.img;
  modal.querySelector("img").alt = TT.title(o);
  modal.querySelector(".m-title").textContent = TT.title(o);
  modal.querySelector(".m-desc").innerHTML = TT.desc(o);
  modal.querySelector(".m-price").textContent = o.price || "";
  modal.querySelector(".rest-modal-close").setAttribute("aria-label", TT.modalClose());
  modal.style.display = "flex";
}

function closeOfferModal(){
  const m = document.getElementById("rest-offer-modal");
  if (m) m.style.display = "none";
}

// ===== Boot & re-render =====
function safeRender(){
  // se il dizionario non è ancora pronto, rifaccio un giro tra poco
  try { renderOffers("offers"); } catch(e){}
}
document.addEventListener("DOMContentLoaded", safeRender);
// al cambio lingua (incluso boot dopo patch a i18n) ri-renderizza
window.addEventListener("menuria:languageChanged", safeRender);
