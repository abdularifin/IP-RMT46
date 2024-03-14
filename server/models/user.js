"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Game, { foreignKey: "UserId" });
      User.hasMany(models.Cart, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "please insert username",
          },
          notNull: {
            msg: "username cannot be null",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email has been ussed, please change another email",
        },
        validate: {
          isEmail: {
            msg: "please insert email format",
          },
          notEmpty: {
            msg: "please insert email",
          },
          notNull: {
            msg: "email cannot be null",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password cannot be null",
          },
          notEmpty: {
            msg: "please insert password",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(value) {
          value.password = hashPassword(value.password);
        },
      },
    }
  );
  return User;
};
