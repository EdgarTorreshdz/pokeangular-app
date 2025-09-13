import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {
  @Input() pokemon!: Pokemon;
  @Output() close = new EventEmitter<void>();

  getImage(): string {
    return this.pokemon.sprites.other?.['official-artwork']?.front_default ||
           this.pokemon.sprites.front_default;
  }

  closeModal(): void {
    this.close.emit();
  }
}
