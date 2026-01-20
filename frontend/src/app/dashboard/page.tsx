import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard"; // 👈 ইম্পোর্ট

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Here is what's happening with your store today.</p>
      </div>
      
      {/* আলাদা করা StatsCard ব্যবহার করা হচ্ছে */}
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