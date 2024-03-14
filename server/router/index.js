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

router.use(routerUser);
router.get("/allGames", authentication, GamesController.FindAllGames);
router.use(authentication);
router.use(routerCart);
router.post("/generate-midtrans-token", MidtransController.midtransToken);

router.use(errorHandler);
module.exports = router;
