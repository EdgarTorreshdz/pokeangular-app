import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { Ability } from '../../models/pokemon';

@Component({
  selector: 'app-ability-detail',
  standalone: true,
  imports: [CommonModule,RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './ability-detail.component.html',
  styleUrls: ['./ability-detail.component.css']
})
export class AbilityDetailComponent implements OnInit {
  ability: Ability | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const abilityName = params.get('name');
      if (abilityName) {
        this.loadAbility(abilityName);
      }
    });
  }

  loadAbility(name: string): void {
    this.loading = true;
    this.error = null;
    this.ability = null;

    this.pokemonService.getAbilityByName(name).subscribe({
      next: (ability) => {
        this.ability = ability;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la habilidad';
        this.loading = false;
        console.error('Error loading ability:', err);
      }
    });
  }

  getEnglishEffect(ability: Ability): string {
    const effect = ability.effect_entries.find(entry =>
      entry.language.name === 'en'
    );
    return effect ? effect.effect : 'No description available';
  }

  getShortEnglishEffect(ability: Ability): string {
    const effect = ability.effect_entries.find(entry =>
      entry.language.name === 'en'
    );
    return effect ? effect.short_effect : 'No description available';
  }
}
