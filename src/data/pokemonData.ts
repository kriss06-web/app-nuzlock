import { PokemonSpecies, PokemonType } from '../types';
import {
  ALL_NATIONAL_POKEDEX,
  findSpeciesById,
  findSpeciesByNameOrFrench,
  normalizeSearchTerm,
} from './pokedex';

export interface RegionalFormPreset {
  name: string;
  frenchName: string;
  types: PokemonType[];
  description: string;
  originalSpeciesId?: number;
}

export const POKEMON_Z_REGIONAL_PRESETS: RegionalFormPreset[] = [
  { name: 'Greninja Z', frenchName: 'Amphinobi Z (Kalos Antique)', types: ['Eau', 'Psy'], description: 'Forme de Kalos d\'Eric Lostie - Type Eau / Psy avec nouveau design ninja mystique.', originalSpeciesId: 658 },
  { name: 'Frogadier Z', frenchName: 'Croâporal Z (Kalos Antique)', types: ['Eau', 'Psy'], description: 'Forme de Kalos d\'Eric Lostie - Type Eau / Psy.', originalSpeciesId: 657 },
  { name: 'Froakie Z', frenchName: 'Grenousse Z (Kalos Antique)', types: ['Eau', 'Psy'], description: 'Forme de Kalos d\'Eric Lostie - Type Eau / Psy.', originalSpeciesId: 656 },
  
  { name: 'Delphox Z', frenchName: 'Goupelin Z (Kalos Antique)', types: ['Feu', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Feu / Électrik, manie l\'énergie de foudre astrale.', originalSpeciesId: 655 },
  { name: 'Braixen Z', frenchName: 'Roussil Z (Kalos Antique)', types: ['Feu', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Feu / Électrik.', originalSpeciesId: 654 },
  { name: 'Fennekin Z', frenchName: 'Feunnec Z (Kalos Antique)', types: ['Feu', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Feu / Électrik.', originalSpeciesId: 653 },

  { name: 'Chesnaught Z', frenchName: 'Blindépique Z (Kalos Antique)', types: ['Plante', 'Sol'], description: 'Forme de Kalos d\'Eric Lostie - Type Plante / Sol avec armure tellurique renforcée.', originalSpeciesId: 652 },
  { name: 'Quilladin Z', frenchName: 'Boguérisse Z (Kalos Antique)', types: ['Plante', 'Sol'], description: 'Forme de Kalos d\'Eric Lostie - Type Plante / Sol.', originalSpeciesId: 651 },
  { name: 'Chespin Z', frenchName: 'Marisson Z (Kalos Antique)', types: ['Plante', 'Sol'], description: 'Forme de Kalos d\'Eric Lostie - Type Plante / Sol.', originalSpeciesId: 650 },

  { name: 'Pikachu Z', frenchName: 'Pikachu Z (Kalos Antique)', types: ['Poison', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Poison / Électrik.', originalSpeciesId: 25 },
  { name: 'Raichu Z', frenchName: 'Raichu Z (Kalos Antique)', types: ['Poison', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Poison / Électrik.', originalSpeciesId: 26 },

  { name: 'Marowak Z', frenchName: 'Ossatueur Z (Kalos Antique)', types: ['Sol', 'Acier'], description: 'Forme de Kalos d\'Eric Lostie - Type Sol / Acier avec massue forgée.', originalSpeciesId: 105 },
  { name: 'Cubone Z', frenchName: 'Osselait Z (Kalos Antique)', types: ['Sol', 'Roche'], description: 'Forme de Kalos d\'Eric Lostie - Type Sol / Roche.', originalSpeciesId: 104 },

  { name: 'Bibarel Z', frenchName: 'Castorno Z (Kalos Antique)', types: ['Normal', 'Glace'], description: 'Forme de Kalos d\'Eric Lostie - Type Normal / Glace.', originalSpeciesId: 400 },
  { name: 'Bidoof Z', frenchName: 'Keunotor Z (Kalos Antique)', types: ['Normal', 'Glace'], description: 'Forme de Kalos d\'Eric Lostie - Type Normal / Glace.', originalSpeciesId: 399 },

  { name: 'Reuniclus Z', frenchName: 'Symbios Z (Kalos Antique)', types: ['Psy', 'Spectre'], description: 'Forme de Kalos d\'Eric Lostie - Type Psy / Spectre.', originalSpeciesId: 579 },
  { name: 'Duosion Z', frenchName: 'Méios Z (Kalos Antique)', types: ['Psy', 'Spectre'], description: 'Forme de Kalos d\'Eric Lostie - Type Psy / Spectre.', originalSpeciesId: 578 },
  { name: 'Solosis Z', frenchName: 'Nucléos Z (Kalos Antique)', types: ['Psy', 'Spectre'], description: 'Forme de Kalos d\'Eric Lostie - Type Psy / Spectre.', originalSpeciesId: 577 },

  { name: 'Porygon-Z Z', frenchName: 'Porygon-Z Antique', types: ['Normal', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Prototype ancien de Porygon.', originalSpeciesId: 474 },
  { name: 'AZ Floette', frenchName: 'Floette Fleur Éternelle (AZ)', types: ['Fée'], description: 'Floette liée au roi AZ il y a 3000 ans (Lumière du Néant).', originalSpeciesId: 670 },
];

/**
 * POKEMON_DATABASE contains the entire National Pokédex (#1 to #1025)
 * + Mega Evolutions + Pokémon Z Regional Forms (Eric Lostie).
 */
export const POKEMON_DATABASE: PokemonSpecies[] = ALL_NATIONAL_POKEDEX;

export function getPokemonSprite(species: PokemonSpecies | undefined, customUrl?: string, shiny?: boolean): string {
  if (customUrl) return customUrl;
  if (!species) return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  
  const key = species.spriteKey.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (shiny) {
    return `https://play.pokemonshowdown.com/sprites/ani-shiny/${key}.gif`;
  }
  // Primary animated showdown sprite, with fallback to official artwork or showdown static
  return `https://play.pokemonshowdown.com/sprites/ani/${key}.gif`;
}

export function getPokemonStaticArtwork(speciesId: number): string {
  if (speciesId > 10000) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.png`;
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;
}

export function searchPokemon(query: string, genFilter?: number | 'all' | 'z', typeFilter?: PokemonType | 'all'): PokemonSpecies[] {
  let pool = POKEMON_DATABASE;

  if (genFilter && genFilter !== 'all') {
    if (genFilter === 'z') {
      pool = pool.filter(p => p.id > 1000 && p.id < 10000);
    } else {
      pool = pool.filter(p => p.generation === genFilter && !p.isMega && p.id <= 1025);
    }
  }

  if (typeFilter && typeFilter !== 'all') {
    pool = pool.filter(p => p.types.includes(typeFilter));
  }

  if (!query || query.trim() === '') {
    return pool.slice(0, 40);
  }

  const q = query.trim().toLowerCase();
  const normQ = normalizeSearchTerm(q);
  const isNumberQuery = /^\d+$/.test(q);

  if (isNumberQuery) {
    const num = parseInt(q, 10);
    return pool.filter(p => p.id === num || p.id.toString().startsWith(q)).slice(0, 40);
  }

  return pool.filter(p => {
    const normFr = normalizeSearchTerm(p.frenchName);
    const normEn = normalizeSearchTerm(p.name);
    return (
      normFr.includes(normQ) ||
      normEn.includes(normQ) ||
      p.types.some(t => normalizeSearchTerm(t).includes(normQ)) ||
      p.spriteKey.toLowerCase().includes(q)
    );
  }).slice(0, 60);
}

export function findPokemonByNames(nameOrFrench: string): PokemonSpecies | undefined {
  if (!nameOrFrench) return undefined;
  return findSpeciesByNameOrFrench(nameOrFrench);
}

export function findPokemonById(id: number): PokemonSpecies | undefined {
  return findSpeciesById(id);
}

export interface StarterEntry {
  gen: number;
  species: PokemonSpecies;
  isZForm?: boolean;
}

export const ALL_STARTERS_CATALOG: StarterEntry[] = [
  // 1G Kanto
  { gen: 1, species: findPokemonById(1)! },
  { gen: 1, species: findPokemonById(4)! },
  { gen: 1, species: findPokemonById(7)! },
  // 2G Johto
  { gen: 2, species: findPokemonById(152)! },
  { gen: 2, species: findPokemonById(155)! },
  { gen: 2, species: findPokemonById(158)! },
  // 3G Hoenn
  { gen: 3, species: findPokemonById(252)! },
  { gen: 3, species: findPokemonById(255)! },
  { gen: 3, species: findPokemonById(258)! },
  // 4G Sinnoh
  { gen: 4, species: findPokemonById(387)! },
  { gen: 4, species: findPokemonById(390)! },
  { gen: 4, species: findPokemonById(393)! },
  // 5G Unys
  { gen: 5, species: findPokemonById(495)! },
  { gen: 5, species: findPokemonById(498)! },
  { gen: 5, species: findPokemonById(501)! },
  // 6G Kalos
  { gen: 6, species: findPokemonById(650)! },
  { gen: 6, species: findPokemonById(653)! },
  { gen: 6, species: findPokemonById(656)! },
  // Formes Z Kalos (Eric Lostie)
  { gen: 6, species: findPokemonById(6509) || findPokemonById(650)!, isZForm: true },
  { gen: 6, species: findPokemonById(6539) || findPokemonById(653)!, isZForm: true },
  { gen: 6, species: findPokemonById(6569) || findPokemonById(656)!, isZForm: true },
  // 7G Alola
  { gen: 7, species: findPokemonById(722)! },
  { gen: 7, species: findPokemonById(725)! },
  { gen: 7, species: findPokemonById(728)! },
  // 8G Galar
  { gen: 8, species: findPokemonById(810)! },
  { gen: 8, species: findPokemonById(813)! },
  { gen: 8, species: findPokemonById(816)! },
  // 9G Paldea
  { gen: 9, species: findPokemonById(906)! },
  { gen: 9, species: findPokemonById(909)! },
  { gen: 9, species: findPokemonById(912)! },
].filter(s => !!s.species);
