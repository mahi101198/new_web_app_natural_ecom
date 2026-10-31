import React from 'react';
import { Plus, Star, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onOpenDetail: (p: Product) => void;
  lang: 'en' | 'hi';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetail,
  lang,
}) => {
  const discountAmount = product.originalPrice - product.price;

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-[#e8dfd3] hover:border-[#cfbeab] shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f4ede4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback to prevent broken frames
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Fallback pattern if image is hidden */}
        <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-4 bg-linear-to-br from-[#f4ede4] to-[#e8ded1] text-center">
          <Sparkles className="w-8 h-8 text-[#8c6747] mb-2 opacity-60" />
          <span className="font-serif text-sm font-semibold text-[#1e3a2b]">{product.name}</span>
          <span className="text-xs text-[#735e50]">{product.size}</span>
        </div>

        {/* Top Badges (max 1 subtle tag) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white bg-[#1e3a2b]/90 backdrop-blur-xs rounded-sm shadow-xs">
            {product.badge}
          </div>
        )}

        {discountAmount > 0 && (
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 text-[11px] font-bold text-[#8a3324] bg-[#fbf0ee] border border-[#f3d4ce] rounded-sm">
            Save ₹{discountAmount}
          </div>
        )}
      </div>

      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Metadata line: Clean unboxed text with bullet separators */}
          <div className="flex items-center gap-2 text-xs text-[#786455]">
            <span className="font-medium text-[#8c6747] uppercase tracking-wider text-[11px]">
              {product.size}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-amber-700 font-medium">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-[#968273]">({product.reviewCount})</span>
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-base text-[#1e3a2b] leading-snug group-hover:text-[#2d5640] transition-colors line-clamp-2">
            {lang === 'hi' && product.hindiName ? product.hindiName : product.name}
          </h3>

          {/* Hindi subname if currently in English mode */}
          {lang === 'en' && product.hindiName && (
            <p className="text-xs text-[#827163] line-clamp-1">
              {product.hindiName}
            </p>
          )}

          {/* Short Benefit Kicker */}
          <p className="text-xs text-[#5c4d41] line-clamp-2 leading-relaxed pt-0.5">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing and Action Footer */}
        <div className="pt-2 border-t border-[#f0e7db] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-mono text-[#1e3a2b] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#968273] line-through font-mono tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[10px] text-[#2d5640] font-medium">
              Handmade Fresh
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1e3a2b] hover:bg-[#284f3a] active:scale-95 rounded-lg shadow-2xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
