import { Product } from "@/types";
import { Trash2, Edit } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Area */}
      <div className="relative h-48 bg-gray-50 w-full overflow-hidden flex items-center justify-center">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="text-gray-300 flex flex-col items-center">
             <span className="text-4xl">🖼️</span>
             <span className="text-xs mt-2">No Image</span>
          </div>
        )}
        {/* Price Tag Overlay */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
          ৳ {product.price}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {product.description || "No description provided."}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className={`text-xs font-semibold px-2 py-1 rounded-md ${
            product.stock > 0 
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
              : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
          </div>

          <button 
            onClick={() => onDelete(product.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete Product"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}