import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { NamedAPIResource } from '../../models/pokemon';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: NamedAPIResource[] = [];
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
    this.loadLocations();
  }

  loadLocations(): void {
    this.loading = true;
    this.error = null;

    this.pokemonService.getLocations(this.limit, this.offset).subscribe({
      next: (response) => {
        this.locations = [...this.locations, ...response.results];
        this.hasMore = !!response.next;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las ubicaciones';
        this.loading = false;
        console.error('Error loading locations:', err);
      }
    });
  }

  loadMore(): void {
    if (this.hasMore && !this.loading) {
      this.offset += this.limit;
      this.loadLocations();
    }
  }

  viewLocationDetail(locationName: string): void {
    this.router.navigate(['/locations', locationName]);
  }

  getLocationId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
