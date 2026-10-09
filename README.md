# Invitation d'anniversaire de Sheyi 🎈

Projet Vite (HTML / CSS / JavaScript, sans framework).

## Installation (une seule fois)

Dans le dossier du projet :

```bash
npm install
```

Si `npm run dev` répond « vite n'est pas reconnu », installe les dépendances de développement :

```bash
npm install --include=dev
```

(Cela arrive si ta variable `NODE_ENV` vaut `production` sur ton PC.)

## Lancer en local

```bash
npm run dev
```

Puis ouvre l'adresse affichée (en général http://localhost:5173).

## Vérifier la version finale

```bash
npm run build      # génère le dossier dist/
npm run preview    # prévisualise dist/
```

## Modifier les informations

Tout se modifie dans **`src/config.js`** : prénom, date du compte à rebours (`targetDate`), date, heure, lieu, adresse, programme, photos, musique, RSVP.

## Photos

- **Fichiers locaux** : place l'image dans `public/assets/photos/` et écris `src: "/assets/photos/mon-image.jpg"`.
- **Liens Unsplash** : clic droit sur la photo > « Copier l'adresse de l'image », puis colle le lien dans `src`.

## Couleurs

Variables CSS en haut de `src/styles.css`.

## Mise en ligne sur Vercel (plus tard)

1. Mets le projet sur GitHub.
2. Sur vercel.com, « Add New Project », importe le dépôt.
3. Vercel détecte Vite automatiquement : aucune configuration à changer.
4. Ajoute `public/assets/og-image.png` (1200 × 630 px) pour l'aperçu sur WhatsApp.

## Structure

```
Sheyi/
├── index.html            # page unique
├── package.json
├── src/
│   ├── main.js           # logique (intro, compte à rebours, RSVP, musique)
│   ├── config.js         # TOUTES les infos à modifier
│   └── styles.css        # styles et animations
└── public/
    └── assets/           # photos, musique, og-image.png
```
