import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/authService';
import useAuthStore from '@/store/authStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function useMe() {
  const { setUser, clearUser } = useAuthStore();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      try {
        const { data } = await authService.getMe();
        setUser(data.user);
        return data.user;
      } catch {
        clearUser();
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (response) => {
      const user = response.data.user;
      setUser(user);
      queryClient.setQueryData(['auth', 'me'], user);
      toast.success('Welcome back!');
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/');
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
    },
  });
}

export function useRegister() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => authService.register(data),
    onSuccess: (response) => {
      const user = response.data.user;
      setUser(user);
      queryClient.setQueryData(['auth', 'me'], user);
      toast.success('Account created successfully!');
      navigate('/');
    },
    onError: (error) => {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
    },
  });
}

export function useLogout() {
  const { clearUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/login');
    },
  });
}
