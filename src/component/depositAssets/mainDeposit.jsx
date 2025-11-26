import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const MainDeposit = ({handleSubmit, handleMethodChange, selectedMethod, amount, handleAmountChange }) =>{
  return (
    <>
      <h4 className="fw-bold mb-4 text-light border-start border-warning ps-2">Deposit</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="form-label text-secondary">Select a Payment Method</label>
          <div className="form-check bg-dark text-light rounded p-3 mb-2">
            <input className="form-check-input bg-dark" type="radio" name="paymentMethod" value="Bitcoin" id="bitcoin" checked={selectedMethod === 'Bitcoin'} onChange={handleMethodChange} />
            <label className="form-check-label ms-2" htmlFor="bitcoin">Bitcoin</label>
          </div>
          <div className="form-check bg-dark text-light rounded p-3 mb-2">
            <input className="form-check-input bg-dark" type="radio" id="usd" name="paymentMethod" value="USDT (TRC20)" checked={selectedMethod === 'USDT (TRC20)'} onChange={handleMethodChange} />
            <label htmlFor="usd" className="form-check-label ms-2">USDT (TRC20)</label>
          </div>
          <div className="form-check bg-dark text-light rounded p-3">
            <input className="bg-dark form-check-input" type="radio" id="ethirum" name="paymentMethod" value="Ethereum (ERC20)" checked={selectedMethod === 'Ethereum (ERC20)'} onChange={handleMethodChange} />
            <label htmlFor="ethirum" className="form-check-label ms-2">Ethereum (ERC20)</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label text-light">Amount (in USD)</label>
          <input
            type="number"
            className="text-dark form-control"
            placeholder="Enter Amount in USD"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100 fw-bold">
          Continue to Payment
        </button>
      </form>
    </>
  )
}

export default MainDeposit