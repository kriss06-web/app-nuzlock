// Dictionnaire de traduction automatique Espagnol/Anglais -> Français (VF) pour les zones de Pokémon Z & Kalos

export const SPANISH_TO_FRENCH_TERMS: Record<string, string> = {
  'pueblo acrílico': 'Bourg Acrylique (Village à Reconstruire)',
  'pueblo acrilico': 'Bourg Acrylique (Village à Reconstruire)',
  'ruta 1': 'Route 1 (Sentier Découverte)',
  'ruta 2': 'Route 2 (Chemin Progrès)',
  'bosque de neuvartault': 'Forêt de Neuvartault',
  'ruta 3': 'Route 3 (Chemin Ouvert)',
  'ruta 22': 'Route 22 (Détour Fluvial)',
  'ruta 4': 'Route 4 (Parterre Fleuri)',
  'cité-illumis-antique': 'Illumis Antique (Faubourgs & Laboratoire)',
  'ruta 5': 'Route 5 (Chemin Versant)',
  'ruta 6': 'Route 6 (Allée du Palais Chabboneau)',
  'palais-chaydeuvre': 'Palais Chaydeuvre & Jardins Royaux',
  'ruta 7 nord': 'Route 7 Nord (Chemin des Berges)',
  'ruta 7 sud': 'Route 7 Sud (Passage vers la Grotte Étincelante)',
  'ruta 7': 'Route 7 (Chemin des Berges)',
  'cueva refulgente': 'Grotte Étincelante (Cueva Refulgente)',
  'pueblo bodegón': 'Village Bodegón (Restaurante Le Chonk)',
  'pueblo bodegon': 'Village Bodegón (Restaurante Le Chonk)',
  'isla certijo': 'Île Énigme (Isla Certijo)',
  'ruta 8': 'Route 8 (Falaise des Embruns)',
  'grotte-etincelante': 'Grotte Étincelante (Fossiles Antiques)',
  'ruta 9': 'Route 9 (Pistes Sauvages)',
  'ruta 10': 'Route 10 (Sentier Menhirs)',
  'ciudad yantra': 'Yantreizh (Tour de la Maîtrise)',
  'ruta 11': 'Route 11 (Chemin Miroir)',
  'grotte-miroitante': 'Grotte Miroitante (Reflets & Cristaux)',
  'ruta 12': 'Route 12 (Chemin Fourrage)',
  'baie-azur': 'Baie Azur & Antre Néréen',
  'ruta 13': 'Route 13 (Badlands / Désert d\'Illumis)',
  'centrale-kalos': 'Centrale Antique de Kalos',
  'bosque errante': 'Forêt Errante (Bois du Dédale / Xerneas)',
  'maraña oscura': 'Fourré Obscur (Maraña Oscura)',
  'marana oscura': 'Fourré Obscur (Maraña Oscura)',
  'manantial profundo': 'Source Profonde (Manantial Profundo)',
  'pantano profano': 'Marais Profane (Pantano Profano)',
  'pueblo vinilo': 'Bourg Vinyle (Village Vinilo)',
  'ruta 14': 'Route 14 (Sentier Romagne & Marais Envoûté)',
  'ruta 15': 'Route 15 (Sentier Brun d\'Automne)',
  'hotel-desolation': 'Hôtel Désolation (Sous-sols Secrets)',
  'caverne-gelee': 'Caverne Gelée (Glaces Éternelles)',
  'ruta 16': 'Route 16 (Chemin Mélancolie)',
  'ruta 17': 'Route 17 (Pente Enneigée Mammochon)',
  'grotte-coda': 'Grotte Coda (Terminus Cave)',
  'ruta 18': 'Route 18 (Sentier des Anciennes Voies)',
  'ruta 19': 'Route 19 (Grand Val)',
  'ruta 20': 'Route 20 (Bois du Dédale Profond)',
  'villa-pokemon': 'Village Pokémon (Sanctuaire Sauvage)',
  'ruta 21': 'Route 21 (Dernière Ligne Droite Ancestrale)',
  'sanctuary of kings': 'Sanctuaire des Rois',
  'sanctuary-kings': 'Sanctuaire des Rois',
  'lento chateau': 'Château Lento & Trésors Évolutifs',
  'castels-ombres': 'Castel des Ombres (Forteresse Sud)',
  'cime-celeste': 'Cime Céleste de Kalos (Sanctuaire des Cimes)',
  'bastion-forge': 'Bastion de Forge Antique & Mines de Méga-Gemmes',
  'sanctuaire-coda-coeur': 'Cœur de Kalos (Sanctuaire Ancestral Coda)',
  'route-victoire-antique': 'Route Victoire Antique (Kalos)',
  'ligue-pokemon-antique': 'Ligue Pokémon & Panthéon des Monarques',
  'zygarde-100-event': 'Sanctuaire Z : Zygarde Forme Parfaite 100%',
  'the hidden spa': 'Le Spa Caché (Sources Chaudes Secrètes)',
  'hidden spa': 'Le Spa Caché (Sources Chaudes Secrètes)',
  'hidden-spa': 'Le Spa Caché (Sources Chaudes Secrètes)',
  'reconstruction-village': 'Village Reconstruit (Quête de Reconstruction)',
  'grotte-inconnue-antique': 'Grotte Inconnue (Mewtwo Méga)',
  'volcan-moltres': 'Volcan Secret de Sulfura (Lave Antique)',
  'montagne-glacee-legendaire': 'Sommet Glacé d\'Artikodin (Glaces Secrètes)',
};

