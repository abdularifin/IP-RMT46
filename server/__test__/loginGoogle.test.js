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
describe.skip("post /google-login", function () {
  describe("success", () => {
    test("should return status 201 and object of new user", async () => {
      let respons = await request(app).post("/google-login").send({
        tokenGoogle:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA5YmNmODAyOGUwNjUzN2Q0ZDNhZTRkODRmNWM1YmFiY2YyYzBmMGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjE1ODUwMzY1NTQtMjZuZXRhbGgxNGtqOTJia2hscjAxM2Nic21vbDhlOWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NjE1ODUwMzY1NTQtMjZuZXRhbGgxNGtqOTJia2hscjAxM2Nic21vbDhlOWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDE5MzI2MjE4MDMxNjEyMTYzMzAiLCJlbWFpbCI6ImFiZHVsLmFyaWZpbjY3NjdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxMDQzMzM0MSwibmFtZSI6ImFiZHVsIGFyaWZpbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLLVhJc0l5ZDMzNTlKZGN3eWNpcW1XejQ5XzJKT1FPUVBDVlFfc0dXdjk9czk2LWMiLCJnaXZlbl9uYW1lIjoiYWJkdWwiLCJmYW1pbHlfbmFtZSI6ImFyaWZpbiIsImxvY2FsZSI6ImlkIiwiaWF0IjoxNzEwNDMzNjQxLCJleHAiOjE3MTA0MzcyNDEsImp0aSI6ImE5NmVlZTQyOWE2YjA2ZjI0Y2ZiZWJjZmEyMDg1MGM2ODUyZmJmOWEifQ.TlRmcjcoIL8BgETOX1nxDf7g9gVAMi7oV1sIBKwePJ7fYa3Pz_LcDcfd2si412hUMeT-JDdahvIAzkNmhD1o6pPdB0bTabl0DucNYtZVPMbp_WXidSLbRAbYBB5L_fkuWAkh74Ov3nwFfq5YLvlpLB5joLLom69ld-5I6U7FgZHf-L_82Ic4cDpbRUurBKOJSyNs2BaFbdIE1y_5MZ7uLyqDfkO5IxFogf2QcVRtT-mJQKY5D9HDHroA0bpqK2UoVYNEx17kSjsjhCCic1c_HCyIK6zCy3fgN71x9fUSZhjtM7EYs7zCbU2w4DEMcOSv10JHYbCtOvZE46kbKowK-Q",
      });
      console.log(respons.body);
      expect(respons.status).toBe(200);
      expect(respons.body).toHaveProperty("access_token", expect.any(String));
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
