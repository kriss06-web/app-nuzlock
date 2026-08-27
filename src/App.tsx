/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NuzlockeRun, NuzlockePokemon, RouteEncounter, RouteStatus, BossEncounter, LogEntry, NuzlockeRules } from './types';
import {
  loadAllRuns,
  saveAllRuns,
  loadActiveRunId,
  saveActiveRunId,
  createInitialRun,
} from './utils/storage';
import { DEFAULT_KALOS_ROUTES } from './data/kalosRoutes';
import { translateZoneToFrench } from './utils/zoneTranslations';
import { Navbar, TabId } from './components/Navbar';
import { TeamView } from './components/TeamView';
import { BoxView } from './components/BoxView';
import { RouteTracker } from './components/RouteTracker';
import { BossPlanner } from './components/BossPlanner';
import { GraveyardView } from './components/GraveyardView';
import { TypeAnalyzer } from './components/TypeAnalyzer';
import { StatsDashboard } from './components/StatsDashboard';
import { DamageCalcQuick } from './components/DamageCalcQuick';
import { PokedexExplorer } from './components/PokedexExplorer';
import { PokemonModal } from './components/PokemonModal';
import { RulesModal } from './components/RulesModal';
import { ExportCardModal } from './components/ExportCardModal';
import { NewRunModal } from './components/NewRunModal';

