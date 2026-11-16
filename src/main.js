import QRCode from 'qrcode';

class SportIntelligenceLanding {
  constructor() {
    this.selectedPicks = [];
    this.exchangeRateVES = 40.00;
    this.currentStyle = 'gold'; // 'gold', 'red', 'titanium'
    this.currentCardSerial = 'SI-2026-8849-VE';

    // Si estamos en localhost, apuntar por defecto a la URL de producción de Vercel para que al escanear con el teléfono funcione de inmediato
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    this.currentQrUrl = isLocal 
      ? 'https://sport-intelligence-parley.vercel.app' 
      : (window.location.origin + window.location.pathname);

    this.init();
  }

  init() {
    this.initQrCardShowcase();
    this.initParleyCalculator();
    this.initSportFilters();
  }

  // ================= 1. QR CODE & CARD SHOWCASE =================
  initQrCardShowcase() {
    const canvas = document.getElementById('live-landing-qr');
    const inputUrl = document.getElementById('input-landing-qr-url');
    const inputSerial = document.getElementById('input-card-serial');
    const btnRandSerial = document.getElementById('btn-rand-card-serial');
    const cardSerialDisplay = document.getElementById('card-serial-display');
    const btnDownloadFull = document.getElementById('btn-download-full-card');
    const btnDownloadBadge = document.getElementById('btn-download-qr-badge');
    const badgeFrame = document.getElementById('qr-badge-frame');
    const badgeVip = document.getElementById('card-badge-vip');
    const qrSubLabel = document.getElementById('qr-sub-label');
    const cardWrapper = document.querySelector('.card-mockup-wrapper');
    const cardShine = document.getElementById('card-mockup-shine');

    if (inputUrl) inputUrl.value = this.currentQrUrl;
    if (inputSerial) inputSerial.value = this.currentCardSerial;

    // Render del QR estético con emblema central
    const drawAestheticQR = (url, style = this.currentStyle) => {
      if (!canvas) return;

      const size = 320;
      canvas.width = size;
      canvas.height = size;

      // Generar matriz QR con nivel de redundancia H (30% de recuperación de error)
      QRCode.toCanvas(canvas, url, {
        width: size,
        margin: 2,
        color: {
          dark: '#0A0D14',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      }, (err) => {
        if (err) {
          console.error('Error generando QR:', err);
          return;
        }

        const ctx = canvas.getContext('2d');

        // 1. Dibujar Emblema Central de Sport Intelligence
        const centerSize = Math.round(size * 0.23); // 23% del ancho
        const centerPos = (size - centerSize) / 2;
        const radius = 8;

        ctx.save();

        // Sombra suave para despegar el logo del patrón del QR
        ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        // Placa blanca de aislamiento
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(centerPos - 4, centerPos - 4, centerSize + 8, centerSize + 8, radius + 2);
        } else {
          ctx.rect(centerPos - 4, centerPos - 4, centerSize + 8, centerSize + 8);
        }
        ctx.fill();

        // Fondo del escudo: Rojo corporativo Sport Intelligence (#E10600)
        ctx.shadowBlur = 0;
        const brandColor = style === 'red' ? '#E10600' : (style === 'gold' ? '#D91C24' : '#141824');
        ctx.fillStyle = brandColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(centerPos, centerPos, centerSize, centerSize, radius);
        } else {
          ctx.rect(centerPos, centerPos, centerSize, centerSize);
        }
        ctx.fill();

        // Borde fino metálico alrededor del escudo
        ctx.strokeStyle = style === 'gold' ? '#F59E0B' : (style === 'red' ? '#FFFFFF' : '#94A3B8');
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Tipografía atlética "SI" en blanco en el centro
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold ' + Math.round(centerSize * 0.50) + 'px "Oswald", "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SI', size / 2, size / 2 + 1);

        ctx.restore();
      });
    };

