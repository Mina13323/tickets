const request = require("supertest");
const app = require("../server");
const db = require("../config/db");

jest.mock("../config/db");

describe("GET /api/events/search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Search endpoint returns matching events", async () => {
    const mockEvents = [
      { id: 1, title: "Cairokee Concert", location: "Cairo Arena" }
    ];
    db.query.mockResolvedValueOnce([mockEvents]);

    const res = await request(app)
      .get("/api/events/search")
      .query({ q: "Cairokee" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      count: 1,
      events: mockEvents
    });
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ["%Cairokee%"]);
  });

  test("Empty search query returns empty array or matching events", async () => {
    db.query.mockResolvedValueOnce([[]]);

    const res = await request(app)
      .get("/api/events/search")
      .query({ q: "" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      count: 0,
      events: []
    });
  });

  test("Should handle database error and return 500", async () => {
    db.query.mockRejectedValueOnce(new Error("Database connection lost"));

    const res = await request(app)
      .get("/api/events/search")
      .query({ q: "error-trigger" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      success: false,
      message: "Internal server error"
    });
  });
});
