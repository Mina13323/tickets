import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { useMe } from './hooks/useAuth';
import { Loader } from './components/common/Loader';
import useRealtime from './hooks/useRealtime';
import useAuthStore from './store/authStore';
import LenisWrapper from './components/common/LenisWrapper';
import Preloader from './components/common/Preloader';
import CustomCursor from './components/common/CustomCursor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { isLoading } = useAuthStore();
  
  // Verify/refresh session on app mount
  useMe();
  
  // Initialize real-time updates via Socket.io globally
  useRealtime();

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <LenisWrapper>
      <CustomCursor />
      <AppRoutes />
    </LenisWrapper>
  );
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
        <AppContent />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
