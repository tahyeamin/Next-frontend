"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";
import { Store } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/seller/auth/register", form);
      alert("Registration Successful! Please Login.");
      router.push("/login");
    } catch (error: any) {
      alert("Registration Failed: " + (error.response?.data?.message || "Unknown Error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <Store className="w-10 h-10 text-blue-600 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Join SellerHub</h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg" onChange={(e) => setForm({...form, name: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full p-3 border rounded-lg" onChange={(e) => setForm({...form, email: e.target.value})} />
          <input type="text" placeholder="Phone" required className="w-full p-3 border rounded-lg" onChange={(e) => setForm({...form, phone: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full p-3 border rounded-lg" onChange={(e) => setForm({...form, password: e.target.value})} />
          
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
            Create Account
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}