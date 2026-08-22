import { NuzlockeRun, NuzlockePokemon } from '../types';
import { DEFAULT_KALOS_ROUTES } from '../data/kalosRoutes';
import { DEFAULT_KALOS_BOSSES } from '../data/kalosBosses';

const STORAGE_KEY = 'pokemon_z_nuzlocke_runs_v2';
const ACTIVE_RUN_KEY = 'pokemon_z_nuzlocke_active_id';

export function createInitialSampleRun(): NuzlockeRun {
  const party: NuzlockePokemon[] = [
    {
      id: 'p-1',
      speciesName: 'Greninja',
      speciesFrenchName: 'Amphinobi',
      nickname: 'Shinobi',
      gender: 'M',
      types: ['Eau', 'Ténèbres'],
      level: 42,
      nature: 'Timide',
      ability: 'Protéen',
      heldItem: 'Orbe Vie (Life Orb)',
      moves: ['Ébullition', 'Vibrobscur', 'Laser Glace', 'Demi-Tour'],
      status: 'party',
      encounterRouteId: 'starter',
      encounterRouteName: 'Bourg Croquis (Starter Choisi)',
      metLevel: 5,
      metDate: new Date(Date.now() - 86400000 * 5).toLocaleDateString('fr-FR'),
      isStarter: true,
      isMvp: true,
      stats: { hp: 124, atk: 98, def: 74, spa: 118, spd: 82, spe: 145 },
    },
    {
      id: 'p-2',
      speciesName: 'Charizard',
      speciesFrenchName: 'Dracaufeu',
      nickname: 'Ignis',
      gender: 'M',
      types: ['Feu', 'Vol'],
      level: 41,
      nature: 'Modeste',
      ability: 'Brasier',
      heldItem: 'Méga-Gemme (Dracaufite Y)',
      moves: ['Lance-Flammes', 'Lame d\'Air', 'Dracochoc', 'Canicule'],
      status: 'party',
      encounterRouteId: 'illumis-kanto-gift',
      encounterRouteName: 'Illumis - Labo Platane',
      metLevel: 10,
      metDate: new Date(Date.now() - 86400000 * 4).toLocaleDateString('fr-FR'),
      isGift: true,
      stats: { hp: 128, atk: 88, def: 84, spa: 132, spd: 96, spe: 108 },
    },
    {
      id: 'p-3',
      speciesName: 'Aegislash',
      speciesFrenchName: 'Exagide',
      nickname: 'Excalibur',
      gender: 'F',
      types: ['Acier', 'Spectre'],
      level: 42,
      nature: 'Brave',
      ability: 'Déclic Tactique',
      heldItem: 'Restes (Leftovers)',
      moves: ['Bouclier Royal', 'Ombre Portée', 'Tête de Fer', 'Danse Lames'],
      status: 'party',
      encounterRouteId: 'route-6',
      encounterRouteName: 'Route 6 (Allée du Palais)',
      metLevel: 11,
      metDate: new Date(Date.now() - 86400000 * 3).toLocaleDateString('fr-FR'),
      stats: { hp: 110, atk: 72, def: 154, spa: 65, spd: 152, spe: 42 },
    },
    {
      id: 'p-4',
      speciesName: 'Lucario',
      speciesFrenchName: 'Lucario',
      nickname: 'Anubis',
      gender: 'M',
      types: ['Combat', 'Acier'],
      level: 40,
      nature: 'Jovial',
      ability: 'Impassible',
      heldItem: 'Ceinture Force',
      moves: ['Aurasphère', 'Pisto-Poing', 'Pied Sauté', 'Danse Lames'],
      status: 'party',
      encounterRouteId: 'tour-maitrise-gift',
      encounterRouteName: 'Tour Maîtrise (Lucario Cadeau)',
      metLevel: 32,
      metDate: new Date(Date.now() - 86400000 * 2).toLocaleDateString('fr-FR'),
      isGift: true,
      stats: { hp: 116, atk: 120, def: 78, spa: 112, spd: 78, spe: 104 },
    },
    {
      id: 'p-5',
      speciesName: 'Sylveon',
      speciesFrenchName: 'Nymphali',
      nickname: 'Rubis',
      gender: 'F',
      types: ['Fée'],
      level: 41,
      nature: 'Calme',
      ability: 'Peau Féérique',
      heldItem: 'Baie Sitrus',
      moves: ['Mégaphone', 'Pouvoir Lunaire', 'Vampibaiser', 'Plénitude'],
      status: 'party',
      encounterRouteId: 'route-10',
      encounterRouteName: 'Route 10 (Sentier Menhir)',
      metLevel: 19,
      metDate: new Date(Date.now() - 86400000 * 2).toLocaleDateString('fr-FR'),
      stats: { hp: 142, atk: 68, def: 75, spa: 122, spd: 148, spe: 68 },
    },
    {
      id: 'p-6',
      speciesName: 'Garchomp',
      speciesFrenchName: 'Carchacrok',
      nickname: 'Apex',
      gender: 'M',
      types: ['Dragon', 'Sol'],
      level: 43,
      nature: 'Rigide',
      ability: 'Voile Sable',
      heldItem: 'Casque Brut (Rocky Helmet)',
      moves: ['Séisme', 'Draco-Griffe', 'Direct Toxik', 'Éboulement'],
      status: 'party',
      encounterRouteId: 'route-13',
      encounterRouteName: 'Route 13 (Badlands)',
      metLevel: 28,
      metDate: new Date(Date.now() - 86400000 * 1).toLocaleDateString('fr-FR'),
      stats: { hp: 158, atk: 148, def: 104, spa: 82, spd: 94, spe: 112 },
    },
  ];

  const pcBox: NuzlockePokemon[] = [
    {
      id: 'b-1',
      speciesName: 'Talonflame',
      speciesFrenchName: 'Flambusard',
      nickname: 'Phoenix',
      gender: 'M',
      types: ['Feu', 'Vol'],
      level: 36,
      nature: 'Rigide',
      ability: 'Ailes Bourrasque',
      moves: ['Acrobatie', 'Atterrissage', 'Nitrocharge', 'Demi-Tour'],
      status: 'boxed',
      encounterRouteId: 'route-2',
      encounterRouteName: 'Route 2 (Sentier des Réfugiés)',
      metLevel: 3,
      metDate: new Date(Date.now() - 86400000 * 5).toLocaleDateString('fr-FR'),
    },
    {
      id: 'b-2',
      speciesName: 'Lapras',
      speciesFrenchName: 'Lokhlass',
      nickname: 'Nessie',
      gender: 'F',
      types: ['Eau', 'Glace'],
      level: 35,
      nature: 'Modeste',
      ability: 'Absorb Eau',
      moves: ['Surf', 'Laser Glace', 'Plaquage', 'Onde Folie'],
      status: 'boxed',
      encounterRouteId: 'route-12',
      encounterRouteName: 'Route 12 (Lokhlass Cadeau)',
      metLevel: 30,
      metDate: new Date(Date.now() - 86400000 * 2).toLocaleDateString('fr-FR'),
      isGift: true,
    },
    {
      id: 'b-3',
      speciesName: 'Pangoro',
      speciesFrenchName: 'Pandarbare',
      nickname: 'Bambou',
      gender: 'M',
      types: ['Combat', 'Ténèbres'],
      level: 34,
      nature: 'Brave',
      ability: 'Poing de Fer',
      moves: ['Poing-Ombre', 'Martel-Poing', 'Mâchouille', 'Danse-Lames'],
      status: 'boxed',
      encounterRouteId: 'route-5',
      encounterRouteName: 'Route 5 (Chemin du Versant)',
      metLevel: 11,
      metDate: new Date(Date.now() - 86400000 * 4).toLocaleDateString('fr-FR'),
    },
  ];

  const graveyard: NuzlockePokemon[] = [
    {
      id: 'd-1',
      speciesName: 'Vivillon',
      speciesFrenchName: 'Prismillon',
      nickname: 'Papillon',
      gender: 'F',
      types: ['Insecte', 'Vol'],
      level: 25,
      nature: 'Timide',
      ability: 'Œil Composé',
      moves: ['Poudre Dodo', 'Vent Violent', 'Harcèlement', 'Bourdon'],
      status: 'dead',
      encounterRouteId: 'foret-neuvartault',
      encounterRouteName: 'Forêt de Neuvartault',
      metLevel: 3,
      metDate: new Date(Date.now() - 86400000 * 5).toLocaleDateString('fr-FR'),
      deathDetails: {
        route: 'Arène 2 - Relifac-le-Haut',
        killerName: 'Ptyranidur de Lino',
        killerType: 'Roche',
        levelAtDeath: 25,
        cause: 'Coup Critique Tomberoche fatal x4',
        date: new Date(Date.now() - 86400000 * 3).toLocaleDateString('fr-FR'),
        eulogy: 'Notre fidèle endormeuse au début de l\'aventure. Tombée avec honneur face au Ptyranidur de Lino.',
        badgeCountAtDeath: 1,
      },
    },
    {
      id: 'd-2',
      speciesName: 'Snorlax',
      speciesFrenchName: 'Ronflex',
      nickname: 'BigBoss',
      gender: 'M',
      types: ['Normal'],
      level: 33,
      nature: 'Prudent',
      ability: 'Isograisse',
      moves: ['Plaquage', 'Repos', 'Ronflement', 'Machouille'],
      status: 'dead',
      encounterRouteId: 'route-7',
      encounterRouteName: 'Route 7 (Ronflex Réveillé)',
      metLevel: 15,
      metDate: new Date(Date.now() - 86400000 * 3).toLocaleDateString('fr-FR'),
      deathDetails: {
        route: 'Arène 3 - Yantreizh',
        killerName: 'Brutalibré de Cornélia',
        killerType: 'Combat',
        levelAtDeath: 33,
        cause: 'Pied Voltige Stabbé sur switch',
        date: new Date(Date.now() - 86400000 * 2).toLocaleDateString('fr-FR'),
        eulogy: 'Le grand mur d\'acier de l\'équipe. Un switch mal anticipé a brisé sa défense impénétrable. Repose en paix géant endormi.',
        badgeCountAtDeath: 2,
      },
    },
  ];

  // Mark sample routes
  const routes = DEFAULT_KALOS_ROUTES.map(r => {
    if (r.id === 'starter') return { ...r, status: 'caught' as const, caughtPokemonId: 'p-1' };
    if (r.id === 'route-2') return { ...r, status: 'caught' as const, caughtPokemonId: 'b-1' };
    if (r.id === 'foret-neuvartault') return { ...r, status: 'caught' as const, caughtPokemonId: 'd-1' };
    if (r.id === 'illumis-kanto-gift') return { ...r, status: 'gift' as const, caughtPokemonId: 'p-2' };
    if (r.id === 'route-5') return { ...r, status: 'caught' as const, caughtPokemonId: 'b-3' };
    if (r.id === 'route-6') return { ...r, status: 'caught' as const, caughtPokemonId: 'p-3' };
    if (r.id === 'route-7') return { ...r, status: 'caught' as const, caughtPokemonId: 'd-2' };
    if (r.id === 'tour-maitrise-gift') return { ...r, status: 'gift' as const, caughtPokemonId: 'p-4' };
    if (r.id === 'route-10') return { ...r, status: 'caught' as const, caughtPokemonId: 'p-5' };
    if (r.id === 'route-12') return { ...r, status: 'gift' as const, caughtPokemonId: 'b-2' };
    if (r.id === 'route-13') return { ...r, status: 'caught' as const, caughtPokemonId: 'p-6' };
    return r;
  });

  // Mark gym 1 to 4 defeated
  const bosses = DEFAULT_KALOS_BOSSES.map((b, i) => {
    if (i < 4) {
      return { ...b, isDefeated: true, defeatedDate: new Date(Date.now() - 86400000 * (4 - i)).toLocaleDateString('fr-FR') };
    }
    return b;
  });

  return {
    id: 'sample-run-1',
    title: 'Pokémon Z - Hardcore Nuzlocke Run #1',
    gameTitle: 'Pokémon Z Fangame',
    trainerName: 'Serena',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date().toISOString(),
    theme: 'zygarde-green',
    rules: {
      standardNuzlocke: true,
      levelCap: true,
      dupesClause: true,
      shinyClause: true,
      setMode: true,
      noBagItemsInBattle: true,
      noLegendaries: true,
      megaEvolutionRule: 'one_per_battle',
      zygardeCellRule: 'Collectionner les cellules autorisées',
      customRules: [
        'Mode DÉFINI (Set Mode) obligatoire en combat',
        'Objets de soin interdits pendant les combats de boss',
        'Cap de niveau strict selon le Pokémon le plus fort du champion',
      ],
    },
    party,
    pcBox,
    graveyard,
    routes,
    bosses,
    logs: [
      {
        id: 'l-1',
        timestamp: new Date(Date.now() - 86400000 * 5).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'catch',
        title: 'Départ avec Grenousse !',
        description: 'Shinobi rejoint l\'équipe au Bourg Croquis.',
      },
      {
        id: 'l-2',
        timestamp: new Date(Date.now() - 86400000 * 4).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'badge',
        title: 'Badge Coléoptère Obtenu !',
        description: 'Violette a été vaincue sans aucune perte.',
      },
      {
        id: 'l-3',
        timestamp: new Date(Date.now() - 86400000 * 3).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'death',
        title: 'Deuil : Mort de Papillon (Prismillon)',
        description: 'Perdue contre le Ptyranidur de Lino (Badge Mur).',
      },
      {
        id: 'l-4',
        timestamp: new Date(Date.now() - 86400000 * 2).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'badge',
        title: 'Badge Végétal Débloqué',
        description: 'Victoire éclatante contre Amaro à Port Tempères.',
      },
    ],
  };
}

