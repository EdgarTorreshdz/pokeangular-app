import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
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
  @Input() set pokemon(value: Pokemon | null) {
    this._pokemon = value;
    if (value) {
      document.body.style.overflow = 'hidden';
    }
  }
  get pokemon(): Pokemon | null {
    return this._pokemon;
  }
  @Output() close = new EventEmitter<void>();

  private _pokemon: Pokemon | null = null;
  defaultImage = 'assets/images/pokemon-placeholder.png';

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.closeModal();
  }

  getImage(): string {
    if (!this.pokemon) return 'assets/images/pokemon-placeholder.png';

    return this.pokemon.sprites?.other?.['official-artwork']?.front_default ||
           this.pokemon.sprites?.front_default ||
           'assets/images/pokemon-placeholder.png';
  }

  getPrimaryType(): string {
    return this.pokemon?.types?.[0]?.type?.name || 'normal';
  }

  getStats(): any[] {
    return this.pokemon?.stats || [];
  }

  getAbilities(): any[] {
    return this.pokemon?.abilities || [];
  }

  getHeight(): number {
    return this.pokemon?.height ? this.pokemon.height / 10 : 0;
  }

  getWeight(): number {
    return this.pokemon?.weight ? this.pokemon.weight / 10 : 0;
  }

  getBaseExperience(): number {
    return this.pokemon?.base_experience || 0;
  }

  closeModal(): void {
    document.body.style.overflow = '';
    this.close.emit();
  }

  // Método para calcular el color de fondo basado en el tipo principal
  getTypeGradient(): string {
    const type = this.getPrimaryType();
    const gradients: { [key: string]: string } = {
      normal: 'linear-gradient(135deg, #A8A878 0%, #909a63 100%)',
      fire: 'linear-gradient(135deg, #F08030 0%, #d56723 100%)',
      water: 'linear-gradient(135deg, #6890F0 0%, #4a75d4 100%)',
      electric: 'linear-gradient(135deg, #F8D030 0%, #e0b820 100%)',
      grass: 'linear-gradient(135deg, #78C850 0%, #5fa73a 100%)',
      ice: 'linear-gradient(135deg, #98D8D8 0%, #7bb9b9 100%)',
      fighting: 'linear-gradient(135deg, #C03028 0%, #9d2620 100%)',
      poison: 'linear-gradient(135deg, #A040A0 0%, #7c317c 100%)',
      ground: 'linear-gradient(135deg, #E0C068 0%, #c9a84d 100%)',
      flying: 'linear-gradient(135deg, #A890F0 0%, #8a75d4 100%)',
      psychic: 'linear-gradient(135deg, #F85888 0%, #e03d6d 100%)',
      bug: 'linear-gradient(135deg, #A8B820 0%, #8a991a 100%)',
      rock: 'linear-gradient(135deg, #B8A038 0%, #96842d 100%)',
      ghost: 'linear-gradient(135deg, #705898 0%, #584677 100%)',
      dragon: 'linear-gradient(135deg, #7038F8 0%, #5a20d6 100%)',
      dark: 'linear-gradient(135deg, #705848 0%, #584637 100%)',
      steel: 'linear-gradient(135deg, #B8B8D0 0%, #9d9db8 100%)',
      fairy: 'linear-gradient(135deg, #EE99AC 0%, #e47f95 100%)'
    };
    return gradients[type] || gradients['normal'];
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImage;
  }

}
