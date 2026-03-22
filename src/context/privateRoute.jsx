import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "var(--obsidian)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "1rem"
      }}>
        <div className="x-spinner" />
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", margin: 0 }}>Loading...</p>
      </div>
    );
  }

  return user ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
