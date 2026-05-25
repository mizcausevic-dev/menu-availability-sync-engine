import { describe, expect, test } from "vitest";

import {
  availabilityLane,
  channelPosture,
  summary,
  syncRisksLane,
  verification
} from "./services/menuAvailabilitySyncEngineService";

describe("menu-availability-sync-engine", () => {
  test("returns a menu-sync recommendation", () => {
    expect(summary().recommendation).toMatch(/availability|modifier|cache|menu|marketplace/i);
  });

  test("maps availability cases and blockers", () => {
    expect(availabilityLane().length).toBeGreaterThan(2);
    expect(syncRisksLane().some((risk) => risk.readiness === "red")).toBe(true);
  });

  test("channel posture stays buyer-readable", () => {
    expect(channelPosture().every((packet) => packet.audience.length > 0)).toBe(true);
    expect(verification().some((item) => item.toLowerCase().includes("synthetic"))).toBe(true);
  });
});
