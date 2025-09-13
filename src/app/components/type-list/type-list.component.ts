import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Type } from '../../models/pokemon';

@Component({
  selector: 'app-type-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Tipos de Pokémon</h2>
      <div class="types-grid">
        <div *ngFor="let type of types" class="type-card type-{{type.name}}">
          <h3>{{type.name | titlecase}}</h3>
          <p>Pokémon: {{type.pokemon.length}}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .types-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .type-card {
      padding: 20px;
      border-radius: 10px;
      color: white;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .type-card h3 {
      margin: 0 0 10px 0;
      font-size: 1.5rem;
    }
  `]
})
export class TypeListComponent implements OnInit {
  types: Type[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    // Cargar los primeros 20 tipos
    for (let i = 1; i <= 20; i++) {
      this.pokemonService.getTypeById(i).subscribe(type => {
        this.types.push(type);
        this.types.sort((a, b) => a.id - b.id);
      });
    }
  }
}
