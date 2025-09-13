import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { Move } from '../../models/pokemon';

@Component({
  selector: 'app-move-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './move-detail.component.html',
  styleUrls: ['./move-detail.component.css']
})
export class MoveDetailComponent implements OnInit {
  move: Move | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const moveName = params.get('name');
      if (moveName) {
        this.loadMove(moveName);
      }
    });
  }

  loadMove(name: string): void {
    this.loading = true;
    this.error = null;
    this.move = null;

    this.pokemonService.getMoveByName(name).subscribe({
      next: (move) => {
        this.move = move;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el movimiento';
        this.loading = false;
        console.error('Error loading move:', err);
      }
    });
  }

  getEnglishEffect(move: Move): string {
    const effect = move.effect_entries.find(entry =>
      entry.language.name === 'en'
    );
    return effect ? effect.effect : 'No description available';
  }

  getEnglishFlavorText(move: Move): string {
    const flavorText = move.flavor_text_entries.find(entry =>
      entry.language.name === 'en'
    );
    return flavorText ? flavorText.flavor_text : 'No flavor text available';
  }

  getStatChanges(move: Move): string {
    if (!move.stat_changes || move.stat_changes.length === 0) {
      return 'No afecta estadísticas';
    }

    return move.stat_changes.map(change =>
      `${change.stat.name} ${change.change > 0 ? '+' : ''}${change.change}`
    ).join(', ');
  }
}
