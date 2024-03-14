"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Game.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      released: DataTypes.DATE,
      imageUrl: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      UserId: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      GameId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      rent: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "rent is required",
          },
          max: {
            args: 6,
            msg: "max of rent is only 6 month",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Game",
      hooks: {
        afterCreate: async (game) => {
          const rentEndDate = new Date(game.createdAt);
          rentEndDate.setMonth(rentEndDate.getMonth() + game.rent);

          const timeLeft = rentEndDate - Date.now();

          if (timeLeft <= 0) {
            await game.destroy();
          } else {
            setTimeout(async () => {
              await game.destroy();
            }, timeLeft);
          }
        },
      },
    }
  );
  return Game;
};
