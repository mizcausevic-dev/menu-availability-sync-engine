// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";

import {
  availabilityLane,
  channelPosture,
  payload,
  summary,
  syncRisksLane,
  verification
} from "./services/menuAvailabilitySyncEngineService";
import {
  renderAvailabilityLane,
  renderChannelPosture,
  renderDocs,
  renderOverview,
  renderSyncRisks,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5572);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/availability-lane", (_req, res) => res.type("html").send(renderAvailabilityLane()));
app.get("/sync-risks", (_req, res) => res.type("html").send(renderSyncRisks()));
app.get("/channel-posture", (_req, res) => res.type("html").send(renderChannelPosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/availability-lane", (_req, res) => res.json(availabilityLane()));
app.get("/api/sync-risks", (_req, res) => res.json(syncRisksLane()));
app.get("/api/channel-posture", (_req, res) => res.json(channelPosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, host, () => {
    console.log(`Menu Availability Sync Engine listening on http://${host}:${port}`);
  });
}

export default app;
