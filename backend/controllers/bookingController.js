const db = require("../config/db");

const createBooking = async (req, res) => {
  try {
    const { ticket_type_id, quantity } = req.body;

    const [ticketTypes] = await db.query(
      `
      SELECT *
      FROM ticket_types
      WHERE id = ?
      `,
      [ticket_type_id],
    );

    if (ticketTypes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket type not found",
      });
    }

    const ticketType = ticketTypes[0];
    const availableTickets = ticketType.quantity - ticketType.sold;

    if (quantity > availableTickets) {
      return res.status(400).json({
        success: false,
        message: "Not enough tickets available",
      });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity",
      });
    }

    const totalPrice = Number(ticketType.price) * Number(quantity);

    const [result] = await db.query(
      `
      INSERT INTO bookings
      (
        user_id,
        ticket_type_id,
        quantity,
        total_price
      )
      VALUES (?, ?, ?, ?)
      `,
      [req.user.id, ticket_type_id, quantity, totalPrice],
    );

    const io = req.app.get("io");
    if (io) {
      io.emit("booking-created");
      io.emit("dashboard-updated");
    }

    res.status(201).json({
      success: true,
      bookingId: result.insertId,
      status: "pending",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(
      `
      SELECT
        b.*,
        tt.name AS ticket_name,
        e.title AS event_title
      FROM bookings b
      JOIN ticket_types tt
        ON tt.id = b.ticket_type_id
      JOIN events e
        ON e.id = tt.event_id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC
      `,
      [req.user.id],
    );

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPendingBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(
      `
      SELECT
        b.*,
        u.name AS user_name,
        u.email,
        tt.name AS ticket_name,
        e.title AS event_title
      FROM bookings b
      JOIN users u
        ON u.id = b.user_id
      JOIN ticket_types tt
        ON tt.id = b.ticket_type_id
      JOIN events e
        ON e.id = tt.event_id
      WHERE b.status = 'pending'
      ORDER BY b.created_at DESC
      `,
    );

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const approveBooking = async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Lock and select booking row
    const [bookings] = await connection.query(
      "SELECT * FROM bookings WHERE id = ? FOR UPDATE",
      [id]
    );

    // Validation 1: Booking exists
    if (bookings.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const booking = bookings[0];

    // Validation 2: Booking is pending
    if (booking.status !== "pending") {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Booking already processed",
      });
    }

    // 2. Lock and select ticket_types row
    const [ticketTypes] = await connection.query(
      "SELECT * FROM ticket_types WHERE id = ? FOR UPDATE",
      [booking.ticket_type_id]
    );

    // Validation 3: Ticket type exists
    if (ticketTypes.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: "Ticket type not found",
      });
    }

    const ticketType = ticketTypes[0];
    const availableTickets = ticketType.quantity - ticketType.sold;

    // Validation 4: Available tickets >= booking quantity
    if (booking.quantity > availableTickets) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: "Not enough tickets available",
      });
    }

    // Update booking status
    await connection.query(
      `
      UPDATE bookings
      SET
        status = 'approved',
        approved_at = NOW()
      WHERE id = ?
      `,
      [id]
    );

    // Update sold count
    await connection.query(
      `
      UPDATE ticket_types
      SET sold = sold + ?
      WHERE id = ?
      `,
      [booking.quantity, booking.ticket_type_id]
    );

    await connection.commit();

    const io = req.app.get("io");
    if (io) {
      io.emit("booking-approved");
      io.emit("dashboard-updated");
    }

    res.status(200).json({
      success: true,
      message: "Booking approved",
    });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } finally {
    connection.release();
  }
};

const rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const [bookings] = await db.query(
      `
      SELECT *
      FROM bookings
      WHERE id = ?
      `,
      [id],
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (bookings[0].status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Booking already processed",
      });
    }

    await db.query(
      `
      UPDATE bookings
      SET status = 'rejected'
      WHERE id = ?
      `,
      [id],
    );

    const io = req.app.get("io");
    if (io) {
      io.emit("booking-rejected");
      io.emit("dashboard-updated");
    }

    res.status(200).json({
      success: true,
      message: "Booking rejected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const [bookings] = await db.query(
      `
      SELECT
        b.*,
        u.name AS user_name,
        u.email,
        tt.name AS ticket_name,
        e.title AS event_title
      FROM bookings b
      JOIN users u
        ON u.id = b.user_id
      JOIN ticket_types tt
        ON tt.id = b.ticket_type_id
      JOIN events e
        ON e.id = tt.event_id
      WHERE b.id = ?
      `,
      [id],
    );

    if (bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const booking = bookings[0];

    // Ownership & Admin Authorization Check
    if (booking.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      booking,
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
  createBooking,
  getMyBookings,
  getPendingBookings,
  approveBooking,
  rejectBooking,
  getBookingById,
};
