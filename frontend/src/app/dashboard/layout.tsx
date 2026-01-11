"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer"; // 👈 ফুটার ইম্পোর্ট করুন
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
    else setLoading(false);
  }, [router]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Navbar /> {/* 👈 নতুন হেডার এখানে বসবে */}
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto min-h-[calc(100vh-200px)]"> 
            {children}
          </div>
        </main>

        <Footer /> {/* 👈 নতুন ফুটার এখানে বসবে */}
      </div>
    </div>
  );
}