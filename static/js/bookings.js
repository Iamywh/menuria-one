// booking.js – versione SVG corretta

// ===== i18n helpers =====
function t(key){
  if (window.T) return window.T(key, key);
  const lang = (localStorage.getItem('menuria_lang') || document.documentElement.lang || 'it').toLowerCase();
  const I = (window.I18N && (window.I18N[lang] || window.I18N.it || window.I18N.es)) || {};
  return I[key] || key;
}

function applyI18N(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    if (!k) return;
    el.textContent = t(k);
  });
  renderHint();
}
window.addEventListener('menuria:languageChanged', applyI18N);

// ===== Stato & Orari (DOMENICA CHIUSA e limite 22:00) =====
const SLOT_MINUTES = 30;
const HOURS = {
  0: null, // DOMENICA CHIUSA
  1: {open:'10:00', close:'22:00'}, // Lunedì
  2: {open:'10:00', close:'22:00'}, // Martedì  
  3: {open:'10:00', close:'22:00'}, // Mercoledì
  4: {open:'10:00', close:'22:00'}, // Giovedì
  5: {open:'10:00', close:'22:00'}, // Venerdì
  6: {open:'10:00', close:'22:00'}  // Sabato
};

const state = {
  tab:'terrazzo',
  date: new Date().toISOString().slice(0,10),
  time: null,
  guests: 2,
  selectedTable: null,
  busyTables: new Set(),
  totalsToday: 0
};

function toHM(d){ return d.toTimeString().slice(0,5); }

function makeSlots(dateStr){
  const d = new Date(dateStr+'T12:00:00');
  const dayOfWeek = d.getDay();
  
  // Se è domenica (0), non ci sono slot
  if (dayOfWeek === 0) {
    console.log('Domenica: ristorante chiuso');
    return [];
  }
  
  const hours = HOURS[dayOfWeek];
  if (!hours) return [];
  
  const [oh,om] = hours.open.split(':').map(Number);
  const [ch,cm] = hours.close.split(':').map(Number);
  const start = new Date(d); start.setHours(oh,om,0,0);
  const end   = new Date(d); end.setHours(ch,cm,0,0);
  
  const slots=[];
  for(let t=+start; t<+end; t+=SLOT_MINUTES*60000){ 
    slots.push(toHM(new Date(t))); 
  }
  
  console.log('Slots disponibili:', slots);
  return slots;
}

