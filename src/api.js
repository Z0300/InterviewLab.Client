import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    //Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProblems = async () => await api.get("/problems");
export const getProblem = async (id) => await api.get(`/problems/${id}`);
export const deleteProblem = async (id) => await api.delete(`/problems/${id}`);
export const updateProblem = async (id, payload) =>
  await api.put(`/problems/${id}`, payload);
export const createProblem = (payload) => api.post("/problems", payload);
