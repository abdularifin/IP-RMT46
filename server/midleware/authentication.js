const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) throw { name: "unauthorized", msg: "Invalid Token" };
    const access_token = bearerToken.slice("Bearer ".length);
    if (!access_token) throw { name: "unauthorized", msg: "Invalid Token" };
    const { id } = verifyToken(access_token);
    const user = await User.findByPk(id);

    if (!user) throw { name: "unauthorized", msg: "Invalid Token" };
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = authentication;
