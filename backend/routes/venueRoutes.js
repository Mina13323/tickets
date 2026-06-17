const express = require("express");
const { getAllVenues, createVenue } = require("../controllers/venueController");

const router = express.Router();

router.get("/", getAllVenues);
router.post("/", createVenue);

module.exports = router;
