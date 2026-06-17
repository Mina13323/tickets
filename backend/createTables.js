require("dotenv").config();
const mysql = require("mysql2/promise");

async function runMigrations() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("Starting database migrations...");

    // 1. Create Venues Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS venues (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        capacity INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Venues table created or already exists.");

    // 2. Create Organizers Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS organizers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logo_url VARCHAR(500),
        story TEXT,
        followers INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Organizers table created or already exists.");

    // 3. Create Collections Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS collections (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        subtitle VARCHAR(255),
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Collections table created or already exists.");

    // 4. Alter Events Table to include new foreign keys (allow NULL for backward compatibility)
    try {
      await connection.query(`ALTER TABLE events ADD COLUMN venue_id INT NULL`);
      await connection.query(`ALTER TABLE events ADD CONSTRAINT fk_events_venue FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE SET NULL`);
      console.log("Added venue_id to events.");
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') console.log("venue_id already exists in events.");
      else throw e;
    }

    try {
      await connection.query(`ALTER TABLE events ADD COLUMN organizer_id INT NULL`);
      await connection.query(`ALTER TABLE events ADD CONSTRAINT fk_events_organizer FOREIGN KEY (organizer_id) REFERENCES organizers(id) ON DELETE SET NULL`);
      console.log("Added organizer_id to events.");
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') console.log("organizer_id already exists in events.");
      else throw e;
    }

    try {
      await connection.query(`ALTER TABLE events ADD COLUMN collection_id INT NULL`);
      await connection.query(`ALTER TABLE events ADD CONSTRAINT fk_events_collection FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE SET NULL`);
      console.log("Added collection_id to events.");
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') console.log("collection_id already exists in events.");
      else throw e;
    }

    try {
      await connection.query(`ALTER TABLE events ADD COLUMN category VARCHAR(100) NULL`);
      console.log("Added category to events.");
    } catch (e) {
      if (e.code === 'ER_DUP_FIELDNAME') console.log("category already exists in events.");
      else throw e;
    }

    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await connection.end();
  }
}

runMigrations();
