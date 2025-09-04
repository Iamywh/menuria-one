 // ===== CONFIG MAPPE: PNG di fondo + posizioni tavoli =====
    // Sostituisci i path con i tuoi PNG (1920x1440 consigliato; qualsiasi va bene)
    const MAP_SPEC = {
  // Terraza (T1–T6: rombi lungo la colonna destra)
  terrazzo: {
    bg: 'static/img/restaurantMapTerraza.png',
    tables: [
      { id:'T1', cap:3, x:86, y:82, w:6, h:6, r:45 },
      { id:'T2', cap:3, x:82, y:70, w:6, h:6, r:45 },
      { id:'T3', cap:3, x:78, y:58, w:6, h:6, r:45 },
      { id:'T4', cap:3, x:74, y:46, w:6, h:6, r:45 },
      { id:'T5', cap:3, x:90, y:20, w:6, h:6, r:45 },
      { id:'T6', cap:3, x:94, y:10, w:6, h:6, r:45 },
    ]
  },

  // Sala interna (S7–S13)
  interna: {
    bg: '/static/img/restaurantMapSala.png',
    tables: [
      { id:'S7',  cap:3, x:14, y:84, w:8,  h:8,  r:0  },
      { id:'S8',  cap:5, x:26, y:54, w:12, h:12, r:0  }, // rotondo -> usa un quadrato per ora
      { id:'S9',  cap:5, x:58, y:78, w:8,  h:12, r:0  },
      { id:'S10', cap:3, x:73, y:64, w:8,  h:8,  r:0  },
      { id:'S11', cap:3, x:46, y:56, w:8,  h:8,  r:0  },
      { id:'S12', cap:3, x:82, y:38, w:8,  h:8,  r:0  },
      { id:'S13', cap:5, x:60, y:10, w:8,  h:16, r:0  },
    ]
  },

  // Azotea (A15–A23)
  tetto: {
    bg: 'static/img/restaurantMapAzotea.png',
    tables: [
      { id:'A15', cap:6, x:26, y:88, w:28, h:10, r:0  },
      { id:'A16', cap:3, x:10, y:72, w:10, h:12, r:0  },
      { id:'A17', cap:5, x:30, y:68, w:28, h:12, r:0  }, // modulo doppio
      { id:'A18', cap:3, x:10, y:56, w:24, h:10, r:0  },
      { id:'A19', cap:3, x:40, y:48, w:12, h:12, r:45 },
      { id:'A20', cap:5, x:10, y:30, w:24, h:12, r:0  },
      { id:'A21', cap:5, x:40, y:30, w:24, h:12, r:0  },
      { id:'A22', cap:5, x:40, y:12, w:24, h:12, r:0  },
      { id:'A23', cap:3, x:10, y:12, w:24, h:12, r:0  },
    ]
  }
};



 

    function getLang(){ return localStorage.getItem('menuria_lang') || document.documentElement.lang || 'it'; }
    function t(k){ const L = I18N[getLang()] || I18N.it; return L[k] || k; }
    function applyI18N(){
      document.querySelectorAll('[data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); el.textContent = t(k); });
      // Aggiorna hint dinamico
      renderHint();
    }
    window.addEventListener('menuria:languageChanged', applyI18N);

    // ===== Stato =====
    const SLOT_MINUTES = 30; // come richiesto
    const HOURS = { 0:{open:'10:00',close:'17:00'}, 1:{open:'10:00',close:'23:00'}, 2:{open:'10:00',close:'23:00'}, 3:{open:'10:00',close:'23:00'}, 4:{open:'10:00',close:'23:00'}, 5:{open:'10:00',close:'24:00'}, 6:{open:'10:00',close:'24:00'} };
    const state = { tab:'terrazzo', date:new Date().toISOString().slice(0,10), time:null, guests:2, selectedTable:null, busyTables:new Set(), totalsToday:0 };

    function toHM(d){ return d.toTimeString().slice(0,5); }
    function makeSlots(dateStr){
      const d = new Date(dateStr+'T12:00:00');
      const dow = d.getDay(); const {open,close} = HOURS[dow];
      const [oh,om] = open.split(':').map(Number); const [ch,cm] = close.split(':').map(Number);
      const start = new Date(d); start.setHours(oh,om,0,0);
      const end   = new Date(d); end.setHours(ch,cm,0,0);
      const slots=[]; for(let t=+start; t<+end; t+=SLOT_MINUTES*60000){ slots.push( toHM(new Date(t)) ); } return slots.filter(s => s !== '22:30');
    }

    async function fetchTotals(){
      const res = await fetch(`/api/reservations?date=${state.date}`);
      const data = await res.json(); state.totalsToday = data.length; document.querySelector('#totals').textContent = state.totalsToday;
    }
    async function fetchBusyForSlot(){
      if(!state.time){ state.busyTables = new Set(); drawMap(); return; }
      const res = await fetch(`/api/reservations?date=${state.date}&time=${encodeURIComponent(state.time)}`);
      const data = await res.json(); state.busyTables = new Set( data.map(r=>r.tableId).filter(Boolean) ); drawMap();
    }

    function setTab(tab){ state.tab = tab; state.selectedTable = null; document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab)); drawMap(); renderHint(); }

    function renderSlots(){
      const sel = document.querySelector('#time'); sel.innerHTML=''; makeSlots(state.date).forEach(hm=>{ const o=document.createElement('option'); o.value=hm; o.textContent=hm; sel.appendChild(o); }); state.time = sel.value || null;
    }

    function renderHint(){
      const hint = document.querySelector('#table-hint');
      if(state.guests<=6){
        hint.innerHTML = state.selectedTable ? `✓ ${t('hint_selected')}<b>${state.selectedTable}</b>` : `• ${t('hint_select')}`;
      } else {
        hint.textContent = t('hint_group_big');
      }
    }

    // ===== MAPPA: disegna overlay da PNG + spec tavoli =====
    function pctToPx(xPct, yPct, wPct, hPct){
      const shell = document.querySelector('.map-shell'); const rect = shell.getBoundingClientRect();
      return { x: rect.width*(xPct/100), y: rect.height*(yPct/100), w: rect.width*(wPct/100), h: rect.height*(hPct/100) };
    }

