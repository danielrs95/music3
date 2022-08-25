import request from "supertest";
import app from "../src/app";

describe("GET /search?id=", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get(
      "/api/search?id=PLS0L1ZjTrL2-Jo6_EiRA4qCSlTrSxKLMX"
    );
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a JSON", async () => {
    const response = await request(app).get(
      "/api/search?id=PLS0L1ZjTrL2-Jo6_EiRA4qCSlTrSxKLMX"
    );

    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("should return a 400 status code", async () => {
    const response = await request(app).get("/api/search");

    expect(response.statusCode).toBe(400);
  });
});
