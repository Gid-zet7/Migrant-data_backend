const request = require("supertest");
const dataControllerTest = require("./dataControllerTest");

describe("POST /data/create", () => {
  describe("given form title, form description and questions", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(dataControllerTest)
        .post("/data/create")
        .send({
          form_title: "title",
          form_desc: "description",
          questions: "questions",
        });
      expect(response.statusCode).toBe(200);
    });

    test("Should specify json in the content type header", async () => {
      const response = await request(dataControllerTest)
        .post("/data/create")
        .send({
          form_title: "title",
          form_desc: "description",
          questions: "questions",
        });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("When any of the credentials is missing", () => {
    test("Should respond with a 400 status code", async () => {
      const bodyData = [{ form_title: "title" }, { form_desc: "description" }];

      for (const body of bodyData) {
        const response = await request(dataControllerTest)
          .post("/data/create")
          .send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("POST /data/delete", () => {
  describe("Given an id", () => {
    test("Should respond with a 200 status code", async () => {
      const response = await request(dataControllerTest)
        .post("/data/delete")
        .send({
          id: 99,
        });
      expect(response.statusCode).toBe(200);
    });

    test("When id is missing, Should respond with a 400 status code", async () => {
      const response = await request(dataControllerTest)
        .post("/data/delete")
        .send({});
      expect(response.statusCode).toBe(400);
    });
  });
});
