import axios from "axios";

// ✅ Axios will use proxy (http://localhost:5000) as baseURL
const API = axios.create({
  baseURL: "/api",
});

export const getAllDrivers = () => API.get("/drivers");
export const getAllCustomers = () => API.get("/customers");
export const getAllRides = () => API.get("/rides");

const api = {
  post: (url, data) => API.post(url, data),     // removed extra `/api`
  get: (url) => API.get(url),
  put: (url, data) => API.put(url, data),
  delete: (url) => API.delete(url),
};

export default api;
