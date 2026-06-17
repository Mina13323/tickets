const express = require("express");
const { getAllOrganizers, createOrganizer } = require("../controllers/organizerController");

const router = express.Router();

router.get("/", getAllOrganizers);
router.post("/", createOrganizer);

module.exports = router;
