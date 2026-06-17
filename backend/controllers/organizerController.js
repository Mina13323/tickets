const db = require("../config/db");

const getAllOrganizers = async (req, res) => {
  try {
    const [organizers] = await db.query("SELECT * FROM organizers ORDER BY id DESC");
    res.status(200).json({ success: true, organizers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createOrganizer = async (req, res) => {
  try {
    const { name, logo_url, story, followers } = req.body;
    const [result] = await db.query(
      `INSERT INTO organizers (name, logo_url, story, followers) VALUES (?, ?, ?, ?)`,
      [name, logo_url, story, followers || 0]
    );
    res.status(201).json({ success: true, message: "Organizer created successfully", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getAllOrganizers, createOrganizer };
