export class Navigation {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.currentView = options.initialView || 'card';
    this.onViewChange = options.onViewChange || null;
    this.onScanSimulator = options.onScanSimulator || null;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <header class="sticky top-0 z-40 w-full bg-[#0A0D14]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between gap-4">
          
          <!-- Logo de la empresa -->
          <a href="#card" class="flex items-center gap-3 group">
            <div class="h-10 sm:h-12 bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="/logo.jpg" alt="Sport Intelligence" class="h-full object-contain max-w-[130px] sm:max-w-[160px]" />
            </div>
          </a>

          <!-- Selector de Modo / Vistas (Segmented Control) -->
          <nav class="flex items-center p-1 bg-black/60 border border-white/10 rounded-2xl shadow-inner text-xs font-bold">
            <button id="nav-btn-card" data-view="card" class="nav-tab-btn px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${this.currentView === 'card' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-gray-400 hover:text-white'}">
              <span class="text-sm">🎴</span>
              <span class="hidden sm:inline">Muestra de Tarjeta</span>
              <span class="sm:hidden">Tarjeta</span>
            </button>

            <button id="nav-btn-player" data-view="player" class="nav-tab-btn px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${this.currentView === 'player' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-gray-400 hover:text-white'}">
              <span class="text-sm">📱</span>
              <span class="hidden sm:inline">Portal del Jugador (QR)</span>
              <span class="sm:hidden">Portal QR</span>
            </button>

            <button id="nav-btn-landing" data-view="landing" class="nav-tab-btn px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer ${this.currentView === 'landing' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-gray-400 hover:text-white'}">
              <span class="text-sm">🌐</span>
              <span class="hidden sm:inline">Landing Page</span>
              <span class="sm:hidden">Landing</span>
            </button>
          </nav>

          <!-- Acciones de prueba rápida: Simular Escaneo -->
          <div class="flex items-center gap-2">
            <button id="nav-btn-scan-camera" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer">
              <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="hidden md:inline">Escanear QR</span>
            </button>
          </div>

        </div>
      </header>

      <!-- Modal de Simulación de Cámara / Escáner QR -->
      <div id="modal-scanner" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md hidden flex items-center justify-center p-4">
        <div class="bg-[#141824] border border-white/20 rounded-3xl w-full max-w-md p-6 text-center shadow-2xl relative">
          
          <button id="btn-close-scanner" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <span class="text-xs font-mono font-bold text-red-500 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 uppercase">
            SIMULADOR DE LECTOR QR
          </span>
          <h3 class="text-lg font-bold text-white mt-3">Escaneo de Tarjeta Sport Intelligence</h3>
          <p class="text-xs text-gray-400 mt-1">Apunta la cámara del celular al código QR impreso en el reverso de la tarjeta</p>

          <!-- Ventana de visor de cámara con marco animado -->
          <div class="relative w-64 h-64 mx-auto my-6 bg-black rounded-2xl border-2 border-dashed border-red-500/60 flex items-center justify-center overflow-hidden shadow-inner">
            <!-- Línea láser de escaneo animada -->
            <div class="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#E10600] animate-bounce"></div>
            
            <div class="text-center p-4">
              <svg class="w-16 h-16 text-gray-600 mx-auto animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span class="text-[11px] text-gray-400 block mt-3 font-mono">Buscando código QR de tarjeta...</span>
            </div>
          </div>

          <button id="btn-confirm-mock-scan" class="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Simular Detección de Tarjeta #SI-8849</span>
          </button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const tabs = this.container.querySelectorAll('.nav-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.getAttribute('data-view');
        this.setView(view);
        if (this.onViewChange) this.onViewChange(view);
      });
    });

    const btnScan = this.container.querySelector('#nav-btn-scan-camera');
    const modalScanner = this.container.querySelector('#modal-scanner');
    const btnCloseScanner = this.container.querySelector('#btn-close-scanner');
    const btnConfirmScan = this.container.querySelector('#btn-confirm-mock-scan');

    if (btnScan && modalScanner) {
      btnScan.addEventListener('click', () => modalScanner.classList.remove('hidden'));
      btnCloseScanner.addEventListener('click', () => modalScanner.classList.add('hidden'));

      btnConfirmScan.addEventListener('click', () => {
        modalScanner.classList.add('hidden');
        this.setView('player');
        if (this.onViewChange) this.onViewChange('player');
      });
    }
  }

  setView(viewName) {
    this.currentView = viewName;
    window.location.hash = '#' + viewName;

    const tabs = this.container.querySelectorAll('.nav-tab-btn');
    tabs.forEach(tab => {
      const v = tab.getAttribute('data-view');
      if (v === viewName) {
        tab.className = 'nav-tab-btn px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 bg-red-600 text-white shadow-lg shadow-red-600/30 cursor-pointer';
      } else {
        tab.className = 'nav-tab-btn px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer';
      }
    });
  }
}
