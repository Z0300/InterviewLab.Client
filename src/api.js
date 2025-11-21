import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    //Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;
