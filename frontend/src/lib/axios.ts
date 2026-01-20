import axios from "axios";

// আপনার ব্যাকএন্ড পোর্ট (Backend URL)
const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ইন্টারসেপ্টর: প্রতিবার রিকোয়েস্ট পাঠানোর আগে টোকেন চেক করবে
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