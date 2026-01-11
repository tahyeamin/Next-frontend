import Link from "next/link";
import { Store, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Brand & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Store className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-slate-900">SellerHub</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The #1 platform for sellers to manage products, track orders, and grow their business globally.
            </p>
            <div className="flex gap-3">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition">Features</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Seller API</Link></li>
            </ul>
          </div>

          {/* 3. Support (এই সেকশনেই ভুল ছিল) */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600 transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Community</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Webinars</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                <span>123 Business Avenue, Tech City, Dhaka-1212</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <span>support@sellerhub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© 2024 SellerHub Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-blue-600 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 transition">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Component for Social Icons
function SocialIcon({ icon: Icon }: { icon: any }) {
  return (
    <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
      <Icon size={16} />
    </a>
  );
}