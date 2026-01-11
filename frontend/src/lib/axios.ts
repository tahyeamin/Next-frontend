// src/lib/axios.ts
import axios from "axios";

// আপনার ব্যাকএন্ড পোর্ট ৩০০০
const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// রিকোয়েস্ট ইন্টারসেপ্টর: লোকাল স্টোরেজ থেকে টোকেন নিয়ে হেডারে বসাবে
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;