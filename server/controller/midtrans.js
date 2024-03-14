const midtransClient = require("midtrans-client");
const axios = require("axios");
require("dotenv").config();
const { Game, User, Cart } = require("../models");
const serverKey = process.env.Server_Key_Midtrans;
const api = process.env.Api_Key;
class MidtransController {
  static async midtransToken(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) throw { name: "unauthorized", msg: "Invalid token" };
      const cart = await Cart.findAll();
      const price = cart.map((el) => {
        return el.price;
      });
      let total = price.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: serverKey,
      });
      let parameter = {
        transaction_details: {
          order_id:
            "Transaction-" +
            Math.floor(Math.random() * (9999999 - 1000000 + 1)) +
            1000000,
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          name: user.name,
          email: user.email,
        },
      };

      //   const respons = await Game.create(data);
      const midtranstoken = await snap.createTransaction(parameter);

      res.status(201).json(midtranstoken);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = MidtransController;
