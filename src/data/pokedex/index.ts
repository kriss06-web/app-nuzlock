import { PokemonSpecies } from '../../types';
import { POKEDEX_GEN_1 } from './gen1';
import { POKEDEX_GEN_2 } from './gen2';
import { POKEDEX_GEN_3 } from './gen3';
import { POKEDEX_GEN_4 } from './gen4';
import { POKEDEX_GEN_5 } from './gen5';
import { POKEDEX_GEN_6 } from './gen6';
import { POKEDEX_GEN_7 } from './gen7';
import { POKEDEX_GEN_8 } from './gen8';
import { POKEDEX_GEN_9 } from './gen9';
import { MEGAS_AND_SPECIAL_FORMS } from './megasAndForms';

export {
  POKEDEX_GEN_1,
  POKEDEX_GEN_2,
  POKEDEX_GEN_3,
  POKEDEX_GEN_4,
  POKEDEX_GEN_5,
  POKEDEX_GEN_6,
  POKEDEX_GEN_7,
  POKEDEX_GEN_8,
  POKEDEX_GEN_9,
  MEGAS_AND_SPECIAL_FORMS,
};

export const ALL_NATIONAL_POKEDEX: PokemonSpecies[] = [
  ...POKEDEX_GEN_1,
  ...POKEDEX_GEN_2,
  ...POKEDEX_GEN_3,
  ...POKEDEX_GEN_4,
  ...POKEDEX_GEN_5,
  ...POKEDEX_GEN_6,
  ...POKEDEX_GEN_7,
  ...POKEDEX_GEN_8,
  ...POKEDEX_GEN_9,
  ...MEGAS_AND_SPECIAL_FORMS,
];

// Pre-built index maps for instant O(1) lookups
const BY_ID = new Map<number, PokemonSpecies>();
const BY_LOWER_NAME = new Map<string, PokemonSpecies>();
const BY_LOWER_FR_NAME = new Map<string, PokemonSpecies>();
const BY_SPRITE_KEY = new Map<string, PokemonSpecies>();

// Normalize string for accents and punctuation (e.g. "Pêchaminus" -> "pechaminus", "Méga-Dracaufeu X" -> "megadracaufeu x")
export function normalizeSearchTerm(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

const BY_NORMALIZED = new Map<string, PokemonSpecies>();

ALL_NATIONAL_POKEDEX.forEach((p) => {
  if (!BY_ID.has(p.id)) BY_ID.set(p.id, p);
  BY_LOWER_NAME.set(p.name.toLowerCase().trim(), p);
  BY_LOWER_FR_NAME.set(p.frenchName.toLowerCase().trim(), p);
  BY_SPRITE_KEY.set(p.spriteKey.toLowerCase().trim(), p);
  
  const normEn = normalizeSearchTerm(p.name);
  const normFr = normalizeSearchTerm(p.frenchName);
  if (!BY_NORMALIZED.has(normEn)) BY_NORMALIZED.set(normEn, p);
  if (!BY_NORMALIZED.has(normFr)) BY_NORMALIZED.set(normFr, p);
});

export function findSpeciesById(id: number): PokemonSpecies | undefined {
  return BY_ID.get(id);
}

export function findSpeciesByNameOrFrench(nameOrFrench: string): PokemonSpecies | undefined {
  if (!nameOrFrench) return undefined;
  const raw = nameOrFrench.trim().toLowerCase();
  
  // Direct exact match
  if (BY_LOWER_FR_NAME.has(raw)) return BY_LOWER_FR_NAME.get(raw);
  if (BY_LOWER_NAME.has(raw)) return BY_LOWER_NAME.get(raw);
  if (BY_SPRITE_KEY.has(raw)) return BY_SPRITE_KEY.get(raw);
  
  // Normalized match (handling accents like Bulbizarre, Pêchaminus, Étourmi, Flabébé...)
  const norm = normalizeSearchTerm(raw);
  if (BY_NORMALIZED.has(norm)) return BY_NORMALIZED.get(norm);

  // Partial match fallback
  return ALL_NATIONAL_POKEDEX.find(
    (p) =>
      normalizeSearchTerm(p.frenchName).includes(norm) ||
      normalizeSearchTerm(p.name).includes(norm) ||
      p.spriteKey.toLowerCase().includes(raw)
  );
}
