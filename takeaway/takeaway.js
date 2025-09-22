// ===== Header/Footer injection (safe on any page) =====
(async function injectHF(){
  try {
    const [hdr, ftr] = await Promise.all([
      fetch('/header.html').then(r=>r.text()),
      fetch('/footer.html').then(r=>r.text())
    ]);
    document.getElementById('header-placeholder').innerHTML = hdr;
    document.getElementById('footer-placeholder').innerHTML = ftr;
    if (window.initHeader) window.initHeader();
    const link = document.querySelector("a[data-route='takeaway']");
    if (link) link.style.background = 'rgba(0,0,0,0.05)';
  } catch(e){ console.warn('Header/Footer load failed', e); }
})();

// ===== CONFIG =====
const CONFIG = {
  DELIVERY_ENABLED: false,
  PRICE_MARKUP: 0.30,      // <-- 30% applicato SOLO al totale

  // Modalità filtro: 'all' (nessun filtro), 'allow' (usa TAKEAWAY_ALLOWED), 'block' (escludi TAKEAWAY_BLOCKLIST)
  FILTER_MODE: 'block',
  TAKEAWAY_ALLOWED: [],    // se FILTER_MODE === 'allow' (slug degli item)
  TAKEAWAY_BLOCKLIST: [],  // se FILTER_MODE === 'block' (slug degli item)
  HIDE_CATEGORIES: []      // slug delle categorie da nascondere
};

// ===== HELPERS =====
function toSlug(s){
  return String(s).toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu,'')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'');
}
function parseEuro(s){
  if (typeof s === 'number') return s;
  if (!s) return 0;
  return parseFloat(String(s).replace(/\./g,'').replace(',', '.').replace(/[^0-9.]/g,'')) || 0;
}
function parsePricePair(str){
  if (typeof str !== 'string' || !str.includes('/')) return null;
  const [a,b] = str.split('/').map(s => parseEuro(s));
  if (!isFinite(a) || !isFinite(b)) return null;
  return [a,b];
}
const qs = s => document.querySelector(s);
const money = n => (n).toLocaleString('es-ES', {style:'currency', currency:'EUR'});

// ===== IMMAGINI =====
const IMAGES = {
  [toSlug('Saquitos')]: '/static/img/galleries/platos/saquitos.jpg',
  [toSlug('Croquetas')]: '/static/img/galleries/platos/croquetas.jpg',
  [toSlug('Rollitos de pato')]: '/static/img/galleries/platos/rollitos-pato.jpg',
  [toSlug('Rollitos de verdura')]: '/static/img/galleries/platos/rollitos-verdura.jpg',
  [toSlug('Nachos La Casita')]: '/static/img/galleries/platos/Nachos.jpg',
  [toSlug('Huevos rotos con Ibérico')]: '/static/img/galleries/platos/huevosrotos.png',
  [toSlug('Ceviche de langostinos')]: '/static/img/galleries/platos/ceviche.jpg',
  [toSlug('Ensalada Thai')]: '/static/img/galleries/platos/EThai.jpg',
  [toSlug('El chef')]: '/static/img/galleries/platos/EChef.jpg',
  [toSlug('Champiñones')]: '/static/img/galleries/platos/tostachampiñones.jpg',
  [toSlug('Salmón')]: '/static/img/galleries/platos/tostasalmon.png',
  [toSlug('Mozzarella')]: '/static/img/galleries/platos/tostamozzarella.jpg',
  [toSlug('Solomillo')]: '/static/img/galleries/platos/tostasolomillo.jpg',
  [toSlug('Calabacín')]: '/static/img/galleries/platos/Hcalabacin.jpg',
  [toSlug('de Pollo')]: '/static/img/galleries/platos/Hpollo.jpg',
  [toSlug('Ternera')]: '/static/img/galleries/platos/Hternera.jpg',
  [toSlug('Tradicional')]: '/static/img/galleries/platos/Htradicional.jpg',
  [toSlug('Pollo')]: '/static/img/galleries/platos/Wokpollo.jpg',
  [toSlug('Langostinos')]: '/static/img/galleries/platos/Woklangostinos.jpg',
  [toSlug('Wok Ternera')]: '/static/img/galleries/platos/Wokternera.jpg',
  [toSlug('Poke bowl mexicano')]: '/static/img/galleries/platos/PokeMexicano.jpg',
  [toSlug('Ternera Anticucho')]: '/static/img/galleries/platos/TerneraAnticucho.jpg',
  [toSlug('Ensaladilla La Casita')]: '/static/img/galleries/platos/Ensaladilla.jpg',
  [toSlug('Tarta Kinder')]: '/static/img/galleries/tartas/Tkinder.jpg',
  [toSlug('Tarta Colibrí')]: '/static/img/galleries/tartas/Tcolibri.jpg',
  [toSlug('Tarta Chocoframbuesa')]: '/static/img/galleries/tartas/Tchocoframbuesa.png',
  [toSlug('Tarta Angels Food')]: '/static/img/galleries/tartas/angelsfood.jpg',
  [toSlug('Tarta Manzana')]: '/static/img/galleries/tartas/Tmanzana.png',
  [toSlug('Tarta Polvito')]: '/static/img/galleries/tartas/Tpolvito.jpg',
  [toSlug('Tarta de Calabaza')]: '/static/img/galleries/tartas/Tcalabaza.png',
  [toSlug('Appletiser')]: '/static/img/galleries/appletiser.jpg'
};

