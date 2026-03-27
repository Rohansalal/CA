import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSuperAdmin } from '../contexts/SuperAdminContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const SuperAdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSuperAdmin();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/super-admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default SuperAdminProtectedRoute;