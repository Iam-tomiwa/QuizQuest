import axios from "axios";

export const API_BASE_URL = `https://opentdb.com/`;

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: API_BASE_URL,
});

export default axiosInstance;
