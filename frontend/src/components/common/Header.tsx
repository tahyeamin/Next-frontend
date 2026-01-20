"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header 
      className="sticky top-0 z-50 w-full shadow-md"
      // 🔥 ব্যাকগ্রাউন্ড কালো, টেক্সট সাদা
      style={{ backgroundColor: '#000000', color: '#ffffff', borderBottom: '1px solid #333' }}
    >
      {/* 🔥 container Width: 1000px দেওয়া হয়েছে যাতে একদম দুই কোণায় না যায়।
         🔥 margin: '0 auto' দিয়ে পুরোটা মাঝখানে রাখা হয়েছে।
         🔥 display: 'flex' এবং justify-content: 'space-between' দিয়ে দুই মাথায় সরানো হয়েছে।
      */}
      <div 
        style={{ 
          maxWidth: '1000px', 
          margin: '0 auto', 
          height: '80px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 20px'
        }}
      >
          
        {/* ১. বাম পাশে: লোগো */}
        <Link href="/" className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div className="p-2 bg-white rounded-lg text-black">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-wide" style={{ color: '#ffffff' }}>
            Shop<span className="text-blue-500">Verse</span>
          </span>
        </Link>

        {/* ২. ডান পাশে: মেনু */}
        {/* 🔥 gap: '40px' - এটা আইটেমগুলোর মধ্যে গ্যাপ তৈরি করবেই */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '40px', fontSize: '15px', fontWeight: '500' }}>
          
          

      <Link href="/admin/dashboard" style={{ color: '#ffffff', textDecoration: 'none' }}>
            Admin
          </Link>
          
          <Link href="/about" style={{ color: '#ffffff', textDecoration: 'none' }}>
            About
          </Link>

          <Link href="/login" style={{ color: '#ffffff', textDecoration: 'none' }}>
            Login
          </Link>

          <Link 
            href="/register" 
            style={{ 
              backgroundColor: '#ffffff', 
              color: '#000000', 
              padding: '10px 20px', 
              borderRadius: '9999px', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Become a Seller
          </Link>

        </nav>

      </div>
    </header>
  );
}