<img width="1254" height="1254" alt="qr-code" src="https://github.com/user-attachments/assets/054997a3-720c-4883-904c-efa8d4c3dd08" />
# ⚡ Pokémon Z • Nuzlocke Tracker

<div align="center">

![Version](https://img.shields.io/badge/Version-1.0.0-emerald?style=for-the-badge&logo=pokemon)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

<br />

### 📱 Scanner pour jouer sur Smartphone / Tablette

Scannez ce QR Code avec l'appareil photo de votre téléphone pour ouvrir immédiatement l'application :

<p align="center">
  <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https%3A%2F%2Fais-pre-oruviczng5p7otitmso3qo-166844026008.europe-west2.run.app&margin=10&color=10-185-129" width="220" alt="QR Code Pokémon Z Nuzlocke Tracker" />
</p>

🔗 **[Ouvrir l'application en ligne](https://ais-pre-oruviczng5p7otitmso3qo-166844026008.europe-west2.run.app)**

</div>

---

## 🎮 Présentation du Projet

**Pokémon Z Nuzlocke Tracker** est une application web conçue spécialement pour accompagner vos parties en mode **Nuzlocke** sur le célèbre fangame **Pokémon Z** (créé par *Eric Lostie*).

### ✨ Fonctionnalités Principales

- **🗺️ Suivi des 36 Zones du Fangame** :
  - Liste fidèle des zones : *Postigo de Postigo, Senda del Alba, Navarrok, Taller Quemado, Bosque de los Lamentos, etc.*
  - Réorganisation par **glisser-déposer (Drag & Drop)** à la souris ou au doigt sur mobile, et flèches de déplacement ⬆️/⬇️.
  - Statuts en un clic : *Capturé, Échoué, Fui, Optionnel*.
  
- **🏆 12 Régents & Bastions** :
  - Niveaux caps (Level Caps) et badges pour chaque régent (Annelotte, Guillermo, Volpire, Zafra, Balthazar, Anturia, Auretosk, Raimundo, Garrido, Bara, Malva, et la Ligue de Kalos).
  - Détail des Pokémon de chaque boss avec types, talents et capacités.

- **⚔️ Gestion d'Équipe & Boîte PC** :
  - Suivi des 6 Pokémon actifs et des remplaçants en boîte.
  - Surnom, niveau, objet tenu, talent, nature, moveset et notes.

- **🛡️ Analyseur de Types & Faiblesses** :
  - Matrice des résistances et vulnérabilités de votre équipe pour anticiper les combats majeurs.

- **🪦 Cimetière & Panthéon** :
  - Historique des pertes, cause de la mort, niveau et tueur.

- **📱 Export & Partage** :
  - **Générateur de QR Code intégré** pour partage rapide et affichage mobile.
  - Export de fiche de résumé visuelle.
  - Export Markdown pour Discord et forums.
  - Sauvegarde et restauration complète en fichier JSON.

---

## 🚀 Installation & Développement Local

Pour lancer l'application en local sur votre machine :

```bash
# 1. Cloner le dépôt GitHub
git clone https://github.com/votre-compte/pokemon-z-nuzlocke-tracker.git
cd pokemon-z-nuzlocke-tracker

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`.

---

## 📦 Build de Production

```bash
npm run build
```

Les fichiers statiques prêts pour le déploiement seront générés dans le dossier `dist/`.

---

## 📜 Règles du Nuzlocke Challenge

1. **Première rencontre uniquement** : Vous ne pouvez capturer que le tout premier Pokémon rencontré dans chaque nouvelle zone.
2. **K.O. = Mort définitive** : Tout Pokémon mis K.O. est considéré comme mort et doit être placé au cimetière.
3. **Surnom obligatoire** : Tous les Pokémon doivent recevoir un surnom pour renforcer le lien affectif.
4. *(Optionnel)* **Level Cap** : Interdiction de dépasser le niveau du Pokémon le plus fort du prochain Régent.
