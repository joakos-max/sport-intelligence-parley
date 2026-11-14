import { Navigation } from './components/navigation.js';
import { CardShowcaseView } from './components/cardShowcaseView.js';
import { PlayerPortal } from './components/playerPortal.js';
import { LandingPage } from './components/landingPage.js';

class App {
  constructor() {
    this.navContainer = document.getElementById('nav-container');
    this.appRoot = document.getElementById('app-root');
    this.navigation = null;
    this.currentView = this.getViewFromHash() || 'card';

    this.init();
  }

  getViewFromHash() {
    const hash = window.location.hash.replace('#', '').trim();
    if (['card', 'player', 'landing'].includes(hash)) {
      return hash;
    }
    return null;
  }

  init() {
    // 1. Inicializar barra de navegación
    this.navigation = new Navigation('nav-container', {
      initialView: this.currentView,
      onViewChange: (view) => this.switchView(view),
      onScanSimulator: () => this.switchView('player')
    });

    // 2. Renderizar vista inicial
    this.renderCurrentView();

    // 3. Escuchar cambios en la URL (por si escanean el QR desde su celular)
    window.addEventListener('hashchange', () => {
      const newView = this.getViewFromHash() || 'card';
      if (newView !== this.currentView) {
        this.currentView = newView;
        this.navigation.setView(newView);
        this.renderCurrentView();
      }
    });
  }

  switchView(viewName) {
    if (this.currentView === viewName) return;
    this.currentView = viewName;
    window.location.hash = '#' + viewName;
    this.renderCurrentView();
  }

  renderCurrentView() {
    this.appRoot.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (this.currentView) {
      case 'player':
        new PlayerPortal('app-root', {
          onNavigate: (view) => {
            this.navigation.setView(view);
            this.switchView(view);
          }
        });
        break;

      case 'landing':
        new LandingPage('app-root', {
          onNavigate: (view) => {
            this.navigation.setView(view);
            this.switchView(view);
          }
        });
        break;

      case 'card':
      default:
        new CardShowcaseView('app-root', {
          onNavigate: (view) => {
            this.navigation.setView(view);
            this.switchView(view);
          }
        });
        break;
    }
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
