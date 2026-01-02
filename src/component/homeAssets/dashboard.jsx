import React, { useEffect, useState } from "react";
import BalanceGrid from "./balanceGrid.jsx";
import axiosInstance from "../../api/utility.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axiosInstance.get("/auth/balance"); // no trailing slash
        const data = response.data;
        setBalance(data.balance || 0);
        setProfit(data.profit || 0);
        setBonus(data.bonus || 0);
      } catch (error) {
        console.error("Failed to fetch balance:", error.response?.data || error.message);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div style={{ backgroundColor: "#1C1C1C" }} className="text-light container-fluid d-block p-2 rounded">
      <p className="mb-2 mt-2 sm text-secondary">Finance</p>
      <BalanceGrid balance={balance} description="TOTAL BALANCE" icon="bi bi-wallet" />
      <BalanceGrid balance={profit} description="TOTAL PROFIT (ONGOING TRADE)" icon="bi bi-graph-up-arrow" />
      <BalanceGrid balance={bonus} description="TOTAL BONUS" icon="bi bi-currency-exchange" />
    </div>
  );
};

export default Dashboard;