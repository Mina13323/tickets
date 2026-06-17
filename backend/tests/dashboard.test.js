const request = require("supertest");
const app = require("../server");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

jest.mock("../config/db");

describe("GET /api/dashboard/stats", () => {
  let token;

  beforeEach(() => {
    token = jwt.sign(
      { id: 1, role: "admin" },
      process.env.JWT_SECRET || "SUPERJWTFORHUGHERSECURITY",
    );
    jest.clearAllMocks();
  });

  test("Dashboard Stats returns correct calculations and counts", async () => {
    // Mock the 6 queries inside getDashboardStats:
    // 1. SELECT COUNT(*) AS totalUsers FROM users
    db.query.mockResolvedValueOnce([[{ totalUsers: 5 }]]);
    // 2. SELECT COUNT(*) AS totalEvents FROM events
    db.query.mockResolvedValueOnce([[{ totalEvents: 10 }]]);
    // 3. SELECT COUNT(*) AS totalBookings FROM bookings
    db.query.mockResolvedValueOnce([[{ totalBookings: 8 }]]);
    // 4. SELECT COUNT(*) AS pendingBookings FROM bookings WHERE status = 'pending'
    db.query.mockResolvedValueOnce([[{ pendingBookings: 3 }]]);
    // 5. SELECT COUNT(*) AS approvedBookings FROM bookings WHERE status = 'approved'
    db.query.mockResolvedValueOnce([[{ approvedBookings: 4 }]]);
    // 6. SELECT SUM(total_price) AS revenue FROM bookings WHERE status = 'approved'
    db.query.mockResolvedValueOnce([[{ revenue: 1500.0 }]]);

    const res = await request(app)
      .get("/api/dashboard/stats")
      .set("Cookie", [`token=${token}`]);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.stats).toEqual({
      totalUsers: 5,
      totalEvents: 10,
      totalBookings: 8,
      pendingBookings: 3,
      approvedBookings: 4,
      revenue: 1500.0,
    });
  });
});
