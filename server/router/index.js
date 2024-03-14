const express = require("express");
const UserController = require("../controller/User");
const GamesController = require("../controller/Games");
const errorHandler = require("../midleware/errorHandling");
const authentication = require("../midleware/authentication");
const authorization = require("../midleware/authorization");
const MidtransController = require("../controller/midtrans");
const CartController = require("../controller/cart");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-login", UserController.GoogleLogin);
router.get("/allGames", authentication, GamesController.FindAllGames);
router.post(
  "/add-game/:id",
  authentication,

  CartController.addCart
);
router.put(
  "/update-game/:id",
  authentication,
  authorization,
  CartController.UpdateCart
);
router.delete(
  "/delete-game/:id",
  authentication,
  authorization,
  CartController.DeleteCart
);
router.get("/cart", authentication, CartController.allCart);

router.post(
  "/generate-midtrans-token",
  authentication,

  MidtransController.midtransToken
);

router.use(errorHandler);
module.exports = router;
