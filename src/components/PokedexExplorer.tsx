import React, { useState } from 'react';
import { PokemonSpecies, PokemonType, POKEMON_TYPES } from '../types';
import { ALL_NATIONAL_POKEDEX } from '../data/pokedex';
import { getPokemonSprite, getPokemonStaticArtwork, searchPokemon } from '../data/pokemonData';
import { Search, Sparkles, Shield, Flame, Swords, Zap, Filter } from 'lucide-react';

interface PokedexExplorerProps {
  onAddPokemonToParty?: (species: PokemonSpecies) => void;
}

const TYPE_COLORS: Record<PokemonType, string> = {
  Acier: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
  Combat: 'bg-orange-600/20 text-orange-300 border-orange-600/40',
  Dragon: 'bg-indigo-600/20 text-indigo-300 border-indigo-600/40',
  Eau: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  Électrik: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  Fée: 'bg-pink-400/20 text-pink-300 border-pink-400/40',
  Feu: 'bg-red-500/20 text-red-300 border-red-500/40',
  Glace: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
  Insecte: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
  Normal: 'bg-stone-400/20 text-stone-300 border-stone-400/40',
  Plante: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  Poison: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  Psy: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
  Roche: 'bg-amber-600/20 text-amber-300 border-amber-600/40',
  Sol: 'bg-yellow-700/20 text-yellow-200 border-yellow-700/40',
  Spectre: 'bg-violet-700/20 text-violet-300 border-violet-700/40',
  Ténèbres: 'bg-stone-700/20 text-stone-300 border-stone-600/40',
  Vol: 'bg-sky-400/20 text-sky-300 border-sky-400/40',
};

