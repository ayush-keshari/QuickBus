import axios from 'axios';

export async function getRoutesFromApi(startCity, destination) {
    const baseURL = "http://localhost:8080/booking";
    return await axios.post(baseURL, { startCity, destination });
}
