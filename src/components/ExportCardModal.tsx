import React, { useState } from 'react';
import { NuzlockeRun } from '../types';
import { exportRunToJson, parseRunFromJson } from '../utils/storage';
import { TypeBadge } from './TypeBadge';
import { X, Copy, Download, Upload, Check, Share2, Sparkles, Skull, Trophy } from 'lucide-react';

interface ExportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  run: NuzlockeRun;
  onImportRun: (importedRun: NuzlockeRun) => void;
}

export const ExportCardModal: React.FC<ExportCardModalProps> = ({
  isOpen,
  onClose,
  run,
  onImportRun,
}) => {
  if (!isOpen) return null;

  const [copiedText, setCopiedText] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');
  const [activeTab, setActiveTab] = useState<'card' | 'discord' | 'backup'>('card');

  const defeatedBosses = run.bosses.filter((b) => b.isDefeated);

  const generateDiscordMarkdown = () => {
    let md = `🎮 **${run.title}** (Dresseur : ${run.trainerName})\n`;
    md += `🏆 **Badges & Victoires :** ${defeatedBosses.length}/${run.bosses.length} (${defeatedBosses.map(b => b.badgeIcon).join(' ')})\n`;
    md += `⚰️ **Pertes :** ${run.graveyard.length} morts\n\n`;

    md += `⚔️ **Équipe Active :**\n`;
    run.party.forEach((p, idx) => {
      md += `${idx + 1}. **${p.nickname}** (${p.speciesFrenchName}) - Niv. ${p.level} [${p.types.join('/')}] | Objet: ${p.heldItem || 'Aucun'}\n`;
    });

    if (run.graveyard.length > 0) {
      md += `\n⚰️ **Panthéon des Morts :**\n`;
      run.graveyard.forEach((p) => {
        md += `• † **${p.nickname}** (${p.speciesFrenchName}) Niv. ${p.deathDetails?.levelAtDeath || p.level} - Tué par : ${p.deathDetails?.killerName || 'Inconnu'}\n`;
      });
    }

    return md;
  };

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(generateDiscordMarkdown());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportRunToJson(run);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuzlocke-pokemon-z-${run.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setImportError('');
      const imported = parseRunFromJson(importJsonText);
      onImportRun(imported);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Erreur lors du décodage du fichier JSON');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-800 bg-stone-900 text-stone-100 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 px-5 py-4 bg-stone-950/80">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              <Share2 className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Partage & Sauvegarde de la Run</h2>
              <p className="text-xs text-stone-400">Exportez votre fiche de résumé ou sauvegardez vos données</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-800 bg-stone-950 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('card')}
            className={`border-b-2 py-2.5 px-4 transition-colors ${
              activeTab === 'card'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Carte de Résumé Visuelle
          </button>
          <button
            onClick={() => setActiveTab('discord')}
            className={`border-b-2 py-2.5 px-4 transition-colors ${
              activeTab === 'discord'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Format Discord / Forum
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`border-b-2 py-2.5 px-4 transition-colors ${
              activeTab === 'backup'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Sauvegarde & Import JSON
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'card' && (
            <div className="space-y-4">
              {/* Visual Card to Screenshot */}
              <div
                id="nuzlocke-summary-card"
                className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 p-5 shadow-2xl text-stone-100 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Fiche Nuzlocke Officielle • Pokémon Z
                    </span>
                    <h3 className="text-xl font-bold text-white">{run.title}</h3>
                    <p className="text-xs text-stone-400">Dresseur : {run.trainerName}</p>
                  </div>
                  <div className="flex gap-1 text-xl">
                    {defeatedBosses.map((b) => (
                      <span key={b.id} title={b.title}>
                        {b.badgeIcon}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Roster Mini */}
                <div>
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                    Équipe Active ({run.party.length}/6)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {run.party.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-xl border border-stone-800 bg-stone-900/90 p-2.5 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between font-bold text-white">
                          <span className="truncate">{p.nickname}</span>
                          <span className="font-mono text-emerald-400">N.{p.level}</span>
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">{p.speciesFrenchName}</div>
                        <div className="flex gap-1">
                          {p.types.map((t) => (
                            <TypeBadge key={t} type={t} size="xs" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom stats footer */}
                <div className="flex items-center justify-between border-t border-stone-800 pt-3 text-xs text-stone-400">
                  <span>Pertes : <strong className="text-rose-400">{run.graveyard.length}</strong></span>
                  <span>PC : <strong className="text-sky-400">{run.pcBox.length}</strong></span>
                  <span>Routes capturées : <strong className="text-emerald-400">{run.routes.filter(r => r.status === 'caught').length}</strong></span>
                </div>
              </div>

              <p className="text-xs text-stone-400 text-center">
                Prenez une capture d'écran de cette carte pour la partager sur Twitter / Discord !
              </p>
            </div>
          )}

          {activeTab === 'discord' && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-300 block">
                Texte prêt à copier pour Discord, Reddit ou les forums :
              </label>
              <textarea
                rows={10}
                readOnly
                value={generateDiscordMarkdown()}
                className="w-full rounded-xl border border-stone-700 bg-stone-950 p-3 text-xs text-stone-200 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopyDiscord}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 shadow-md"
              >
                {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText ? 'Copié dans le presse-papier !' : 'Copier le texte Markdown'}</span>
              </button>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-5">
              {/* Download JSON */}
              <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" /> Télécharger une sauvegarde (Fichier JSON)
                </h4>
                <p className="text-xs text-stone-400">
                  Conservez une copie intégrale de vos Pokémon, routes et journal pour ne jamais perdre votre progression.
                </p>
                <button
                  onClick={handleDownloadBackup}
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                >
                  Télécharger le fichier .json
                </button>
              </div>

              {/* Import JSON */}
              <form onSubmit={handleImportSubmit} className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-sky-400" /> Importer une Run existante
                </h4>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Collez ici le contenu d'un fichier de sauvegarde JSON..."
                  className="w-full rounded-lg border border-stone-700 bg-stone-900 p-2.5 text-xs text-stone-200 font-mono focus:outline-none"
                />
                {importError && (
                  <div className="text-xs text-rose-400 font-semibold">{importError}</div>
                )}
                <button
                  type="submit"
                  disabled={!importJsonText.trim()}
                  className="rounded-lg bg-sky-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-sky-500 disabled:opacity-50"
                >
                  Restaurer la Run
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
