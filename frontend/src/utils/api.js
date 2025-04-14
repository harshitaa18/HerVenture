// utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://herventure.onrender.com/api",
  withCredentials: true,
});

// Add JWT token if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or however you store JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
