const express = require("express");
const { getAllCollections, createCollection } = require("../controllers/collectionController");

const router = express.Router();

router.get("/", getAllCollections);
router.post("/", createCollection);

module.exports = router;
