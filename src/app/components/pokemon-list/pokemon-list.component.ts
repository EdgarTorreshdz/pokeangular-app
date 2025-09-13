import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PokemonDetailComponent, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  pokemons: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  loading = false;
  loadingMore = false;
  error: string | null = null;
  offset = 0;
  limit = 24;
  hasMore = true;
  private scrollListener!: EventListener;
  defaultImage = 'assets/images/pokemon-placeholder.png';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
    this.setupInfiniteScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  loadPokemons(): void {
    if (this.loading) return;

    this.loading = true;
    this.error = null;

    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (response) => {
        const requests = response.results.map(pokemon =>
          this.pokemonService.getPokemonByName(pokemon.name)
        );

        // Usar forkJoin para manejar todas las solicitudes
        Promise.all(requests.map(req => req.toPromise()))
          .then(details => {
            const validDetails = details.filter((detail): detail is Pokemon => detail !== null && detail !== undefined);
            this.pokemons = [...this.pokemons, ...validDetails];
            this.pokemons.sort((a, b) => a.id - b.id);
            this.hasMore = !!response.next;
          })
          .catch(err => {
            this.error = 'Error al cargar los detalles de Pokémon';
            console.error('Error loading Pokémon details:', err);
          })
          .finally(() => {
            this.loading = false;
            this.loadingMore = false;
          });
      },
      error: (err) => {
        this.error = 'Error al cargar los Pokémon';
        this.loading = false;
        this.loadingMore = false;
        console.error('Error loading Pokémon:', err);
      }
    });
  }

  loadMore(): void {
    if (this.loadingMore || !this.hasMore) return;

    this.loadingMore = true;
    this.offset += this.limit;
    this.loadPokemons();
  }

  setupInfiniteScroll(): void {
    this.scrollListener = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const threshold = 200;

      if (scrollPosition >= documentHeight - threshold && !this.loadingMore && this.hasMore) {
        this.loadMore();
      }
    };

    window.addEventListener('scroll', this.scrollListener);
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    document.body.style.overflow = 'hidden';
  }

  closeDetail(): void {
    this.selectedPokemon = null;
    document.body.style.overflow = '';
  }

  getPokemonImage(pokemon: Pokemon): string {
    return pokemon.sprites?.other?.['official-artwork']?.front_default ||
           pokemon.sprites?.front_default ||
           'assets/images/pokemon-placeholder.png';
  }

  getPrimaryType(pokemon: Pokemon): string {
    return pokemon.types?.[0]?.type?.name || 'normal';
  }

  getGeneration(pokemonId: number): number {
    if (pokemonId <= 151) return 1;
    if (pokemonId <= 251) return 2;
    if (pokemonId <= 386) return 3;
    if (pokemonId <= 493) return 4;
    if (pokemonId <= 649) return 5;
    if (pokemonId <= 721) return 6;
    if (pokemonId <= 809) return 7;
    if (pokemonId <= 905) return 8;
    return 9;
  }

  getBaseExperience(pokemon: Pokemon): string {
    return pokemon.base_experience?.toString() || '?';
  }

  getWeight(pokemon: Pokemon): number {
    return pokemon.weight ? pokemon.weight / 10 : 0;
  }

  getHeight(pokemon: Pokemon): number {
    return pokemon.height ? pokemon.height / 10 : 0;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackByPokemonId(index: number, pokemon: Pokemon): number {
    return pokemon.id;
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImage;
  }
}
