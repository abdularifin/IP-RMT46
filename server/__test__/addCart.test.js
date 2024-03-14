const app = require("../app");
const request = require("supertest");
const { User, Product } = require("../models");

const { sequelize } = require("../models");
const { queryInterface } = sequelize;

const { signToken, verifyToken } = require("../helper/jwt");
const { hashPassword } = require("../helper/bcrypt");

let acces_token;
let game = [
  {
    name: "testing1sjien",
    description: "testing1",
    price: 400000,
    stock: 10,
    imageUrl: "testing1",
    CategoryId: 1,
    AuthorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "31112",
    description: "testing1",
    price: 400000,
    stock: 10,
    imageUrl: "testing1",
    CategoryId: 1,
    AuthorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
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
describe("get /add-cart/:id", function () {
  //!testing succes
  describe("succes", () => {
    test("should return array of object", async () => {
      let respons = await request(app)
        .post("/add-cart/857751")
        .set("Authorization", "Bearer " + acces_token)
        .send({ rent: 2 });
      console.log(respons.body);
      expect(respons.status).toBe(201);
      expect(respons.body).toHaveProperty("message", expect.any(String));
    });
  });
  describe("failed", () => {
    //!testing fail
    test("should return object", async () => {
      //!test belum login
      let respons = await request(app).post("/add-cart/857751");
      // .set("Authorization", "Bearer " + acces_token);
      console.log(respons.body);
      expect(respons.status).toBe(401);
      expect(respons.body).toHaveProperty("message", "Invalid Token");
    });
    test("should return object", async () => {
      //!test id salah
      let respons = await request(app)
        .post("/add-cart/857751")
        .set("Authorization", "Bearer " + acces_token);
      // .send({ rent: 2 });
      console.log(respons.body);
      expect(respons.status).toBe(400);
      expect(respons.body).toHaveProperty("message", "rent is required");
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

  await queryInterface.bulkInsert("Users", data, {});

  acces_token = signToken({ id: data[0].id });
  //   acces_token = signToken({ id: data[0].id, role: data[0].role });
  //   await queryInterface.bulkInsert("Categories", category, {});
  //   await queryInterface.bulkInsert("Products", product, {});
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
