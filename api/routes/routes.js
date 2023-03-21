const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");

router.get("/fetchAll/:collection", controller.getAll);

module.exports = router;
