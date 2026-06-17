const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
  ),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  event_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  location: z.string().min(1, "Location is required"),
  organizer: z.string().min(1, "Organizer is required"),
  image_url: z.string().optional().nullable(),
  venue_name: z.string().optional().nullable(),
  venue_address: z.string().optional().nullable(),
  facilities: z.union([z.array(z.string()), z.string()]).optional().nullable(),
  is_active: z.union([z.boolean(), z.coerce.number()]).optional(),
});

const ticketTypeSchema = z.object({
  event_id: z.coerce.number().int().positive("Event ID must be a positive integer").optional(),
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  quantity: z.coerce.number().int().positive("Quantity must be greater than 0"),
});

const bookingSchema = z.object({
  ticket_type_id: z.coerce.number().int().positive("Ticket type ID must be a positive integer"),
  quantity: z.coerce.number().int().positive("Quantity must be greater than 0"),
});

module.exports = {
  registerSchema,
  loginSchema,
  eventSchema,
  ticketTypeSchema,
  bookingSchema,
};
