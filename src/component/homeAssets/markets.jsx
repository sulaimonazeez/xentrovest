import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CryptoMarket = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-5">
      <p className="sm text-secondary">Crypto Currency Market</p>
      <div className="table-responsive shadow rounded">
        <table className="table table-hover table-striped table-bordered table-dark mb-0">
          <thead className="text-warning">
            <tr className="text-secondary">
              <th className="text-secondary">Name</th>
              <th className="text-secondary">Coin</th>
              <th className="text-secondary">Price</th>
              <th className="text-secondary">24h Change</th>
              <th className="text-secondary">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <motion.tr
                key={coin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <td className="d-flex text-primary fw-bold">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    width="18"
                    height="18"
                    className="me-2"
                    style={{ verticalAlign: "middle" }}
                  />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </td>
                <td className="text-white">${coin.current_price.toLocaleString()}</td>
                <td className="text-white">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="text-white">${coin.market_cap.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoMarket;