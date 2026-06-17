const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const isAdmin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getRecentBookings,
} = require("../controllers/dashboardController");

router.get("/stats", protect, isAdmin, getDashboardStats);

router.get("/recent-bookings", protect, isAdmin, getRecentBookings);

module.exports = router;
