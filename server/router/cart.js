const express = require("express");

const authorization = require("../midleware/authorization");

const CartController = require("../controller/cart");
const router = express.Router();

router.post(
  "/add-cart/:id",

  CartController.addCart
);
router.put(
  "/update-cart/:id",

  authorization,
  CartController.UpdateCart
);
router.delete(
  "/delete-cart/:id",

  authorization,
  CartController.DeleteCart
);
router.get("/cart", CartController.allCart);

module.exports = router;
