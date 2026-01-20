"use client";
import { Bell, Search, User } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* বাম পাশে সার্চ বার */}
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search products, orders..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* ডান পাশে প্রোফাইল ও নোটিফিকেশন */}
      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-blue-600 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">Seller Account</p>
            <p className="text-xs text-gray-500">Verified</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}