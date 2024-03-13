const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");
class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const data = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json(`${data.username} has ready to login`);
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Bad Request", msg: "email must be exist" };
      if (!password)
        throw { name: "Bad Request", msg: "password must be exist" };
      const data = await User.findOne({ where: { email } });
      if (!data) {
        throw { name: "unauthorized", msg: "email/password invalid" };
      }
      const validPassword = comparePassword(password, data.password);

      if (!validPassword)
        throw { name: "unauthorized", msg: "email/password invalid" };
      const access_token = signToken({ id: data.id });
      res.status(201).json({ token: access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
