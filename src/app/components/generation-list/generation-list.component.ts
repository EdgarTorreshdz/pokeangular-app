import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { NamedAPIResource } from '../../models/pokemon';

@Component({
  selector: 'app-generation-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './generation-list.component.html',
  styleUrls: ['./generation-list.component.css']
})
export class GenerationListComponent implements OnInit {
  generations: NamedAPIResource[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGenerations();
  }

  loadGenerations(): void {
    this.loading = true;
    this.error = null;

    this.pokemonService.getGenerations().subscribe({
      next: (response) => {
        this.generations = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las generaciones';
        this.loading = false;
        console.error('Error loading generations:', err);
      }
    });
  }

  viewGenerationDetail(generationName: string): void {
    this.router.navigate(['/generations', generationName]);
  }

  getGenerationId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  }

  getGenerationDisplayName(name: string): string {
    const genMap: { [key: string]: string } = {
      'generation-i': 'Generación I',
      'generation-ii': 'Generación II',
      'generation-iii': 'Generación III',
      'generation-iv': 'Generación IV',
      'generation-v': 'Generación V',
      'generation-vi': 'Generación VI',
      'generation-vii': 'Generación VII',
      'generation-viii': 'Generación VIII',
      'generation-ix': 'Generación IX'
    };
    return genMap[name] || name.replace('generation-', 'Generación ').toUpperCase();
  }
}
