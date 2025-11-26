import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./RecentTransaction.css"; // We'll add animations & effects here

const RecentTransaction = () => {
  return (
    <div className="recent-card p-4 rounded-4 shadow-lg">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="text-uppercase text-secondary fw-bold m-0">
          Recent Transactions
        </h6>
        <i className="bi bi-arrow-repeat text-muted refresh-icon"></i>
      </div>

      <div className="text-center py-5 fade-in">
        <i className="bi bi-receipt-cutoff fs-1 text-secondary"></i>
        <p className="mt-3 text-secondary">
          No transactions yet.<br />Once you start earning, they’ll show up here.
        </p>
      </div>
    </div>
  );
};

export default RecentTransaction;