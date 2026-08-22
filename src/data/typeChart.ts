import { PokemonType } from '../types';

export interface TypeInfo {
  type: PokemonType;
  color: string; // Tailwind background or hex
  textColor: string;
  badgeBg: string;
  badgeBorder: string;
}

export const TYPE_COLORS: Record<PokemonType, { bg: string; text: string; border: string; badge: string; glow: string }> = {
  Normal: { bg: 'bg-stone-500', text: 'text-stone-100', border: 'border-stone-400', badge: 'bg-stone-500/20 text-stone-300 border-stone-500/40', glow: 'shadow-stone-500/20' },
  Feu: { bg: 'bg-orange-500', text: 'text-orange-50', border: 'border-orange-400', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/40', glow: 'shadow-orange-500/30' },
  Eau: { bg: 'bg-sky-500', text: 'text-sky-50', border: 'border-sky-400', badge: 'bg-sky-500/20 text-sky-300 border-sky-500/40', glow: 'shadow-sky-500/30' },
  Plante: { bg: 'bg-emerald-500', text: 'text-emerald-50', border: 'border-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', glow: 'shadow-emerald-500/30' },
  Électrik: { bg: 'bg-amber-400', text: 'text-amber-950', border: 'border-amber-300', badge: 'bg-amber-400/20 text-amber-300 border-amber-400/40', glow: 'shadow-amber-400/30' },
  Glace: { bg: 'bg-cyan-400', text: 'text-cyan-950', border: 'border-cyan-300', badge: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40', glow: 'shadow-cyan-400/30' },
  Combat: { bg: 'bg-rose-700', text: 'text-rose-50', border: 'border-rose-600', badge: 'bg-rose-700/20 text-rose-300 border-rose-700/40', glow: 'shadow-rose-700/30' },
  Poison: { bg: 'bg-purple-600', text: 'text-purple-50', border: 'border-purple-500', badge: 'bg-purple-600/20 text-purple-300 border-purple-600/40', glow: 'shadow-purple-600/30' },
  Sol: { bg: 'bg-yellow-700', text: 'text-yellow-50', border: 'border-yellow-600', badge: 'bg-yellow-700/20 text-yellow-300 border-yellow-700/40', glow: 'shadow-yellow-700/30' },
  Vol: { bg: 'bg-indigo-400', text: 'text-indigo-950', border: 'border-indigo-300', badge: 'bg-indigo-400/20 text-indigo-300 border-indigo-400/40', glow: 'shadow-indigo-400/30' },
  Psy: { bg: 'bg-pink-500', text: 'text-pink-50', border: 'border-pink-400', badge: 'bg-pink-500/20 text-pink-300 border-pink-500/40', glow: 'shadow-pink-500/30' },
  Insecte: { bg: 'bg-lime-600', text: 'text-lime-50', border: 'border-lime-500', badge: 'bg-lime-600/20 text-lime-300 border-lime-600/40', glow: 'shadow-lime-600/30' },
  Roche: { bg: 'bg-stone-600', text: 'text-stone-50', border: 'border-stone-500', badge: 'bg-stone-600/20 text-stone-300 border-stone-600/40', glow: 'shadow-stone-600/30' },
  Spectre: { bg: 'bg-violet-800', text: 'text-violet-50', border: 'border-violet-700', badge: 'bg-violet-800/20 text-violet-300 border-violet-800/40', glow: 'shadow-violet-800/30' },
  Dragon: { bg: 'bg-indigo-700', text: 'text-indigo-50', border: 'border-indigo-600', badge: 'bg-indigo-700/20 text-indigo-300 border-indigo-700/40', glow: 'shadow-indigo-700/30' },
  Acier: { bg: 'bg-slate-400', text: 'text-slate-950', border: 'border-slate-300', badge: 'bg-slate-400/20 text-slate-300 border-slate-400/40', glow: 'shadow-slate-400/30' },
  Ténèbres: { bg: 'bg-neutral-800', text: 'text-neutral-50', border: 'border-neutral-700', badge: 'bg-neutral-800/40 text-neutral-300 border-neutral-700', glow: 'shadow-neutral-800/40' },
  Fée: { bg: 'bg-pink-400', text: 'text-pink-950', border: 'border-pink-300', badge: 'bg-pink-400/20 text-pink-300 border-pink-400/40', glow: 'shadow-pink-400/30' },
};

export const ALL_TYPES: PokemonType[] = [
  'Normal', 'Feu', 'Eau', 'Plante', 'Électrik', 'Glace', 'Combat', 'Poison',
  'Sol', 'Vol', 'Psy', 'Insecte', 'Roche', 'Spectre', 'Dragon', 'Acier', 'Ténèbres', 'Fée'
];

// Type effectiveness table: [Attacking][Defending] -> multiplier
// Gen 6+ matchups
export const TYPE_CHART: Record<PokemonType, Record<PokemonType, number>> = {
  Normal: { Normal: 1, Feu: 1, Eau: 1, Plante: 1, Électrik: 1, Glace: 1, Combat: 1, Poison: 1, Sol: 1, Vol: 1, Psy: 1, Insecte: 1, Roche: 0.5, Spectre: 0, Dragon: 1, Acier: 0.5, Ténèbres: 1, Fée: 1 },
  Feu: { Normal: 1, Feu: 0.5, Eau: 0.5, Plante: 2, Électrik: 1, Glace: 2, Combat: 1, Poison: 1, Sol: 1, Vol: 1, Psy: 1, Insecte: 2, Roche: 0.5, Spectre: 1, Dragon: 0.5, Acier: 2, Ténèbres: 1, Fée: 1 },
  Eau: { Normal: 1, Feu: 2, Eau: 0.5, Plante: 0.5, Électrik: 1, Glace: 1, Combat: 1, Poison: 1, Sol: 2, Vol: 1, Psy: 1, Insecte: 1, Roche: 2, Spectre: 1, Dragon: 0.5, Acier: 1, Ténèbres: 1, Fée: 1 },
  Plante: { Normal: 1, Feu: 0.5, Eau: 2, Plante: 0.5, Électrik: 1, Glace: 1, Combat: 1, Poison: 0.5, Sol: 2, Vol: 0.5, Psy: 1, Insecte: 0.5, Roche: 2, Spectre: 1, Dragon: 0.5, Acier: 0.5, Ténèbres: 1, Fée: 1 },
  Électrik: { Normal: 1, Feu: 1, Eau: 2, Plante: 0.5, Électrik: 0.5, Glace: 1, Combat: 1, Poison: 1, Sol: 0, Vol: 2, Psy: 1, Insecte: 1, Roche: 1, Spectre: 1, Dragon: 0.5, Acier: 1, Ténèbres: 1, Fée: 1 },
  Glace: { Normal: 1, Feu: 0.5, Eau: 0.5, Plante: 2, Électrik: 1, Glace: 0.5, Combat: 1, Poison: 1, Sol: 2, Vol: 2, Psy: 1, Insecte: 1, Roche: 1, Spectre: 1, Dragon: 2, Acier: 0.5, Ténèbres: 1, Fée: 1 },
  Combat: { Normal: 2, Feu: 1, Eau: 1, Plante: 1, Électrik: 1, Glace: 2, Combat: 1, Poison: 0.5, Sol: 1, Vol: 0.5, Psy: 0.5, Insecte: 0.5, Roche: 2, Spectre: 0, Dragon: 1, Acier: 2, Ténèbres: 2, Fée: 0.5 },
  Poison: { Normal: 1, Feu: 1, Eau: 1, Plante: 2, Électrik: 1, Glace: 1, Combat: 1, Poison: 0.5, Sol: 0.5, Vol: 1, Psy: 1, Insecte: 1, Roche: 0.5, Spectre: 0.5, Dragon: 1, Acier: 0, Ténèbres: 1, Fée: 2 },
  Sol: { Normal: 1, Feu: 2, Eau: 1, Plante: 0.5, Électrik: 2, Glace: 1, Combat: 1, Poison: 2, Sol: 1, Vol: 0, Psy: 1, Insecte: 0.5, Roche: 2, Spectre: 1, Dragon: 1, Acier: 2, Ténèbres: 1, Fée: 1 },
  Vol: { Normal: 1, Feu: 1, Eau: 1, Plante: 2, Électrik: 0.5, Glace: 1, Combat: 2, Poison: 1, Sol: 1, Vol: 1, Psy: 1, Insecte: 2, Roche: 0.5, Spectre: 1, Dragon: 1, Acier: 0.5, Ténèbres: 1, Fée: 1 },
  Psy: { Normal: 1, Feu: 1, Eau: 1, Plante: 1, Électrik: 1, Glace: 1, Combat: 2, Poison: 2, Sol: 1, Vol: 1, Psy: 0.5, Insecte: 1, Roche: 1, Spectre: 1, Dragon: 1, Acier: 0.5, Ténèbres: 0, Fée: 1 },
  Insecte: { Normal: 1, Feu: 0.5, Eau: 1, Plante: 2, Électrik: 1, Glace: 1, Combat: 0.5, Poison: 0.5, Sol: 1, Vol: 0.5, Psy: 2, Insecte: 1, Roche: 1, Spectre: 0.5, Dragon: 1, Acier: 0.5, Ténèbres: 2, Fée: 0.5 },
  Roche: { Normal: 1, Feu: 2, Eau: 1, Plante: 1, Électrik: 1, Glace: 2, Combat: 0.5, Poison: 1, Sol: 0.5, Vol: 2, Psy: 1, Insecte: 2, Roche: 1, Spectre: 1, Dragon: 1, Acier: 0.5, Ténèbres: 1, Fée: 1 },
  Spectre: { Normal: 0, Feu: 1, Eau: 1, Plante: 1, Électrik: 1, Glace: 1, Combat: 1, Poison: 1, Sol: 1, Vol: 1, Psy: 2, Insecte: 1, Roche: 1, Spectre: 2, Dragon: 1, Acier: 1, Ténèbres: 0.5, Fée: 1 },
  Dragon: { Normal: 1, Feu: 1, Eau: 1, Plante: 1, Électrik: 1, Glace: 1, Combat: 1, Poison: 1, Sol: 1, Vol: 1, Psy: 1, Insecte: 1, Roche: 1, Spectre: 1, Dragon: 2, Acier: 0.5, Ténèbres: 1, Fée: 0 },
  Acier: { Normal: 1, Feu: 0.5, Eau: 0.5, Plante: 1, Électrik: 0.5, Glace: 2, Combat: 1, Poison: 1, Sol: 1, Vol: 1, Psy: 1, Insecte: 1, Roche: 2, Spectre: 1, Dragon: 1, Acier: 0.5, Ténèbres: 1, Fée: 2 },
  Ténèbres: { Normal: 1, Feu: 1, Eau: 1, Plante: 1, Électrik: 1, Glace: 1, Combat: 0.5, Poison: 1, Sol: 1, Vol: 1, Psy: 2, Insecte: 1, Roche: 1, Spectre: 2, Dragon: 1, Acier: 1, Ténèbres: 0.5, Fée: 0.5 },
  Fée: { Normal: 1, Feu: 0.5, Eau: 1, Plante: 1, Électrik: 1, Glace: 1, Combat: 2, Poison: 0.5, Sol: 1, Vol: 1, Psy: 1, Insecte: 1, Roche: 1, Spectre: 1, Dragon: 2, Acier: 0.5, Ténèbres: 2, Fée: 1 },
};

export function getDefensiveMultiplier(defendingTypes: PokemonType[], attackingType: PokemonType): number {
  let mult = 1;
  for (const defType of defendingTypes) {
    const factor = TYPE_CHART[attackingType]?.[defType] ?? 1;
    mult *= factor;
  }
  return mult;
}

export function analyzeDefensiveWeaknesses(types: PokemonType[]) {
  const weaknesses: { type: PokemonType; multiplier: number }[] = [];
  const resistances: { type: PokemonType; multiplier: number }[] = [];
  const immunities: PokemonType[] = [];

  for (const attackingType of ALL_TYPES) {
    const mult = getDefensiveMultiplier(types, attackingType);
    if (mult > 1) weaknesses.push({ type: attackingType, multiplier: mult });
    else if (mult === 0) immunities.push(attackingType);
    else if (mult < 1) resistances.push({ type: attackingType, multiplier: mult });
  }

  return { weaknesses, resistances, immunities };
}
