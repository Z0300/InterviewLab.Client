import axios from "axios";

const { VITE_API_BASE_URL: BASE_URL } = import.meta.env;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
