import axios from 'axios';

export async function getRoutesFromApi(startCity, destination) {
    const baseURL = "https://quick-bus.vercel.app/booking/search"; // ✅ correct endpoint
    let response = await axios.post(baseURL, { startCity, destination });
    return response;
}
