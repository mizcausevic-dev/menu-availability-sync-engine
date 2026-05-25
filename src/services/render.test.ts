import { describe, expect, test } from "vitest";

import {
  renderAvailabilityLane,
  renderChannelPosture,
  renderDocs,
  renderOverview,
  renderSyncRisks,
  renderVerification
} from "./render";
import {
  availabilityCases,
  channelPackets,
  syncRisks
} from "../data/sampleMenuAvailability";

const renderers = [
  ["overview", renderOverview],
  ["availability-lane", renderAvailabilityLane],
  ["sync-risks", renderSyncRisks],
  ["channel-posture", renderChannelPosture],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Menu Availability Sync Engine");
    expect(html).toContain('href="/availability-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("availability lane lists every case with a risk tag", () => {
    const html = renderAvailabilityLane();
    for (const availabilityCase of availabilityCases) {
      expect(html).toContain(availabilityCase.caseId);
    }
    expect(html).toContain('class="st needs"');
  });

  test("sync risks list every blocker with readiness tags", () => {
    const html = renderSyncRisks();
    for (const block of syncRisks) {
      expect(html).toContain(block.riskId);
    }
    expect(html).toContain('class="bad"');
    expect(html).toContain("Customer order trust");
  });

  test("channel posture shows packets and confidence scores", () => {
    const html = renderChannelPosture();
    for (const packet of channelPackets) {
      expect(html).toContain(packet.packetId);
      expect(html).toContain(String(packet.confidenceScore));
    }
  });

  test("verification renders proof statements", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/sync-risks");
    expect(html).toContain("/channel-posture");
  });
});
