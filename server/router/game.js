const express = require("express");

const GamesController = require("../controller/Games");
const authorizationGame = require("../midleware/authorization");
const router = express.Router();

router.post("/add-game", GamesController.addGame);
router.get("/my-game", GamesController.AllGame);
router.put("/update-game/:id", authorizationGame, GamesController.updateGame);

module.exports = router;
