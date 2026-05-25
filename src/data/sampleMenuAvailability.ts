export type RiskState = "red" | "yellow" | "green";

export type AvailabilityCase = {
  caseId: string;
  brand: string;
  region: string;
  channel: string;
  item: string;
  excerpt: string;
  owner: string;
  nextAction: string;
  risk: RiskState;
};

export type SyncRisk = {
  riskId: string;
  blocker: string;
  source: string;
  impactArea: string;
  requiredEvidence: string;
  owner: string;
  readiness: RiskState;
  note: string;
};

export type ChannelPacket = {
  packetId: string;
  audience: string;
  confidenceScore: number;
  reviewWindowHours: number;
  blocker: string;
  status: RiskState;
  decisionNote: string;
};

export const availabilityCases: AvailabilityCase[] = [
  {
    caseId: "SYNC-601",
    brand: "North Dock Kitchen",
    region: "Boston",
    channel: "DoorDash",
    item: "Hot chicken bowl",
    excerpt:
      "Prep-line hold was cleared in store ops, but the sold-out state never propagated to the marketplace snapshot now serving lunchtime orders.",
    owner: "Marketplace operations lead",
    nextAction:
      "Reconcile the store menu event against the DoorDash availability webhook and confirm the sellback rule before the lunch promo restarts.",
    risk: "red"
  },
  {
    caseId: "SYNC-602",
    brand: "Metro Slice Collective",
    region: "Chicago",
    channel: "Uber Eats",
    item: "Family combo",
    excerpt:
      "Modifier mapping is stale after the pricing refresh, so add-on totals and combo packaging are drifting between POS and marketplace checkout.",
    owner: "Revenue operations manager",
    nextAction:
      "Rebuild the modifier bundle map and republish the marketplace payload with pricing parity proof attached.",
    risk: "red"
  },
  {
    caseId: "SYNC-603",
    brand: "Sunset Bento Labs",
    region: "Seattle",
    channel: "Mobile app",
    item: "Miso salmon set",
    excerpt:
      "App users are still seeing yesterday's availability snapshot because the menu cache did not flush after the dinner inventory update.",
    owner: "Growth product owner",
    nextAction:
      "Flush the mobile cache layer, confirm the fresh catalog checksum, and watch the next two app sync cycles for drift.",
    risk: "yellow"
  },
  {
    caseId: "SYNC-604",
    brand: "Garden Table Express",
    region: "Austin",
    channel: "Google ordering",
    item: "Seasonal citrus salad",
    excerpt:
      "Search ordering still shows an in-stock hero image even though the fresh citrus add-on is gone and the fallback stock state is lagging.",
    owner: "Channel merchandising lead",
    nextAction:
      "Refresh the search-ordering asset bundle and confirm stock-state parity before the local discovery campaign pushes tonight.",
    risk: "yellow"
  }
];

export const syncRisks: SyncRisk[] = [
  {
    riskId: "MR-71",
    blocker: "Channel availability parity incomplete",
    source: "Marketplace sync lane",
    impactArea: "Customer order trust",
    requiredEvidence:
      "Store event log, marketplace webhook receipt, and confirmed sellback rule outcome.",
    owner: "Menu systems lead",
    readiness: "red",
    note:
      "Do not reopen demand until store and marketplace snapshots agree on the same availability event."
  },
  {
    riskId: "MR-72",
    blocker: "Modifier bundle totals drift after pricing refresh",
    source: "Pricing propagation lane",
    impactArea: "Revenue capture",
    requiredEvidence:
      "Modifier bundle diff, POS parity export, and marketplace republish confirmation.",
    owner: "Revenue operations manager",
    readiness: "red",
    note:
      "Combo bundles become unsafe when marketplace totals no longer match the in-store commercial promise."
  },
  {
    riskId: "MR-73",
    blocker: "App cache still serving stale menu snapshot",
    source: "Mobile delivery lane",
    impactArea: "Loyalty conversion",
    requiredEvidence:
      "Cache flush log, fresh catalog checksum, and validation screenshots from the next app sync cycle.",
    owner: "Growth product owner",
    readiness: "yellow",
    note:
      "The customer experience is recoverable, but only if the stale snapshot is cleared before the next loyalty push."
  },
  {
    riskId: "MR-74",
    blocker: "Search-ordering image and stock state disagree",
    source: "Search commerce lane",
    impactArea: "Local discovery posture",
    requiredEvidence:
      "Updated search asset bundle, stock-state verification, and index refresh timestamp.",
    owner: "Channel merchandising lead",
    readiness: "yellow",
    note:
      "Search-ordering trust erodes quickly when imagery, stock, and landing-state drift apart during discovery campaigns."
  }
];

export const channelPackets: ChannelPacket[] = [
  {
    packetId: "PK-21",
    audience: "Marketplace operations desk",
    confidenceScore: 58,
    reviewWindowHours: 8,
    blocker: "Availability parity still red",
    status: "red",
    decisionNote:
      "Hold the marketplace relaunch packet until the availability event chain is clean from POS to webhook to channel snapshot."
  },
  {
    packetId: "PK-22",
    audience: "Revenue launch reviewer",
    confidenceScore: 67,
    reviewWindowHours: 18,
    blocker: "Modifier bundle drift unresolved",
    status: "yellow",
    decisionNote:
      "Stage the promo packet, but do not release the commercial bundle until modifier totals are proven channel-safe."
  },
  {
    packetId: "PK-23",
    audience: "Loyalty app operations",
    confidenceScore: 81,
    reviewWindowHours: 24,
    blocker: "Cache flush validation pending",
    status: "yellow",
    decisionNote:
      "App posture is recoverable if the refreshed menu snapshot stays stable through the next loyalty sync cycle."
  },
  {
    packetId: "PK-24",
    audience: "Search ordering desk",
    confidenceScore: 91,
    reviewWindowHours: 36,
    blocker: "Image refresh queued",
    status: "green",
    decisionNote:
      "Search-ordering posture is healthy as long as the refreshed image and stock signal publish together before the discovery push."
  }
];
