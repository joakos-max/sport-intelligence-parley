import QRCode from 'qrcode';

export class Card3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      cardholder: options.cardholder || 'CARLOS E. MENDOZA',
      cardNumber: options.cardNumber || 'SI-2026-8849-VE',
      tier: options.tier || 'ORO VIP',
      pin: options.pin || '849',
      theme: options.theme || 'obsidian', // 'obsidian', 'redCarbon', 'titanium'
      qrUrl: options.qrUrl || window.location.origin + window.location.pathname + '#player',
      onScanClick: options.onScanClick || null,
      ...options
    };

    this.isFlipped = false;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.generateQR();
  }

  getThemeClasses() {
    switch (this.theme) {
      case 'redCarbon':
        return {
          frontBg: 'bg-gradient-to-br from-[#E10600] via-[#A80000] to-[#1c0002]',
          backBg: 'bg-gradient-to-br from-[#1c0002] via-[#6d0006] to-[#A80000]',
          accentBorder: 'border-red-400/30',
          textColor: 'text-white',
          chipColor: 'from-amber-200 via-amber-400 to-amber-600',
          foilLogo: 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]',
          badgeBg: 'bg-black/60 text-amber-300 border border-amber-400/40'
        };
      case 'titanium':
        return {
          frontBg: 'bg-gradient-to-br from-[#2D3748] via-[#1A202C] to-[#0D1117]',
          backBg: 'bg-gradient-to-br from-[#0D1117] via-[#1A202C] to-[#2D3748]',
          accentBorder: 'border-slate-400/30',
          textColor: 'text-slate-100',
          chipColor: 'from-slate-200 via-slate-300 to-slate-400',
          foilLogo: 'text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]',
          badgeBg: 'bg-white/10 text-white border border-white/20'
        };
      case 'obsidian':
      default:
        return {
          frontBg: 'bg-gradient-to-br from-[#121620] via-[#090B10] to-[#050608]',
          backBg: 'bg-gradient-to-br from-[#050608] via-[#090B10] to-[#141824]',
          accentBorder: 'border-amber-500/30',
          textColor: 'text-white',
          chipColor: 'from-amber-300 via-yellow-400 to-amber-600',
          foilLogo: 'text-white drop-shadow-[0_2px_10px_rgba(217,28,36,0.5)]',
          badgeBg: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-400 border border-amber-500/40'
        };
    }
  }

  render() {
    const theme = this.getThemeClasses();
    
    this.container.innerHTML = `
      <div class="card-showcase-wrapper flex flex-col items-center select-none w-full max-w-xl mx-auto">
        <!-- Contenedor 3D con perspectiva -->
        <div class="card-scene relative w-full h-[320px] sm:h-[340px] cursor-grab active:cursor-grabbing" style="perspective: 1200px;">
          <div id="card-inner" class="card-inner relative w-full h-full transition-transform duration-700 ease-out preserve-3d">
            
            <!-- ================= FRENTE DE LA TARJETA ================= -->
            <div id="card-front" class="card-face absolute inset-0 rounded-2xl p-6 sm:p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] border ${theme.accentBorder} ${theme.frontBg} backface-hidden overflow-hidden flex flex-col justify-between">
              
              <!-- Textura decorativa y brillo especular -->
              <div class="absolute inset-0 opacity-15 pointer-events-none" style="background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px); background-size: 16px 16px;"></div>
              <div id="card-shine-front" class="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300" style="background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 60%);"></div>

              <!-- Cabecera de la tarjeta: Logo + Badge VIP -->
              <div class="relative z-10 flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-10 sm:h-12 bg-white rounded-lg p-1.5 shadow-md flex items-center justify-center">
                    <img src="/logo.jpg" alt="Sport Intelligence Logo" class="h-full object-contain max-w-[140px] sm:max-w-[170px]" />
                  </div>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <span class="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${theme.badgeBg} shadow-sm backdrop-blur-md">
                    ★ ${this.options.tier}
                  </span>
                  <span class="text-[10px] text-gray-400 font-mono tracking-widest uppercase">TARJETA OFICIAL</span>
                </div>
              </div>

              <!-- Centro: Chip inteligente EMV dorado + Icono Contactless -->
              <div class="relative z-10 flex items-center gap-4 my-auto">
                <!-- Chip EMV con contactos de oro simulados -->
                <div class="w-12 h-9 sm:w-14 sm:h-10 rounded-md bg-gradient-to-tr ${theme.chipColor} shadow-inner p-1 relative border border-yellow-600/40">
                  <div class="w-full h-full border border-yellow-800/40 rounded flex flex-col justify-between p-0.5">
                    <div class="w-full h-[1px] bg-yellow-900/40"></div>
                    <div class="flex justify-between items-center h-full">
                      <div class="w-1/3 h-[1px] bg-yellow-900/40"></div>
                      <div class="w-3 h-3 rounded-full border border-yellow-900/40"></div>
                      <div class="w-1/3 h-[1px] bg-yellow-900/40"></div>
                    </div>
                    <div class="w-full h-[1px] bg-yellow-900/40"></div>
                  </div>
                </div>

                <!-- Símbolo Contactless NFC -->
                <svg class="w-6 h-6 text-gray-300/80 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>

                <div class="ml-auto text-right">
                  <span class="text-[10px] font-bold text-red-500 tracking-wider uppercase block">PARLEY & HIPISMO</span>
                  <span class="text-[9px] text-gray-400 font-medium">SALA VENEZUELA</span>
                </div>
              </div>

              <!-- Pie de la tarjeta: Número formateado + Titular -->
              <div class="relative z-10 flex flex-col gap-2">
                <div class="font-mono text-lg sm:text-xl font-bold tracking-[0.25em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  ${this.options.cardNumber}
                </div>
                
                <div class="flex items-end justify-between text-xs">
                  <div>
                    <span class="text-[9px] text-gray-400 uppercase tracking-widest block font-medium">TITULAR / JUGADOR</span>
                    <span class="font-semibold text-white tracking-wider uppercase">${this.options.cardholder}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-[9px] text-gray-400 uppercase tracking-widest block font-medium">EMISIÓN</span>
                    <span class="font-mono font-bold text-white">11/26 • INDEF</span>
                  </div>
                </div>
              </div>

            </div>


            <!-- ================= REVERSO DE LA TARJETA (CON QR Y BANDA) ================= -->
            <div id="card-back" class="card-face absolute inset-0 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] border ${theme.accentBorder} ${theme.backBg} backface-hidden overflow-hidden flex flex-col justify-between" style="transform: rotateY(180deg);">
              
              <div id="card-shine-back" class="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300" style="background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%);"></div>

              <!-- Banda magnética de 12.7 mm -->
              <div class="w-full h-11 bg-black/95 mt-5 shadow-inner border-y border-white/5 flex items-center px-4">
                <span class="text-[9px] text-gray-600 font-mono tracking-widest">SPORT INTELLIGENCE MAGNETIC ENCRYPTED TRACK</span>
              </div>

              <!-- Panel de firma y CVV + Código QR con alta visibilidad -->
              <div class="px-6 py-2 flex items-center justify-between gap-4">
                
                <!-- Columna izquierda: Panel de firma y texto legal -->
                <div class="flex-1 flex flex-col gap-2">
                  <div class="flex items-center gap-2">
                    <div class="h-8 flex-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 rounded flex items-center justify-end px-3 shadow-inner">
                      <span class="text-[10px] text-gray-500 italic mr-auto">Firma Autorizada</span>
                      <span class="font-mono font-bold text-xs text-gray-900 tracking-widest">${this.options.pin}</span>
                    </div>
                  </div>
                  <p class="text-[8px] leading-tight text-gray-400">
                    Esta tarjeta es personal e intransferible. Válida para consultas de saldo, sellado de jugadas hípicas (5y6, La Rinconada), parleys y cobros express en taquilla Sport Intelligence. Venta prohibida a menores de 18 años.
                  </p>
                </div>

                <!-- Columna derecha: CÓDIGO QR GENERADO DINÁMICAMENTE -->
                <div class="flex flex-col items-center bg-white p-2 rounded-xl shadow-lg border border-gray-200/80">
                  <canvas id="card-qr-canvas" class="w-20 h-20 sm:w-22 sm:h-22"></canvas>
                  <span class="text-[8px] font-bold text-black uppercase mt-1 tracking-wider">ESCANEAR AQUÍ</span>
                </div>
              </div>

              <!-- Pie reverso: Código de barras y soporte -->
              <div class="px-6 pb-4 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-gray-400">
                <div class="flex flex-col">
                  <!-- Código de barras simulado SVG -->
                  <svg class="h-6 w-32 text-white fill-current opacity-85" viewBox="0 0 160 30">
                    <rect x="0" y="0" width="3" height="30" />
                    <rect x="5" y="0" width="2" height="30" />
                    <rect x="9" y="0" width="4" height="30" />
                    <rect x="16" y="0" width="1" height="30" />
                    <rect x="19" y="0" width="3" height="30" />
                    <rect x="25" y="0" width="5" height="30" />
                    <rect x="33" y="0" width="2" height="30" />
                    <rect x="38" y="0" width="4" height="30" />
                    <rect x="45" y="0" width="1" height="30" />
                    <rect x="49" y="0" width="6" height="30" />
                    <rect x="58" y="0" width="2" height="30" />
                    <rect x="63" y="0" width="3" height="30" />
                    <rect x="69" y="0" width="5" height="30" />
                    <rect x="77" y="0" width="2" height="30" />
                    <rect x="82" y="0" width="4" height="30" />
                    <rect x="89" y="0" width="1" height="30" />
                    <rect x="93" y="0" width="6" height="30" />
                    <rect x="102" y="0" width="3" height="30" />
                    <rect x="108" y="0" width="2" height="30" />
                    <rect x="113" y="0" width="5" height="30" />
                    <rect x="121" y="0" width="2" height="30" />
                    <rect x="126" y="0" width="4" height="30" />
                    <rect x="133" y="0" width="3" height="30" />
                    <rect x="139" y="0" width="2" height="30" />
                    <rect x="144" y="0" width="5" height="30" />
                    <rect x="152" y="0" width="3" height="30" />
                  </svg>
                  <span class="font-mono text-[9px] text-gray-400">8849-2026-00129</span>
                </div>

                <div class="text-right">
                  <span class="text-red-500 font-bold block text-[9px]">SOPORTE WHATSAPP</span>
                  <span class="text-white font-mono text-[9px]">+58 (414) 776-8899</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- Barra interactiva de control de la tarjeta -->
        <div class="flex items-center gap-3 mt-6">
          <button id="btn-flip-card" class="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 text-white font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-lg backdrop-blur-md cursor-pointer">
            <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span id="flip-btn-label">Girar al Reverso (Ver QR)</span>
          </button>

          <button id="btn-simulate-scan" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(217,28,36,0.4)] cursor-pointer">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <span>Simular Escaneo del QR</span>
          </button>
        </div>

        <p class="text-xs text-gray-400 mt-2 text-center">
          Pasa el cursor sobre la tarjeta para el efecto 3D o presiona para voltear
        </p>
      </div>
    `;
  }

  bindEvents() {
    const cardInner = this.container.querySelector('#card-inner');
    const cardScene = this.container.querySelector('.card-scene');
    const shineFront = this.container.querySelector('#card-shine-front');
    const shineBack = this.container.querySelector('#card-shine-back');
    const btnFlip = this.container.querySelector('#btn-flip-card');
    const flipLabel = this.container.querySelector('#flip-btn-label');
    const btnScan = this.container.querySelector('#btn-simulate-scan');

    // 3D Tilt con física suave
    let isHovering = false;

    const handlePointerMove = (e) => {
      const rect = cardScene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 16;

      const baseRotation = this.isFlipped ? 180 : 0;
      cardInner.style.transform = `rotateY(${baseRotation + rotateY}deg) rotateX(${rotateX}deg)`;

      // Desplazamiento del brillo especular
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      const shineGradient = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.35) 0%, transparent 60%)`;
      if (shineFront) shineFront.style.background = shineGradient;
      if (shineBack) shineBack.style.background = shineGradient;
    };

    cardScene.addEventListener('mouseenter', () => {
      isHovering = true;
      cardInner.style.transition = 'transform 100ms ease-out';
    });

    cardScene.addEventListener('mousemove', handlePointerMove);

    cardScene.addEventListener('mouseleave', () => {
      isHovering = false;
      cardInner.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
      const baseRotation = this.isFlipped ? 180 : 0;
      cardInner.style.transform = `rotateY(${baseRotation}deg) rotateX(0deg)`;
    });

    // Giro al hacer clic en la tarjeta o botón
    const toggleFlip = () => {
      this.isFlipped = !this.isFlipped;
      cardInner.style.transition = 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)';
      cardInner.style.transform = `rotateY(${this.isFlipped ? 180 : 0}deg) rotateX(0deg)`;
      flipLabel.textContent = this.isFlipped ? 'Girar al Frente' : 'Girar al Reverso (Ver QR)';
    };

    btnFlip.addEventListener('click', toggleFlip);
    cardScene.addEventListener('click', (e) => {
      // Evitar flip accidental al interactuar con canvas
      if (e.target.tagName !== 'CANVAS') {
        toggleFlip();
      }
    });

    // Simular escaneo
    if (btnScan) {
      btnScan.addEventListener('click', () => {
        if (this.options.onScanClick) {
          this.options.onScanClick();
        } else {
          window.location.hash = '#player';
        }
      });
    }
  }

  generateQR() {
    const canvas = this.container.querySelector('#card-qr-canvas');
    if (!canvas) return;

    QRCode.toCanvas(canvas, this.options.qrUrl, {
      width: 120,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    }, (err) => {
      if (err) console.error('Error generando QR de tarjeta:', err);
    });
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.render();
    this.bindEvents();
    this.generateQR();
  }

  setTheme(themeName) {
    this.theme = themeName;
    this.render();
    this.bindEvents();
    this.generateQR();
  }
}
