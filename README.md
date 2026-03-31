# Frontend Template

Minimal React + TypeScript + Vite frontend.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

- `VITE_APP_TITLE`: App title shown in UI.
- `VITE_API_BASE_URL`: Backend API base URL.

## Scripts

- `npm run dev`: Start dev server.
- `npm run build`: Type-check and build.
- `npm run preview`: Preview production build.
- `npm run lint`: Run ESLint (zero warnings).
- `npm run format`: Auto-format with Prettier.
- `npm run format:check`: Validate formatting.

## Commit Quality

- Pre-commit hook runs `lint-staged` and formats staged files automatically.
- If hooks are missing, run:

```bash
npm run prepare
```

## CI

GitHub Actions runs: install, lint, format check, and build on push/PR to `main` and `master`.
