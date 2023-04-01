const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");
const controllerDrivers = require("../controllers/controllerDrivers");
const controllerQualifyings = require("../controllers/controllerQualifyings");
const controllerRaces = require("../controllers/controllerRaces");
const controllerSeasons = require("../controllers/controllerSeasons");
const controllerSprints = require("../controllers/controllerSprints");
const controllerTracks = require("../controllers/controllerTracks");

router.get("/fetchAll/:collection", controller.getAll);
router.post("/post/:collection", controller.postOne);
router.post("/delete/:collection", controller.deleteOne);

router.get("/fetch/drivers/getPilots", controllerDrivers.getPilots);
router.get("/fetch/drivers/getAvgAge", controllerDrivers.getAvgAge);

router.get(
  "/fetch/qualifyings/getBestPilot",
  controllerQualifyings.getBestPilot
);
router.get(
  "/fetch/qualifyings/getLeaderboard",
  controllerQualifyings.getLeaderboard
);

router.get("/fetch/races/getBestPilot", controllerRaces.getBestPilot);
router.get("/fetch/races/getPodiumsFerrari", controllerRaces.getPodiumsFerrari);

router.get(
  "/fetch/seasons/getHighestPodiums",
  controllerSeasons.getHighestPodiums
);
router.get("/fetch/seasons/getSecondBest", controllerSeasons.getSecondBest);

router.get("/fetch/sprints/getHighestSpeed", controllerSprints.getHighestSpeed);
router.get("/fetch/sprints/getAvgTrack", controllerSprints.getAvgTrack);

router.get("/fetch/tracks/getHighestSpeed", controllerTracks.getHighestSpeed);
router.get("/fetch/tracks/getAvgTrack", controllerTracks.getAvgTrack);

module.exports = router;
