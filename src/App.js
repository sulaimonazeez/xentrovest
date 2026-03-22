import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./context/privateRoute";
import Landing from "./pages/landingpage.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import HomeInvestment from "./pages/investHome.jsx";
import Deposit from "./pages/deposit.jsx";
import { TransactionSuccess, Profile, WithdrawBTC, Refferal } from "./pages/otherPages.jsx";
import Admin from "./admin/admin.jsx";
import ModelDetail from "./admin/components/modelDetail.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/"       element={<Landing />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/create" element={<SignUp />} />

        {/* Protected */}
        <Route path="/home"        element={<PrivateRoute element={<Home />} />} />
        <Route path="/plan"        element={<PrivateRoute element={<HomeInvestment />} />} />
        <Route path="/deposit"     element={<PrivateRoute element={<Deposit />} />} />
        <Route path="/withdrawl"   element={<PrivateRoute element={<WithdrawBTC />} />} />
        <Route path="/transaction" element={<PrivateRoute element={<TransactionSuccess />} />} />
        <Route path="/refferal"    element={<PrivateRoute element={<Refferal />} />} />
        <Route path="/profile"     element={<PrivateRoute element={<Profile />} />} />
        <Route path="/admin"       element={<PrivateRoute element={<Admin />} />} />
        <Route path="/admin/:model" element={<PrivateRoute element={<ModelDetail />} />} />
      </Routes>
    </Router>
  );
}

export default App;
