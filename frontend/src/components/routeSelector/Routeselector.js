import React, { useState } from "react";
import axios from "axios";

export default function RouteSelector() {
  const [startCity, setStartCity] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchRoutes = async () => {
    if (!startCity || !destination) {
      alert("Please select both Start City and Destination");
      return;
    }

    try {
      setLoading(true);
      setSearched(true);
      console.log("Selected Cities:", startCity, destination);

      // Use POST request to match backend route
      const res = await axios.post(
        "https://quick-bus.vercel.app/api/routes",
        { startCity, destination }
      );

      console.log("API Response:", res.data);
      setRoutes(res.data || []);
    } catch (error) {
      console.error("Error fetching buses:", error);
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Your Route</h2>

      {/* Start City Selector */}
      <label style={{ marginRight: "10px" }}>Start City:</label>
      <select
        value={startCity}
        onChange={(e) => setStartCity(e.target.value)}
        style={{ marginRight: "20px" }}
      >
        <option value="">--Select--</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      {/* Destination Selector */}
      <label style={{ marginRight: "10px" }}>Destination:</label>
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <option value="">--Select--</option>
        <option value="Delhi">Delhi</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      {/* Search Button */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={fetchRoutes}
          style={{
            padding: "8px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading && <p style={{ marginTop: "20px" }}>Loading routes...</p>}

      {/* Routes Display */}
      {!loading && routes.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
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

      {/* No Results Message */}
      {!loading && searched && routes.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No buses found for {startCity} → {destination}
        </p>
      )}
    </div>
  );
}