/**
 * Traduit automatiquement un nom de zone Espagnol/Anglais vers sa véritable version française (VF).
 */
export function translateZoneToFrench(zoneName: string): string {
  if (!zoneName) return '';

  let translated = zoneName;

  // 1. Remplacement des préfixes espagnols génériques
  translated = translated.replace(/\bRuta\s+(\d+)\b/gi, 'Route $1');
  translated = translated.replace(/\bBosque\s+de\s+/gi, 'Forêt de ');
  translated = translated.replace(/\bBosque\s+/gi, 'Forêt ');
  translated = translated.replace(/\bPueblo\s+/gi, 'Bourg ');
  translated = translated.replace(/\bCueva\s+/gi, 'Grotte ');
  translated = translated.replace(/\bCiudad\s+/gi, 'Ville de ');
  translated = translated.replace(/\bIsla\s+/gi, 'Île ');
  translated = translated.replace(/\bMonte\s+/gi, 'Mont ');
  translated = translated.replace(/\bPantano\s+/gi, 'Marais ');
  translated = translated.replace(/\bManantial\s+/gi, 'Source ');
  translated = translated.replace(/\bMaraña\s+/gi, 'Fourré ');
  translated = translated.replace(/\bCastillo\s+/gi, 'Château ');
  translated = translated.replace(/\bPuente\s+/gi, 'Pont ');
  translated = translated.replace(/\bValle\s+/gi, 'Vallée ');

  // 2. Remplacement des expressions anglaises courantes
  translated = translated.replace(/\bRoute\s+(\d+)\s+Antique\b/gi, 'Route $1');
  translated = translated.replace(/\bWandering\s+Woods\b/gi, 'Forêt Errante');
  translated = translated.replace(/\bThe\s+Hidden\s+Spa\b/gi, 'Le Spa Caché');
  translated = translated.replace(/\bSanctuary\s+of\s+Kings\b/gi, 'Sanctuaire des Rois');
  translated = translated.replace(/\bVinyl\s+Town\b/gi, 'Bourg Vinyle');

  // 3. Remplacement précis de termes clés spécifiques de Kalos / Pokémon Z
  translated = translated.replace(/Pueblo\s+Acrílico/gi, 'Bourg Acrylique');
  translated = translated.replace(/Pueblo\s+Acrilico/gi, 'Bourg Acrylique');
  translated = translated.replace(/Pueblo\s+Bodegón/gi, 'Village Bodegón');
  translated = translated.replace(/Pueblo\s+Bodegon/gi, 'Village Bodegón');
  translated = translated.replace(/Pueblo\s+Vinilo/gi, 'Bourg Vinyle');
  translated = translated.replace(/Ciudad\s+Yantra/gi, 'Yantreizh');
  translated = translated.replace(/Isla\s+Certijo/gi, 'Île Énigme');
  translated = translated.replace(/Maraña\s+Oscura/gi, 'Fourré Obscur');
  translated = translated.replace(/Manantial\s+Profundo/gi, 'Source Profonde');
  translated = translated.replace(/Pantano\s+Profano/gi, 'Marais Profane');
  translated = translated.replace(/Cueva\s+Refulgente/gi, 'Grotte Refulgente');
  translated = translated.replace(/Bosque\s+Errante/gi, 'Forêt Errante');
  translated = translated.replace(/Lento\s+Chateau/gi, 'Château Lento');
  translated = translated.replace(/Castels\s+Ombres/gi, 'Castel des Ombres');

  // 4. Nettoyage des parenthèses superflues si redondant
  translated = translated.replace(/\(Route\s+(\d+)\s+Antique\)/gi, '');
  translated = translated.replace(/\s+/g, ' ').trim();

  return translated;
}
