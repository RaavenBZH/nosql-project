const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");
const controllerDrivers = require("../controllers/controllerDrivers");
const controllerTracks = require("../controllers/controllerTracks");

router.get("/fetchAll/:collection", controller.getAll);
router.post("/post/:collection", controller.postOne);
router.post("/delete/:collection", controller.deleteOne);

router.get("/fetch/drivers/getBestPilot", controllerDrivers.getBestPilot);
router.get("/fetch/drivers/getAvgAge", controllerDrivers.getAvgAge);

router.get("/fetch/tracks/getHighestSpeed", controllerTracks.getHighestSpeed);
router.get("/fetch/tracks/getAvgTrack", controllerTracks.getAvgTrack);

module.exports = router;
