import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-message">
      <div class="error-icon">⚠️</div>
      <h3>Error</h3>
      <p>{{ message }}</p>
      <button *ngIf="showRetry" (click)="onRetry.emit()" class="retry-btn">
        Reintentar
      </button>
    </div>
  `,
  styles: [`
    .error-message {
      text-align: center;
      padding: 2rem;
      background: #ffe6e6;
      border: 1px solid #ffcccc;
      border-radius: 8px;
      margin: 1rem 0;
    }
    .error-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    h3 {
      color: #d32f2f;
      margin: 0 0 0.5rem 0;
    }
    p {
      color: #666;
      margin: 0 0 1rem 0;
    }
    .retry-btn {
      background: #d32f2f;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .retry-btn:hover {
      background: #b71c1c;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string = 'Ocurrió un error al cargar los datos.';
  @Input() showRetry: boolean = false;
  @Output() onRetry = new EventEmitter<void>();
}
