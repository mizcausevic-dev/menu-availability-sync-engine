import {
  availabilityCases,
  channelPackets,
  syncRisks
} from "../data/sampleMenuAvailability";

export function summary() {
  return {
    cases: availabilityCases.length,
    urgentCases: availabilityCases.filter((item) => item.risk === "red").length,
    blockedSyncs: syncRisks.filter((item) => item.readiness !== "green").length,
    fragilePackets: channelPackets.filter((item) => item.status !== "green").length,
    recommendation:
      "Clear availability parity, modifier drift, and stale cache snapshots first so menu-sync posture stays safe before the next marketplace or promo window burns."
  };
}

export function availabilityLane() {
  return availabilityCases;
}

export function syncRisksLane() {
  return syncRisks;
}

export function channelPosture() {
  return channelPackets;
}

export function verification() {
  return [
    "Availability cases map to concrete restaurant, marketplace, and search-ordering workflows instead of living as disconnected support notes.",
    "Sync blockers surface the exact evidence required before a menu packet becomes unsafe for customers, revenue, or local discovery.",
    "Channel posture ties menu events to owner routing, review timing, and launch-safe decision packets.",
    "The surface is buyer-readable and safe for embedded analytics tie-back across restaurant commerce workflows.",
    "Synthetic data only; no real store, customer, merchant, or marketplace records are included."
  ];
}

export function payload() {
  return {
    summary: summary(),
    availabilityCases: availabilityLane(),
    syncRisks: syncRisksLane(),
    channelPackets: channelPosture(),
    verification: verification()
  };
}
