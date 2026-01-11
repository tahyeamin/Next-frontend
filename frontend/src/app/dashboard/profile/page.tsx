// src/app/dashboard/products/page.tsx
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard"; // <--- Import Component

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/seller/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/seller/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete. Is your shop approved?");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
          <p className="text-gray-500">Manage your shop inventory</p>
        </div>
        <Link href="/dashboard/products/add" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">You haven't added any products yet.</p>
          <Link href="/dashboard/products/add" className="text-blue-600 font-semibold hover:underline">
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}