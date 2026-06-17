1. Register User
2. Login User
3. Browse Events
4. Search Event
5. Book Ticket

Switch to Admin

6. Login Admin
7. Dashboard
8. Approve Booking

Switch back to User

9. Show Real-Time Status Change

---

✅ Node.js Backend
✅ Express
✅ MySQL
✅ JWT Authentication
✅ HttpOnly Cookies
✅ Role Authorization
✅ Events CRUD
✅ Ticket Types CRUD
✅ Booking System
✅ Approve / Reject Workflow
✅ Dashboard Analytics
✅ Search
✅ Zod Validation
✅ Database Transactions
✅ Security Fixes
✅ Database Indexes
✅ React Frontend
✅ React Query
✅ Zustand
✅ Axios
✅ Tailwind
✅ Shadcn UI
✅ Real-Time Socket.io

---

Frontend commands:

- npm install
- npm run dev

Backend commands:

- npm install
- npm run dev

---

-- ==========================================
-- DATABASE
-- ==========================================

CREATE DATABASE IF NOT EXISTS ticket_system;
USE ticket_system;

-- ==========================================
-- USERS TABLE
-- ==========================================

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role ENUM('user', 'admin') DEFAULT 'user',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- EVENTS TABLE
-- ==========================================

CREATE TABLE events (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
event_date DATETIME NOT NULL,
location VARCHAR(255) NOT NULL,
organizer VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- TICKET TYPES TABLE
-- ==========================================

CREATE TABLE ticket_types (
id INT AUTO_INCREMENT PRIMARY KEY,
event_id INT NOT NULL,
name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
quantity INT NOT NULL,
sold INT DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

```
CONSTRAINT fk_ticket_event
    FOREIGN KEY (event_id)
    REFERENCES events(id)
    ON DELETE CASCADE
```

);

-- ==========================================
-- BOOKINGS TABLE
-- ==========================================

CREATE TABLE bookings (
id INT AUTO_INCREMENT PRIMARY KEY,

```
user_id INT NOT NULL,
ticket_type_id INT NOT NULL,

quantity INT NOT NULL,

total_price DECIMAL(10,2) NOT NULL,

status ENUM(
    'pending',
    'approved',
    'rejected'
) DEFAULT 'pending',

admin_note TEXT NULL,

approved_at DATETIME NULL,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

CONSTRAINT fk_booking_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

CONSTRAINT fk_booking_ticket_type
    FOREIGN KEY (ticket_type_id)
    REFERENCES ticket_types(id)
    ON DELETE CASCADE
```

);

-- ==========================================
-- PERFORMANCE INDEXES
-- ==========================================

CREATE INDEX idx_events_date
ON events(event_date);

CREATE INDEX idx_ticket_types_event_id
ON ticket_types(event_id);

CREATE INDEX idx_bookings_user_created
ON bookings(user_id, created_at);

CREATE INDEX idx_bookings_status
ON bookings(status);

-- ==========================================
-- DEFAULT ADMIN USER
-- ==========================================
-- Replace password with a bcrypt hash
-- Example password:
-- Admin@123

INSERT INTO users (
name,
email,
password,
role
)
VALUES (
'System Admin',
'[admin@ticket.com](mailto:admin@ticket.com)',
'$2b$10$REPLACE_WITH_REAL_BCRYPT_HASH',
'admin'
);

---

# Database Setup Commands

## Connect to MySQL

```bash
mysql -u root -p
```

Or:

```bash
mysql -u root -pYOUR_PASSWORD
```

---

## Show Available Databases

```sql
SHOW DATABASES;
```

---

## Create Database

```sql
CREATE DATABASE ticket_system;
```

---

## Select Database

```sql
USE ticket_system;
```

---

## Show Tables

```sql
SHOW TABLES;
```

---

## View Table Structure

```sql
DESC users;

DESC events;

DESC ticket_types;

DESC bookings;
```

---

## View Table Data

```sql
SELECT * FROM users;

SELECT * FROM events;

SELECT * FROM ticket_types;

SELECT * FROM bookings;
```

---

## Check Existing Indexes

```sql
SHOW INDEX FROM events;

SHOW INDEX FROM ticket_types;

SHOW INDEX FROM bookings;
```

---

## Create Performance Indexes

```sql
CREATE INDEX idx_events_date
ON events(event_date);

CREATE INDEX idx_ticket_types_event_id
ON ticket_types(event_id);

CREATE INDEX idx_bookings_user_created
ON bookings(user_id, created_at);

CREATE INDEX idx_bookings_status
ON bookings(status);
```

---

## Update User Role to Admin

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'admin@ticket.com';
```

Or:

```sql
UPDATE users
SET role = 'admin'
WHERE id = 1;
```

---

## Verify Admin User

```sql
SELECT id, name, email, role
FROM users;
```

---

## Delete All Records (Development Only)

```sql
DELETE FROM bookings;

DELETE FROM ticket_types;

DELETE FROM events;

DELETE FROM users;
```

---

## Reset Auto Increment

```sql
ALTER TABLE bookings AUTO_INCREMENT = 1;

ALTER TABLE ticket_types AUTO_INCREMENT = 1;

ALTER TABLE events AUTO_INCREMENT = 1;

ALTER TABLE users AUTO_INCREMENT = 1;
```

---

## Drop Database

⚠️ Warning: This permanently removes all data.

```sql
DROP DATABASE ticket_system;
```

---

## Exit MySQL

```sql
EXIT;
```

Or:

```sql
QUIT;
```
