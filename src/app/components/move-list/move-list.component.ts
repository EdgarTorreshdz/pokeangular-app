import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { NamedAPIResource } from '../../models/pokemon';

@Component({
  selector: 'app-move-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.css']
})
export class MoveListComponent implements OnInit {
  moves: NamedAPIResource[] = [];
  loading = false;
  error: string | null = null;
  offset = 0;
  limit = 50;
  hasMore = true;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMoves();
  }

  loadMoves(): void {
    this.loading = true;
    this.error = null;

    this.pokemonService.getMoves(this.limit, this.offset).subscribe({
      next: (response) => {
        this.moves = [...this.moves, ...response.results];
        this.hasMore = !!response.next;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los movimientos';
        this.loading = false;
        console.error('Error loading moves:', err);
      }
    });
  }

  loadMore(): void {
    if (this.hasMore && !this.loading) {
      this.offset += this.limit;
      this.loadMoves();
    }
  }

  viewMoveDetail(moveName: string): void {
    this.router.navigate(['/moves', moveName]);
  }

  getMoveId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
