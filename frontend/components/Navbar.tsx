import Link from 'next/link';

// এখানে 'title' হলো Props 
export default function Navbar({ title }: { title: string }) {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1> {/* Props ব্যবহার করা হলো */}
      <div className="space-x-4">
        <Link href="/" className="hover:text-gray-200">Home</Link>
        <Link href="/login" className="hover:text-gray-200">Login</Link>
        <Link href="/register" className="hover:text-gray-200">Register</Link>
      </div>
    </nav>
  );
}