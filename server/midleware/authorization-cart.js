const { Game, Cart, User } = require("../models");
// const user = require("../models/user");

const authorizationCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const game = await Cart.findByPk(id);

    // console.log(dataGame.Userid);
    if (!game) {
      throw { name: "NotFound", msg: `game not found` };
    }

    if (game.UserId !== userId) {
      throw {
        name: "Forbidden",
        msg: `You're not authorized to delete this game`,
      };
    }
    req.cart = game;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authorizationCart;
