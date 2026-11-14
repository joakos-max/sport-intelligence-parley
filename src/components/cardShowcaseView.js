import { Card3D } from './card3d.js';
import { PrintSheet } from './printSheet.js';
import { MOCK_PLAYER_CARD } from '../data/sportsData.js';

export class CardShowcaseView {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.currentData = { ...MOCK_PLAYER_CARD };
    this.card3d = null;
    this.printSheet = null;
    this.showPrintMode = false;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="card-showcase-view-wrapper max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        
        <!-- Header de la muestra -->
        <div class="text-center max-w-3xl mx-auto space-y-3 no-print">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider">
            MUESTRA DE IMPRESIÓN & PROTOTIPO FÍSICO
          </div>
          <h1 class="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Tarjeta Inteligente Sportbook con Código QR
          </h1>
          <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Esta es la muestra interactiva de cómo se verá la impresión física de las tarjetas en PVC (tamaño estándar CR-80) y cómo el código QR conecta directamente al apostador con su saldo, parleys y cobros.
          </p>
        </div>

        <!-- Fila de la Tarjeta 3D + Panel de Configuración -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start no-print">
          
          <!-- Visualizador 3D interactivo (7 cols) -->
          <div class="lg:col-span-7 bg-[#10141D] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-mono text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                VISOR 3D HOLOGRÁFICO
              </span>
              <span class="text-xs text-gray-400 font-mono">Frente & Dorso</span>
            </div>

            <!-- Contenedor donde se monta Card3D -->
            <div id="card-3d-mount" class="w-full"></div>
          </div>

          <!-- Panel de Opciones de Impresión & Personalización (5 cols) -->
          <div class="lg:col-span-5 bg-[#121622] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
            <div class="border-b border-white/10 pb-4">
              <h3 class="font-bold text-white text-base">Opciones de Impresión de la Tarjeta</h3>
              <p class="text-xs text-gray-400 mt-1">Configura acabados y datos para la muestra del cliente</p>
            </div>

            <!-- Selección de Material / Acabado -->
            <div>
              <label class="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2">Acabado de Tarjeta PVC:</label>
              <div class="grid grid-cols-3 gap-2">
                <button id="theme-obsidian" class="p-2.5 rounded-xl border border-amber-500/50 bg-black/60 text-amber-400 font-bold text-xs flex flex-col items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md">
                  <span class="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600"></span>
                  <span>Obsidian VIP</span>
                </button>

                <button id="theme-redcarbon" class="p-2.5 rounded-xl border border-white/10 bg-black/40 text-gray-300 hover:text-white font-bold text-xs flex flex-col items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95">
                  <span class="w-4 h-4 rounded-full bg-gradient-to-r from-red-600 to-red-800"></span>
                  <span>Sport Red</span>
                </button>

                <button id="theme-titanium" class="p-2.5 rounded-xl border border-white/10 bg-black/40 text-gray-300 hover:text-white font-bold text-xs flex flex-col items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95">
                  <span class="w-4 h-4 rounded-full bg-gradient-to-r from-slate-400 to-slate-600"></span>
                  <span>Titanium</span>
                </button>
              </div>
            </div>

            <!-- Nombre impreso en la tarjeta -->
            <div>
              <label class="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">Nombre del Titular:</label>
              <input id="input-cardholder" type="text" value="${this.currentData.cardholder}" class="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-white font-semibold text-xs focus:border-red-500 focus:outline-none uppercase" />
              <div class="flex gap-2 mt-1.5">
                <button id="btn-set-vip" class="text-[10px] text-gray-400 hover:text-white px-2 py-0.5 rounded bg-white/5 cursor-pointer">CLIENTE VIP EXCLUSIVO</button>
                <button id="btn-set-portador" class="text-[10px] text-gray-400 hover:text-white px-2 py-0.5 rounded bg-white/5 cursor-pointer">AL PORTADOR</button>
              </div>
            </div>

            <!-- Número serial de tarjeta -->
            <div>
              <label class="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">Número de Tarjeta:</label>
              <div class="flex gap-2">
                <input id="input-cardnumber" type="text" value="${this.currentData.cardNumber}" class="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-white font-mono text-xs focus:border-red-500 focus:outline-none" />
                <button id="btn-random-serial" class="px-3 py-2 bg-white/10 hover:bg-white/15 rounded-xl text-xs text-white cursor-pointer active:scale-95" title="Generar nuevo serial">🎲</button>
              </div>
            </div>

            <!-- Enlace al que apunta el QR -->
            <div>
              <label class="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                Destino del Código QR:
              </label>
              <input id="input-qr-url" type="text" value="${window.location.origin + window.location.pathname}#player" class="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-emerald-400 font-mono text-[11px] focus:border-red-500 focus:outline-none" />
              <span class="text-[10px] text-gray-400 mt-1 block">
                Al escanear este QR con el teléfono móvil, abrirá directamente el portal del jugador.
              </span>
            </div>

