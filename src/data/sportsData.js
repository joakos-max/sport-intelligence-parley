// Datos de deportes adaptados a Venezuela: Hipismo (La Rinconada, carreras 5y6), Béisbol (LVBP y MLB), Fútbol y Baloncesto

export const SPORTS_DATA = {
  // Carreras de caballos - Hipódromo La Rinconada & Internacional
  horses: {
    venue: "Hipódromo La Rinconada (Caracas)",
    date: "Domingo de Carreras - Reunión Oficial",
    pool5y6: "$ 120,000 USD Estimado al Cuadro Único",
    races: [
      {
        id: "R1",
        raceNumber: "1ª Válida del 5 y 6 (Carrera 5)",
        distance: "1,200 metros",
        postTime: "02:15 PM",
        favorite: "Gran Trueno #4 (J. Lugo)",
        odds: "2.40",
        contenders: [
          { number: 4, name: "Gran Trueno", jockey: "J. Lugo", weight: "54 kg", odds: "2.40", isAiPick: true, confidence: "92%" },
          { number: 7, name: "Catire Pedro", jockey: "H. Medina", weight: "53 kg", odds: "3.50", isAiPick: false },
          { number: 2, name: "The King Zeus", jockey: "R. Capriles", weight: "55 kg", odds: "4.80", isAiPick: false },
          { number: 9, name: "Don Fello", jockey: "J. Aranguren", weight: "52 kg", odds: "7.00", isAiPick: false }
        ]
      },
      {
        id: "R2",
        raceNumber: "3ª Válida del 5 y 6 (Carrera 7) - Clásico Especial",
        distance: "1,600 metros",
        postTime: "03:25 PM",
        favorite: "Miss Barinitas #2 (F. Quevedo)",
        odds: "1.95",
        contenders: [
          { number: 2, name: "Miss Barinitas", jockey: "F. Quevedo", weight: "53 kg", odds: "1.95", isAiPick: true, confidence: "95%" },
          { number: 5, name: "Queen Tita", jockey: "J. Herrera", weight: "54 kg", odds: "3.80", isAiPick: false },
          { number: 8, name: "Princesa Manuela", jockey: "Y. Rodríguez", weight: "52 kg", odds: "6.20", isAiPick: false }
        ]
      }
    ],
    international: [
      {
        venue: "Gulfstream Park (Florida)",
        race: "Race 8 - Allowance Optional Claiming",
        distance: "1,400 m",
        favorite: "Speeding Bullet (I. Ortiz Jr.)",
        odds: "2.10",
        aiPrediction: "Fijo Internacional de la tarde"
      }
    ]
  },

  // Béisbol LVBP & MLB
  baseball: [
    {
      id: "bb-1",
      league: "LVBP (Liga Venezolana de Béisbol Profesional)",
      match: "Leones del Caracas vs Navegantes del Magallanes",
      stadium: "Estadio Monumental Simón Bolívar (Caracas)",
      time: "Hoy 07:00 PM",
      status: "PRÓXIMO",
      pitchers: "J. Chacín (LEO) vs E. Leal (MAG)",
      odds: {
        moneyline: { home: "1.82", away: "2.05" },
        runline: { home: "-1.5 (+145)", away: "+1.5 (-165)" },
        total: { over: "9.5 (1.90)", under: "9.5 (1.90)" }
      },
      aiInsight: "Leones batea para .295 ante abridores diestros en el Monumental."
    },
    {
      id: "bb-2",
      league: "LVBP",
      match: "Tiburones de La Guaira vs Cardenales de Lara",
      stadium: "Estadio Universitario",
      time: "Hoy 07:30 PM",
      status: "PRÓXIMO",
      pitchers: "R. Pinto (GUA) vs M. Pérez (LAR)",
      odds: {
        moneyline: { home: "1.90", away: "1.90" },
        runline: { home: "-1.5 (+150)", away: "+1.5 (-170)" },
        total: { over: "8.5 (1.85)", under: "8.5 (1.95)" }
      },
      aiInsight: "Tiburones acumula 5 victorias al hilo con promedio de 6.2 carreras."
    },
    {
      id: "bb-3",
      league: "MLB (Grandes Ligas)",
      match: "New York Yankees vs Boston Red Sox",
      stadium: "Yankee Stadium",
      time: "Hoy 07:05 PM",
      status: "EN VIVO - Alta 6ª",
      score: "NYY 4 - 2 BOS",
      odds: {
        moneyline: { home: "1.45", away: "2.80" },
        runline: { home: "-1.5 (1.75)", away: "+1.5 (2.10)" }
      },
      aiInsight: "Probabilidad de victoria de Yankees: 84%."
    }
  ],

  // Fútbol (Champions, Vinotinto, LaLiga)
  soccer: [
    {
      id: "sc-1",
      league: "UEFA Champions League",
      match: "Real Madrid vs Manchester City",
      stadium: "Santiago Bernabéu",
      time: "Miércoles 03:00 PM",
      odds: {
        home: "2.55",
        draw: "3.50",
        away: "2.65",
        bothScore: "1.60",
        over25: "1.68"
      },
      aiInsight: "Sport Intelligence predice más de 2.5 goles (78% de probabilidad)."
    },
    {
      id: "sc-2",
      league: "Eliminatorias Conmebol - La Vinotinto",
      match: "Venezuela vs Brasil",
      stadium: "Estadio Monumental de Maturín",
      time: "Próxima Fecha FIFA",
      odds: {
        home: "4.80",
        draw: "3.60",
        away: "1.70",
        doubleChance: "Venezuela o Empate (2.15)"
      },
      aiInsight: "Maturín invicto: Venezuela no ha recibido goles en sus últimos 4 partidos como local."
    }
  ],

  // Baloncesto NBA & SPB
  basketball: [
    {
      id: "bk-1",
      league: "NBA",
      match: "Boston Celtics vs Los Angeles Lakers",
      stadium: "TD Garden",
      time: "Hoy 08:30 PM",
      odds: {
        home: "1.40",
        away: "3.10",
        spread: "Celtics -7.5",
        total: "224.5 Pts"
      },
      aiInsight: "Celtics cubren la línea en 8 de sus últimos 10 juegos en casa."
    },
    {
      id: "bk-2",
      league: "SPB (Superliga Profesional de Baloncesto de Venezuela)",
      match: "Gladiadores de Anzoátegui vs Trotamundos de Carabobo",
      stadium: "Gimnasio Luis Ramos",
      time: "Mañana 06:30 PM",
      odds: {
        home: "1.65",
        away: "2.25",
        spread: "-3.5"
      },
      aiInsight: "Gladiadores lideran la liga en triples convertidos por posesión."
    }
  ]
};

