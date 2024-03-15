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
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      GameId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      rent: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: "rent is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
