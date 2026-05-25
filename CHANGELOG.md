# Changelog

## v1.0.0-prod — 2026-05-25

- Platform/SRE hardening pass (Claude Code lane): deploy-time SEO assets — `robots.txt` + `sitemap.xml` generation and OpenGraph/Twitter/meta-description injection (`scripts/seo-meta.mjs`) wired into the Pages workflow.
- Verified production gates: Node 20/22 CI matrix (lint, typecheck, coverage, build, demo, smoke, `npm audit`), coverage gate on `src/services`, AGPL-3.0-or-later, Dependabot, SECURITY.md.
- Deployed to GitHub Pages at `menus.kineticgain.com` (TLS).

## v0.1-shipped

- ship Menu Availability Sync Engine as a Food / Restaurant Tech operator surface
- model availability cases, sync blockers, and channel posture for restaurant commerce launches
- add BERT-style operator shell, verification lane, prerender pipeline, and GitHub Pages packaging
- include KG Embedded tie-back docs, screenshots, CI, coverage, and release-ready repo scaffolding
