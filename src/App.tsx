import { HashRouter, Routes, Route } from 'react-router-dom';
import { PortfolioPage } from './pages/portfolio-page';
import { AdminPage } from './pages/admin-page';
import { AuthProvider } from './provider/auth-provider';
import { ProtectedRoute } from './components/protected-route';
import { ToastProvider } from './provider/toast-provider';
import { NotFoundPage } from './pages/not-found-page';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          
          <Route 
            path="/admin-page" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
      <ToastProvider />
    </HashRouter>
  );
}