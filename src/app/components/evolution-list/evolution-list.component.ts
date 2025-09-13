import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { NamedAPIResource } from '../../models/pokemon';

@Component({
  selector: 'app-evolution-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './evolution-list.component.html',
  styleUrls: ['./evolution-list.component.css']
})
export class EvolutionListComponent implements OnInit {
  evolutionChains: NamedAPIResource[] = [];
  loading = false;
  error: string | null = null;
  offset = 0;
  limit = 20;
  hasMore = true;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvolutionChains();
  }

  loadEvolutionChains(): void {
    this.loading = true;
    this.error = null;

    this.pokemonService.getEvolutionChains(this.limit, this.offset).subscribe({
      next: (response) => {
        this.evolutionChains = [...this.evolutionChains, ...response.results];
        this.hasMore = !!response.next;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las cadenas evolutivas';
        this.loading = false;
        console.error('Error loading evolution chains:', err);
      }
    });
  }

  loadMore(): void {
    if (this.hasMore && !this.loading) {
      this.offset += this.limit;
      this.loadEvolutionChains();
    }
  }

  viewEvolutionDetail(chainId: string): void {
    // Extraer el ID de la URL (ej: "https://pokeapi.co/api/v2/evolution-chain/1/" → "1")
    const id = chainId.split('/').filter(Boolean).pop();
    if (id) {
      this.router.navigate(['/evolutions', id]);
    }
  }

  getChainId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
