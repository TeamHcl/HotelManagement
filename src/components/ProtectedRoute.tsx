import { Navigate, Outlet } from 'react-router-dom';
import { getStoredAuthUser } from '../features/auth/api/authSession';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = getStoredAuthUser();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      // Role not allowed (e.g., CUSTOMER trying to access admin dashboard)
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};
