import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RouteSelector() {
  const [startCity, setStartCity] = useState("Delhi");
  const [destination, setDestination] = useState("Hyderabad");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (startCity && destination) {
      fetchRoutes();
    }
  }, [startCity, destination]);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      console.log("Selected Cities: ", startCity, destination);

      const res = await axios.get(
        `https://quick-bus.vercel.app/api/routes?startCity=${startCity}&destination=${destination}`
      );

      console.log("API Response: ", res.data);
      setRoutes(res.data);
    } catch (error) {
      console.error("Error fetching buses: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Bus Routes</h2>

      {loading && <p>Loading routes...</p>}

      {!loading && routes.length === 0 && (
        <p>No buses found for {startCity} → {destination}</p>
      )}

      {!loading && routes.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {routes.map((bus) => (
            <li
              key={bus._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h3>{bus.companyName}</h3>
              <p>🚌 {bus.busType}</p>
              <p>Bus Number: {bus.busNumber}</p>
              <p>
                Route: {bus.startCity} → {bus.destination}
              </p>
              <p>
                Seats Available: {bus.availableSeats}/{bus.totalSeats}
              </p>
              <p>💰 Price per seat: ₹{bus.pricePerSeat}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
