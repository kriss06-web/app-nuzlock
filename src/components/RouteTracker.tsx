import React, { useState } from 'react';
import { RouteEncounter, RouteStatus, NuzlockePokemon } from '../types';
import { DEFAULT_KALOS_ROUTES } from '../data/kalosRoutes';
import { translateZoneToFrench } from '../utils/zoneTranslations';
import {
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Gift,
  Sparkles,
  MapPin,
  Tag,
  Edit2,
  Trash2,
  RotateCcw,
  FileText,
  HelpCircle,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Languages,
} from 'lucide-react';

interface RouteTrackerProps {
  routes: RouteEncounter[];
  pokemons: NuzlockePokemon[];
  onUpdateRouteStatus: (routeId: string, status: RouteStatus) => void;
  onCatchPokemonOnRoute: (route: RouteEncounter) => void;
  onAddCustomRoute: (name: string, zone: RouteEncounter['zone'], suggestedLevel: number) => void;
  onDeleteRoute?: (routeId: string) => void;
  onMoveRoute?: (routeId: string, direction: 'up' | 'down') => void;
  onReorderRoutes?: (reorderedRoutes: RouteEncounter[]) => void;
  onEditRoute?: (routeId: string, updated: Partial<RouteEncounter>) => void;
  onResetRoutesToDefault?: () => void;
  onImportRoutes?: (routes: RouteEncounter[]) => void;
  onClearAllRoutes?: () => void;
  onTranslateAllRoutesToFrench?: () => void;
}

