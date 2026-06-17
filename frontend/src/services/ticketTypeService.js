import api from '@/api/axios';

export const ticketTypeService = {
  getTicketTypesByEvent: (eventId) => api.get(`/ticket-types/event/${eventId}`),
  createTicketType: (data) => api.post('/ticket-types', data),
  updateTicketType: (id, data) => api.put(`/ticket-types/${id}`, data),
  deleteTicketType: (id) => api.delete(`/ticket-types/${id}`),
};
