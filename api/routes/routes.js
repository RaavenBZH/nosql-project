const express = require("express");
const router = express.Router();
const controller = require("../controllers/controllers");

router.get("/fetchAll/:collection", controller.getAll);
router.post("/post/:collection", controller.postOne);
router.delete("/delete/:collection", controller.deleteOne);

module.exports = router;
