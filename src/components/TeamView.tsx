import React from 'react';
import { NuzlockePokemon, BossEncounter } from '../types';
import { PokemonCard } from './PokemonCard';
import { analyzeDefensiveWeaknesses } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import { Plus, ShieldAlert, Sparkles, Zap, Users, Info } from 'lucide-react';

interface TeamViewProps {
  party: NuzlockePokemon[];
  upcomingBoss?: BossEncounter;
  onAddPokemon: () => void;
  onEditPokemon: (pokemon: NuzlockePokemon) => void;
  onMoveToBox: (pokemon: NuzlockePokemon) => void;
  onDeclareDead: (pokemon: NuzlockePokemon) => void;
  onToggleMvp: (pokemon: NuzlockePokemon) => void;
  onLevelChange: (pokemon: NuzlockePokemon, delta: number) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({
  party,
  upcomingBoss,
  onAddPokemon,
  onEditPokemon,
  onMoveToBox,
  onDeclareDead,
  onToggleMvp,
  onLevelChange,
}) => {
  const avgLevel = party.length > 0 
    ? Math.round(party.reduce((acc, p) => acc + p.level, 0) / party.length)
    : 0;

  const maxLevel = party.length > 0
    ? Math.max(...party.map(p => p.level))
    : 0;

  const levelCap = upcomingBoss?.levelCap;
  const isAnyOverLevelCap = levelCap ? party.some(p => p.level > levelCap) : false;

  // Aggregate weaknesses across active party
  const partyTypes = party.flatMap(p => p.types || []);
  const uniqueTypes = Array.from(new Set(partyTypes));

  // Compute common defensive vulnerabilities
  const weaknessCount: Record<string, number> = {};
  party.forEach(p => {
    const analysis = analyzeDefensiveWeaknesses(p.types || ['Normal']);
    analysis.weaknesses.forEach(w => {
      weaknessCount[w.type] = (weaknessCount[w.type] || 0) + 1;
    });
  });

  const heavyWeaknesses = Object.entries(weaknessCount)
    .filter(([_, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      {/* Header Banner & Level Cap Alert */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                ⚔️
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Équipe Active de Combat ({party.length} / 6)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              Vos fidèles combattants prêts à relever les défis de Kalos et du scénario Z.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="rounded-xl border border-stone-800 bg-stone-950/80 px-3 py-1.5 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-400">Niv. Moyen</div>
              <div className="text-base font-mono font-bold text-emerald-400">{avgLevel || '-'}</div>
            </div>

            <div className="rounded-xl border border-stone-800 bg-stone-950/80 px-3 py-1.5 text-center">
              <div className="text-[10px] uppercase font-bold text-stone-400">Niv. Max</div>
              <div className="text-base font-mono font-bold text-stone-200">{maxLevel || '-'}</div>
            </div>

            {upcomingBoss && (
              <div
                className={`rounded-xl border px-3.5 py-1.5 text-center transition-colors ${
                  isAnyOverLevelCap
                    ? 'border-rose-500/50 bg-rose-950/40 text-rose-300 ring-1 ring-rose-500/40 animate-pulse'
                    : 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300'
                }`}
              >
                <div className="text-[10px] uppercase font-bold flex items-center justify-center gap-1">
                  {isAnyOverLevelCap && <ShieldAlert className="w-3 h-3 text-rose-400" />}
                  <span>Prochain Cap ({upcomingBoss.title.split('-')[0]})</span>
                </div>
                <div className="text-base font-mono font-bold">
                  Niv. {upcomingBoss.levelCap}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Heavy Weakness Warning if 3+ pokemon share a weakness */}
        {heavyWeaknesses.length > 0 && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs text-amber-200">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-amber-300">Vigilance Couverture :</span>
              <span>L'équipe compte ≥3 faiblesses partagées face à :</span>
              {heavyWeaknesses.map(([t, cnt]) => (
                <span key={t} className="inline-flex items-center gap-1 font-bold">
                  <TypeBadge type={t as any} size="xs" />
                  <span className="text-[10px] text-amber-400">({cnt}x)</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6 Party Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {party.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            levelCap={upcomingBoss?.levelCap}
            onEdit={onEditPokemon}
            onMoveToBox={onMoveToBox}
            onDeclareDead={onDeclareDead}
            onToggleMvp={onToggleMvp}
            onLevelChange={onLevelChange}
          />
        ))}

        {/* Empty Slots */}
        {Array.from({ length: Math.max(0, 6 - party.length) }).map((_, idx) => (
          <button
            key={`empty-${idx}`}
            onClick={onAddPokemon}
            className="group relative flex min-h-[220px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-800 bg-stone-950/40 p-6 text-center transition-all hover:border-emerald-500/50 hover:bg-stone-900/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-800 bg-stone-900 text-stone-500 transition-colors group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 group-hover:text-emerald-400">
              <Plus className="w-6 h-6" />
            </div>
            <div className="mt-3 font-semibold text-stone-400 group-hover:text-white text-sm">
              Emplacement Libre #{party.length + idx + 1}
            </div>
            <p className="mt-1 text-xs text-stone-600 group-hover:text-stone-400">
              Cliquez pour enregistrer ou recruter un Pokémon
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
