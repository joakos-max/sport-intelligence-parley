import { SPORTS_DATA } from '../data/sportsData.js';

export class LandingPage {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="landing-page-wrapper w-full">
        
        <!-- ================= HERO SECTION ================= -->
        <section class="relative pt-8 pb-20 overflow-hidden border-b border-white/10">
          <!-- Fondo con gradiente y efecto stadium glow -->
          <div class="absolute inset-0 bg-gradient-to-b from-[#141926] via-[#0A0D14] to-[#0A0D14] -z-10"></div>
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/15 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            
            <!-- Badge superior -->
            <div class="flex justify-center mb-6">
              <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span class="text-xs font-bold text-gray-200 tracking-wider uppercase">
                  TECNOLOGÍA DE TARJETAS INTELIGENTES • SALA DE APUESTAS & MÓVIL
                </span>
              </div>
            </div>

            <!-- Título Principal y Logo -->
            <div class="text-center max-w-4xl mx-auto space-y-6">
              <div class="inline-block p-3 bg-white rounded-2xl shadow-2xl mb-2">
                <img src="/logo.jpg" alt="Sport Intelligence" class="h-14 sm:h-20 object-contain mx-auto" />
              </div>

              <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none">
                La Nueva Era del Parley & Hipismo en <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Venezuela</span>
              </h1>

              <p class="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Olvídate de los tickets de papel perdidos. Con tu <strong>Tarjeta Sport Intelligence</strong> disfrutas de recargas instantáneas por Pago Móvil, consultas tu saldo con el código QR y cobras tus ganancias en taquilla sin esperas.
              </p>

              <!-- Botones Call to Action -->
              <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a href="#card" class="px-7 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-red-600/30 flex items-center gap-2 cursor-pointer">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span>Ver Muestra de la Tarjeta Física</span>
                </a>

                <a href="#player" class="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-sm tracking-wider transition-all duration-200 border border-white/20 flex items-center gap-2 cursor-pointer">
                  <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span>Probar Experiencia del QR</span>
                </a>
              </div>
            </div>

