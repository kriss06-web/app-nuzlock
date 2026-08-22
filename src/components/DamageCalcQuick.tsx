import React, { useState } from 'react';
import { PokemonType } from '../types';
import { ALL_TYPES, getDefensiveMultiplier } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import { Swords, Shield, Zap, Sparkles } from 'lucide-react';

export const DamageCalcQuick: React.FC = () => {
  const [attackerType, setAttackerType] = useState<PokemonType>('Feu');
  const [defenderType1, setDefenderType1] = useState<PokemonType>('Plante');
  const [defenderType2, setDefenderType2] = useState<PokemonType | 'Aucun'>('Poison');
  const [isStab, setIsStab] = useState(true);
  const [basePower, setBasePower] = useState(90);

  const defenderTypes = defenderType2 !== 'Aucun' ? [defenderType1, defenderType2] : [defenderType1];
  const effectiveness = getDefensiveMultiplier(defenderTypes, attackerType);

  let effectLabel = 'Neutre (1x)';
  let effectColor = 'text-stone-300 border-stone-700 bg-stone-900';

  if (effectiveness === 4) {
    effectLabel = 'ULTRA EFFICACE (4x) ! 💥💥';
    effectColor = 'text-rose-400 border-rose-500/50 bg-rose-950/40 animate-pulse';
  } else if (effectiveness === 2) {
    effectLabel = 'Super Efficace (2x) ! 💥';
    effectColor = 'text-amber-400 border-amber-500/50 bg-amber-950/40';
  } else if (effectiveness === 0.5) {
    effectLabel = 'Peu Efficace (0.5x) 🛡️';
    effectColor = 'text-sky-400 border-sky-500/50 bg-sky-950/40';
  } else if (effectiveness === 0.25) {
    effectLabel = 'Très Peu Efficace (0.25x) 🛡️🛡️';
    effectColor = 'text-indigo-400 border-indigo-500/50 bg-indigo-950/40';
  } else if (effectiveness === 0) {
    effectLabel = 'Inutile / Immunisé (0x) 🚫';
    effectColor = 'text-stone-500 border-stone-800 bg-stone-950';
  }

  const stabMultiplier = isStab ? 1.5 : 1.0;
  const totalPower = Math.round(basePower * effectiveness * stabMultiplier);

  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-lg space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30 text-lg">
          ⚔️
        </span>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Calculateur d'Efficacité & Matchup Express
          </h2>
          <p className="text-xs text-stone-400">
            Vérifiez immédiatement les multiplicateurs de dégâts avant de risquer votre Pokémon en combat.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Attacking side */}
        <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
            <Swords className="w-4 h-4" /> Type de l'Attaque & STAB
          </div>

          <div>
            <label className="text-[11px] text-stone-400 block mb-1">Type de la Capacité</label>
            <select
              value={attackerType}
              onChange={(e) => setAttackerType(e.target.value as any)}
              className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Puissance de base</label>
              <input
                type="number"
                value={basePower}
                onChange={(e) => setBasePower(Number(e.target.value))}
                className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200">
                <input
                  type="checkbox"
                  checked={isStab}
                  onChange={(e) => setIsStab(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-0"
                />
                <span className="font-semibold">STAB (+50%)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Defending side */}
        <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-wider">
            <Shield className="w-4 h-4" /> Types du Défenseur
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Type 1</label>
              <select
                value={defenderType1}
                onChange={(e) => setDefenderType1(e.target.value as any)}
                className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                {ALL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Type 2 (Optionnel)</label>
              <select
                value={defenderType2}
                onChange={(e) => setDefenderType2(e.target.value as any)}
                className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="Aucun">-- Aucun --</option>
                {ALL_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-1.5 pt-1">
            <TypeBadge type={defenderType1} size="sm" />
            {defenderType2 !== 'Aucun' && <TypeBadge type={defenderType2} size="sm" />}
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className={`rounded-xl border p-4 text-center space-y-1 ${effectColor}`}>
        <div className="text-[11px] uppercase font-bold tracking-wider opacity-80">
          Résultat de l'Affrontement
        </div>
        <div className="text-lg font-bold font-mono">{effectLabel}</div>
        <div className="text-xs font-medium opacity-90">
          Multiplicateur d'efficacité : <strong>{effectiveness}x</strong> • Puissance équivalente estimée : <strong>{totalPower}</strong>
        </div>
      </div>
    </div>
  );
};
