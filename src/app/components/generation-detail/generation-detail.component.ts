import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { Generation } from '../../models/pokemon';

@Component({
  selector: 'app-generation-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './generation-detail.component.html',
  styleUrls: ['./generation-detail.component.css']
})
export class GenerationDetailComponent implements OnInit {
  generation: Generation | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const generationName = params.get('name');
      if (generationName) {
        this.loadGeneration(generationName);
      }
    });
  }

  loadGeneration(name: string): void {
    this.loading = true;
    this.error = null;
    this.generation = null;

    this.pokemonService.getGenerationByName(name).subscribe({
      next: (generation) => {
        this.generation = generation;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la generación';
        this.loading = false;
        console.error('Error loading generation:', err);
      }
    });
  }

  getGenerationDisplayName(name: string): string {
    const genMap: { [key: string]: string } = {
      'generation-i': 'Generación I (Rojo/Azul/Amarillo)',
      'generation-ii': 'Generación II (Oro/Plata/Cristal)',
      'generation-iii': 'Generación III (Rubí/Zafiro/Esmeralda)',
      'generation-iv': 'Generación IV (Diamante/Perl/Platino)',
      'generation-v': 'Generación V (Negro/Blanco)',
      'generation-vi': 'Generación VI (X/Y)',
      'generation-vii': 'Generación VII (Sol/Luna)',
      'generation-viii': 'Generación VIII (Espada/Escudo)',
      'generation-ix': 'Generación IX (Escarlata/Púrpura)'
    };
    return genMap[name] || name.replace('generation-', 'Generación ').toUpperCase();
  }

  // Métodos seguros para propiedades opcionales
  getAbilities(generation: Generation): any[] {
    return generation.abilities || [];
  }

  getMoves(generation: Generation): any[] {
    return generation.moves || [];
  }

  getPokemonSpecies(generation: Generation): any[] {
    return generation.pokemon_species || [];
  }

  getTypes(generation: Generation): any[] {
    return generation.types || [];
  }

  getVersionGroups(generation: Generation): any[] {
    return generation.version_groups || [];
  }
}
