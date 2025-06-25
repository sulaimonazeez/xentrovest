import React from "react";

const Box = ({plan, amount, level1, level2, level3, colors}) => {
  return (
    <div className={`bg-dark myround p-3 container-fluid mt-4 ${colors}`}>
      <h3 className="text-light">{ plan }</h3>
      <hr />
      <p><i class="text-warning bi bi-check-circle"></i> {level1}</p>
      <p><i class="text-warning bi bi-check-circle"></i> {level2}</p>
      <p><i class="text-warning bi bi-check-circle"></i> {level3}</p>
      <hr />
      
      <a href="#" className="rounded btn btn-warning w-100 p-2">Invest Now</a>
    </div>
  )
}

export default Box;