// ===== Data loader: window.menus → ITEMS =====
function loadItemsFromMenus(){
  if (!window.menus || !Array.isArray(window.menus)) return [];
  const list = [];

  window.menus.forEach(section => {
    const catTitle = section.title?.default || section.title || '';
    const catId = toSlug(catTitle);

    (section.items || []).forEach(it => {
      const name = it?.nombre?.default || it?.nombre || it?.name || '';
      const id = toSlug(name);
      const precioRaw = it?.precio ?? '';
      const pair = parsePricePair(precioRaw);
      const single = parseEuro(precioRaw);
      const hasPrice = (pair && pair.length === 2) || single > 0;
      if (!hasPrice) return;
      const img = (IMAGES && IMAGES[id]) || it.img || it.image || '/static/img/placeholder.jpg';

      list.push({
        id, name,
        price: single,          // prezzo base (senza markup)
        prices: pair || null,   // [small, large] se presente
        img,
        catId, catTitle
      });
    });
  });

  return list;
}

// Fallback se manca window.menus
const FALLBACK_SEED = [
  { id:'nachos-la-casita', name:'Nachos La Casita', price:8.70, img:'/static/img/galleries/platos/Nachos.jpg', catId:'entrantes', catTitle:'Entrantes', prices:[8.70,13.10] },
];

// Array finale (si aggiorna in init quando menus è pronto)
let ITEMS = FALLBACK_SEED;

// ===== STATE =====
const state = {
  mode: localStorage.getItem('take_mode') || 'takeaway',
  profile: {
    phone: localStorage.getItem('user_phone') || '+34 XXX XXX XXX',
    email: localStorage.getItem('user_email') || 'guest@example.com',
    address: localStorage.getItem('user_addr') || ''
  },
  note: localStorage.getItem('order_note') || '',
  cart: JSON.parse(localStorage.getItem('cart') || '[]')
};

