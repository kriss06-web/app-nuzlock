import React from 'react';
import { NuzlockePokemon } from '../types';
import { TypeBadge } from './TypeBadge';
import { findPokemonByNames, getPokemonSprite } from '../data/pokemonData';
import { Star, Plus, Minus, Edit3, Skull, Archive, Sparkles, MapPin, ShieldAlert, Heart } from 'lucide-react';

interface PokemonCardProps {
  pokemon: NuzlockePokemon;
  onEdit: (pokemon: NuzlockePokemon) => void;
  onMoveToBox?: (pokemon: NuzlockePokemon) => void;
  onMoveToParty?: (pokemon: NuzlockePokemon) => void;
  onDeclareDead?: (pokemon: NuzlockePokemon) => void;
  onToggleMvp?: (pokemon: NuzlockePokemon) => void;
  onLevelChange?: (pokemon: NuzlockePokemon, delta: number) => void;
  levelCap?: number;
  isCompact?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onEdit,
  onMoveToBox,
  onMoveToParty,
  onDeclareDead,
  onToggleMvp,
  onLevelChange,
  levelCap,
  isCompact = false,
}) => {
  const species = findPokemonByNames(pokemon.speciesFrenchName || pokemon.speciesName);
  const spriteUrl = getPokemonSprite(species, pokemon.customSpriteUrl, pokemon.isShiny);
  const isOverLevelCap = levelCap && pokemon.level > levelCap;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl border transition-all duration-200 ${
        pokemon.status === 'dead'
          ? 'border-stone-800 bg-stone-900/90 text-stone-400 opacity-90 shadow-sm'
          : isOverLevelCap
          ? 'border-rose-500/50 bg-stone-900/95 shadow-md shadow-rose-950/20 ring-1 ring-rose-500/40'
          : 'border-emerald-500/20 bg-stone-900/95 text-stone-100 shadow-md hover:border-emerald-500/40 hover:shadow-lg'
      }`}
    >
      {/* Top badges & indicators */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="truncate text-lg font-bold tracking-tight text-white">
                {pokemon.nickname || pokemon.speciesFrenchName || pokemon.speciesName}
              </h3>
              {pokemon.nickname && (
                <span className="text-xs text-stone-400 font-medium truncate">
                  ({pokemon.speciesFrenchName || pokemon.speciesName})
                </span>
              )}
              {pokemon.isShiny && (
                <span className="inline-flex items-center text-amber-300" title="Pokémon Chromatique / Shiny">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                </span>
              )}
              {pokemon.isMvp && (
                <span className="inline-flex items-center text-yellow-400" title="MVP de l'équipe">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                </span>
              )}
            </div>

            {/* Route & Met info */}
            <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
              <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{pokemon.encounterRouteName || 'Route Inconnue'}</span>
              <span className="text-stone-500">• N. {pokemon.metLevel || 5}</span>
            </div>
          </div>

          {/* Level Badge with Quick Increment */}
          <div className="flex flex-col items-end">
            <div
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono font-bold text-sm ${
                isOverLevelCap
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              <span className="text-[10px] text-stone-400 font-sans">NIV</span>
              <span>{pokemon.level}</span>
            </div>

            {isOverLevelCap && (
              <span className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-rose-400 animate-pulse">
                <ShieldAlert className="w-3 h-3" /> &gt; Cap ({levelCap})
              </span>
            )}
          </div>
        </div>

        {/* Center: Sprite + Types + Ability/Nature */}
        <div className="mt-3 flex items-center gap-3">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-stone-950/80 border border-stone-800/80 p-1">
            <img
              src={spriteUrl}
              alt={pokemon.speciesName}
              referrerPolicy="no-referrer"
              className="h-16 w-16 object-contain filter drop-shadow-md transition-transform duration-200 group-hover:scale-110"
              onError={(e) => {
                // Fallback to static official artwork if animated showdown fails
                const img = e.currentTarget;
                if (species && !img.src.includes('official-artwork')) {
                  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${species.id}.png`;
                }
              }}
            />
            {pokemon.gender !== 'N' && (
              <span
                className={`absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold ${
                  pokemon.gender === 'M'
                    ? 'bg-sky-500/80 text-white'
                    : 'bg-pink-500/80 text-white'
                }`}
              >
                {pokemon.gender === 'M' ? '♂' : '♀'}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-1.5">
            {/* Types */}
            <div className="flex flex-wrap gap-1">
              {(pokemon.types || species?.types || ['Normal']).map((t) => (
                <TypeBadge key={t} type={t} size="xs" />
              ))}
            </div>

            {/* Nature & Ability */}
            <div className="text-xs text-stone-300">
              <span className="text-stone-400">Nature : </span>
              <span className="font-medium text-emerald-200">{pokemon.nature || 'Inconnue'}</span>
            </div>
            {pokemon.ability && (
              <div className="text-xs text-stone-300 truncate">
                <span className="text-stone-400">Talent : </span>
                <span className="font-medium text-stone-200">{pokemon.ability}</span>
              </div>
            )}
            {pokemon.heldItem && (
              <div className="text-xs text-amber-300/90 truncate flex items-center gap-1">
                <span className="text-stone-400">Objet : </span>
                <span className="font-medium">{pokemon.heldItem}</span>
              </div>
            )}
          </div>
        </div>

        {/* Moves Slots */}
        {!isCompact && (
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {[0, 1, 2, 3].map((idx) => {
              const move = pokemon.moves?.[idx];
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-md bg-stone-950/60 px-2 py-1 text-xs border border-stone-800/60"
                >
                  <span className="truncate text-stone-200 font-medium">
                    {move || <span className="text-stone-600 italic">- Vide -</span>}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats summary if present */}
        {pokemon.stats && !isCompact && (
          <div className="mt-2.5 flex items-center justify-between rounded-md bg-stone-950/40 px-2.5 py-1 text-[11px] text-stone-400 border border-stone-800/40">
            <span>PV <strong className="text-emerald-400">{pokemon.stats.hp}</strong></span>
            <span>Atk <strong className="text-stone-200">{pokemon.stats.atk}</strong></span>
            <span>Def <strong className="text-stone-200">{pokemon.stats.def}</strong></span>
            <span>SpA <strong className="text-stone-200">{pokemon.stats.spa}</strong></span>
            <span>SpD <strong className="text-stone-200">{pokemon.stats.spd}</strong></span>
            <span>Vit <strong className="text-stone-200">{pokemon.stats.spe}</strong></span>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-2 flex items-center justify-between border-t border-stone-800/80 bg-stone-950/50 px-3 py-2 text-xs">
        {/* Quick Level Adjust */}
        {onLevelChange && pokemon.status !== 'dead' && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onLevelChange(pokemon, -1)}
              title="Baisser le niveau"
              className="flex h-6 w-6 items-center justify-center rounded bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => onLevelChange(pokemon, 1)}
              title="Monter d'un niveau (+1)"
              className="flex h-6 w-6 items-center justify-center rounded bg-emerald-700/60 text-emerald-200 hover:bg-emerald-600 hover:text-white"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-1.5 ml-auto">
          {onToggleMvp && pokemon.status !== 'dead' && (
            <button
              onClick={() => onToggleMvp(pokemon)}
              title={pokemon.isMvp ? 'Retirer MVP' : 'Nommer MVP de la run'}
              className={`flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
                pokemon.isMvp
                  ? 'border-yellow-500/50 bg-yellow-500/20 text-yellow-300'
                  : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-yellow-300 hover:border-yellow-500/30'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
            </button>
          )}

          {onMoveToBox && pokemon.status === 'party' && (
            <button
              onClick={() => onMoveToBox(pokemon)}
              title="Envoyer dans le PC"
              className="flex h-7 items-center gap-1 rounded-lg border border-stone-800 bg-stone-900 px-2 text-stone-300 hover:border-emerald-500/40 hover:text-emerald-300"
            >
              <Archive className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PC</span>
            </button>
          )}

          {onMoveToParty && pokemon.status === 'boxed' && (
            <button
              onClick={() => onMoveToParty(pokemon)}
              title="Ajouter à l'Équipe active"
              className="flex h-7 items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/20 px-2 text-emerald-300 hover:bg-emerald-500/30"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Équipe</span>
            </button>
          )}

          <button
            onClick={() => onEdit(pokemon)}
            title="Modifier fiche Pokémon"
            className="flex h-7 items-center gap-1 rounded-lg border border-stone-800 bg-stone-900 px-2 text-stone-300 hover:border-stone-700 hover:text-white"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Fiche</span>
          </button>

          {onDeclareDead && pokemon.status !== 'dead' && (
            <button
              onClick={() => onDeclareDead(pokemon)}
              title="Déclarer ce Pokémon K.O. / Mort (Cimetière)"
              className="flex h-7 items-center gap-1 rounded-lg border border-rose-900/60 bg-rose-950/40 px-2 text-rose-400 hover:bg-rose-900/60 hover:text-rose-200"
            >
              <Skull className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">K.O.</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
