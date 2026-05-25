import fs from "node:fs";
import path from "node:path";

import {
  availabilityLane,
  channelPosture,
  payload,
  summary,
  syncRisksLane,
  verification
} from "../src/services/menuAvailabilitySyncEngineService";
import {
  renderAvailabilityLane,
  renderChannelPosture,
  renderDocs,
  renderOverview,
  renderSyncRisks,
  renderVerification
} from "../src/services/render";

const outputDir = path.resolve(__dirname, "..", "site");
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, "api"), { recursive: true });
fs.copyFileSync(path.resolve(__dirname, "..", "CNAME"), path.join(outputDir, "CNAME"));

const pages: Record<string, string> = {
  "index.html": renderOverview(),
  "availability-lane.html": renderAvailabilityLane(),
  "sync-risks.html": renderSyncRisks(),
  "channel-posture.html": renderChannelPosture(),
  "verification.html": renderVerification(),
  "docs.html": renderDocs()
};

const rewrites: Array<[string, string]> = [
  ['href="/availability-lane"', 'href="availability-lane.html"'],
  ['href="/sync-risks"', 'href="sync-risks.html"'],
  ['href="/channel-posture"', 'href="channel-posture.html"'],
  ['href="/verification"', 'href="verification.html"'],
  ['href="/docs"', 'href="docs.html"']
];

for (const [filename, html] of Object.entries(pages)) {
  let content = html;
  for (const [from, to] of rewrites) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(path.join(outputDir, filename), content, "utf8");
}

const apiPayloads: Record<string, unknown> = {
  "api/dashboard/summary.json": summary(),
  "api/availability-lane.json": availabilityLane(),
  "api/sync-risks.json": syncRisksLane(),
  "api/channel-posture.json": channelPosture(),
  "api/verification.json": verification(),
  "api/sample.json": payload()
};

for (const [filename, data] of Object.entries(apiPayloads)) {
  fs.mkdirSync(path.dirname(path.join(outputDir, filename)), { recursive: true });
  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(data, null, 2), "utf8");
}
