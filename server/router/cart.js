const express = require("express");

const authorization = require("../midleware/authorization");

const CartController = require("../controller/cart");
const router = express.Router();

router.get("/cart", CartController.allCart);
router.post("/add-cart/:id", CartController.addCart);
router.put("/update-cart/:id", authorization, CartController.UpdateCart);
router.delete("/delete-cart/:id", authorization, CartController.DeleteCart);

module.exports = router;
