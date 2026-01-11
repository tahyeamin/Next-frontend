// src/app/(auth)/register/page.tsx
"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  // DTO: SellerRegisterDto
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/seller/auth/register", form);
      alert("Registration Successful! Please Login.");
      router.push("/login");
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Create Seller Account</h2>
        <input className="border p-2 rounded" placeholder="Full Name" onChange={(e) => setForm({...form, fullName: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Email" type="email" onChange={(e) => setForm({...form, email: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Phone (e.g. 017...)" onChange={(e) => setForm({...form, phone: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="Password (Min 8 chars)" type="password" onChange={(e) => setForm({...form, password: e.target.value})} required />
        <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
        <p className="text-center text-sm">Already registered? <Link href="/login" className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
}