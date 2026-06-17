import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Loader } from './Loader';

export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
