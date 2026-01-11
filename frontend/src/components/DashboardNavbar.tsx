"use client";
import { Bell, Search, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    // টোকেন ডিলিট করে লগইন পেজে পাঠিয়ে দেওয়া
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 px-6 h-16 flex items-center justify-between shadow-sm">
      {/* বাম পাশ: সার্চ বার (Search) */}
      <div className="relative w-72 hidden md:block">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input 
          placeholder="Search products, orders..." 
          className="pl-9 h-9 w-full rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
        />
      </div>

      {/* ডান পাশ: অ্যাকশন বাটন */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>

        <div className="flex items-center gap-3">
            <div className="flex flex-col text-right hidden sm:block">
                <span className="text-xs font-bold text-gray-700">My Shop</span>
                <span className="text-[10px] text-green-600 bg-green-50 px-1 rounded">Verified</span>
            </div>
            <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
            >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
      </div>
    </nav>
  );
}