function drawMap(){
  const spec = MAP_SPEC[state.tab];
  document.querySelector('mapBg').style.backgroundImage = `url('${spec.bg}')`; // 👈 al posto di #mapBg
  const host = document.getElementById('mapHotspots'); host.innerHTML='';
  // ...
  (spec.tables||[]).forEach(t=>{
    // filtro per capienza: se >6 non si seleziona nulla ma mostriamo tutti; se <=6, mostriamo solo tavoli cap>=guests
    if(state.guests<=6 && t.cap < state.guests) return;
    const el = document.createElement('div'); el.className='hotspot card glow';
    const {x,y,w,h} = pctToPx(t.x,t.y,t.w,t.h); el.style.left=`${x}px`; el.style.top=`${y}px`; el.style.width=`${w}px`; el.style.height=`${h}px`; el.style.transform=`rotate(${t.r||0}deg)`;
    if(state.busyTables.has(t.id)) el.classList.add('busy');
    if(state.selectedTable===t.id) el.classList.add('selected');
    el.dataset.id = t.id; el.dataset.cap = t.cap;
    el.innerHTML = `<div class="label">${t.id}</div><div class="cap">${t.cap} ${t('seats_label')}</div>`;
    el.onclick = ()=>{
      if(state.guests>6) return alert(t('hint_group_big'));
      if(state.busyTables.has(t.id)) return; // blocco
      state.selectedTable = (state.selectedTable===t.id) ? null : t.id; drawMap(); renderHint();
      updateSubmitState();
    };
    host.appendChild(el);
  });
  updateSubmitState();
}

    // Calibrazione: premi G per attivare, clicca per loggare coordinate percentuali
    let calib=false; document.addEventListener('keydown',e=>{ if(e.key.toLowerCase()==='g'){ calib=!calib; const h=document.getElementById('calibHelp'); h.textContent = calib ? '🧭 Calibrazione ON: clicca sulla mappa per leggere x/y/w/h in % (trascrivi nello spec). ESC per uscire.' : ''; }});
    //document.querySelector('.map-shell').addEventListener('click', e=>{
    //  if(!calib) return; const shell=e.currentTarget.getBoundingClientRect(); const xPct = ((e.clientX-shell.left)/shell.width*100).toFixed(2); const yPct = ((e.clientY-shell.top)/shell.height*100).toFixed(2); console.log('CLICK %',{x:+xPct,y:+yPct}); toast(`x:${xPct}% y:${yPct}%`);
    //});

    // Piccolo toast per feedback calibrazione
    function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.style.display='block'; setTimeout(()=>t.style.display='none', 1600); }

    // ===== Form handling =====
    function updateSubmitState(){ const canSubmit = !!state.date && !!state.time && (state.guests>6 || !!state.selectedTable); document.getElementById('submitBtn').disabled = !canSubmit; }

    async function onSubmit(e){
      e.preventDefault();
      const fd = new FormData(e.target);
      const payload = {
        date: state.date,
        time: state.time,
        firstName: fd.get('firstName'), lastName: fd.get('lastName'), phone: fd.get('phone'),
        guests: +fd.get('guests'), tableId: state.guests<=6 ? state.selectedTable : null,
        allergies: fd.get('allergies') || '', highchair: fd.get('highchair')==='on', roofExclusive: fd.get('roofExclusive')==='on'
      };
      const res = await fetch('/api/reservations', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const out = await res.json().catch(()=>({}));
      if(res.ok){
        toast(t('toast_saved'));
        e.target.reset(); state.selectedTable=null; document.getElementById('guests').value=2; state.guests=2; renderHint(); await fetchTotals(); await fetchBusyForSlot();
        // Mostra link WhatsApp staff → cliente (tap per aprire chat precompilata)
        const msg = encodeURIComponent(`Ciao ${payload.firstName}! Sono La Casita del Nazareno. Abbiamo ricevuto la tua richiesta: ${payload.date} ${payload.time}, ${payload.guests} pax${payload.tableId?`, tavolo ${payload.tableId}`:''}. Ti confermiamo a breve qui su WhatsApp. Grazie!`);
        const wa = `https://wa.me/${payload.phone.replace(/\D/g,'')}?text=${msg}`;
        document.getElementById('whatsHint').innerHTML = `➡️ <a href="${wa}" target="_blank" rel="noopener">Apri WhatsApp con messaggio precompilato</a>`;
      } else {
        alert(out.error || t('toast_err'));
      }
    }

    function onDateChange(v){ state.date=v; renderSlots(); fetchTotals(); fetchBusyForSlot(); }
    function onTimeChange(v){ state.time=v; fetchBusyForSlot(); }
    function onGuestsChange(v){ state.guests=+v; if(state.guests>6) state.selectedTable=null; renderHint(); drawMap(); }

    // ===== Boot =====
    // --- rimuovi QUESTO blocco in alto ---
// document.querySelector('.map-shell').addEventListener('click', ...

// --- aggiungi dentro DOMContentLoaded, prima di renderSlots() ---
document.addEventListener('DOMContentLoaded', async ()=>{
  // ...
  const mapShellEl = document.querySelector('.map-shell');
  mapShellEl.addEventListener('click', e=>{
    if(!calib) return;
    const rect = mapShellEl.getBoundingClientRect();
    const xPct = ((e.clientX-rect.left)/rect.width*100).toFixed(2);
    const yPct = ((e.clientY-rect.top)/rect.height*100).toFixed(2);
    console.log('CLICK %',{x:+xPct,y:+yPct}); toast(`x:${xPct}% y:${yPct}%`);
  });
  // ..


      document.querySelectorAll('.tab').forEach(b=> b.addEventListener('click', ()=> setTab(b.dataset.tab)) );

      document.getElementById('date').value = state.date;
      document.getElementById('date').addEventListener('change', e=>onDateChange(e.target.value));
      document.getElementById('time').addEventListener('change', e=>onTimeChange(e.target.value));
      document.getElementById('guests').addEventListener('input', e=>onGuestsChange(e.target.value));
      document.getElementById('reserveForm').addEventListener('submit', onSubmit);

      renderSlots(); await fetchTotals(); await fetchBusyForSlot(); drawMap(); renderHint();
      // Poll ogni 15s per blocchi in tempo reale
      setInterval(fetchBusyForSlot, 15000);
    });
