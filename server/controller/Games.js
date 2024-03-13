const axios = require("axios");
require("dotenv").config();
const api = process.env.Api_Key;

class GamesController {
  static async FindAllGames(req, res, next) {
    try {
      let response = await axios.get(
        "https://api.rawg.io/api/games?key=" + api
      );
      res.json(
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
}
module.exports = GamesController;
