import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'SUPER_ADMIN';
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
  requiredRole = 'ADMIN'
}) => {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const { isAdminAuthenticated, adminUser, loading: adminLoading, verifyAdminAccess } = useAdmin();

  useEffect(() => {
    if (isAuthenticated && !isAdminAuthenticated) {
      verifyAdminAccess();
    }
  }, [isAuthenticated, isAdminAuthenticated, verifyAdminAccess]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // STRICT CHECK 1: Must be authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  // STRICT CHECK 2: Regular USER role cannot access admin at all
  if (user.role === 'USER') {
    return <Navigate to="/dashboard" replace />;
  }

  // STRICT CHECK 3: Must verify as admin
  if (!isAdminAuthenticated || !adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  // STRICT CHECK 4: Verify admin role exists
  if (!['ADMIN', 'SUPER_ADMIN'].includes(adminUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // STRICT CHECK 5: Super Admin only features
  if (requiredRole === 'SUPER_ADMIN' && adminUser.role !== 'SUPER_ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">⛔ Access Denied</h1>
          <p className="text-gray-600 mb-2">Only Super Admin can access this feature</p>
          <p className="text-sm text-gray-500">Your role: <strong>{adminUser.role}</strong></p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
