const db = require("../config/db");

const getAllCollections = async (req, res) => {
  try {
    const [collections] = await db.query("SELECT * FROM collections ORDER BY id DESC");
    res.status(200).json({ success: true, collections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createCollection = async (req, res) => {
  try {
    const { title, subtitle, image_url } = req.body;
    const [result] = await db.query(
      `INSERT INTO collections (title, subtitle, image_url) VALUES (?, ?, ?)`,
      [title, subtitle, image_url]
    );
    res.status(201).json({ success: true, message: "Collection created successfully", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { getAllCollections, createCollection };
