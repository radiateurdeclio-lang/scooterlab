# ScooterLab — Site de téléchargement

Site statique pour télécharger ScooterLab sur toutes les plateformes et accéder à la version web.

## Lancer en local

```bash
# Depuis la racine du projet
npm run website:build   # Compile l'app web dans website/app/
npm run website:serve   # http://localhost:8080
```

## Structure

```
website/
├── index.html          # Page d'accueil + téléchargements
├── css/style.css
├── js/main.js
├── assets/
├── app/                # Application web (généré)
└── downloads/          # Installateurs (.exe, .dmg, .apk, .ipa)
    └── manifest.json
```

## Déploiement

Hébergez le dossier `website/` sur GitHub Pages, Netlify, Vercel ou tout hébergeur statique.

### GitHub Pages

```bash
npm run website:build
# Publiez le contenu de website/ sur gh-pages
```

## Plateformes

| Plateforme | Commande de build |
|------------|-------------------|
| Web        | `npm run website:build` |
| Windows/Mac/Linux | `npm run tauri:build` |
| Android    | `npm run tauri:android` |
| iOS        | `npm run tauri:ios` (macOS + Xcode requis) |

## Avertissement

L'application affiche un disclaimer obligatoire de 10 secondes avant le premier accès (web et desktop).
