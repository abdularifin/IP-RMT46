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
describe("post /google-login", function () {
  describe("success", () => {
    test("should return status 201 and object of new user", async () => {
      let respons = await request(app).post("/google-login").send({
        tokenGoogle:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4YmY1YzM3NzJkZDRlN2E3MjdhMTAxYmY1MjBmNjU3NWNhYzMyNmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjE1ODUwMzY1NTQtMjZuZXRhbGgxNGtqOTJia2hscjAxM2Nic21vbDhlOWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NjE1ODUwMzY1NTQtMjZuZXRhbGgxNGtqOTJia2hscjAxM2Nic21vbDhlOWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE5MzI2MjE4MDMxNjEyMTYzMzAiLCJlbWFpbCI6ImFiZHVsLmFyaWZpbjY3NjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxMDM0NTAwMSwibmFtZSI6ImFiZHVsIGFyaWZpbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLLVhJc0l5ZDMzNTlKZGN3eWNpcW1XejQ5XzJKT1FPUVBDVlFfc0dXdjk9czk2LWMiLCJnaXZlbl9uYW1lIjoiYWJkdWwiLCJmYW1pbHlfbmFtZSI6ImFyaWZpbiIsImxvY2FsZSI6ImlkIiwiaWF0IjoxNzEwMzQ1MzAxLCJleHAiOjE3MTAzNDg5MDEsImp0aSI6IjQxODZiZTczYTU3Y2RmYjNiZTMyMThkYTdiNjExYmIxMjFkMGM4NWUifQ.UPDBLqp2IHyHKwzL2zcGZpPvUHTOUmbahBpzhBWK4_uBPC69mRMdxlouFcOfXUd9fuZflyom6pFKpp_xMQq7lSUyQ5BENnoBcTXIZ51zCROyHn4z4on_4AxPCaLkAE1LgbktpJpKimjssXnOH6239Nn5t60JHu_i-BtCrFtqngSAkgyIjhGlxmCCp1b6gHFS8wIrYu5g4uUcbQ9ChtBwldZ-J3x-qLUCBUoFNJ5Qm68pGgqoSxo9x71HGJZiCpv7gWFfRsoDaOQt1CYIfW8MiBZpD1OLRshTMa90_TtqbFD-sXoHjzbdM268WnWJf8pmK6BjFbvifbG-uaCkoZwLNw",
      });
      console.log(respons.body);
      expect(respons.status).toBe(201);
      expect(respons.body).toHaveProperty("token");
    });
  });
  //!test login gagal
  describe.skip("failed", () => {
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