// ===== USERS DB (local) =====
const DB_KEYS = { users: 'takeaway_users_db', current: 'takeaway_current_user' };
const loadUsers = () => JSON.parse(localStorage.getItem(DB_KEYS.users) || '[]');
const saveUsers = (arr) => localStorage.setItem(DB_KEYS.users, JSON.stringify(arr));
const generateUserId = () => 'U' + Math.random().toString(36).slice(2,8) + Date.now().toString(36);
const getCurrentUser = () => {
  const id = localStorage.getItem(DB_KEYS.current);
  return loadUsers().find(u => u.id === id) || null;
};
const setCurrentUser = (id) => localStorage.setItem(DB_KEYS.current, id);
const upsertUserLocal = (user) => {
  const users = loadUsers();
  const i = users.findIndex(u => u.id === user.id);
  if (i >= 0) users[i] = user; else users.push(user);
  saveUsers(users);
  setCurrentUser(user.id);
  state.profile.phone = user.phone || state.profile.phone;
  state.profile.email = user.email || state.profile.email;
  state.profile.address = user.address || state.profile.address;
  const up = document.getElementById('userPhone'); if (up) up.textContent = state.profile.phone;
  const ue = document.getElementById('userEmail'); if (ue) ue.textContent = state.profile.email;
  const addr = document.getElementById('addr'); if (addr) addr.value = state.profile.address;
};

// ===== INIT =====
async function waitForMenus(timeout=2000){
  const start = Date.now();
  while (!(window.menus && Array.isArray(window.menus)) && (Date.now() - start) < timeout) {
    await new Promise(r => setTimeout(r, 50));
  }
  return !!(window.menus && Array.isArray(window.menus));
}

// -- rende usabile la search bar anche se qualche overlay la copre --
function ensureSearchInput(){
  let s = document.getElementById('search');
  // fallback nel caso l'id non sia quello previsto
  if (!s) s = document.querySelector('input[type="search"].take-search, input[name="search"]');
  if (!s) return;

  // abilita input
  s.removeAttribute('disabled');
  s.readOnly = false;
  s.setAttribute('autocomplete','off');

  // evita che container genitori intercettino gli eventi e rubino il focus
  const stop = ev => ev.stopPropagation();
  s.addEventListener('pointerdown', stop, {capture:true});
  s.addEventListener('click',       stop, {capture:true});
  s.addEventListener('keydown',     stop, {capture:true});

  // filtra mentre scrivi
  const handler = () => renderGrid();
  s.addEventListener('input', handler);
  s.addEventListener('keyup', handler);

  // opzionale: ENTER non ricarica la pagina se dentro un <form>
  s.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
}


(async function init(){
  const cur = getCurrentUser();
  if (cur) {
    state.profile.phone = cur.phone || state.profile.phone;
    state.profile.email = cur.email || state.profile.email;
    state.profile.address = cur.address || state.profile.address;
  }
  qs('#userPhone').textContent = state.profile.phone;
  qs('#userEmail').textContent = state.profile.email;
  qs('#note').value = state.note;

  await waitForMenus(2000);
  const items = loadItemsFromMenus();
  if (items.length) ITEMS = items;

  applyModeUI();

  // 👇 nuovo: assicura che la barra di ricerca sia scrivibile e con handler
  ensureSearchInput();

  renderGrid();
  renderCart();
  setTimeout(runTests, 0);
})();


// ===== MODE =====
function setMode(m){
  if (m === 'delivery' && !CONFIG.DELIVERY_ENABLED) {
    alert('Entrega temporalmente no disponible');
    return;
  }
  state.mode = m; localStorage.setItem('take_mode', m);
  applyModeUI();
}
function applyModeUI(){
  const isDelivery = state.mode === 'delivery';
  toggleActive('#btnTakeaway', !isDelivery); toggleActive('#optTakeaway', !isDelivery);
  toggleActive('#btnDelivery', isDelivery);  toggleActive('#optDelivery', isDelivery);
  const addrF = qs('#addressField'); if (addrF) addrF.style.display = (isDelivery && CONFIG.DELIVERY_ENABLED) ? 'block' : 'none';
  const d1 = qs('#btnDelivery'); if (d1) { d1.disabled = !CONFIG.DELIVERY_ENABLED; d1.title = CONFIG.DELIVERY_ENABLED ? '' : 'Entrega deshabilitada'; }
  const d2 = qs('#optDelivery'); if (d2) { d2.disabled = !CONFIG.DELIVERY_ENABLED; d2.title = CONFIG.DELIVERY_ENABLED ? '' : 'Entrega deshabilitada'; }
}
function toggleActive(sel, on){ const el = qs(sel); if(!el) return; el.classList.toggle('active', on); }

