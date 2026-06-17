const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const validate = require("../middleware/validation");
const { eventSchema } = require("../schemas");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvents,
} = require("../controllers/eventController");

router.post("/", protect, isAdmin, validate(eventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/search", searchEvents);
router.get("/:id", getEventById);
router.put("/:id", protect, isAdmin, validate(eventSchema), updateEvent);
router.delete("/:id", protect, isAdmin, deleteEvent);

module.exports = router;
