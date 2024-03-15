const axios = require("axios");

require("dotenv").config();
const api = process.env.Api_Key;
const { Game, Cart, User } = require("../models");

class GamesController {
  static async FindAllGames(req, res, next) {
    try {
      const { search, genres, ordering, page } = req.query;
      const options = {};
      if (search) {
        //!search game
        options.search = search;
      }
      if (genres) {
        //!filter by genre
        options.genres = genres;
      }
      if (ordering) {
        //!sort by name
        options.ordering = ordering;
      }
      if (page) {
        //!page
        options.page = page;
      }
      const queryString = new URLSearchParams(options).toString();
      let response = await axios.get(
        "https://api.rawg.io/api/games?key=" + api + "&" + queryString
      );

      res.status(200).json(
        response.data.results.map((el) => {
          return {
            id: el.id,
            name: el.name,
            released: el.released,
            imageUrl: el.background_image,
            rating: el.rating,
            genre: el.genres,
          };
        })
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addGame(req, res, next) {
    try {
      const cartsdata = await Cart.findAll({ where: { UserId: req.user.id } });
      if (!cartsdata) {
        throw new Error("No carts found to create games");
      }
      // const newRentDate = new Date();
      // newRentDate.setMonth(newRentDate.getMonth() + el.rent);
      // el.rent = newRentDate;
      const gamesData = cartsdata.map((cart) => ({
        name: cart.name,
        price: cart.price,
        released: cart.released,
        imageUrl: cart.imageUrl,
        rating: cart.rating,
        UserId: cart.UserId,
        GameId: cart.GameId,
        rent: new Date().setMonth(new Date().getMonth() + cart.rent),
        status: true,
      }));
      const game = await Game.bulkCreate(gamesData);
      await Cart.destroy({
        truncate: true,
      });
      res.status(201).json(game);
    } catch (error) {
      next(error);
    }
  }
  static async updateGame(req, res, next) {
    try {
      const { id } = req.params;
      const { GameId } = req.body;
      console.log(GameId);
      const game1 = await Game.findByPk(id);
      console.log(game1);
      if (!game1) throw { name: "NotFound", msg: "game not found" };
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
      await Game.update(data, { where: { id: id } });
      const respons = await Game.findByPk(id);

      res
        .status(201)
        .json({ message: `${game1.name} has been changes to ${respons.name}` });
    } catch (error) {
      next(error);
    }
  }
  static async AllGame(req, res, next) {
    try {
      const game = await Game.findAll();
      res.status(200).json(game);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = GamesController;
