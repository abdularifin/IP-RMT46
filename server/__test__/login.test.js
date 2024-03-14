// const { test } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { User } = require("../models");
const { signToken } = require("../helper/jwt");

const { sequelize } = require("../models");
const { hashPassword } = require("../helper/bcrypt");
const { queryInterface } = sequelize;
let acces_token;
let data = {
  username: "admin1",
  email: "admin@mail.com",
  password: "admin1",
  role: "admin",
  phoneNumber: "0865643746",
  address: "Indonesia",
};

//!test login
describe.skip("post /login", function () {
  describe("success", () => {
    test("should return status 201 and object of new user", async () => {
      let respons = await request(app)
        .post("/login")
        .send({ email: data.email, password: data.password });
      console.log(respons.body);
      expect(respons.status).toBe(201);
      expect(respons.body).toHaveProperty("token");
    });
  });
  //!test login gagal
  describe("failed", () => {
    test("should return error", async () => {
      //!test login email dan password tidak diberikan
      let respons = await request(app)
        .post("/login")
        .send({ email: "", password: "awsda" });

      expect(respons.status).toBe(400);
      expect(respons.body).toHaveProperty("message", "email must be exist");
    });
    test("should return error", async () => {
      //!test login email dan password tidak diberikan
      let respons = await request(app)
        .post("/login")
        .send({ email: data.email, password: "" });

      expect(respons.status).toBe(400);
      expect(respons.body).toHaveProperty("message", "password must be exist");
    });
    test("should return error", async () => {
      //!test login email/username salah
      let respons = await request(app)
        .post("/login")
        .send({ email: "!data.username", password: data.password });
      console.log(respons.body);
      expect(respons.status).toBe(401);
      expect(respons.body).toHaveProperty("message", "email/password invalid");
    });
    test("should return error", async () => {
      //!test login email/username salah
      let respons = await request(app)
        .post("/login")
        .send({ email: data.email, password: "data.password" });
      console.log(respons.body);
      expect(respons.status).toBe(401);
      expect(respons.body).toHaveProperty("message", "email/password invalid");
    });
  });
});

//!hooks before test
beforeAll(async () => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: data.username,
        email: data.email,
        password: hashPassword(data.password),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
});

//!hooks after test
afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});
