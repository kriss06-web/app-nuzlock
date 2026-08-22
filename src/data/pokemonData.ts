import { PokemonSpecies, PokemonType } from '../types';

export interface RegionalFormPreset {
  name: string;
  frenchName: string;
  types: PokemonType[];
  description: string;
  originalSpeciesId?: number;
}

export const POKEMON_Z_REGIONAL_PRESETS: RegionalFormPreset[] = [
  { name: 'Greninja Z', frenchName: 'Amphinobi Z (Kalos Antique)', types: ['Eau', 'Psy'], description: 'Forme de Kalos d\'Eric Lostie - Type Eau / Psy avec nouveau design ninja mystique.', originalSpeciesId: 658 },
  { name: 'Frogadier Z', frenchName: 'Croâporal Z (Kalos Antique)', types: ['Eau', 'Psy'], description: 'Forme de Kalos d\'Eric Lostie - Type Eau / Psy.', originalSpeciesId: 657 },
  { name: 'Froakie Z', frenchName: 'Grenousse Z (Kalos Antique)', types: ['Eau', 'Psy'], description: 'Forme de Kalos d\'Eric Lostie - Type Eau / Psy.', originalSpeciesId: 656 },
  
  { name: 'Delphox Z', frenchName: 'Goupelin Z (Kalos Antique)', types: ['Feu', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Feu / Électrik, manie l\'énergie de foudre astrale.', originalSpeciesId: 655 },
  { name: 'Braixen Z', frenchName: 'Roussil Z (Kalos Antique)', types: ['Feu', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Feu / Électrik.', originalSpeciesId: 654 },
  { name: 'Fennekin Z', frenchName: 'Feunnec Z (Kalos Antique)', types: ['Feu', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Feu / Électrik.', originalSpeciesId: 653 },

  { name: 'Chesnaught Z', frenchName: 'Blindépique Z (Kalos Antique)', types: ['Plante', 'Sol'], description: 'Forme de Kalos d\'Eric Lostie - Type Plante / Sol avec armure tellurique renforcée.', originalSpeciesId: 652 },
  { name: 'Quilladin Z', frenchName: 'Boguérisse Z (Kalos Antique)', types: ['Plante', 'Sol'], description: 'Forme de Kalos d\'Eric Lostie - Type Plante / Sol.', originalSpeciesId: 651 },
  { name: 'Chespin Z', frenchName: 'Marisson Z (Kalos Antique)', types: ['Plante', 'Sol'], description: 'Forme de Kalos d\'Eric Lostie - Type Plante / Sol.', originalSpeciesId: 650 },

  { name: 'Pikachu Z', frenchName: 'Pikachu Z (Kalos Antique)', types: ['Poison', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Poison / Électrik.', originalSpeciesId: 25 },
  { name: 'Raichu Z', frenchName: 'Raichu Z (Kalos Antique)', types: ['Poison', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Type Poison / Électrik.', originalSpeciesId: 26 },

  { name: 'Marowak Z', frenchName: 'Ossatueur Z (Kalos Antique)', types: ['Sol', 'Acier'], description: 'Forme de Kalos d\'Eric Lostie - Type Sol / Acier avec massue forgée.', originalSpeciesId: 105 },
  { name: 'Cubone Z', frenchName: 'Osselait Z (Kalos Antique)', types: ['Sol', 'Roche'], description: 'Forme de Kalos d\'Eric Lostie - Type Sol / Roche.', originalSpeciesId: 104 },

  { name: 'Bibarel Z', frenchName: 'Castorno Z (Kalos Antique)', types: ['Normal', 'Glace'], description: 'Forme de Kalos d\'Eric Lostie - Type Normal / Glace.', originalSpeciesId: 400 },
  { name: 'Bidoof Z', frenchName: 'Keunotor Z (Kalos Antique)', types: ['Normal', 'Glace'], description: 'Forme de Kalos d\'Eric Lostie - Type Normal / Glace.', originalSpeciesId: 399 },

  { name: 'Reuniclus Z', frenchName: 'Symbios Z (Kalos Antique)', types: ['Psy', 'Spectre'], description: 'Forme de Kalos d\'Eric Lostie - Type Psy / Spectre.', originalSpeciesId: 579 },
  { name: 'Duosion Z', frenchName: 'Méios Z (Kalos Antique)', types: ['Psy', 'Spectre'], description: 'Forme de Kalos d\'Eric Lostie - Type Psy / Spectre.', originalSpeciesId: 578 },
  { name: 'Solosis Z', frenchName: 'Nucléos Z (Kalos Antique)', types: ['Psy', 'Spectre'], description: 'Forme de Kalos d\'Eric Lostie - Type Psy / Spectre.', originalSpeciesId: 577 },

  { name: 'Porygon-Z Z', frenchName: 'Porygon-Z Antique', types: ['Normal', 'Électrik'], description: 'Forme de Kalos d\'Eric Lostie - Prototype ancien de Porygon.', originalSpeciesId: 474 },
  { name: 'AZ Floette', frenchName: 'Floette Fleur Éternelle (AZ)', types: ['Fée'], description: 'Floette liée au roi AZ il y a 3000 ans (Lumière du Néant).', originalSpeciesId: 670 },
];

export const POKEMON_DATABASE: PokemonSpecies[] = [
  // ==========================================
  // --- STARTERS 1G (Kanto) ---
  // ==========================================
  { id: 1, name: 'Bulbasaur', frenchName: 'Bulbizarre', types: ['Plante', 'Poison'], baseStats: { hp: 45, atk: 49, def: 49, spa: 65, spd: 65, spe: 45 }, spriteKey: 'bulbasaur', generation: 1 },
  { id: 2, name: 'Ivysaur', frenchName: 'Herbizarre', types: ['Plante', 'Poison'], baseStats: { hp: 60, atk: 62, def: 63, spa: 80, spd: 80, spe: 60 }, spriteKey: 'ivysaur', generation: 1 },
  { id: 3, name: 'Venusaur', frenchName: 'Florizarre', types: ['Plante', 'Poison'], baseStats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 }, spriteKey: 'venusaur', generation: 1 },
  { id: 10033, name: 'Mega Venusaur', frenchName: 'Méga-Florizarre', types: ['Plante', 'Poison'], baseStats: { hp: 80, atk: 100, def: 123, spa: 122, spd: 120, spe: 80 }, spriteKey: 'venusaur-mega', generation: 6, isMega: true },

  { id: 4, name: 'Charmander', frenchName: 'Salamèche', types: ['Feu'], baseStats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 }, spriteKey: 'charmander', generation: 1 },
  { id: 5, name: 'Charmeleon', frenchName: 'Reptincel', types: ['Feu'], baseStats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 }, spriteKey: 'charmeleon', generation: 1 },
  { id: 6, name: 'Charizard', frenchName: 'Dracaufeu', types: ['Feu', 'Vol'], baseStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }, spriteKey: 'charizard', generation: 1 },
  { id: 10034, name: 'Mega Charizard X', frenchName: 'Méga-Dracaufeu X', types: ['Feu', 'Dragon'], baseStats: { hp: 78, atk: 130, def: 111, spa: 130, spd: 85, spe: 100 }, spriteKey: 'charizard-megax', generation: 6, isMega: true },
  { id: 10035, name: 'Mega Charizard Y', frenchName: 'Méga-Dracaufeu Y', types: ['Feu', 'Vol'], baseStats: { hp: 78, atk: 104, def: 78, spa: 159, spd: 115, spe: 100 }, spriteKey: 'charizard-megay', generation: 6, isMega: true },

  { id: 7, name: 'Squirtle', frenchName: 'Carapuce', types: ['Eau'], baseStats: { hp: 44, atk: 48, def: 65, spa: 50, spd: 64, spe: 43 }, spriteKey: 'squirtle', generation: 1 },
  { id: 8, name: 'Wartortle', frenchName: 'Carabaffe', types: ['Eau'], baseStats: { hp: 59, atk: 63, def: 80, spa: 65, spd: 80, spe: 58 }, spriteKey: 'wartortle', generation: 1 },
  { id: 9, name: 'Blastoise', frenchName: 'Tortank', types: ['Eau'], baseStats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 }, spriteKey: 'blastoise', generation: 1 },
  { id: 10036, name: 'Mega Blastoise', frenchName: 'Méga-Tortank', types: ['Eau'], baseStats: { hp: 79, atk: 103, def: 120, spa: 135, spd: 115, spe: 78 }, spriteKey: 'blastoise-mega', generation: 6, isMega: true },

  // ==========================================
  // --- STARTERS 2G (Johto) ---
  // ==========================================
  { id: 152, name: 'Chikorita', frenchName: 'Germignon', types: ['Plante'], baseStats: { hp: 45, atk: 49, def: 65, spa: 49, spd: 65, spe: 45 }, spriteKey: 'chikorita', generation: 2 },
  { id: 153, name: 'Bayleef', frenchName: 'Macronium', types: ['Plante'], baseStats: { hp: 60, atk: 62, def: 80, spa: 63, spd: 80, spe: 60 }, spriteKey: 'bayleef', generation: 2 },
  { id: 154, name: 'Meganium', frenchName: 'Méganium', types: ['Plante'], baseStats: { hp: 80, atk: 82, def: 100, spa: 83, spd: 100, spe: 80 }, spriteKey: 'meganium', generation: 2 },

  { id: 155, name: 'Cyndaquil', frenchName: 'Héricendre', types: ['Feu'], baseStats: { hp: 39, atk: 52, def: 43, spa: 60, spd: 50, spe: 65 }, spriteKey: 'cyndaquil', generation: 2 },
  { id: 156, name: 'Quilava', frenchName: 'Feurisson', types: ['Feu'], baseStats: { hp: 58, atk: 64, def: 58, spa: 80, spd: 65, spe: 80 }, spriteKey: 'quilava', generation: 2 },
  { id: 157, name: 'Typhlosion', frenchName: 'Typhlosion', types: ['Feu'], baseStats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 }, spriteKey: 'typhlosion', generation: 2 },

  { id: 158, name: 'Totodile', frenchName: 'Kaiminus', types: ['Eau'], baseStats: { hp: 50, atk: 65, def: 64, spa: 44, spd: 48, spe: 43 }, spriteKey: 'totodile', generation: 2 },
  { id: 159, name: 'Croconaw', frenchName: 'Crocrodil', types: ['Eau'], baseStats: { hp: 65, atk: 80, def: 80, spa: 59, spd: 63, spe: 58 }, spriteKey: 'croconaw', generation: 2 },
  { id: 160, name: 'Feraligatr', frenchName: 'Aligatueur', types: ['Eau'], baseStats: { hp: 85, atk: 105, def: 100, spa: 79, spd: 83, spe: 78 }, spriteKey: 'feraligatr', generation: 2 },

  // ==========================================
  // --- STARTERS 3G (Hoenn) ---
  // ==========================================
  { id: 252, name: 'Treecko', frenchName: 'Arcko', types: ['Plante'], baseStats: { hp: 40, atk: 45, def: 35, spa: 65, spd: 55, spe: 70 }, spriteKey: 'treecko', generation: 3 },
  { id: 253, name: 'Grovyle', frenchName: 'Massko', types: ['Plante'], baseStats: { hp: 50, atk: 65, def: 45, spa: 85, spd: 65, spe: 95 }, spriteKey: 'grovyle', generation: 3 },
  { id: 254, name: 'Sceptile', frenchName: 'Jungko', types: ['Plante'], baseStats: { hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120 }, spriteKey: 'sceptile', generation: 3 },
  { id: 10065, name: 'Mega Sceptile', frenchName: 'Méga-Jungko', types: ['Plante', 'Dragon'], baseStats: { hp: 70, atk: 110, def: 75, spa: 145, spd: 85, spe: 145 }, spriteKey: 'sceptile-mega', generation: 6, isMega: true },

  { id: 255, name: 'Torchic', frenchName: 'Poussifeu', types: ['Feu'], baseStats: { hp: 45, atk: 60, def: 40, spa: 70, spd: 50, spe: 45 }, spriteKey: 'torchic', generation: 3 },
  { id: 256, name: 'Combusken', frenchName: 'Galifeu', types: ['Feu', 'Combat'], baseStats: { hp: 60, atk: 85, def: 60, spa: 85, spd: 60, spe: 55 }, spriteKey: 'combusken', generation: 3 },
  { id: 257, name: 'Blaziken', frenchName: 'Braségali', types: ['Feu', 'Combat'], baseStats: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80 }, spriteKey: 'blaziken', generation: 3 },
  { id: 10050, name: 'Mega Blaziken', frenchName: 'Méga-Braségali', types: ['Feu', 'Combat'], baseStats: { hp: 80, atk: 160, def: 80, spa: 130, spd: 80, spe: 100 }, spriteKey: 'blaziken-mega', generation: 6, isMega: true },

  { id: 258, name: 'Mudkip', frenchName: 'Gobou', types: ['Eau'], baseStats: { hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 40 }, spriteKey: 'mudkip', generation: 3 },
  { id: 259, name: 'Marshtomp', frenchName: 'Flobio', types: ['Eau', 'Sol'], baseStats: { hp: 70, atk: 85, def: 70, spa: 60, spd: 70, spe: 50 }, spriteKey: 'marshtomp', generation: 3 },
  { id: 260, name: 'Swampert', frenchName: 'Laggron', types: ['Eau', 'Sol'], baseStats: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60 }, spriteKey: 'swampert', generation: 3 },
  { id: 10064, name: 'Mega Swampert', frenchName: 'Méga-Laggron', types: ['Eau', 'Sol'], baseStats: { hp: 100, atk: 150, def: 110, spa: 95, spd: 110, spe: 70 }, spriteKey: 'swampert-mega', generation: 6, isMega: true },

  // ==========================================
  // --- STARTERS 4G (Sinnoh) ---
  // ==========================================
  { id: 387, name: 'Turtwig', frenchName: 'Tortipouss', types: ['Plante'], baseStats: { hp: 55, atk: 68, def: 64, spa: 45, spd: 55, spe: 31 }, spriteKey: 'turtwig', generation: 4 },
  { id: 388, name: 'Grotle', frenchName: 'Boskara', types: ['Plante'], baseStats: { hp: 75, atk: 89, def: 85, spa: 55, spd: 65, spe: 36 }, spriteKey: 'grotle', generation: 4 },
  { id: 389, name: 'Torterra', frenchName: 'Torterra', types: ['Plante', 'Sol'], baseStats: { hp: 95, atk: 109, def: 105, spa: 75, spd: 85, spe: 56 }, spriteKey: 'torterra', generation: 4 },

  { id: 390, name: 'Chimchar', frenchName: 'Ouisticram', types: ['Feu'], baseStats: { hp: 44, atk: 58, def: 44, spa: 58, spd: 44, spe: 61 }, spriteKey: 'chimchar', generation: 4 },
  { id: 391, name: 'Monferno', frenchName: 'Chimpenfeu', types: ['Feu', 'Combat'], baseStats: { hp: 64, atk: 78, def: 52, spa: 78, spd: 52, spe: 81 }, spriteKey: 'monferno', generation: 4 },
  { id: 392, name: 'Infernape', frenchName: 'Simiabraz', types: ['Feu', 'Combat'], baseStats: { hp: 76, atk: 104, def: 71, spa: 104, spd: 71, spe: 108 }, spriteKey: 'infernape', generation: 4 },

  { id: 393, name: 'Piplup', frenchName: 'Tiplouf', types: ['Eau'], baseStats: { hp: 53, atk: 51, def: 53, spa: 61, spd: 56, spe: 40 }, spriteKey: 'piplup', generation: 4 },
  { id: 394, name: 'Prinplup', frenchName: 'Prinplouf', types: ['Eau'], baseStats: { hp: 64, atk: 66, def: 68, spa: 81, spd: 76, spe: 50 }, spriteKey: 'prinplup', generation: 4 },
  { id: 395, name: 'Empoleon', frenchName: 'Pingoléon', types: ['Eau', 'Acier'], baseStats: { hp: 84, atk: 86, def: 88, spa: 111, spd: 101, spe: 60 }, spriteKey: 'empoleon', generation: 4 },

  // ==========================================
  // --- STARTERS 5G (Unys) ---
  // ==========================================
  { id: 495, name: 'Snivy', frenchName: 'Vipélierre', types: ['Plante'], baseStats: { hp: 45, atk: 45, def: 55, spa: 45, spd: 55, spe: 63 }, spriteKey: 'snivy', generation: 5 },
  { id: 496, name: 'Servine', frenchName: 'Lianaja', types: ['Plante'], baseStats: { hp: 60, atk: 60, def: 75, spa: 60, spd: 75, spe: 83 }, spriteKey: 'servine', generation: 5 },
  { id: 497, name: 'Serperior', frenchName: 'Majaspic', types: ['Plante'], baseStats: { hp: 75, atk: 75, def: 95, spa: 75, spd: 95, spe: 113 }, spriteKey: 'serperior', generation: 5 },

  { id: 498, name: 'Tepig', frenchName: 'Gruikui', types: ['Feu'], baseStats: { hp: 65, atk: 63, def: 45, spa: 45, spd: 45, spe: 45 }, spriteKey: 'tepig', generation: 5 },
  { id: 499, name: 'Pignite', frenchName: 'Grotichon', types: ['Feu', 'Combat'], baseStats: { hp: 90, atk: 93, def: 55, spa: 70, spd: 55, spe: 55 }, spriteKey: 'pignite', generation: 5 },
  { id: 500, name: 'Emboar', frenchName: 'Roitiflam', types: ['Feu', 'Combat'], baseStats: { hp: 110, atk: 123, def: 65, spa: 100, spd: 65, spe: 65 }, spriteKey: 'emboar', generation: 5 },

  { id: 501, name: 'Oshawott', frenchName: 'Moustillon', types: ['Eau'], baseStats: { hp: 55, atk: 55, def: 45, spa: 63, spd: 45, spe: 45 }, spriteKey: 'oshawott', generation: 5 },
  { id: 502, name: 'Dewott', frenchName: 'Mateloutre', types: ['Eau'], baseStats: { hp: 75, atk: 75, def: 60, spa: 83, spd: 60, spe: 60 }, spriteKey: 'dewott', generation: 5 },
  { id: 503, name: 'Samurott', frenchName: 'Clamiral', types: ['Eau'], baseStats: { hp: 95, atk: 100, def: 85, spa: 108, spd: 70, spe: 70 }, spriteKey: 'samurott', generation: 5 },

  // ==========================================
  // --- STARTERS 6G (Kalos) & Formes Z ---
  // ==========================================
  { id: 650, name: 'Chespin', frenchName: 'Marisson', types: ['Plante'], baseStats: { hp: 56, atk: 61, def: 65, spa: 48, spd: 45, spe: 38 }, spriteKey: 'chespin', generation: 6 },
  { id: 651, name: 'Quilladin', frenchName: 'Boguérisse', types: ['Plante'], baseStats: { hp: 61, atk: 78, def: 95, spa: 56, spd: 58, spe: 57 }, spriteKey: 'quilladin', generation: 6 },
  { id: 652, name: 'Chesnaught', frenchName: 'Blindépique', types: ['Plante', 'Combat'], baseStats: { hp: 88, atk: 107, def: 122, spa: 74, spd: 75, spe: 64 }, spriteKey: 'chesnaught', generation: 6 },
  
  { id: 653, name: 'Fennekin', frenchName: 'Feunnec', types: ['Feu'], baseStats: { hp: 40, atk: 45, def: 40, spa: 62, spd: 60, spe: 60 }, spriteKey: 'fennekin', generation: 6 },
  { id: 654, name: 'Braixen', frenchName: 'Roussil', types: ['Feu'], baseStats: { hp: 59, atk: 59, def: 58, spa: 90, spd: 70, spe: 73 }, spriteKey: 'braixen', generation: 6 },
  { id: 655, name: 'Delphox', frenchName: 'Goupelin', types: ['Feu', 'Psy'], baseStats: { hp: 75, atk: 69, def: 72, spa: 114, spd: 100, spe: 104 }, spriteKey: 'delphox', generation: 6 },

  { id: 656, name: 'Froakie', frenchName: 'Grenousse', types: ['Eau'], baseStats: { hp: 41, atk: 56, def: 40, spa: 62, spd: 44, spe: 71 }, spriteKey: 'froakie', generation: 6 },
  { id: 657, name: 'Frogadier', frenchName: 'Croâporal', types: ['Eau'], baseStats: { hp: 54, atk: 63, def: 52, spa: 83, spd: 56, spe: 97 }, spriteKey: 'frogadier', generation: 6 },
  { id: 658, name: 'Greninja', frenchName: 'Amphinobi', types: ['Eau', 'Ténèbres'], baseStats: { hp: 72, atk: 95, def: 67, spa: 103, spd: 71, spe: 122 }, spriteKey: 'greninja', generation: 6 },
  { id: 6581, name: 'Ash-Greninja', frenchName: 'Sacha-Amphinobi', types: ['Eau', 'Ténèbres'], baseStats: { hp: 72, atk: 145, def: 67, spa: 153, spd: 71, spe: 132 }, spriteKey: 'greninja-ash', generation: 6, isMega: true },

  // Formes Z exclusives d'Eric Lostie
  { id: 6589, name: 'Greninja Z', frenchName: 'Amphinobi Z (Eau / Psy)', types: ['Eau', 'Psy'], baseStats: { hp: 72, atk: 95, def: 67, spa: 108, spd: 71, spe: 122 }, spriteKey: 'greninja', generation: 6 },
  { id: 6559, name: 'Delphox Z', frenchName: 'Goupelin Z (Feu / Électrik)', types: ['Feu', 'Électrik'], baseStats: { hp: 75, atk: 69, def: 72, spa: 114, spd: 100, spe: 104 }, spriteKey: 'delphox', generation: 6 },
  { id: 6529, name: 'Chesnaught Z', frenchName: 'Blindépique Z (Plante / Sol)', types: ['Plante', 'Sol'], baseStats: { hp: 88, atk: 107, def: 122, spa: 74, spd: 75, spe: 64 }, spriteKey: 'chesnaught', generation: 6 },

  // ==========================================
  // --- STARTERS 7G (Alola) ---
  // ==========================================
  { id: 722, name: 'Rowlet', frenchName: 'Brindibou', types: ['Plante', 'Vol'], baseStats: { hp: 68, atk: 55, def: 55, spa: 50, spd: 50, spe: 42 }, spriteKey: 'rowlet', generation: 7 },
  { id: 723, name: 'Dartrix', frenchName: 'Efflèche', types: ['Plante', 'Vol'], baseStats: { hp: 78, atk: 75, def: 75, spa: 70, spd: 70, spe: 52 }, spriteKey: 'dartrix', generation: 7 },
  { id: 724, name: 'Decidueye', frenchName: 'Archéduc', types: ['Plante', 'Spectre'], baseStats: { hp: 78, atk: 107, def: 75, spa: 100, spd: 100, spe: 70 }, spriteKey: 'decidueye', generation: 7 },

  { id: 725, name: 'Litten', frenchName: 'Flamiaou', types: ['Feu'], baseStats: { hp: 45, atk: 65, def: 40, spa: 60, spd: 40, spe: 70 }, spriteKey: 'litten', generation: 7 },
  { id: 726, name: 'Torracat', frenchName: 'Matoufeu', types: ['Feu'], baseStats: { hp: 65, atk: 85, def: 50, spa: 80, spd: 50, spe: 90 }, spriteKey: 'torracat', generation: 7 },
  { id: 727, name: 'Incineroar', frenchName: 'Félinferno', types: ['Feu', 'Ténèbres'], baseStats: { hp: 95, atk: 115, def: 90, spa: 80, spd: 90, spe: 60 }, spriteKey: 'incineroar', generation: 7 },

  { id: 728, name: 'Popplio', frenchName: 'Otaquin', types: ['Eau'], baseStats: { hp: 50, atk: 54, def: 54, spa: 66, spd: 56, spe: 40 }, spriteKey: 'popplio', generation: 7 },
  { id: 729, name: 'Brionne', frenchName: 'Otarlette', types: ['Eau'], baseStats: { hp: 60, atk: 69, def: 69, spa: 91, spd: 81, spe: 50 }, spriteKey: 'brionne', generation: 7 },
  { id: 730, name: 'Primarina', frenchName: 'Oratoria', types: ['Eau', 'Fée'], baseStats: { hp: 80, atk: 74, def: 74, spa: 126, spd: 116, spe: 60 }, spriteKey: 'primarina', generation: 7 },

  // ==========================================
  // --- STARTERS 8G (Galar) ---
  // ==========================================
  { id: 810, name: 'Grookey', frenchName: 'Ouistempo', types: ['Plante'], baseStats: { hp: 50, atk: 65, def: 50, spa: 40, spd: 40, spe: 65 }, spriteKey: 'grookey', generation: 8 },
  { id: 811, name: 'Thwackey', frenchName: 'Badabouin', types: ['Plante'], baseStats: { hp: 70, atk: 85, def: 70, spa: 55, spd: 60, spe: 80 }, spriteKey: 'thwackey', generation: 8 },
  { id: 812, name: 'Rillaboom', frenchName: 'Gorythmic', types: ['Plante'], baseStats: { hp: 100, atk: 125, def: 90, spa: 60, spd: 70, spe: 85 }, spriteKey: 'rillaboom', generation: 8 },

  { id: 813, name: 'Scorbunny', frenchName: 'Flambino', types: ['Feu'], baseStats: { hp: 50, atk: 71, def: 40, spa: 40, spd: 40, spe: 69 }, spriteKey: 'scorbunny', generation: 8 },
  { id: 814, name: 'Raboot', frenchName: 'Lapinro', types: ['Feu'], baseStats: { hp: 65, atk: 86, def: 60, spa: 55, spd: 60, spe: 94 }, spriteKey: 'raboot', generation: 8 },
  { id: 815, name: 'Cinderace', frenchName: 'Pyrobut', types: ['Feu'], baseStats: { hp: 80, atk: 116, def: 75, spa: 65, spd: 75, spe: 119 }, spriteKey: 'cinderace', generation: 8 },

  { id: 816, name: 'Sobble', frenchName: 'Larméléon', types: ['Eau'], baseStats: { hp: 50, atk: 40, def: 40, spa: 70, spd: 40, spe: 70 }, spriteKey: 'sobble', generation: 8 },
  { id: 817, name: 'Drizzile', frenchName: 'Arrozard', types: ['Eau'], baseStats: { hp: 65, atk: 60, def: 55, spa: 95, spd: 55, spe: 90 }, spriteKey: 'drizzile', generation: 8 },
  { id: 818, name: 'Inteleon', frenchName: 'Lézargus', types: ['Eau'], baseStats: { hp: 70, atk: 85, def: 65, spa: 125, spd: 65, spe: 120 }, spriteKey: 'inteleon', generation: 8 },

  // ==========================================
  // --- STARTERS 9G (Paldea) ---
  // ==========================================
  { id: 906, name: 'Sprigatito', frenchName: 'Poussacha', types: ['Plante'], baseStats: { hp: 40, atk: 61, def: 54, spa: 45, spd: 45, spe: 65 }, spriteKey: 'sprigatito', generation: 9 },
  { id: 907, name: 'Floragato', frenchName: 'Matourgeon', types: ['Plante'], baseStats: { hp: 61, atk: 80, def: 63, spa: 60, spd: 63, spe: 83 }, spriteKey: 'floragato', generation: 9 },
  { id: 908, name: 'Meowscarada', frenchName: 'Miascarade', types: ['Plante', 'Ténèbres'], baseStats: { hp: 76, atk: 110, def: 70, spa: 81, spd: 70, spe: 123 }, spriteKey: 'meowscarada', generation: 9 },

  { id: 909, name: 'Fuecoco', frenchName: 'Chochodile', types: ['Feu'], baseStats: { hp: 67, atk: 45, def: 59, spa: 63, spd: 40, spe: 36 }, spriteKey: 'fuecoco', generation: 9 },
  { id: 910, name: 'Crocalor', frenchName: 'Crocogril', types: ['Feu'], baseStats: { hp: 81, atk: 55, def: 78, spa: 90, spd: 58, spe: 49 }, spriteKey: 'crocalor', generation: 9 },
  { id: 911, name: 'Skeledirge', frenchName: 'Flâmigator', types: ['Feu', 'Spectre'], baseStats: { hp: 104, atk: 75, def: 100, spa: 110, spd: 75, spe: 66 }, spriteKey: 'skeledirge', generation: 9 },

  { id: 912, name: 'Quaxly', frenchName: 'Coiffeton', types: ['Eau'], baseStats: { hp: 55, atk: 65, def: 45, spa: 50, spd: 45, spe: 50 }, spriteKey: 'quaxly', generation: 9 },
  { id: 913, name: 'Quaxwell', frenchName: 'Canarbito', types: ['Eau'], baseStats: { hp: 70, atk: 85, def: 65, spa: 65, spd: 60, spe: 65 }, spriteKey: 'quaxwell', generation: 9 },
  { id: 914, name: 'Quaquaval', frenchName: 'Palmaval', types: ['Eau', 'Combat'], baseStats: { hp: 85, atk: 120, def: 80, spa: 85, spd: 75, spe: 85 }, spriteKey: 'quaquaval', generation: 9 },

  // ==========================================
  // --- FORMES RÉGIONALES KALOS Z ---
  // ==========================================
  { id: 2599, name: 'Pikachu Z', frenchName: 'Pikachu Z (Poison / Électrik)', types: ['Poison', 'Électrik'], baseStats: { hp: 35, atk: 55, def: 40, spa: 55, spd: 50, spe: 95 }, spriteKey: 'pikachu', generation: 1 },
  { id: 2699, name: 'Raichu Z', frenchName: 'Raichu Z (Poison / Électrik)', types: ['Poison', 'Électrik'], baseStats: { hp: 60, atk: 90, def: 55, spa: 95, spd: 80, spe: 110 }, spriteKey: 'raichu', generation: 1 },
  { id: 10599, name: 'Marowak Z', frenchName: 'Ossatueur Z (Sol / Acier)', types: ['Sol', 'Acier'], baseStats: { hp: 60, atk: 85, def: 110, spa: 50, spd: 80, spe: 45 }, spriteKey: 'marowak', generation: 1 },
  { id: 40099, name: 'Bibarel Z', frenchName: 'Castorno Z (Normal / Glace)', types: ['Normal', 'Glace'], baseStats: { hp: 79, atk: 85, def: 60, spa: 55, spd: 60, spe: 71 }, spriteKey: 'bibarel', generation: 4 },
  { id: 57999, name: 'Reuniclus Z', frenchName: 'Symbios Z (Psy / Spectre)', types: ['Psy', 'Spectre'], baseStats: { hp: 110, atk: 65, def: 75, spa: 125, spd: 85, spe: 30 }, spriteKey: 'reuniclus', generation: 5 },
  { id: 47499, name: 'Porygon-Z Z', frenchName: 'Porygon-Z Z (Normal / Électrik)', types: ['Normal', 'Électrik'], baseStats: { hp: 85, atk: 80, def: 70, spa: 135, spd: 75, spe: 90 }, spriteKey: 'porygon-z', generation: 4 },

  // Early Routes Kalos
  { id: 659, name: 'Bunnelby', frenchName: 'Sapereau', types: ['Normal'], baseStats: { hp: 38, atk: 36, def: 38, spa: 32, spd: 36, spe: 57 }, spriteKey: 'bunnelby', generation: 6 },
  { id: 660, name: 'Diggersby', frenchName: 'Excavarenne', types: ['Normal', 'Sol'], baseStats: { hp: 85, atk: 56, def: 77, spa: 50, spd: 77, spe: 78 }, spriteKey: 'diggersby', generation: 6 },

  { id: 661, name: 'Fletchling', frenchName: 'Passerouge', types: ['Normal', 'Vol'], baseStats: { hp: 45, atk: 50, def: 43, spa: 40, spd: 38, spe: 62 }, spriteKey: 'fletchling', generation: 6 },
  { id: 662, name: 'Fletchinder', frenchName: 'Braisillon', types: ['Feu', 'Vol'], baseStats: { hp: 62, atk: 73, def: 55, spa: 56, spd: 52, spe: 84 }, spriteKey: 'fletchinder', generation: 6 },
  { id: 663, name: 'Talonflame', frenchName: 'Flambusard', types: ['Feu', 'Vol'], baseStats: { hp: 78, atk: 81, def: 71, spa: 74, spd: 69, spe: 126 }, spriteKey: 'talonflame', generation: 6 },

  { id: 664, name: 'Scatterbug', frenchName: 'Lépidonille', types: ['Insecte'], baseStats: { hp: 38, atk: 35, def: 40, spa: 27, spd: 25, spe: 35 }, spriteKey: 'scatterbug', generation: 6 },
  { id: 665, name: 'Spewpa', frenchName: 'Pérégrain', types: ['Insecte'], baseStats: { hp: 45, atk: 22, def: 60, spa: 27, spd: 30, spe: 29 }, spriteKey: 'spewpa', generation: 6 },
  { id: 666, name: 'Vivillon', frenchName: 'Prismillon', types: ['Insecte', 'Vol'], baseStats: { hp: 80, atk: 52, def: 50, spa: 90, spd: 50, spe: 89 }, spriteKey: 'vivillon', generation: 6 },

  { id: 667, name: 'Litleo', frenchName: 'Hélionceau', types: ['Feu', 'Normal'], baseStats: { hp: 62, atk: 50, def: 58, spa: 73, spd: 54, spe: 72 }, spriteKey: 'litleo', generation: 6 },
  { id: 668, name: 'Pyroar', frenchName: 'Némélios', types: ['Feu', 'Normal'], baseStats: { hp: 86, atk: 68, def: 72, spa: 109, spd: 66, spe: 106 }, spriteKey: 'pyroar', generation: 6 },

  { id: 669, name: 'Flabébé', frenchName: 'Flabébé', types: ['Fée'], baseStats: { hp: 44, atk: 38, def: 39, spa: 61, spd: 79, spe: 42 }, spriteKey: 'flabebe', generation: 6 },
  { id: 670, name: 'Floette', frenchName: 'Floette', types: ['Fée'], baseStats: { hp: 54, atk: 45, def: 47, spa: 75, spd: 98, spe: 52 }, spriteKey: 'floette', generation: 6 },
  { id: 671, name: 'Florges', frenchName: 'Florges', types: ['Fée'], baseStats: { hp: 78, atk: 65, def: 68, spa: 112, spd: 154, spe: 75 }, spriteKey: 'florges', generation: 6 },
  { id: 6701, name: 'Eternal Floette', frenchName: 'Floette Fleur Éternelle (AZ)', types: ['Fée'], baseStats: { hp: 74, atk: 65, def: 67, spa: 125, spd: 128, spe: 92 }, spriteKey: 'floette-eternal', generation: 6, isLegendary: true },

  { id: 672, name: 'Skiddo', frenchName: 'Cabriolaine', types: ['Plante'], baseStats: { hp: 66, atk: 65, def: 48, spa: 62, spd: 57, spe: 52 }, spriteKey: 'skiddo', generation: 6 },
  { id: 673, name: 'Gogoat', frenchName: 'Chevroum', types: ['Plante'], baseStats: { hp: 123, atk: 100, def: 62, spa: 97, spd: 81, spe: 68 }, spriteKey: 'gogoat', generation: 6 },

  { id: 674, name: 'Pancham', frenchName: 'Pandespiègle', types: ['Combat'], baseStats: { hp: 67, atk: 82, def: 62, spa: 46, spd: 48, spe: 43 }, spriteKey: 'pancham', generation: 6 },
  { id: 675, name: 'Pangoro', frenchName: 'Pandarbare', types: ['Combat', 'Ténèbres'], baseStats: { hp: 95, atk: 124, def: 78, spa: 69, spd: 71, spe: 58 }, spriteKey: 'pangoro', generation: 6 },

  { id: 676, name: 'Furfrou', frenchName: 'Couafarel', types: ['Normal'], baseStats: { hp: 75, atk: 80, def: 60, spa: 65, spd: 90, spe: 102 }, spriteKey: 'furfrou', generation: 6 },

  { id: 677, name: 'Espurr', frenchName: 'Psystigri', types: ['Psy'], baseStats: { hp: 62, atk: 48, def: 54, spa: 63, spd: 60, spe: 68 }, spriteKey: 'espurr', generation: 6 },
  { id: 678, name: 'Meowstic', frenchName: 'Mistigrix', types: ['Psy'], baseStats: { hp: 74, atk: 48, def: 76, spa: 83, spd: 81, spe: 104 }, spriteKey: 'meowstic', generation: 6 },

  // Honedge line (Signature Kalos Steel/Ghost)
  { id: 679, name: 'Honedge', frenchName: 'Monorpale', types: ['Acier', 'Spectre'], baseStats: { hp: 45, atk: 80, def: 100, spa: 35, spd: 37, spe: 28 }, spriteKey: 'honedge', generation: 6 },
  { id: 680, name: 'Doublade', frenchName: 'Dimoclès', types: ['Acier', 'Spectre'], baseStats: { hp: 59, atk: 110, def: 150, spa: 45, spd: 49, spe: 35 }, spriteKey: 'doublade', generation: 6 },
  { id: 681, name: 'Aegislash', frenchName: 'Exagide', types: ['Acier', 'Spectre'], baseStats: { hp: 60, atk: 50, def: 140, spa: 50, spd: 140, spe: 60 }, spriteKey: 'aegislash', generation: 6 },

  { id: 682, name: 'Spritzee', frenchName: 'Fluvetin', types: ['Fée'], baseStats: { hp: 78, atk: 52, def: 60, spa: 63, spd: 65, spe: 23 }, spriteKey: 'spritzee', generation: 6 },
  { id: 683, name: 'Aromatisse', frenchName: 'Cocotine', types: ['Fée'], baseStats: { hp: 101, atk: 72, def: 72, spa: 99, spd: 89, spe: 29 }, spriteKey: 'aromatisse', generation: 6 },

  { id: 684, name: 'Swirlix', frenchName: 'Sucroquin', types: ['Fée'], baseStats: { hp: 62, atk: 48, def: 66, spa: 59, spd: 57, spe: 49 }, spriteKey: 'swirlix', generation: 6 },
  { id: 685, name: 'Slurpuff', frenchName: 'Cupcanaille', types: ['Fée'], baseStats: { hp: 82, atk: 80, def: 86, spa: 85, spd: 75, spe: 72 }, spriteKey: 'slurpuff', generation: 6 },

  { id: 686, name: 'Inkay', frenchName: 'Sepiatop', types: ['Ténèbres', 'Psy'], baseStats: { hp: 53, atk: 54, def: 53, spa: 37, spd: 46, spe: 45 }, spriteKey: 'inkay', generation: 6 },
  { id: 687, name: 'Malamar', frenchName: 'Sepiatroce', types: ['Ténèbres', 'Psy'], baseStats: { hp: 86, atk: 92, def: 88, spa: 68, spd: 75, spe: 73 }, spriteKey: 'malamar', generation: 6 },

  { id: 688, name: 'Binacle', frenchName: 'Opermine', types: ['Roche', 'Eau'], baseStats: { hp: 42, atk: 52, def: 67, spa: 39, spd: 56, spe: 50 }, spriteKey: 'binacle', generation: 6 },
  { id: 689, name: 'Barbaracle', frenchName: 'Golgopathe', types: ['Roche', 'Eau'], baseStats: { hp: 72, atk: 105, def: 115, spa: 54, spd: 86, spe: 68 }, spriteKey: 'barbaracle', generation: 6 },

  { id: 690, name: 'Skrelp', frenchName: 'Venalgue', types: ['Poison', 'Eau'], baseStats: { hp: 50, atk: 60, def: 60, spa: 60, spd: 60, spe: 30 }, spriteKey: 'skrelp', generation: 6 },
  { id: 691, name: 'Dragalge', frenchName: 'Kravarech', types: ['Poison', 'Dragon'], baseStats: { hp: 65, atk: 75, def: 90, spa: 97, spd: 123, spe: 44 }, spriteKey: 'dragalge', generation: 6 },

  { id: 692, name: 'Clauncher', frenchName: 'Flingouste', types: ['Eau'], baseStats: { hp: 50, atk: 53, def: 62, spa: 58, spd: 63, spe: 44 }, spriteKey: 'clauncher', generation: 6 },
  { id: 693, name: 'Clawitzer', frenchName: 'Gamblast', types: ['Eau'], baseStats: { hp: 71, atk: 73, def: 88, spa: 120, spd: 89, spe: 59 }, spriteKey: 'clawitzer', generation: 6 },

  { id: 694, name: 'Helioptile', frenchName: 'Galvaran', types: ['Électrik', 'Normal'], baseStats: { hp: 44, atk: 38, def: 33, spa: 61, spd: 43, spe: 70 }, spriteKey: 'helioptile', generation: 6 },
  { id: 695, name: 'Heliolisk', frenchName: 'Iguolta', types: ['Électrik', 'Normal'], baseStats: { hp: 62, atk: 55, def: 52, spa: 109, spd: 94, spe: 109 }, spriteKey: 'heliolisk', generation: 6 },

  // Fossils
  { id: 696, name: 'Tyrunt', frenchName: 'Ptyranidur', types: ['Roche', 'Dragon'], baseStats: { hp: 58, atk: 89, def: 77, spa: 45, spd: 45, spe: 48 }, spriteKey: 'tyrunt', generation: 6 },
  { id: 697, name: 'Tyrantrum', frenchName: 'Rexillius', types: ['Roche', 'Dragon'], baseStats: { hp: 82, atk: 121, def: 119, spa: 69, spd: 59, spe: 71 }, spriteKey: 'tyrantrum', generation: 6 },

  { id: 698, name: 'Amaura', frenchName: 'Amagara', types: ['Roche', 'Glace'], baseStats: { hp: 77, atk: 59, def: 50, spa: 67, spd: 63, spe: 46 }, spriteKey: 'amaura', generation: 6 },
  { id: 699, name: 'Aurorus', frenchName: 'Dragmara', types: ['Roche', 'Glace'], baseStats: { hp: 123, atk: 77, def: 72, spa: 99, spd: 92, spe: 58 }, spriteKey: 'aurorus', generation: 6 },

  // Sylveon (Kalos Eeveelution)
  { id: 700, name: 'Sylveon', frenchName: 'Nymphali', types: ['Fée'], baseStats: { hp: 95, atk: 65, def: 65, spa: 110, spd: 130, spe: 60 }, spriteKey: 'sylveon', generation: 6 },
  { id: 133, name: 'Eevee', frenchName: 'Évoli', types: ['Normal'], baseStats: { hp: 55, atk: 55, def: 50, spa: 45, spd: 65, spe: 55 }, spriteKey: 'eevee', generation: 1 },
  { id: 134, name: 'Vaporeon', frenchName: 'Aquali', types: ['Eau'], baseStats: { hp: 130, atk: 65, def: 60, spa: 110, spd: 95, spe: 65 }, spriteKey: 'vaporeon', generation: 1 },
  { id: 135, name: 'Jolteon', frenchName: 'Voltali', types: ['Électrik'], baseStats: { hp: 65, atk: 65, def: 60, spa: 110, spd: 95, spe: 130 }, spriteKey: 'jolteon', generation: 1 },
  { id: 136, name: 'Flareon', frenchName: 'Pyroli', types: ['Feu'], baseStats: { hp: 65, atk: 130, def: 60, spa: 95, spd: 110, spe: 65 }, spriteKey: 'flareon', generation: 1 },
  { id: 196, name: 'Espeon', frenchName: 'Mentali', types: ['Psy'], baseStats: { hp: 65, atk: 65, def: 60, spa: 130, spd: 95, spe: 110 }, spriteKey: 'espeon', generation: 2 },
  { id: 197, name: 'Umbreon', frenchName: 'Noctali', types: ['Ténèbres'], baseStats: { hp: 95, atk: 65, def: 110, spa: 60, spd: 130, spe: 65 }, spriteKey: 'umbreon', generation: 2 },
  { id: 470, name: 'Leafeon', frenchName: 'Phyllali', types: ['Plante'], baseStats: { hp: 65, atk: 110, def: 130, spa: 60, spd: 65, spe: 95 }, spriteKey: 'leafeon', generation: 4 },
  { id: 471, name: 'Glaceon', frenchName: 'Givrali', types: ['Glace'], baseStats: { hp: 65, atk: 60, def: 110, spa: 130, spd: 95, spe: 65 }, spriteKey: 'glaceon', generation: 4 },

  { id: 701, name: 'Hawlucha', frenchName: 'Brutalibré', types: ['Combat', 'Vol'], baseStats: { hp: 78, atk: 92, def: 75, spa: 74, spd: 63, spe: 118 }, spriteKey: 'hawlucha', generation: 6 },
  { id: 702, name: 'Dedenne', frenchName: 'Dedenne', types: ['Électrik', 'Fée'], baseStats: { hp: 67, atk: 58, def: 57, spa: 81, spd: 67, spe: 101 }, spriteKey: 'dedenne', generation: 6 },
  { id: 703, name: 'Carbink', frenchName: 'Strassie', types: ['Roche', 'Fée'], baseStats: { hp: 50, atk: 50, def: 150, spa: 50, spd: 150, spe: 50 }, spriteKey: 'carbink', generation: 6 },

  // Goomy line (Kalos Pseudo Legendary)
  { id: 704, name: 'Goomy', frenchName: 'Mucuscule', types: ['Dragon'], baseStats: { hp: 45, atk: 50, def: 35, spa: 55, spd: 75, spe: 40 }, spriteKey: 'goomy', generation: 6 },
  { id: 705, name: 'Sliggoo', frenchName: 'Colimucus', types: ['Dragon'], baseStats: { hp: 68, atk: 75, def: 53, spa: 83, spd: 113, spe: 60 }, spriteKey: 'sliggoo', generation: 6 },
  { id: 706, name: 'Goodra', frenchName: 'Muplodocus', types: ['Dragon'], baseStats: { hp: 90, atk: 100, def: 70, spa: 110, spd: 150, spe: 80 }, spriteKey: 'goodra', generation: 6 },

  { id: 707, name: 'Klefki', frenchName: 'Trousselin', types: ['Acier', 'Fée'], baseStats: { hp: 57, atk: 80, def: 91, spa: 80, spd: 87, spe: 75 }, spriteKey: 'klefki', generation: 6 },
  { id: 708, name: 'Phantump', frenchName: 'Brocélôme', types: ['Spectre', 'Plante'], baseStats: { hp: 43, atk: 70, def: 48, spa: 50, spd: 60, spe: 38 }, spriteKey: 'phantump', generation: 6 },
  { id: 709, name: 'Trevenant', frenchName: 'Desséliande', types: ['Spectre', 'Plante'], baseStats: { hp: 85, atk: 110, def: 76, spa: 65, spd: 82, spe: 56 }, spriteKey: 'trevenant', generation: 6 },

  { id: 710, name: 'Pumpkaboo', frenchName: 'Pitrouille', types: ['Spectre', 'Plante'], baseStats: { hp: 49, atk: 66, def: 70, spa: 44, spd: 55, spe: 51 }, spriteKey: 'pumpkaboo', generation: 6 },
  { id: 711, name: 'Gourgeist', frenchName: 'Banshitrouye', types: ['Spectre', 'Plante'], baseStats: { hp: 65, atk: 90, def: 122, spa: 58, spd: 75, spe: 84 }, spriteKey: 'gourgeist', generation: 6 },

  { id: 712, name: 'Bergmite', frenchName: 'Grelaçon', types: ['Glace'], baseStats: { hp: 55, atk: 69, def: 85, spa: 32, spd: 35, spe: 28 }, spriteKey: 'bergmite', generation: 6 },
  { id: 713, name: 'Avalugg', frenchName: 'Séracrawl', types: ['Glace'], baseStats: { hp: 95, atk: 117, def: 184, spa: 44, spd: 46, spe: 28 }, spriteKey: 'avalugg', generation: 6 },

  { id: 714, name: 'Noibat', frenchName: 'Sonistrelle', types: ['Vol', 'Dragon'], baseStats: { hp: 40, atk: 30, def: 35, spa: 45, spd: 40, spe: 55 }, spriteKey: 'noibat', generation: 6 },
  { id: 715, name: 'Noivern', frenchName: 'Bruyverne', types: ['Vol', 'Dragon'], baseStats: { hp: 85, atk: 70, def: 80, spa: 97, spd: 80, spe: 123 }, spriteKey: 'noivern', generation: 6 },

  // Legendary & Zygarde Forms (Crucial for Pokémon Z!)
  { id: 716, name: 'Xerneas', frenchName: 'Xerneas', types: ['Fée'], baseStats: { hp: 126, atk: 131, def: 95, spa: 131, spd: 98, spe: 99 }, spriteKey: 'xerneas', generation: 6, isLegendary: true },
  { id: 717, name: 'Yveltal', frenchName: 'Yveltal', types: ['Ténèbres', 'Vol'], baseStats: { hp: 126, atk: 131, def: 95, spa: 131, spd: 98, spe: 99 }, spriteKey: 'yveltal', generation: 6, isLegendary: true },
  
  // ZYGARDE FORMS
  { id: 718, name: 'Zygarde 50%', frenchName: 'Zygarde Forme 50%', types: ['Dragon', 'Sol'], baseStats: { hp: 108, atk: 100, def: 121, spa: 81, spd: 95, spe: 95 }, spriteKey: 'zygarde', generation: 6, isLegendary: true },
  { id: 7181, name: 'Zygarde 10%', frenchName: 'Zygarde Forme 10% (Chien)', types: ['Dragon', 'Sol'], baseStats: { hp: 54, atk: 100, def: 71, spa: 61, spd: 85, spe: 115 }, spriteKey: 'zygarde-10', generation: 6, isLegendary: true },
  { id: 7182, name: 'Zygarde Complete', frenchName: 'Zygarde Forme Parfaite 100%', types: ['Dragon', 'Sol'], baseStats: { hp: 216, atk: 100, def: 121, spa: 91, spd: 95, spe: 85 }, spriteKey: 'zygarde-complete', generation: 6, isLegendary: true },
  { id: 7183, name: 'Zygarde Cell / Core', frenchName: 'Cœur & Cellule de Zygarde', types: ['Dragon', 'Sol'], baseStats: { hp: 30, atk: 30, def: 30, spa: 30, spd: 30, spe: 60 }, spriteKey: 'zygarde-core', generation: 6, isLegendary: true },

  { id: 719, name: 'Diancie', frenchName: 'Diancie', types: ['Roche', 'Fée'], baseStats: { hp: 50, atk: 100, def: 150, spa: 100, spd: 150, spe: 50 }, spriteKey: 'diancie', generation: 6, isLegendary: true },
  { id: 10075, name: 'Mega Diancie', frenchName: 'Méga-Diancie', types: ['Roche', 'Fée'], baseStats: { hp: 50, atk: 160, def: 110, spa: 160, spd: 110, spe: 110 }, spriteKey: 'diancie-mega', generation: 6, isMega: true },
  { id: 720, name: 'Hoopa', frenchName: 'Hoopa', types: ['Psy', 'Spectre'], baseStats: { hp: 80, atk: 110, def: 60, spa: 150, spd: 130, spe: 70 }, spriteKey: 'hoopa', generation: 6, isLegendary: true },
  { id: 7201, name: 'Hoopa Unbound', frenchName: 'Hoopa Déchaîné', types: ['Psy', 'Ténèbres'], baseStats: { hp: 80, atk: 160, def: 60, spa: 170, spd: 130, spe: 80 }, spriteKey: 'hoopa-unbound', generation: 6, isLegendary: true },
  { id: 721, name: 'Volcanion', frenchName: 'Volcanion', types: ['Feu', 'Eau'], baseStats: { hp: 80, atk: 110, def: 120, spa: 130, spd: 90, spe: 70 }, spriteKey: 'volcanion', generation: 6, isLegendary: true },

  // Key Mega Evolutions & Kalos Staples
  { id: 448, name: 'Lucario', frenchName: 'Lucario (Cadeau Korrina)', types: ['Combat', 'Acier'], baseStats: { hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90 }, spriteKey: 'lucario', generation: 4 },
  { id: 10017, name: 'Mega Lucario', frenchName: 'Méga-Lucario', types: ['Combat', 'Acier'], baseStats: { hp: 70, atk: 145, def: 88, spa: 140, spd: 70, spe: 112 }, spriteKey: 'lucario-mega', generation: 6, isMega: true },
  { id: 447, name: 'Riolu', frenchName: 'Riolu', types: ['Combat'], baseStats: { hp: 40, atk: 70, def: 40, spa: 35, spd: 40, spe: 60 }, spriteKey: 'riolu', generation: 4 },

  { id: 282, name: 'Gardevoir', frenchName: 'Gardevoir (Dianthéa)', types: ['Psy', 'Fée'], baseStats: { hp: 68, atk: 65, def: 65, spa: 125, spd: 115, spe: 80 }, spriteKey: 'gardevoir', generation: 3 },
  { id: 10051, name: 'Mega Gardevoir', frenchName: 'Méga-Gardevoir', types: ['Psy', 'Fée'], baseStats: { hp: 68, atk: 85, def: 65, spa: 165, spd: 135, spe: 100 }, spriteKey: 'gardevoir-mega', generation: 6, isMega: true },
  { id: 475, name: 'Gallade', frenchName: 'Gallame', types: ['Psy', 'Combat'], baseStats: { hp: 68, atk: 125, def: 65, spa: 65, spd: 115, spe: 80 }, spriteKey: 'gallade', generation: 4 },
  { id: 10068, name: 'Mega Gallade', frenchName: 'Méga-Gallame', types: ['Psy', 'Combat'], baseStats: { hp: 68, atk: 165, def: 95, spa: 65, spd: 115, spe: 110 }, spriteKey: 'gallade-mega', generation: 6, isMega: true },
  { id: 280, name: 'Ralts', frenchName: 'Tarsal', types: ['Psy', 'Fée'], baseStats: { hp: 28, atk: 25, def: 25, spa: 45, spd: 35, spe: 40 }, spriteKey: 'ralts', generation: 3 },
  { id: 281, name: 'Kirlia', frenchName: 'Kirlia', types: ['Psy', 'Fée'], baseStats: { hp: 38, atk: 35, def: 35, spa: 65, spd: 55, spe: 50 }, spriteKey: 'kirlia', generation: 3 },

  { id: 94, name: 'Gengar', frenchName: 'Ectoplasma', types: ['Spectre', 'Poison'], baseStats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 }, spriteKey: 'gengar', generation: 1 },
  { id: 10038, name: 'Mega Gengar', frenchName: 'Méga-Ectoplasma', types: ['Spectre', 'Poison'], baseStats: { hp: 60, atk: 65, def: 80, spa: 170, spd: 95, spe: 130 }, spriteKey: 'gengar-mega', generation: 6, isMega: true },
  { id: 92, name: 'Gastly', frenchName: 'Fantominus', types: ['Spectre', 'Poison'], baseStats: { hp: 30, atk: 35, def: 30, spa: 100, spd: 35, spe: 80 }, spriteKey: 'gastly', generation: 1 },
  { id: 93, name: 'Haunter', frenchName: 'Spectrum', types: ['Spectre', 'Poison'], baseStats: { hp: 45, atk: 50, def: 45, spa: 115, spd: 55, spe: 95 }, spriteKey: 'haunter', generation: 1 },

  { id: 130, name: 'Gyarados', frenchName: 'Léviator (Lysandre)', types: ['Eau', 'Vol'], baseStats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 }, spriteKey: 'gyarados', generation: 1 },
  { id: 10041, name: 'Mega Gyarados', frenchName: 'Méga-Léviator', types: ['Eau', 'Ténèbres'], baseStats: { hp: 95, atk: 155, def: 109, spa: 70, spd: 130, spe: 81 }, spriteKey: 'gyarados-mega', generation: 6, isMega: true },
  { id: 129, name: 'Magikarp', frenchName: 'Magicarpe', types: ['Eau'], baseStats: { hp: 20, atk: 10, def: 55, spa: 15, spd: 20, spe: 80 }, spriteKey: 'magikarp', generation: 1 },

  { id: 445, name: 'Garchomp', frenchName: 'Carchacrok', types: ['Dragon', 'Sol'], baseStats: { hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102 }, spriteKey: 'garchomp', generation: 4 },
  { id: 10058, name: 'Mega Garchomp', frenchName: 'Méga-Carchacrok', types: ['Dragon', 'Sol'], baseStats: { hp: 108, atk: 170, def: 115, spa: 120, spd: 95, spe: 92 }, spriteKey: 'garchomp-mega', generation: 6, isMega: true },
  { id: 443, name: 'Gible', frenchName: 'Griknot', types: ['Dragon', 'Sol'], baseStats: { hp: 58, atk: 70, def: 45, spa: 40, spd: 45, spe: 42 }, spriteKey: 'gible', generation: 4 },
  { id: 444, name: 'Gabite', frenchName: 'Carmache', types: ['Dragon', 'Sol'], baseStats: { hp: 68, atk: 90, def: 65, spa: 50, spd: 55, spe: 82 }, spriteKey: 'gabite', generation: 4 },

  { id: 248, name: 'Tyranitar', frenchName: 'Tyranocif', types: ['Roche', 'Ténèbres'], baseStats: { hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61 }, spriteKey: 'tyranitar', generation: 2 },
  { id: 10049, name: 'Mega Tyranitar', frenchName: 'Méga-Tyranocif', types: ['Roche', 'Ténèbres'], baseStats: { hp: 100, atk: 164, def: 150, spa: 95, spd: 120, spe: 71 }, spriteKey: 'tyranitar-mega', generation: 6, isMega: true },
  { id: 246, name: 'Larvitar', frenchName: 'Embrylex', types: ['Roche', 'Sol'], baseStats: { hp: 50, atk: 64, def: 50, spa: 45, spd: 50, spe: 41 }, spriteKey: 'larvitar', generation: 2 },
  { id: 247, name: 'Pupitar', frenchName: 'Ymphect', types: ['Roche', 'Sol'], baseStats: { hp: 70, atk: 84, def: 70, spa: 65, spd: 70, spe: 51 }, spriteKey: 'pupitar', generation: 2 },

  { id: 373, name: 'Salamence', frenchName: 'Drattak', types: ['Dragon', 'Vol'], baseStats: { hp: 95, atk: 135, def: 80, spa: 110, spd: 80, spe: 100 }, spriteKey: 'salamence', generation: 3 },
  { id: 10089, name: 'Mega Salamence', frenchName: 'Méga-Drattak', types: ['Dragon', 'Vol'], baseStats: { hp: 95, atk: 145, def: 130, spa: 120, spd: 90, spe: 120 }, spriteKey: 'salamence-mega', generation: 6, isMega: true },
  { id: 371, name: 'Bagon', frenchName: 'Draby', types: ['Dragon'], baseStats: { hp: 45, atk: 75, def: 60, spa: 40, spd: 30, spe: 50 }, spriteKey: 'bagon', generation: 3 },

  { id: 212, name: 'Scizor', frenchName: 'Cizayox (Wikstrom)', types: ['Insecte', 'Acier'], baseStats: { hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65 }, spriteKey: 'scizor', generation: 2 },
  { id: 10046, name: 'Mega Scizor', frenchName: 'Méga-Cizayox', types: ['Insecte', 'Acier'], baseStats: { hp: 70, atk: 150, def: 140, spa: 65, spd: 100, spe: 75 }, spriteKey: 'scizor-mega', generation: 6, isMega: true },
  { id: 123, name: 'Scyther', frenchName: 'Insécateur', types: ['Insecte', 'Vol'], baseStats: { hp: 70, atk: 110, def: 80, spa: 55, spd: 80, spe: 105 }, spriteKey: 'scyther', generation: 1 },

  { id: 143, name: 'Snorlax', frenchName: 'Ronflex (Route 7)', types: ['Normal'], baseStats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 }, spriteKey: 'snorlax', generation: 1 },
  { id: 131, name: 'Lapras', frenchName: 'Lokhlass (Cadeau Route 12)', types: ['Eau', 'Glace'], baseStats: { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 }, spriteKey: 'lapras', generation: 1 },
  { id: 359, name: 'Absol', frenchName: 'Absol', types: ['Ténèbres'], baseStats: { hp: 65, atk: 130, def: 60, spa: 75, spd: 60, spe: 75 }, spriteKey: 'absol', generation: 3 },
  { id: 10057, name: 'Mega Absol', frenchName: 'Méga-Absol', types: ['Ténèbres'], baseStats: { hp: 65, atk: 150, def: 60, spa: 115, spd: 60, spe: 115 }, spriteKey: 'absol-mega', generation: 6, isMega: true },

  { id: 303, name: 'Mawile', frenchName: 'Mysdibule', types: ['Acier', 'Fée'], baseStats: { hp: 50, atk: 85, def: 85, spa: 55, spd: 55, spe: 50 }, spriteKey: 'mawile', generation: 3 },
  { id: 10052, name: 'Mega Mawile', frenchName: 'Méga-Mysdibule', types: ['Acier', 'Fée'], baseStats: { hp: 50, atk: 105, def: 125, spa: 55, spd: 95, spe: 50 }, spriteKey: 'mawile-mega', generation: 6, isMega: true },

  { id: 115, name: 'Kangaskhan', frenchName: 'Kangourex', types: ['Normal'], baseStats: { hp: 105, atk: 95, def: 80, spa: 40, spd: 80, spe: 90 }, spriteKey: 'kangaskhan', generation: 1 },
  { id: 10039, name: 'Mega Kangaskhan', frenchName: 'Méga-Kangourex', types: ['Normal'], baseStats: { hp: 105, atk: 125, def: 100, spa: 60, spd: 100, spe: 100 }, spriteKey: 'kangaskhan-mega', generation: 6, isMega: true },

  { id: 181, name: 'Ampharos', frenchName: 'Pharamp', types: ['Électrik'], baseStats: { hp: 90, atk: 75, def: 85, spa: 115, spd: 90, spe: 55 }, spriteKey: 'ampharos', generation: 2 },
  { id: 10045, name: 'Mega Ampharos', frenchName: 'Méga-Pharamp', types: ['Électrik', 'Dragon'], baseStats: { hp: 90, atk: 95, def: 105, spa: 165, spd: 110, spe: 45 }, spriteKey: 'ampharos-mega', generation: 6, isMega: true },
  { id: 179, name: 'Mareep', frenchName: 'Wattouat', types: ['Électrik'], baseStats: { hp: 55, atk: 40, def: 40, spa: 65, spd: 45, spe: 35 }, spriteKey: 'mareep', generation: 2 },
  { id: 180, name: 'Flaaffy', frenchName: 'Lainergie', types: ['Électrik'], baseStats: { hp: 70, atk: 55, def: 55, spa: 80, spd: 60, spe: 45 }, spriteKey: 'flaaffy', generation: 2 },

  { id: 229, name: 'Houndoom', frenchName: 'Démolosse (Malva)', types: ['Ténèbres', 'Feu'], baseStats: { hp: 75, atk: 90, def: 50, spa: 110, spd: 80, spe: 95 }, spriteKey: 'houndoom', generation: 2 },
  { id: 10048, name: 'Mega Houndoom', frenchName: 'Méga-Démolosse', types: ['Ténèbres', 'Feu'], baseStats: { hp: 75, atk: 90, def: 90, spa: 140, spd: 90, spe: 115 }, spriteKey: 'houndoom-mega', generation: 6, isMega: true },
  { id: 228, name: 'Houndour', frenchName: 'Malosse', types: ['Ténèbres', 'Feu'], baseStats: { hp: 45, atk: 60, def: 30, spa: 80, spd: 50, spe: 65 }, spriteKey: 'houndour', generation: 2 },

  { id: 169, name: 'Crobat', frenchName: 'Nostenfer', types: ['Poison', 'Vol'], baseStats: { hp: 85, atk: 90, def: 80, spa: 70, spd: 80, spe: 130 }, spriteKey: 'crobat', generation: 2 },
  { id: 41, name: 'Zubat', frenchName: 'Nosferapti', types: ['Poison', 'Vol'], baseStats: { hp: 40, atk: 45, def: 35, spa: 30, spd: 40, spe: 55 }, spriteKey: 'zubat', generation: 1 },
  { id: 42, name: 'Golbat', frenchName: 'Nosferalto', types: ['Poison', 'Vol'], baseStats: { hp: 75, atk: 80, def: 70, spa: 65, spd: 75, spe: 90 }, spriteKey: 'golbat', generation: 1 },

  { id: 334, name: 'Altaria', frenchName: 'Altaria (Drasna)', types: ['Dragon', 'Vol'], baseStats: { hp: 75, atk: 70, def: 90, spa: 70, spd: 105, spe: 80 }, spriteKey: 'altaria', generation: 3 },
  { id: 10067, name: 'Mega Altaria', frenchName: 'Méga-Altaria', types: ['Dragon', 'Fée'], baseStats: { hp: 75, atk: 110, def: 110, spa: 110, spd: 105, spe: 80 }, spriteKey: 'altaria-mega', generation: 6, isMega: true },
  { id: 333, name: 'Swablu', frenchName: 'Tylton', types: ['Normal', 'Vol'], baseStats: { hp: 45, atk: 40, def: 60, spa: 40, spd: 75, spe: 50 }, spriteKey: 'swablu', generation: 3 },

  { id: 609, name: 'Chandelure', frenchName: 'Lugulabre', types: ['Spectre', 'Feu'], baseStats: { hp: 60, atk: 55, def: 90, spa: 145, spd: 90, spe: 80 }, spriteKey: 'chandelure', generation: 5 },
  { id: 607, name: 'Litwick', frenchName: 'Funécire', types: ['Spectre', 'Feu'], baseStats: { hp: 50, atk: 30, def: 55, spa: 65, spd: 55, spe: 20 }, spriteKey: 'litwick', generation: 5 },
  { id: 608, name: 'Lampent', frenchName: 'Mélancolux', types: ['Spectre', 'Feu'], baseStats: { hp: 60, atk: 40, def: 60, spa: 95, spd: 60, spe: 55 }, spriteKey: 'lampent', generation: 5 },

  { id: 635, name: 'Hydreigon', frenchName: 'Trioxhydre', types: ['Ténèbres', 'Dragon'], baseStats: { hp: 92, atk: 105, def: 90, spa: 125, spd: 90, spe: 98 }, spriteKey: 'hydreigon', generation: 5 },
  { id: 633, name: 'Deino', frenchName: 'Solochi', types: ['Ténèbres', 'Dragon'], baseStats: { hp: 52, atk: 65, def: 50, spa: 45, spd: 50, spe: 38 }, spriteKey: 'deino', generation: 5 },
  { id: 634, name: 'Zweilous', frenchName: 'Diamat', types: ['Ténèbres', 'Dragon'], baseStats: { hp: 72, atk: 85, def: 70, spa: 65, spd: 70, spe: 58 }, spriteKey: 'zweilous', generation: 5 },

  { id: 612, name: 'Haxorus', frenchName: 'Tranchodon', types: ['Dragon'], baseStats: { hp: 76, atk: 147, def: 90, spa: 60, spd: 70, spe: 97 }, spriteKey: 'haxorus', generation: 5 },
  { id: 610, name: 'Axew', frenchName: 'Coupenotte', types: ['Dragon'], baseStats: { hp: 46, atk: 87, def: 60, spa: 30, spd: 40, spe: 57 }, spriteKey: 'axew', generation: 5 },
  { id: 611, name: 'Fraxure', frenchName: 'Incisache', types: ['Dragon'], baseStats: { hp: 66, atk: 117, def: 70, spa: 40, spd: 50, spe: 67 }, spriteKey: 'fraxure', generation: 5 },

  { id: 571, name: 'Zoroark', frenchName: 'Zoroark', types: ['Ténèbres'], baseStats: { hp: 60, atk: 105, def: 60, spa: 120, spd: 60, spe: 105 }, spriteKey: 'zoroark', generation: 5 },
  { id: 570, name: 'Zorua', frenchName: 'Zorua', types: ['Ténèbres'], baseStats: { hp: 40, atk: 65, def: 40, spa: 80, spd: 40, spe: 65 }, spriteKey: 'zorua', generation: 5 },

  { id: 25, name: 'Pikachu', frenchName: 'Pikachu', types: ['Électrik'], baseStats: { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 }, spriteKey: 'pikachu', generation: 1 },
  { id: 26, name: 'Raichu', frenchName: 'Raichu', types: ['Électrik'], baseStats: { hp: 60, atk: 90, def: 55, spa: 90, spd: 80, spe: 110 }, spriteKey: 'raichu', generation: 1 },
  { id: 172, name: 'Pichu', frenchName: 'Pichu', types: ['Électrik'], baseStats: { hp: 20, atk: 40, def: 15, spa: 35, spd: 35, spe: 60 }, spriteKey: 'pichu', generation: 2 },

  { id: 208, name: 'Steelix', frenchName: 'Steelix', types: ['Acier', 'Sol'], baseStats: { hp: 75, atk: 85, def: 200, spa: 55, spd: 65, spe: 30 }, spriteKey: 'steelix', generation: 2 },
  { id: 10072, name: 'Mega Steelix', frenchName: 'Méga-Steelix', types: ['Acier', 'Sol'], baseStats: { hp: 75, atk: 125, def: 230, spa: 55, spd: 95, spe: 30 }, spriteKey: 'steelix-mega', generation: 6, isMega: true },
  { id: 95, name: 'Onix', frenchName: 'Onix', types: ['Roche', 'Sol'], baseStats: { hp: 35, atk: 45, def: 160, spa: 30, spd: 45, spe: 70 }, spriteKey: 'onix', generation: 1 },

  { id: 330, name: 'Flygon', frenchName: 'Libégon', types: ['Sol', 'Dragon'], baseStats: { hp: 80, atk: 100, def: 80, spa: 80, spd: 80, spe: 100 }, spriteKey: 'flygon', generation: 3 },
  { id: 328, name: 'Trapinch', frenchName: 'Kraknoix', types: ['Sol'], baseStats: { hp: 45, atk: 100, def: 45, spa: 45, spd: 45, spe: 10 }, spriteKey: 'trapinch', generation: 3 },
  { id: 329, name: 'Vibrava', frenchName: 'Vibraninf', types: ['Sol', 'Dragon'], baseStats: { hp: 50, atk: 70, def: 50, spa: 50, spd: 50, spe: 70 }, spriteKey: 'vibrava', generation: 3 },

  { id: 407, name: 'Roserade', frenchName: 'Roserade', types: ['Plante', 'Poison'], baseStats: { hp: 60, atk: 70, def: 65, spa: 125, spd: 105, spe: 90 }, spriteKey: 'roserade', generation: 4 },
  { id: 315, name: 'Roselia', frenchName: 'Rosélia', types: ['Plante', 'Poison'], baseStats: { hp: 50, atk: 60, def: 45, spa: 100, spd: 80, spe: 65 }, spriteKey: 'roselia', generation: 3 },
  { id: 406, name: 'Budew', frenchName: 'Rozbouton', types: ['Plante', 'Poison'], baseStats: { hp: 40, atk: 30, def: 35, spa: 50, spd: 70, spe: 55 }, spriteKey: 'budew', generation: 4 },

  { id: 398, name: 'Staraptor', frenchName: 'Étouraptor', types: ['Normal', 'Vol'], baseStats: { hp: 85, atk: 120, def: 70, spa: 50, spd: 60, spe: 100 }, spriteKey: 'staraptor', generation: 4 },
  { id: 396, name: 'Starly', frenchName: 'Étourmi', types: ['Normal', 'Vol'], baseStats: { hp: 40, atk: 55, def: 30, spa: 30, spd: 30, spe: 60 }, spriteKey: 'starly', generation: 4 },
  { id: 397, name: 'Staravia', frenchName: 'Étourvol', types: ['Normal', 'Vol'], baseStats: { hp: 55, atk: 75, def: 50, spa: 40, spd: 40, spe: 80 }, spriteKey: 'staravia', generation: 4 },

  { id: 214, name: 'Heracross', frenchName: 'Scarhino', types: ['Insecte', 'Combat'], baseStats: { hp: 80, atk: 125, def: 75, spa: 40, spd: 95, spe: 85 }, spriteKey: 'heracross', generation: 2 },
  { id: 10047, name: 'Mega Heracross', frenchName: 'Méga-Scarhino', types: ['Insecte', 'Combat'], baseStats: { hp: 80, atk: 185, def: 115, spa: 40, spd: 105, spe: 75 }, spriteKey: 'heracross-mega', generation: 6, isMega: true },
  
  { id: 127, name: 'Pinsir', frenchName: 'Scarabrute', types: ['Insecte'], baseStats: { hp: 65, atk: 125, def: 100, spa: 55, spd: 70, spe: 85 }, spriteKey: 'pinsir', generation: 1 },
  { id: 10040, name: 'Mega Pinsir', frenchName: 'Méga-Scarabrute', types: ['Insecte', 'Vol'], baseStats: { hp: 65, atk: 155, def: 120, spa: 65, spd: 90, spe: 105 }, spriteKey: 'pinsir-mega', generation: 6, isMega: true },

  { id: 460, name: 'Abomasnow', frenchName: 'Blizzaroi (Wulfric)', types: ['Plante', 'Glace'], baseStats: { hp: 90, atk: 92, def: 75, spa: 92, spd: 85, spe: 60 }, spriteKey: 'abomasnow', generation: 4 },
  { id: 10060, name: 'Mega Abomasnow', frenchName: 'Méga-Blizzaroi', types: ['Plante', 'Glace'], baseStats: { hp: 90, atk: 132, def: 105, spa: 132, spd: 105, spe: 30 }, spriteKey: 'abomasnow-mega', generation: 6, isMega: true },
  { id: 459, name: 'Snover', frenchName: 'Blizzi', types: ['Plante', 'Glace'], baseStats: { hp: 60, atk: 62, def: 50, spa: 62, spd: 60, spe: 40 }, spriteKey: 'snover', generation: 4 },

  { id: 227, name: 'Skarmory', frenchName: 'Airmure', types: ['Acier', 'Vol'], baseStats: { hp: 65, atk: 80, def: 140, spa: 40, spd: 70, spe: 70 }, spriteKey: 'skarmory', generation: 2 },
  { id: 530, name: 'Excadrill', frenchName: 'Minotaupe', types: ['Sol', 'Acier'], baseStats: { hp: 110, atk: 135, def: 60, spa: 50, spd: 65, spe: 88 }, spriteKey: 'excadrill', generation: 5 },
  { id: 529, name: 'Drilbur', frenchName: 'Rototaupe', types: ['Sol'], baseStats: { hp: 60, atk: 85, def: 40, spa: 30, spd: 45, spe: 68 }, spriteKey: 'drilbur', generation: 5 }
];

