import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/70 backdrop-blur-md border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/product/${product.id}`}
            className="p-3 bg-white text-slate-800 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-colors duration-300"
            title="View Details"
          >
            <Eye size={20} />
          </Link>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
            title={product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          >
            <ShoppingBag size={20} />
          </button>
        </div>

        {/* Badges */}
        {product.stock <= 0 ? (
          <span className="absolute top-4 left-4 bg-slate-950/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Stock Out
          </span>
        ) : product.stock < 10 ? (
          <span className="absolute top-4 left-4 bg-amber-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Low Stock
          </span>
        ) : null}

        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-100">
          {product.category}
        </span>
      </div>

      {/* Info Container */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="group-hover:text-indigo-600 transition-colors duration-200">
          <h3 className="text-slate-800 font-semibold text-lg line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-xs line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <span className="text-xl font-bold text-slate-900">
            ৳ {product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
          >
            <ShoppingBag size={15} />
            {product.stock > 0 ? 'Add' : 'Out'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
