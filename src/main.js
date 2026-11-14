import QRCode from 'qrcode';

class SportIntelligenceLanding {
  constructor() {
    this.selectedPicks = [];
    this.exchangeRateVES = 40.00;
    this.currentQrUrl = window.location.origin + window.location.pathname;

    this.init();
  }

  init() {
    this.initQrCode();
    this.initParleyCalculator();
    this.initSportFilters();
  }

  // ================= 1. QR CODE GENERATOR & DOWNLOAD =================
  initQrCode() {
    const canvas = document.getElementById('live-landing-qr');
    const inputUrl = document.getElementById('input-landing-qr-url');
    const btnDownload = document.getElementById('btn-download-qr');

    if (inputUrl) {
      inputUrl.value = this.currentQrUrl;
    }

    const drawQR = (url) => {
      if (!canvas) return;
      QRCode.toCanvas(canvas, url, {
        width: 220,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'H'
      }, (err) => {
        if (err) console.error('Error generando QR:', err);
      });
    };

    // Render inicial
    drawQR(this.currentQrUrl);

    // Re-render al tipear en el input
    if (inputUrl) {
      inputUrl.addEventListener('input', (e) => {
        const val = e.target.value.trim() || this.currentQrUrl;
        drawQR(val);
      });
    }

    // Descarga de imagen PNG para imprenta
    if (btnDownload && canvas) {
      btnDownload.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'sport-intelligence-qr-alta-resolucion.png';
        link.href = canvas.toDataURL('image/png');
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