export function getPokemonSprite(species: PokemonSpecies | undefined, customUrl?: string, shiny?: boolean): string {
  if (customUrl) return customUrl;
  if (!species) return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  
  const key = species.spriteKey.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (shiny) {
    return `https://play.pokemonshowdown.com/sprites/ani-shiny/${key}.gif`;
  }
  // Primary animated showdown sprite, with fallback to official artwork or showdown static
  return `https://play.pokemonshowdown.com/sprites/ani/${key}.gif`;
}

export function getPokemonStaticArtwork(speciesId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;
}

export function searchPokemon(query: string): PokemonSpecies[] {
  if (!query || query.trim() === '') return POKEMON_DATABASE.slice(0, 30);
  const q = query.toLowerCase().trim();
  return POKEMON_DATABASE.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.frenchName.toLowerCase().includes(q) ||
    p.types.some(t => t.toLowerCase().includes(q))
  );
}

export function findPokemonByNames(nameOrFrench: string): PokemonSpecies | undefined {
  if (!nameOrFrench) return undefined;
  const target = nameOrFrench.toLowerCase().trim();
  return POKEMON_DATABASE.find(p => 
    p.name.toLowerCase() === target || 
    p.frenchName.toLowerCase() === target ||
    p.spriteKey.toLowerCase() === target
  );
}

