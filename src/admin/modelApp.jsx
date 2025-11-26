import React from "react";
import MainGrid from "./mainGrid.jsx";
//import { useNavigate } from "react-router-dom";
import "./css/main.css";
const ModelApp = ({ data }) => {
  const filteredData = Array.isArray(data)
    ? data.filter((item) => item !== "User")
    : [];

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col">
          <p className="p-2 skyblue text-light">MYAPP</p>
        </div>

        {filteredData.map((datas, index) => (
          <div key={index} className="even">
            <MainGrid databaseName={datas} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelApp;