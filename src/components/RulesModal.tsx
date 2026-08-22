import React, { useState } from 'react';
import { NuzlockeRules } from '../types';
import { X, Shield, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  rules: NuzlockeRules;
  onSaveRules: (rules: NuzlockeRules) => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  rules,
  onSaveRules,
}) => {
  if (!isOpen) return null;

  const [currentRules, setCurrentRules] = useState<NuzlockeRules>({ ...rules });
  const [newCustomRule, setNewCustomRule] = useState('');

  const handleToggle = (key: keyof Omit<NuzlockeRules, 'customRules' | 'megaEvolutionRule' | 'zygardeCellRule'>) => {
    setCurrentRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddCustomRule = () => {
    if (!newCustomRule.trim()) return;
    setCurrentRules((prev) => ({
      ...prev,
      customRules: [...prev.customRules, newCustomRule.trim()],
    }));
    setNewCustomRule('');
  };

  const handleRemoveCustomRule = (idx: number) => {
    setCurrentRules((prev) => ({
      ...prev,
      customRules: prev.customRules.filter((_, i) => i !== idx),
    }));
  };

  const applyHardcorePreset = () => {
    setCurrentRules({
      standardNuzlocke: true,
      levelCap: true,
      dupesClause: true,
      shinyClause: true,
      setMode: true,
      noBagItemsInBattle: true,
      noLegendaries: true,
      megaEvolutionRule: 'one_per_battle',
      customRules: [
        'Mode DÉFINI (Set Mode) obligatoire en combat',
        'Objets de soin interdits pendant les combats de boss (Sac bloqué)',
        'Cap de niveau strict selon le Pokémon le plus fort du champion',
        'Mort définitive dès qu\'un Pokémon tombe K.O.',
      ],
    });
  };

  const applyStandardPreset = () => {
    setCurrentRules({
      standardNuzlocke: true,
      levelCap: false,
      dupesClause: true,
      shinyClause: true,
      setMode: false,
      noBagItemsInBattle: false,
      noLegendaries: false,
      megaEvolutionRule: 'unrestricted',
      customRules: [
        'Mort définitive si KO',
        '1er Pokémon rencontré par zone uniquement',
        'Surnommer tous ses Pokémon',
      ],
    });
  };

  const handleSave = () => {
    onSaveRules(currentRules);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-800 bg-stone-900 text-stone-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              📜
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Règlement du Nuzlocke Pokémon Z</h2>
              <p className="text-xs text-stone-400">Configurez les clauses officielles et vos contraintes personnalisées</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-400">Pré-réglages rapides :</span>
            <button
              onClick={applyHardcorePreset}
              className="rounded-lg border border-rose-500/40 bg-rose-950/30 px-3 py-1 text-xs font-bold text-rose-300 hover:bg-rose-900/40"
            >
              🔥 Hardcore Nuzlocke
            </button>
            <button
              onClick={applyStandardPreset}
              className="rounded-lg border border-emerald-500/40 bg-emerald-950/30 px-3 py-1 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40"
            >
              🌿 Standard Nuzlocke
            </button>
          </div>

          {/* Toggle Switches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'standardNuzlocke', label: 'Règles Fondamentales (KO = Mort + 1er par zone)', desc: 'Le cœur du Nuzlocke' },
              { key: 'levelCap', label: 'Cap de Niveau Strict (Level Cap)', desc: 'Ne pas dépasser le Pokémon du champion' },
              { key: 'setMode', label: 'Mode Combat "Défini" (Set Mode)', desc: 'Pas de changement gratuit après un KO adverse' },
              { key: 'noBagItemsInBattle', label: 'Objets en combat interdits', desc: 'Pas de potions ni rappels en combat' },
              { key: 'dupesClause', label: 'Clause Doublon (Species/Dupes Clause)', desc: 'Permet de repasser une route si l\'espèce est déjà capturée' },
              { key: 'shinyClause', label: 'Clause Shiny', desc: 'Capture libre si un chromatique apparaît' },
              { key: 'noLegendaries', label: 'Bannissement des Légendaires', desc: 'Interdit Xerneas, Yveltal, Mewtwo...' },
            ].map((rule) => {
              const isChecked = currentRules[rule.key as keyof typeof currentRules] as boolean;
              return (
                <div
                  key={rule.key}
                  onClick={() => handleToggle(rule.key as any)}
                  className={`flex cursor-pointer items-start justify-between rounded-xl border p-3 transition-colors ${
                    isChecked
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold text-white">{rule.label}</div>
                    <div className="text-[11px] text-stone-400">{rule.desc}</div>
                  </div>
                  <div
                    className={`h-4 w-4 shrink-0 rounded-full border flex items-center justify-center mt-0.5 ${
                      isChecked
                        ? 'border-emerald-400 bg-emerald-500 text-stone-950'
                        : 'border-stone-600 bg-stone-900'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3 h-3 text-stone-950" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mega Evolution Rule */}
          <div className="rounded-xl border border-stone-800 bg-stone-950 p-3 space-y-1.5">
            <label className="text-xs font-bold text-white block">Règle de Méga-Évolution & Cristal Z</label>
            <select
              value={currentRules.megaEvolutionRule}
              onChange={(e) =>
                setCurrentRules((prev) => ({
                  ...prev,
                  megaEvolutionRule: e.target.value as any,
                }))
              }
              className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="one_per_battle">1 Méga-Évolution par combat autorisée (Standard)</option>
              <option value="mirror_boss_only">Miroir uniquement (Seulement si le boss méga-évolue)</option>
              <option value="banned">Méga-Évolution bannie</option>
              <option value="unrestricted">Libre / Sans restriction</option>
            </select>
          </div>

          {/* Custom Rules */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Règles Personnalisées ({currentRules.customRules.length})
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newCustomRule}
                onChange={(e) => setNewCustomRule(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomRule()}
                placeholder="Ex: Mono-type Poison, Interdiction d'utiliser les CT..."
                className="flex-1 rounded-lg border border-stone-700 bg-stone-950 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddCustomRule}
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {currentRules.customRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-stone-800 bg-stone-950/80 px-3 py-1.5 text-xs text-stone-200"
                >
                  <span>• {rule}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustomRule(idx)}
                    className="text-stone-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-stone-800 p-4 bg-stone-950/80">
          <button
            onClick={onClose}
            className="rounded-lg border border-stone-700 bg-stone-800 px-4 py-2 text-xs font-medium text-stone-300 hover:bg-stone-700"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500"
          >
            Enregistrer le Règlement
          </button>
        </div>
      </div>
    </div>
  );
};
