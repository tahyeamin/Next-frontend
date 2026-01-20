"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Upload, Loader2, ImagePlus, X, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // ফর্ম ডাটা স্টেট
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // ইমেজ স্টেট
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // ইনপুট হ্যান্ডলার (টেক্সট)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ইমেজ হ্যান্ডলার (কনসোল লগসহ)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File Selected:", file.name); // ডিবাগিং
      setImage(file);
      setPreview(URL.createObjectURL(file)); // প্রিভিউ তৈরি
    }
  };

  // ইমেজ রিমুভ ফাংশন
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  // ✅ সাবমিট ফাংশন (অথেন্টিকেশন ফিক্সড)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ১. টোকেন চেক (লগইন না থাকলে আটকাবে)
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired! Please login again.");
        router.push("/login");
        return;
      }

      // ২. ফর্ম ডাটা তৈরি
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      
      // ৩. ইমেজ অ্যাপেন্ড (চেক করুন ব্যাকএন্ডে নাম 'image' নাকি 'file')
      if (image) {
        formData.append("image", image); 
      } else {
        alert("Please select a product image!");
        setLoading(false);
        return;
      }

      console.log("🚀 Sending Data to Backend...");

      // ৪. রিকোয়েস্ট পাঠানো (ম্যানুয়ালি টোকেন হেডার অ্যাড করা হয়েছে)
      const res = await api.post("/seller/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // 🔥 এই লাইনটি 401 Unauthorized এরর ফিক্স করবে
        },
      });

      console.log("✅ Success Response:", res.data);
      alert("Product Uploaded Successfully!");
      router.push("/dashboard/products"); // সফল হলে লিস্ট পেজে ফেরত যাবে

    } catch (error: any) {
      console.error("❌ Upload Error Details:", error);
      
      // এরর মেসেজ হ্যান্ডলিং
      const serverMessage = error.response?.data?.message || error.message;
      
      if (error.response?.status === 401) {
        alert("Unauthorized! Please login again.");
        router.push("/login");
      } else if (error.response?.status === 400) {
        alert(`Validation Error: ${JSON.stringify(serverMessage)}`);
      } else {
        alert(`Failed to upload: ${JSON.stringify(serverMessage)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      
      {/* হেডার এবং ব্যাক বাটন */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/products" className="p-2 bg-white border rounded-lg hover:bg-gray-50 transition">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
          <p className="text-slate-500 text-sm">Fill in the information to upload a product.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* ✅ ১. ইমেজ আপলোড সেকশন (ক্লিক ফিক্সড - Z-Index 50) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
            
            {!preview ? (
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 h-64 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition group cursor-pointer">
                
                {/* 👇 ইনপুটটি পুরো বক্সের উপরে ট্রান্সপারেন্ট অবস্থায় থাকবে */}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
                  required
                />
                
                <div className="flex flex-col items-center gap-3 text-slate-500 group-hover:text-blue-600 transition z-10">
                  <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition">
                    <ImagePlus className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold">Click to upload image</p>
                    <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                  </div>
                </div>
              </div>
            ) : (
              // প্রিভিউ সেকশন
              <div className="relative w-full md:w-1/2 h-64 border rounded-xl overflow-hidden group shadow-md mx-auto md:mx-0">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover" 
                />
                <button 
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition z-50"
                  title="Remove Image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* ২. ইনফরমেশন সেকশন */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Product Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                placeholder="e.g. Wireless Headphone" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <select 
                name="category" 
                required 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select a Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home & Living</option>
                <option value="Beauty">Beauty & Health</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price ($)</label>
              <input 
                type="number" 
                name="price" 
                required 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                placeholder="0.00" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Stock Quantity</label>
              <input 
                type="number" 
                name="stock" 
                required 
                onChange={handleChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                placeholder="e.g. 50" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea 
              name="description" 
              rows={5} 
              required 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none" 
              placeholder="Product details..."
            ></textarea>
          </div>

          {/* ৩. সাবমিট বাটন */}
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Publishing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" /> Publish Product
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}