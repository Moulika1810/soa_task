
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8082",
});

export const getAllPools = () => api.get("/DisplayAll");

export const addPool = (pool) => api.post("/Add", pool);

export const updatePool = (id, pool) =>
    api.put(`/Update/${id}`, pool);

export const deletePool = (id) =>
    api.delete(`/Delete/${id}`);

export default api;
