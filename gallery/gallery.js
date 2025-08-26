document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const items = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      items.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  lightGallery(document.getElementById("lightgallery"), {
    plugins: [lgThumbnail, lgZoom],
    speed: 400,
  });
});

// Per tutti gli elementi con data-i18n in gallery:
// - se è un <a> con data-sub-html, usa data-i18n-attr="data-sub-html"
// - se è un <img>, usa data-i18n-attr="alt"
// - altrimenti non toccare (verrà tradotto in text)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#lightgallery [data-i18n]").forEach(el => {
    if (!el.hasAttribute("data-i18n-attr")) {
      if (el.tagName === "A" && el.hasAttribute("data-sub-html")) {
        el.setAttribute("data-i18n-attr", "data-sub-html");
      } else if (el.tagName === "IMG") {
        el.setAttribute("data-i18n-attr", "alt");
      }
    }
  });

  // se hai già un loader lingua che chiama applyTranslations, puoi anche non richiamarlo qui
  if (typeof applyTranslations === "function") {
    applyTranslations();
  }
});