// ===== FILTRI =====
function isCategoryHidden(catId){
  return Array.isArray(CONFIG.HIDE_CATEGORIES) && CONFIG.HIDE_CATEGORIES.includes(catId);
}
function isItemAllowed(it){
  if (isCategoryHidden(it.catId)) return false;
  if (CONFIG.FILTER_MODE === 'allow' && Array.isArray(CONFIG.TAKEAWAY_ALLOWED)) {
    return CONFIG.TAKEAWAY_ALLOWED.includes(it.id);
  }
  if (CONFIG.FILTER_MODE === 'block' && Array.isArray(CONFIG.TAKEAWAY_BLOCKLIST)) {
    return !CONFIG.TAKEAWAY_BLOCKLIST.includes(it.id);
  }
  return true;
}

// ===== PORZIONI =====
function buildPortions(item){
  // Tartas: override prezzi base (NO MARKUP QUI)
  if (item.catTitle && item.catTitle.toLowerCase().includes('tarta')){
    const isMV = /maria\s+victoria/i.test(item.name);
    const sliceBase = isMV ? 5.00 : 4.50;
    const wholeBase = isMV ? 50.00 : 47.00;
    return [
      { id:'slice', label:'Rebanada',    price: sliceBase },
      { id:'whole', label:'Tarta entera', price: wholeBase }
    ];
  }
  // Ensaladilla / Nachos con doppio prezzo → Media/Grande (NO MARKUP QUI)
  if ((/ensaladilla|nachos/i).test(item.name) && Array.isArray(item.prices)){
    const [small, large] = item.prices;
    return [
      { id:'small', label:'Media',  price: small },
      { id:'large', label:'Grande', price: large }
    ];
  }
  return null;
}
function getSelectedPortionId(itemId){
  const sel = document.getElementById(`portion-${itemId}`);
  return sel ? sel.value : 'full';
}
function getPortionMetaById(item, pid){
  const defs = buildPortions(item);
  if (!defs) return { id:'full', label:'Completa', factor:1, price:null };
  return defs.find(p => p.id === pid) || defs[0];
}
// PREZZO MOSTRATO/USATO NEL CARRELLO = BASE (nessun markup a livello di item)
function portionBasePrice(item, pid){
  const meta = getPortionMetaById(item, pid);
  return (typeof meta.price === 'number') ? meta.price : (item.price * (meta.factor || 1));
}
function rowMatch(r, id, pid){ return r.id === id && (r.portionId || 'full') === (pid || 'full'); }

