
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(localStorage.getItem("username"), {});
const [loading, setLoading] = useState(true); // ✅ Prevent auto logout flickering

useEffect(() => {
const token = localStorage.getItem("access_token");
const expiresIn = localStorage.getItem("expires_in");
const username = localStorage.getItem("username");

if (token && expiresIn && Date.now() < parseInt(expiresIn)) {  
  setUser({ username, token });  
} else {  
  localStorage.removeItem("access_token");
  localStorage.removeItem("role");
  localStorage.removeItem("expires_in");  
  localStorage.removeItem("username");  
}  
setLoading(false); // ✅ Signal that we’re done checking

}, []);

const login = (username, token, expiresIn) => {
const expiresAt = Date.now() + expiresIn * 1000; // ✅ Ensures correct timestamp
localStorage.setItem("username", username);
localStorage.setItem("access_token", token);
localStorage.setItem("expires_in", expiresAt);

setUser({ username, token });

};

const logout = () => {
localStorage.removeItem("username");
localStorage.removeItem("access_token");
localStorage.removeItem("expires_in");
localStorage.removeItem("role");
setUser(null);
};

return (
<AuthContext.Provider value={{ user, login, logout, loading }}>
{children}
</AuthContext.Provider>
);
};

