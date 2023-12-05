const request = require("supertest");
const userControllerTest = require("./userControllerTest");

describe("POST /user/create", () => {
  describe("given username, email, password and roles", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(userControllerTest)
        .post("/user/create")
        .send({
          username: "username",
          password: "123456789",
          email: "username@example.com",
          roles: ["User"],
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should specify json in the content type header", async () => {
      const response = await request(userControllerTest)
        .post("/user/create")
        .send({
          username: "username",
          password: "password",
          email: "username@example.com",
          roles: ["User"],
        });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("When the username and password is missing", () => {
    test("Should respond with a 400 status code", async () => {
      const bodyData = [{ username: "username" }, { password: "123456789" }];

      for (const body of bodyData) {
        const response = await request(userControllerTest)
          .post("/user/create")
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("PATCH /user/update", () => {
  describe("given an id, username, email, password and roles", () => {
    test("Should respond with a 220 status code", async () => {
      const response = await request(userControllerTest)
        .patch("/user/update")
        .send({
          id: 1098532,
          username: "username",
          password: "123456789",
          email: "username@example.com",
          roles: ["User"],
        });
      expect(response.statusCode).toBe(220);
    });

    test("Should respond with a 200 status code if password is not provided", async () => {
      const response = await request(userControllerTest)
        .patch("/user/update")
        .send({
          id: 1098532,
          username: "username",
          email: "username@example.com",
          roles: ["User"],
        });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("When the username, id, email or roles is missing", () => {
    test("Should respond with a 400 status code", async () => {
      const bodyData = [{ username: "username" }, { password: "123456789" }];

      for (const body of bodyData) {
        const response = await request(userControllerTest)
          .patch("/user/update")
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("POST /user/delete", () => {
  describe("Given an id", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(userControllerTest)
        .post("/user/delete")
        .send({
          id: 99,
        });
      expect(response.statusCode).toBe(200);
    });

    test("When id is missing, Should respond with a 400 status code", async () => {
      const response = await request(userControllerTest)
        .post("/user/delete")
        .send({});
      expect(response.statusCode).toBe(400);
    });
  });
});
