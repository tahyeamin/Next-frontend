"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Store } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"), // Backend DTO তে fullName আছে
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Invalid phone number"), 
  password: z.string().min(6, "Password must be at least 6 characters"),
});


type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });


  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      console.log("Submitting Data:", data);

      
      const response = await fetch("http://localhost:3000/seller/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
      
      alert("Registration Successful! Please Login.");
      router.push("/login");

    } catch (error: any) {
      console.error("Error:", error);
      
      const msg = error.message || "Something went wrong";
      alert(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
             <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Seller Registration</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <input 
              {...register("fullName")}
              type="text" 
              placeholder="Full Name" 
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.fullName ? "border-red-500" : "border-gray-300 focus:border-black"}`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input 
              {...register("email")}
              type="text" 
              placeholder="Email Address" 
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.email ? "border-red-500" : "border-gray-300 focus:border-black"}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <input 
              {...register("phone")}
              type="text" 
              placeholder="Phone (e.g. 017xxxxxxxx)" 
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.phone ? "border-red-500" : "border-gray-300 focus:border-black"}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>}
          </div>

          {/* Password */}
          <div>
            <input 
              {...register("password")}
              type="password" 
              placeholder="Password (Min 6 chars)" 
              className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.password ? "border-red-500" : "border-gray-300 focus:border-black"}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-black text-white font-bold rounded-lg hover:opacity-80 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-black font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}