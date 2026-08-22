import React from 'react';
import { NuzlockePokemon, PokemonType } from '../types';
import { ALL_TYPES, getDefensiveMultiplier, TYPE_COLORS } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import { ShieldCheck, ShieldAlert, Zap, AlertTriangle, Layers } from 'lucide-react';

interface TypeAnalyzerProps {
  party: NuzlockePokemon[];
}

export const TypeAnalyzer: React.FC<TypeAnalyzerProps> = ({ party }) => {
  if (party.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 text-center text-stone-400">
        <Layers className="mx-auto h-12 w-12 text-stone-600 mb-2" />
        <p className="font-semibold text-stone-300">Aucun Pokémon dans l'équipe active</p>
        <p className="text-xs text-stone-500 mt-1">Ajoutez des Pokémon pour analyser la balance des types de votre équipe.</p>
      </div>
    );
  }

  // Build matrix: for each attacking type, count how many pokemon in party are weak (x2, x4), resistant (x0.5, x0.25), immune (x0)
  const defensiveMatrix = ALL_TYPES.map((attackType) => {
    let weakCount = 0;
    let resistCount = 0;
    let immuneCount = 0;
    let neutralCount = 0;

    party.forEach((p) => {
      const mult = getDefensiveMultiplier(p.types || ['Normal'], attackType);
      if (mult >= 2) weakCount++;
      else if (mult === 0) immuneCount++;
      else if (mult < 1) resistCount++;
      else neutralCount++;
    });

    const netScore = resistCount + immuneCount * 1.5 - weakCount;

    return {
      type: attackType,
      weakCount,
      resistCount,
      immuneCount,
      neutralCount,
      netScore,
    };
  });

  // Severe weaknesses (>= 3 weak and 0 immunities)
  const criticalWeaknesses = defensiveMatrix.filter((d) => d.weakCount >= 3 && d.resistCount === 0 && d.immuneCount === 0);
  const goodResistances = defensiveMatrix.filter((d) => d.resistCount + d.immuneCount >= 3);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30 text-lg">
            🛡️
          </span>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Analyseur de Couverture & Faiblesses d'Équipe
            </h2>
            <p className="text-xs text-stone-400">
              Matrice défensive complète pour éviter de perdre vos membres sur une faiblesse commune non couverte.
            </p>
          </div>
        </div>

        {/* Highlight Vulnerabilities / Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {criticalWeaknesses.length > 0 ? (
            <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Faiblesses Critiques (Aucune résistance dans l'équipe) :</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {criticalWeaknesses.map((w) => (
                  <span key={w.type} className="inline-flex items-center gap-1">
                    <TypeBadge type={w.type} size="xs" />
                    <span className="text-[11px] text-rose-400 font-bold">({w.weakCount} vulnérables)</span>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Excellente Balance Défensive !</span>
              </div>
              <p className="text-xs text-stone-400">
                Aucun type élémentaire ne menace 3+ membres de l'équipe sans qu'au moins un autre ne puisse tanker le coup.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
              <Zap className="w-4 h-4 text-sky-400" />
              <span>Piliers Défensifs de l'Équipe (≥3 Résistances) :</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {goodResistances.map((r) => (
                <span key={r.type} className="inline-flex items-center gap-1">
                  <TypeBadge type={r.type} size="xs" />
                  <span className="text-[11px] text-sky-300 font-bold">({r.resistCount + r.immuneCount}x)</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full 18-Type Defensive Table */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 overflow-hidden shadow-lg">
        <div className="p-4 bg-stone-950 border-b border-stone-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Matrice Défensive Face aux 18 Types
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950/60 text-stone-400 uppercase text-[10px] tracking-wider border-b border-stone-800">
              <tr>
                <th className="p-3">Type Attaquant</th>
                <th className="p-3 text-center">Faiblesses (2x/4x)</th>
                <th className="p-3 text-center">Résistances (0.5x)</th>
                <th className="p-3 text-center">Immunités (0x)</th>
                <th className="p-3 text-center">Détail par Membre d'Équipe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {defensiveMatrix.map((row) => {
                return (
                  <tr key={row.type} className="hover:bg-stone-950/40 transition-colors">
                    <td className="p-3 font-semibold">
                      <TypeBadge type={row.type} size="xs" />
                    </td>

                    <td className="p-3 text-center">
                      {row.weakCount > 0 ? (
                        <span className="inline-flex items-center justify-center rounded-md bg-rose-500/20 px-2 py-0.5 font-mono font-bold text-rose-300 border border-rose-500/30">
                          {row.weakCount}
                        </span>
                      ) : (
                        <span className="text-stone-600">-</span>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      {row.resistCount > 0 ? (
                        <span className="inline-flex items-center justify-center rounded-md bg-sky-500/20 px-2 py-0.5 font-mono font-bold text-sky-300 border border-sky-500/30">
                          {row.resistCount}
                        </span>
                      ) : (
                        <span className="text-stone-600">-</span>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      {row.immuneCount > 0 ? (
                        <span className="inline-flex items-center justify-center rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono font-bold text-emerald-300 border border-emerald-500/30">
                          {row.immuneCount}
                        </span>
                      ) : (
                        <span className="text-stone-600">-</span>
                      )}
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                        {party.map((p) => {
                          const mult = getDefensiveMultiplier(p.types || ['Normal'], row.type);
                          if (mult === 1) return null; // Only show non-neutrals

                          return (
                            <span
                              key={p.id}
                              className={`rounded px-1.5 py-0.5 text-[10px] font-medium border ${
                                mult >= 2
                                  ? 'border-rose-500/40 bg-rose-950/30 text-rose-300 font-bold'
                                  : mult === 0
                                  ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 font-bold'
                                  : 'border-sky-500/30 bg-sky-950/30 text-sky-300'
                              }`}
                            >
                              {p.nickname} : {mult === 0 ? 'Immunisé (0x)' : `${mult}x`}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