export function createNewBlankRun(title: string, trainerName: string, gameTitle = 'Pokémon Z'): NuzlockeRun {
  return {
    id: 'run-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    title: title.trim() || 'Nouveau Nuzlocke Pokémon Z',
    gameTitle: gameTitle || 'Pokémon Z',
    trainerName: trainerName.trim() || 'Dresseur Kalos',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    theme: 'zygarde-green',
    rules: {
      standardNuzlocke: true,
      levelCap: true,
      dupesClause: true,
      shinyClause: true,
      setMode: true,
      noBagItemsInBattle: true,
      noLegendaries: true,
      megaEvolutionRule: 'one_per_battle',
      customRules: [
        'Mort définitive si KO',
        'Premier Pokémon rencontré par zone uniquement',
        'Surnommer tous les Pokémon capturés',
        'Cap de niveau sur chaque arène',
      ],
    },
    party: [],
    pcBox: [],
    graveyard: [],
    routes: DEFAULT_KALOS_ROUTES.map(r => ({ ...r })),
    bosses: DEFAULT_KALOS_BOSSES.map(b => ({ ...b })),
    logs: [
      {
        id: 'l-' + Date.now(),
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'note',
        title: 'Début de l\'Aventure',
        description: `Création du Nuzlocke par ${trainerName || 'le Dresseur'}. Prêt à conquérir Kalos et percer le mystère de Pokémon Z !`,
      },
    ],
  };
}

