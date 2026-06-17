const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const validate = require("../middleware/validation");
const { bookingSchema } = require("../schemas");

const {
  createBooking,
  getMyBookings,
  getPendingBookings,
  approveBooking,
  rejectBooking,
  getBookingById,
} = require("../controllers/bookingController");

router.post("/", protect, validate(bookingSchema), createBooking);

router.get("/my-bookings", protect, getMyBookings);

router.get("/pending", protect, isAdmin, getPendingBookings);

router.put("/:id/approve", protect, isAdmin, approveBooking);

router.put("/:id/reject", protect, isAdmin, rejectBooking);

router.get("/:id", protect, getBookingById);

module.exports = router;
