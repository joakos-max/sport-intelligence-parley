import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import { MOCK_PLAYER_CARD, VENEZUELA_PAYMENT_INFO, SPORTS_DATA } from '../data/sportsData.js';

export class PlayerPortal {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.player = { ...MOCK_PLAYER_CARD };
    this.options = options;
    this.activeModal = null;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="player-portal-wrapper max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        
        <!-- ================= CARD HEADER / STATUS VIP ================= -->
        <div class="bg-gradient-to-br from-[#161B26] via-[#10141D] to-[#0A0D14] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
          <!-- Brillo de fondo -->
          <div class="absolute -top-20 -right-20 w-60 h-60 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Fila superior: Info de la tarjeta escaneada -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 relative z-10">
            <div class="flex items-center gap-4">
              <div class="w-13 h-13 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-600/30 p-2">
                <img src="/logo.jpg" alt="Sport Intelligence" class="w-full object-contain filter brightness-110" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    TARJETA ACTIVA
                  </span>
                  <span class="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 bg-amber-400/10 rounded-full border border-amber-400/20">
                    ★ ${this.player.tier}
                  </span>
                </div>
                <h2 class="text-lg font-bold text-white mt-1">${this.player.cardholder}</h2>
                <p class="text-xs font-mono text-gray-400 tracking-wider">${this.player.cardNumber}</p>
              </div>
            </div>

            <!-- Botón para ver código QR de la tarjeta en pantalla -->
            <button id="btn-show-card-qr" class="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs font-semibold text-gray-200 transition-all flex items-center gap-2 cursor-pointer">
              <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              <span>Ver QR de Identificación</span>
            </button>
          </div>

