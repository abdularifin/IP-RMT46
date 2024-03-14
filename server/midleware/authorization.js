const { Game, Cart } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const game = await Cart.findByPk(id);

    if (!game) {
      throw { name: "NotFound", msg: `game not found` };
    }

    if (game.UserId !== userId) {
      throw {
        name: "Forbidden",
        msg: `You're not authorized to delete this game`,
      };
    }
    req.game = game;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authorization;
