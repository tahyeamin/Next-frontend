import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SellerHub | E-commerce Platform",
  description: "Start your selling journey today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        {/* হেডার কম্পোনেন্ট (লজিক ভেতরে আছে) */}
        <Header />
        
        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}