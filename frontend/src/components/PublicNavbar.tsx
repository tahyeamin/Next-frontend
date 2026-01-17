"use client";
import Link from "next/link";
import { Store, LayoutDashboard, LogIn, UserPlus } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="w-full bg-black border-b border-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* লোগো সেকশন */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white">
          <Store className="text-blue-500 w-8 h-8" />
          <span>SellerHub</span>
        </Link>

        {/* লিংকস সেকশন */}
        <div className="flex items-center gap-8">
          
          {/* Admin Panel লিঙ্ক - আপনার অ্যাডমিন কন্ট্রোলারের সাথে কানেক্টেড */}
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400 transition-all underline underline-offset-4"
          >
            <LayoutDashboard size={18} />
            ADMIN PANEL
          </Link>

          {/* Login লিঙ্ক */}
          <Link href="/login" className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition">
            <LogIn size={16} />
            Login
          </Link>
          
          {/* Start Selling বাটন */}
          <Link 
            href="/register" 
            className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-black bg-white rounded-md hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105"
          >
            <UserPlus size={16} />
            START SELLING
          </Link>
        </div>
      </div>
    </nav>
  );
}