export const PokedexExplorer: React.FC<PokedexExplorerProps> = ({ onAddPokemonToParty }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGen, setSelectedGen] = useState<number | 'all' | 'z'>('all');
  const [selectedType, setSelectedType] = useState<PokemonType | 'all'>('all');
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonSpecies | null>(ALL_NATIONAL_POKEDEX[0]);
  const [isShinyView, setIsShinyView] = useState(false);

  const filteredPokemon = searchPokemon(searchQuery, selectedGen, selectedType);

  const totalFilteredCount = filteredPokemon.length;

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-5 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">📖</span> Pokédex National Officiel
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              #0001 à #1025 (1G à 9G + Z)
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-400">
            Encyclopédie complète des 1025 espèces officielles de Pokémon, Méga-Évolutions et Formes Antiques de Kalos (Pokémon Z).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShinyView(!isShinyView)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              isShinyView
                ? 'border-amber-500/50 bg-amber-500/20 text-amber-300 shadow-md shadow-amber-500/10'
                : 'border-stone-700 bg-stone-800/80 text-stone-300 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {isShinyView ? 'Sprites Chromatiques (Shiny)' : 'Sprites Normaux'}
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom français, anglais ou n° Pokédex (ex: 658, Bulbizarre, Grenousse, Pêchaminus...)"
              className="w-full rounded-xl border border-stone-700 bg-stone-950 py-2 pl-9 pr-3 text-sm text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 min-w-[180px]">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full rounded-xl border border-stone-700 bg-stone-950 py-2 px-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">Tous les Types ({POKEMON_TYPES.length})</option>
              {POKEMON_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generation Quick Selector */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-stone-400 mr-1">Génération :</span>
          <button
            onClick={() => setSelectedGen('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedGen === 'all'
                ? 'bg-emerald-500 text-stone-950'
                : 'bg-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            Toutes (1025+)
          </button>
          {[
            { g: 1, label: '1G (Kanto)' },
            { g: 2, label: '2G (Johto)' },
            { g: 3, label: '3G (Hoenn)' },
            { g: 4, label: '4G (Sinnoh)' },
            { g: 5, label: '5G (Unys)' },
            { g: 6, label: '6G (Kalos)' },
            { g: 7, label: '7G (Alola)' },
            { g: 8, label: '8G (Galar/Hisui)' },
            { g: 9, label: '9G (Paldea)' },
          ].map((item) => (
            <button
              key={item.g}
              onClick={() => setSelectedGen(item.g)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedGen === item.g
                  ? 'bg-emerald-500 text-stone-950'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setSelectedGen('z')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedGen === 'z'
                ? 'bg-emerald-500 text-stone-950'
                : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900'
            }`}
          >
            ✨ Formes Z & Méga
          </button>
        </div>
      </div>

      {/* Main Grid: Explorer List + Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pokémon Grid */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>
              Affichage de <strong className="text-white">{totalFilteredCount}</strong> espèces
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[720px] overflow-y-auto pr-1">
            {filteredPokemon.map((poke) => {
              const isSelected = selectedPokemon?.id === poke.id && selectedPokemon?.name === poke.name;
              return (
                <div
                  key={poke.id + '-' + poke.name}
                  onClick={() => setSelectedPokemon(poke)}
                  className={`group relative flex flex-col items-center justify-between rounded-xl border p-3 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/30 shadow-md shadow-emerald-500/10'
                      : 'border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-850'
                  }`}
                >
                  {/* Top: Dex Number & Gen */}
                  <div className="w-full flex items-center justify-between text-[10px] text-stone-400">
                    <span className="font-mono font-bold">
                      {poke.id <= 1025 ? `#${poke.id.toString().padStart(3, '0')}` : 'SPÉCIAL'}
                    </span>
                    <span className="text-[9px] uppercase px-1 rounded bg-stone-800 text-stone-300">
                      {poke.generation}G
                    </span>
                  </div>

                  {/* Center Sprite */}
                  <div className="my-2 flex h-20 w-20 items-center justify-center">
                    <img
                      src={getPokemonSprite(poke, undefined, isShinyView)}
                      alt={poke.frenchName}
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = getPokemonStaticArtwork(poke.id);
                      }}
                    />
                  </div>

                  {/* Bottom: Name & Types */}
                  <div className="w-full space-y-1">
                    <div className="font-bold text-xs text-white truncate" title={poke.frenchName}>
                      {poke.frenchName}
                    </div>
                    <div className="text-[10px] text-stone-400 truncate">
                      {poke.name}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1 pt-1">
                      {poke.types.map((t) => (
                        <span
                          key={t}
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${
                            TYPE_COLORS[t] || 'bg-stone-800 text-stone-300'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Pokémon Detail Card */}
        <div className="lg:col-span-4">
          {selectedPokemon ? (
            <div className="sticky top-24 rounded-2xl border border-stone-800 bg-stone-900/90 p-5 backdrop-blur-md space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {selectedPokemon.id <= 1025
                      ? `N° ${selectedPokemon.id.toString().padStart(4, '0')}`
                      : 'Forme Spéciale'}
                  </span>
                  <h3 className="text-xl font-black text-white">{selectedPokemon.frenchName}</h3>
                  <div className="text-xs text-stone-400 italic">Nom international : {selectedPokemon.name}</div>
                </div>
                <div className="text-right">
                  <span className="rounded-md bg-stone-800 px-2 py-1 text-[11px] font-semibold text-stone-300">
                    Gen {selectedPokemon.generation}
                  </span>
                </div>
              </div>

              {/* Artwork & Animated Preview */}
              <div className="relative flex flex-col items-center justify-center rounded-xl border border-stone-800 bg-stone-950/80 p-4">
                <div className="h-36 w-36 flex items-center justify-center">
                  <img
                    src={getPokemonSprite(selectedPokemon, undefined, isShinyView)}
                    alt={selectedPokemon.frenchName}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = getPokemonStaticArtwork(selectedPokemon.id);
                    }}
                  />
                </div>
                {/* Types */}
                <div className="flex items-center gap-2 mt-3">
                  {selectedPokemon.types.map((t) => (
                    <span
                      key={t}
                      className={`rounded-lg px-3 py-1 text-xs font-bold border ${
                        TYPE_COLORS[t] || 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Base Stats Radar / Bars */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Statistiques de Base (BST:{' '}
                  <strong className="text-emerald-400">
                    {selectedPokemon.baseStats.hp +
                      selectedPokemon.baseStats.atk +
                      selectedPokemon.baseStats.def +
                      selectedPokemon.baseStats.spa +
                      selectedPokemon.baseStats.spd +
                      selectedPokemon.baseStats.spe}
                  </strong>
                  )
                </div>

                <div className="space-y-1.5 text-xs">
                  {[
                    { label: 'PV', val: selectedPokemon.baseStats.hp, color: 'bg-emerald-500' },
                    { label: 'Attaque', val: selectedPokemon.baseStats.atk, color: 'bg-amber-500' },
                    { label: 'Défense', val: selectedPokemon.baseStats.def, color: 'bg-blue-500' },
                    { label: 'Attaque Spé', val: selectedPokemon.baseStats.spa, color: 'bg-rose-500' },
                    { label: 'Défense Spé', val: selectedPokemon.baseStats.spd, color: 'bg-indigo-500' },
                    { label: 'Vitesse', val: selectedPokemon.baseStats.spe, color: 'bg-teal-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="grid grid-cols-12 items-center gap-2">
                      <span className="col-span-4 text-stone-400 truncate">{stat.label}</span>
                      <span className="col-span-2 text-right font-mono font-bold text-white">{stat.val}</span>
                      <div className="col-span-6 h-2 w-full rounded-full bg-stone-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${stat.color}`}
                          style={{ width: `${Math.min(100, (stat.val / 200) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {onAddPokemonToParty && (
                <button
                  type="button"
                  onClick={() => onAddPokemonToParty(selectedPokemon)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-stone-950 transition-colors hover:bg-emerald-400 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Swords className="w-4 h-4" />
                  Ajouter à l'aventure ({selectedPokemon.frenchName})
                </button>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 text-center text-xs text-stone-400">
              Sélectionnez un Pokémon dans la liste pour voir ses détails et ses statistiques de base.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
