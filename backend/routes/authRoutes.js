const express = require("express");
const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const validate = require("../middleware/validation");
const { registerSchema, loginSchema } = require("../schemas");

const router = express.Router();

const {
  register,
  login,
  logout,
  getMe,
} = require("../controllers/authController");

router.get("/admin-test", protect, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome admin",
  });
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;
