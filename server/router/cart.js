const express = require("express");

const CartController = require("../controller/cart");
const authorizationCart = require("../midleware/authorization-cart");
const router = express.Router();

router.get("/cart", CartController.allCart);
router.post("/add-cart/:id", CartController.addCart);
router.put("/update-cart/:id", authorizationCart, CartController.UpdateCart);
router.delete("/delete-cart/:id", authorizationCart, CartController.DeleteCart);

module.exports = router;
