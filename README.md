# Flashmaster

A flashcard-based learning application built with TypeScript, React, and Vite. Uses hash-based routing for GitHub Pages compatibility.

🔗 Demo: https://usamasadiq.github.io/projects/flashmaster/

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm install
npm run build
```

## GitHub Pages Deployment

This application is configured to deploy to `usamasadiq.github.io/projects/flashmaster/` with hash-based routing to avoid 404 errors on GitHub Pages.

### Automatic Deployment (Recommended)

1. **Set up GitHub PAT**: 
   - Create a Personal Access Token with `repo` permissions
   - Add it as a secret named `GH_PAT` in this repository (Settings → Secrets and variables → Actions)

2. **Deploy**: 
   - Push your code to this repository's main branch
   - The GitHub Action will automatically build and deploy to `usamasadiq.github.io/projects/flashmaster/`

### Manual Deployment

1. Build the project: `npm run build`
2. Copy the contents of the `dist/` directory to `projects/flashmaster/` in the `usamasadiq.github.io` repository
3. Commit and push the changes to the `usamasadiq.github.io` repository

### Configuration Notes

- **Base Path**: Set to `/projects/flashmaster/` in `vite.config.ts` for the target deployment location
- **Routing**: Uses hash-based routing (`#/flashcard/javascript`) to avoid GitHub Pages 404 errors
- **Target Repository**: `usamasadiq/usamasadiq.github.io`
- **Target Path**: `projects/flashmaster/`
- **Live URL**: `https://usamasadiq.github.io/projects/flashmaster/`

## Features

- Interactive flashcard learning system with hash-based routing for GitHub Pages compatibility
- Static data loading from JSON files (no backend required)
- Multiple technology categories (HTML/CSS, JavaScript, React, TypeScript, Python, Node.js)
- Progress tracking
- Responsive design
- Built with modern web technologies
- Hash routing ensures proper navigation on GitHub Pages (routes like `#/flashcard/javascript`)
- Fully client-side application suitable for static hosting
