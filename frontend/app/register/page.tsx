"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য
import axios from "axios"; // ডাটা পাঠানোর জন্য
import { z } from "zod";
import Navbar from "../../components/Navbar";

// Zod Schema (Validation ঐচ্ছিক, কিন্তু রাখা ভালো)
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const router = useRouter(); // রাউটার হুক
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState(""); // ব্যাকএন্ড এরর রাখার জন্য

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setApiError(""); // টাইপ করলে এরর মুছে যাবে
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // ১. ভ্যালিডেশন চেক (Client Side)
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: any = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    // ২. Axios দিয়ে ডাটা ব্যাকএন্ডে পাঠানো
    try {
      // বি:দ্র: এখানে আপনার ব্যাকএন্ডের সঠিক URL বসাবেন
      const response = await axios.post("http://localhost:5000/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      console.log("Response:", response.data);
      alert("Registration Successful! Redirecting to Login...");
      
      // ৩. সফল হলে লগইন পেজে পাঠানো
      router.push("/login");

    } catch (error: any) {
      // ৪. ব্যাকএন্ড থেকে কোনো এরর আসলে সেটা দেখানো
      console.error("Registration Error:", error);
      setApiError("Registration failed! Backend might be offline."); 
    }
  };

  return (
    <div>
      <Navbar title="Registration Page" />
      <div style={{ padding: "50px", textAlign: "center" }}>
        
        {/* Go Home Button */}
        <div style={{ marginBottom: "20px" }}>
          <Link href="/">
            <button style={{ padding: "5px 15px", cursor: "pointer", background: "#ddd", border: "none", borderRadius: "5px" }}>← Go Home</button>
          </Link>
        </div>

        {/* API Error Message */}
        {apiError && <p style={{ color: "red", fontWeight: "bold", marginBottom:"10px" }}>{apiError}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px", margin: "0 auto 20px auto", gap: "10px" }}>
          {/* Inputs... */}
          <div>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={{ padding: "10px", width: "100%" }} />
            {errors.name && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.name}</p>}
          </div>
          <div>
            <input type="text" name="email" placeholder="Email Address" onChange={handleChange} style={{ padding: "10px", width: "100%" }} />
            {errors.email && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.email}</p>}
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} style={{ padding: "10px", width: "100%" }} />
            {errors.password && <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>{errors.password}</p>}
          </div>
          
          <button type="submit" style={{ padding: "10px", cursor: "pointer", backgroundColor: "blue", color: "white", border: "none" }}>Register</button>
        </form>

        <p>Already have an account? <Link href="/login" style={{ color: "blue", textDecoration: "underline" }}>Login here</Link></p>
      </div>
    </div>
  );
}