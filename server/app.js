if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = 3000;
const router = require("./router/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

module.exports = app;
