"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Store, LayoutDashboard, LogIn, UserPlus } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // ১. লজিক: শুধু /dashboard এ থাকলে ড্যাশবোর্ড হেডার, বাকি সব জায়গায় (হোম, অ্যাডমিন) ব্ল্যাক হেডার
  const isSellerDashboard = pathname.startsWith("/dashboard");

  if (isSellerDashboard) {
    return (
      <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold' }}>Seller Dashboard</span>
        <Link href="/" style={{ color: '#94a3b8', fontSize: '14px', textDecoration: 'none' }}>Back to Home</Link>
      </header>
    );
  }

  // ২. আপনার মেইন ব্ল্যাক হেডার (হোম পেজ এবং অ্যাডমিন প্যানেলের জন্য)
  return (
    <header style={{ 
      backgroundColor: '#000000', 
      borderBottom: '1px solid #333', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50, 
      width: '100%',
      height: '80px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%', 
        padding: '0 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        
        {/* লোগো */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
          <Store color="#3b82f6" size={32} />
          <span>Seller<span style={{ color: '#3b82f6' }}>Hub</span></span>
        </Link>

        {/* লিঙ্কস */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          
          {/* Admin Panel - এটি আপনার অ্যাডমিন ড্যাশবোর্ডে নিয়ে যাবে */}
          <Link 
            href="/admin/dashboard" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: '#ef4444', 
              fontWeight: 'bold', 
              fontSize: '14px', 
              textDecoration: 'none',
              padding: '8px 15px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            <LayoutDashboard size={18} />
            ADMIN PANEL
          </Link>

          <Link href="/login" style={{ color: '#d1d5db', fontSize: '14px', textDecoration: 'none' }}>
            Login
          </Link>
          
          <Link 
            href="/register" 
            style={{ 
              padding: '10px 25px', 
              backgroundColor: '#ffffff', 
              color: '#000000', 
              borderRadius: '50px', 
              fontWeight: 'bold', 
              fontSize: '14px', 
              textDecoration: 'none' 
            }}
          >
            START SELLING
          </Link>
        </nav>
      </div>
    </header>
  );
} 