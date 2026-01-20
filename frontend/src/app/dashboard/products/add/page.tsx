"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", price: "", description: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/seller/products", form);
      alert("Product Added Successfully!");
      router.push("/dashboard/products");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl border border-gray-200">
      <h1 className="text-xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input 
            type="text" required
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setForm({...form, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input 
            type="number" required
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setForm({...form, price: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            required rows={4}
            className="w-full p-2 border rounded-lg"
            onChange={(e) => setForm({...form, description: e.target.value})}
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Upload
        </button>
      </form>
    </div>
  );
}