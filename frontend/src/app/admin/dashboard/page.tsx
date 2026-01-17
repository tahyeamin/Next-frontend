"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. পেন্ডিং সেলারদের ডাটাবেস থেকে নিয়ে আসা
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
  }, []);

  // ২. সেলার অ্যাপ্রুভ করার ফাংশন
  const handleApprove = async (id: string) => {
    if (confirm("Are you sure you want to approve this seller?")) {
      try {
        await axios.patch(`http://localhost:3000/admin/approve/${id}`);
        alert("Seller approved successfully!");
        fetchSellers(); // লিস্ট আপডেট করার জন্য আবার কল করা
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

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading Dashboard...</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#333" }}>Admin Dashboard - Pending Sellers</h1>
      
      {sellers.length === 0 ? (
        <p>No pending registration requests.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Email</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Shop Name</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Phone</th>
              <th style={{ padding: "12px", border: "1px solid #ddd" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller: any) => (
              <tr key={seller.id}>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{seller.fullName}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{seller.email}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{seller.shopName || "N/A"}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{seller.phone}</td>
                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                  <button 
                    onClick={() => handleApprove(seller.id)}
                    style={{ backgroundColor: "green", color: "white", padding: "8px", border: "none", cursor: "pointer", marginRight: "5px" }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(seller.id)}
                    style={{ backgroundColor: "red", color: "white", padding: "8px", border: "none", cursor: "pointer" }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}