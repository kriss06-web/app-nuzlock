import React, { useState } from 'react';
import { NuzlockePokemon, PokemonType } from '../types';
import { PokemonCard } from './PokemonCard';
import { ALL_TYPES } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import { Search, Plus, Archive, Filter, ArrowUpDown } from 'lucide-react';

interface BoxViewProps {
  pcBox: NuzlockePokemon[];
  partyCount: number;
  onAddPokemon: () => void;
  onEditPokemon: (pokemon: NuzlockePokemon) => void;
  onMoveToParty: (pokemon: NuzlockePokemon) => void;
  onDeclareDead: (pokemon: NuzlockePokemon) => void;
  onLevelChange: (pokemon: NuzlockePokemon, delta: number) => void;
}

export const BoxView: React.FC<BoxViewProps> = ({
  pcBox,
  partyCount,
  onAddPokemon,
  onEditPokemon,
  onMoveToParty,
  onDeclareDead,
  onLevelChange,
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PokemonType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'level_desc' | 'level_asc' | 'name' | 'recent'>('recent');

  // Filter & sort
  const filtered = pcBox.filter((p) => {
    const matchesSearch =
      p.nickname.toLowerCase().includes(search.toLowerCase()) ||
      p.speciesFrenchName.toLowerCase().includes(search.toLowerCase()) ||
      p.speciesName.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === 'ALL' || (p.types && p.types.includes(typeFilter));

    return matchesSearch && matchesType;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'level_desc') return b.level - a.level;
    if (sortBy === 'level_asc') return a.level - b.level;
    if (sortBy === 'name') return (a.nickname || a.speciesFrenchName).localeCompare(b.nickname || b.speciesFrenchName);
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Controls */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30">
                📦
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Boîte PC / Réserve ({pcBox.length} Pokémon en vie)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              Pokémon capturés en réserve, prêts à intégrer l'équipe en cas de stratégie ou de remplacement.
            </p>
          </div>

          <button
            onClick={onAddPokemon}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-md hover:bg-emerald-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter un Pokémon au PC</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-stone-800/80">
          {/* Search */}
          <div className="sm:col-span-5 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par surnom, espèce..."
              className="w-full rounded-lg border border-stone-700 bg-stone-950 py-1.5 pl-9 pr-3 text-xs text-white placeholder-stone-500 focus:border-sky-500 focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="sm:col-span-4 flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full rounded-lg border border-stone-700 bg-stone-950 px-2.5 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="ALL">Tous les types ({pcBox.length})</option>
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>
                  Type {t}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="sm:col-span-3 flex items-center gap-1.5">
            <ArrowUpDown className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-lg border border-stone-700 bg-stone-950 px-2.5 py-1.5 text-xs text-white focus:border-sky-500 focus:outline-none"
            >
              <option value="recent">Plus récents</option>
              <option value="level_desc">Niveau (Décroissant)</option>
              <option value="level_asc">Niveau (Croissant)</option>
              <option value="name">Nom A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Boxed Pokemons */}
      {filtered.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/40 p-8 text-center">
          <Archive className="h-12 w-12 text-stone-600 mb-3" />
          <h3 className="text-base font-bold text-stone-300">
            {pcBox.length === 0 ? 'La boîte PC est vide' : 'Aucun Pokémon ne correspond aux filtres'}
          </h3>
          <p className="mt-1 text-xs text-stone-500 max-w-sm">
            {pcBox.length === 0
              ? 'Toutes vos captures vivantes sont actuellement dans l\'équipe active ou vous n\'avez pas encore stocké de remplaçants.'
              : 'Essayez de réinitialiser la recherche ou de changer de filtre de type.'}
          </p>
          {pcBox.length === 0 && (
            <button
              onClick={onAddPokemon}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-800 px-3.5 py-1.5 text-xs font-semibold text-stone-200 hover:bg-stone-700"
            >
              <Plus className="w-3.5 h-3.5" /> Enregistrer une capture
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onEdit={onEditPokemon}
              onMoveToParty={onMoveToParty}
              onDeclareDead={onDeclareDead}
              onLevelChange={onLevelChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