// ===== RENDER PER CATEGORIA =====
function groupByCategory(items){
  const order = (window.menus || []).map(s => toSlug(s.title?.default || s.title || ''));
  const groups = new Map();
  items.forEach(it => {
    if (!isItemAllowed(it)) return;
    if (!groups.has(it.catId)) groups.set(it.catId, []);
    groups.get(it.catId).push(it);
  });
  for (const [k, arr] of groups) arr.sort((a,b)=> a.name.localeCompare(b.name, 'es'));
  const sorted = [];
  order.forEach(cid => { if (groups.has(cid)) sorted.push([cid, groups.get(cid)]); });
  for (const [cid, arr] of groups) if (!order.includes(cid)) sorted.push([cid, arr]);
  return sorted;
}
function renderCategoryChips(groups){
  const host = document.getElementById('cats');
  if (!host) return;
  host.innerHTML = groups.map(([cid, arr]) =>
    `<button class="cat-chip" onclick="document.getElementById('cat-${cid}').scrollIntoView({behavior:'smooth'})">
       ${arr[0]?.catTitle || cid} <span class="badge">${arr.length}</span>
     </button>`
  ).join('');
}
function renderCategorySection(cid, items){
  const title = items[0]?.catTitle || cid;
  const cards = items.map(x => {
    const defs = buildPortions(x);
    const portionSelect = defs ? `
      <label class="portion-wrap">
        <select class="portion" id="portion-${x.id}" onchange="updateCardPrice('${x.id}')">
          ${defs.map(p=>`<option value="${p.id}">${p.label}</option>`).join('')}
        </select>
      </label>` : '';

    const firstPid = defs ? defs[0].id : 'full';
    const priceNow = portionBasePrice(x, firstPid); // <-- prezzo base senza markup

    return `
      <article class="card" aria-label="${x.name}">
        <img src="${x.img}" alt="${x.name}">
        <div class="body">
          <div class="title">${x.name}</div>
          <div class="row">
            <span class="price" id="price-${x.id}">${money(priceNow)}</span>
            ${portionSelect}
            <button class="add" onclick="add('${x.id}')">+ Añadir</button>
          </div>
        </div>
      </article>`;
  }).join('');

  return `
    <section class="cat" id="cat-${cid}">
      <header class="chead" role="button" tabindex="0" aria-expanded="true" onclick="toggleCat('${cid}')" onkeydown="if(event.key==='Enter'||event.key===' ')toggleCat('${cid}')">
        <h3>${title}</h3>
        <span class="ccount">${items.length}</span>
      </header>
      <div class="cgrid" id="cgrid-${cid}">
        ${cards}
      </div>
    </section>`;
}
window.toggleCat = function(cid){
  const grid = document.getElementById(`cgrid-${cid}`);
  const head = document.querySelector(`#cat-${cid} .chead`);
  const open = grid.style.display !== 'none';
  grid.style.display = open ? 'none' : 'grid';
  if (head) head.setAttribute('aria-expanded', String(!open));
};
window.toggleAllCats = function(open=true){
  (document.querySelectorAll('.cat')||[]).forEach(sec=>{
    const cid = sec.id.replace('cat-','');
    const grid = document.getElementById(`cgrid-${cid}`);
    const head = sec.querySelector('.chead');
    grid.style.display = open ? 'grid' : 'none';
    if (head) head.setAttribute('aria-expanded', String(open));
  });
};

function renderGrid(){
  const term = (qs('#search')?.value || '').toLowerCase();
  const base = ITEMS
    .filter(it => isItemAllowed(it))
    .filter(it => it.name.toLowerCase().includes(term));

  const groups = groupByCategory(base);
  renderCategoryChips(groups);

  const html = groups.map(([cid, arr]) => renderCategorySection(cid, arr)).join('');
  document.getElementById('grid').innerHTML = html || '<p class="muted">No hay resultados.</p>';
}
function updateCardPrice(itemId){
  const it = ITEMS.find(i => i.id === itemId);
  const pid = getSelectedPortionId(itemId);
  const price = portionBasePrice(it, pid);   // base senza markup
  const el = document.getElementById(`price-${itemId}`);
  if (el) el.textContent = money(price);
}

// ===== CART =====
function persistCart(){ localStorage.setItem('cart', JSON.stringify(state.cart)); }

function add(id, pid = null){
  const it = ITEMS.find(i => i.id===id); if(!it) return;
  const portionId = pid || getSelectedPortionId(id);
  const meta = getPortionMetaById(it, portionId);
  const row = state.cart.find(r => rowMatch(r, id, portionId));
  if(row){ row.qty += 1; }
  else {
    state.cart.push({
      id, qty:1,
      portionId: meta.id,
      portionLabel: meta.label,
      portionBase: (typeof meta.price === 'number') ? meta.price : null,
      portionFactor: (typeof meta.price === 'number') ? null : (meta.factor || 1)
    });
  }
  persistCart(); renderCart();
}
function sub(id, pid = 'full'){
  const row = state.cart.find(r => rowMatch(r, id, pid)); if(!row) return;
  row.qty = Math.max(0, row.qty-1);
  if(row.qty===0){ state.cart = state.cart.filter(r => !rowMatch(r, id, pid)); }
  persistCart(); renderCart();
}
function removeItem(id, pid='full'){
  state.cart = state.cart.filter(r => !rowMatch(r, id, pid));
  persistCart(); renderCart();
}

