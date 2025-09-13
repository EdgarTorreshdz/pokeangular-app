import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { Location, LocationArea } from '../../models/pokemon';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {
  location: Location | null = null;
  locationAreas: LocationArea[] = [];
  loading = false;
  error: string | null = null;
  loadingAreas = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const locationName = params.get('name');
      if (locationName) {
        this.loadLocation(locationName);
      }
    });
  }

  loadLocation(name: string): void {
    this.loading = true;
    this.error = null;
    this.location = null;
    this.locationAreas = [];

    this.pokemonService.getLocationByName(name).subscribe({
      next: (location) => {
        this.location = location;
        this.loading = false;
        this.loadLocationAreas();
      },
      error: (err) => {
        this.error = 'Error al cargar la ubicación';
        this.loading = false;
        console.error('Error loading location:', err);
      }
    });
  }

  loadLocationAreas(): void {
    if (!this.location || !this.location.areas || this.location.areas.length === 0) {
      return;
    }

    this.loadingAreas = true;
    this.locationAreas = [];

    // Cargar las primeras 5 áreas de ubicación
    const areasToLoad = this.location.areas.slice(0, 5);
    let loadedCount = 0;

    areasToLoad.forEach(area => {
      const areaName = area.name;
      this.pokemonService.getLocationAreaByName(areaName).subscribe({
        next: (locationArea) => {
          this.locationAreas.push(locationArea);
          loadedCount++;

          if (loadedCount === areasToLoad.length) {
            this.loadingAreas = false;
          }
        },
        error: (err) => {
          console.error('Error loading location area:', err);
          loadedCount++;

          if (loadedCount === areasToLoad.length) {
            this.loadingAreas = false;
          }
        }
      });
    });
  }

  // Métodos seguros para propiedades opcionales
  getAreas(location: Location): any[] {
    return location.areas || [];
  }

  getGameIndices(location: Location): any[] {
    return location.game_indices || [];
  }

  getPokemonEncounters(area: LocationArea): any[] {
    return area.pokemon_encounters || [];
  }

  getEncounterMethods(area: LocationArea): any[] {
    return area.encounter_method_rates || [];
  }
}
