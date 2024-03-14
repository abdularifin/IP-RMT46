const express = require("express");

const authorization = require("../midleware/authorization");

const GamesController = require("../controller/Games");
const router = express.Router();

router.post("/add-game/:id", GamesController.addGame);
router.get("/my-game", GamesController.AllGame);
router.put("/update-cart/:id", authorization, GamesController.updateGame);

module.exports = router;