export function loadAllRuns(): NuzlockeRun[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialSampleRun();
      saveAllRuns([initial]);
      setActiveRunId(initial.id);
      return [initial];
    }
    const parsed = JSON.parse(raw) as NuzlockeRun[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = createInitialSampleRun();
      saveAllRuns([initial]);
      setActiveRunId(initial.id);
      return [initial];
    }
    // Ensure all runs have the new 12 Régents structure
    const updatedRuns = parsed.map((run) => {
      const hasOldBossIds = !run.bosses || run.bosses.some((b) => b.id.startsWith('gym-') || b.id.startsWith('e4-') || b.id === 'boss-flare-lysandre');
      if (hasOldBossIds || run.bosses.length !== DEFAULT_KALOS_BOSSES.length) {
        const existingMap = new Map((run.bosses || []).map((b) => [b.id, b]));
        const mergedBosses = DEFAULT_KALOS_BOSSES.map((defaultBoss) => {
          const existing = existingMap.get(defaultBoss.id);
          return existing ? { ...defaultBoss, isDefeated: existing.isDefeated } : { ...defaultBoss };
        });
        return { ...run, bosses: mergedBosses };
      }
      return run;
    });
    return updatedRuns;
  } catch (e) {
    console.error('Failed to load runs from localStorage', e);
    const initial = createInitialSampleRun();
    return [initial];
  }
}

export function saveAllRuns(runs: NuzlockeRun[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
  } catch (e) {
    console.error('Failed to save runs to localStorage', e);
  }
}

export function getActiveRunId(): string {
  return localStorage.getItem(ACTIVE_RUN_KEY) || '';
}

export function setActiveRunId(id: string): void {
  localStorage.setItem(ACTIVE_RUN_KEY, id);
}

export const loadActiveRunId = getActiveRunId;
export const saveActiveRunId = setActiveRunId;
export const createInitialRun = createNewBlankRun;

export function exportRunToJson(run: NuzlockeRun): string {
  return JSON.stringify(run, null, 2);
}

export function parseRunFromJson(jsonString: string): NuzlockeRun {
  const parsed = JSON.parse(jsonString);
  if (!parsed.title || !Array.isArray(parsed.party) || !Array.isArray(parsed.routes)) {
    throw new Error('Format de fichier Nuzlocke JSON invalide');
  }
  return {
    ...parsed,
    id: 'imported-' + Date.now(),
    title: parsed.title + ' (Importé)',
    updatedAt: new Date().toISOString(),
  };
}
