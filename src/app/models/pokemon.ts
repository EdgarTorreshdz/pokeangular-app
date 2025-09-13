export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  held_items: HeldItem[];
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  version_group: NamedAPIResource;
  move_learn_method: NamedAPIResource;
}

export interface HeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

// Species
export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: PokedexNumber[];
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource;
  evolution_chain: {
    url: string;
  };
  habitat: NamedAPIResource;
  generation: NamedAPIResource;
  names: Name[];
  flavor_text_entries: FlavorText[];
  form_descriptions: Description[];
  genera: Genus[];
  varieties: Variety[];
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface Variety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

// Types
export interface Type {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  past_damage_relations: PastDamageRelation[];
  game_indices: GameIndex[];
  generation: NamedAPIResource;
  move_damage_class: NamedAPIResource;
  names: Name[];
  pokemon: TypePokemon[];
  moves: NamedAPIResource[];
}

export interface DamageRelations {
  no_damage_to: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  double_damage_from: NamedAPIResource[];
}

export interface PastDamageRelation {
  generation: NamedAPIResource;
  damage_relations: DamageRelations;
}

export interface TypePokemon {
  slot: number;
  pokemon: NamedAPIResource;
}

// Abilities
export interface Ability {
  id: number;
  name: string;
  is_main_series: boolean;
  generation: NamedAPIResource;
  names: Name[];
  effect_entries: AbilityEffect[];
  flavor_text_entries: AbilityFlavorText[];
  pokemon: AbilityPokemon[];
}

export interface AbilityEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface AbilityFlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface AbilityPokemon {
  is_hidden: boolean;
  slot: number;
  pokemon: NamedAPIResource;
}

// Moves
export interface Move {
  id: number;
  name: string;
  accuracy: number;
  effect_chance: number;
  pp: number;
  priority: number;
  power: number;
  contest_combos: ContestCombo;
  contest_type: NamedAPIResource;
  contest_effect: NamedAPIResource;
  damage_class: NamedAPIResource;
  effect_entries: MoveEffect[];
  effect_changes: AbilityEffectChange[];
  generation: NamedAPIResource;
  meta: MoveMetaData;
  names: Name[];
  past_values: PastMoveValue[];
  stat_changes: MoveStatChange[];
  super_contest_effect: NamedAPIResource;
  target: NamedAPIResource;
  type: NamedAPIResource;
  learned_by_pokemon: NamedAPIResource[];
  flavor_text_entries: MoveFlavorText[];
}

export interface ContestCombo {
  normal: ContestComboDetail;
  super: ContestComboDetail;
}

export interface ContestComboDetail {
  use_before: NamedAPIResource[];
  use_after: NamedAPIResource[];
}

export interface MoveEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface AbilityEffectChange {
  effect_entries: EffectEntry[];
  version_group: NamedAPIResource;
}

export interface EffectEntry {
  effect: string;
  language: NamedAPIResource;
}

export interface MoveMetaData {
  ailment: NamedAPIResource;
  category: NamedAPIResource;
  min_hits: number;
  max_hits: number;
  min_turns: number;
  max_turns: number;
  drain: number;
  healing: number;
  crit_rate: number;
  ailment_chance: number;
  flinch_chance: number;
  stat_chance: number;
}

export interface PastMoveValue {
  accuracy: number;
  effect_chance: number;
  power: number;
  pp: number;
  effect_entries: MoveEffect[];
  type: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface MoveStatChange {
  change: number;
  stat: NamedAPIResource;
}

export interface MoveFlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version_group: NamedAPIResource;
}

// Items
export interface Item {
  id: number;
  name: string;
  cost: number;
  fling_power: number;
  fling_effect: NamedAPIResource;
  attributes: NamedAPIResource[];
  category: ItemCategory;
  effect_entries: ItemEffect[];
  flavor_text_entries: ItemFlavorText[];
  game_indices: GameIndex[];
  names: Name[];
  sprites: ItemSprites;
  held_by_pokemon: ItemHolderPokemon[];
  baby_trigger_for: EvolutionChain;
}

export interface ItemCategory {
  name: string;
  url: string;
}

export interface ItemEffect {
  effect: string;
  short_effect: string;
  language: NamedAPIResource;
}

export interface ItemFlavorText {
  text: string;
  version_group: NamedAPIResource;
  language: NamedAPIResource;
}

export interface ItemSprites {
  default: string;
}

export interface ItemHolderPokemon {
  pokemon: NamedAPIResource;
  version_details: ItemHolderVersion[];
}

export interface ItemHolderVersion {
  rarity: number;
  version: NamedAPIResource;
}

// Generations
export interface Generation {
  id: number;
  name: string;
  abilities: NamedAPIResource[];
  names: Name[];
  main_region: NamedAPIResource;
  moves: NamedAPIResource[];
  pokemon_species: NamedAPIResource[];
  types: NamedAPIResource[];
  version_groups: NamedAPIResource[];
}

// Games
export interface Version {
  id: number;
  name: string;
  names: Name[];
  version_group: NamedAPIResource;
}

export interface VersionGroup {
  id: number;
  name: string;
  order: number;
  generation: NamedAPIResource;
  move_learn_methods: NamedAPIResource[];
  pokedexes: NamedAPIResource[];
  regions: NamedAPIResource[];
  versions: NamedAPIResource[];
}

// Locations
export interface Location {
  id: number;
  name: string;
  region: NamedAPIResource;
  names: Name[];
  game_indices: GameIndex[];
  areas: NamedAPIResource[];
}

export interface LocationArea {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: NamedAPIResource;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
  encounter_method: NamedAPIResource;
  version_details: EncounterVersionDetails[];
}

export interface EncounterVersionDetails {
  rate: number;
  version: NamedAPIResource;
}

export interface PokemonEncounter {
  pokemon: NamedAPIResource;
  version_details: VersionEncounterDetail[];
}

export interface VersionEncounterDetail {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
}

export interface Encounter {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
}

// Evolutions
export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionDetail {
  item: NamedAPIResource;
  trigger: NamedAPIResource;
  gender: number;
  held_item: NamedAPIResource;
  known_move: NamedAPIResource;
  known_move_type: NamedAPIResource;
  location: NamedAPIResource;
  min_level: number;
  min_happiness: number;
  min_beauty: number;
  min_affection: number;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource;
  party_type: NamedAPIResource;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: NamedAPIResource;
  turn_upside_down: boolean;
}

export interface EvolutionTrigger {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: NamedAPIResource[];
}

// Common response interfaces
export interface APIResourceList {
  count: number;
  next: string;
  previous: string;
  results: NamedAPIResource[];
}
