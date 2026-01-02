import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-light text-center mt-5">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return element;
};

export default PrivateRoute;