export default function App() {
  const [runs, setRuns] = useState<NuzlockeRun[]>([]);
  const [activeRunId, setActiveRunId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabId>('party');

  // Modals state
  const [isPokemonModalOpen, setIsPokemonModalOpen] = useState(false);
  const [editingPokemon, setEditingPokemon] = useState<NuzlockePokemon | undefined>(undefined);
  const [modalDefaultRoute, setModalDefaultRoute] = useState<{ id: string; name: string } | undefined>(undefined);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isNewRunModalOpen, setIsNewRunModalOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const loadedRuns = loadAllRuns();
    const savedActiveId = loadActiveRunId();

    // Migrate any old route lists (e.g. postigo-de-postigo) to the new official 31 zones
    const migratedRuns = loadedRuns.map((run) => {
      const hasOldRoutes = run.routes.some((r) => r.id === 'postigo-de-postigo' || r.name.includes('Postigo'));
      if (hasOldRoutes) {
        const updatedRoutes = DEFAULT_KALOS_ROUTES.map((defRoute, idx) => {
          const oldRoute = run.routes[idx];
          return {
            ...defRoute,
            status: oldRoute ? oldRoute.status : defRoute.status,
            caughtPokemonId: oldRoute ? oldRoute.caughtPokemonId : undefined,
          };
        });
        return { ...run, routes: updatedRoutes };
      }
      return run;
    });

    setRuns(migratedRuns);
    saveAllRuns(migratedRuns);

    if (savedActiveId && migratedRuns.some((r) => r.id === savedActiveId)) {
      setActiveRunId(savedActiveId);
    } else if (migratedRuns.length > 0) {
      setActiveRunId(migratedRuns[0].id);
      saveActiveRunId(migratedRuns[0].id);
    }
  }, []);

  // Save runs whenever modified
  const updateCurrentRun = (updater: (prevRun: NuzlockeRun) => NuzlockeRun) => {
    setRuns((prevRuns) => {
      const updatedRuns = prevRuns.map((r) => (r.id === activeRunId ? updater(r) : r));
      saveAllRuns(updatedRuns);
      return updatedRuns;
    });
  };

  const currentRun = runs.find((r) => r.id === activeRunId) || runs[0];

  if (!currentRun) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-white">
        <div className="text-center space-y-3">
          <div className="text-xl font-bold">Chargement de votre partie de Pokémon Z...</div>
          <button
            onClick={() => {
              const newRun = createInitialRun('Ma Première Run Pokémon Z', 'Dresseur');
              setRuns([newRun]);
              setActiveRunId(newRun.id);
              saveAllRuns([newRun]);
              saveActiveRunId(newRun.id);
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500"
          >
            Créer une nouvelle run
          </button>
        </div>
      </div>
    );
  }

  // Find upcoming boss for level cap reference
  const upcomingBoss = currentRun.bosses.find((b) => !b.isDefeated);

  // Pokemon Handlers
  const handleOpenAddPokemon = (preRoute?: { id: string; name: string }) => {
    setEditingPokemon(undefined);
    setModalDefaultRoute(preRoute);
    setIsPokemonModalOpen(true);
  };

  const handleOpenEditPokemon = (pokemon: NuzlockePokemon) => {
    setEditingPokemon(pokemon);
    setModalDefaultRoute(undefined);
    setIsPokemonModalOpen(true);
  };

  const handleSavePokemon = (pokemonData: NuzlockePokemon) => {
    updateCurrentRun((run) => {
      let updatedParty = [...run.party];
      let updatedBox = [...run.pcBox];
      let updatedGraveyard = [...run.graveyard];
      let updatedRoutes = [...run.routes];
      let updatedLogs = [...(run.logs || [])];

      // Remove previous version if editing
      updatedParty = updatedParty.filter((p) => p.id !== pokemonData.id);
      updatedBox = updatedBox.filter((p) => p.id !== pokemonData.id);
      updatedGraveyard = updatedGraveyard.filter((p) => p.id !== pokemonData.id);

      // Insert into target category
      if (pokemonData.status === 'party') {
        if (updatedParty.length >= 6) {
          // If party is full, auto-redirect to PC box
          pokemonData.status = 'boxed';
          updatedBox.push(pokemonData);
        } else {
          updatedParty.push(pokemonData);
        }
      } else if (pokemonData.status === 'boxed') {
        updatedBox.push(pokemonData);
      } else if (pokemonData.status === 'dead') {
        updatedGraveyard.push(pokemonData);
      }

      // If linked to a route, auto-mark route as caught if not already
      if (pokemonData.encounterRouteId) {
        updatedRoutes = updatedRoutes.map((r) =>
          r.id === pokemonData.encounterRouteId
            ? { ...r, status: r.status === 'pending' ? 'caught' : r.status }
            : r
        );
      }

      // Add log if brand new pokemon
      if (!editingPokemon) {
        updatedLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          type: 'catch',
          title: `Capture : ${pokemonData.nickname} (${pokemonData.speciesFrenchName})`,
          description: `Niveau ${pokemonData.level} rencontré sur ${pokemonData.encounterRouteName || 'Kalos'}.`,
        });
      }

      return {
        ...run,
        party: updatedParty,
        pcBox: updatedBox,
        graveyard: updatedGraveyard,
        routes: updatedRoutes,
        logs: updatedLogs,
      };
    });
  };

  const handleMoveToBox = (pokemon: NuzlockePokemon) => {
    updateCurrentRun((run) => ({
      ...run,
      party: run.party.filter((p) => p.id !== pokemon.id),
      pcBox: [...run.pcBox, { ...pokemon, status: 'boxed' }],
    }));
  };

  const handleMoveToParty = (pokemon: NuzlockePokemon) => {
    if (currentRun.party.length >= 6) {
      alert("Votre équipe compte déjà 6 Pokémon ! Déposez d'abord un membre au PC avant d'en ajouter un nouveau.");
      return;
    }

    updateCurrentRun((run) => ({
      ...run,
      pcBox: run.pcBox.filter((p) => p.id !== pokemon.id),
      party: [...run.party, { ...pokemon, status: 'party' }],
    }));
  };

  const handleDeclareDead = (pokemon: NuzlockePokemon) => {
    // Open edit modal directly with death details prompt
    const deadPokemon: NuzlockePokemon = {
      ...pokemon,
      status: 'dead',
      deathDetails: {
        route: pokemon.encounterRouteName || 'En combat',
        date: new Date().toLocaleDateString('fr-FR'),
        levelAtDeath: pokemon.level,
        cause: 'Tombé bravement au combat.',
        killerName: upcomingBoss ? upcomingBoss.leaderName : 'Adversaire sauvage',
        killerType: 'Normal',
        badgeCountAtDeath: currentRun.bosses.filter((b) => b.isDefeated).length,
      },
    };

    setEditingPokemon(deadPokemon);
    setIsPokemonModalOpen(true);
  };

  const handleRevivePokemon = (pokemon: NuzlockePokemon) => {
    updateCurrentRun((run) => ({
      ...run,
      graveyard: run.graveyard.filter((p) => p.id !== pokemon.id),
      pcBox: [...run.pcBox, { ...pokemon, status: 'boxed', deathDetails: undefined }],
    }));
  };

  const handleToggleMvp = (pokemon: NuzlockePokemon) => {
    updateCurrentRun((run) => ({
      ...run,
      party: run.party.map((p) => (p.id === pokemon.id ? { ...p, isMvp: !p.isMvp } : p)),
    }));
  };

  const handleLevelChange = (pokemon: NuzlockePokemon, delta: number) => {
    const newLevel = Math.max(1, Math.min(100, pokemon.level + delta));
    const updater = (list: NuzlockePokemon[]) =>
      list.map((p) => (p.id === pokemon.id ? { ...p, level: newLevel } : p));

    updateCurrentRun((run) => ({
      ...run,
      party: updater(run.party),
      pcBox: updater(run.pcBox),
      graveyard: updater(run.graveyard),
    }));
  };

  // Route Handlers
  const handleUpdateRouteStatus = (routeId: string, status: RouteStatus) => {
    updateCurrentRun((run) => ({
      ...run,
      routes: run.routes.map((r) => (r.id === routeId ? { ...r, status } : r)),
    }));
  };

  const handleCatchPokemonOnRoute = (route: RouteEncounter) => {
    // Check if pokemon already assigned
    const existing = [...currentRun.party, ...currentRun.pcBox, ...currentRun.graveyard].find(
      (p) => p.encounterRouteId === route.id
    );

    if (existing) {
      handleOpenEditPokemon(existing);
    } else {
      handleOpenAddPokemon({ id: route.id, name: route.name });
    }
  };

  const handleAddCustomRoute = (name: string, zone: RouteEncounter['zone'], suggestedLevel: number) => {
    updateCurrentRun((run) => {
      const newRoute: RouteEncounter = {
        id: `custom-route-${Date.now()}`,
        name,
        zone,
        status: 'pending',
        suggestedLevel,
        order: run.routes.length + 1,
      };
      return {
        ...run,
        routes: [...run.routes, newRoute],
      };
    });
  };

  const handleDeleteRoute = (routeId: string) => {
    updateCurrentRun((run) => ({
      ...run,
      routes: run.routes
        .filter((r) => r.id !== routeId)
        .map((r, idx) => ({ ...r, order: idx + 1 })),
    }));
  };

  const handleMoveRoute = (routeId: string, direction: 'up' | 'down') => {
    updateCurrentRun((run) => {
      const index = run.routes.findIndex((r) => r.id === routeId);
      if (index === -1) return run;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= run.routes.length) return run;

      const newRoutes = [...run.routes];
      const temp = newRoutes[index];
      newRoutes[index] = newRoutes[targetIndex];
      newRoutes[targetIndex] = temp;

      return {
        ...run,
        routes: newRoutes.map((r, idx) => ({ ...r, order: idx + 1 })),
      };
    });
  };

  const handleReorderRoutes = (newRoutes: RouteEncounter[]) => {
    updateCurrentRun((run) => ({
      ...run,
      routes: newRoutes.map((r, idx) => ({ ...r, order: idx + 1 })),
    }));
  };

  const handleEditRoute = (routeId: string, updated: Partial<RouteEncounter>) => {
    updateCurrentRun((run) => ({
      ...run,
      routes: run.routes.map((r) => (r.id === routeId ? { ...r, ...updated } : r)),
    }));
  };

  const handleResetRoutesToDefault = () => {
    updateCurrentRun((run) => {
      const newRoutes = DEFAULT_KALOS_ROUTES.map((defRoute, idx) => {
        const existing = run.routes[idx];
        return {
          ...defRoute,
          status: existing ? existing.status : defRoute.status,
          caughtPokemonId: existing ? existing.caughtPokemonId : undefined,
        };
      });
      return {
        ...run,
        routes: newRoutes,
      };
    });
  };

  const handleTranslateAllRoutesToFrench = () => {
    updateCurrentRun((run) => {
      // 1. Translate all routes
      const translatedRoutes = run.routes.map((r) => ({
        ...r,
        name: translateZoneToFrench(r.name),
      }));

      // 2. Also update encounterRouteName on caught Pokémon
      const updatePokeList = (list: NuzlockePokemon[]) =>
        list.map((p) => {
          if (p.encounterRouteName) {
            return { ...p, encounterRouteName: translateZoneToFrench(p.encounterRouteName) };
          }
          return p;
        });

      return {
        ...run,
        routes: translatedRoutes,
        party: updatePokeList(run.party),
        pcBox: updatePokeList(run.pcBox),
        graveyard: updatePokeList(run.graveyard),
      };
    });
  };

  const handleImportRoutes = (newRoutes: RouteEncounter[]) => {
    updateCurrentRun((run) => ({
      ...run,
      routes: newRoutes,
    }));
  };

  const handleClearAllRoutes = () => {
    updateCurrentRun((run) => ({
      ...run,
      routes: [],
    }));
  };

  // Boss Handlers
  const handleToggleBossDefeated = (bossId: string, isDefeated: boolean) => {
    updateCurrentRun((run) => {
      const boss = run.bosses.find((b) => b.id === bossId);
      const updatedLogs = [...(run.logs || [])];

      if (isDefeated && boss) {
        updatedLogs.unshift({
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          type: 'badge',
          title: `Victoire : ${boss.title} Vaincu !`,
          description: `Triomphe contre ${boss.leaderName} à ${boss.location}.`,
        });
      }

      return {
        ...run,
        bosses: run.bosses.map((b) => (b.id === bossId ? { ...b, isDefeated } : b)),
        logs: updatedLogs,
      };
    });
  };

  // Log Handlers
  const handleAddLog = (entry: Omit<LogEntry, 'id'>) => {
    updateCurrentRun((run) => ({
      ...run,
      logs: [{ ...entry, id: `log-${Date.now()}` }, ...(run.logs || [])],
    }));
  };

  const handleDeleteLog = (logId: string) => {
    updateCurrentRun((run) => ({
      ...run,
      logs: (run.logs || []).filter((l) => l.id !== logId),
    }));
  };

  // Rules & Run Switchers
  const handleSaveRules = (rules: NuzlockeRules) => {
    updateCurrentRun((run) => ({ ...run, rules }));
  };

  const handleSwitchRun = (runId: string) => {
    setActiveRunId(runId);
    saveActiveRunId(runId);
  };

  const handleCreateNewRun = (newRun: NuzlockeRun) => {
    setRuns((prev) => {
      const updated = [newRun, ...prev];
      saveAllRuns(updated);
      return updated;
    });
    setActiveRunId(newRun.id);
    saveActiveRunId(newRun.id);
  };

  const handleImportRun = (importedRun: NuzlockeRun) => {
    setRuns((prev) => {
      const filtered = prev.filter((r) => r.id !== importedRun.id);
      const updated = [importedRun, ...filtered];
      saveAllRuns(updated);
      return updated;
    });
    setActiveRunId(importedRun.id);
    saveActiveRunId(importedRun.id);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-emerald-500 selection:text-stone-950 font-sans pb-16">
      {/* Top Sticky Navigation */}
      <Navbar
        currentRun={currentRun}
        allRuns={runs}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSwitchRun={handleSwitchRun}
        onOpenNewRunModal={() => setIsNewRunModalOpen(true)}
        onOpenRulesModal={() => setIsRulesModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'party' && (
          <TeamView
            party={currentRun.party}
            upcomingBoss={upcomingBoss}
            onAddPokemon={() => handleOpenAddPokemon()}
            onEditPokemon={handleOpenEditPokemon}
            onMoveToBox={handleMoveToBox}
            onDeclareDead={handleDeclareDead}
            onToggleMvp={handleToggleMvp}
            onLevelChange={handleLevelChange}
          />
        )}

        {activeTab === 'box' && (
          <BoxView
            pcBox={currentRun.pcBox}
            partyCount={currentRun.party.length}
            onAddPokemon={() => handleOpenAddPokemon()}
            onEditPokemon={handleOpenEditPokemon}
            onMoveToParty={handleMoveToParty}
            onDeclareDead={handleDeclareDead}
            onLevelChange={handleLevelChange}
          />
        )}

        {activeTab === 'routes' && (
          <RouteTracker
            routes={currentRun.routes}
            pokemons={[...currentRun.party, ...currentRun.pcBox, ...currentRun.graveyard]}
            onUpdateRouteStatus={handleUpdateRouteStatus}
            onCatchPokemonOnRoute={handleCatchPokemonOnRoute}
            onAddCustomRoute={handleAddCustomRoute}
            onDeleteRoute={handleDeleteRoute}
            onMoveRoute={handleMoveRoute}
            onReorderRoutes={handleReorderRoutes}
            onEditRoute={handleEditRoute}
            onResetRoutesToDefault={handleResetRoutesToDefault}
            onImportRoutes={handleImportRoutes}
            onClearAllRoutes={handleClearAllRoutes}
            onTranslateAllRoutesToFrench={handleTranslateAllRoutesToFrench}
          />
        )}

        {activeTab === 'bosses' && (
          <BossPlanner
            bosses={currentRun.bosses}
            party={currentRun.party}
            onToggleBossDefeated={handleToggleBossDefeated}
          />
        )}

        {activeTab === 'graveyard' && (
          <GraveyardView
            graveyard={currentRun.graveyard}
            onEditPokemon={handleOpenEditPokemon}
            onRevivePokemon={handleRevivePokemon}
          />
        )}

        {activeTab === 'pokedex' && (
          <PokedexExplorer
            onAddPokemonToParty={(species) => {
              const newPoke: NuzlockePokemon = {
                id: `poke-${Date.now()}`,
                speciesName: species.name,
                speciesFrenchName: species.frenchName,
                nickname: species.frenchName,
                gender: 'N',
                types: species.types,
                level: 5,
                nature: 'Docile',
                ability: 'Standard',
                moves: [],
                status: currentRun.party.length < 6 ? 'party' : 'boxed',
                encounterRouteId: 'pokedex-encounter',
                encounterRouteName: 'Pokédex National',
                metLevel: 5,
                metDate: new Date().toLocaleDateString('fr-FR'),
                stats: species.baseStats,
                spriteKey: species.spriteKey,
              };
              updateCurrentRun((run) => {
                if (run.party.length < 6) {
                  return { ...run, party: [...run.party, newPoke] };
                } else {
                  return { ...run, pcBox: [...run.pcBox, newPoke] };
                }
              });
              setActiveTab(currentRun.party.length < 6 ? 'party' : 'box');
            }}
          />
        )}

        {activeTab === 'analyzer' && <TypeAnalyzer party={currentRun.party} />}

        {activeTab === 'stats' && (
          <StatsDashboard
            run={currentRun}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
          />
        )}

        {activeTab === 'calc' && <DamageCalcQuick />}
      </main>

      {/* Modals */}
      <PokemonModal
        isOpen={isPokemonModalOpen}
        onClose={() => {
          setIsPokemonModalOpen(false);
          setEditingPokemon(undefined);
          setModalDefaultRoute(undefined);
        }}
        onSave={handleSavePokemon}
        initialPokemon={editingPokemon}
        routes={currentRun.routes}
        defaultRouteId={modalDefaultRoute?.id}
        defaultRouteName={modalDefaultRoute?.name}
      />

      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        rules={currentRun.rules}
        onSaveRules={handleSaveRules}
      />

      <ExportCardModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        run={currentRun}
        onImportRun={handleImportRun}
      />

      <NewRunModal
        isOpen={isNewRunModalOpen}
        onClose={() => setIsNewRunModalOpen(false)}
        onCreateRun={handleCreateNewRun}
      />
    </div>
  );
}

