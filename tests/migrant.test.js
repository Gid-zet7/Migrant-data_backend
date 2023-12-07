const request = require("supertest");
const migrantControllerTest = require("./migrantControllerTest");

describe("POST /migrant/create", () => {
  describe("given firstname, lastname, (with/without gender),date_of_birth, nationality, contact, migration_status", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(migrantControllerTest)
        .post("/migrant/create")
        .send({
          first_name: "firstname",
          last_name: "lastname",
          gender: "M/F",
          date_of_birth: "09/09/09",
          nationality: "nationality",
          contact: "contact",
          migration_status: "migration_status",
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should specify json in the content type header", async () => {
      const response = await request(migrantControllerTest)
        .post("/migrant/create")
        .send({
          first_name: "firstname",
          last_name: "lastname",
          gender: "M/F",
          date_of_birth: "09/09/09",
          nationality: "nationality",
          contact: "contact",
          migration_status: "migration_status",
        });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("When any of the credentials except gender is missing", () => {
    test("Should respond with a 400 status code", async () => {
      const bodyData = [
        { first_name: "firstname" },
        { lastname: "lastname" },
        { gender: "gender" },
        { nationality: "nationality" },
        { contact: "contact" },
      ];

      for (const body of bodyData) {
        const response = await request(migrantControllerTest)
          .post("/migrant/create")
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("PATCH /migrant/update", () => {
  describe("given firstname, lastname, (with/without gender),date_of_birth, nationality, contact, migration_status", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(migrantControllerTest)
        .patch("/migrant/update")
        .send({
          first_name: "firstname",
          last_name: "lastname",
          gender: "M/F",
          date_of_birth: "09/09/09",
          nationality: "nationality",
          contact: "contact",
          migration_status: "migration_status",
        });
      expect(response.statusCode).toBe(200);
    });
  });

  describe("When any of the credentials except gender is missing", () => {
    test("Should respond with a 400 status code", async () => {
      const bodyData = [
        { first_name: "firstname" },
        { lastname: "lastname" },
        { gender: "gender" },
        { nationality: "nationality" },
        { contact: "contact" },
        { migration_status: "migration_status" },
      ];

      for (const body of bodyData) {
        const response = await request(migrantControllerTest)
          .patch("/migrant/update")
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("POST /migrant/delete", () => {
  describe("Given an id", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(migrantControllerTest)
        .post("/migrant/delete")
        .send({
          id: 99,
        });
      expect(response.statusCode).toBe(200);
    });

    test("When id is missing, Should respond with a 400 status code", async () => {
      const response = await request(migrantControllerTest)
        .post("/migrant/delete")
        .send({});
      expect(response.statusCode).toBe(400);
    });
  });
});
