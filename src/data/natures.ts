export interface NatureInfo {
  name: string;
  frenchName: string;
  increased?: 'atk' | 'def' | 'spa' | 'spd' | 'spe';
  decreased?: 'atk' | 'def' | 'spa' | 'spd' | 'spe';
}

export const NATURES: NatureInfo[] = [
  { name: 'Hardy', frenchName: 'Hardi' },
  { name: 'Lonely', frenchName: 'Solo', increased: 'atk', decreased: 'def' },
  { name: 'Brave', frenchName: 'Brave', increased: 'atk', decreased: 'spe' },
  { name: 'Adamant', frenchName: 'Rigide', increased: 'atk', decreased: 'spa' },
  { name: 'Naughty', frenchName: 'Mauvais', increased: 'atk', decreased: 'spd' },
  { name: 'Bold', frenchName: 'Assuré', increased: 'def', decreased: 'atk' },
  { name: 'Docile', frenchName: 'Docile' },
  { name: 'Relaxed', frenchName: 'Relax', increased: 'def', decreased: 'spe' },
  { name: 'Impish', frenchName: 'Malin', increased: 'def', decreased: 'spa' },
  { name: 'Lax', frenchName: 'Lâche', increased: 'def', decreased: 'spd' },
  { name: 'Timid', frenchName: 'Timide', increased: 'spe', decreased: 'atk' },
  { name: 'Hasty', frenchName: 'Pressé', increased: 'spe', decreased: 'def' },
  { name: 'Serious', frenchName: 'Sérieux' },
  { name: 'Jolly', frenchName: 'Jovial', increased: 'spe', decreased: 'spa' },
  { name: 'Naive', frenchName: 'Naïf', increased: 'spe', decreased: 'spd' },
  { name: 'Modest', frenchName: 'Modeste', increased: 'spa', decreased: 'atk' },
  { name: 'Mild', frenchName: 'Doux', increased: 'spa', decreased: 'def' },
  { name: 'Quiet', frenchName: 'Discret', increased: 'spa', decreased: 'spe' },
  { name: 'Bashful', frenchName: 'Pudique' },
  { name: 'Rash', frenchName: 'Foufou', increased: 'spa', decreased: 'spd' },
  { name: 'Calm', frenchName: 'Calme', increased: 'spd', decreased: 'atk' },
  { name: 'Gentle', frenchName: 'Gentil', increased: 'spd', decreased: 'def' },
  { name: 'Sassy', frenchName: 'Malpoli', increased: 'spd', decreased: 'spe' },
  { name: 'Careful', frenchName: 'Prudent', increased: 'spd', decreased: 'spa' },
  { name: 'Quirky', frenchName: 'Bizarre' },
];

export const POPULAR_ITEMS = [
  'Restes (Leftovers)',
  'Orbe Vie (Life Orb)',
  'Évoluroc (Eviolite)',
  'Ceinture Force (Focus Sash)',
  'Bandeau Choix (Choice Band)',
  'Lunettes Choix (Choice Specs)',
  'Mouchoir Choix (Choice Scarf)',
  'Baie Sitrus',
  'Baie Prun',
  'Baie Lum',
  'Veste de Combat (Assault Vest)',
  'Casque Brut (Rocky Helmet)',
  'Boue Noire (Black Sludge)',
  'Herbe Blanche (White Herb)',
  'Méga-Gemme (Mega Stone)',
  'Z-Cristal (Z-Crystal)',
  'Charbon',
  'Eau Mystique',
  'Graine Miracle',
  'Aimant',
  'Roche Royale',
  'Croc Dragon',
];
