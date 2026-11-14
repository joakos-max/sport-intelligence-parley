# 🏆 Sport Intelligence - La Nueva Era del Parley en Venezuela

> Landing page corporativa de alto impacto para salas de apuestas deportivas y sportbooks en Venezuela. Presenta el sistema de gestión y acceso mediante tarjetas con código QR, recargas en Bolívares por Pago Móvil / Binance Pay, calculadora interactiva de parleys en tiempo real y especificaciones técnicas para el local.

![Sport Intelligence Logo](/public/logo.jpg)

---

## 📌 Características Principales

1. **Diseño Visual de Alta Fidelidad**:
   - Paleta deportiva Obsidian Dark (`#080B10`) con acentos rojo corporativo (`#E10600`) y dorado (`#F59E0B`).
   - Tipografía atlética `Oswald` y `Plus Jakarta Sans`.
   - Logotipo oficial de **Sport Intelligence** optimizado para visualización web.
   - Titular principal: **"La Nueva Era del Parley en Venezuela"**.

2. **Mercados & Cuotas en Vivo**:
   - ⚾ **Béisbol Criollo (LVBP)**: Leones del Caracas vs Navegantes del Magallanes (Monumental), Tiburones de La Guaira vs Cardenales de Lara.
   - 🧢 **Grandes Ligas (MLB)**: New York Yankees vs Boston Red Sox.
   - ⚽ **UEFA Champions League**: Real Madrid vs Manchester City (1X2, Ambos Marcan, +2.5 Goles).
   - 🏀 **Baloncesto NBA**: Boston Celtics vs Los Angeles Lakers.
   - 🇻🇪 **Eliminatorias Conmebol**: Venezuela vs Brasil en el Monumental de Maturín.

3. **Calculadora & Simulador de Parley en Tiempo Real**:
   - Al hacer clic en cualquier cuota de los partidos, se suma dinámicamente a la boleta.
   - Calcula la cuota multiplicada combinada al instante.
   - Permite ingresar el monto a jugar en dólares y calcula la ganancia en **USD** y su equivalente en **Bolívares (VES)** a la tasa oficial.

4. **Especificaciones del Sistema de Tarjetas con Código QR**:
   - Explica el funcionamiento del sistema para el local comercial:
     * *Acceso móvil sin descargas*: El cliente apunta la cámara al QR de la tarjeta y abre la plataforma.
     * *Cero pérdida de tickets*: Registro digital de todas las combinadas.
     * *Cobro express en taquilla*: Retiro en caja mediante validación de token QR.
     * *Recargas 24/7*: Soporte nativo para Pago Móvil (BDV, Banesco, Mercantil C2P) y Binance Pay (USDT).
   - **Generador de Código QR en Vivo**: Renderizado directo con la librería `qrcode` sobre `<canvas>`, con input para personalizar la URL de destino y botón para **descargar la imagen PNG en alta resolución para la imprenta**.

5. **Sport Intelligence AI Tech & Lounge VIP**:
   - Presentación del motor algorítmico de análisis estadístico de pitcheo y cuotas con valor.
   - Especificaciones de la sala VIP y atención directa por WhatsApp.

---

## 🚀 Despliegue en GitHub y Vercel

### Paso 1: Subir a GitHub
```bash
git add .
git commit -m "feat: landing page La Nueva Era del Parley en Venezuela with interactive odds, parley calculator and dynamic QR generator"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sport-intelligence-venezuela.git
git push -u origin main
```

### Paso 2: Desplegar en Vercel
1. Ingresa a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Selecciona **"Add New Project"** e importa el repositorio.
3. Vercel detectará el framework automáticamente (**Vite**).
4. Haz clic en **Deploy**.
5. ¡Listo! Vercel te entregará la URL pública (ejemplo: `https://sport-intelligence-venezuela.vercel.app`).
6. En la sección **"Sistema de Acceso con Código QR"** de la página, coloca tu URL pública en el campo de texto y el código QR se actualizará automáticamente para que cualquier teléfono que lo escanee ingrese a tu sitio en vivo.

---

## 🛠️ Tecnologías

- **Vite 6** & **Node.js**
- **Tailwind CSS v4**
- **QRCode.js** (generación cliente en canvas y descarga PNG)
- **Google Fonts** (Oswald, Plus Jakarta Sans, JetBrains Mono)
