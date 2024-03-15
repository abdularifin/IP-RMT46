"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Cart.init(
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
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "Cart",
      hooks: {
        beforeCreate(value) {
          if (value.rent === 1) {
            value.price = 100_000;
          } else if (value.rent === 2) {
            value.price = 200_000;
          } else if (value.rent === 3) {
            value.price = 300_000;
          } else if (value.rent === 4) {
            value.price = 400_000;
          } else if (value.rent === 5) {
            value.price = 500_000;
          } else if (value.rent === 6) {
            value.price = 600_000;
          }
        },
      },
    }
  );
  return Cart;
};
