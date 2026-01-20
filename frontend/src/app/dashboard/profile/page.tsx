"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get("/seller/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) return <div>Loading Profile...</div>;

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-10 h-10" />
        </div>
        <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-500">Verified Seller</p>
        </div>
      </div>
      <div className="space-y-4">
        <p className="flex items-center gap-2"><Mail className="w-4 h-4"/> {profile.email}</p>
        <p className="flex items-center gap-2"><Phone className="w-4 h-4"/> {profile.phone || "N/A"}</p>
      </div>
    </div>
  );
}