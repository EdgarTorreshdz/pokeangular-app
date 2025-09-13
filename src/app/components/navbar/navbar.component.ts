import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobileMenuOpen = false;

  // Items del menú con iconos y tooltips
  navItems = [
    { route: '/pokemon', icon: '🐾', text: 'Pokémon', title: 'Explorar Pokémon' },
    { route: '/types', icon: '⚡', text: 'Tipos', title: 'Tipos Pokémon' },
    { route: '/abilities', icon: '🌟', text: 'Habilidades', title: 'Habilidades Pokémon' },
    { route: '/moves', icon: '🎯', text: 'Movimientos', title: 'Movimientos Pokémon' },
    { route: '/items', icon: '🎒', text: 'Items', title: 'Items Pokémon' },
    { route: '/generations', icon: '🔄', text: 'Generaciones', title: 'Generaciones de juegos' },
    { route: '/locations', icon: '🗺️', text: 'Ubicaciones', title: 'Ubicaciones Pokémon' },
    { route: '/evolutions', icon: '📈', text: 'Evoluciones', title: 'Cadenas evolutivas' }
  ];

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  // Cerrar menú móvil al cambiar de ruta
  onNavigation(): void {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
