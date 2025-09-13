import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <h1>PokéAPI Explorer</h1>
      <p class="subtitle">Explora todos los endpoints de la PokéAPI</p>

      <div class="grid">
        <div class="card" routerLink="/pokemon">
          <h3>Pokémon</h3>
          <p>Explora todos los Pokémon</p>
        </div>

        <div class="card" routerLink="/types">
          <h3>Tipos</h3>
          <p>Tipos de Pokémon y sus relaciones</p>
        </div>

        <div class="card" routerLink="/abilities">
          <h3>Habilidades</h3>
          <p>Habilidades de Pokémon</p>
        </div>

        <div class="card" routerLink="/moves">
          <h3>Movimientos</h3>
          <p>Movimientos y sus efectos</p>
        </div>

        <div class="card" routerLink="/items">
          <h3>Items</h3>
          <p>Items del mundo Pokémon</p>
        </div>

        <div class="card" routerLink="/generations">
          <h3>Generaciones</h3>
          <p>Generaciones de juegos</p>
        </div>

        <div class="card" routerLink="/locations">
          <h3>Ubicaciones</h3>
          <p>Lugares del mundo Pokémon</p>
        </div>

        <div class="card" routerLink="/evolutions">
          <h3>Evoluciones</h3>
          <p>Cadenas evolutivas</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 3rem;
      font-size: 1.2rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
    .card h3 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .card p {
      color: #666;
      margin: 0;
    }
  `]
})
export class DashboardComponent {}
