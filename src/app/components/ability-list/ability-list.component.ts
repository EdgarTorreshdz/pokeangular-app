import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { NamedAPIResource } from '../../models/pokemon';

@Component({
  selector: 'app-ability-list',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './ability-list.component.html',
  styleUrls: ['./ability-list.component.css']
})
export class AbilityListComponent implements OnInit {
  abilities: NamedAPIResource[] = [];
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
    this.loadAbilities();
  }

  loadAbilities(): void {
    this.loading = true;
    this.error = null;

    this.pokemonService.getAbilities(this.limit, this.offset).subscribe({
      next: (response) => {
        this.abilities = [...this.abilities, ...response.results];
        this.hasMore = !!response.next;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las habilidades';
        this.loading = false;
        console.error('Error loading abilities:', err);
      }
    });
  }

  loadMore(): void {
    if (this.hasMore && !this.loading) {
      this.offset += this.limit;
      this.loadAbilities();
    }
  }

  viewAbilityDetail(abilityName: string): void {
    this.router.navigate(['/abilities', abilityName]);
  }

  getAbilityId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }
}
