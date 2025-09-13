import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-spinner-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p class="loading-text">Cargando...</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      min-height: 200px;
    }

    .loading-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .loading-text {
      color: #666;
      font-size: 1rem;
      margin: 0;
      font-weight: 500;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    /* Variantes de color para diferentes secciones */
    :host-context(.pokemon-section) .spinner {
      border-top-color: #ff6b6b;
    }

    :host-context(.type-section) .spinner {
      border-top-color: #78C850;
    }

    :host-context(.ability-section) .spinner {
      border-top-color: #3498db;
    }

    :host-context(.move-section) .spinner {
      border-top-color: #9b59b6;
    }

    :host-context(.item-section) .spinner {
      border-top-color: #e67e22;
    }

    :host-context(.generation-section) .spinner {
      border-top-color: #27ae60;
    }

    :host-context(.location-section) .spinner {
      border-top-color: #8e44ad;
    }

    :host-context(.evolution-section) .spinner {
      border-top-color: #e74c3c;
    }
  `]
})
export class LoadingSpinnerComponent {}
