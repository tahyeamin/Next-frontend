// src/app/dashboard/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Backend: GET /seller/products
    api.get("/seller/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    try {
      // Backend: DELETE /seller/products/:id
      await api.delete(`/seller/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete. Is your shop approved?");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link href="/dashboard/products/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add New
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded shadow p-4">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600 truncate">{product.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-blue-600 font-bold">৳{product.price}</span>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded">Stock: {product.stock}</span>
            </div>
            <button 
              onClick={() => handleDelete(product.id)}
              className="mt-4 w-full bg-red-100 text-red-600 py-1 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        ))}
        {products.length === 0 && <p className="text-gray-500">No products found.</p>}
      </div>
    </div>
  );
}