    // Actualizar estilo visual del marco
    const updateStyleTheme = (style) => {
      this.currentStyle = style;

      // Actualizar botones de estilo
      document.querySelectorAll('.qr-style-btn').forEach(btn => {
        const s = btn.getAttribute('data-style');
        if (s === style) {
          btn.className = 'qr-style-btn px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-pointer transition-all';
          if (style === 'red') btn.className = 'qr-style-btn px-2.5 py-1 rounded-lg bg-red-600/30 text-red-400 border border-red-500/40 cursor-pointer transition-all';
          if (style === 'titanium') btn.className = 'qr-style-btn px-2.5 py-1 rounded-lg bg-white/20 text-white border border-white/40 cursor-pointer transition-all';
        } else {
          btn.className = 'qr-style-btn px-2.5 py-1 rounded-lg text-gray-400 hover:text-white cursor-pointer transition-all';
        }
      });

      if (badgeFrame) {
        if (style === 'gold') {
          badgeFrame.className = 'relative p-2.5 sm:p-3 rounded-2xl bg-white shadow-2xl border-2 border-amber-500/70 flex flex-col items-center transition-all duration-300';
          if (badgeVip) {
            badgeVip.textContent = '★ ORO VIP • ACCESS CARD';
            badgeVip.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm backdrop-blur-md';
          }
        } else if (style === 'red') {
          badgeFrame.className = 'relative p-2.5 sm:p-3 rounded-2xl bg-white shadow-2xl border-2 border-red-600/80 flex flex-col items-center transition-all duration-300';
          if (badgeVip) {
            badgeVip.textContent = '★ SPORT RED VIP';
            badgeVip.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-600/20 text-red-400 border border-red-500/40 shadow-sm backdrop-blur-md';
          }
        } else {
          badgeFrame.className = 'relative p-2.5 sm:p-3 rounded-2xl bg-white shadow-2xl border-2 border-slate-400/80 flex flex-col items-center transition-all duration-300';
          if (badgeVip) {
            badgeVip.textContent = '★ TITANIUM VIP';
            badgeVip.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/20 text-gray-200 border border-white/30 shadow-sm backdrop-blur-md';
          }
        }
      }

      drawAestheticQR(inputUrl ? inputUrl.value : this.currentQrUrl, style);
    };

    // Render inicial
    drawAestheticQR(this.currentQrUrl, this.currentStyle);

