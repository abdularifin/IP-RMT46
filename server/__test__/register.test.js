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
let data2 = {
  username: "staff1",
  email: "admin6@mail.com",
  password: "admin1",
  // role: "admin",
  phoneNumber: "0865643746",
  address: "Indonesia",
};

describe("POST /register", () => {
  //!test register user berhasil
  describe("succes", () => {
    test("should able register user ", async () => {
      const respons = await request(app).post("/register").send(data2);

      expect(respons.status).toBe(201);
      expect(respons.body).toHaveProperty(
        "msg",
        `${data2.username} has ready to login`
      );
    });
  });
  describe("failed", () => {
    //!test register user gagal email/username diberikan string kosong
    test("returning error", async () => {
      const respons = await request(app).post("/register").send({
        username: "",
        email: data2.email,
        password: data2.password,
      });

      expect(respons.status).toBe(400);

      expect(respons.body).toHaveProperty("message", "please insert username");
    });
    test("returning error", async () => {
      //!test register password diberikan string kosong
      const respons = await request(app).post("/register").send({
        username: data2.username,
        email: data2.email,
        password: "",
      });

      expect(respons.status).toBe(400);

      expect(respons.body).toHaveProperty("message", "please insert password");
    });
    test("returning error", async () => {
      //!test username/email tidak diberikan
      const respons = await request(app)
        .post("/register")

        .send({
          password: data2.password,
          phoneNumber: data2.phoneNumber,
        });

      expect(respons.status).toBe(400);

      expect(respons.body).toHaveProperty("message", "username cannot be null");
    });
    test("returning error", async () => {
      //!test password tidak diberikan
      const respons = await request(app).post("/register").send({
        username: data2.username,
        email: data2.email,
      });

      expect(respons.status).toBe(400);

      expect(respons.body).toHaveProperty("message", "password cannot be null");
    });
    test("returning error", async () => {
      //!test email sudah terdaftar
      const respons = await request(app)
        .post("/register")

        .send({
          username: data.username,
          email: data.email,
          password: data.password,
        });

      expect(respons.status).toBe(400);

      expect(respons.body).toHaveProperty(
        "message",
        "email has been ussed, please change another email"
      );
    });
    test("returning error", async () => {
      //!test email bukan berupa format email
      const respons = await request(app)
        .post("/register")

        .send({
          username: data.username,
          email: "dhjadhkjah",
          password: data.password,
        });

      expect(respons.status).toBe(400);

      expect(respons.body).toHaveProperty(
        "message",
        "please insert email format"
      );
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
