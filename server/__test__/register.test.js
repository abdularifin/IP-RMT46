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

//!test login
// describe("post /login", function () {
//   describe("success", () => {
//     test("should return status 201 and object of new user", async () => {
//       let respons = await request(app)
//         .post("/login")
//         .send({ credential: data.username, password: data.password });
//       console.log(respons.body);
//       expect(respons.status).toBe(200);
//       expect(respons.body).toHaveProperty("acces_token", expect.any(String));
//     });
//   });
//   //!test login gagal
//   describe("failed", () => {
//     test("should return error", async () => {
//       //!test login email dan password tidak diberikan
//       let respons = await request(app)
//         .post("/login")
//         .send({ credential: "", password: "" });
//       expect(respons.status).toBe(400);
//       expect(respons.body).toHaveProperty("msg", expect.any(String));
//     });
//     test("should return error", async () => {
//       //!test login email/username salah
//       let respons = await request(app)
//         .post("/login")
//         .send({ credential: "!data.username", password: data.password });
//       console.log(respons.body);
//       expect(respons.status).toBe(401);
//       expect(respons.body).toHaveProperty("msg", expect.any(String));
//     });
//     test("should return error", async () => {
//       //!test login email dan password salah/tidak valid
//       let respons = await request(app)
//         .post("/login")
//         .send({ credential: "data", password: data.password });
//       expect(respons.status).toBe(401);
//       expect(respons.body).toHaveProperty("msg", "username/password salah");
//     });
//   });
// });

describe.skip("POST /register", () => {
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
