const db = require("../config/db");

const getAllVenues = async (req, res) => {
  try {
    const [venues] = await db.query("SELECT * FROM venues ORDER BY id DESC");
    res.status(200).json({ success: true, venues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createVenue = async (req, res) => {
  try {
    const { name, location, address, description, image_url, capacity } = req.body;
    const [result] = await db.query(
      `INSERT INTO venues (name, location, address, description, image_url, capacity) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, location, address, description, image_url, capacity]
    );
    res.status(201).json({ success: true, message: "Venue created successfully", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getAllVenues, createVenue };
