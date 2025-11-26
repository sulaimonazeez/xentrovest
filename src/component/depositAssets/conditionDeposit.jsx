import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ConditionDeposit = () =>{
  return (
    <div className="bg-dark text-light p-4 rounded shadow">
      <h6 className="mb-3 text-muted">Scan the QR Code to Pay</h6>
      <div className="text-center mb-4">
        <QRCodeCanvas value="1N4mmy5pdwxqgC8AigoRFM9kS..." size={200} />
      </div>

      <div className="mb-4">
        <label className="form-label text-muted">Copy btc Address</label>
        <div className="input-group">
          <input type="text" className="form-control" value={btcAddress} readOnly />
          <button className="btn btn-outline-warning" onClick={handleCopy}>Copy</button>
        </div>
      </div>

      <div>
        <label className="form-label text-muted">Amount to Pay (in USD)</label>
        <div className="form-control">${amount}</div>
      </div>
    </div>
  )
}

export default ConditionDeposit;