"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Store } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/seller/auth/login", form);
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
    } catch (error: any) {
      alert("Login Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-gray-50 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-600/30">
            <Store size={28} />
        </div>
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to Seller Hub
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 bg-white p-8 shadow-xl rounded-2xl border border-gray-100" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input 
                type="email" 
                required 
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="mt-2">
              <input 
                type="password" 
                required 
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all"
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a seller yet?{' '}
          <Link href="/register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 hover:underline">
            Register your shop
          </Link>
        </p>
      </div>
    </div>
  );
}