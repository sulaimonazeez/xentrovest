import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//import { AuthContext } from "./AuthContext";
import PrivateRoute from "./context/privateRoute";
import './App.css';
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ModelDetail from "./admin/components/modelDetail.jsx";
import Landing from "./pages/landingpage.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import Admin from "./admin/admin.jsx";
import Home from "./pages/home.jsx";
import HomeInvestment from "./pages/investHome.jsx";
import Deposit from "./pages/deposit.jsx";
import TransactionSuccess from "./pages/transaction.jsx";
import Refferal from "./pages/refferal.jsx";
import Profile from "./pages/profile.jsx";
import WithdrawBTC from "./pages/withdraw.jsx";
//import { logout } from './component/auth';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<SignUp />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/plan" element={<PrivateRoute element={<HomeInvestment />} />} />
        <Route path="/deposit" element={<PrivateRoute element={<Deposit />} />} />
        <Route path="/refferal" element={<PrivateRoute element={<Refferal />} />} />
        <Route path="/transaction" element={<PrivateRoute element={<TransactionSuccess />} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/withdrawl" element={<PrivateRoute element={<WithdrawBTC />} />} />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route path="/admin/:model" element={<PrivateRoute element={<ModelDetail />} />} />
      </Routes>
    </Router>
  );
}

export default App;