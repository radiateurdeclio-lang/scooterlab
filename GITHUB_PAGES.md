# Site statique — déployé sur GitHub Pages

Le site est publié automatiquement à chaque push sur `main`.

## URL

Après activation de GitHub Pages dans les paramètres du repo :
`https://VOTRE_USERNAME.github.io/scooterlab/`

## Activer GitHub Pages

1. Repo GitHub → **Settings** → **Pages**
2. Source : **GitHub Actions**
3. Le workflow `.github/workflows/pages.yml` déploie automatiquement

## Build local

```bash
npm run website:build
npm run website:serve
```

## Téléchargements

Les liens pointent vers **GitHub Releases**. Créez une release et uploadez :
- `ScooterLab_0.1.0_x64-setup.exe` (Windows)
- `ScooterLab_0.1.0_universal.dmg` (macOS)
- etc.
