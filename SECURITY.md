# Security

## Reporting

Report security issues through GitHub Security Advisories or by opening a private report with the maintainer.

## Scope

This repository contains synthetic data only. It models menu availability, sync blockers, and channel posture using fake restaurant-commerce scenarios. No real store, customer, merchant, or marketplace records are included.

## Embedded posture

If this primitive is extended into a production product:

- keep operational evidence read-safe by default
- separate analytics views from direct mutation paths
- review cache invalidation, webhook authenticity, and publish workflows
- ensure tenant and environment boundaries are explicit before exposing menu or launch posture in-product