            <!-- Botón para ver Hoja de Imprenta / Descargar PDF -->
            <div class="pt-3 border-t border-white/10 space-y-2">
              <button id="btn-toggle-print-sheet" class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15">
                <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Ver Hoja de Imprenta & Troquelado CR-80</span>
              </button>

              <button id="btn-jump-player-portal" class="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer">
                <span>📱 Probar Cómo Funciona el QR</span>
              </button>
            </div>

          </div>

        </div>

        <!-- Contenedor de la Hoja de Imprenta (se muestra u oculta) -->
        <div id="print-sheet-mount" class="w-full"></div>

      </div>
    `;

    this.initSubcomponents();
    this.bindEvents();
  }

  initSubcomponents() {
    this.card3d = new Card3D('card-3d-mount', {
      ...this.currentData,
      qrUrl: this.container.querySelector('#input-qr-url').value,
      onScanClick: () => {
        if (this.options.onNavigate) this.options.onNavigate('player');
      }
    });

    this.printSheet = new PrintSheet('print-sheet-mount', {
      ...this.currentData,
      qrUrl: this.container.querySelector('#input-qr-url').value
    });
    this.printSheet.render();
  }

  bindEvents() {
    // Selector de tema
    const btnObsidian = this.container.querySelector('#theme-obsidian');
    const btnRedCarbon = this.container.querySelector('#theme-redcarbon');
    const btnTitanium = this.container.querySelector('#theme-titanium');

    const setActiveThemeBtn = (active) => {
      [btnObsidian, btnRedCarbon, btnTitanium].forEach(b => {
        b.className = 'p-2.5 rounded-xl border border-white/10 bg-black/40 text-gray-300 hover:text-white font-bold text-xs flex flex-col items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95';
      });
      active.className = 'p-2.5 rounded-xl border border-red-500 bg-red-950/40 text-white font-bold text-xs flex flex-col items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-md';
    };

    if (btnObsidian) {
      btnObsidian.addEventListener('click', () => {
        setActiveThemeBtn(btnObsidian);
        this.card3d.setTheme('obsidian');
      });
    }

    if (btnRedCarbon) {
      btnRedCarbon.addEventListener('click', () => {
        setActiveThemeBtn(btnRedCarbon);
        this.card3d.setTheme('redCarbon');
      });
    }

    if (btnTitanium) {
      btnTitanium.addEventListener('click', () => {
        setActiveThemeBtn(btnTitanium);
        this.card3d.setTheme('titanium');
      });
    }

    // Input titular
    const inputHolder = this.container.querySelector('#input-cardholder');
    if (inputHolder) {
      inputHolder.addEventListener('input', (e) => {
        const val = e.target.value.toUpperCase();
        this.currentData.cardholder = val;
        this.card3d.updateOptions({ cardholder: val });
        this.printSheet.updateData({ cardholder: val });
      });
    }

    // Shortcuts titular
    const btnVip = this.container.querySelector('#btn-set-vip');
    const btnPortador = this.container.querySelector('#btn-set-portador');
    if (btnVip && inputHolder) {
      btnVip.addEventListener('click', () => {
        inputHolder.value = 'CLIENTE VIP EXCLUSIVO';
        inputHolder.dispatchEvent(new Event('input'));
      });
    }
    if (btnPortador && inputHolder) {
      btnPortador.addEventListener('click', () => {
        inputHolder.value = 'AL PORTADOR';
        inputHolder.dispatchEvent(new Event('input'));
      });
    }

    // Input Serial
    const inputSerial = this.container.querySelector('#input-cardnumber');
    const btnRandomSerial = this.container.querySelector('#btn-random-serial');
    if (inputSerial) {
      inputSerial.addEventListener('input', (e) => {
        const val = e.target.value.toUpperCase();
        this.currentData.cardNumber = val;
        this.card3d.updateOptions({ cardNumber: val });
        this.printSheet.updateData({ cardNumber: val });
      });
    }
    if (btnRandomSerial && inputSerial) {
      btnRandomSerial.addEventListener('click', () => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        inputSerial.value = `SI-2026-${rand}-VE`;
        inputSerial.dispatchEvent(new Event('input'));
      });
    }

    // Input URL QR
    const inputQrUrl = this.container.querySelector('#input-qr-url');
    if (inputQrUrl) {
      inputQrUrl.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        this.card3d.updateOptions({ qrUrl: val });
        this.printSheet.updateData({ qrUrl: val });
      });
    }

    // Botón alternar hoja de imprenta
    const btnTogglePrint = this.container.querySelector('#btn-toggle-print-sheet');
    const printMount = this.container.querySelector('#print-sheet-mount');
    if (btnTogglePrint && printMount) {
      btnTogglePrint.addEventListener('click', () => {
        this.showPrintMode = !this.showPrintMode;
        if (this.showPrintMode) {
          printMount.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Saltar al portal del jugador
    const btnJump = this.container.querySelector('#btn-jump-player-portal');
    if (btnJump) {
      btnJump.addEventListener('click', () => {
        if (this.options.onNavigate) this.options.onNavigate('player');
      });
    }
  }
}