    // Botones de selector de estilo
    document.querySelectorAll('.qr-style-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const style = btn.getAttribute('data-style');
        updateStyleTheme(style);
      });
    });

    // Re-render al tipear en el input de URL
    if (inputUrl) {
      inputUrl.addEventListener('input', (e) => {
        const val = e.target.value.trim() || this.currentQrUrl;
        drawAestheticQR(val, this.currentStyle);
      });
    }

    // Input de serial
    if (inputSerial && cardSerialDisplay) {
      inputSerial.addEventListener('input', (e) => {
        const val = e.target.value.trim().toUpperCase() || 'SI-2026-8849-VE';
        this.currentCardSerial = val;
        cardSerialDisplay.textContent = val;
      });
    }

    // Botón random serial
    if (btnRandSerial && inputSerial) {
      btnRandSerial.addEventListener('click', () => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        const newSerial = `SI-2026-${rand}-VE`;
        inputSerial.value = newSerial;
        inputSerial.dispatchEvent(new Event('input'));
      });
    }

    // Efecto 3D Tilt y brillo en la maqueta
    if (cardWrapper && cardShine) {
      cardWrapper.addEventListener('mousemove', (e) => {
        const rect = cardWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        cardShine.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
      });

      cardWrapper.addEventListener('mouseleave', () => {
        cardShine.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
      });
    }

    // DESCARGA 1: Arte de Tarjeta Completa en Alta Definición (PNG 300 DPI)
    if (btnDownloadFull) {
      btnDownloadFull.addEventListener('click', () => {
        const comp = document.createElement('canvas');
        comp.width = 1024;
        comp.height = 764;
        const cCtx = comp.getContext('2d');

        const baseImg = new Image();
        baseImg.crossOrigin = 'anonymous';
        baseImg.onload = () => {
          // 1. Dibujar textura base de la tarjeta
          cCtx.drawImage(baseImg, 0, 0, 1024, 764);

          // 2. Dibujar cabecera: Logo de Sport Intelligence
          const logoImg = new Image();
          logoImg.crossOrigin = 'anonymous';
          logoImg.onload = () => {
            // Fondo blanco del logo
            cCtx.fillStyle = '#FFFFFF';
            cCtx.beginPath();
            if (cCtx.roundRect) cCtx.roundRect(50, 45, 170, 52, 10);
            else cCtx.rect(50, 45, 170, 52);
            cCtx.fill();
            cCtx.drawImage(logoImg, 58, 50, 154, 42);

            // Badge VIP superior derecho
            cCtx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            cCtx.beginPath();
            if (cCtx.roundRect) cCtx.roundRect(750, 45, 220, 36, 18);
            else cCtx.rect(750, 45, 220, 36);
            cCtx.fill();
            cCtx.strokeStyle = '#F59E0B';
            cCtx.lineWidth = 1.5;
            cCtx.stroke();

            cCtx.fillStyle = '#F59E0B';
            cCtx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
            cCtx.textAlign = 'center';
            cCtx.textBaseline = 'middle';
            cCtx.fillText('★ VIP ACCESS CARD', 860, 63);

            // 3. Dibujar Placa Central con QR en la zona designada
            const qrSize = 340;
            const qrX = (1024 - qrSize) / 2;
            const qrY = (764 - qrSize) / 2;

            // Placa blanca satinada
            cCtx.fillStyle = '#FFFFFF';
            cCtx.shadowColor = 'rgba(0, 0, 0, 0.6)';
            cCtx.shadowBlur = 30;
            cCtx.beginPath();
            if (cCtx.roundRect) cCtx.roundRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 56, 24);
            else cCtx.rect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 56);
            cCtx.fill();

            // Borde metálico
            cCtx.shadowBlur = 0;
            cCtx.strokeStyle = this.currentStyle === 'gold' ? '#F59E0B' : (this.currentStyle === 'red' ? '#E10600' : '#94A3B8');
            cCtx.lineWidth = 3;
            cCtx.stroke();

            // Dibujar QR canvas escalado
            cCtx.drawImage(canvas, qrX, qrY, qrSize, qrSize);

            // Micro-caption inferior de la placa
            cCtx.fillStyle = '#1E293B';
            cCtx.font = 'bold 12px "JetBrains Mono", monospace';
            cCtx.textAlign = 'center';
            cCtx.fillText('ESCANEAR PARA JUGAR & RECARGAR', 512, qrY + qrSize + 24);

            // 4. Pie de tarjeta
            cCtx.fillStyle = '#FFFFFF';
            cCtx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
            cCtx.textAlign = 'left';
            cCtx.fillText('TITULAR: JUGADOR VIP EXCLUSIVO', 50, 710);

            cCtx.textAlign = 'center';
            cCtx.font = '14px "JetBrains Mono", monospace';
            cCtx.fillStyle = '#94A3B8';
            cCtx.fillText('((( · ))) CONTACTLESS NFC', 512, 710);

            cCtx.textAlign = 'right';
            cCtx.font = 'bold 16px "JetBrains Mono", monospace';
            cCtx.fillStyle = '#FFFFFF';
            cCtx.fillText(this.currentCardSerial, 974, 710);

            // Descargar
            const link = document.createElement('a');
            link.download = `sport-intelligence-tarjeta-${this.currentCardSerial}.png`;
            link.href = comp.toDataURL('image/png');
            link.click();
          };
          logoImg.src = '/logo.jpg';
        };
        baseImg.src = '/card-mockup.jpg';
      });
    }

    // DESCARGA 2: Solo el Código QR con Logo en Alta Resolución
    if (btnDownloadBadge && canvas) {
      btnDownloadBadge.addEventListener('click', () => {
        const badgeCanvas = document.createElement('canvas');
        badgeCanvas.width = 600;
        badgeCanvas.height = 680;
        const bCtx = badgeCanvas.getContext('2d');

        // Fondo placa blanca
        bCtx.fillStyle = '#FFFFFF';
        bCtx.beginPath();
        if (bCtx.roundRect) bCtx.roundRect(20, 20, 560, 640, 28);
        else bCtx.rect(20, 20, 560, 640);
        bCtx.fill();

        // Borde decorativo
        bCtx.strokeStyle = this.currentStyle === 'gold' ? '#F59E0B' : (this.currentStyle === 'red' ? '#E10600' : '#94A3B8');
        bCtx.lineWidth = 4;
        bCtx.stroke();

        // Dibujar QR
        bCtx.drawImage(canvas, 50, 50, 500, 500);

        // Texto bajo QR
        bCtx.fillStyle = '#0F172A';
        bCtx.font = 'bold 18px "JetBrains Mono", monospace';
        bCtx.textAlign = 'center';
        bCtx.fillText('SPORT INTELLIGENCE • PARLEY VIP', 300, 590);
        bCtx.font = '14px "Plus Jakarta Sans", sans-serif';
        bCtx.fillStyle = '#64748B';
        bCtx.fillText('ESCANEAR CON LA CÁMARA PARA ACCESO', 300, 618);

        const link = document.createElement('a');
        link.download = 'sport-intelligence-qr-badge-impresion.png';
        link.href = badgeCanvas.toDataURL('image/png');
        link.click();
      });
    }
  }

  // ================= 2. PARLEY SLIP / CALCULADORA DE CUOTAS =================
  initParleyCalculator() {
    const oddButtons = document.querySelectorAll('.odd-btn');
    const slipList = document.getElementById('parley-slip-list');
    const slipEmpty = document.getElementById('slip-empty-msg');
    const totalOddsEl = document.getElementById('slip-total-odds');
    const winUsdEl = document.getElementById('slip-potential-win');
    const winVesEl = document.getElementById('slip-potential-ves');
    const betInput = document.getElementById('input-bet-amount');
    const btnClear = document.getElementById('btn-clear-slip');

    const updateSlipUI = () => {
      if (this.selectedPicks.length === 0) {
        if (slipEmpty) slipEmpty.style.display = 'block';
        slipList.innerHTML = '<p id="slip-empty-msg" class="text-xs text-gray-400 py-4 text-center">Haz clic en cualquier cuota de los partidos superiores para agregar logros a tu parley.</p>';
        totalOddsEl.textContent = '1.00x';
        winUsdEl.textContent = '$ 0.00 USD';
        winVesEl.textContent = '≈ Bs. 0.00 VES';
        return;
      }

      if (slipEmpty) slipEmpty.style.display = 'none';

      // Calcular cuota multiplicada
      const totalOdd = this.selectedPicks.reduce((acc, curr) => acc * curr.odd, 1);
      const betAmount = parseFloat(betInput?.value) || 20;
      const potentialWin = betAmount * totalOdd;
      const potentialVes = potentialWin * this.exchangeRateVES;

      totalOddsEl.textContent = totalOdd.toFixed(2) + 'x';
      winUsdEl.textContent = '$ ' + potentialWin.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USD';
      winVesEl.textContent = '≈ Bs. ' + potentialVes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' VES';

      // Render items
      slipList.innerHTML = this.selectedPicks.map((pick, index) => `
        <div class="py-2.5 flex items-center justify-between text-xs">
          <div>
            <span class="font-bold text-white block">${pick.name}</span>
            <span class="text-[10px] text-gray-400">Cuota: ${pick.odd.toFixed(2)}</span>
          </div>
          <button data-remove-index="${index}" class="text-gray-400 hover:text-red-400 p-1 text-xs cursor-pointer active:scale-95">✕</button>
        </div>
      `).join('');

      // Bind botones eliminar logro
      slipList.querySelectorAll('[data-remove-index]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.getAttribute('data-remove-index'));
          const removed = this.selectedPicks.splice(idx, 1)[0];
          
          // Desmarcar botón visual
          oddButtons.forEach(b => {
            if (b.getAttribute('data-pick') === removed.name) {
              b.classList.remove('border-red-500', 'bg-red-950/40');
            }
          });

          updateSlipUI();
        });
      });
    };

    // Click en cuotas
    oddButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-pick');
        const odd = parseFloat(btn.getAttribute('data-odd'));

        const existingIndex = this.selectedPicks.findIndex(p => p.name === name);
        if (existingIndex > -1) {
          // Deseleccionar
          this.selectedPicks.splice(existingIndex, 1);
          btn.classList.remove('border-red-500', 'bg-red-950/40');
        } else {
          // Seleccionar
          this.selectedPicks.push({ name, odd });
          btn.classList.add('border-red-500', 'bg-red-950/40');
        }

        updateSlipUI();
      });
    });

    if (betInput) {
      betInput.addEventListener('input', updateSlipUI);
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.selectedPicks = [];
        oddButtons.forEach(b => b.classList.remove('border-red-500', 'bg-red-950/40'));
        updateSlipUI();
      });
    }

    // Inicializar con dos logros de ejemplo para que la calculadora no esté vacía al cargar
    setTimeout(() => {
      const firstBtn = oddButtons[0];
      const secondBtn = oddButtons[4];
      if (firstBtn && secondBtn) {
        firstBtn.click();
        secondBtn.click();
      }
    }, 200);
  }

  // ================= 3. FILTROS DEPORTIVOS =================
  initSportFilters() {
    const filterBtns = document.querySelectorAll('.filter-sport-btn');
    const cards = document.querySelectorAll('.sport-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const sport = btn.getAttribute('data-sport');

        filterBtns.forEach(b => {
          b.className = 'filter-sport-btn px-3 py-1.5 rounded-lg text-gray-400 hover:text-white cursor-pointer';
        });
        btn.className = 'filter-sport-btn px-3 py-1.5 rounded-lg bg-red-600 text-white cursor-pointer';

        cards.forEach(card => {
          const cardSport = card.getAttribute('data-sport');
          if (sport === 'all' || cardSport === sport) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', () => {
  new SportIntelligenceLanding();
});
