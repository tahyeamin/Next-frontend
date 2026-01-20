import Link from "next/link";
import { DollarSign, Package, ShoppingCart, Users, Plus } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard"; 

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      
      {/* 👇 ১. হেডার সেকশন আপডেট (এখানে বাটন যোগ করা হয়েছে) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </div>
        
        {/* Add Product Button */}
        <Link 
          href="/dashboard/products/add" 
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Sales" value="$12,500" icon={DollarSign} color="blue" trend="+12%" />
        <StatsCard title="Active Orders" value="45" icon={ShoppingCart} color="purple" trend="+5%" />
        <StatsCard title="Total Products" value="120" icon={Package} color="green" />
        <StatsCard title="Customers" value="3.2k" icon={Users} color="orange" trend="+2%" />
      </div>
      
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm min-h-[300px] flex items-center justify-center text-slate-400">
        Chart or Recent Orders Table will go here...
      </div>
    </div>
  );
}