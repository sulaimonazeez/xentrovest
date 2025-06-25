import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Landing from "./component/landingpage.jsx";
import Login from "./component/login.jsx";
import SignUp from "./component/signup.jsx";
import Home from "./component/home.jsx";
import HomeInvestment from "./component/investHome.jsx";
import Deposit from "./component/deposit.jsx";
import TransactionSuccess from "./component/transaction.jsx";
import Refferal from "./component/refferal.jsx";
import Profile from "./component/profile.jsx";
import WithdrawBTC from "./component/withdraw.jsx";
import { logout } from './component/auth';

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("access_token");
  const expiresIn = localStorage.getItem("expires_in");

  if (!accessToken || !expiresIn || Date.now() >= parseInt(expiresIn)) {
    if (accessToken && expiresIn && Date.now() >= parseInt(expiresIn)) {
      console.log("Access token expired for route protection. Logging out.");
      logout();
    } else if (!accessToken) {
      console.log("No access token found. Ensuring logout state.");
      logout();
    }
    return false;
  }
  console.log("Access Token Valid for route access.");
  return true;
};
const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("expires_in");
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={ <SignUp /> } />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/plan" element={<PrivateRoute element={<HomeInvestment />} />} />
        <Route path="/deposit" element={ <PrivateRoute element={<Deposit />} /> } />
        <Route path="/refferal" element={<PrivateRoute element={<Refferal /> } />} />
        <Route path="/transaction" element={<PrivateRoute element={<TransactionSuccess /> } />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile /> } />} />
        <Route path="/withdrawl" element={<PrivateRoute element={<WithdrawBTC /> } />} />
    </Routes>
    </Router>
  );
}

export default App;
