import React, { useState } from 'react'; import { QRCodeCanvas } from "qrcode.react";
import axiosInstance from "../../api/utility.jsx";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const DepositForm = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [disable, setDisable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
const btcAddress = '1N4mmy5pdwxqgC8AigoRFM9kSxxxxx';

const handleMethodChange = (e) => { setSelectedMethod(e.target.value); };

const handleAmountChange = (e) => { setAmount(e.target.value); };

const handleSubmit = (e) => { e.preventDefault(); if (selectedMethod && amount) { setSubmitted(true); } };

const handleCopy = () => { navigator.clipboard.writeText(btcAddress); alert('BTC Address copied to clipboard!'); };

const handleDeposit = async () => {
  setDisable(true);
  let response = await axiosInstance.post("/auth/deposit", {"amount":amount, "coinType":selectedMethod});
  if (response.status === 200 || response.status === 201) {
    navigate("/transaction");
  }
}


return ( <div className="mt-5" style={{ maxWidth: '500px' }}> {!submitted ? ( <div className="p-4 rounded bg-black shadow container-fluid"> <h4 className="fw-bold mb-4 text-light border-start border-warning ps-2">Deposit</h4> <form onSubmit={handleSubmit}> <div className="mb-4"> <label className="form-label text-secondary">Select a Payment Method</label> <div className="form-check bg-dark text-light rounded p-3 mb-2"> <input className="form-check-input bg-dark" type="radio" name="paymentMethod" value="Bitcoin" id="bitcoin" checked={selectedMethod === 'Bitcoin'} onChange={handleMethodChange} /> <label className="form-check-label ms-2" htmlFor="bitcoin">Bitcoin</label> </div> <div className="form-check bg-dark text-light rounded p-3 mb-2"> <input className="form-check-input bg-dark" type="radio" id="usd" name="paymentMethod" value="USDT (TRC20)" checked={selectedMethod === 'USDT (TRC20)'} onChange={handleMethodChange} /> <label htmlFor="usd" className="form-check-label ms-2">USDT (TRC20)</label> </div> <div className="form-check bg-dark text-light rounded p-3"> <input className="bg-dark form-check-input" type="radio" id="ethirum" name="paymentMethod" value="Ethereum (ERC20)" checked={selectedMethod === 'Ethereum (ERC20)'} onChange={handleMethodChange} /> <label htmlFor="ethirum" className="form-check-label ms-2">Ethereum (ERC20)</label> </div> </div>

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
    </div>
  ) : (
    <div className="bg-black text-light p-4 rounded shadow">
      <h6 className="mb-3 text-secondary">Scan the QR Code to Pay</h6>
      <div className="text-center mb-4">
        <QRCodeCanvas value="1N4mmy5pdwxqgC8AigoRFM9kS..." size={200} />
      </div>

      <div className="mb-4">
        <label className="form-label text-secondary">Copy btc Address</label>
        <div className="input-group">
          <input type="text" className="form-control" value={btcAddress} readOnly />
          <button className="btn btn-outline-warning" onClick={handleCopy}>Copy</button>
        </div>
      </div>

      <div>
        <label className="form-label text-secondary">Amount to Pay (in USD)</label>
        <div className="mb-3 form-control">${amount}</div>
        <button disabled={disable} onClick={ handleDeposit } className="fw-bold btn btn-warning rounded w-100 ">Continue to Payment</button>
      </div>
    </div>
  )}
</div>

); };

export default DepositForm;