export interface StarterEntry {
  gen: number;
  species: PokemonSpecies;
  isZForm?: boolean;
}

export const ALL_STARTERS_CATALOG: StarterEntry[] = [
  // 1G Kanto
  { gen: 1, species: POKEMON_DATABASE.find(p => p.id === 1)! },
  { gen: 1, species: POKEMON_DATABASE.find(p => p.id === 4)! },
  { gen: 1, species: POKEMON_DATABASE.find(p => p.id === 7)! },
  // 2G Johto
  { gen: 2, species: POKEMON_DATABASE.find(p => p.id === 152)! },
  { gen: 2, species: POKEMON_DATABASE.find(p => p.id === 155)! },
  { gen: 2, species: POKEMON_DATABASE.find(p => p.id === 158)! },
  // 3G Hoenn
  { gen: 3, species: POKEMON_DATABASE.find(p => p.id === 252)! },
  { gen: 3, species: POKEMON_DATABASE.find(p => p.id === 255)! },
  { gen: 3, species: POKEMON_DATABASE.find(p => p.id === 258)! },
  // 4G Sinnoh
  { gen: 4, species: POKEMON_DATABASE.find(p => p.id === 387)! },
  { gen: 4, species: POKEMON_DATABASE.find(p => p.id === 390)! },
  { gen: 4, species: POKEMON_DATABASE.find(p => p.id === 393)! },
  // 5G Unys
  { gen: 5, species: POKEMON_DATABASE.find(p => p.id === 495)! },
  { gen: 5, species: POKEMON_DATABASE.find(p => p.id === 498)! },
  { gen: 5, species: POKEMON_DATABASE.find(p => p.id === 501)! },
  // 6G Kalos
  { gen: 6, species: POKEMON_DATABASE.find(p => p.id === 650)! },
  { gen: 6, species: POKEMON_DATABASE.find(p => p.id === 653)! },
  { gen: 6, species: POKEMON_DATABASE.find(p => p.id === 656)! },
  // Formes Z Kalos
  { gen: 6, species: POKEMON_DATABASE.find(p => p.id === 6529) || POKEMON_DATABASE.find(p => p.id === 650)!, isZForm: true },
  { gen: 6, species: POKEMON_DATABASE.find(p => p.id === 6559) || POKEMON_DATABASE.find(p => p.id === 653)!, isZForm: true },
  { gen: 6, species: POKEMON_DATABASE.find(p => p.id === 6589) || POKEMON_DATABASE.find(p => p.id === 656)!, isZForm: true },
  // 7G Alola
  { gen: 7, species: POKEMON_DATABASE.find(p => p.id === 722)! },
  { gen: 7, species: POKEMON_DATABASE.find(p => p.id === 725)! },
  { gen: 7, species: POKEMON_DATABASE.find(p => p.id === 728)! },
  // 8G Galar
  { gen: 8, species: POKEMON_DATABASE.find(p => p.id === 810)! },
  { gen: 8, species: POKEMON_DATABASE.find(p => p.id === 813)! },
  { gen: 8, species: POKEMON_DATABASE.find(p => p.id === 816)! },
  // 9G Paldea
  { gen: 9, species: POKEMON_DATABASE.find(p => p.id === 906)! },
  { gen: 9, species: POKEMON_DATABASE.find(p => p.id === 909)! },
  { gen: 9, species: POKEMON_DATABASE.find(p => p.id === 912)! },
].filter(s => !!s.species);

