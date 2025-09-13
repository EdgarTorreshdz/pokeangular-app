import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent {
  // Array de features con información
  features = [
    {
      route: '/pokemon',
      icon: '🐾',
      title: 'Pokémon',
      description: 'Explora todos los Pokémon con sus estadísticas y detalles',
      class: 'feature-pokemon'
    },
    {
      route: '/types',
      icon: '⚡',
      title: 'Tipos',
      description: 'Descubre las relaciones entre tipos Pokémon',
      class: 'feature-types'
    },
    {
      route: '/abilities',
      icon: '🌟',
      title: 'Habilidades',
      description: 'Habilidades especiales de los Pokémon',
      class: 'feature-abilities'
    },
    {
      route: '/moves',
      icon: '🎯',
      title: 'Movimientos',
      description: 'Ataques y técnicas de combate',
      class: 'feature-moves'
    },
    {
      route: '/items',
      icon: '🎒',
      title: 'Items',
      description: 'Objetos y herramientas del mundo Pokémon',
      class: 'feature-items'
    },
    {
      route: '/generations',
      icon: '🔄',
      title: 'Generaciones',
      description: 'Diferentes eras de juegos Pokémon',
      class: 'feature-generations'
    },
    {
      route: '/locations',
      icon: '🗺️',
      title: 'Ubicaciones',
      description: 'Lugares y regiones para explorar',
      class: 'feature-locations'
    },
    {
      route: '/evolutions',
      icon: '📈',
      title: 'Evoluciones',
      description: 'Cadenas evolutivas y transformaciones',
      class: 'feature-evolutions'
    }
  ];
}
