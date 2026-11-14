import QRCode from 'qrcode';

export class PrintSheet {
  constructor(containerId, cardData = {}) {
    this.container = document.getElementById(containerId);
    this.cardData = {
      cardholder: cardData.cardholder || 'CARLOS E. MENDOZA',
      cardNumber: cardData.cardNumber || 'SI-2026-8849-VE',
      tier: cardData.tier || 'ORO VIP',
      pin: cardData.pin || '849',
      qrUrl: cardData.qrUrl || window.location.origin + window.location.pathname + '#player',
      ...cardData
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="print-sheet-wrapper bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30">
                ESPECIFICACIÓN INDUSTRIAL CR-80
              </span>
              <span class="text-xs text-gray-400 font-mono">85.60 mm × 53.98 mm • 300 DPI</span>
            </div>
            <h3 class="text-xl font-bold text-white mt-1">Hoja de Impresión PVC & Troquelado</h3>
            <p class="text-sm text-gray-400">Guías de corte de 3mm (Bleed) y marcas de registro para imprentas de tarjetas plásticas o carnetización.</p>
          </div>

          <div class="flex items-center gap-3">
            <button id="btn-trigger-print" class="px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold rounded-xl text-sm transition-all duration-200 flex items-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Imprimir / Guardar PDF</span>
            </button>
          </div>
        </div>

        <!-- Área de las dos tarjetas con marcas de corte -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8 justify-items-center">
          
          <!-- ================= CARA FRONTAL PARA IMPRENTA ================= -->
          <div class="print-card-box flex flex-col items-center">
            <span class="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Cara 1: Frontal (Anverso)</span>
            
            <div class="relative p-4 border border-dashed border-red-500/40 rounded-xl bg-black/40">
              <!-- Marcas de corte esquina superior izq -->
              <div class="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-red-500"></div>
              <!-- Marcas de corte esquina superior der -->
              <div class="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-red-500"></div>
              <!-- Marcas de corte esquina inferior izq -->
              <div class="absolute bottom-1 left-1 w-3 h-2 border-b-2 border-l-2 border-red-500"></div>
              <!-- Marcas de corte esquina inferior der -->
              <div class="absolute bottom-1 right-1 w-3 h-2 border-b-2 border-r-2 border-red-500"></div>

              <!-- Tarjeta en proporción CR80 (85.6 x 54 mm -> ratio 1.585) -->
              <div class="w-[340px] sm:w-[380px] h-[215px] sm:h-[240px] rounded-xl bg-gradient-to-br from-[#121620] via-[#090B10] to-[#050608] border border-amber-500/40 p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                
                <div class="flex items-start justify-between">
                  <div class="h-9 bg-white rounded p-1 shadow">
                    <img src="/logo.jpg" alt="Logo" class="h-full object-contain" />
                  </div>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                    ★ ${this.cardData.tier}
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <div class="w-10 h-7 rounded bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 border border-yellow-700/60 p-0.5">
                    <div class="w-full h-full border border-yellow-900/30"></div>
                  </div>
                  <svg class="w-4 h-4 text-gray-400 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
                  </svg>
                </div>

                <div>
                  <div class="font-mono text-base font-bold tracking-[0.2em] text-white">
                    ${this.cardData.cardNumber}
                  </div>
                  <div class="flex justify-between items-end mt-1 text-[10px]">
                    <div>
                      <span class="text-gray-400 block text-[8px] uppercase">TITULAR</span>
                      <span class="font-bold text-white uppercase">${this.cardData.cardholder}</span>
                    </div>
                    <div class="text-right">
                      <span class="text-gray-400 block text-[8px] uppercase">EMISIÓN</span>
                      <span class="font-mono text-white">11/26</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- ================= CARA POSTERIOR PARA IMPRENTA ================= -->
          <div class="print-card-box flex flex-col items-center">
            <span class="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">Cara 2: Posterior (Reverso con QR)</span>
            
            <div class="relative p-4 border border-dashed border-red-500/40 rounded-xl bg-black/40">
              <!-- Marcas de corte -->
              <div class="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-red-500"></div>
              <div class="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-red-500"></div>
              <div class="absolute bottom-1 left-1 w-3 h-2 border-b-2 border-l-2 border-red-500"></div>
              <div class="absolute bottom-1 right-1 w-3 h-2 border-b-2 border-r-2 border-red-500"></div>

              <div class="w-[340px] sm:w-[380px] h-[215px] sm:h-[240px] rounded-xl bg-gradient-to-br from-[#050608] via-[#090B10] to-[#141824] border border-amber-500/40 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                
                <!-- Banda magnética -->
                <div class="w-full h-8 bg-black mt-3 border-y border-white/10 flex items-center px-4">
                  <span class="text-[7px] text-gray-500 font-mono tracking-widest">SPORT INTELLIGENCE MAGNETIC STRIPE</span>
                </div>

                <!-- Panel y QR -->
                <div class="px-4 flex items-center justify-between gap-3">
                  <div class="flex-1 flex flex-col gap-1.5">
                    <div class="h-6 bg-gray-200 rounded flex items-center justify-end px-2">
                      <span class="font-mono text-[10px] font-bold text-gray-900">${this.cardData.pin}</span>
                    </div>
                    <p class="text-[7px] leading-tight text-gray-400">
                      Tarjeta autorizada para apuestas deportivas y carreras de caballos 5y6. Escanee el código QR para consultar saldo y tickets.
                    </p>
                  </div>

                  <div class="bg-white p-1.5 rounded-lg shadow-md border border-gray-300 flex flex-col items-center">
                    <canvas id="print-qr-canvas" class="w-16 h-16"></canvas>
                    <span class="text-[6px] font-bold text-black uppercase tracking-wider mt-0.5">SCAN QR</span>
                  </div>
                </div>

                <div class="px-4 pb-3 flex items-center justify-between border-t border-white/10 pt-1 text-[8px] text-gray-400 font-mono">
                  <span>8849-2026-00129</span>
                  <span class="text-white">+58 (414) 776-8899</span>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div class="bg-black/40 rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span>Listo para exportación a imprenta PVC (Fargo, Zebra, Evolis) o serigrafía/sublimación.</span>
          </div>
          <span class="font-mono text-gray-300">Resolución recomendada: 1016 × 642 px @ 300 DPI</span>
        </div>
      </div>
    `;

    this.bindEvents();
    this.generateQR();
  }

  generateQR() {
    const canvas = this.container.querySelector('#print-qr-canvas');
    if (!canvas) return;

    QRCode.toCanvas(canvas, this.cardData.qrUrl, {
      width: 100,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
  }

  bindEvents() {
    const btnPrint = this.container.querySelector('#btn-trigger-print');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }
  }

  updateData(newCardData) {
    this.cardData = { ...this.cardData, ...newCardData };
    this.render();
  }
}
