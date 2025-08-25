// ===== Dati offerte (esempi) =====
const OFFERS = [
  {
    id: "of1",
    title_i18n: "rest_card1_title", // opzionale: se vuoi usare i18n
    title: "Cubo de Cerveza",
    img: "/static/img/galleries/Promos/promocubo.png",
    desc_i18n: "rest_card1_desc",
    desc: "5 cervezas frías en un cubo con hielo + 1/2 ración de nachos. Ideal para compartir con amigos en la terraza. ¡Refrescante y a buen precio!",
    price: "20,00 €",
    badge: "Tarde"
  },
  {
    id: "of2",
    title_i18n: "rest_card2_title", // opzionale: se vuoi usare i18n
    title: "Promo Tardeo",
    img: "/static/img/galleries/Promos/promotardeo.png",
    desc_i18n: "rest_card2_desc",
    desc: "2 cócteles + 1/2 ración de nachos.<br> Perfecto para disfrutar de una tarde con amigos.",
    price: "18,00 €",
    badge: "Tarde"
  }
 /* {
    id: "of3",
    title: "Cheesecake",
    img: "/static/img/restaurant/cheesecake.jpg",
    desc: "Repostería casera.",
    price: "3,80 €",
    badge: "Postre"
  }*/
];

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
        ${o.badge ? `<span class="rest-badge">${o.badge}</span>` : ""}
        <h3 class="rest-title">${o.title}</h3>
        <p class="rest-desc">${o.desc}</p>
        <div class="rest-meta">
          <span class="rest-price">${o.price || ""}</span>
          <button class="rest-more" aria-label="Detalles">Ver</button>
        </div>
      </div>
    `;
    card.querySelector(".rest-more").addEventListener("click", ()=> openOfferModal(o));
    card.addEventListener("click", e=>{
      if (!e.target.classList.contains("rest-more")) openOfferModal(o);
    });
    host.appendChild(card);
  });
}

// ===== Modal 9:16 con foto intera =====
function openOfferModal(o) {
  let modal = document.getElementById("rest-offer-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "rest-offer-modal";
    modal.className = "rest-modal";
    modal.innerHTML = `
      <div class="rest-modal-backdrop"></div>
      <div class="rest-modal-box">
        <button class="rest-modal-close" aria-label="Cerrar">✕</button>
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
  modal.querySelector(".m-title").textContent = o.title;
  modal.querySelector(".m-desc").textContent = o.desc || "";
  modal.querySelector(".m-price").textContent = o.price || "";
  modal.style.display = "flex";
}

function closeOfferModal(){ 
  const m = document.getElementById("rest-offer-modal"); 
  if (m) m.style.display = "none"; 
}

// ===== Boot =====
document.addEventListener("DOMContentLoaded", ()=> renderOffers("offers"));
