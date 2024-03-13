const { comparePassword } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");
const { User } = require("../models");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
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
      next(error);
    }
  }
  static async GoogleLogin(req, res, next) {
    try {
      const { tokenGoogle } = req.body;
      const clientId = process.env.Client_Id;
      const ticket = await client.verifyIdToken({
        idToken: tokenGoogle,
        audience: clientId,
      });
      const { name, email } = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username: name,
          email: email,
          password: Math.random().toString(),
        },
      });
      const access_token = signToken({ id: user.id });
      res
        .status(200)
        .json({ message: `loggin from ${user.email}`, access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
