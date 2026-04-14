import { Navigate, Outlet } from "react-router-dom";

const isTokenExpired = (token: string | null) => {
  if (!token) return true;

  try {
    const [, payload] = token.split(".");
    if (!payload) return false;

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
    return false;
  }
};

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const expired = isTokenExpired(token);

  if (!token || expired) {
    clearSession();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
