import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as models from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  // Generic methods
  getResourceList(endpoint: string, limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.http.get<models.APIResourceList>(`${this.apiUrl}/${endpoint}?limit=${limit}&offset=${offset}`);
  }

  getResourceByUrl<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  getResourceById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  getResourceByName<T>(endpoint: string, name: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${name}`);
  }

  // Pokémon endpoints
  getPokemons(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('pokemon', limit, offset);
  }

  getPokemonById(id: number): Observable<models.Pokemon> {
    return this.getResourceById<models.Pokemon>('pokemon', id);
  }

  getPokemonByName(name: string): Observable<models.Pokemon> {
    return this.getResourceByName<models.Pokemon>('pokemon', name);
  }

  // Species endpoints
  getPokemonSpeciesList(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('pokemon-species', limit, offset);
  }

  getPokemonSpeciesById(id: number): Observable<models.PokemonSpecies> {
    return this.getResourceById<models.PokemonSpecies>('pokemon-species', id);
  }

  getPokemonSpeciesByName(name: string): Observable<models.PokemonSpecies> {
    return this.getResourceByName<models.PokemonSpecies>('pokemon-species', name);
  }

  // Type endpoints
  getTypes(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('type', limit, offset);
  }

  getTypeById(id: number): Observable<models.Type> {
    return this.getResourceById<models.Type>('type', id);
  }

  getTypeByName(name: string): Observable<models.Type> {
    return this.getResourceByName<models.Type>('type', name);
  }

  // Ability endpoints
  getAbilities(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('ability', limit, offset);
  }

  getAbilityById(id: number): Observable<models.Ability> {
    return this.getResourceById<models.Ability>('ability', id);
  }

  getAbilityByName(name: string): Observable<models.Ability> {
    return this.getResourceByName<models.Ability>('ability', name);
  }

  // Move endpoints
  getMoves(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('move', limit, offset);
  }

  getMoveById(id: number): Observable<models.Move> {
    return this.getResourceById<models.Move>('move', id);
  }

  getMoveByName(name: string): Observable<models.Move> {
    return this.getResourceByName<models.Move>('move', name);
  }

  // Item endpoints
  getItems(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('item', limit, offset);
  }

  getItemById(id: number): Observable<models.Item> {
    return this.getResourceById<models.Item>('item', id);
  }

  getItemByName(name: string): Observable<models.Item> {
    return this.getResourceByName<models.Item>('item', name);
  }

  // Generation endpoints
  getGenerations(): Observable<models.APIResourceList> {
    return this.getResourceList('generation');
  }

  getGenerationById(id: number): Observable<models.Generation> {
    return this.getResourceById<models.Generation>('generation', id);
  }

  getGenerationByName(name: string): Observable<models.Generation> {
    return this.getResourceByName<models.Generation>('generation', name);
  }

  // Version endpoints
  getVersions(): Observable<models.APIResourceList> {
    return this.getResourceList('version');
  }

  getVersionById(id: number): Observable<models.Version> {
    return this.getResourceById<models.Version>('version', id);
  }

  getVersionByName(name: string): Observable<models.Version> {
    return this.getResourceByName<models.Version>('version', name);
  }

  // Version Group endpoints
  getVersionGroups(): Observable<models.APIResourceList> {
    return this.getResourceList('version-group');
  }

  getVersionGroupById(id: number): Observable<models.VersionGroup> {
    return this.getResourceById<models.VersionGroup>('version-group', id);
  }

  getVersionGroupByName(name: string): Observable<models.VersionGroup> {
    return this.getResourceByName<models.VersionGroup>('version-group', name);
  }

  // Location endpoints
  getLocations(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('location', limit, offset);
  }

  getLocationById(id: number): Observable<models.Location> {
    return this.getResourceById<models.Location>('location', id);
  }

  getLocationByName(name: string): Observable<models.Location> {
    return this.getResourceByName<models.Location>('location', name);
  }

  // Location Area endpoints
  getLocationAreas(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('location-area', limit, offset);
  }

  getLocationAreaById(id: number): Observable<models.LocationArea> {
    return this.getResourceById<models.LocationArea>('location-area', id);
  }

  getLocationAreaByName(name: string): Observable<models.LocationArea> {
    return this.getResourceByName<models.LocationArea>('location-area', name);
  }

  // Evolution endpoints
  getEvolutionChains(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('evolution-chain', limit, offset);
  }

  getEvolutionChainById(id: number): Observable<models.EvolutionChain> {
    return this.getResourceById<models.EvolutionChain>('evolution-chain', id);
  }

  getEvolutionTriggers(limit: number = 20, offset: number = 0): Observable<models.APIResourceList> {
    return this.getResourceList('evolution-trigger', limit, offset);
  }

  getEvolutionTriggerById(id: number): Observable<models.EvolutionTrigger> {
    return this.getResourceById<models.EvolutionTrigger>('evolution-trigger', id);
  }

  getEvolutionTriggerByName(name: string): Observable<models.EvolutionTrigger> {
    return this.getResourceByName<models.EvolutionTrigger>('evolution-trigger', name);
  }
}
