import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NavBar from "./components/navbar.jsx";
import Main from "./components/main.jsx";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/home");
  }, [user, navigate]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidian)" }}>
      <NavBar />
      <Main />
    </div>
  );
};

export default Admin;
