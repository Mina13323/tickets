import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingService } from '@/services/bookingService';
import { toast } from 'sonner';

export function useMyBookings() {
  return useQuery({
    queryKey: ['bookings', 'my'],
    queryFn: async () => {
      const { data } = await bookingService.getMyBookings();
      return data.bookings;
    },
  });
}

export function usePendingBookings() {
  return useQuery({
    queryKey: ['bookings', 'pending'],
    queryFn: async () => {
      const { data } = await bookingService.getPendingBookings();
      return data.bookings;
    },
  });
}

export function useBooking(id) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: async () => {
      const { data } = await bookingService.getBooking(id);
      return data.booking;
    },
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingData) => bookingService.createBooking(bookingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Booking created successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    },
  });
}

export function useApproveBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => bookingService.approveBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Booking approved');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to approve booking');
    },
  });
}

export function useRejectBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => bookingService.rejectBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Booking rejected');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject booking');
    },
  });
}
