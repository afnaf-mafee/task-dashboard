import { Navigate, useLocation } from "react-router-dom";
import useAuthData from "../hooks/useAuthData";

const PrivateRoute = ({ children }) => {
  const { user ,token} = useAuthData();

  const location = useLocation();

  const isAuthenticated = token && user?.role;
  const isAdmin = user?.role === "Admin";

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;