export default function Footer() {
  return (
    <footer 
      className="py-8 text-center border-t border-gray-900"
      // 🔥 এখানে color: '#ffffff' দেওয়া হয়েছে, যা ১০০% সাদা করবে
      style={{ backgroundColor: '#000000', color: '#ffffff' }}
    >
      <p style={{ color: '#ffffff' }}>© 2026 ShopVerse. All rights reserved.</p>
    </footer>
  );
}