// ===== API =====
async function fetchTotals(){
  try {
    const res = await fetch(`/api/reservations?date=${state.date}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.totalsToday = data.length;
    const el = document.querySelector('#totals'); 
    if (el) el.textContent = state.totalsToday;
    console.log('Totali caricati:', state.totalsToday);
  } catch (error) {
    console.error('Errore nel caricamento totali:', error);
    state.totalsToday = 0;
    const el = document.querySelector('#totals'); 
    if (el) el.textContent = '0';
  }
}

async function fetchBusyForSlot(){
  if(!state.time){
    state.busyTables = new Set();
    drawMap();
    return;
  }
  
  try {
    const res = await fetch(`/api/reservations?date=${state.date}&time=${encodeURIComponent(state.time)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.busyTables = new Set(data.map(r=>r.tableId).filter(Boolean));
    console.log('Tavoli occupati:', Array.from(state.busyTables));
    drawMap();
  } catch (error) {
    console.error('Errore nel caricamento tavoli occupati:', error);
    state.busyTables = new Set();
    drawMap();
  }
}

// ===== UI helpers =====
function setTab(tab){
  console.log('Cambio tab:', tab);
  state.tab = tab;
  state.selectedTable = null;
  document.querySelectorAll('.tab').forEach(b=> b.classList.toggle('active', b.dataset.tab===tab));
  drawMap();
  renderHint();
  syncTableField();
}

function renderSlots(){
  const sel = document.querySelector('#time');
  if(!sel) return;
  
  const slots = makeSlots(state.date);
  sel.innerHTML = '';
  
  if (slots.length === 0) {
    // Domenica o giorno chiuso
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Chiuso';
    option.disabled = true;
    sel.appendChild(option);
    state.time = null;
    console.log('Giorno chiuso, nessuno slot disponibile');
  } else {
    // Aggiungi opzione vuota
    const emptyOption = document.createElement('option');
    emptyOption.value = '';
    emptyOption.textContent = 'Seleziona orario...';
    sel.appendChild(emptyOption);
    
    slots.forEach(hm=>{
      const o = document.createElement('option');
      o.value = hm; 
      o.textContent = hm;
      sel.appendChild(o);
    });
    state.time = sel.value || null;
  }
  
  updateSubmitState();
}

function renderHint(){
  const hint = document.querySelector('#table-hint');
  if(!hint) return;
  
  if(state.guests<=6){
    hint.innerHTML = state.selectedTable
      ? `✅ Tavolo selezionato: <b>${state.selectedTable}</b>`
      : `• Seleziona un tavolo dalla mappa`;
  } else {
    hint.textContent = 'Gruppi oltre 6 persone: non serve selezionare tavolo';
  }
}

function updateSubmitState(){
  const hasDate = !!state.date;
  const hasTime = !!state.time;
  const hasTable = state.guests > 6 || !!state.selectedTable;
  const canSubmit = hasDate && hasTime && hasTable;
  
  console.log('Validazione submit:', { hasDate, hasTime, hasTable, canSubmit });
  
  const btn = document.getElementById('submitBtn');
  if (btn) {
    btn.disabled = !canSubmit;
    btn.style.cursor = canSubmit ? 'pointer' : 'not-allowed';
  }
}

function syncTableField(){
  const row = document.getElementById('tableRow');
  const field = document.getElementById('tableField');
  if(!row || !field) return;
  
  if(state.guests <= 6){
    row.style.display = 'grid';
    field.value = state.selectedTable || '';
    field.placeholder = state.selectedTable ? '' : '—';
  } else {
    row.style.display = 'none';
    field.value = '';
  }
}

function pickTable(id){
  console.log('Click tavolo:', id, 'Ospiti:', state.guests);
  if(state.guests > 6) return;
  if(state.busyTables.has(id)) {
    console.log('Tavolo occupato:', id);
    return;
  }
  
  state.selectedTable = (state.selectedTable === id) ? null : id;
  console.log('Tavolo selezionato:', state.selectedTable);
  drawMap(); 
  renderHint(); 
  updateSubmitState(); 
  syncTableField();
}

// ===== Disegno mappa (SVG) =====
function drawMap(){
  console.log('Disegno mappa, tab:', state.tab);
  const host = document.getElementById('mapHotspots');
  if(!host) {
    console.error('Elemento mapHotspots non trovato!');
    return;
  }
  
  if(!window.SVGMap) {
    console.error('SVGMap non caricato! Verifica che booking-map-svg.js sia incluso.');
    return;
  }
  
  console.log('Rendering SVG con parametri:', {
    tab: state.tab,
    selectedId: state.selectedTable,
    busySet: Array.from(state.busyTables),
    guests: state.guests
  });
  
  try {
    window.SVGMap.render(host, state.tab, {
      selectedId: state.selectedTable,
      busySet: state.busyTables,
      guests: state.guests,
      onPick: pickTable
    });
    console.log('Mappa SVG renderizzata con successo');
  } catch (error) {
    console.error('Errore nel rendering della mappa:', error);
  }
  
  updateSubmitState();
}

// ===== Form =====
async function onSubmit(e){
  e.preventDefault();
  console.log('Invio form...');
  
  const fd = new FormData(e.target);
  const payload = {
    date: state.date,
    time: state.time,
    firstName: fd.get('firstName'),
    lastName:  fd.get('lastName'),
    phone:     fd.get('phone'),
    guests:    +fd.get('guests'),
    tableId:   state.guests <= 6 ? state.selectedTable : null,
    allergies: fd.get('allergies') || '',
    highchair: fd.get('highchair') === 'on',
    roofExclusive: fd.get('roofExclusive') === 'on'
  };
  
  console.log('Payload:', payload);

  try {
    const res = await fetch('/api/reservations', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    });
    
    const out = await res.json().catch(()=>({}));
    console.log('Risposta server:', res.status, out);

    if(res.ok){
      // Reset form
      e.target.reset();
      state.selectedTable = null;
      document.getElementById('guests').value = 2;
      state.guests = 2;

      toast('Prenotazione salvata con successo!');
      renderHint();
      await fetchTotals();
      await fetchBusyForSlot();
      syncTableField();

      // Link WhatsApp
      const msg = encodeURIComponent(
        `Hola ${payload.firstName}! Soy La Casita de Nazareno. ` +
        `Hemos recibido tu solicitud: ${payload.date} ${payload.time}, ` +
        `${payload.guests} pax${payload.tableId ? `, mesa ${payload.tableId}` : ''}. ` +
        `Te confirmamos en breve aquí por WhatsApp. ¡Gracias!`
      );
      const wa = `https://wa.me/${payload.phone.replace(/\D/g,'')}?text=${msg}`;
      const hint = document.getElementById('whatsHint');
      if(hint) hint.innerHTML = `➡️ <a href="${wa}" target="_blank" rel="noopener">Apri WhatsApp con messaggio precompilato</a>`;
    } else {
      alert(out.error || 'Errore nel salvataggio della prenotazione');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Error de conexión. Inténtalo de nuevo.');
  }
}

function onDateChange(v){ 
  console.log('Cambio fecha:', v);
  state.date = v; 
  renderSlots(); 
  fetchTotals(); 
  fetchBusyForSlot(); 
}

function onTimeChange(v){ 
  console.log('Cambio horario:', v);
  state.time = v; 
  fetchBusyForSlot();
  updateSubmitState();
}

function onGuestsChange(v){
  console.log('Cambio huespedes:', v);
  state.guests = +v;
  if(state.guests > 6) state.selectedTable = null;
  renderHint(); 
  drawMap(); 
  syncTableField();
  updateSubmitState();
}

// ===== Toast =====
function toast(msg){
  const tEl = document.getElementById('toast');
  if(!tEl) return;
  tEl.textContent = msg;
  tEl.style.display = 'block';
  tEl.style.position = 'fixed';
  tEl.style.top = '20px';
  tEl.style.right = '20px';
  tEl.style.background = '#4caf50';
  tEl.style.color = 'white';
  tEl.style.padding = '12px 24px';
  tEl.style.borderRadius = '8px';
  tEl.style.zIndex = '9999';
  setTimeout(()=> tEl.style.display='none', 3000);
}

// ===== Boot =====
document.addEventListener('DOMContentLoaded', async ()=>{
  console.log('Inizializzazione pagina prenotazioni...');
  
  // Verifica che gli elementi esistano
  const requiredElements = ['date', 'time', 'guests', 'reserveForm', 'mapHotspots'];
  const missingElements = requiredElements.filter(id => !document.getElementById(id));
  
  if (missingElements.length > 0) {
    console.error('Elementi mancanti:', missingElements);
  }
  
  applyI18N();

  // Tabs
  document.querySelectorAll('.tab').forEach(b=>{
    b.addEventListener('click', ()=> {
      console.log('Click tab:', b.dataset.tab);
      setTab(b.dataset.tab);
    });
  });

  // Form eventi
  const dateEl = document.getElementById('date');
  if (dateEl) {
    dateEl.value = state.date;
    dateEl.addEventListener('change', e=> onDateChange(e.target.value));
  }
  
  const timeEl = document.getElementById('time');
  if (timeEl) {
    timeEl.addEventListener('change', e=> onTimeChange(e.target.value));
  }
  
  const guestsEl = document.getElementById('guests');
  if (guestsEl) {
    guestsEl.addEventListener('input', e=> onGuestsChange(e.target.value));
  }
  
  const formEl = document.getElementById('reserveForm');
  if (formEl) {
    formEl.addEventListener('submit', onSubmit);
  }

  // Prima renderizzazione
  console.log('Prima renderizzazione...');
  renderSlots();
  await fetchTotals();
  await fetchBusyForSlot();
  
  // Aspetta un momento per assicurarsi che SVGMap sia caricato
  setTimeout(() => {
    drawMap();
    renderHint();
    syncTableField();
    updateSubmitState();
  }, 100);

  // Poll per aggiornamenti in tempo reale
  setInterval(fetchBusyForSlot, 15000);
  
  console.log('Inizializzazione completata');
});

// Debug helper
window.debugBookings = function() {
  console.log('=== DEBUG BOOKINGS ===');
  console.log('State:', state);
  console.log('SVGMap loaded:', !!window.SVGMap);
  console.log('Elements:', {
    mapHotspots: !!document.getElementById('mapHotspots'),
    submitBtn: !!document.getElementById('submitBtn'),
    date: !!document.getElementById('date'),
    time: !!document.getElementById('time')
  });
};