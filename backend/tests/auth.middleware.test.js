const protect = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const { registerSchema } = require("../schemas");

jest.mock("jsonwebtoken");

describe("Auth Validation", () => {
  test("Invalid email returns validation error", () => {
    const payload = {
      name: "John Doe",
      email: "invalid-email",
      password: "StrongPassword123!"
    };
    const result = registerSchema.safeParse(payload);
    const errorIssues = result.error.issues || result.error.errors || [];
    expect(result.success).toBe(false);
    expect(errorIssues[0].message).toBe("Invalid email format");
  });

  test("Weak password returns validation error", () => {
    const payload = {
      name: "John Doe",
      email: "john@example.com",
      password: "weak"
    };
    const result = registerSchema.safeParse(payload);
    const errorIssues = result.error.issues || result.error.errors || [];
    expect(result.success).toBe(false);
    expect(errorIssues[0].path).toContain("password");
  });

  test("Valid payload passes validation", () => {
    const payload = {
      name: "John Doe",
      email: "john@example.com",
      password: "StrongPassword123!"
    };
    const result = registerSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });
});

describe("Auth Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test("Missing JWT cookie returns 401", () => {
    protect(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Unauthorized"
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("Invalid JWT returns 401/403 equivalent error response", () => {
    req.cookies.token = "invalid-token";
    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    protect(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid or expired token"
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("Valid JWT allows access and attaches user details", () => {
    req.cookies.token = "valid-token";
    const mockUser = { id: 1, role: "user" };
    jwt.verify.mockReturnValue(mockUser);

    protect(req, res, next);
    expect(jwt.verify).toHaveBeenCalledWith("valid-token", process.env.JWT_SECRET);
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });
});
