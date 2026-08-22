export type PokemonType =
  | 'Normal'
  | 'Feu'
  | 'Eau'
  | 'Plante'
  | 'Électrik'
  | 'Glace'
  | 'Combat'
  | 'Poison'
  | 'Sol'
  | 'Vol'
  | 'Psy'
  | 'Insecte'
  | 'Roche'
  | 'Spectre'
  | 'Dragon'
  | 'Acier'
  | 'Ténèbres'
  | 'Fée';

export interface PokemonSpecies {
  id: number;
  name: string;
  frenchName: string;
  types: PokemonType[];
  baseStats: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  spriteKey: string;
  generation: number;
  isMega?: boolean;
  isLegendary?: boolean;
}

export interface PokemonMove {
  name: string;
  type: PokemonType;
  category: 'Physique' | 'Spécial' | 'Statut';
  power?: number;
  accuracy?: number;
  pp?: number;
  description?: string;
}

export interface DeathRecord {
  route: string;
  killerName: string;
  killerType?: PokemonType;
  levelAtDeath: number;
  cause: string;
  date: string;
  eulogy?: string;
  badgeCountAtDeath: number;
}

export interface NuzlockePokemon {
  id: string;
  speciesName: string;
  speciesFrenchName: string;
  nickname: string;
  gender: 'M' | 'F' | 'N';
  types: PokemonType[];
  level: number;
  nature: string;
  ability: string;
  heldItem?: string;
  moves: string[];
  status: 'party' | 'boxed' | 'dead';
  encounterRouteId: string;
  encounterRouteName: string;
  metLevel: number;
  metDate: string;
  isShiny?: boolean;
  isStarter?: boolean;
  isGift?: boolean;
  isMvp?: boolean;
  notes?: string;
  customSpriteUrl?: string;
  spriteKey?: string;
  stats?: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  evs?: {
    hp: number;
    atk: number;
    def: number;
    spa: number;
    spd: number;
    spe: number;
  };
  deathDetails?: DeathRecord;
}

export type RouteStatus = 'pending' | 'caught' | 'failed' | 'skipped' | 'fled' | 'gift' | 'static';

export interface RouteEncounter {
  id: string;
  name: string;
  zone: 'Kalos Centre' | 'Kalos Côtes' | 'Kalos Monts' | 'Lieux Spéciaux' | 'Post-Game / Z';
  status: RouteStatus;
  caughtPokemonId?: string;
  suggestedLevel?: number;
  notes?: string;
  order: number;
  isCustom?: boolean;
}

export interface BossPokemon {
  name: string;
  frenchName: string;
  level: number;
  types: PokemonType[];
  ability?: string;
  item?: string;
  moves: string[];
  spriteKey?: string;
}

export interface BossEncounter {
  id: string;
  title: string;
  category: 'gym' | 'rival' | 'team_flare' | 'elite_four' | 'champion' | 'zygarde_boss' | 'special';
  leaderName: string;
  badgeName: string;
  badgeIcon: string;
  levelCap?: number;
  typeSpecialty: PokemonType[];
  location: string;
  team?: BossPokemon[];
  isDefeated: boolean;
  defeatedDate?: string;
  notes?: string;
  rewards?: string;
}

export interface NuzlockeRules {
  standardNuzlocke: boolean; // First encounter + Faint is dead + Nickname
  levelCap: boolean;
  dupesClause: boolean;
  shinyClause: boolean;
  setMode: boolean;
  noBagItemsInBattle: boolean;
  noLegendaries: boolean;
  megaEvolutionRule: 'unrestricted' | 'one_per_battle' | 'banned' | 'mirror_boss_only';
  zygardeCellRule?: string;
  customRules: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'catch' | 'death' | 'badge' | 'evolution' | 'note' | 'box_transfer';
  title: string;
  description: string;
  pokemonName?: string;
}

export interface NuzlockeRun {
  id: string;
  title: string;
  gameTitle: string; // e.g., "Pokémon Z Fangame"
  trainerName: string;
  createdAt: string;
  updatedAt: string;
  rules: NuzlockeRules;
  party: NuzlockePokemon[]; // Max 6
  pcBox: NuzlockePokemon[];
  graveyard: NuzlockePokemon[];
  routes: RouteEncounter[];
  bosses: BossEncounter[];
  logs: LogEntry[];
  theme: 'kalos-blue' | 'zygarde-green' | 'dark-yveltal' | 'fairy-xerneas';
}
