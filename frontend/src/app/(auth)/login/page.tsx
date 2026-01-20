"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation"; 
import api from "@/lib/axios";
import Link from "next/link";
import { Store, Loader2, LogIn } from "lucide-react";

export default function Login() {
  // const router = useRouter(); 
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending login request...", form);

      
      const res = await api.post("/seller/auth/login", form);
      
      
      console.log("🔥 Backend Response:", res.data); 

      
      const token = res.data.token || res.data.accessToken || res.data.access_token;

      if (token) {
       
        localStorage.setItem("token", token);
        
        alert("Login Successful! Redirecting to Dashboard...");
        
        
        window.location.href = "/dashboard";
      } else {
       
        console.error("Token missing in response:", res.data);
        alert("Login Failed! No token received. Server sent: " + JSON.stringify(res.data));
        setLoading(false);
      }

    } catch (error: any) {
      console.error("❌ Login Error Full Object:", error);
      
     
      const errorMsg = error.response?.data?.message 
        || error.message 
        || "Login Request Failed";
      
      alert(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* লোগো এবং হেডার */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Seller Login</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back to SellerHub</p>
        </div>

        {/* ফর্ম */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="admin@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" /> Sign In
              </>
            )}
          </button>
        </form>

        {/* ফুটার লিংক */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}