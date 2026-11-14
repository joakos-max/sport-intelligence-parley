# 🏆 Sport Intelligence - Plataforma de Parley, Hipismo & Tarjetas Inteligentes QR

> Sistema integral para salas de apuestas deportivas y sportbooks en Venezuela. Incluye muestra 3D interactiva de tarjetas físicas de PVC con código QR dinámico, especificaciones industriales para imprenta (estándar CR-80 con marcas de corte), portal web móvil para jugadores y landing page comercial.

![Sport Intelligence Logo](/public/logo.jpg)

---

## 📌 Resumen del Proyecto

Este desarrollo fue creado para resolver la necesidad operativa de la empresa de apuestas **Sport Intelligence** en Venezuela (carreras de caballos La Rinconada / 5 y 6 nacional, béisbol LVBP y MLB, básquetbol NBA y fútbol internacional):

1. **Muestra y Prototipo de Impresión de Tarjetas Físicas**:
   - Visualizador 3D realista con giro 360°, efecto holográfico especular y texturas en PVC (Obsidian VIP, Sport Red y Titanium).
   - Datos personalizados: nombre del titular, serial único, chip EMV dorado simulado, símbolo contactless NFC, banda magnética y código de barras.
   - **Hoja de Impresión Industrial CR-80**: Guías de corte (crop marks) y sangría de 3mm (bleed) lista para imprimir en tamaño real o exportar a PDF para máquinas de sublimación o tarjetas PVC (Fargo, Zebra, Evolis).

2. **Código QR Dinámico y Funcional**:
   - Generación en tiempo real del código QR mediante `qrcode` sobre canvas/vectorial.
   - Detecta automáticamente el dominio de despliegue o permite personalizar el enlace hacia Vercel (`https://...#player`).
   - Escaneable directamente con la cámara de cualquier teléfono celular.

3. **Portal Móvil del Jugador (Lo que abre el QR)**:
   - **Billetera Digital**: Consulta de saldo en Dólares ($245.50 USD) y su equivalencia en Bolívares (VES) a tasa oficial.
   - **Recargas Adaptadas a Venezuela**: Pago Móvil inmediato (Banco de Venezuela 0102, Banesco 0134 con C2P), USDT Binance Pay y recarga en efectivo en taquilla.
   - **Gestión de Jugadas & Cashout en Vivo**: Visualización de parleys combinados de 4 logros (LVBP, MLB, Champions, NBA) con botón de cobro anticipado interactivo, y cuadro sellado del 5 y 6 hípico nacional de La Rinconada.
   - **Sport Intelligence AI**: Motor de análisis con recomendaciones y fijos deportivos con porcentajes de probabilidad.
   - **Cobro Express**: Token QR seguro para retirar ganancias en taquilla sin esperar boletos de papel.

4. **Landing Page Corporativa**:
   - Hero dinámico con el logotipo oficial.
   - Ticker de cuotas y carreras destacadas en vivo.
   - Sección de cobertura deportiva venezolana e internacional.
   - Presentación de las ventajas de las tarjetas inteligentes para las salas de juego.
   - Ubicación y contacto directo por WhatsApp.

---

## 🚀 Despliegue en Vercel y GitHub

### Paso 1: Subir a GitHub
```bash
git init
git add .
git commit -m "feat: Sport Intelligence platform, 3D smart card showcase, dynamic QR and player portal"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sport-intelligence.git
git push -u origin main
```

### Paso 2: Desplegar en Vercel
1. Ingresa a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Selecciona **"Add New Project"** e importa el repositorio `sport-intelligence`.
3. Vercel detectará la configuración automáticamente (`Framework Preset: Vite`).
4. Haz clic en **Deploy**.
5. ¡Listo! Vercel te entregará una URL pública (ejemplo: `https://sport-intelligence-venezuela.vercel.app`).
6. En la pestaña de la tarjeta, ingresa esa URL con la terminación `#player` en el campo del QR para que las tarjetas impresas lleven a todos los clientes a la web en vivo.

---

## 🛠️ Tecnologías Utilizadas

- **Vite 6** & **Node.js**
- **Tailwind CSS v4** con soporte para componentes modernos y responsivos
- **QRCode.js** para renderizado dinámico de códigos QR en alta resolución
- **Canvas-Confetti** para microinteracciones de cobro y recarga
- **Google Fonts**: Oswald (titulares de impacto deportivo) y Plus Jakarta Sans