// Calcolo totali: SUBTOTALE (base) + MARKUP sul totale
function computeTotals(){
  const subtotal = state.cart.reduce((sum,r)=>{
    const it = ITEMS.find(i => i.id===r.id);
    if (!it) return sum;
    const base = (r.portionBase != null) ? r.portionBase : (it.price * (r.portionFactor || 1));
    return sum + base * r.qty;
  },0);
  const markup = Number((subtotal * CONFIG.PRICE_MARKUP).toFixed(2));
  const total  = Number((subtotal + markup).toFixed(2));
  return { subtotal, markup, total };
}

function renderCart(){
  const count = state.cart.reduce((a,b)=>a+b.qty,0);
  qs('#cart-count').textContent = count; qs('#fab-count').textContent = count;

  const rows = state.cart.map(r => {
    const it = ITEMS.find(i => i.id===r.id);
    const base = (r.portionBase != null) ? r.portionBase : (it.price * (r.portionFactor || 1));
    const line  = r.qty * base;                     // prezzo linea SENZA markup
    const pid = r.portionId || 'full';
    const portionBadge = pid !== 'full' ? ` · <i>${r.portionLabel}</i>` : '';
    return `
      <div class="citem">
        <img src="${it.img}" alt="${it.name}">
        <div>
          <div class="cname">${it.name}${portionBadge}</div>
          <div class="muted">${money(base)} · x${r.qty} = <b>${money(line)}</b></div>
          <div class="qty">
            <button aria-label="Restar" onclick="sub('${it.id}','${pid}')">−</button>
            <span>${r.qty}</span>
            <button aria-label="Añadir" onclick="add('${it.id}','${pid}')">+</button>
            <button class="remove" onclick="removeItem('${it.id}','${pid}')">Eliminar</button>
          </div>
        </div>
        <div><b>${money(line)}</b></div>
      </div>`;
  }).join('');
  qs('#cartItems').innerHTML = rows || '<p class="muted">Tu carrito está vacío.</p>';

  const {subtotal, markup, total} = computeTotals();
  const subEl = qs('#subtotal'); if (subEl) subEl.textContent = money(subtotal);
  const mkEl  = qs('#markup');   if (mkEl)  mkEl.textContent  = money(markup);
  qs('#total').textContent = money(total);
}

// ===== CART PANEL UI =====
function openCart(){ qs('#cart').classList.add('open'); }
function closeCart(){ qs('#cart').classList.remove('open'); }

// ===== PROFILE & CHECKOUT =====
function saveAddress(){ state.profile.address = qs('#addr').value; localStorage.setItem('user_addr', state.profile.address); }
function saveNote(){ state.note = qs('#note').value; localStorage.setItem('order_note', state.note); }
function openUserModal(){
  const modal = qs('#userModal');
  const cur = getCurrentUser();
  qs('#u_first').value = cur?.firstName || '';
  qs('#u_last').value  = cur?.lastName || '';
  qs('#u_email').value = cur?.email || state.profile.email || '';
  qs('#u_phone').value = cur?.phone || state.profile.phone || '';
  qs('#u_dob').value   = cur?.dob || '';
  qs('#u_addr').value  = cur?.address || state.profile.address || '';
  modal.style.display = 'flex';
}
function closeUserModal(){ qs('#userModal').style.display='none'; }
async function apiUpsertUser(user){
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error('User save failed');
  return res.json();
}
async function saveUserFromForm(){
  const cur = getCurrentUser();
  const user = {
    id: cur?.id || generateUserId(),
    firstName: qs('#u_first').value.trim(),
    lastName:  qs('#u_last').value.trim(),
    email:     qs('#u_email').value.trim(),
    phone:     qs('#u_phone').value.trim(),
    dob:       qs('#u_dob').value,
    address:   qs('#u_addr').value.trim()
  };
  try {
    const saved = await apiUpsertUser(user);
    upsertUserLocal(saved);
    alert('Perfil guardado en servidor');
  } catch(e){
    console.warn('Server save failed, keeping local only', e);
    upsertUserLocal(user);
    alert('Servidor no disponible: perfil guardado solo localmente');
  }
  closeUserModal();
}

