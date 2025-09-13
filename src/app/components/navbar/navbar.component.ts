import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <a routerLink="/" class="nav-logo">
          <h1>PokéAPI Explorer</h1>
        </a>
        <ul class="nav-menu">
          <li class="nav-item">
            <a routerLink="/pokemon" routerLinkActive="active" class="nav-link">
              Pokémon
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/types" routerLinkActive="active" class="nav-link">
              Tipos
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/abilities" routerLinkActive="active" class="nav-link">
              Habilidades
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/moves" routerLinkActive="active" class="nav-link">
              Movimientos
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/items" routerLinkActive="active" class="nav-link">
              Items
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/generations" routerLinkActive="active" class="nav-link">
              Generaciones
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/locations" routerLinkActive="active" class="nav-link">
              Ubicaciones
            </a>
          </li>
          <li class="nav-item">
            <a routerLink="/evolutions" routerLinkActive="active" class="nav-link">
              Evoluciones
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
    }
    .nav-logo {
      color: white;
      text-decoration: none;
    }
    .nav-logo h1 {
      margin: 0;
      font-size: 1.8rem;
    }
    .nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      transition: background-color 0.3s;
      font-size: 0.9rem;
    }
    .nav-link:hover, .nav-link.active {
      background-color: rgba(255, 255, 255, 0.2);
    }
    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
        gap: 1rem;
      }
      .nav-menu {
        justify-content: center;
      }
    }
  `]
})
export class NavbarComponent {}
