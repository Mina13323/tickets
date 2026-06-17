const db = require("../config/db");
const { approveBooking } = require("../controllers/bookingController");

jest.mock("../config/db");

describe("Booking Approval Business Logic", () => {
  let mockConnection;
  let req, res;

  beforeEach(() => {
    mockConnection = {
      beginTransaction: jest.fn(),
      query: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
    };
    db.getConnection.mockResolvedValue(mockConnection);

    req = {
      params: { id: "1" },
      app: {
        get: jest.fn().mockReturnValue({ emit: jest.fn() }), // Socket.io mock
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  test("Pending booking can be approved, updating status and ticket sold count", async () => {
    // 1. Mock select booking (pending)
    mockConnection.query.mockResolvedValueOnce([
      [{ id: 1, ticket_type_id: 10, quantity: 2, status: "pending" }],
    ]);

    // 2. Mock select ticket type (available quantity = 100 - 10 = 90)
    mockConnection.query.mockResolvedValueOnce([
      [{ id: 10, quantity: 100, sold: 10, price: 50.0 }],
    ]);

    // 3. Mock update booking status
    mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    // 4. Mock update sold count
    mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    await approveBooking(req, res);

    expect(mockConnection.beginTransaction).toHaveBeenCalledTimes(1);
    expect(mockConnection.commit).toHaveBeenCalledTimes(1);
    expect(mockConnection.release).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Booking approved",
    });

    // Verify correct queries were run
    expect(mockConnection.query).toHaveBeenNthCalledWith(
      1,
      "SELECT * FROM bookings WHERE id = ? FOR UPDATE",
      ["1"],
    );
    expect(mockConnection.query).toHaveBeenNthCalledWith(
      2,
      "SELECT * FROM ticket_types WHERE id = ? FOR UPDATE",
      [10],
    );
  });
});