          <!-- Billetera: Saldo en USD y en Bolívares (VES) -->
          <div class="pt-6 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span class="text-xs uppercase tracking-widest text-gray-400 font-semibold block mb-1">
                Saldo Disponible en Tarjeta
              </span>
              <div class="flex items-baseline gap-3">
                <span id="player-balance-usd" class="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  $ ${this.player.balanceUSD.toFixed(2)}
                </span>
                <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  USD
                </span>
              </div>
              <div class="flex items-center gap-2 mt-1.5 text-sm text-gray-400">
                <span>≈ Bs.</span>
                <span id="player-balance-ves" class="font-mono font-bold text-gray-200">
                  ${(this.player.balanceUSD * this.player.exchangeRateVES).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span class="text-[11px] text-gray-500">(Tasa oficial: ${this.player.exchangeRateVES.toFixed(2)} Bs/$)</span>
              </div>
            </div>

            <!-- Botones de Acción Financiera -->
            <div class="flex items-center gap-3">
              <button id="btn-recharge-modal" class="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Recargar Saldo</span>
              </button>

              <button id="btn-express-payout" class="flex-1 sm:flex-none px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-sm transition-all duration-200 border border-white/15 flex items-center justify-center gap-2 cursor-pointer">
                <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cobro Taquilla</span>
              </button>
            </div>
          </div>
        </div>


        <!-- ================= PREDICCIONES SPORT INTELLIGENCE AI ================= -->
        <div class="bg-gradient-to-r from-red-950/40 via-red-900/20 to-black/40 border border-red-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div class="flex items-center justify-between pb-3 border-b border-red-500/20">
            <div class="flex items-center gap-2.5">
              <span class="p-1.5 rounded-lg bg-red-600 text-white shadow">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <div>
                <h3 class="font-bold text-white text-sm flex items-center gap-2">
                  SPORT INTELLIGENCE AI
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 uppercase">ANÁLISIS EN VIVO</span>
                </h3>
                <p class="text-[11px] text-gray-400">Datos y probabilidades calculadas por el motor analítico para tarjetahabientes</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <!-- Pronóstico Fútbol Champions -->
            <div class="bg-black/40 border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
              <div class="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-lg">
                ⚽
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">CHAMPIONS LEAGUE</span>
                  <span class="text-[10px] font-mono text-emerald-400">88% Confianza</span>
                </div>
                <h4 class="font-bold text-white text-xs mt-0.5">Real Madrid vs Man City - Ambos Marcan</h4>
                <p class="text-[11px] text-gray-400 mt-1 leading-snug">Promedio de 3.4 goles por encuentro en sus últimos 5 enfrentamientos directos.</p>
              </div>
            </div>

            <!-- Pronóstico Béisbol LVBP -->
            <div class="bg-black/40 border border-white/10 rounded-xl p-3.5 flex items-start gap-3">
              <div class="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-lg">
                ⚾
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold text-blue-400 uppercase tracking-wider">LÍNEA LVBP HOY</span>
                  <span class="text-[10px] font-mono text-emerald-400">84% Confianza</span>
                </div>
                <h4 class="font-bold text-white text-xs mt-0.5">Leones vs Magallanes - Alta 9.5</h4>
                <p class="text-[11px] text-gray-400 mt-1 leading-snug">Pitchers abridores con ERA superior a 4.80 y viento favorable en el Monumental.</p>
              </div>
            </div>
          </div>
        </div>


        <!-- ================= SECCIÓN: JUGADAS Y TICKETS ACTIVOS ================= -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Jugadas & Tickets en Esta Tarjeta</span>
            </h3>
            <span class="text-xs text-gray-400 font-mono">${this.player.activeTickets.length} Activas</span>
          </div>

          <!-- TICKET 1: PARLEY 4 LOGROS CON CASHOUT DISPONIBLE -->
          <div id="ticket-parley-card" class="bg-gradient-to-br from-[#141824] to-[#0D1017] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all duration-300">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-red-600/20 text-red-400 border border-red-500/30">
                  PARLEY
                </span>
                <div>
                  <h4 class="font-bold text-white text-sm">Combinada 4 Logros</h4>
                  <span class="text-xs text-gray-400 font-mono">Ticket #TK-PA-99214 • Hoy 04:30 PM</span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <span id="parley-status-badge" class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                  3/4 ACERTADOS • 1 EN VIVO
                </span>
              </div>
            </div>

            <!-- Logros del parley -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4">
              <div class="bg-black/30 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-400 block font-semibold">⚾ LVBP</span>
                  <span class="text-xs font-bold text-white">Leones del Caracas a Ganar</span>
                </div>
                <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  ✓ Ganado
                </span>
              </div>

              <div class="bg-black/30 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-400 block font-semibold">⚾ MLB</span>
                  <span class="text-xs font-bold text-white">NY Yankees -1.5 Runline</span>
                </div>
                <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  ✓ Ganado
                </span>
              </div>

              <div class="bg-black/30 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-gray-400 block font-semibold">⚽ Champions League</span>
                  <span class="text-xs font-bold text-white">Real Madrid a Ganar</span>
                </div>
                <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  ✓ Ganado
                </span>
              </div>

              <div class="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <span class="text-[10px] text-amber-400 block font-semibold">🏀 NBA (4Q 03:12)</span>
                  <span class="text-xs font-bold text-white">Boston Celtics Over 220.5</span>
                </div>
                <span class="text-xs font-bold text-amber-400 flex items-center gap-1 animate-pulse">
                  ● En Vivo
                </span>
              </div>
            </div>

            <!-- Resumen y Botón de Cashout -->
            <div class="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-6 text-xs">
                <div>
                  <span class="text-gray-400 block text-[10px] uppercase">Apostado</span>
                  <span class="font-bold text-white">$ 20.00 USD</span>
                </div>
                <div>
                  <span class="text-gray-400 block text-[10px] uppercase">Premio Máximo</span>
                  <span class="font-bold text-emerald-400">$ 196.80 USD</span>
                </div>
              </div>

              <div id="cashout-action-container">
                <button id="btn-cashout-parley" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Cobro Anticipado: $ 148.50 USD</span>
                </button>
              </div>
            </div>
          </div>

          <!-- TICKET 2: PARLEY COMBINADA BÉISBOL LVBP & MLB -->
          <div class="bg-gradient-to-br from-[#141824] to-[#0D1017] border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  PARLEY BÉISBOL
                </span>
                <div>
                  <h4 class="font-bold text-white text-sm">Combinada Pelota Criolla & MLB (3 Logros)</h4>
                  <span class="text-xs text-gray-400 font-mono">Ticket #TK-PA-99380 • Hoy 07:00 PM</span>
                </div>
              </div>

              <div>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  JUGADA VALIDADA
                </span>
              </div>
            </div>

            <!-- Detalle de los logros de béisbol -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
              <div class="bg-black/30 border border-white/5 rounded-xl p-3 text-xs">
                <span class="text-[10px] text-blue-400 font-bold block">⚾ LVBP (07:30 PM)</span>
                <span class="font-bold text-white block mt-0.5">Tiburones a Ganar</span>
                <span class="text-[10px] text-gray-400">Cuota 1.90 • Universitario</span>
              </div>
              <div class="bg-black/30 border border-white/5 rounded-xl p-3 text-xs">
                <span class="text-[10px] text-blue-400 font-bold block">⚾ LVBP (07:00 PM)</span>
                <span class="font-bold text-white block mt-0.5">Leones vs Magallanes Alta 9.5</span>
                <span class="text-[10px] text-gray-400">Cuota 1.85 • Monumental</span>
              </div>
              <div class="bg-black/30 border border-white/5 rounded-xl p-3 text-xs">
                <span class="text-[10px] text-blue-400 font-bold block">⚾ MLB (10:10 PM)</span>
                <span class="font-bold text-white block mt-0.5">LA Dodgers -1.5 Runline</span>
                <span class="text-[10px] text-gray-400">Cuota 1.70 • Dodger Stadium</span>
              </div>
            </div>

            <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div class="flex items-center gap-6">
                <span>Apostado: <strong class="text-white">$ 15.00 USD</strong></span>
                <span>Premio Potencial: <strong class="text-emerald-400">$ 89.50 USD</strong></span>
              </div>
              <span class="font-mono text-gray-400">Sport Intelligence Validado</span>
            </div>
          </div>
        </div>


        <!-- ================= HISTORIAL DE MOVIMIENTOS ================= -->
        <div class="bg-[#10141D] border border-white/10 rounded-2xl p-5 shadow-lg">
          <h3 class="text-sm font-bold text-white uppercase tracking-wider mb-3">Últimas Transacciones</h3>
          <div class="divide-y divide-white/5">
            ${this.player.transactions.map(tx => `
              <div class="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span class="font-semibold text-white">${tx.type}</span>
                  <span class="text-[11px] text-gray-400 block">${tx.date} • ${tx.bank}</span>
                </div>
                <div class="text-right">
                  <span class="font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-gray-300'}">${tx.amount}</span>
                  <span class="text-[10px] text-emerald-400/80 block">${tx.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- ================= MODAL DE RECARGA VENEZUELA ================= -->
      <div id="modal-recharge" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden flex items-center justify-center p-4">
        <div class="bg-[#141824] border border-white/15 rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl relative">
          
          <button id="btn-close-recharge" class="absolute top-5 right-5 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">Recargar Saldo de Tarjeta</h3>
              <p class="text-xs text-gray-400">Acreditación instantánea a la tarjeta #${this.player.cardNumber}</p>
            </div>
          </div>

          <!-- Tabs de métodos de pago -->
          <div class="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-xl border border-white/10 text-xs mb-6 font-semibold">
            <button id="tab-pagomovil" class="py-2 rounded-lg bg-red-600 text-white shadow cursor-pointer">Pago Móvil</button>
            <button id="tab-binance" class="py-2 rounded-lg text-gray-300 hover:text-white cursor-pointer">Binance Pay</button>
            <button id="tab-taquilla" class="py-2 rounded-lg text-gray-300 hover:text-white cursor-pointer">Taquilla</button>
          </div>

          <!-- Contenido Tab 1: Pago Móvil -->
          <div id="content-pagomovil" class="space-y-4">
            <div class="bg-black/30 border border-white/10 rounded-xl p-4 text-xs space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Banco:</span>
                <span class="font-bold text-white">${VENEZUELA_PAYMENT_INFO.pagoMovil.bank}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Teléfono:</span>
                <span class="font-mono font-bold text-emerald-400">${VENEZUELA_PAYMENT_INFO.pagoMovil.phone}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">RIF:</span>
                <span class="font-mono text-white">${VENEZUELA_PAYMENT_INFO.pagoMovil.rif}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Titular:</span>
                <span class="font-semibold text-white">${VENEZUELA_PAYMENT_INFO.pagoMovil.name}</span>
              </div>
            </div>

            <div>
              <label class="text-xs text-gray-400 block mb-1">Monto a Recargar (USD o equivalente en Bs):</label>
              <div class="flex items-center gap-2">
                <input id="input-recharge-amount" type="number" value="25" min="5" class="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:border-red-500 focus:outline-none" />
                <span class="text-sm font-bold text-white px-3 py-2 bg-white/10 rounded-xl border border-white/10">USD</span>
              </div>
            </div>

            <div>
              <label class="text-xs text-gray-400 block mb-1">Número de Referencia de Pago Móvil:</label>
              <input id="input-recharge-ref" type="text" placeholder="Ej: 98124019" class="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-2.5 text-white font-mono focus:border-red-500 focus:outline-none text-xs" />
            </div>

            <button id="btn-submit-recharge" class="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm transition-all shadow-lg shadow-red-600/30 cursor-pointer">
              Confirmar Recarga Inmediata
            </button>
          </div>

          <!-- Contenido Tab 2: Binance Pay (oculto por defecto) -->
          <div id="content-binance" class="space-y-4 hidden">
            <div class="bg-black/30 border border-white/10 rounded-xl p-4 text-xs space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Binance Pay ID:</span>
                <span class="font-mono font-bold text-yellow-400">${VENEZUELA_PAYMENT_INFO.binancePay.payId}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-400">Criptoactivo:</span>
                <span class="font-bold text-white">${VENEZUELA_PAYMENT_INFO.binancePay.crypto}</span>
              </div>
            </div>
            <p class="text-xs text-gray-400">Realiza la transferencia por Binance Pay sin comisión y reporta tu ID para recarga instantánea.</p>
            <button id="btn-submit-binance" class="w-full py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-black font-bold text-sm transition-all shadow-lg shadow-yellow-500/30 cursor-pointer">
              Verificar Pago Binance Pay
            </button>
          </div>

          <!-- Contenido Tab 3: Taquilla (oculto por defecto) -->
          <div id="content-taquilla" class="space-y-4 hidden">
            <div class="bg-black/30 border border-white/10 rounded-xl p-4 text-xs space-y-2">
              <span class="text-gray-400 block font-semibold">Ubicación del Sportbook:</span>
              <p class="text-white">${VENEZUELA_PAYMENT_INFO.taquilla.address}</p>
              <div class="pt-2 border-t border-white/10 flex justify-between">
                <span class="text-gray-400">Horario:</span>
                <span class="text-white">${VENEZUELA_PAYMENT_INFO.taquilla.hours}</span>
              </div>
            </div>
            <p class="text-xs text-gray-400">Presenta tu tarjeta física o tu QR en la taquilla para recargar en efectivo (Dólares o Bolívares).</p>
          </div>

        </div>
      </div>

      <!-- ================= MODAL VER QR DE LA TARJETA ================= -->
      <div id="modal-card-qr" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden flex items-center justify-center p-4">
        <div class="bg-[#141824] border border-white/15 rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl relative">
          <button id="btn-close-card-qr" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-xl bg-white/5 cursor-pointer">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <span class="text-xs font-mono font-bold text-amber-400 px-3 py-1 bg-amber-400/10 rounded-full border border-amber-400/20">
            QR DE IDENTIFICACIÓN SPORTBOOK
          </span>
          <h3 class="text-lg font-bold text-white mt-3">${this.player.cardholder}</h3>
          <p class="text-xs font-mono text-gray-400">${this.player.cardNumber}</p>

          <div class="bg-white p-3 rounded-2xl my-5 inline-block shadow-xl">
            <canvas id="modal-qr-canvas" class="w-48 h-48"></canvas>
          </div>

          <p class="text-xs text-gray-400">
            Muestra este código al cajero para recargar o cobrar tus tickets ganadores sin presentar ticket de papel.
          </p>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // 1. Cobro anticipado (Cashout) con confeti
    const btnCashout = this.container.querySelector('#btn-cashout-parley');
    if (btnCashout) {
      btnCashout.addEventListener('click', () => {
        const cashoutAmount = 148.50;
        this.player.balanceUSD += cashoutAmount;

        // Actualizar UI de saldo
        const balanceUsdEl = this.container.querySelector('#player-balance-usd');
        const balanceVesEl = this.container.querySelector('#player-balance-ves');
        if (balanceUsdEl) balanceUsdEl.textContent = `$ ${this.player.balanceUSD.toFixed(2)}`;
        if (balanceVesEl) balanceVesEl.textContent = (this.player.balanceUSD * this.player.exchangeRateVES).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Actualizar contenedor del ticket
        const container = this.container.querySelector('#cashout-action-container');
        const badge = this.container.querySelector('#parley-status-badge');
        if (container) {
          container.innerHTML = `
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              ✓ COBRO EXITOSO (+$148.50 ACREDITADO)
            </span>
          `;
        }
        if (badge) {
          badge.className = 'px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
          badge.textContent = 'COBRADO ANTICIPADO';
        }

        // Efecto confeti de Emil Kowalski
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }

    // 2. Modales de Recarga
    const btnRecharge = this.container.querySelector('#btn-recharge-modal');
    const modalRecharge = this.container.querySelector('#modal-recharge');
    const btnCloseRecharge = this.container.querySelector('#btn-close-recharge');

    if (btnRecharge && modalRecharge) {
      btnRecharge.addEventListener('click', () => modalRecharge.classList.remove('hidden'));
      btnCloseRecharge.addEventListener('click', () => modalRecharge.classList.add('hidden'));
    }

    // Tabs de recarga
    const tabPm = this.container.querySelector('#tab-pagomovil');
    const tabBin = this.container.querySelector('#tab-binance');
    const tabTaq = this.container.querySelector('#tab-taquilla');
    const contentPm = this.container.querySelector('#content-pagomovil');
    const contentBin = this.container.querySelector('#content-binance');
    const contentTaq = this.container.querySelector('#content-taquilla');

    const selectTab = (activeTab, activeContent) => {
      [tabPm, tabBin, tabTaq].forEach(t => {
        t.className = 'py-2 rounded-lg text-gray-300 hover:text-white cursor-pointer';
      });
      [contentPm, contentBin, contentTaq].forEach(c => c.classList.add('hidden'));

      activeTab.className = 'py-2 rounded-lg bg-red-600 text-white shadow cursor-pointer';
      activeContent.classList.remove('hidden');
    };

    if (tabPm) tabPm.addEventListener('click', () => selectTab(tabPm, contentPm));
    if (tabBin) tabBin.addEventListener('click', () => selectTab(tabBin, contentBin));
    if (tabTaq) tabTaq.addEventListener('click', () => selectTab(tabTaq, contentTaq));

    // Confirmar recarga simulada
    const btnSubmitRecharge = this.container.querySelector('#btn-submit-recharge');
    if (btnSubmitRecharge) {
      btnSubmitRecharge.addEventListener('click', () => {
        const amountInput = this.container.querySelector('#input-recharge-amount');
        const amount = parseFloat(amountInput.value) || 25;
        this.player.balanceUSD += amount;

        const balanceUsdEl = this.container.querySelector('#player-balance-usd');
        const balanceVesEl = this.container.querySelector('#player-balance-ves');
        if (balanceUsdEl) balanceUsdEl.textContent = `$ ${this.player.balanceUSD.toFixed(2)}`;
        if (balanceVesEl) balanceVesEl.textContent = (this.player.balanceUSD * this.player.exchangeRateVES).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        modalRecharge.classList.add('hidden');
        confetti({ particleCount: 50, spread: 60 });
        alert(`¡Recarga de $${amount.toFixed(2)} USD procesada con éxito por Pago Móvil a tu tarjeta!`);
      });
    }

    // Modal QR de Identificación
    const btnShowQr = this.container.querySelector('#btn-show-card-qr');
    const modalQr = this.container.querySelector('#modal-card-qr');
    const btnCloseQr = this.container.querySelector('#btn-close-card-qr');
    const modalCanvas = this.container.querySelector('#modal-qr-canvas');

    if (btnShowQr && modalQr) {
      btnShowQr.addEventListener('click', () => {
        modalQr.classList.remove('hidden');
        if (modalCanvas) {
          QRCode.toCanvas(modalCanvas, window.location.href, { width: 190, margin: 1 });
        }
      });
      btnCloseQr.addEventListener('click', () => modalQr.classList.add('hidden'));
    }

    // Cobro express taquilla
    const btnExpress = this.container.querySelector('#btn-express-payout');
    if (btnExpress) {
      btnExpress.addEventListener('click', () => {
        alert(`Token de Cobro Express Generado: #TK-849-OK.\nPresenta este código o el QR de tu tarjeta en la taquilla del Sportbook para retirar tu saldo en efectivo.`);
      });
    }
  }
}
