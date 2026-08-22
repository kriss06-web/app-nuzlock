import React, { useState } from 'react';
import { NuzlockeRun } from '../types';
import { Shield, Share2, Plus, Sparkles, FolderKanban, BookOpen, Layers, Swords, Archive, MapPin, Skull, Trophy } from 'lucide-react';

export type TabId = 'party' | 'box' | 'routes' | 'bosses' | 'graveyard' | 'analyzer' | 'stats' | 'calc';

interface NavbarProps {
  currentRun: NuzlockeRun;
  allRuns: NuzlockeRun[];
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  onSwitchRun: (runId: string) => void;
  onOpenNewRunModal: () => void;
  onOpenRulesModal: () => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRun,
  allRuns,
  activeTab,
  onSelectTab,
  onSwitchRun,
  onOpenNewRunModal,
  onOpenRulesModal,
  onOpenExportModal,
}) => {
  const [showRunDropdown, setShowRunDropdown] = useState(false);

  const defeatedBossesCount = currentRun.bosses.filter((b) => b.isDefeated).length;
  const totalCatches = currentRun.party.length + currentRun.pcBox.length + currentRun.graveyard.length;

  const tabs: { id: TabId; label: string; icon: any; count?: number; badgeColor?: string }[] = [
    { id: 'party', label: 'Équipe', icon: Swords, count: currentRun.party.length, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { id: 'box', label: 'PC Box', icon: Archive, count: currentRun.pcBox.length, badgeColor: 'bg-sky-500/20 text-sky-300' },
    { id: 'routes', label: 'Routes & Zones', icon: MapPin, count: currentRun.routes.filter(r => r.status === 'caught').length, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { id: 'bosses', label: 'Arènes & Caps', icon: Trophy, count: defeatedBossesCount, badgeColor: 'bg-amber-500/20 text-amber-300' },
    { id: 'graveyard', label: 'Cimetière', icon: Skull, count: currentRun.graveyard.length, badgeColor: 'bg-rose-500/20 text-rose-300' },
    { id: 'analyzer', label: 'Types & Défense', icon: Layers },
    { id: 'stats', label: 'Journal & Stats', icon: BookOpen },
    { id: 'calc', label: 'Calculateur', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-800 bg-stone-950/95 backdrop-blur-md">
      {/* Top Main Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Run Selector */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-lime-600 shadow-md shadow-emerald-500/20 text-stone-950 font-black text-xl">
              Z
            </div>

            <div className="relative">
              <button
                onClick={() => setShowRunDropdown(!showRunDropdown)}
                className="flex items-center gap-2 rounded-xl border border-stone-800 bg-stone-900 px-3 py-1.5 text-left text-xs transition-colors hover:border-stone-700 hover:bg-stone-850"
              >
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-400">
                    Nuzlocke Pokémon Z
                  </div>
                  <div className="font-bold text-white max-w-[150px] sm:max-w-[200px] truncate">
                    {currentRun.title}
                  </div>
                </div>
                <FolderKanban className="w-4 h-4 text-stone-400 ml-1" />
              </button>

              {/* Run Selector Dropdown */}
              {showRunDropdown && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-stone-800 bg-stone-900 p-2 shadow-2xl z-50 text-xs">
                  <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-stone-500">
                    Mes Aventures Nuzlocke ({allRuns.length})
                  </div>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {allRuns.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          onSwitchRun(r.id);
                          setShowRunDropdown(false);
                        }}
                        className={`w-full text-left rounded-lg px-2.5 py-1.5 transition-colors flex items-center justify-between ${
                          r.id === currentRun.id
                            ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                            : 'text-stone-300 hover:bg-stone-800'
                        }`}
                      >
                        <span className="truncate">{r.title}</span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {r.party.length}p / {r.graveyard.length}†
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-stone-800 pt-2 mt-1">
                    <button
                      onClick={() => {
                        setShowRunDropdown(false);
                        onOpenNewRunModal();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                    >
                      <Plus className="w-3.5 h-3.5" /> Nouvelle Partie / Run
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Badges / Header Actions */}
          <div className="flex items-center gap-2">
            {/* Rules Button */}
            <button
              onClick={onOpenRulesModal}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-800 bg-stone-900 px-3 py-1.5 text-xs font-semibold text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Règles</span>
            </button>

            {/* Export Button */}
            <button
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-800 bg-stone-900 px-3 py-1.5 text-xs font-semibold text-stone-300 hover:bg-stone-800 hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Partager / Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-stone-800/80">
        <nav className="flex space-x-1 overflow-x-auto py-2 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`rounded-md px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                      tab.badgeColor || 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
