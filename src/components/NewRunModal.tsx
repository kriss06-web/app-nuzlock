import React, { useState } from 'react';
import { NuzlockeRun } from '../types';
import { createInitialRun } from '../utils/storage';
import { X, Sparkles, Swords, User } from 'lucide-react';

interface NewRunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRun: (newRun: NuzlockeRun) => void;
}

export const NewRunModal: React.FC<NewRunModalProps> = ({
  isOpen,
  onClose,
  onCreateRun,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('Nuzlocke Pokémon Z #1');
  const [trainerName, setTrainerName] = useState('Calem');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRun = createInitialRun(title.trim(), trainerName.trim() || 'Dresseur');
    onCreateRun(newRun);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-stone-800 bg-stone-900 text-stone-100 shadow-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">Nouvelle Aventure Nuzlocke</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Nom de la Run / Défi
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Pokémon Z Hardcore Run"
              className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              Nom du Dresseur / Joueur
            </label>
            <input
              type="text"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              placeholder="Ex: Serena, Calem..."
              className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-3 text-xs text-stone-400 space-y-1">
            <div className="font-bold text-stone-300">Ce qui sera initialisé :</div>
            <div>• Liste complète des routes et lieux spéciaux de Kalos</div>
            <div>• Champions d'Arène, Boss Team Flare et Boss Pokémon Z</div>
            <div>• Panthéon et Boîte de stockage PC</div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-700 bg-stone-800 px-4 py-2 text-xs font-medium text-stone-300 hover:bg-stone-700"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500"
            >
              Commencer la Run
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
