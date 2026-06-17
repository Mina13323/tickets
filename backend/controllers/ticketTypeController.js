const db = require("../config/db");

const createTicketType = async (req, res) => {
  try {
    const { event_id, name, price, quantity } = req.body;

    const [event] = await db.query("SELECT id FROM events WHERE id = ?", [
      event_id,
    ]);

    if (event.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO ticket_types
      (
        event_id,
        name,
        price,
        quantity
      )
      VALUES (?, ?, ?, ?)
      `,
      [event_id, name, price, quantity],
    );

    res.status(201).json({
      success: true,
      ticketTypeId: result.insertId,
      message: "Ticket type created successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getTicketTypesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const [ticketTypes] = await db.query(
      `
          SELECT *
          FROM ticket_types
          WHERE event_id = ?
          `,
      [eventId],
    );

    res.status(200).json({
      success: true,
      count: ticketTypes.length,
      ticketTypes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price, quantity } = req.body;

    const [result] = await db.query(
      `
          UPDATE ticket_types
          SET
            name = ?,
            price = ?,
            quantity = ?
          WHERE id = ?
          `,
      [name, price, quantity, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket type updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      `
          DELETE FROM ticket_types
          WHERE id = ?
          `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket type not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket type deleted successfully",
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
  createTicketType,
  getTicketTypesByEvent,
  updateTicketType,
  deleteTicketType,
};