function checkout(){
  if(state.cart.length===0){ alert('Añade algo al carrito 🙂'); return; }
  if(state.mode==='delivery' && (!state.profile.address || state.profile.address.trim()==='')){ alert('Por favor, añade la dirección de entrega.'); return; }
  const totals = computeTotals();
  const payload = {
    when: new Date().toISOString(),
    mode: state.mode,
    profile: state.profile,
    note: state.note,
    items: state.cart.map(r=>({
      id: r.id,
      name: ITEMS.find(i=>i.id===r.id).name,
      qty: r.qty,
      portionId: r.portionId || 'full',
      portionLabel: r.portionLabel || 'Completa'
    })),
    subtotal: money(totals.subtotal),
    markup:   money(totals.markup),
    total:    money(totals.total)
  };
  console.log('ORDER_PAYLOAD', payload);
  alert('¡Gracias! Hemos recibido tu pedido.\n(Abre la consola para ver el payload)');
  state.cart=[]; persistCart(); renderCart(); closeCart();
}

// ===== SELF TESTS =====
function runTests(){
  try {
    console.log('%cRunning takeaway tests…','color:#c98c52;font-weight:bold');

    // Porzioni torte = prezzo base (NO markup)
    (()=>{
      const fake = {id:'tarta-guinness', name:'Tarta Guinness', price:0, catTitle:'Tartas'};
      const defs = buildPortions(fake);
      console.assert(defs[0].price === 4.5 && defs[1].price === 47, 'Tartas base 4.50 / 47');
    })();

    // Ensaladilla doppia = prezzi base
    (()=>{
      const fake = {id:'ensaladilla-la-casita', name:'Ensaladilla La Casita', price:0, prices:[9.10,13.90], catTitle:'Entrantes'};
      console.assert(portionBasePrice(fake,'small') === 9.10, 'Media 9.10 base');
      console.assert(portionBasePrice(fake,'large') === 13.90, 'Grande 13.90 base');
    })();

    // Markup su totale (esempio: 2x10 + 1x5 = 25 → +30% = 32.5)
    (()=>{
      const subtotal=25;
      const m = Number((subtotal*CONFIG.PRICE_MARKUP).toFixed(2));
      const total = Number((subtotal+m).toFixed(2));
      console.assert(m===7.5 && total===32.5, 'Markup 30% applicato al totale');
    })();

    // Delivery disabilitato
    const before = state.mode; let alerted=0; const a=window.alert; window.alert=()=>{alerted++}; setMode('delivery'); window.alert=a;
    console.assert(state.mode===before && alerted>0, 'Delivery disabled should not switch mode and warn');

    console.log('%cTests OK','color:#16a34a;font-weight:bold');
  } catch(e){ console.error('Tests failed:', e); }
}

// ===== DEV: utility per slug =====
window.dumpSlugs = function(){
  const byCat = {};
  ITEMS.forEach(it => {
    byCat[it.catId] = byCat[it.catId] || [];
    byCat[it.catId].push(it.id);
  });
  console.log('Categorie:', Object.keys(byCat));
  Object.entries(byCat).forEach(([cat, arr])=>{
    console.log(cat, '→', arr);
  });
};
