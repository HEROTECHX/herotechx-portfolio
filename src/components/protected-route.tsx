import type { ReactNode } from 'react';
import { useAuth } from '../context/auth-context';
import { SignInModal } from '../components/sign-in-modal';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return <SignInModal />;
  }

  return <>{children}</>;
}