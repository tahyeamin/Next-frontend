import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

// Server Side Data Fetching
async function getProduct(id: string) {
  // ব্যাকএন্ডে এই রাউটটি থাকতে হবে: /public/products/:id
  const res = await fetch(`http://localhost:3000/public/products/${id}`, {
    cache: "no-store", 
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="p-20 text-center text-xl">Product not found 😔</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-2xl h-[400px] flex items-center justify-center text-gray-400">
            Product Image
        </div>
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
            <p className="text-2xl text-blue-600 font-bold mb-6">${product.price}</p>
            <p className="text-gray-600 mb-8">{product.description}</p>
            <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
}