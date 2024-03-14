const axios = require("axios");

require("dotenv").config();
const api = process.env.Api_Key;
const { Game } = require("../models");

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

      res.status(201).json({ message: `${respons.name} has been added` });
    } catch (error) {
      next(error);
    }
  }
  static async updateGame(req, res, next) {
    try {
      const { id } = req.params;
      const { GameId } = req.body;
      const game1 = await Game.findByPk(id);
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
