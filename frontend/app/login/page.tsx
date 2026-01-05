"use client"; // এটি অবশ্যই দিতে হবে
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // রিডাইরেক্ট হুক
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // টাইপ করলে এরর মুছে যাবে
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      // ১. Axios দিয়ে লগইন রিকোয়েস্ট পাঠানো
      // বি:দ্র: সঠিক ব্যাকএন্ড URL বসাবেন
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password
      });

      console.log("Login Success:", response.data);
      alert("Login Successful!");
      
      // ২. সফল হলে ড্যাশবোর্ডে পাঠানো
      router.push("/dashboard");

    } catch (err: any) {
      // ৩. এরর হলে মেসেজ দেখানো
      console.error("Login Error:", err);
      setError("Invalid email or password! Or Backend is offline.");
    }
  };

  return (
    <div>
      <Navbar title="Login Page" />
      
      <div style={{ padding: "50px", textAlign: "center" }}>
        
        {/* Go Home Button */}
        <div style={{ marginBottom: "20px" }}>
          <Link href="/">
            <button style={{ padding: "5px 15px", cursor: "pointer", background: "#ddd", border: "none", borderRadius: "5px" }}>← Go Home</button>
          </Link>
        </div>

        {/* Error Message */}
        {error && <p style={{ color: "red", marginBottom: "15px", fontWeight: "bold" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", margin: "20px auto", gap: "10px" }}>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required 
            style={{ padding: "10px" }} 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
            style={{ padding: "10px" }} 
          />
          <button type="submit" style={{ padding: "10px", cursor: "pointer", backgroundColor: "black", color: "white", border: "none" }}>
            Login
          </button>
        </form>

        <Link href="/register" style={{ color: "blue", textDecoration: "underline" }}>
          Create new account
        </Link>
      </div>
    </div>
  );
}