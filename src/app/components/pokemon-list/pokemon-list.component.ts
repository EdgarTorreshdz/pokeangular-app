import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, PokemonDetailComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  selectedPokemon: Pokemon | null = null;
  loading = false;
  offset = 0;
  limit = 20;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe(response => {
      response.results.forEach(pokemon => {
        this.pokemonService.getPokemonByName(pokemon.name).subscribe(details => {
          this.pokemons.push(details);
          this.pokemons.sort((a, b) => a.id - b.id);
        });
      });
      this.loading = false;
    });
  }

  loadMore(): void {
    this.offset += this.limit;
    this.loadPokemons();
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  }

  closeDetail(): void {
    this.selectedPokemon = null;
  }
}
