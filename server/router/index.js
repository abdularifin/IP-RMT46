const express = require("express");
const UserController = require("../controller/User");
const GamesController = require("../controller/Games");
const errorHandler = require("../midleware/errorHandling");
const authentication = require("../midleware/authentication");
const authorization = require("../midleware/authorization");
const MidtransController = require("../controller/midtrans");
const CartController = require("../controller/cart");
const router = express.Router();
const routerUser = require("./user");
const routerCart = require("./cart");
const routerGame = require("./game");
router.use(routerUser);
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "welcome to server" });
});
router.use(authentication);
router.get("/allGames", GamesController.FindAllGames);
router.use(routerCart);
router.use(routerGame);
router.post("/generate-midtrans-token", MidtransController.midtransToken);

router.use(errorHandler);
module.exports = router;
