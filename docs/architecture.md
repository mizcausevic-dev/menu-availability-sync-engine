# Architecture

## Intent

Menu Availability Sync Engine models the operator layer between store-side menu changes and customer-facing restaurant commerce channels. The goal is to show where availability parity, modifier drift, stale cache state, and search-ordering mismatch break trust before the next marketplace or promo window burns.

## Control surfaces

- `src/app.ts`
  - Express routes for overview, menu lanes, verification, docs, and JSON APIs
- `src/services/menuAvailabilitySyncEngineService.ts`
  - summary metrics, availability lane, sync risk lane, channel posture, verification payload
- `src/services/render.ts`
  - BERT-style render shell with menu-specific operator framing
- `src/data/sampleMenuAvailability.ts`
  - synthetic availability cases, sync blockers, and channel packets

## Route model

- `/`
  - overview and operator recommendation
- `/availability-lane`
  - active menu-sync cases tied to region, channel, owner, and next action
- `/sync-risks`
  - blocker catalog with required proof and impact area
- `/channel-posture`
  - launch-facing packet confidence and review windows
- `/verification`
  - proof statements and KG Embedded fit
- `/docs`
  - route map and control-surface summary

## Packaging

- prerendered static export in `site/`
- custom domain through `CNAME`
- README proof images generated into top-level `screenshots/`
- GitHub Pages deploy workflow on `main`
