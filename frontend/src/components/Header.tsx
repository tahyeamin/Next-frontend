"use client";
import { usePathname } from "next/navigation";
import PublicNavbar from "./PublicNavbar";
import DashboardNavbar from "./DashboardNavbar";

export default function Header() {
  const pathname = usePathname();

  // ১. যদি ইউজার '/dashboard' এর ভেতরে থাকে, তবে সে সেলার
  const isDashboard = pathname.startsWith("/dashboard");
  
  // ২. যদি সেলার হয় -> DashboardNavbar, না হলে -> PublicNavbar
  return isDashboard ? <DashboardNavbar /> : <PublicNavbar />;
}