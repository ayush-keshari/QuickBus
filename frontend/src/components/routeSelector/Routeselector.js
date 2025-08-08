import React, { useState } from "react";
import { getRoutesFromApi } from "./api";

export default function RouteSelector() {
  const [startCity, setStartCity] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBuses = async () => {
    if (!startCity || !destination) {
      alert("Please select both Start City and Destination");
      return;
    }

    setLoading(true);
    try {
      console.log("Selected Cities:", startCity, destination);
      const response = await getRoutesFromApi(startCity, destination);
      console.log("API Response:", response.data);
      setRoutes(response.data || []);
    } catch (err) {
      console.error("Error fetching buses:", err);
      setRoutes([]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Your Route</h2>

      {/* Start City */}
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

      {/* Destination */}
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
          onClick={fetchBuses}
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

      {/* Loading */}
      {loading && <p>Loading buses...</p>}

      {/* Results */}
      <h3 style={{ marginTop: "20px" }}>Available Bus Routes</h3>
      {routes.length > 0 ? (
        routes.map((bus) => (
          <div
            key={bus._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{bus.companyName}</strong> ({bus.busType})<br />
            Bus No: {bus.busNumber} <br />
            Route: {bus.startCity} → {bus.destination} <br />
            Seats Available: {bus.availableSeats}/{bus.totalSeats} <br />
            Price: ₹{bus.pricePerSeat}
          </div>
        ))
      ) : (
        !loading &&
        startCity &&
        destination && (
          <p>
            No buses found for {startCity} → {destination}
          </p>
        )
      )}
    </div>
  );
}
