import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const TOKEN=localStorage.getItem("token");

  if (!TOKEN) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
