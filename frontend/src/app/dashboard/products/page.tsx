"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function MyProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/seller/products")
       .then((res) => setProducts(res.data))
       .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link href="/dashboard/products/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
          <Plus className="w-4 h-4" /> Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-gray-500">No products found.</td></tr>
            ) : (
                products.map((p: any) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">#{p.id}</td>
                    <td className="p-4 font-medium">{p.title}</td>
                    <td className="p-4">${p.price}</td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}