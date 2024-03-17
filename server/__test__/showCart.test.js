const app = require("../app");
const request = require("supertest");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const { signToken, verifyToken } = require("../helper/jwt");
const { hashPassword } = require("../helper/bcrypt");

let acces_token;
let game = [
  {
    id: 9,
    name: "Counter-Strike: Global Offensive",
    price: 300000,
    released: "2012-08-21T00:00:00.000Z",
    imageUrl:
      "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
    rating: 3.57,
    UserId: 1,
    GameId: 4291,
    status: false,
    rent: 3,
    createdAt: "2024-03-16T09:30:11.326Z",
    updatedAt: "2024-03-16T09:30:11.326Z",
  },
];
let produkBaru = {
  name: "testing1",
  description: "testing1",
  price: 400000,
  stock: 10,
  imageUrl: "testing1",
  CategoryId: 1,
  AuthorId: 1,
};

//!testing get
describe("get /cart", function () {
  //!testing succes
  describe("succes", () => {
    test("should return array of object", async () => {
      let respons = await request(app)
        .get("/cart")
        .set("Authorization", "Bearer " + acces_token);

      console.log(respons.body);
      expect(respons.status).toBe(200);
      expect(respons.body).toEqual(expect.any(Array));
    });
  });
  describe("failed", () => {
    //!testing fail
    test("should return object", async () => {
      //!test belum login
      let respons = await request(app).post("/cart");
      // .set("Authorization", "Bearer " + acces_token);
      console.log(respons.body);
      expect(respons.status).toBe(401);
      expect(respons.body).toHaveProperty("message", "Invalid Token");
    });
    test("should return object", async () => {
      //!test id salah
      let respons = await request(app)
        .get("/cart")
        .set("Authorization", "Bear " + acces_token);
      // .send({ rent: 2 });
      console.log(respons.body);
      expect(respons.status).toBe(401);
      expect(respons.body).toHaveProperty("message", "Invalid token");
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
