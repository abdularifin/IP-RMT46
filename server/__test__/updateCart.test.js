const app = require("../app");
const request = require("supertest");
const { User, Product } = require("../models");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const { signToken, verifyToken } = require("../helper/jwt");
const { hashPassword } = require("../helper/bcrypt");

let acces_token;
let acces_token1;
let game = [
  {
    name: "testing1sjien",
    released: new Date(),
    imageUrl: "testing1",
    rating: 1.7,
    rent: 2,
    GameId: 12345,
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let produkBaru = {
  name: "testing1sjien",
  released: new Date(),
  imageUrl: "testing1",
  rating: 1,
  UserId: 1,
};

//!testing get
describe("get /update-cart/:id", function () {
  //!testing succes
  describe("succes", () => {
    test("should return array of object", async () => {
      let respons = await request(app)
        .put("/update-cart/1")
        .set("Authorization", "Bearer " + acces_token)
        .send({ GameId: 857751 });

      expect(respons.status).toBe(201);
      expect(respons.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("failed", () => {
    //!testing fail
    test("should return object", async () => {
      //!test belum login
      let respons = await request(app)
        .put("/update-cart/3")
        .set("Authorization", "Bearer " + acces_token)
        .send({ GameId: 857751 });
      console.log(respons.body);
      expect(respons.status).toBe(404);
      expect(respons.body).toHaveProperty("message", "game not found");
    });
    test("should return object", async () => {
      //!test id salah
      let respons = await request(app)
        .put("/update-cart/1")
        .set("Authorization", "Bearer " + acces_token);
      // .send({ GameId: 857751 });
      console.log(respons.body);
      expect(respons.status).toBe(400);
      expect(respons.body).toHaveProperty("message", "GameId is required");
    });
  });
});

//!hooks before test
beforeAll(async () => {
  let data = [
    {
      id: 1,
      username: "admin1",
      email: "admin@mail.com",
      password: hashPassword("admin123"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  let data1 = [
    {
      id: 1,
      username: "admin1",
      email: "admin@mail.com",
      password: hashPassword("admin123"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await queryInterface.bulkInsert("Users", data, {});
  //   await queryInterface.bulkInsert("Users", data1, {});

  acces_token = signToken({ id: data[0].id });
  acces_token1 = signToken({ id: data1[0].id });
  //   await queryInterface.bulkInsert("Categories", category, {});
  await queryInterface.bulkInsert("Carts", game, {});
});
//!hooks after test
afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
  await queryInterface.bulkDelete("Carts", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});
