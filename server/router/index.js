const express = require("express");
const UserController = require("../controller/User");
const GamesController = require("../controller/Games");
const errorHandler = require("../midleware/errorHandling");
const authentication = require("../midleware/authentication");
const authorization = require("../midleware/authorization");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/allGames", authentication, GamesController.FindAllGames);
router.post(
  "/add-game/:id",
  authentication,

  GamesController.addGame
);
router.put(
  "/update-game/:id",
  authentication,
  authorization,
  GamesController.updateGame
);

router.use(errorHandler);
module.exports = router;
