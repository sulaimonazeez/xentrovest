import React from "react";

const BalanceGrid = ({ balance, description, icon}) =>{
  return (
    <div className="d-flex mt-2">
      <div style={{ backgroundColor: "#444444"}} className="bg-dark balance-w p-2">
        <h3 className="balance text-light">${balance}</h3>
        <p className="sm text-secondary">{ description }</p>
      </div>
      <div style={{backgroundColor:"#2A2A2A"}} className="text-center w-icon p-1">
        <i className={`fs-1 ${icon}`}></i>
      </div>
    </div>
  )
}

export default BalanceGrid;