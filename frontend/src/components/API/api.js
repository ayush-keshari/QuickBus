import axios from 'axios';

export async function getRoutesFromApi(startCity, destination) {
  const baseURL = `${process.env.REACT_APP_BACKEND_LINK}api/routes`;
  return await axios.post(baseURL, { startCity, destination });
}
