"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { Plus, Package, Edit, Trash2 } from "lucide-react";

// প্রোডাক্টের টাইপ ডেফিনিশন
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string; // ব্যাকএন্ডে অপশনাল থাকলে এখানেও অপশনাল
  imageUrl: string;
}

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // প্রোডাক্ট ফেচ করার ফাংশন
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      // ব্যাকএন্ড থেকে প্রোডাক্ট লিস্ট আনা
      const res = await api.get("/seller/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  // পেজ লোড হলে ডাটা আনবে
  useEffect(() => {
    fetchProducts();
  }, []);

  // ডিলেট ফাংশন
  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/seller/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // সফল হলে লিস্ট থেকে লাইভ সরিয়ে দাও
      setProducts(products.filter(p => p.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      {/* ১. হেডার এবং 'Add New' বাটন */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Products</h1>
          <p className="text-slate-500">Manage your inventory ({products.length})</p>
        </div>
        
        <Link 
          href="/dashboard/products/add" 
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Link>
      </div>

      {/* ২. লোডিং স্টেট */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading products...</div>
      ) : products.length === 0 ? (
        
        // ৩. এম্পটি স্টেট (যদি কোনো প্রোডাক্ট না থাকে)
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Products Found</h3>
          <p className="text-slate-500 mb-6">Start selling by adding your first product.</p>
          <Link href="/dashboard/products/add" className="text-blue-600 font-bold hover:underline">
            Add Product Now
          </Link>
        </div>

      ) : (
        // ৪. প্রোডাক্ট টেবিল (ডাটা থাকলে)
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold text-sm">
              <tr>
                <th className="p-4 border-b">Product</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b">Stock</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {/* ইমেজ ডিসপ্লে (ব্যাকএন্ড URL হতে হবে) */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border shrink-0">
                         <img 
                           src={`http://localhost:3001/uploads/products/${product.imageUrl}`} 
                           alt={product.name}
                           className="w-full h-full object-cover"
                           onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/100?text=IMG")}
                         />
                      </div>
                      <span className="font-medium text-slate-900 truncate max-w-[200px] block" title={product.name}>
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">{product.category || 'N/A'}</td>
                  <td className="p-4 font-bold text-slate-900">${product.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      
                      {/* ✅ এডিট বাটন (এখন এটি ডাইনামিক পেজে লিংক করা আছে) */}
                      <Link 
                        href={`/dashboard/products/edit/${product.id}`} 
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      {/* ডিলেট বাটন */}
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}