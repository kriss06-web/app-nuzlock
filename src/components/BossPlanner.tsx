import React, { useState } from 'react';
import { BossEncounter, NuzlockePokemon } from '../types';
import { TypeBadge } from './TypeBadge';
import { findPokemonByNames, getPokemonSprite } from '../data/pokemonData';
import { analyzeDefensiveWeaknesses, getDefensiveMultiplier } from '../data/typeChart';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, ShieldAlert, Sparkles, Swords, ChevronDown, ChevronUp, MapPin, Award } from 'lucide-react';

interface BossPlannerProps {
  bosses: BossEncounter[];
  party: NuzlockePokemon[];
  onToggleBossDefeated: (bossId: string, defeated: boolean) => void;
}

export const BossPlanner: React.FC<BossPlannerProps> = ({
  bosses,
  party,
  onToggleBossDefeated,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [expandedBossId, setExpandedBossId] = useState<string | null>(null);

  // Find next upcoming boss
  const nextBoss = bosses.find((b) => !b.isDefeated);
  const defeatedCount = bosses.filter((b) => b.isDefeated).length;

  const handleToggleDefeat = (boss: BossEncounter) => {
    const nextState = !boss.isDefeated;
    if (nextState) {
      // Confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#38bdf8', '#f59e0b', '#ec4899'],
      });
    }
    onToggleBossDefeated(boss.id, nextState);
  };

  const filteredBosses = bosses.filter((b) => {
    if (categoryFilter === 'ALL') return true;
    if (categoryFilter === 'gym') return b.category === 'gym';
    if (categoryFilter === 'team_flare') return b.category === 'team_flare';
    if (categoryFilter === 'league') return b.category === 'elite_four' || b.category === 'champion';
    if (categoryFilter === 'zygarde') return b.category === 'zygarde_boss';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Next Boss Alert */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 text-lg">
                🏆
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Guide des Arènes, Boss & Caps de Niveau ({defeatedCount} / {bosses.length} Vaincus)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              Anticipez les équipes adverses, respectez les limites de niveau et préparez vos stratégies contre les champions et Zygarde.
            </p>
          </div>

          {/* Next Target Card */}
          {nextBoss && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 flex items-center gap-3">
              <div className="text-2xl">{nextBoss.badgeIcon}</div>
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Prochain Objectif
                </div>
                <div className="text-sm font-bold text-white truncate">{nextBoss.title}</div>
                <div className="text-xs text-stone-300 font-mono">
                  Cap de niveau : <strong className="text-emerald-300">Niv. {nextBoss.levelCap}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800">
          {[
            { id: 'ALL', label: `Tous (${bosses.length})` },
            { id: 'gym', label: '12 Arènes Z (Kalos Antique)' },
            { id: 'team_flare', label: 'Crise Flare & Lysandre' },
            { id: 'league', label: 'Conseil des Monarques & Trône' },
            { id: 'zygarde', label: 'Boss Suprême (Zygarde 100%)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-emerald-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bosses List */}
      <div className="space-y-4">
        {filteredBosses.map((boss) => {
          const isExpanded = expandedBossId === boss.id;
          const isCurrentTarget = nextBoss?.id === boss.id;

          // Check if any party member exceeds level cap
          const overLevelParty = party.filter((p) => p.level > boss.levelCap);

          return (
            <div
              key={boss.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                boss.isDefeated
                  ? 'border-stone-800 bg-stone-950/60 opacity-90'
                  : isCurrentTarget
                  ? 'border-emerald-500/60 bg-stone-900 shadow-xl ring-1 ring-emerald-500/30'
                  : 'border-stone-800 bg-stone-900/90'
              }`}
            >
              {/* Header Accordion */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl border ${
                      boss.isDefeated
                        ? 'border-stone-800 bg-stone-900 text-stone-500'
                        : 'border-emerald-500/30 bg-emerald-500/10 text-white'
                    }`}
                  >
                    {boss.badgeIcon}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">{boss.title}</h3>
                      {boss.isDefeated && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                          <CheckCircle className="w-3.5 h-3.5" /> Vaincu
                        </span>
                      )}
                      {isCurrentTarget && !boss.isDefeated && (
                        <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30 animate-pulse">
                          Objectif Actuel
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-3 text-xs text-stone-400 flex-wrap">
                      <span>Leader : <strong className="text-stone-200">{boss.leaderName}</strong></span>
                      <span>Lieu : {boss.location}</span>
                      <div className="flex items-center gap-1">
                        <span>Spécialité :</span>
                        {boss.typeSpecialty.map((t) => (
                          <TypeBadge key={t} type={t} size="xs" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Level Cap & Actions */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div
                    className={`rounded-xl border px-3 py-1.5 text-center ${
                      overLevelParty.length > 0 && !boss.isDefeated
                        ? 'border-rose-500/40 bg-rose-950/30 text-rose-300'
                        : 'border-stone-800 bg-stone-950 text-stone-300'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-stone-400">Cap de Niveau</div>
                    <div className="text-base font-mono font-bold">Niv. {boss.levelCap}</div>
                  </div>

                  <button
                    onClick={() => handleToggleDefeat(boss)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors ${
                      boss.isDefeated
                        ? 'border border-stone-700 bg-stone-800 text-stone-300 hover:bg-stone-700'
                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{boss.isDefeated ? 'Déjà Vaincu' : 'Marquer Vaincu'}</span>
                  </button>

                  <button
                    onClick={() => setExpandedBossId(isExpanded ? null : boss.id)}
                    className="rounded-xl border border-stone-800 bg-stone-950 p-2 text-stone-400 hover:text-white hover:border-stone-700"
                    title={isExpanded ? 'Réduire' : 'Voir les Pokémon du Boss'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Over level cap warning */}
              {overLevelParty.length > 0 && !boss.isDefeated && (
                <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    Attention : <strong>{overLevelParty.map((p) => p.nickname).join(', ')}</strong> dépasse(nt) le cap de niveau ({boss.levelCap}) !
                  </span>
                </div>
              )}

              {/* Expanded Boss Details & Team Preview */}
              {isExpanded && (
                <div className="border-t border-stone-800 bg-stone-950/60 p-4 sm:p-5 space-y-4">
                  {boss.rewards && (
                    <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium">
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Récompenses : {boss.rewards}</span>
                    </div>
                  )}

                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Composition de l'Équipe Adverse ({boss.team.length} Pokémon)
                  </h4>

                  {/* Boss Pokemon Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {boss.team.map((pokemon, idx) => {
                      const sp = findPokemonByNames(pokemon.frenchName || pokemon.name);
                      const spriteUrl = getPokemonSprite(sp, undefined, false);

                      return (
                        <div
                          key={idx}
                          className="flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/80 p-3 text-xs space-y-2 shadow-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="h-12 w-12 shrink-0 rounded-lg bg-stone-950 border border-stone-800/80 p-1 flex items-center justify-center">
                              <img
                                src={spriteUrl}
                                alt={pokemon.name}
                                referrerPolicy="no-referrer"
                                className="h-10 w-10 object-contain"
                                onError={(e) => {
                                  if (sp) {
                                    e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sp.id}.png`;
                                  }
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-white truncate">{pokemon.frenchName || pokemon.name}</div>
                              <div className="text-[11px] font-mono text-emerald-400">Niveau {pokemon.level}</div>
                              <div className="flex gap-1 mt-1">
                                {pokemon.types.map((t) => (
                                  <TypeBadge key={t} type={t} size="xs" />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Key Moves */}
                          {pokemon.moves && pokemon.moves.length > 0 && (
                            <div className="rounded-lg bg-stone-950/60 p-2 border border-stone-800/60 space-y-0.5">
                              <div className="text-[10px] text-stone-500 font-semibold uppercase">Attaques clés</div>
                              <div className="text-[11px] text-stone-300 font-medium truncate">
                                {pokemon.moves.join(' • ')}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Team Matchup Advantage Analyzer vs this Boss */}
                  {party.length > 0 && (
                    <div className="rounded-xl border border-stone-800 bg-stone-900/90 p-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-300">
                        <Swords className="w-4 h-4 text-emerald-400" />
                        <span>Avantages Tactiques de votre Équipe Active :</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {party.map((p) => {
                          // Check if player has type advantage against boss types
                          const hasAdvantage = boss.typeSpecialty.some((bossType) =>
                            p.types.some((myType) => getDefensiveMultiplier([bossType], myType) >= 2)
                          );
                          const isVulnerable = p.types.some((myType) =>
                            boss.typeSpecialty.some((bossType) => getDefensiveMultiplier([myType], bossType) >= 2)
                          );

                          return (
                            <span
                              key={p.id}
                              className={`rounded-lg px-2.5 py-1 text-xs border flex items-center gap-1.5 ${
                                hasAdvantage && !isVulnerable
                                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300 font-bold'
                                  : isVulnerable
                                  ? 'border-rose-500/40 bg-rose-950/30 text-rose-300'
                                  : 'border-stone-800 bg-stone-950 text-stone-400'
                              }`}
                            >
                              <span>{p.nickname} (Niv. {p.level})</span>
                              {hasAdvantage && !isVulnerable && <span className="text-emerald-400">✓ Avantage</span>}
                              {isVulnerable && <span className="text-rose-400 font-semibold">⚠ Vulnérable</span>}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
