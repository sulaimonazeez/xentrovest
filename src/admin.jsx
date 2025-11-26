import NavBar from "./admin/navbar.jsx";
import Main from "./admin/main.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () =>{
  const navigate = useNavigate();
  let role = localStorage.getItem("role");
  useEffect(() =>{
    if (role === "user") {
      navigate("/home");
    }
  }, [navigate, role])
  
  return (
    <div>
      <NavBar />
      <Main />
    </div>
  )
}

export default Admin;