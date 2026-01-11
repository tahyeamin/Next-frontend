// src/app/dashboard/products/add/page.tsx
"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();
  // DTO: CreateProductDto
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "" // Optional
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price), // ব্যাকএন্ডে number টাইপ লাগবে
        stock: Number(form.stock),
      };

      // Backend: POST /seller/products
      await api.post("/seller/products", payload);
      alert("Product added successfully!");
      router.push("/dashboard/products");
    } catch (error: any) {
      alert("Failed! Note: Your shop MUST be APPROVED to add products.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input className="w-full border p-2 rounded" onChange={(e) => setForm({...form, name: e.target.value})} required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium">Price</label>
                <input className="w-full border p-2 rounded" type="number" onChange={(e) => setForm({...form, price: e.target.value})} required />
            </div>
            <div>
                <label className="block text-sm font-medium">Stock</label>
                <input className="w-full border p-2 rounded" type="number" onChange={(e) => setForm({...form, stock: e.target.value})} required />
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full border p-2 rounded" rows={3} onChange={(e) => setForm({...form, description: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL (Optional)</label>
          <input className="w-full border p-2 rounded" onChange={(e) => setForm({...form, imageUrl: e.target.value})} />
        </div>

        <button className="bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700">Submit Product</button>
      </form>
    </div>
  );
}