import React from "react";

const RecentTransaction = () =>{
  return (
    <div className="p-3 rounded" style={{ backgroundColor: "#1C1C1C"}}>
      <p className="sm text-secondary">Recent Transaction</p>
      <p className="mt-3 text-secondary text-center"> No transaction found! </p>
    </div>
  )
}

export default RecentTransaction;