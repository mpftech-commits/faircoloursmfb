import { Navigate, Outlet } from "react-router-dom";

const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  try {
    const parts = token.split(".");
    const payload = parts[1];
    if (!payload) return true;

    const decoded = JSON.parse(
      decodeURIComponent(
        atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(""),
      ),
    );

    if (!decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};

import { removeTokenCookie, getTokenFromCookie } from "../../services/authCookie";

const clearSession = () => {
  localStorage.removeItem("user");
  removeTokenCookie();
};

const ProtectedRoute = () => {
  const token = getTokenFromCookie();
  const expired = isTokenExpired(token);
  const storedUser = localStorage.getItem("user");
  const hasStoredUser = Boolean(storedUser);

  const shouldRedirect = (!token && !hasStoredUser) || (token && expired);
  if (shouldRedirect) {
    clearSession();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
