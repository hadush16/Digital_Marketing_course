import axios from "axios";

const API = axios.create({
  baseURL: "https://sheqlee-platform.onrender.com/api/v1/jobs", // placeholder
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
