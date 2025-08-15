/**
 * Icon-based allergen filter bar - VERSIONE CORRETTA
 * Risolve i problemi di stato e integrazione con MenuUI
 */

(function(){
    function L(k){
        var lang = (window.currentLang || 'es').toLowerCase();
        var dict = (window.I18N && (I18N[lang] || I18N.es)) || {};
        return dict[k] || {
            filter_celiac:'Celíacos',
            filter_lactose_free:'Sin lactosa',
            filter_vegan:'Veganos',
            filter_nuts:'Frutos secos',
            filter_crustaceans:'Crustáceos',
            filter_reset:'Restablecer'
        }[k] || k;
    }

    function btn(key, label){
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'allergen-btn';
        b.setAttribute('role','switch');
        b.setAttribute('aria-pressed','false');
        b.dataset.key = key;
        b.innerHTML = '<span class="ico">⚙️</span><span class="lbl">'+label+'</span>';
        
        b.addEventListener('click', function(){
            var bar = b.closest('.allergen-bar');
            var wasOn = b.getAttribute('aria-pressed') === 'true';
            
            // Toggle questo bottone
            if (wasOn) {
                b.setAttribute('aria-pressed', 'false');
            } else {
                // Deseleziona altri (modalità radio)
                bar.querySelectorAll('.allergen-btn').forEach(function(x){ 
                    x.setAttribute('aria-pressed','false'); 
                });
                b.setAttribute('aria-pressed','true');
            }
            
            applyFilters(bar);
        });
        
        return b;
    }

    function collectFlags(bar){
        var flags = { celiac:false, lactose_free:false, vegan:false, nuts:false, crustaceans:false };
        bar.querySelectorAll('.allergen-btn[aria-pressed="true"]').forEach(function(b){
            flags[b.dataset.key] = true;
        });
        return flags;
    }

    function applyFilters(bar){
        var targetId = (bar && bar.dataset && bar.dataset.target) || 'menu-content';
        var flags = collectFlags(bar);
        var data = window.menus || [];
        
        // Verifica se ci sono filtri attivi
        var hasActiveFilters = Object.values(flags).some(function(v){ return v === true; });
        
        if (!hasActiveFilters) {
            // Nessun filtro attivo - reset alla vista normale
            if (window.MenuUI && typeof MenuUI.resetToFullView === 'function') {
                MenuUI.resetToFullView();
            } else {
                // Fallback
                if (window.MenuUI && typeof MenuUI.renderMenu === 'function') {
                    MenuUI.renderMenu(0, targetId);
                }
            }
            return;
        }
        
        // Applica filtri
        if (window.AllergenRules && typeof AllergenRules.transformMenuForRestrictions === 'function') {
            data = AllergenRules.transformMenuForRestrictions(data, flags);
        }
        
        // Salva stato filtrato
        if (window.MenuUI && window.MenuUI.appState) {
            window.MenuUI.appState.isFiltered = true;
            window.MenuUI.appState.filteredData = data;
            window.MenuUI.appState.viewMode = 'filtered';
        }
        
        // Render risultati filtrati
        if (window.MenuUI && typeof MenuUI.renderMenus === 'function') {
            MenuUI.renderMenus(data, targetId);
            // Aggiorna anche la griglia con i dati filtrati
            if (typeof MenuUI.renderMenuGrid === 'function') {
                MenuUI.renderMenuGrid('menu-grid');
            }
        }
    }

    function resetFilters(bar) {
        // Deseleziona tutti i bottoni
        bar.querySelectorAll('.allergen-btn').forEach(function(x){ 
            x.setAttribute('aria-pressed','false'); 
        });
        
        // Reset stato applicazione
        if (window.MenuUI && window.MenuUI.appState) {
            window.MenuUI.appState.isFiltered = false;
            window.MenuUI.appState.filteredData = null;
        }
        
        // Torna alla vista normale
        if (window.MenuUI && typeof MenuUI.resetToFullView === 'function') {
            MenuUI.resetToFullView();
        }
    }

    function mount(containerId, targetContainerId){
        var host = document.getElementById(containerId || 'allergen-icons');
        if (!host) return;
        
        host.innerHTML = '';
        var bar = document.createElement('div');
        bar.className = 'allergen-bar';
        bar.dataset.target = targetContainerId || 'menu-content';

        // Crea bottoni filtro
        bar.appendChild(btn('celiac', L('filter_celiac')));
        bar.appendChild(btn('lactose_free', L('filter_lactose_free')));
        bar.appendChild(btn('vegan', L('filter_vegan')));
        bar.appendChild(btn('nuts', L('filter_nuts')));
        bar.appendChild(btn('crustaceans', L('filter_crustaceans')));

        // Bottone reset
        var reset = document.createElement('button');
        reset.type = 'button';
        reset.className = 'allergen-reset';
        reset.textContent = L('filter_reset');
        reset.addEventListener('click', function(){
            resetFilters(bar);
        });

        // Contenitore wrapper
        var wrap = document.createElement('div');
        wrap.style.display='flex';
        wrap.style.alignItems='center';
        wrap.style.gap='6px';
        wrap.style.flexWrap='wrap';
        wrap.appendChild(bar);
        wrap.appendChild(reset);

        host.appendChild(wrap);
        
        // Non applicare filtri all'avvio - lasciamo il controllo a MenuUI
    }

    // Export sicuro
    window.AllergenIcons = window.AllergenIcons || { 
        mount: mount,
        applyFilters: applyFilters,
        resetFilters: resetFilters 
    };
})();