const Game = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const game = await Game.findByPk(id);
    if (!game) {
      throw { name: "NotFound", message: `game not found` };
    }

    if (game.UserId !== userId) {
      throw {
        name: "Forbidden",
        message: `You're not authorized to delete this game`,
      };
    }
    req.game = game;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authorization;
