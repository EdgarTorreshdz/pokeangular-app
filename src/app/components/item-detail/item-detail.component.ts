import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { Item } from '../../models/pokemon';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  item: Item | null = null;
  loading = false;
  error: string | null = null;
  defaultImage = 'assets/images/no-image.png';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const itemName = params.get('name');
      if (itemName) {
        this.loadItem(itemName);
      }
    });
  }

  loadItem(name: string): void {
    this.loading = true;
    this.error = null;
    this.item = null;

    this.pokemonService.getItemByName(name).subscribe({
      next: (item) => {
        this.item = item;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el item';
        this.loading = false;
        console.error('Error loading item:', err);
      }
    });
  }

  getEnglishEffect(item: Item): string {
    const effect = item.effect_entries?.find(entry =>
      entry.language.name === 'en'
    );
    return effect ? effect.effect : 'No description available';
  }

  getEnglishFlavorText(item: Item): string {
    const flavorText = item.flavor_text_entries?.find(entry =>
      entry.language.name === 'en' && entry.version_group
    );
    return flavorText ? flavorText.text : 'No flavor text available';
  }

  getItemImage(item: Item): string {
    return item.sprites?.default || this.defaultImage;
  }

  getHeldByPokemonCount(item: Item): number {
    return item.held_by_pokemon?.length || 0;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImage;
  }

  // Método seguro para acceder a attributes
  getItemAttributes(item: Item): any[] {
    return item.attributes || [];
  }

  // Método seguro para acceder a held_by_pokemon
  getHeldByPokemon(item: Item): any[] {
    return item.held_by_pokemon || [];
  }

  // Método seguro para acceder a game_indices
  getGameIndices(item: Item): any[] {
    return item.game_indices || [];
  }
}
