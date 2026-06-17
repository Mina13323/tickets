import api from '@/api/axios';

export const bookingService = {
  createBooking: (data) => api.post('/bookings', data),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getPendingBookings: () => api.get('/bookings/pending'),
  getBooking: (id) => api.get(`/bookings/${id}`),
  approveBooking: (id) => api.put(`/bookings/${id}/approve`),
  rejectBooking: (id) => api.put(`/bookings/${id}/reject`),
};
