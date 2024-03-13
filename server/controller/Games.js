const axios = require("axios");
require("dotenv").config();
const api = process.env.Api_Key;
const { Game } = require("../models");

class GamesController {
  static async FindAllGames(req, res, next) {
    try {
      let response = await axios.get(
        "https://api.rawg.io/api/games?key=" + api
      );
      res.status(200).json(
        response.data.results.map((el) => {
          return {
            id: el.id,
            name: el.name,
            released: el.released,
            imageUrl: el.background_image,
            rating: el.rating,
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
      const { id } = req.params;
      const { rent } = req.body;

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

      const respons = await Game.create(data);

      res.status(201).json(respons);
    } catch (error) {
      next(error);
    }
  }
  static async updateGame(req, res, next) {
    try {
      const { id } = req.params;
      const { GameId } = req.body;
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

      res.status(201).json(respons);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = GamesController;
