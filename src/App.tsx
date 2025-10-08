import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioPage } from '@/pages/portfolio-page';
import { AdminPage } from '@/pages/admin-page';
import { AuthProvider } from '@/provider/auth-provider';
import { ProtectedRoute } from '@/components/protected-route';
import { ToastProvider } from './provider/toast-provider';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public route without redirect */}
          <Route path="/portfolio/" element={<PortfolioPage />} />

          {/* Protected routes - require authentication */}
          <Route 
            path="/portfolio/admin-page" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
      <ToastProvider />
    </BrowserRouter>
  );
}