            <!-- Ticker de deportes en vivo -->
            <div class="mt-14 pt-8 border-t border-white/10">
              <div class="text-xs uppercase font-mono text-gray-400 mb-3 text-center tracking-widest font-semibold">
                ● Cuotas & Carreras Destacadas de Hoy
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                <!-- Card 1: Hipismo La Rinconada -->
                <div class="bg-black/40 border border-white/10 rounded-xl p-3.5">
                  <div class="flex items-center justify-between text-[11px] text-amber-400 font-bold mb-1">
                    <span>🏇 LA RINCONADA</span>
                    <span class="text-white font-mono">C5 • 5y6</span>
                  </div>
                  <h4 class="text-xs font-bold text-white">#4 Gran Trueno (J. Lugo)</h4>
                  <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px]">
                    <span class="text-gray-400">Cuota Ganador</span>
                    <span class="font-mono font-bold text-emerald-400">2.40</span>
                  </div>
                </div>

                <!-- Card 2: Béisbol LVBP -->
                <div class="bg-black/40 border border-white/10 rounded-xl p-3.5">
                  <div class="flex items-center justify-between text-[11px] text-blue-400 font-bold mb-1">
                    <span>⚾ LVBP VENEZUELA</span>
                    <span class="text-red-400 font-mono animate-pulse">HOY 7PM</span>
                  </div>
                  <h4 class="text-xs font-bold text-white">Leones vs Magallanes</h4>
                  <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px]">
                    <span class="text-gray-400">Moneyline</span>
                    <span class="font-mono font-bold text-emerald-400">1.82 - 2.05</span>
                  </div>
                </div>

                <!-- Card 3: Fútbol Champions -->
                <div class="bg-black/40 border border-white/10 rounded-xl p-3.5">
                  <div class="flex items-center justify-between text-[11px] text-emerald-400 font-bold mb-1">
                    <span>⚽ CHAMPIONS LEAGUE</span>
                    <span class="text-gray-400 font-mono">03:00 PM</span>
                  </div>
                  <h4 class="text-xs font-bold text-white">Real Madrid vs Man City</h4>
                  <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px]">
                    <span class="text-gray-400">Ambos Marcan</span>
                    <span class="font-mono font-bold text-emerald-400">1.60</span>
                  </div>
                </div>

                <!-- Card 4: Baloncesto NBA -->
                <div class="bg-black/40 border border-white/10 rounded-xl p-3.5">
                  <div class="flex items-center justify-between text-[11px] text-purple-400 font-bold mb-1">
                    <span>🏀 BALONCESTO NBA</span>
                    <span class="text-gray-400 font-mono">08:30 PM</span>
                  </div>
                  <h4 class="text-xs font-bold text-white">Celtics vs Lakers</h4>
                  <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px]">
                    <span class="text-gray-400">Hándicap</span>
                    <span class="font-mono font-bold text-emerald-400">BOS -7.5</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>


        <!-- ================= BENEFICIOS DE LA TARJETA PARA LA EMPRESA ================= -->
        <section class="py-16 border-b border-white/10 bg-[#0E121B]">
          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-3xl mx-auto mb-12">
              <span class="text-xs font-mono font-bold text-red-500 uppercase tracking-widest block mb-1">
                SOLUCIÓN INTEGRAL PARA SALAS & SPORTBOOKS
              </span>
              <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">
                ¿Por Qué Implementar Tarjetas Inteligentes en tu Local?
              </h2>
              <p class="text-sm text-gray-400 mt-3">
                Un sistema pensado para modernizar las agencias de apuestas en Venezuela, fidelizar a los apostadores y reducir los costos operativos.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <!-- Beneficio 1 -->
              <div class="bg-black/30 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
                <div class="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center mb-5 text-xl font-bold border border-red-500/30">
                  📱
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Cero Papeles, Todo al QR</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  El cliente escanea el QR de su tarjeta con cualquier teléfono inteligente y ve de inmediato su saldo, sus jugadas activas del parley y su cuadro del 5y6 sellado.
                </p>
              </div>

              <!-- Beneficio 2 -->
              <div class="bg-black/30 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
                <div class="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center mb-5 text-xl font-bold border border-amber-500/30">
                  ⚡
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Recargas Venezolanas al Instante</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Soporte directo para Pago Móvil (Banco de Venezuela, Banesco, Mercantil con C2P), USDT Binance Pay y efectivo directo en la caja del Sportbook.
                </p>
              </div>

              <!-- Beneficio 3 -->
              <div class="bg-black/30 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/40 transition-all duration-300">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-5 text-xl font-bold border border-emerald-500/30">
                  💰
                </div>
                <h3 class="text-lg font-bold text-white mb-2">Cobro Express en Taquilla</h3>
                <p class="text-xs text-gray-400 leading-relaxed">
                  Menos colas en el local: el apostador genera un token digital seguro desde su tarjeta y el cajero liquida el premio en segundos escaneando el código de barra.
                </p>
              </div>

            </div>
          </div>
        </section>


        <!-- ================= LOS DEPORTES FAVORITOS EN VENEZUELA ================= -->
        <section class="py-16 border-b border-white/10">
          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="text-center max-w-2xl mx-auto mb-12">
              <span class="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
                COBERTURA TOTAL
              </span>
              <h2 class="text-2xl sm:text-4xl font-black text-white uppercase">
                Los Deportes que Mueven a Venezuela
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <!-- Deporte 1: Hipismo -->
              <div class="bg-gradient-to-b from-[#161B26] to-[#0D1017] border border-white/10 rounded-2xl p-5 hover:border-amber-500/40 transition-all">
                <span class="text-3xl mb-3 block">🏇</span>
                <h3 class="font-bold text-white text-base">Hipismo & 5 y 6</h3>
                <p class="text-xs text-gray-400 mt-2 leading-relaxed">
                  Reuniones oficiales del Hipódromo La Rinconada, Valencia y pistas internacionales: Gulfstream Park, Belmont y Saratoga con dividendos oficiales.
                </p>
              </div>

              <!-- Deporte 2: Béisbol -->
              <div class="bg-gradient-to-b from-[#161B26] to-[#0D1017] border border-white/10 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
                <span class="text-3xl mb-3 block">⚾</span>
                <h3 class="font-bold text-white text-base">Béisbol LVBP & MLB</h3>
                <p class="text-xs text-gray-400 mt-2 leading-relaxed">
                  La pasión criolla: Leones, Magallanes, Tiburones, Cardenales y las Grandes Ligas con moneyline, runlines y combinadas especiales de pitcheo.
                </p>
              </div>

              <!-- Deporte 3: Baloncesto -->
              <div class="bg-gradient-to-b from-[#161B26] to-[#0D1017] border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 transition-all">
                <span class="text-3xl mb-3 block">🏀</span>
                <h3 class="font-bold text-white text-base">Baloncesto NBA & SPB</h3>
                <p class="text-xs text-gray-400 mt-2 leading-relaxed">
                  Todos los cuartos de la NBA y la Superliga Profesional de Baloncesto venezolana: hándicaps, totales de puntos y actuaciones individuales.
                </p>
              </div>

              <!-- Deporte 4: Fútbol -->
              <div class="bg-gradient-to-b from-[#161B26] to-[#0D1017] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/40 transition-all">
                <span class="text-3xl mb-3 block">⚽</span>
                <h3 class="font-bold text-white text-base">Fútbol Mundial & Vinotinto</h3>
                <p class="text-xs text-gray-400 mt-2 leading-relaxed">
                  Champions League, Eliminatorias Sudamericanas, Copa Libertadores y Liga FUTVE con mercados de altas, tarjetas, tiros de esquina y goles.
                </p>
              </div>

            </div>
          </div>
        </section>


        <!-- ================= NUESTRO LOCAL & SPORTBOOK ================= -->
        <section class="py-16 bg-[#0B0E14] border-b border-white/10">
          <div class="max-w-6xl mx-auto px-4 sm:px-6">
            <div class="bg-gradient-to-r from-red-950/40 via-[#141824] to-black/60 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div class="space-y-4 max-w-xl">
                <span class="px-3 py-1 rounded-full text-xs font-bold bg-red-600/20 text-red-400 border border-red-500/30 uppercase font-mono">
                  SALA PRINCIPAL & LOUNGE VIP
                </span>
                <h2 class="text-2xl sm:text-3xl font-black text-white uppercase">
                  Vive el Deporte en un Ambiente Exclusivo
                </h2>
                <p class="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Equipado con más de 20 pantallas 4K simultáneas, sonido envolvente de estadio, barra de coctelería y atención personalizada para tarjetahabientes VIP.
                </p>
                <div class="grid grid-cols-2 gap-4 pt-2 text-xs text-gray-300 font-medium">
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-400">✓</span> Taquillas de recarga express
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-400">✓</span> Wi-Fi de alta velocidad para escaneo QR
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-400">✓</span> Estacionamiento vigilado
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-400">✓</span> Seguridad garantizada
                  </div>
                </div>
              </div>

              <!-- Tarjeta de contacto / WhatsApp -->
              <div class="w-full lg:w-80 bg-black/60 border border-white/15 rounded-2xl p-6 text-center space-y-4">
                <div class="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-xl">
                  💬
                </div>
                <h4 class="font-bold text-white text-base">Atención al Cliente</h4>
                <p class="text-xs text-gray-400">¿Deseas activar tu tarjeta o afiliar tu sala de apuestas?</p>
                <a href="https://wa.me/584147768899" target="_blank" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all block cursor-pointer">
                  Contactar por WhatsApp
                </a>
              </div>

            </div>
          </div>
        </section>


        <!-- ================= FOOTER CORPORATIVO ================= -->
        <footer class="py-10 bg-[#06080C] text-xs text-gray-400">
          <div class="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div class="flex items-center gap-3">
              <div class="h-8 bg-white rounded p-1">
                <img src="/logo.jpg" alt="Logo" class="h-full object-contain" />
              </div>
              <span class="font-bold text-white text-sm">SPORT INTELLIGENCE C.A.</span>
            </div>

            <div class="flex items-center gap-6">
              <span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-red-400">
                +18 JUEGO RESPONSABLE
              </span>
              <span>Caracas, Venezuela</span>
            </div>
          </div>

          <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
            <p>© 2026 Sport Intelligence C.A. Todos los derechos reservados. RIF J-50291844-0.</p>
            <div class="flex items-center gap-4">
              <span>Pago Móvil BDV / Banesco</span>
              <span>•</span>
              <span>Binance Pay USDT</span>
              <span>•</span>
              <span>Taquilla Express</span>
            </div>
          </div>
        </footer>

      </div>
    `;
  }
}
