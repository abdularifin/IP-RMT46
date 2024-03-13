const errorHandler = function (error, req, res, next) {
  console.log("🚀 ~ file: errorHandler.js:2 ~ err:", error);
  switch (error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      return res.status(400).json({ message: error.errors[0].message });
    case "JsonWebTokenError":
      return res.status(401).json({ message: "Invalid token" });
    case "BadRequest":
      return res.status(400).json({ message: error.msg });
    case "unauthorized":
      return res.status(401).json({ message: error.msg });
    case "NotFound":
      return res.status(404).json({ message: error.msg });
    case "Forbidden":
      return res.status(403).json({ message: error.msg });
    default:
      return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errorHandler;
