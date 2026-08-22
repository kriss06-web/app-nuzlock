import React, { useState } from 'react';
import { NuzlockePokemon, PokemonSpecies, PokemonType, DeathRecord, RouteEncounter } from '../types';
import { POKEMON_DATABASE, searchPokemon, getPokemonSprite, POKEMON_Z_REGIONAL_PRESETS, ALL_STARTERS_CATALOG } from '../data/pokemonData';
import { NATURES, POPULAR_ITEMS } from '../data/natures';
import { ALL_TYPES } from '../data/typeChart';
import { TypeBadge } from './TypeBadge';
import { X, Search, Sparkles, Skull, Heart, Archive, Shield, RefreshCw, Flame } from 'lucide-react';

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pokemon: NuzlockePokemon) => void;
  onDelete?: (pokemonId: string) => void;
  initialPokemon?: NuzlockePokemon | null;
  routes: RouteEncounter[];
  defaultRouteId?: string;
  defaultStatus?: 'party' | 'boxed' | 'dead';
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialPokemon,
  routes,
  defaultRouteId,
  defaultStatus = 'party',
}) => {
  if (!isOpen) return null;

  // Search & Species
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<PokemonSpecies | null>(() => {
    if (initialPokemon) {
      return POKEMON_DATABASE.find(p => p.name === initialPokemon.speciesName || p.frenchName === initialPokemon.speciesFrenchName) || null;
    }
    return POKEMON_DATABASE[0]; // Starter default
  });

  // Custom Typing Support (Pokemon Z Fangame form overrides)
  const [type1, setType1] = useState<PokemonType>(() => {
    if (initialPokemon?.types?.[0]) return initialPokemon.types[0];
    return selectedSpecies?.types?.[0] || 'Normal';
  });
  const [type2, setType2] = useState<PokemonType | 'None'>(() => {
    if (initialPokemon?.types?.[1]) return initialPokemon.types[1];
    return selectedSpecies?.types?.[1] || 'None';
  });
  const [isCustomTypeOverridden, setIsCustomTypeOverridden] = useState<boolean>(() => {
    if (initialPokemon?.types) {
      const defaultT = selectedSpecies?.types || [];
      return (
        initialPokemon.types[0] !== defaultT[0] ||
        (initialPokemon.types[1] || 'None') !== (defaultT[1] || 'None')
      );
    }
    return false;
  });

  // Starter / Gen selector filter
  const [starterGenFilter, setStarterGenFilter] = useState<number | 'all' | 'z'>('all');
  const [showStartersPicker, setShowStartersPicker] = useState<boolean>(false);

  // Basic info
  const [nickname, setNickname] = useState(initialPokemon?.nickname || '');
  const [gender, setGender] = useState<'M' | 'F' | 'N'>(initialPokemon?.gender || 'M');
  const [level, setLevel] = useState<number>(initialPokemon?.level || 5);
  const [nature, setNature] = useState<string>(initialPokemon?.nature || 'Hardi');
  const [ability, setAbility] = useState<string>(initialPokemon?.ability || '');
  const [heldItem, setHeldItem] = useState<string>(initialPokemon?.heldItem || '');
  const [isShiny, setIsShiny] = useState<boolean>(initialPokemon?.isShiny || false);
  const [isStarter, setIsStarter] = useState<boolean>(initialPokemon?.isStarter || false);
  const [isGift, setIsGift] = useState<boolean>(initialPokemon?.isGift || false);
  const [isMvp, setIsMvp] = useState<boolean>(initialPokemon?.isMvp || false);
  const [customSpriteUrl, setCustomSpriteUrl] = useState<string>(initialPokemon?.customSpriteUrl || '');

  // Moves
  const [move1, setMove1] = useState(initialPokemon?.moves?.[0] || '');
  const [move2, setMove2] = useState(initialPokemon?.moves?.[1] || '');
  const [move3, setMove3] = useState(initialPokemon?.moves?.[2] || '');
  const [move4, setMove4] = useState(initialPokemon?.moves?.[3] || '');

  // Route encounter
  const [routeId, setRouteId] = useState<string>(initialPokemon?.encounterRouteId || defaultRouteId || (routes[0]?.id || 'starter'));
  const [metLevel, setMetLevel] = useState<number>(initialPokemon?.metLevel || 5);
  const [metDate, setMetDate] = useState<string>(initialPokemon?.metDate || new Date().toLocaleDateString('fr-FR'));

  // Status
  const [status, setStatus] = useState<'party' | 'boxed' | 'dead'>(initialPokemon?.status || defaultStatus);

  // Death details
  const [deathKiller, setDeathKiller] = useState(initialPokemon?.deathDetails?.killerName || '');
  const [deathRoute, setDeathRoute] = useState(initialPokemon?.deathDetails?.route || '');
  const [deathCause, setDeathCause] = useState(initialPokemon?.deathDetails?.cause || '');
  const [deathLevel, setDeathLevel] = useState<number>(initialPokemon?.deathDetails?.levelAtDeath || level);
  const [deathEulogy, setDeathEulogy] = useState(initialPokemon?.deathDetails?.eulogy || '');
  const [deathKillerType, setDeathKillerType] = useState<PokemonType | ''>(initialPokemon?.deathDetails?.killerType || '');

  // Stats
  const [hp, setHp] = useState<number>(initialPokemon?.stats?.hp || 20);
  const [atk, setAtk] = useState<number>(initialPokemon?.stats?.atk || 10);
  const [def, setDef] = useState<number>(initialPokemon?.stats?.def || 10);
  const [spa, setSpa] = useState<number>(initialPokemon?.stats?.spa || 10);
  const [spd, setSpd] = useState<number>(initialPokemon?.stats?.spd || 10);
  const [spe, setSpe] = useState<number>(initialPokemon?.stats?.spe || 10);

  const searchResults = searchPokemon(searchQuery);

  // Effective Active Types
  const currentTypes: PokemonType[] = type2 === 'None' || type2 === type1 ? [type1] : [type1, type2];
  const spritePreview = getPokemonSprite(selectedSpecies || undefined, customSpriteUrl, isShiny);

  const handleSelectSpecies = (sp: PokemonSpecies) => {
    setSelectedSpecies(sp);
    if (!nickname) {
      setNickname(sp.frenchName);
    }
    // Update default types if user hasn't locked custom override
    if (!isCustomTypeOverridden) {
      setType1(sp.types[0] || 'Normal');
      setType2(sp.types[1] || 'None');
    }
  };

  const handleApplyZFormPreset = (preset: typeof POKEMON_Z_REGIONAL_PRESETS[0]) => {
    setType1(preset.types[0]);
    setType2(preset.types[1] || 'None');
    setIsCustomTypeOverridden(true);
    if (preset.originalSpeciesId) {
      const match = POKEMON_DATABASE.find(p => p.id === preset.originalSpeciesId);
      if (match) {
        setSelectedSpecies(match);
        if (!nickname || nickname === selectedSpecies?.frenchName) {
          setNickname(preset.frenchName);
        }
      }
    }
  };

  const handleResetTypesToDefault = () => {
    if (selectedSpecies) {
      setType1(selectedSpecies.types[0] || 'Normal');
      setType2(selectedSpecies.types[1] || 'None');
      setIsCustomTypeOverridden(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedRoute = routes.find(r => r.id === routeId);

    let deathDetails: DeathRecord | undefined = undefined;
    if (status === 'dead') {
      deathDetails = {
        route: deathRoute || matchedRoute?.name || 'Inconnue',
        killerName: deathKiller || 'Adversaire Inconnu',
        killerType: (deathKillerType as PokemonType) || undefined,
        levelAtDeath: deathLevel || level,
        cause: deathCause || 'K.O. en combat',
        date: new Date().toLocaleDateString('fr-FR'),
        eulogy: deathEulogy || undefined,
        badgeCountAtDeath: 0,
      };
    }

    const pokemonData: NuzlockePokemon = {
      id: initialPokemon?.id || 'p-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      speciesName: selectedSpecies?.name || 'Unknown',
      speciesFrenchName: selectedSpecies?.frenchName || selectedSpecies?.name || 'Inconnu',
      nickname: nickname.trim() || selectedSpecies?.frenchName || 'Pokémon',
      gender,
      types: currentTypes,
      level: Number(level) || 1,
      nature,
      ability: ability.trim(),
      heldItem: heldItem.trim() || undefined,
      moves: [move1.trim(), move2.trim(), move3.trim(), move4.trim()].filter(Boolean),
      status,
      encounterRouteId: routeId,
      encounterRouteName: matchedRoute?.name || 'Route personnalisée',
      metLevel: Number(metLevel) || 1,
      metDate,
      isShiny,
      isStarter,
      isGift,
      isMvp,
      customSpriteUrl: customSpriteUrl.trim() || undefined,
      stats: {
        hp: Number(hp) || 0,
        atk: Number(atk) || 0,
        def: Number(def) || 0,
        spa: Number(spa) || 0,
        spd: Number(spd) || 0,
        spe: Number(spe) || 0,
      },
      deathDetails,
    };

    onSave(pokemonData);
    onClose();
  };

  const filteredStarters = ALL_STARTERS_CATALOG.filter(s => {
    if (starterGenFilter === 'all') return true;
    if (starterGenFilter === 'z') return s.isZForm;
    return s.gen === starterGenFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-stone-800 bg-stone-900 text-stone-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              ⚡
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">
                {initialPokemon ? `Modifier ${initialPokemon.nickname}` : 'Enregistrer une Capture / Nouveau Pokémon'}
              </h2>
              <p className="text-xs text-stone-400">
                Compatible Pokémon Z Fangame (Starters 1G-9G & Formes Régionales Z)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Quick Starters / Z-Forms Bar */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">
                  Starters 1G à 9G & Formes Kalos Z d'Eric Lostie
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowStartersPicker(!showStartersPicker)}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
              >
                {showStartersPicker ? 'Masquer le sélecteur' : 'Afficher les 27 Starters (1G à 9G)'}
              </button>
            </div>

            {showStartersPicker && (
              <div className="pt-2 border-t border-emerald-500/20 space-y-2">
                {/* Generation Chips */}
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setStarterGenFilter('all')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${starterGenFilter === 'all' ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'}`}
                  >
                    Tous
                  </button>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((gen) => (
                    <button
                      key={gen}
                      type="button"
                      onClick={() => setStarterGenFilter(gen)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${starterGenFilter === gen ? 'bg-emerald-500 text-stone-950' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'}`}
                    >
                      {gen}G
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setStarterGenFilter('z')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${starterGenFilter === 'z' ? 'bg-emerald-500 text-stone-950' : 'bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800'}`}
                  >
                    Formes Z
                  </button>
                </div>

                {/* Starter grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 max-h-36 overflow-y-auto p-1 bg-stone-950/80 rounded-lg border border-stone-800">
                  {filteredStarters.map((item, idx) => (
                    <button
                      key={idx + '-' + item.species.name}
                      type="button"
                      onClick={() => {
                        handleSelectSpecies(item.species);
                        setIsStarter(true);
                      }}
                      className="flex flex-col items-center p-1.5 rounded-lg bg-stone-900 hover:bg-emerald-900/40 border border-stone-800 hover:border-emerald-500/50 text-center transition-all cursor-pointer"
                    >
                      <img
                        src={getPokemonSprite(item.species)}
                        alt={item.species.frenchName}
                        className="w-10 h-10 object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px] font-semibold text-white truncate max-w-full">
                        {item.species.frenchName}
                      </span>
                      <span className="text-[9px] text-stone-400">
                        {item.isZForm ? 'Forme Z' : `${item.gen}G`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Z-Form Presets buttons */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                ⚡ Formes Z :
              </span>
              {POKEMON_Z_REGIONAL_PRESETS.slice(0, 6).map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyZFormPreset(preset)}
                  className="px-2 py-0.5 rounded-md bg-stone-800 hover:bg-emerald-600 hover:text-white border border-stone-700 text-[11px] text-emerald-300 font-medium transition-all cursor-pointer"
                  title={preset.description}
                >
                  {preset.name} ({preset.types.join('/')})
                </button>
              ))}
            </div>
          </div>

          {/* Top Section: Species Selector & Live Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* Left: Species Search */}
            <div className="md:col-span-7 space-y-2">
              <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Espèce Pokémon (Recherche Fr / En)
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Kaiminus, Grenousse, Amphinobi, Salamèche, Poussacha..."
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 py-2 pl-9 pr-3 text-sm text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Autocomplete tags */}
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto rounded-lg border border-stone-800 bg-stone-950/60 p-2">
                {searchResults.slice(0, 16).map((sp) => (
                  <button
                    key={sp.id + sp.name}
                    type="button"
                    onClick={() => handleSelectSpecies(sp)}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                      selectedSpecies?.name === sp.name
                        ? 'bg-emerald-500 text-stone-950 font-bold shadow-xs'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
                    }`}
                  >
                    <span>{sp.frenchName}</span>
                    <span className="text-[10px] opacity-75">({sp.name})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Live Sprite & Dual-Type Controls */}
            <div className="md:col-span-5 flex flex-col items-center justify-center rounded-xl border border-stone-800 bg-stone-950/80 p-3 text-center space-y-2">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <img
                  src={spritePreview}
                  alt={selectedSpecies?.name || 'Pokemon'}
                  referrerPolicy="no-referrer"
                  className="h-18 w-18 object-contain filter drop-shadow-md"
                  onError={(e) => {
                    if (selectedSpecies) {
                      e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedSpecies.id}.png`;
                    }
                  }}
                />
                {isShiny && (
                  <Sparkles className="absolute top-0 right-0 w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
                )}
              </div>
              
              <div className="font-bold text-white text-sm">
                {selectedSpecies?.frenchName || 'Sélectionner une espèce'}
              </div>

              {/* Types Badges */}
              <div className="flex justify-center gap-1">
                {currentTypes.map((t) => (
                  <TypeBadge key={t} type={t} size="xs" />
                ))}
              </div>

              {/* Type Override Dropdowns */}
              <div className="w-full pt-2 border-t border-stone-800/80 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-semibold">Types Pokémon Z :</span>
                  {isCustomTypeOverridden && (
                    <button
                      type="button"
                      onClick={handleResetTypesToDefault}
                      className="text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" /> D'origine
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={type1}
                    onChange={(e) => {
                      setType1(e.target.value as PokemonType);
                      setIsCustomTypeOverridden(true);
                    }}
                    className="w-full rounded border border-stone-700 bg-stone-900 px-2 py-1 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {ALL_TYPES.map((t) => (
                      <option key={t} value={t}>
                        Type 1: {t}
                      </option>
                    ))}
                  </select>

                  <select
                    value={type2}
                    onChange={(e) => {
                      setType2(e.target.value as PokemonType | 'None');
                      setIsCustomTypeOverridden(true);
                    }}
                    className="w-full rounded border border-stone-700 bg-stone-900 px-2 py-1 text-xs text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="None">Type 2: (Aucun)</option>
                    {ALL_TYPES.map((t) => (
                      <option key={t} value={t}>
                        Type 2: {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Nickname, Gender, Level, Nature, Ability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Surnom (Nuzlocke)</label>
              <input
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Ex: Shinobi, Titouan, Kaimi..."
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Niveau Actuel</label>
              <input
                type="number"
                min="1"
                max="100"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Genre</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'M' | 'F' | 'N')}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                <option value="M">Mâle ♂</option>
                <option value="F">Femelle ♀</option>
                <option value="N">Asexué / Inconnu ⚲</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Nature</label>
              <select
                value={nature}
                onChange={(e) => setNature(e.target.value)}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              >
                {NATURES.map((n) => (
                  <option key={n.name} value={n.frenchName}>
                    {n.frenchName} {n.increased ? `(+${n.increased.toUpperCase()} / -${n.decreased?.toUpperCase()})` : '(Neutre)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ability & Held Item */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Talent / Capacité Spéciale</label>
              <input
                type="text"
                value={ability}
                onChange={(e) => setAbility(e.target.value)}
                placeholder="Ex: Torrent, Protéen, Sans Limite, Brasier..."
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Objet Tenu</label>
              <input
                type="text"
                list="popular-items-list"
                value={heldItem}
                onChange={(e) => setHeldItem(e.target.value)}
                placeholder="Ex: Restes, Évoluroc, Bandeau Choix, Orbe Vie..."
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
              <datalist id="popular-items-list">
                {POPULAR_ITEMS.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Movesets (4 attacks) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
              Capacités / Attaques (Moveset)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={move1}
                onChange={(e) => setMove1(e.target.value)}
                placeholder="Attaque 1 (Ex: Ébullition, Cascade...)"
                className="rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
              <input
                type="text"
                value={move2}
                onChange={(e) => setMove2(e.target.value)}
                placeholder="Attaque 2 (Ex: Mâchouille, Psyko...)"
                className="rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
              <input
                type="text"
                value={move3}
                onChange={(e) => setMove3(e.target.value)}
                placeholder="Attaque 3 (Ex: Laser Glace, Séisme...)"
                className="rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
              <input
                type="text"
                value={move4}
                onChange={(e) => setMove4(e.target.value)}
                placeholder="Attaque 4 (Ex: Danse Draco, Toxik...)"
                className="rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Flags: Shiny, Starter, Gift, MVP */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-stone-800 bg-stone-950/60 p-3">
            <label className="flex items-center gap-2 text-xs font-medium text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isStarter}
                onChange={(e) => setIsStarter(e.target.checked)}
                className="h-4 w-4 rounded border-stone-700 bg-stone-900 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Starter de Début</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isShiny}
                onChange={(e) => setIsShiny(e.target.checked)}
                className="h-4 w-4 rounded border-stone-700 bg-stone-900 text-amber-500 focus:ring-amber-500"
              />
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Shiny / Chromatique
              </span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isMvp}
                onChange={(e) => setIsMvp(e.target.checked)}
                className="h-4 w-4 rounded border-stone-700 bg-stone-900 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-yellow-400 font-semibold">⭐ MVP de l'Équipe</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isGift}
                onChange={(e) => setIsGift(e.target.checked)}
                className="h-4 w-4 rounded border-stone-700 bg-stone-900 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Cadeau / Échange</span>
            </label>
          </div>

          {/* Encounter Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Lieu de Rencontre / Route</label>
              <select
                value={routeId}
                onChange={(e) => setRouteId(e.target.value)}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
              >
                {routes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.zone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Niveau de Capture</label>
              <input
                type="number"
                min="1"
                max="100"
                value={metLevel}
                onChange={(e) => setMetLevel(Number(e.target.value))}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-300 block mb-1">Date de Rencontre</label>
              <input
                type="text"
                value={metDate}
                onChange={(e) => setMetDate(e.target.value)}
                className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Status Selection (Party / PC / Dead) */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
              Statut & Emplacement
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setStatus('party')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all cursor-pointer ${
                  status === 'party'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md'
                    : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Équipe Active</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('boxed')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all cursor-pointer ${
                  status === 'boxed'
                    ? 'border-blue-500 bg-blue-500/20 text-blue-300 shadow-md'
                    : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Archive className="w-4 h-4" />
                <span>Boîte PC</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus('dead')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-bold transition-all cursor-pointer ${
                  status === 'dead'
                    ? 'border-rose-500 bg-rose-500/20 text-rose-300 shadow-md'
                    : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Skull className="w-4 h-4" />
                <span>Cimetière (K.O.)</span>
              </button>
            </div>
          </div>

          {/* Conditional Graveyard Form if status === 'dead' */}
          {status === 'dead' && (
            <div className="rounded-xl border border-rose-900/50 bg-rose-950/20 p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <Skull className="w-4 h-4" />
                <span>Détails du Décès (Règles Nuzlocke)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Adversaire / Tueur</label>
                  <input
                    type="text"
                    value={deathKiller}
                    onChange={(e) => setDeathKiller(e.target.value)}
                    placeholder="Ex: Brutalibré de Cornélia, Dracaufeu..."
                    className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Lieu du Décès</label>
                  <input
                    type="text"
                    value={deathRoute}
                    onChange={(e) => setDeathRoute(e.target.value)}
                    placeholder="Ex: Arène de Yantreizh, Route 13..."
                    className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Cause du K.O.</label>
                  <input
                    type="text"
                    value={deathCause}
                    onChange={(e) => setDeathCause(e.target.value)}
                    placeholder="Ex: Coup critique imprévu, Pied Voltige..."
                    className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">Type de l'Attaque Fatale</label>
                  <select
                    value={deathKillerType}
                    onChange={(e) => setDeathKillerType(e.target.value as PokemonType)}
                    className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                  >
                    <option value="">Sélectionner un type fatal...</option>
                    {ALL_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">Oraison Funèbre / Hommage</label>
                <textarea
                  rows={2}
                  value={deathEulogy}
                  onChange={(e) => setDeathEulogy(e.target.value)}
                  placeholder="Ex: Un héros parti trop tôt. Merci pour tout ce que tu as accompli..."
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Stats details */}
          <div className="rounded-xl border border-stone-800 bg-stone-950/40 p-3">
            <details className="text-xs text-stone-400">
              <summary className="cursor-pointer font-semibold text-stone-300 hover:text-emerald-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Statistiques Numériques Actuelles (PV, Attaque, Défense...)</span>
              </summary>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3 pt-2 border-t border-stone-800">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-emerald-400 mb-0.5 text-center">PV</label>
                  <input
                    type="number"
                    value={hp}
                    onChange={(e) => setHp(Number(e.target.value))}
                    className="w-full rounded bg-stone-900 border border-stone-700 px-2 py-1 text-xs text-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-orange-400 mb-0.5 text-center">Attaque</label>
                  <input
                    type="number"
                    value={atk}
                    onChange={(e) => setAtk(Number(e.target.value))}
                    className="w-full rounded bg-stone-900 border border-stone-700 px-2 py-1 text-xs text-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-yellow-400 mb-0.5 text-center">Défense</label>
                  <input
                    type="number"
                    value={def}
                    onChange={(e) => setDef(Number(e.target.value))}
                    className="w-full rounded bg-stone-900 border border-stone-700 px-2 py-1 text-xs text-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-cyan-400 mb-0.5 text-center">Atk Spé</label>
                  <input
                    type="number"
                    value={spa}
                    onChange={(e) => setSpa(Number(e.target.value))}
                    className="w-full rounded bg-stone-900 border border-stone-700 px-2 py-1 text-xs text-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-blue-400 mb-0.5 text-center">Déf Spé</label>
                  <input
                    type="number"
                    value={spd}
                    onChange={(e) => setSpd(Number(e.target.value))}
                    className="w-full rounded bg-stone-900 border border-stone-700 px-2 py-1 text-xs text-white text-center"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-pink-400 mb-0.5 text-center">Vitesse</label>
                  <input
                    type="number"
                    value={spe}
                    onChange={(e) => setSpe(Number(e.target.value))}
                    className="w-full rounded bg-stone-900 border border-stone-700 px-2 py-1 text-xs text-white text-center"
                  />
                </div>
              </div>
            </details>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-stone-800 bg-stone-950/80 px-5 py-3">
          {initialPokemon && onDelete ? (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Supprimer définitivement ${initialPokemon.nickname} ?`)) {
                  onDelete(initialPokemon.id);
                  onClose();
                }
              }}
              className="rounded-lg border border-rose-900/50 bg-rose-950/40 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-900/60 cursor-pointer"
            >
              Supprimer
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-700 bg-stone-800 px-4 py-2 text-xs font-medium text-stone-300 hover:bg-stone-700 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md cursor-pointer"
            >
              {initialPokemon ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
