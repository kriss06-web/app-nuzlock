import React, { useState } from 'react';
import { NuzlockeRun, LogEntry } from '../types';
import { ALL_TYPES } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import { Plus, BookOpen, Skull, Heart, Trophy, Activity, Sparkles, Clock, Trash2 } from 'lucide-react';

interface StatsDashboardProps {
  run: NuzlockeRun;
  onAddLog: (entry: Omit<LogEntry, 'id'>) => void;
  onDeleteLog: (logId: string) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  run,
  onAddLog,
  onDeleteLog,
}) => {
  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogDesc, setNewLogDesc] = useState('');
  const [newLogType, setNewLogType] = useState<LogEntry['type']>('note');
  const [showAddModal, setShowAddModal] = useState(false);

  // Computations
  const alivePokemons = [...run.party, ...run.pcBox];
  const allCaught = [...alivePokemons, ...run.graveyard];
  const totalCatches = allCaught.length;
  const totalDeaths = run.graveyard.length;

  const survivalRate = totalCatches > 0
    ? Math.round(((totalCatches - totalDeaths) / totalCatches) * 100)
    : 100;

  const defeatedBossesCount = run.bosses.filter((b) => b.isDefeated).length;
  const exploredRoutesCount = run.routes.filter((r) => r.status !== 'pending').length;

  // Type breakdown of caught pokemons
  const typeCounts: Record<string, number> = {};
  allCaught.forEach((p) => {
    (p.types || ['Normal']).forEach((t) => {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    });
  });

  const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;

    onAddLog({
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      type: newLogType,
      title: newLogTitle.trim(),
      description: newLogDesc.trim(),
    });

    setNewLogTitle('');
    setNewLogDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Key Performance Indicators */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-lg">
              📊
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Statistiques Globales & Journal de Bord de la Run
              </h2>
              <p className="text-xs text-stone-400">
                Progression, taux de survie, répartition élémentaire et chronologie de vos exploits.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md transition-colors self-start md:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Écrire dans le Journal</span>
          </button>
        </div>

        {/* 4 Cards KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-stone-800 bg-stone-950 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-400 uppercase">
              <Heart className="w-3.5 h-3.5 text-emerald-400" /> Taux de Survie
            </div>
            <div className="mt-1 text-2xl font-mono font-bold text-emerald-400">{survivalRate}%</div>
            <div className="text-[10px] text-stone-500 mt-0.5">{alivePokemons.length} vivants / {totalCatches} total</div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-400 uppercase">
              <Skull className="w-3.5 h-3.5 text-rose-500" /> Pertes Totales
            </div>
            <div className="mt-1 text-2xl font-mono font-bold text-rose-400">{totalDeaths}</div>
            <div className="text-[10px] text-stone-500 mt-0.5">{totalDeaths === 0 ? 'Aucune perte' : 'Au cimetière'}</div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-400 uppercase">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Boss & Arènes
            </div>
            <div className="mt-1 text-2xl font-mono font-bold text-amber-300">
              {defeatedBossesCount} / {run.bosses.length}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">Badges & Défis Z</div>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950 p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-stone-400 uppercase">
              <Activity className="w-3.5 h-3.5 text-sky-400" /> Zones Explorées
            </div>
            <div className="mt-1 text-2xl font-mono font-bold text-sky-300">
              {exploredRoutesCount} / {run.routes.length}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">Rencontres traitées</div>
          </div>
        </div>
      </div>

      {/* Grid: Type Distribution & Logbook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Type Distribution */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Répartition des Types Capturés
          </h3>

          {sortedTypes.length === 0 ? (
            <p className="text-xs text-stone-500">Aucun Pokémon capturé pour l'instant.</p>
          ) : (
            <div className="space-y-2">
              {sortedTypes.map(([typeName, count]) => {
                const percentage = Math.round((count / totalCatches) * 100);
                return (
                  <div key={typeName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <TypeBadge type={typeName as any} size="xs" />
                      <span className="font-mono text-stone-300">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-stone-950 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Chronological Logbook / Journal */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Journal d'Aventure ({run.logs?.length || 0} Entrées)
            </h3>
          </div>

          {/* Logs timeline */}
          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {(!run.logs || run.logs.length === 0) ? (
              <p className="text-xs text-stone-500">Le journal est encore vide.</p>
            ) : (
              run.logs.map((log) => (
                <div
                  key={log.id}
                  className="group relative flex items-start gap-3 rounded-xl border border-stone-800 bg-stone-950/70 p-3 text-xs"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-stone-900 border border-stone-800 text-sm">
                    {log.type === 'catch' && '⚡'}
                    {log.type === 'badge' && '🏆'}
                    {log.type === 'death' && '⚰️'}
                    {log.type === 'evolution' && '✨'}
                    {log.type === 'note' && '📝'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-white truncate">{log.title}</h4>
                      <span className="flex items-center gap-1 text-[10px] text-stone-500 font-mono shrink-0">
                        <Clock className="w-3 h-3" /> {log.timestamp}
                      </span>
                    </div>
                    {log.description && (
                      <p className="mt-1 text-stone-400 leading-relaxed">{log.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteLog(log.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-stone-500 hover:text-rose-400 transition-opacity"
                    title="Supprimer cette note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Add Log */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-stone-900 p-5 shadow-2xl text-stone-100 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" /> Ajouter une Entrée au Journal
            </h3>

            <form onSubmit={handleAddLogSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-stone-300 block mb-1">Catégorie</label>
                <select
                  value={newLogType}
                  onChange={(e) => setNewLogType(e.target.value as any)}
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="note">📝 Note / Anecdote d'Aventure</option>
                  <option value="badge">🏆 Badge / Victoire Majeure</option>
                  <option value="catch">⚡ Capture Exceptionnelle</option>
                  <option value="death">⚰️ Deuil / Moment Critique</option>
                  <option value="evolution">✨ Évolution / Méga-Évolution</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1">Titre de l'événement</label>
                <input
                  type="text"
                  required
                  value={newLogTitle}
                  onChange={(e) => setNewLogTitle(e.target.value)}
                  placeholder="Ex: Survie à 1 PV contre Cornélia !"
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1">Description / Détails</label>
                <textarea
                  rows={3}
                  value={newLogDesc}
                  onChange={(e) => setNewLogDesc(e.target.value)}
                  placeholder="Racontez ce qui s'est passé..."
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs text-stone-300 hover:bg-stone-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                >
                  Ajouter au Journal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
