import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FaAngleDoubleDown } from "react-icons/fa";
import './busList.css';

export default function BusList({ value: dataInp = [] }) {
  const [busData, setBusData] = useState([]);
  const [reset, setReset] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [isBookEnabled, setIsBookEnabled] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (Array.isArray(dataInp)) {
      setBusData(dataInp);
    } else {
      setBusData([]);
    }
  }, [dataInp]);

  const handleSubmit = (bId) => {
    if (!bId) return;
    localStorage.setItem("selectedBusId", bId);
    setIsBookEnabled(false);
    setArrowDown(true);
    history.push("/getTicket");
  };

  const handleReset = () => {
    setReset(true);
    setIsBookEnabled(true);
    setArrowDown(false);
    localStorage.removeItem("selectedBusId");
  };

  const renderFunction = () => {
    if (!busData || busData.length === 0) {
      return <p className="no-bus">No buses available for this route.</p>;
    }

    return busData.map((bus, idx) => (
      <div key={idx} className="bus-card">
        <div className="bus-row">
          <div className="bus-header">Brand</div>
          <div className="bus-header">From</div>
          <div className="bus-header">To</div>
          <div className="bus-header">Price</div>

          <div className="bus-data">{bus.companyName}</div>
          <div className="bus-data">{bus.startCity}</div>
          <div className="bus-data">{bus.destination}</div>
          <div className="bus-data">₹{bus.pricePerSeat}</div>

          <div className="bus-buttons">
            <button
              className={`book-btn ${!isBookEnabled ? 'disabled' : ''}`}
              onClick={() => handleSubmit(bus._id)}
            >
              Book Now
            </button>
            <span
              className={`reset-btn ${reset ? '' : 'disabled'}`}
              onClick={handleReset}
            >
              Reset
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bus-wrapper">
      {renderFunction()}
      <div className={arrowDown ? "activeArrow" : "nonActive"}>
        <FaAngleDoubleDown />
      </div>
    </div>
  );
}
