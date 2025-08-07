import React, { useState } from 'react';
import { getRoutesFromApi } from '../API/api'; // ✅ Ensure correct path

function Routeselector() {
    const [busData, setBusData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [startCity, setStartCity] = useState('');
    const [destination, setDestination] = useState('');

    const fetchBuses = async () => {
        if (!startCity || !destination) {
            alert("Please select both FROM and TO cities.");
            return;
        }

        console.log("Selected Cities: ", startCity, destination); // ✅ Debug log

        setLoading(true);
        setError(null);

        try {
            const result = await getRoutesFromApi(startCity, destination);
            console.log("API Response: ", result?.data); // ✅ Debug log

            if (result?.data?.bus && Array.isArray(result.data.bus)) {
                setBusData(result.data.bus);
            } else {
                setBusData([]);
            }
        } catch (err) {
            console.error('Error fetching buses:', err);
            setError('Failed to load buses');
        } finally {
            setLoading(false);
        }
    };

    const renderBusList = () => {
        if (!busData || busData.length === 0) {
            return <p>No buses available</p>;
        }

        return busData.map((bus, index) => (
            <div key={index} className="bus-card">
                <h3>{bus.companyName}</h3>
                <p>From: {bus.startCity}</p>
                <p>To: {bus.destination}</p>
                <p>Type: {bus.busType}</p>
                <p>Seats Available: {bus.availableSeats}</p>
                <p>Price: ₹{bus.pricePerSeat}</p>
            </div>
        ));
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); fetchBuses(); }}>
                <select onChange={(e) => setStartCity(e.target.value)} value={startCity} required>
                    <option value="">From</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                </select>

                <select onChange={(e) => setDestination(e.target.value)} value={destination} required>
                    <option value="">To</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Coimbatore">Coimbatore</option>
                </select>

                <button type="submit">Search Bus</button>
            </form>

            {loading && <p>Loading buses...</p>}
            {error && <p>{error}</p>}
            {!loading && renderBusList()}
        </div>
    );
}

export default Routeselector;
