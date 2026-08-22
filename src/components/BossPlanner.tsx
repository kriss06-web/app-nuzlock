import React, { useState } from 'react';
import { BossEncounter, NuzlockePokemon } from '../types';
import { TypeBadge } from './TypeBadge';
import { analyzeDefensiveWeaknesses, getDefensiveMultiplier } from '../data/typeChart';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, ShieldAlert, Swords, ChevronDown, ChevronUp, MapPin, Award, Sparkles } from 'lucide-react';

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
    if (categoryFilter === 'linear') return b.category === 'gym';
    if (categoryFilter === 'free_order') return b.category === 'special' || b.notes?.includes('Ordre libre');
    if (categoryFilter === 'pending') return !b.isDefeated;
    if (categoryFilter === 'defeated') return b.isDefeated;
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
                👑
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Les 12 Régents & Bastions de Pokémon Z ({defeatedCount} / {bosses.length} Vaincus)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              Suivez votre progression contre les 12 Régents de Kalos Antique, leurs bastions et leurs spécialités de types.
            </p>
          </div>

          {/* Next Target Card */}
          {nextBoss && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3.5 flex items-center gap-3">
              <div className="text-3xl">{nextBoss.badgeIcon}</div>
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  Prochain Régent à Affronter
                </div>
                <div className="text-sm font-bold text-white truncate">{nextBoss.title}</div>
                <div className="text-xs text-stone-300">
                  Lieu : <strong className="text-stone-200">{nextBoss.location}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-800">
          {[
            { id: 'ALL', label: `Tous (${bosses.length})` },
            { id: 'linear', label: 'Régents 1 à 10' },
            { id: 'free_order', label: 'Régents 11 & 12 (Ordre libre)' },
            { id: 'pending', label: `À vaincre (${bosses.length - defeatedCount})` },
            { id: 'defeated', label: `Vaincus (${defeatedCount})` },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
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
      <div className="space-y-3.5">
        {filteredBosses.map((boss) => {
          const isExpanded = expandedBossId === boss.id;
          const isCurrentTarget = nextBoss?.id === boss.id;

          // Compute weaknesses against boss type specialties
          const weaknesses = analyzeDefensiveWeaknesses(boss.typeSpecialty);
          const effectiveTypes = weaknesses.weaknesses;

          return (
            <div
              key={boss.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                boss.isDefeated
                  ? 'border-stone-800/80 bg-stone-950/60 opacity-90'
                  : isCurrentTarget
                  ? 'border-emerald-500/60 bg-stone-900 shadow-xl ring-1 ring-emerald-500/30'
                  : 'border-stone-800 bg-stone-900/90'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5">
                <div className="flex items-center gap-3.5 min-w-0">
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
                      
                      {boss.notes && (
                        <span className="rounded-md bg-purple-500/20 px-2 py-0.5 text-[11px] font-semibold text-purple-300 border border-purple-500/30">
                          {boss.notes}
                        </span>
                      )}

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

                    <div className="mt-1.5 flex items-center gap-3 text-xs text-stone-400 flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        <span>Lieu : <strong className="text-stone-200">{boss.location}</strong></span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-stone-400">Spécialité :</span>
                        {boss.typeSpecialty.map((t) => (
                          <TypeBadge key={t} type={t} size="xs" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions & Buttons */}
                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  <button
                    onClick={() => handleToggleDefeat(boss)}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
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
                    className="rounded-xl border border-stone-800 bg-stone-950 p-2 text-stone-400 hover:text-white hover:border-stone-700 cursor-pointer"
                    title={isExpanded ? 'Réduire' : 'Voir les conseils tactiques'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Tactical Advice vs this Boss */}
              {isExpanded && (
                <div className="border-t border-stone-800 bg-stone-950/70 p-4 sm:p-5 space-y-4">
                  {/* Effective types against this Regent */}
                  <div className="rounded-xl border border-stone-800/80 bg-stone-900/60 p-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-300">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Types Super Efficaces conseillés contre {boss.leaderName} :</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {effectiveTypes.length > 0 ? (
                        effectiveTypes.map((t) => (
                          <TypeBadge key={t} type={t} size="sm" />
                        ))
                      ) : (
                        <span className="text-xs text-stone-400">Aucune faiblesse directe</span>
                      )}
                    </div>
                  </div>

                  {/* Team Matchup Advantage Analyzer vs this Boss */}
                  {party.length > 0 && (
                    <div className="rounded-xl border border-stone-800/80 bg-stone-900/60 p-3.5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-300">
                        <Swords className="w-4 h-4 text-emerald-400" />
                        <span>Avantages & Vulnérabilités de votre Équipe Active :</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {party.map((p) => {
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
                                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-semibold'
                                  : isVulnerable
                                  ? 'border-rose-500/40 bg-rose-950/40 text-rose-300'
                                  : 'border-stone-800 bg-stone-950 text-stone-400'
                              }`}
                            >
                              <span>{p.nickname} (Niv. {p.level})</span>
                              {hasAdvantage && !isVulnerable && <span className="text-emerald-400">✓ Super Efficace</span>}
                              {isVulnerable && <span className="text-rose-400 font-medium">⚠ Vulnérable</span>}
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
