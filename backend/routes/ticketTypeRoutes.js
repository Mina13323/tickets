const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const validate = require("../middleware/validation");
const { ticketTypeSchema } = require("../schemas");

const {
  createTicketType,
  getTicketTypesByEvent,
  updateTicketType,
  deleteTicketType,
} = require("../controllers/ticketTypeController");

router.post("/", protect, isAdmin, validate(ticketTypeSchema), createTicketType);

router.get("/event/:eventId", getTicketTypesByEvent);

router.put("/:id", protect, isAdmin, validate(ticketTypeSchema), updateTicketType);

router.delete("/:id", protect, isAdmin, deleteTicketType);

module.exports = router;
