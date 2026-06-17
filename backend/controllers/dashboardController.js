const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const [[users]] = await db.query(
      `
        SELECT COUNT(*) AS totalUsers
        FROM users
        `,
    );

    const [[events]] = await db.query(
      `
        SELECT COUNT(*) AS totalEvents
        FROM events
        `,
    );

    const [[bookings]] = await db.query(
      `
        SELECT COUNT(*) AS totalBookings
        FROM bookings
        `,
    );

    const [[pending]] = await db.query(
      `
        SELECT COUNT(*) AS pendingBookings
        FROM bookings
        WHERE status = 'pending'
        `,
    );

    const [[approved]] = await db.query(
      `
        SELECT COUNT(*) AS approvedBookings
        FROM bookings
        WHERE status = 'approved'
        `,
    );

    const [[revenue]] = await db.query(
      `
        SELECT
          COALESCE(
            SUM(total_price),
            0
          ) AS revenue
        FROM bookings
        WHERE status = 'approved'
        `,
    );

    res.status(200).json({
      success: true,

      stats: {
        totalUsers: users.totalUsers,

        totalEvents: events.totalEvents,

        totalBookings: bookings.totalBookings,

        pendingBookings: pending.pendingBookings,

        approvedBookings: approved.approvedBookings,

        revenue: revenue.revenue,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getRecentBookings = async (req, res) => {
  try {
    const [bookings] = await db.query(`
      SELECT
        b.id,
        b.quantity,
        b.total_price,
        b.status,
        b.created_at,

        u.name AS user_name,

        tt.name AS ticket_name,

        e.title AS event_title

      FROM bookings b

      JOIN users u
        ON u.id = b.user_id

      JOIN ticket_types tt
        ON tt.id = b.ticket_type_id

      JOIN events e
        ON e.id = tt.event_id

      ORDER BY b.created_at DESC

      LIMIT 10
    `);

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

module.exports = {
  getDashboardStats,
  getRecentBookings,
};
