# Test Report

## Completed local checks

- `python scripts/import_cards.py`: passed, 370 cards imported.
- `npm run validate:cards`: passed, 370 cards and schema/effect checks valid.
- `tsc --noEmit`: passed after the final source check.

## Environment limitation

The desktop sandbox blocks child-process execution with Windows `EPERM` for Vite's config loader. The `esbuild` binary itself responds correctly, but Vite/Vitest fail while resolving config paths through Node child processes. This prevents Vitest and Vite production build from starting in this session despite dependencies being installed. Run `npm test` and `npm run build` in a normal local terminal after checkout; their scripts and dependencies are included. Firebase integration requires the Console setup detailed in `FIREBASE_SETUP.md`.
