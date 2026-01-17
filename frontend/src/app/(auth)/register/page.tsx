"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",    // ব্যাকএন্ড অনুযায়ী 'phone' ব্যবহার করা হয়েছে
    password: "",
  });
  
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // আপনার ব্যাকএন্ড পোর্ট (৩০০০) এবং পাথ ঠিক আছে কি না নিশ্চিত হয়ে নিন
      const response = await axios.post("http://localhost:3000/seller/auth/register", formData);
      
      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful!");
        router.push("/seller/login");
      }
    } catch (err: any) {
      // ব্যাকএন্ডের ভ্যালিডেশন এররগুলো এখানে দেখাবে
      const message = err.response?.data?.message || "Registration failed";
      setError(Array.isArray(message) ? message.join(", ") : message);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "50px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Seller Account</h2>
      
      {error && (
        <div style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "14px" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Full Name Field */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Email Field */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Phone Field - ব্যাকএন্ডের সাথে মিল রেখে */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Phone Number</label>
          <input
            type="tel"
            name="phone"  // এখানে 'phone' ই থাকতে হবে
            placeholder="017XXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        {/* Password Field */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        
        <button type="submit" style={{ padding: "12px", backgroundColor: "#000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}>
          Sign Up as Seller
        </button>
      </form>
    </div>
  );
}