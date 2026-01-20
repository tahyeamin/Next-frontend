"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; // useParams দরকার ID পাওয়ার জন্য
import api from "@/lib/axios";
import { Upload, Loader2, ImagePlus, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams(); // URL থেকে ID নেওয়া
  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    // category removed as per previous request
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ১. আগের ডাটা লোড করা
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        // আমরা ব্যাকএন্ডে এই রাউটটি মাত্র বানালাম
        const res = await api.get(`/seller/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = res.data;
        if(data) {
            setForm({
                name: data.name,
                description: data.description || "",
                price: data.price,
                stock: data.stock,
            });
            // আগের ইমেজ প্রিভিউতে দেখানো (যদি থাকে)
            if(data.imageUrl) {
                setPreview(`http://localhost:3001/uploads/products/${data.imageUrl}`);
            }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product details.");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ২. আপডেট সাবমিট ফাংশন
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);

      // যদি নতুন ইমেজ সিলেক্ট করে, তবেই পাঠাব
      if (image) {
        formData.append("image", image);
      }

      // PATCH রিকোয়েস্ট
      await api.patch(`/seller/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });

      alert("Product Updated Successfully!");
      router.push("/dashboard/products");

    } catch (error: any) {
      console.error("Update Error:", error);
      alert("Failed to update: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center">Loading product data...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/products" className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
          <p className="text-slate-500 text-sm">Update product information.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleUpdate} className="space-y-8">
          
          {/* ইমেজ আপলোড সেকশন */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
            <div className="flex items-center gap-6">
                <div className="relative w-40 h-40 border rounded-xl overflow-hidden group shadow-sm bg-gray-50">
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    
                    {/* ইমেজের ওপর ইনপুট (যাতে ক্লিক করে বদলানো যায়) */}
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                    />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        <span className="text-white text-xs font-bold">Change Image</span>
                    </div>
                </div>
                <div className="text-sm text-gray-500">
                    <p>Click the image to upload a new one.</p>
                    <p className="text-xs mt-1">Leave as is to keep current image.</p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Product Name</label>
              <input type="text" name="name" value={form.name} required onChange={handleChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price ($)</label>
              <input type="number" name="price" value={form.price} required onChange={handleChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Stock Quantity</label>
              <input type="number" name="stock" value={form.stock} required onChange={handleChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea name="description" value={form.description} rows={5} required onChange={handleChange} className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg disabled:opacity-70">
              {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Updating...</> : <><Upload className="w-5 h-5" /> Update Product</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}