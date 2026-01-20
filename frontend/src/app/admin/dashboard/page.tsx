"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js"; // Pusher লাইব্রেরি ইমপোর্ট

export default function AdminDashboard() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. পেন্ডিং সেলারদের ডাটাবেস থেকে নিয়ে আসা
  const fetchSellers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/pending");
      setSellers(res.data);
    } catch (err) {
      console.error("Data fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();

    // --- Pusher Integration (Real-time Updates) ---
    // আপনার দেওয়া Pusher Key এবং Cluster এখানে বসানো হয়েছে
    const pusher = new Pusher('2b6a6791df8a8256cbe9', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('admin-channel');
    
    // নতুন সেলার রেজিস্ট্রেশন ইভেন্ট লিসেন করা
    channel.bind('new-seller', function(data: any) {
      alert(data.message); // ব্রাউজারে রিয়েল-টাইম এলার্ট দেখাবে
      fetchSellers();      // রিফ্রেশ ছাড়াই টেবিল ডাটা আপডেট করবে
    });

    return () => {
      pusher.unsubscribe('admin-channel');
    };
  }, []);

  // ২. সেলার অ্যাপ্রুভ করার ফাংশন
  const handleApprove = async (id: string) => {
    if (confirm("Are you sure you want to approve this seller?")) {
      try {
        await axios.patch(`http://localhost:3000/admin/approve/${id}`);
        alert("Seller approved successfully!");
        fetchSellers(); 
      } catch (err) {
        alert("Approval failed");
      }
    }
  };

  // ৩. সেলার রিজেক্ট করার ফাংশন
  const handleReject = async (id: string) => {
    const reason = prompt("Enter reason for rejection:");
    if (reason) {
      try {
        await axios.patch(`http://localhost:3000/admin/reject/${id}`, { reason });
        alert("Seller rejected");
        fetchSellers();
      } catch (err) {
        alert("Rejection failed");
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <p className="text-xl font-semibold text-blue-600 animate-pulse">Loading Dashboard...</p>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1 font-medium text-sm italic underline">Review and approve pending seller registrations</p>
          </div>
          
          {/* Real-time Indicator Badge */}
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm border border-green-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Real-time Monitoring Active
          </div>
        </div>
        
        {/* Table/Content Section */}
        {sellers.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl shadow-sm text-center border border-gray-100">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-400 text-lg font-medium">No pending registration requests at the moment.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Seller Name</th>
                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</th>
                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Shop Name</th>
                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</th>
                    <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sellers.map((seller: any) => (
                    <tr key={seller.id} className="hover:bg-blue-50/30 transition-all duration-200">
                      <td className="p-5 font-bold text-gray-800 text-sm">{seller.fullName}</td>
                      <td className="p-5 text-gray-500 text-sm font-medium">{seller.email}</td>
                      <td className="p-5 text-gray-500 text-sm">
                        <span className="bg-gray-100 px-3 py-1 rounded-md text-gray-700 font-semibold text-xs border border-gray-200">
                          {seller.shopName || "Personal Seller"}
                        </span>
                      </td>
                      <td className="p-5 text-gray-500 text-sm font-mono">{seller.phone}</td>
                      <td className="p-5 flex gap-3">
                        <button 
                          onClick={() => handleApprove(seller.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-[0_4px_10px_rgba(22,163,74,0.2)]"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(seller.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl text-xs font-black transition-all border border-red-200"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}