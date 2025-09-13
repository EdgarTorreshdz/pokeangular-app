import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { EvolutionChain, ChainLink } from '../../models/pokemon';

@Component({
  selector: 'app-evolution-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './evolution-detail.component.html',
  styleUrls: ['./evolution-detail.component.css']
})
export class EvolutionDetailComponent implements OnInit {
  evolutionChain: EvolutionChain | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const chainId = params.get('id');
      if (chainId) {
        this.loadEvolutionChain(parseInt(chainId, 10));
      }
    });
  }

  loadEvolutionChain(id: number): void {
    this.loading = true;
    this.error = null;
    this.evolutionChain = null;

    this.pokemonService.getEvolutionChainById(id).subscribe({
      next: (evolutionChain) => {
        this.evolutionChain = evolutionChain;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la cadena evolutiva';
        this.loading = false;
        console.error('Error loading evolution chain:', err);
      }
    });
  }

  getEvolutionDetails(evolution: any): string {
    if (!evolution.evolution_details || evolution.evolution_details.length === 0) {
      return 'Evolución base';
    }

    const details = evolution.evolution_details[0];
    const conditions: string[] = [];

    if (details.min_level) {
      conditions.push(`Nivel ${details.min_level}`);
    }

    if (details.item) {
      conditions.push(`Usar ${details.item.name}`);
    }

    if (details.trigger) {
      conditions.push(details.trigger.name.replace('-', ' '));
    }

    if (details.min_happiness) {
      conditions.push(`Felicidad ${details.min_happiness}`);
    }

    if (details.time_of_day) {
      conditions.push(`Por la ${details.time_of_day}`);
    }

    if (details.known_move) {
      conditions.push(`Movimiento: ${details.known_move.name}`);
    }

    if (details.known_move_type) {
      conditions.push(`Tipo: ${details.known_move_type.name}`);
    }

    if (details.min_affection) {
      conditions.push(`Cariño ${details.min_affection}`);
    }

    if (details.relative_physical_stats !== null) {
      const stats = ['Ataque > Defensa', 'Ataque = Defensa', 'Ataque < Defensa'];
      conditions.push(stats[details.relative_physical_stats + 1] || '');
    }

    return conditions.filter(Boolean).join(' + ') || 'Condiciones especiales';
  }

  // Método recursivo para renderizar la cadena evolutiva
  renderEvolutionChain(chain: ChainLink, level: number = 0): any {
    const result = {
      species: chain.species,
      evolution_details: chain.evolution_details,
      level: level,
      evolves_to: chain.evolves_to.map((evolution: ChainLink) =>
        this.renderEvolutionChain(evolution, level + 1)
      )
    };

    return result;
  }

  getBabyTriggerItem(): string {
    return this.evolutionChain?.baby_trigger_item?.name || 'Ninguno';
  }

  // Métodos auxiliares para contar especies, evoluciones y niveles
  countSpecies(chain: ChainLink): number {
    let count = 1; // Contar la especie actual
    for (const evolution of chain.evolves_to) {
      count += this.countSpecies(evolution);
    }
    return count;
  }

  countEvolutions(chain: ChainLink): number {
    let count = chain.evolves_to.length; // Contar las evoluciones directas
    for (const evolution of chain.evolves_to) {
      count += this.countEvolutions(evolution);
    }
    return count;
  }

  countEvolutionLevels(chain: ChainLink): number {
    if (chain.evolves_to.length === 0) return 1;

    let maxLevel = 0;
    for (const evolution of chain.evolves_to) {
      const level = this.countEvolutionLevels(evolution);
      if (level > maxLevel) maxLevel = level;
    }
    return maxLevel + 1;
  }

  // Método para aplanar la cadena evolutiva para visualización
  flattenEvolutionChain(chain: ChainLink, level: number = 0): any[] {
    const result = [{
      species: chain.species,
      evolution_details: chain.evolution_details || [],
      evolves_to: chain.evolves_to || [],
      level: level,
      is_baby: chain.is_baby
    }];

    for (const evolution of chain.evolves_to) {
      result.push(...this.flattenEvolutionChain(evolution, level + 1));
    }

    return result;
  }
}
