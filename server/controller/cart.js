const { Cart, Game, User } = require("../models");
const axios = require("axios");
require("dotenv").config();
const api = process.env.Api_Key;

class CartController {
  static async addCart(req, res, next) {
    try {
      const { id } = req.params;
      const { rent } = req.body;

      if (!rent) throw { name: "BadRequest", msg: "rent is required" };
      const game = await axios.get(
        "https://api.rawg.io/api/games/" + id + "?key=" + api
      );
      const data = {
        name: game.data.name,
        released: game.data.released,
        imageUrl: game.data.background_image,
        rating: game.data.rating,
        rent: +rent,
        GameId: game.data.id,
        UserId: req.user.id,
      };

      const respons = await Cart.create(data);

      res.status(201).json({ message: `${respons.name} has been added` });
    } catch (error) {
      next(error);
    }
  }
  static async UpdateCart(req, res, next) {
    try {
      const { id } = req.params;
      const { GameId } = req.body;

      if (!GameId) throw { name: "BadRequest", msg: "GameId is required" };
      const game1 = await Cart.findByPk(id);
      console.log(game1);
      if (!game1) throw { name: "NotFound", msg: "Game not found" };
      const game = await axios.get(
        "https://api.rawg.io/api/games/" + GameId + "?key=" + api
      );
      const data = {
        name: game.data.name,
        released: game.data.released,
        imageUrl: game.data.background_image,
        rating: game.data.rating,
        UserId: req.user.id,
      };
      await Cart.update(data, { where: { id: id } });
      const respons = await Cart.findByPk(id);

      res
        .status(201)
        .json({ message: `${game1.name} has been changes to ${respons.name}` });
    } catch (error) {
      next(error);
    }
  }
  static async DeleteCart(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Cart.findByPk(id);
      if (!data) throw { name: "NotFound", message: "game not found" };
      await Cart.destroy({ where: { id: id } });
      res.status(200).json({ message: `${data.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async allCart(req, res, next) {
    try {
      const cart = await Cart.findAll();
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartController;
