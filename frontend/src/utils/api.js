// utils/api.js
import axios from "axios";

const envBase = process.env.REACT_APP_API_BASE_URL;
const normalizedBase = (() => {
  if (!envBase || envBase.trim() === "") return "https://herventure.onrender.com/api";
  const trimmed = envBase.replace(/\/$/, "");
  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
})();

const API = axios.create({
  baseURL: normalizedBase,
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
