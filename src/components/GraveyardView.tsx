import React, { useState } from 'react';
import { NuzlockePokemon } from '../types';
import { findPokemonByNames, getPokemonSprite } from '../data/pokemonData';
import { TypeBadge } from './TypeBadge';
import { Skull, Flame, HeartHandshake, MapPin, AlertTriangle, Undo2, Edit3 } from 'lucide-react';

interface GraveyardViewProps {
  graveyard: NuzlockePokemon[];
  onEditPokemon: (pokemon: NuzlockePokemon) => void;
  onRevivePokemon: (pokemon: NuzlockePokemon) => void;
}

export const GraveyardView: React.FC<GraveyardViewProps> = ({
  graveyard,
  onEditPokemon,
  onRevivePokemon,
}) => {
  const [candlesLit, setCandlesLit] = useState<Record<string, boolean>>({});

  const toggleCandle = (id: string) => {
    setCandlesLit((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Compute death stats
  const totalDeaths = graveyard.length;
  const killersMap: Record<string, number> = {};
  const killerTypesMap: Record<string, number> = {};

  graveyard.forEach((p) => {
    if (p.deathDetails?.killerName) {
      killersMap[p.deathDetails.killerName] = (killersMap[p.deathDetails.killerName] || 0) + 1;
    }
    if (p.deathDetails?.killerType) {
      killerTypesMap[p.deathDetails.killerType] = (killerTypesMap[p.deathDetails.killerType] || 0) + 1;
    }
  });

  const deadliestKiller = Object.entries(killersMap).sort((a, b) => b[1] - a[1])[0];
  const deadliestType = Object.entries(killerTypesMap).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      {/* Somber Memorial Banner */}
      <div className="rounded-2xl border border-rose-950/60 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-950/80 text-rose-400 font-bold border border-rose-900/60 text-lg">
                ⚰️
              </span>
              <h2 className="text-xl font-bold text-stone-100 tracking-tight">
                Le Cimetière des Héros ({totalDeaths} Tombes)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-400 max-w-xl">
              Ici reposent les compagnons tombés au combat selon la règle sacrée du Nuzlocke. Leurs sacrifices ne seront jamais oubliés.
            </p>
          </div>

          {/* Quick Memorial Stats */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-rose-950/80 bg-stone-950/90 px-3.5 py-2 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-500">Pertes Totales</div>
              <div className="text-lg font-mono font-bold text-rose-500">{totalDeaths}</div>
            </div>

            {deadliestKiller && (
              <div className="rounded-xl border border-stone-800 bg-stone-950/90 px-3.5 py-2 text-left">
                <div className="text-[10px] uppercase font-bold text-stone-500">Pire Adversaire</div>
                <div className="text-xs font-bold text-rose-300 truncate max-w-[140px]">
                  {deadliestKiller[0]} ({deadliestKiller[1]})
                </div>
              </div>
            )}

            {deadliestType && (
              <div className="rounded-xl border border-stone-800 bg-stone-950/90 px-3.5 py-2 text-left">
                <div className="text-[10px] uppercase font-bold text-stone-500">Type le plus Mortel</div>
                <div className="text-xs font-bold text-amber-300">
                  {deadliestType[0]} ({deadliestType[1]}x)
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tombstones List */}
      {graveyard.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/30 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Le Cimetière est vierge !</h3>
          <p className="mt-1 text-xs text-stone-400 max-w-md">
            Incroyable exploit ! Aucun Pokémon n'est encore tombé au combat dans cette run. Continuez à anticiper les coups critiques et les types opposés.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {graveyard.map((pokemon) => {
            const species = findPokemonByNames(pokemon.speciesFrenchName || pokemon.speciesName);
            const spriteUrl = getPokemonSprite(species, pokemon.customSpriteUrl, pokemon.isShiny);
            const isCandleLit = candlesLit[pokemon.id];
            const death = pokemon.deathDetails;

            return (
              <div
                key={pokemon.id}
                className="group relative flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-950/90 p-4 shadow-lg transition-all hover:border-rose-950/80"
              >
                {/* Memorial Ribbon Header */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-stone-500 font-serif">✝</span>
                        <h3 className="truncate text-base font-bold text-stone-200">
                          {pokemon.nickname}
                        </h3>
                        <span className="text-xs text-stone-500 font-mono">
                          ({pokemon.speciesFrenchName || pokemon.speciesName})
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-600" />
                        <span>Rencontré : {pokemon.encounterRouteName}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="rounded-md bg-stone-900 border border-stone-800 px-2 py-0.5 text-[11px] font-mono text-stone-400">
                        Niv. {death?.levelAtDeath || pokemon.level}
                      </span>
                      {death?.date && (
                        <span className="text-[10px] text-stone-600 mt-0.5 font-mono">
                          † {death.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sprite + Details */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-stone-900/60 border border-stone-800/80 p-1">
                      <img
                        src={spriteUrl}
                        alt={pokemon.nickname}
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 object-contain filter grayscale contrast-125 opacity-70"
                        onError={(e) => {
                          if (species) {
                            e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${species.id}.png`;
                          }
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex gap-1">
                        {(pokemon.types || ['Normal']).map((t) => (
                          <TypeBadge key={t} type={t} size="xs" />
                        ))}
                      </div>

                      {death?.killerName && (
                        <div className="text-xs text-rose-400 font-semibold flex items-center gap-1 truncate">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          <span className="truncate">Adversaire : {death.killerName}</span>
                        </div>
                      )}

                      {death?.cause && (
                        <div className="text-[11px] text-stone-400 italic">
                          "{death.cause}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Eulogy / Epitaph */}
                  {death?.eulogy && (
                    <div className="mt-3 rounded-lg border border-stone-900 bg-stone-900/40 p-2 text-xs text-stone-400 italic font-serif">
                      "{death.eulogy}"
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="mt-3 flex items-center justify-between border-t border-stone-900 pt-2.5 text-xs">
                  {/* Virtual Candle */}
                  <button
                    onClick={() => toggleCandle(pokemon.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-colors ${
                      isCandleLit
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-stone-900 text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    <Flame className={`w-3.5 h-3.5 ${isCandleLit ? 'fill-amber-400 text-amber-400 animate-pulse' : ''}`} />
                    <span>{isCandleLit ? 'Cierge allumé' : 'Recueillement'}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEditPokemon(pokemon)}
                      title="Modifier les détails de la mort"
                      className="flex h-7 items-center gap-1 rounded-lg border border-stone-800 bg-stone-900 px-2 text-stone-400 hover:text-white"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Ressusciter ${pokemon.nickname} et le renvoyer dans le PC ? (Annuler une erreur de saisie)`)) {
                          onRevivePokemon(pokemon);
                        }
                      }}
                      title="Annuler le K.O. (En cas d'erreur de clic)"
                      className="flex h-7 items-center gap-1 rounded-lg border border-stone-800 bg-stone-900 px-2 text-stone-400 hover:text-emerald-400 hover:border-emerald-500/30"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Restaurer</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