// Datos del jugador / tarjetahabiente simulado
export const MOCK_PLAYER_CARD = {
  cardNumber: "SI-2026-8849-VE",
  barcode: "8849202600129",
  cardholder: "CARLOS E. MENDOZA",
  pin: "849",
  tier: "ORO VIP",
  tierColor: "from-amber-400 to-yellow-600",
  balanceUSD: 245.50,
  exchangeRateVES: 40.00, // Tasa BCV referencial
  get balanceVES() {
    return this.balanceUSD * this.exchangeRateVES;
  },
  joinedDate: "Nov 2026",
  issuedLocation: "Sport Intelligence Lounge - Sede Principal",
  
  // Tickets activos asociados a la tarjeta
  activeTickets: [
    {
      ticketId: "TK-PA-99214",
      type: "PARLEY COMBINADA 4 LOGROS",
      date: "Hoy 04:30 PM",
      amountBet: 20.00,
      potentialWin: 196.80,
      cashoutAvailable: true,
      cashoutAmount: 148.50,
      status: "EN JUEGO (3/4 Acertados)",
      legs: [
        { sport: "⚾ LVBP", pick: "Leones del Caracas a Ganar (1.82)", result: "WON", label: "Acertado" },
        { sport: "⚾ MLB", pick: "NY Yankees -1.5 Runline (1.75)", result: "WON", label: "Acertado" },
        { sport: "⚽ Champions", pick: "Real Madrid a Ganar (1.60)", result: "WON", label: "Acertado" },
        { sport: "🏀 NBA", pick: "Boston Celtics Over 220.5 Pts (1.90)", result: "LIVE", label: "En Vivo (4Q 03:12)" }
      ]
    },
    {
      ticketId: "TK-HP-40815",
      type: "CUADRO 5 Y 6 NACIONAL",
      date: "Domingo de La Rinconada",
      amountBet: 5.00,
      potentialWin: 120000.00,
      status: "SELLADO Y VALIDADO",
      legs: [
        { sport: "🏇 1ª Válida", pick: "Gran Trueno #4 (Fijo Sport Intelligence)", result: "PENDING", label: "Carrera 5" },
        { sport: "🏇 2ª Válida", pick: "Catire Pedro #7", result: "PENDING", label: "Carrera 6" },
        { sport: "🏇 3ª Válida", pick: "Miss Barinitas #2 (Línea Nacional)", result: "PENDING", label: "Carrera 7" },
        { sport: "🏇 4ª Válida", pick: "Don Fello #9", result: "PENDING", label: "Carrera 8" },
        { sport: "🏇 5ª Válida", pick: "Señora Florencia #1", result: "PENDING", label: "Carrera 9" },
        { sport: "🏇 6ª Válida", pick: "El Gran Sol #5", result: "PENDING", label: "Carrera 10" }
      ]
    }
  ],

  // Historial reciente de transacciones
  transactions: [
    { id: "TX-1092", type: "RECARGA PAGO MÓVIL", amount: "+$50.00", date: "Ayer 05:14 PM", status: "APROBADO", bank: "Banesco C2P" },
    { id: "TX-1088", type: "PREMIO PARLEY COBRADO", amount: "+$124.00", date: "11 Nov 09:30 PM", status: "COBRADO", bank: "Taquilla Express" },
    { id: "TX-1081", type: "JUGADA PARLEY 4 LOGROS", amount: "-$20.00", date: "Hoy 04:30 PM", status: "DEBITADO", bank: "Saldo Tarjeta" }
  ]
};

// Datos para recargas venezolanas
export const VENEZUELA_PAYMENT_INFO = {
  pagoMovil: {
    bank: "Banco de Venezuela (0102)",
    altBank: "Banesco Banco Universal (0134)",
    phone: "0414-776.88.99",
    rif: "J-50291844-0",
    name: "SPORT INTELLIGENCE C.A.",
    c2pSupported: true
  },
  binancePay: {
    payId: "891240192",
    crypto: "USDT (Red TRC20 / BEP20)",
    email: "pagos@sportintelligence.bet"
  },
  taquilla: {
    address: "Sportbook & Lounge Sport Intelligence, Nivel Mezzanina, Centro Comercial Las Mercedes, Caracas",
    hours: "Lunes a Domingo: 10:00 AM a 11:30 PM",
    cashAccepted: "Efectivo USD ($) y Bolívares en efectivo / Punto de Venta"
  }
};
