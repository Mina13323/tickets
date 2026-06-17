import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboardService';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const { data } = await dashboardService.getStats();
      return data.stats;
    },
  });
}

export function useRecentBookings() {
  return useQuery({
    queryKey: ['dashboard', 'recent-bookings'],
    queryFn: async () => {
      const { data } = await dashboardService.getRecentBookings();
      return data.bookings;
    },
  });
}
