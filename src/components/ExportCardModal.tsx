import React, { useState, useRef } from 'react';
import { NuzlockeRun } from '../types';
import { exportRunToJson, parseRunFromJson } from '../utils/storage';
import { TypeBadge } from './TypeBadge';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { X, Copy, Download, Upload, Check, Share2, Sparkles, Skull, Trophy, QrCode, ExternalLink, Github, Smartphone, FileCode2 } from 'lucide-react';

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
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');
  const [activeTab, setActiveTab] = useState<'qrcode' | 'card' | 'discord' | 'backup'>('qrcode');

  const defaultAppUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://ais-pre-oruviczng5p7otitmso3qo-166844026008.europe-west2.run.app';

  const [qrUrl, setQrUrl] = useState<string>(defaultAppUrl);
  const [customGithubUser, setCustomGithubUser] = useState<string>('christophe-adam');
  const [repoName, setRepoName] = useState<string>('pokemon-z-nuzlocke-tracker');
  const canvasRef = useRef<HTMLDivElement>(null);

  const defeatedBosses = run.bosses.filter((b) => b.isDefeated);

  const githubMarkdownSnippet = `<!-- SECTION QR CODE POKÉMON Z NUZLOCKE TRACKER -->
<div align="center">

# ⚡ Pokémon Z • Nuzlocke Tracker

[![Application Web](https://img.shields.io/badge/Jouer%20en%20Ligne-App%20Web-10b981?style=for-the-badge&logo=pokemon&logoColor=white)](${qrUrl})
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${customGithubUser}/${repoName})

### 📱 Scanner pour jouer sur Smartphone / Tablette

Scannez ce QR Code avec l'appareil photo de votre téléphone pour ouvrir immédiatement l'application :

<p align="center">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrUrl)}&margin=10&color=10-185-129" width="220" alt="QR Code Pokémon Z Nuzlocke Tracker" />
</p>

[🔗 **Cliquez ici pour ouvrir l'application directement**](${qrUrl})

</div>
<!-- FIN SECTION QR CODE -->`;

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

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(githubMarkdownSnippet);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleDownloadQrPng = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-pokemon-z-nuzlocke.png`;
      a.click();
    }
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
              <QrCode className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Partage, QR Code & GitHub</h2>
              <p className="text-xs text-stone-400">Générez un QR Code pour GitHub et sauvegardez votre aventure</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-stone-800 bg-stone-950 px-4 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('qrcode')}
            className={`flex items-center gap-1.5 border-b-2 py-2.5 px-3.5 transition-colors shrink-0 ${
              activeTab === 'qrcode'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            QR Code & GitHub
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`border-b-2 py-2.5 px-3.5 transition-colors shrink-0 ${
              activeTab === 'card'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Carte de Résumé
          </button>
          <button
            onClick={() => setActiveTab('discord')}
            className={`border-b-2 py-2.5 px-3.5 transition-colors shrink-0 ${
              activeTab === 'discord'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Format Discord
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`border-b-2 py-2.5 px-3.5 transition-colors shrink-0 ${
              activeTab === 'backup'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Sauvegarde JSON
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: QR CODE & GITHUB */}
          {activeTab === 'qrcode' && (
            <div className="space-y-5">
              {/* QR Code Presentation Box */}
              <div className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-stone-800 bg-stone-950/80 p-5">
                {/* Visual QR Code Display */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative p-3 rounded-2xl bg-white shadow-xl shadow-emerald-500/10 border-2 border-emerald-500/30">
                    <QRCodeSVG
                      value={qrUrl}
                      size={170}
                      level="H"
                      marginSize={1}
                      fgColor="#09090b"
                      bgColor="#ffffff"
                    />
                  </div>

                  {/* Hidden Canvas for High-Res PNG Download */}
                  <div ref={canvasRef} className="hidden">
                    <QRCodeCanvas
                      value={qrUrl}
                      size={512}
                      level="H"
                      marginSize={2}
                      fgColor="#09090b"
                      bgColor="#ffffff"
                    />
                  </div>

                  <button
                    onClick={handleDownloadQrPng}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs font-semibold text-stone-200 hover:bg-stone-800 hover:border-stone-600 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    Télécharger PNG (HD)
                  </button>
                </div>

                {/* QR Code Details & Config */}
                <div className="space-y-3 w-full text-xs">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 mb-1">
                      <Smartphone className="w-3 h-3" /> Accès Mobile Instantané
                    </span>
                    <h3 className="text-base font-bold text-white">QR Code pour votre GitHub & Téléphone</h3>
                    <p className="text-stone-400 text-xs">
                      Scannez ce QR Code pour jouer sur votre smartphone, ou intégrez-le dans le fichier <strong>README.md</strong> de votre GitHub.
                    </p>
                  </div>

                  {/* URL Target Config */}
                  <div className="space-y-1.5">
                    <label className="text-stone-300 font-bold block text-[11px]">
                      URL cible encodée dans le QR Code :
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={qrUrl}
                        onChange={(e) => setQrUrl(e.target.value)}
                        className="flex-1 rounded-lg border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-stone-200 font-mono focus:border-emerald-500 focus:outline-none"
                      />
                      <button
                        onClick={handleCopyUrl}
                        className="inline-flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-800 px-2.5 py-1.5 text-xs font-semibold text-stone-300 hover:bg-stone-700"
                        title="Copier le lien"
                      >
                        {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setQrUrl(defaultAppUrl)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                        qrUrl === defaultAppUrl
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                      }`}
                    >
                      Lien Application Actuelle
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrUrl(`https://github.com/${customGithubUser}/${repoName}`)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                        qrUrl.includes('github.com')
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                      }`}
                    >
                      Lien GitHub Repo
                    </button>
                  </div>
                </div>
              </div>

              {/* GitHub README Snippet Box */}
              <div className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-white" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Bloc Markdown prêt à coller dans votre README.md
                    </h4>
                  </div>
                  <button
                    onClick={handleCopyMarkdown}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md"
                  >
                    {copiedMarkdown ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMarkdown ? 'Code Copié !' : 'Copier pour GitHub'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-400">
                  Collez ce bloc dans votre fichier <code>README.md</code> sur GitHub pour afficher le QR Code directement sur votre page de projet :
                </p>

                <pre className="rounded-lg border border-stone-800 bg-stone-900/90 p-3 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-36 no-scrollbar leading-relaxed">
                  {githubMarkdownSnippet}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL SUMMARY CARD */}
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

          {/* TAB 3: DISCORD EXPORT */}
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

          {/* TAB 4: BACKUP & RESTORE JSON */}
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

