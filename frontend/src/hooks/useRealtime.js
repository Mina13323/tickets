import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/socket/socket";

export function useRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Helper to invalidate cached queries
    const invalidate = (keys) => {
      keys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
    };

    const handleEventCreated = () => {
      invalidate(["events"]);
    };

    const handleEventUpdated = () => {
      invalidate(["events", "ticketTypes"]);
    };

    const handleEventDeleted = () => {
      invalidate(["events"]);
    };

    const handleBookingCreated = () => {
      invalidate([
        "bookings",
        "dashboard",
        "pendingBookings",
        "myBookings",
        "dashboardStats",
        "recentBookings",
      ]);
    };

    const handleBookingApproved = () => {
      invalidate([
        "bookings",
        "dashboard",
        "ticketTypes",
        "events",
        "pendingBookings",
        "myBookings",
        "dashboardStats",
        "recentBookings",
      ]);
    };

    const handleBookingRejected = () => {
      invalidate([
        "bookings",
        "dashboard",
        "pendingBookings",
        "myBookings",
        "dashboardStats",
        "recentBookings",
      ]);
    };

    const handleDashboardUpdated = () => {
      invalidate([
        "dashboard",
        "dashboardStats",
        "recentBookings",
        "pendingBookings",
      ]);
    };

    // Connect socket on mounting the real-time hook
    if (!socket.connected) {
      socket.connect();
    }

    // Attach listeners
    socket.on("event-created", handleEventCreated);
    socket.on("event-updated", handleEventUpdated);
    socket.on("event-deleted", handleEventDeleted);
    socket.on("booking-created", handleBookingCreated);
    socket.on("booking-approved", handleBookingApproved);
    socket.on("booking-rejected", handleBookingRejected);
    socket.on("dashboard-updated", handleDashboardUpdated);

    // Clean up listeners on unmount
    return () => {
      socket.off("event-created", handleEventCreated);
      socket.off("event-updated", handleEventUpdated);
      socket.off("event-deleted", handleEventDeleted);
      socket.off("booking-created", handleBookingCreated);
      socket.off("booking-approved", handleBookingApproved);
      socket.off("booking-rejected", handleBookingRejected);
      socket.off("dashboard-updated", handleDashboardUpdated);
    };
  }, [queryClient]);
}
export default useRealtime;
