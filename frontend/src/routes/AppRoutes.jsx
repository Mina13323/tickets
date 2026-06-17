import { Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '@/components/layout/UserLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Home from '@/pages/user/Home';
import EventDetails from '@/pages/user/EventDetails';
import MyTickets from '@/pages/user/MyTickets';
import Dashboard from '@/pages/admin/Dashboard';
import Events from '@/pages/admin/Events';
import TicketTypes from '@/pages/admin/TicketTypes';
import Bookings from '@/pages/admin/Bookings';
import EventsExplore from '@/pages/user/EventsExplore';
import Venues from '@/pages/admin/Venues';
import Organizers from '@/pages/admin/Organizers';
import Collections from '@/pages/admin/Collections';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Layout Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<EventsExplore />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route
          path="my-tickets"
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Layout Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="ticket-types" element={<TicketTypes />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="venues" element={<Venues />} />
        <Route path="organizers" element={<Organizers />} />
        <Route path="collections" element={<Collections />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