export const RouteTracker: React.FC<RouteTrackerProps> = ({
  routes,
  pokemons,
  onUpdateRouteStatus,
  onCatchPokemonOnRoute,
  onAddCustomRoute,
  onDeleteRoute,
  onMoveRoute,
  onReorderRoutes,
  onEditRoute,
  onResetRoutesToDefault,
  onImportRoutes,
  onClearAllRoutes,
  onTranslateAllRoutesToFrench,
}) => {
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modals
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [editingRoute, setEditingRoute] = useState<RouteEncounter | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');

  const [autoTranslateImport, setAutoTranslateImport] = useState(true);

  // Add form fields
  const [customName, setCustomName] = useState('');
  const [customZone, setCustomZone] = useState<RouteEncounter['zone']>('Kalos Centre');
  const [customLevel, setCustomLevel] = useState(15);

  // Drag and drop state (Mouse & Touch)
  const [draggedRouteId, setDraggedRouteId] = useState<string | null>(null);
  const [dragOverRouteId, setDragOverRouteId] = useState<string | null>(null);
  const [touchDraggingId, setTouchDraggingId] = useState<string | null>(null);
  const touchStartPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const touchSourceIdRef = React.useRef<string | null>(null);

  const zones: RouteEncounter['zone'][] = [
    'Kalos Centre',
    'Kalos Côtes',
    'Kalos Monts',
    'Lieux Spéciaux',
    'Post-Game / Z',
  ];

  // Map pokemon to routes
  const pokemonByRoute: Record<string, NuzlockePokemon> = {};
  pokemons.forEach((p) => {
    if (p.encounterRouteId) {
      pokemonByRoute[p.encounterRouteId] = p;
    }
  });

  const filteredRoutes = routes.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchesZone = zoneFilter === 'ALL' || r.zone === zoneFilter;
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesZone && matchesStatus;
  });

  const handleReorder = (sourceId: string, targetId: string) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    const sourceIndex = routes.findIndex((r) => r.id === sourceId);
    const targetIndex = routes.findIndex((r) => r.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;

    const newRoutes = [...routes];
    const [movedItem] = newRoutes.splice(sourceIndex, 1);
    newRoutes.splice(targetIndex, 0, movedItem);

    if (onReorderRoutes) {
      onReorderRoutes(newRoutes);
    }
  };

  // Desktop Mouse Drag & Drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedRouteId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverRouteId !== id) {
      setDragOverRouteId(id);
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedRouteId && draggedRouteId !== targetId) {
      handleReorder(draggedRouteId, targetId);
    }
    setDraggedRouteId(null);
    setDragOverRouteId(null);
  };

  const handleDragEnd = () => {
    setDraggedRouteId(null);
    setDragOverRouteId(null);
  };

  // Mobile / Touch Drag & Drop
  const handleTouchStart = (id: string, e: React.TouchEvent) => {
    touchSourceIdRef.current = id;
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    setTouchDraggingId(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchSourceIdRef.current) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const routeCard = element?.closest('[data-route-id]');
    const targetId = routeCard?.getAttribute('data-route-id');
    if (targetId && targetId !== touchSourceIdRef.current) {
      setDragOverRouteId(targetId);
    }
  };

  const handleTouchEnd = () => {
    if (touchSourceIdRef.current && dragOverRouteId && touchSourceIdRef.current !== dragOverRouteId) {
      handleReorder(touchSourceIdRef.current, dragOverRouteId);
    }
    touchSourceIdRef.current = null;
    touchStartPosRef.current = null;
    setTouchDraggingId(null);
    setDragOverRouteId(null);
  };

  // Calculate statistics
  const totalRoutes = routes.length;
  const caughtCount = routes.filter(
    (r) => r.status === 'caught' || r.status === 'gift' || r.status === 'static'
  ).length;
  const failedCount = routes.filter((r) => r.status === 'failed' || r.status === 'fled').length;
  const pendingCount = routes.filter((r) => r.status === 'pending').length;

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const formattedName = translateZoneToFrench(customName.trim());
    onAddCustomRoute(formattedName, customZone, customLevel);
    setCustomName('');
    setShowAddCustom(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoute || !onEditRoute) return;
    onEditRoute(editingRoute.id, {
      name: editingRoute.name.trim(),
      zone: editingRoute.zone,
      suggestedLevel: Number(editingRoute.suggestedLevel) || 1,
    });
    setEditingRoute(null);
  };

  const handleExecuteImport = () => {
    if (!importText.trim() || !onImportRoutes) return;

    const lines = importText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const parsedRoutes: RouteEncounter[] = lines.map((line, idx) => {
      // Clean leading bullet or numbers: e.g. "1. Route 3" or "- Route 3 (Lv 12)"
      let cleaned = line.replace(/^[\d+.\-*\s]+/, '').trim();
      if (autoTranslateImport) {
        cleaned = translateZoneToFrench(cleaned);
      }
      let detectedLevel = 5 + Math.floor(idx * 1.5);
      let detectedZone: RouteEncounter['zone'] = 'Kalos Centre';

      // Look for (Niv. XX) or (Lv XX)
      const lvlMatch = cleaned.match(/(?:niv\.?|lv\.?|lvl\.?|niveau)\s*[:=]?\s*(\d+)/i);
      if (lvlMatch && lvlMatch[1]) {
        detectedLevel = parseInt(lvlMatch[1], 10);
      }

      if (idx > 15 && idx <= 28) detectedZone = 'Kalos Côtes';
      else if (idx > 28 && idx <= 45) detectedZone = 'Kalos Monts';
      else if (idx > 45 && idx <= 53) detectedZone = 'Lieux Spéciaux';
      else if (idx > 53) detectedZone = 'Post-Game / Z';

      return {
        id: `route-custom-${Date.now()}-${idx}`,
        name: cleaned,
        zone: detectedZone,
        status: 'pending',
        suggestedLevel: detectedLevel,
        order: idx + 1,
      };
    });

    onImportRoutes(parsedRoutes);
    setShowImportModal(false);
    setImportText('');
  };

  const getStatusBadge = (status: RouteStatus) => {
    switch (status) {
      case 'caught':
        return { label: 'Capturé', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', icon: CheckCircle2 };
      case 'gift':
        return { label: 'Cadeau / Fixe', bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40', icon: Gift };
      case 'static':
        return { label: 'Légendaire / Fixe', bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40', icon: Sparkles };
      case 'failed':
        return { label: 'Échoué / K.O.', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40', icon: XCircle };
      case 'fled':
        return { label: 'A Fui', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40', icon: AlertCircle };
      case 'skipped':
        return { label: 'Doublon Ignoré', bg: 'bg-stone-800 text-stone-400 border-stone-700', icon: Tag };
      default:
        return { label: 'En attente', bg: 'bg-stone-900 text-stone-400 border-stone-800', icon: MapPin };
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats & Actions */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900/90 p-5 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                🗺️
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Suivi des Zones & Rencontres ({caughtCount} / {totalRoutes} Capturées)
              </h2>
            </div>
            <p className="mt-1 text-xs text-stone-400">
              Zones de <strong>Pokémon Z</strong>. Glissez-déposez les zones (souris ou doigt) ou utilisez les flèches pour réordonner votre progression.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddCustom(true)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Zone</span>
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 rounded-xl border border-stone-700 bg-stone-800 px-3 py-2 text-xs font-semibold text-stone-200 hover:bg-stone-700 hover:text-white cursor-pointer transition-colors"
              title="Coller une liste personnalisée de zones (1 par ligne)"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Importer / Coller</span>
            </button>

            {onTranslateAllRoutesToFrench && (
              <button
                onClick={() => {
                  onTranslateAllRoutesToFrench();
                }}
                className="flex items-center gap-1.5 rounded-xl border border-indigo-700/60 bg-indigo-950/40 px-3 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/50 hover:text-white cursor-pointer transition-colors"
                title="Convertir automatiquement toutes les zones en Français (VF pure)"
              >
                <Languages className="w-3.5 h-3.5 text-indigo-400" />
                <span>Traduire en VF</span>
              </button>
            )}

            {onResetRoutesToDefault && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Rétablir toutes les zones officielles de Pokémon Z ? Cela mettra à jour la liste avec les 59 zones du fangame.'
                    )
                  ) {
                    onResetRoutesToDefault();
                  }
                }}
                className="flex items-center gap-1.5 rounded-xl border border-stone-800 bg-stone-950 px-3 py-2 text-xs font-semibold text-stone-400 hover:text-emerald-400 hover:border-emerald-500/40 cursor-pointer transition-colors"
                title="Rétablir la liste officielle des zones Pokémon Z"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurer Défaut Z</span>
              </button>
            )}

            {onClearAllRoutes && routes.length > 0 && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Supprimer TOUTES les zones actuelles ? Vous pourrez ensuite en ajouter de nouvelles manuellement ou importer votre liste.'
                    )
                  ) {
                    onClearAllRoutes();
                  }
                }}
                className="flex items-center gap-1.5 rounded-xl border border-rose-900/40 bg-rose-950/20 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-900/40 cursor-pointer transition-colors"
                title="Vider la liste de zones"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tout Vider</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Pill Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-stone-800/80">
          <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/20 p-2.5 text-center">
            <span className="text-[11px] text-emerald-400 font-semibold block">Capturées</span>
            <span className="text-base font-bold text-white font-mono">{caughtCount}</span>
          </div>
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-2.5 text-center">
            <span className="text-[11px] text-stone-400 font-semibold block">En Attente</span>
            <span className="text-base font-bold text-white font-mono">{pendingCount}</span>
          </div>
          <div className="rounded-xl border border-rose-900/30 bg-rose-950/20 p-2.5 text-center">
            <span className="text-[11px] text-rose-400 font-semibold block">Échouées / Mort</span>
            <span className="text-base font-bold text-white font-mono">{failedCount}</span>
          </div>
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-2.5 text-center">
            <span className="text-[11px] text-stone-400 font-semibold block">Total Zones</span>
            <span className="text-base font-bold text-white font-mono">{totalRoutes}</span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une zone, route, forêt, grotte, ville..."
              className="w-full rounded-xl border border-stone-700 bg-stone-950 py-2 pl-9 pr-3 text-xs text-white placeholder-stone-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="rounded-xl border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="ALL">Toutes les Régions</option>
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="caught">Capturé</option>
              <option value="failed">Échoué</option>
              <option value="skipped">Doublon / Ignoré</option>
              <option value="gift">Cadeau / Fixe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Custom Route Modal */}
      {showAddCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-stone-900 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white">Ajouter une Nouvelle Zone de Rencontre</h3>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustom} className="space-y-3">
              <div>
                <label className="text-xs text-stone-300 block mb-1 font-semibold">Nom de la Zone / Route</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Ex: Ruta 3, Pueblo Acrílico, Bosque Errante..."
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1 font-semibold">Catégorie / Secteur</label>
                <select
                  value={customZone}
                  onChange={(e) => setCustomZone(e.target.value as RouteEncounter['zone'])}
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {zones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1 font-semibold">Niveau Suggéré</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={customLevel}
                  onChange={(e) => setCustomLevel(Number(e.target.value))}
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddCustom(false)}
                  className="rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs text-stone-300 hover:bg-stone-700 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-xs cursor-pointer"
                >
                  Ajouter la zone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Route Modal */}
      {editingRoute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-stone-900 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white">Modifier la Zone</h3>
              <button
                type="button"
                onClick={() => setEditingRoute(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="text-xs text-stone-300 block mb-1 font-semibold">Nom de la Zone</label>
                <input
                  type="text"
                  required
                  value={editingRoute.name}
                  onChange={(e) => setEditingRoute({ ...editingRoute, name: e.target.value })}
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1 font-semibold">Région</label>
                <select
                  value={editingRoute.zone}
                  onChange={(e) =>
                    setEditingRoute({
                      ...editingRoute,
                      zone: e.target.value as RouteEncounter['zone'],
                    })
                  }
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {zones.map((z) => (
                    <option key={z} value={z}>
                      {z}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-stone-300 block mb-1 font-semibold">Niveau Suggéré</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingRoute.suggestedLevel || 5}
                  onChange={(e) =>
                    setEditingRoute({
                      ...editingRoute,
                      suggestedLevel: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setEditingRoute(null)}
                  className="rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs text-stone-300 hover:bg-stone-700 cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-xs cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import / Paste Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-stone-800 bg-stone-900 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Importer / Coller une Liste de Zones</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-stone-300">
                Collez votre liste de zones ci-dessous (<strong>1 zone par ligne</strong>). Les zones seront ajoutées ou remplaceront vos zones actuelles.
              </p>
              <textarea
                rows={9}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={`Ruta 1 (Route 1) - Niv 3\nRuta 2\nBosque de Neuvartault - Niv 5\nPueblo Acrílico\nRuta 3\n...`}
                className="w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-xs text-white placeholder-stone-600 font-mono focus:border-sky-500 focus:outline-none"
              />

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoTranslateImport}
                    onChange={(e) => setAutoTranslateImport(e.target.checked)}
                    className="rounded border-stone-700 bg-stone-950 text-indigo-500 focus:ring-indigo-400"
                  />
                  <span>Traduire automatiquement en français (VF)</span>
                </label>

                {importText.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      const lines = importText.split('\n');
                      const translated = lines.map((l) => translateZoneToFrench(l)).join('\n');
                      setImportText(translated);
                    }}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
                  >
                    Prévisualiser la traduction VF
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs text-stone-300 hover:bg-stone-700 cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                disabled={!importText.trim()}
                onClick={handleExecuteImport}
                className="rounded-lg bg-sky-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-sky-500 disabled:opacity-50 shadow-md cursor-pointer"
              >
                Remplacer la liste par ces zones
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Routes List Table / Cards */}
      {filteredRoutes.length === 0 ? (
        <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-10 text-center space-y-3">
          <MapPin className="w-10 h-10 text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-stone-300">Aucune zone ne correspond à votre filtre</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Vous pouvez ajouter de nouvelles zones manuellement ou restaurer la liste complète de Pokémon Z.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => setShowAddCustom(true)}
              className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 cursor-pointer"
            >
              Ajouter une zone
            </button>
            {onResetRoutesToDefault && (
              <button
                onClick={onResetRoutesToDefault}
                className="rounded-xl border border-stone-700 bg-stone-800 px-3.5 py-2 text-xs font-semibold text-stone-200 hover:bg-stone-700 cursor-pointer"
              >
                Restaurer Défaut Z (59 zones)
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredRoutes.map((route) => {
            const caughtPokemon = pokemonByRoute[route.id];
            const statusBadge = getStatusBadge(route.status);
            const isBeingDragged = draggedRouteId === route.id || touchDraggingId === route.id;
            const isDragOver = dragOverRouteId === route.id && !isBeingDragged;

            return (
              <div
                key={route.id}
                data-route-id={route.id}
                draggable={Boolean(onReorderRoutes)}
                onDragStart={(e) => handleDragStart(e, route.id)}
                onDragOver={(e) => handleDragOver(e, route.id)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, route.id)}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-3.5 transition-all duration-150 ${
                  isBeingDragged
                    ? 'opacity-40 scale-[0.99] border-dashed border-emerald-500 bg-emerald-950/20'
                    : isDragOver
                    ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-400/50 shadow-lg translate-y-0.5'
                    : 'border-stone-800/90 bg-stone-900/70 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                {/* Left: Drag Handle, Move Arrows, Order Number, Route Name, Zone, Level */}
                <div className="flex items-center gap-2 min-w-0">
                  {/* Grip / Drag Handle for touch & mouse */}
                  {onReorderRoutes && (
                    <div
                      title="Maintenir enfoncé pour glisser-déposer (souris ou doigt)"
                      onTouchStart={(e) => handleTouchStart(route.id, e)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                      className="p-1 rounded text-stone-500 hover:text-emerald-400 active:text-emerald-300 cursor-grab active:cursor-grabbing touch-none shrink-0"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>
                  )}

                  {onMoveRoute && (
                    <div className="flex flex-col gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onMoveRoute(route.id, 'up')}
                        disabled={route.order <= 1}
                        title="Monter cette zone"
                        className="p-1 rounded bg-stone-950 border border-stone-800 text-stone-400 hover:text-emerald-400 hover:border-emerald-500/50 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onMoveRoute(route.id, 'down')}
                        disabled={route.order >= routes.length}
                        title="Descendre cette zone"
                        className="p-1 rounded bg-stone-950 border border-stone-800 text-stone-400 hover:text-emerald-400 hover:border-emerald-500/50 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-950 border border-stone-800 text-stone-400 font-mono text-xs font-bold">
                    #{route.order}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-sm truncate">{route.name}</h4>
                      <span className="text-[11px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-800">
                        {route.zone}
                      </span>
                      {route.suggestedLevel && (
                        <span className="text-[10px] text-emerald-400 font-mono">
                          (Niv. ~{route.suggestedLevel})
                        </span>
                      )}
                    </div>

                    {/* Caught Pokemon Preview if already caught */}
                    {caughtPokemon && (
                      <div className="mt-1 flex items-center gap-2 text-xs text-emerald-300">
                        <span className="font-semibold">
                          Capturé : {caughtPokemon.nickname} ({caughtPokemon.speciesFrenchName})
                        </span>
                        <span className="text-stone-400 font-mono">Niv. {caughtPokemon.level}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded ${
                            caughtPokemon.status === 'party'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : caughtPokemon.status === 'boxed'
                              ? 'bg-sky-500/20 text-sky-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {caughtPokemon.status === 'party'
                            ? 'Équipe'
                            : caughtPokemon.status === 'boxed'
                            ? 'PC'
                            : 'Décédé'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Actions, Status dropdown & Edit / Delete */}
                <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
                  <select
                    value={route.status}
                    onChange={(e) => onUpdateRouteStatus(route.id, e.target.value as RouteStatus)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${statusBadge.bg}`}
                  >
                    <option value="pending">En attente</option>
                    <option value="caught">Capturé</option>
                    <option value="failed">Échoué (Mort/Fuite)</option>
                    <option value="fled">A fui</option>
                    <option value="skipped">Doublon (Skip)</option>
                    <option value="gift">Cadeau / Don</option>
                    <option value="static">Légendaire / Fixe</option>
                  </select>

                  <button
                    onClick={() => onCatchPokemonOnRoute(route)}
                    title="Enregistrer ou modifier le Pokémon capturé sur ce lieu"
                    className="flex items-center gap-1 rounded-lg bg-emerald-600/90 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{caughtPokemon ? 'Modifier' : 'Enregistrer'}</span>
                  </button>

                  {/* Edit Zone Button */}
                  <button
                    onClick={() => setEditingRoute(route)}
                    title="Modifier le nom ou niveau de cette zone"
                    className="rounded-lg border border-stone-800 bg-stone-950 p-1 text-stone-400 hover:text-stone-200 hover:border-stone-700 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Zone Button */}
                  {onDeleteRoute && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Supprimer la zone "${route.name}" ?`)) {
                          onDeleteRoute(route.id);
                        }
                      }}
                      title="Supprimer cette zone"
                      className="rounded-lg border border-stone-800 bg-stone-950 p-1 text-stone-500 hover:text-rose-400 hover:border-rose-900/40 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
