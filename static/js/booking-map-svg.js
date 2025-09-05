// booking-map-svg.js — SVG procedural map (no PNG)
(function(){
  const PX = (v) => `${v}`;
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  // ===== Generatori di pattern
  function genDiamondsVertical({x, y1, y2, count, size=6, rot=45, cap=3, idPrefix='T'}){
    const out=[]; const step=(y2-y1)/(count-1);
    for(let i=0;i<count;i++){
      out.push({ id:`${idPrefix}${i+1}`, cap, x, y: y1 + step*i, w:size, h:size, r:rot, shape:'rect' });
    }
    return out;
  }
  function genRow({x1, x2, y, count, w=8, h=8, r=0, cap=3, idPrefix='S'}){
    const out=[]; const step=(x2-x1)/(count-1);
    for(let i=0;i<count;i++){
      out.push({ id:`${idPrefix}${i+1}`, cap, x: x1 + step*i, y, w, h, r, shape:'rect' });
    }
    return out;
  }

  // ===== Layout per sala (100x100 viewport in percent)
  // NB: i numeri sono *ragionevoli* per partire; si possono rifinire in 2’ se necessario
  const LAYOUT = {
  // ====== TERRAZA (T1–T6 rombi sul lato destro) ======
  terrazzo(){
    return [
      { id:'T1', cap:3, x:10, y:70, w:7, h:7, r:45, shape:'rect' },
      { id:'T2', cap:3, x:10, y:55, w:7, h:7, r:45, shape:'rect' },
      { id:'T3', cap:3, x:10, y:45, w:7, h:7, r:45, shape:'rect' },
      { id:'T4', cap:3, x:10, y:35, w:7, h:7, r:45, shape:'rect' },
      { id:'T5', cap:3, x:10, y:15, w:7, h:7, r:45, shape:'rect' },
      { id:'T6', cap:3, x:10, y:5, w:7, h:7, r:45, shape:'rect' },
    ];
  },

  // ====== SALA INTERNA ======
  // S8 è tondo, S9/S13 verticali, gli altri quadrati
  interna(){
    return [
      { id:'S7',  cap:3, x:12, y:64, w:10, h:10, r:0,  shape:'rect' },
      { id:'S8',  cap:5, x:12, y:38, w:14, h:14, r:0,  shape:'round' }, // tavolo rotondo
      { id:'S9',  cap:5, x:75, y:65, w:10, h:16, r:0,  shape:'rect' },  // verticale
      { id:'S10', cap:3, x:94, y:55, w:10, h:10, r:0,  shape:'rect' },
      { id:'S11', cap:3, x:50, y:35, w:10, h:10, r:0,  shape:'rect' },
      { id:'S12', cap:3, x:94, y:30, w:10, h:10, r:0,  shape:'rect' },
      { id:'S13', cap:5, x:75, y:10, w:10, h:18, r:0,  shape:'rect' },  // verticale
    ];
  },

  // ====== AZOTEA ======
  tetto(){
    return [
      { id:'A23', cap:3, x:15, y:5, w:24, h:12, r:0,  shape:'rect' },
      { id:'A22', cap:5, x:80, y:5, w:24, h:12, r:0,  shape:'rect' },
      { id:'A20', cap:5, x:15, y:20, w:24, h:12, r:0,  shape:'rect' },
      { id:'A21', cap:5, x:80, y:20, w:24, h:12, r:0,  shape:'rect' },
      { id:'A19', cap:3, x:80, y:35, w:12, h:12, r:45, shape:'rect' },  // rombo
      { id:'A18', cap:3, x:15, y:50, w:24, h:10, r:0,  shape:'rect' },
      { id:'A16', cap:3, x:15, y:65, w:10, h:12, r:0,  shape:'rect' },
      { id:'A17', cap:5, x:80, y:50, w:28, h:12, r:0,  shape:'rect' },   // “doppio” reso largo
      { id:'A15', cap:6, x:75, y:65, w:36, h:12, r:0,  shape:'rect' },
    ];
  }
};


function drawTable(g, t, opts){
  const { busySet, selectedId, onPick, guests, colors } = opts;
  const isBusy = busySet && busySet.has(t.id);
  const isSel  = selectedId === t.id;

  const group = document.createElementNS('http://www.w3.org/2000/svg','g');
  group.setAttribute('data-id', t.id);
  group.setAttribute('transform', `translate(${t.x},${t.y}) rotate(${t.r||0})`);
  group.style.cursor = isBusy ? 'not-allowed' : (guests>6 ? 'default' : 'pointer');

  let shapeEl;
  if (t.shape === 'round') {
    const r = Math.min(t.w, t.h)/2;
    shapeEl = document.createElementNS('http://www.w3.org/2000/svg','circle');
    shapeEl.setAttribute('cx','0'); shapeEl.setAttribute('cy','0');
    shapeEl.setAttribute('r', `${r}`);
  } else {
    shapeEl = document.createElementNS('http://www.w3.org/2000/svg','rect');
    shapeEl.setAttribute('x', `${-t.w/2}`); shapeEl.setAttribute('y', `${-t.h/2}`);
    shapeEl.setAttribute('width', `${t.w}`); shapeEl.setAttribute('height', `${t.h}`);
    shapeEl.setAttribute('rx', '2'); shapeEl.setAttribute('ry', '2');
  }
  shapeEl.setAttribute('fill', isBusy ? colors.busyFill : colors.fill);
  shapeEl.setAttribute('stroke', isSel ? colors.accent : colors.stroke);
  shapeEl.setAttribute('stroke-width', isSel ? '0.8' : '0.5');
  shapeEl.setAttribute('opacity', isBusy ? '0.5' : '0.95');
  group.appendChild(shapeEl);

  const txt = document.createElementNS('http://www.w3.org/2000/svg','text');
  txt.setAttribute('x','0'); txt.setAttribute('y',t.shape==='round' ? -1.2 : 0);
  txt.setAttribute('text-anchor','middle');
  txt.setAttribute('dominant-baseline','central');
  txt.setAttribute('font-size','4'); txt.setAttribute('font-weight','800');
  txt.setAttribute('fill', colors.textOnTable);
  txt.textContent = t.id;
  group.appendChild(txt);

  const cap = document.createElementNS('http://www.w3.org/2000/svg','text');
  cap.setAttribute('x','0'); cap.setAttribute('y', t.shape==='round' ? 4.8 : 6);
  cap.setAttribute('text-anchor','middle'); cap.setAttribute('font-size','2.8');
  cap.setAttribute('fill', colors.textOnTableMuted);
  cap.textContent = `${t.cap} pax`;
  group.appendChild(cap);

  if (!isBusy && guests<=6) {
    group.addEventListener('click', () => onPick && onPick(t.id));
  }
  g.appendChild(group);
}


  function renderSVG(hostEl, tab, opts){
    hostEl.innerHTML = '';
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 100 100'); // percent-based layout
    svg.setAttribute('width','100%'); svg.setAttribute('height','100%');
    svg.style.display = 'block';
    svg.style.borderRadius = '16px';

    // fondo “vetro” + palette La Casita
    const bg = document.createElementNS('http://www.w3.org/2000/svg','rect');
    bg.setAttribute('x','0'); bg.setAttribute('y','0'); bg.setAttribute('width','100'); bg.setAttribute('height','100');
    bg.setAttribute('fill','rgba(255,255,255,0.35)');
    bg.setAttribute('stroke','rgba(139,107,74,0.2)');
    svg.appendChild(bg);

    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('transform','translate(0,0)');
    svg.appendChild(g);

    const colors = {
      fill: 'rgba(179,123,58,0.85)',
      busyFill: 'rgba(199,81,81,0.55)',
      stroke: 'rgba(139,107,74,0.5)',
      accent: '#b37b3a',
      textOnTable: '#ffffff',
      textOnTableMuted: '#f8f4ee'
    };

    const tables = (LAYOUT[tab] ? LAYOUT[tab]() : []);
    tables.forEach(t => drawTable(g, t, { ...opts, colors }));

    hostEl.appendChild(svg);
  }

  // API pubblica
  window.SVGMap = {
    render(hostEl, tab, {selectedId=null, busySet=new Set(), guests=2, onPick=null}={}){
      renderSVG(hostEl, tab, { selectedId, busySet, guests, onPick });
    }
  };
})();
