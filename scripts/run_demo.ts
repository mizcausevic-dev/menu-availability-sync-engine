import { payload, summary } from "../src/services/menuAvailabilitySyncEngineService";

console.log("menu-availability-sync-engine demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().syncRisks, null, 2));
