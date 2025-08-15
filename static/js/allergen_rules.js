// ===================== allergen_rules.js (FULL) =====================
// Production-ready transformer for 5 filters:
// - celiac (senza glutine)
// - lactose_free (senza lattosio)
// - vegan
// - nuts (frutta secca)
// - crustaceans (crostacei)
// Requires: window.menus (from menus.enhanced.js).
// ====================================================================

// ===== allergen_rules.js (UMD) =====
(function(w){
  var POLICY = { strict: true };

  // tag per fritti (usiamo le chiavi che avevamo già elencato)
  var TAGS_BY_KEY = {
    "menu_entrantes_saquitos":["fried"],
    "menu_entrantes_croqueta_de_pollo":["fried"],
    "menu_entrantes_croqueta_de_espinaca":["fried"],
    "menu_entrantes_rollitos_de_pato":["fried"],
    "menu_entrantes_rollitos_de_verdura":["fried"],
    "menu_wok_pollo":["fried"],
    "menu_platos_carne_opcion_infantil":["fried"],
    "menu_burgers_de_pollo":["fried"],
    "menu_burgers_calabacin":["fried"],
    "menu_entrantes_huevos_rotos_con_iberico":["fried"],
    "menu_platos_carne_huevos_rotos":["fried"]
  };

  var SOY_GF_ALLOWED = new Set([
    "menu_wok_verduras","menu_wok_pollo","menu_wok_langostinos","menu_wok_ternera","menu_platos_carne_arroz_frito"
  ]);

  var SETS = {
    crustaceans_core: new Set(["menu_entrantes_saquitos","menu_entrantes_ceviche_de_langostinos"]),
    crustaceans_removable: new Set(["menu_ensaladas_thai","menu_wok_langostinos"]),
    bread_items: new Set(["menu_sand_clasico","menu_sand_casita","menu_tosta_campestre","menu_burgers_de_pollo","menu_burgers_calabacin"]),
    nachos_items: new Set(["menu_entrantes_nachos_la_casita","menu_platos_carne_poke_bowl"])
  };

  var RULES = {
    celiac:{notes:["Usiamo salsa di soia senza glutine solo per Wok e Arroz frito con ternera.","La teriyaki non è senza glutine.","Fritti: olio condiviso ⇒ rischio contaminazione (glutine/crostacei)."]},
    lactose_free:{notes:["Auto-switch: latte/panna senza lattosio; formaggi rimossi se garnish."]},
    vegan:{notes:["Rimozione ingredienti animali (uovo, miele, salse di pesce/ostriche, formaggi, burro).","Fritti: olio condiviso (nota informativa)."]},
    nuts:{notes:["Dolci off-limits (tracce).","Frutta secca rimossa se solo topping."]},
    crustaceans:{notes:["Friggitrice condivisa con saquitos (crostacei)."]}
  };

  function deepClone(x){ return JSON.parse(JSON.stringify(x)); }
  function applyNote(item,msg){ item._notes=(item._notes||[]).concat(msg); }
  function addWarn(item,msg){ item._warnings=(item._warnings||[]).concat(msg); return item; }
  function hideOrWarn(item,msg){ return POLICY.strict ? null : addWarn(item,msg); }
  function containsAny(arr,list){ return Array.isArray(arr) && list.some(function(x){return arr.includes(x);}); }
  function includesAny(text,list){ var t=(text||"").toLowerCase(); return list.some(function(s){return t.includes(s);}); }

  function normalizeFlags(opts){
    var f = Object.assign({celiac:false,lactose_free:false,vegan:false,nuts:false,crustaceans:false}, opts||{});
    return f;
  }

  function enhanceItem(item, flags){
    var key = (item && item.nombre && item.nombre.i18nKey) || "";
    var ids = Array.isArray(item.ingredients) ? item.ingredients.map(String) : [];
    var lowIng = (item && item.ingredientes ? (typeof item.ingredientes === "string" ? item.ingredientes : item.ingredientes.default || "") : "").toLowerCase();
    var tags = new Set([].concat(TAGS_BY_KEY[key] || []));
    if (tags.size) item._tags = Array.from(tags);

    // CELIAC
    if (flags.celiac){
      if (ids.includes('teriyaki') || includesAny(lowIng,['teriyaki'])) return hideOrWarn(item, "Contiene teriyaki (non SG).");
      if (SOY_GF_ALLOWED.has(key) && (ids.includes('soy_regular') || includesAny(lowIng,['soja','soya','soia']))){
        applyNote(item,"Soia SG usata (piatto consentito).");
        if (ids.length) item.ingredients = ids.map(function(x){ return x==='soy_regular'?'soy_gf':x; });
        item._modified = true;
      }
      if (SETS.bread_items.has(key)){ applyNote(item,"Pane senza glutine."); item._modified = true; }
      if (SETS.nachos_items.has(key)){ applyNote(item,"Nachos senza glutine."); item._modified = true; }
      if (tags.has('fried')) return hideOrWarn(item,"Fritti: possibile contaminazione da glutine/crostacei.");
    }

    // LACTOSE
    if (flags.lactose_free){
      if (containsAny(ids,['cheese','cheddar_sauce']) || includesAny(lowIng,['queso','mozzarella','cheddar'])) { applyNote(item,"Senza lattosio: rimosso formaggio/garnish."); item._modified = true; }
      if (containsAny(ids,['cream']) || includesAny(lowIng,['nata','panna','cream'])) { applyNote(item,"Panna SL usata."); item._modified = true; }
      if (containsAny(ids,['butter','bechamel']) || includesAny(lowIng,['mantequilla','burro','bechamel','besciamella'])) return hideOrWarn(item,"Contiene burro/besciamella (latticini).");
    }

    // VEGAN
    if (flags.vegan){
      if (containsAny(ids,['egg']) || includesAny(lowIng,['huevo','uovo','uova','maion','mayonesa','mayo'])) { applyNote(item,"Maionese veg / senza uova."); item._modified = true; }
      if (containsAny(ids,['honey']) || includesAny(lowIng,['miel','miele'])) { applyNote(item,"Sostituzione miele → agave."); item._modified = true; }
      if (containsAny(ids,['oyster_sauce','fish_sauce']) || includesAny(lowIng,['ostra','oyster','fish sauce','anchov'])) return hideOrWarn(item,"Salsa di pesce/ostriche non veg.");
      if (containsAny(ids,['cheese','cheddar_sauce','milk','cream','butter']) || includesAny(lowIng,['queso','mozzarella','cheddar','leche','latte','panna','nata','mantequilla','burro'])) return hideOrWarn(item,"Contiene latticini.");
      if (key==="menu_ensaladas_thai" || key==="menu_wok_langostinos"){
        applyNote(item,"Versione veg: senza langostinos, aggiunta tofu/verdure."); item._modified = true;
        if (ids.length) item.ingredients = ids.filter(function(x){return x!=='langostinos';}).concat(['tofu','vegetables_mix']);
      } else if (ids.includes('langostinos') || includesAny(lowIng,['langostin'])) {
        return hideOrWarn(item,"Contiene crostacei.");
      }
    }

    // NUTS
    if (flags.nuts){
      if (containsAny(ids,['nuts','peanut']) || includesAny(lowIng,['nuez','noci','cacahuet','peanut','almendra','mandorla','pistacho','anacardo'])){
        if (key==="menu_entrantes_ceviche_de_langostinos") return hideOrWarn(item,"Frutta secca core nel ceviche.");
        applyNote(item,"Senza frutta secca (topping rimosso)."); item._modified = true;
        if (ids.length) item.ingredients = ids.filter(function(x){return x!=='nuts' && x!=='peanut';});
      }
      var k = String(key);
      if (k.startsWith("menu_tartas") || k.includes("tarta") || k.includes("brownie")) return hideOrWarn(item,"Dolci off limits: possibili tracce di frutta secca.");
    }

    // CRUSTACEANS
    if (flags.crustaceans){
      if (SETS.crustaceans_core.has(key)) return null;
      if (SETS.crustaceans_removable.has(key)){
        applyNote(item,"Senza langostinos (sostituzione tofu/verdure)."); item._modified = true;
        if (ids.length) item.ingredients = ids.filter(function(x){return x!=='langostinos';}).concat(['tofu','vegetables_mix']);
      }
      if (tags.has('fried')) return hideOrWarn(item,"Fritti: possibile contaminazione da crostacei.");
    }

    return item;
  }

  function transformMenuForRestrictions(menus, opts){
    var flags = normalizeFlags(opts);
    var clone = deepClone(menus);
    clone.forEach(function(section){
      if (!section.items) return;
      section.items = section.items.map(function(item){ return enhanceItem(item, flags); }).filter(Boolean);
    });
    return clone;
  }

  function applyFiltersAndRender(containerId, flags){
    var data = w.menus || [];
    var filtered = transformMenuForRestrictions(data, flags||{});
    if (w.MenuUI && w.MenuUI.renderMenus) w.MenuUI.renderMenus(filtered, containerId || 'menu-content');
    return filtered;
  }

  w.AllergenRules = {
    POLICY: POLICY,
    TAGS_BY_KEY: TAGS_BY_KEY,
    SOY_GF_ALLOWED: SOY_GF_ALLOWED,
    SETS: SETS,
    RULES: RULES,
    normalizeFlags: normalizeFlags,
    transformMenuForRestrictions: transformMenuForRestrictions,
    applyFiltersAndRender: applyFiltersAndRender
  };
})(window);
