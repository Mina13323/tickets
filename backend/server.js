const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const ticketTypeRoutes = require("./routes/ticketTypeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const venueRoutes = require("./routes/venueRoutes");
const organizerRoutes = require("./routes/organizerRoutes");
const collectionRoutes = require("./routes/collectionRoutes");

const app = express();

// Middelware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

//Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

//auth routes
app.use("/api/auth", authRoutes);

//event routes
app.use("/api/events", eventRoutes);

//ticket type routes
app.use("/api/ticket-types", ticketTypeRoutes);

//booking routes
app.use("/api/bookings", bookingRoutes);

//dashboard routes
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/venues", venueRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/collections", collectionRoutes);

// Database
const testDatabaseConnection = async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database Connected");
  } catch (error) {
    console.error("No Connection with Database");
    console.error(error);
  }
};

testDatabaseConnection();

// Create HTTP server and attach Socket.io
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Store io inside Express app
app.set("io", io);

//server
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
