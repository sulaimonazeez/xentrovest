import React from "react";

const Investment = ({plan, amount, level1, level2, level3, colors, type}) => {
  return (
    <div className={`myround p-3 container-fluid bg-dark mt-4 ${colors}`}>
      <h3 className="text-light">{ plan }</h3>
      <p className="text-light">{amount}</p>
      <hr />
      <p className="sm"><i class="text-warning bi bi-check-circle"></i> {level1}</p>
      <p className="sm"><i class="text-warning bi bi-check-circle"></i> {level2}</p>
      <p className="sm"><i class="text-warning bi bi-check-circle"></i> {level3}</p>
      <hr />
      <div className="mt-2 mb-2">
        <input type={type} className="form-control w-100" placeholder="Amount"/>
      </div>
      <a href="#" className="rounded btn btn-warning w-100 p-2">Invest Now</a>
    </div>
  )
}

export default Investment;