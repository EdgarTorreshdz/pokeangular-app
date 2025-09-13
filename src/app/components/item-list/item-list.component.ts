import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { NamedAPIResource } from '../../models/pokemon';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: NamedAPIResource[] = [];
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
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = null;

    this.pokemonService.getItems(this.limit, this.offset).subscribe({
      next: (response) => {
        this.items = [...this.items, ...response.results];
        this.hasMore = !!response.next;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los items';
        this.loading = false;
        console.error('Error loading items:', err);
      }
    });
  }

  loadMore(): void {
    if (this.hasMore && !this.loading) {
      this.offset += this.limit;
      this.loadItems();
    }
  }

  viewItemDetail(itemName: string): void {
    this.router.navigate(['/items', itemName]);
  }

  getItemId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
