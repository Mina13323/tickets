import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { ticketTypeService } from '@/services/ticketTypeService';
import { toast } from 'sonner';

export function useTicketTypesByEvent(eventId) {
  return useQuery({
    queryKey: ['ticketTypes', eventId],
    queryFn: async () => {
      const { data } = await ticketTypeService.getTicketTypesByEvent(eventId);
      return data.ticketTypes;
    },
    enabled: !!eventId,
  });
}

export function useCreateTicketType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => ticketTypeService.createTicketType(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ticketTypes', variables.event_id] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Ticket type created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create ticket type');
    },
  });
}

export function useUpdateTicketType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => ticketTypeService.updateTicketType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketTypes'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Ticket type updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update ticket type');
    },
  });
}

export function useDeleteTicketType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => ticketTypeService.deleteTicketType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketTypes'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Ticket type deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete ticket type');
    },
  });
}
