const db = require("../config/db");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image_url,
      organizer,
      location,
      venue_name,
      venue_address,
      event_date,
      facilities,
    } = req.body;

    let facilitiesJson = null;
    if (facilities) {
      if (typeof facilities === "string") {
        try {
          const parsed = JSON.parse(facilities);
          facilitiesJson = JSON.stringify(Array.isArray(parsed) ? parsed : [parsed]);
        } catch (e) {
          const parsed = facilities.split(",").map(f => f.trim()).filter(Boolean);
          facilitiesJson = JSON.stringify(parsed);
        }
      } else if (Array.isArray(facilities)) {
        facilitiesJson = JSON.stringify(facilities);
      } else {
        facilitiesJson = JSON.stringify([facilities]);
      }
    }

    const [result] = await db.query(
      `
      INSERT INTO events
      (
        title,
        description,
        image_url,
        organizer,
        location,
        venue_name,
        venue_address,
        event_date,
        facilities
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        description,
        image_url,
        organizer,
        location,
        venue_name,
        venue_address,
        event_date,
        facilitiesJson,
      ],
    );

    const io = req.app.get("io");
    if (io) {
      io.emit("event-created");
    }

    res.status(201).json({
      success: true,
      eventId: result.insertId,
      message: "Event created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const [events] = await db.query(
      `
      SELECT *
      FROM events
      ORDER BY event_date ASC
      `,
    );

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const [events] = await db.query(
      `
      SELECT *
      FROM events
      WHERE id = ?
      `,
      [id],
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event: events[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      image_url,
      organizer,
      location,
      venue_name,
      venue_address,
      event_date,
      facilities,
      is_active,
    } = req.body;

    let facilitiesJson = null;
    if (facilities) {
      if (typeof facilities === "string") {
        try {
          const parsed = JSON.parse(facilities);
          facilitiesJson = JSON.stringify(Array.isArray(parsed) ? parsed : [parsed]);
        } catch (e) {
          const parsed = facilities.split(",").map(f => f.trim()).filter(Boolean);
          facilitiesJson = JSON.stringify(parsed);
        }
      } else if (Array.isArray(facilities)) {
        facilitiesJson = JSON.stringify(facilities);
      } else {
        facilitiesJson = JSON.stringify([facilities]);
      }
    }

    const [result] = await db.query(
      `
      UPDATE events
      SET
        title = ?,
        description = ?,
        image_url = ?,
        organizer = ?,
        location = ?,
        venue_name = ?,
        venue_address = ?,
        event_date = ?,
        facilities = ?,
        is_active = ?
      WHERE id = ?
      `,
      [
        title,
        description,
        image_url,
        organizer,
        location,
        venue_name,
        venue_address,
        event_date,
        facilitiesJson,
        is_active,
        id,
      ],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const io = req.app.get("io");
    if (io) {
      io.emit("event-updated");
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
      DELETE FROM events
      WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const io = req.app.get("io");
    if (io) {
      io.emit("event-deleted");
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const searchEvents = async (req, res) => {
  try {
    const { q } = req.query;

    const [events] = await db.query(
      `
        SELECT *
        FROM events
        WHERE title LIKE ?
        ORDER BY event_date ASC
        `,
      [`%${q}%`],
    );

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  searchEvents,
};
