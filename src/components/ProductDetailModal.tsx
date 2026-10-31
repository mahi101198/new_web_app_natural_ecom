import React, { useState } from 'react';
import { X, Star, Plus, Minus, MessageCircle, ShoppingBag, CheckCircle2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
  lang: 'en' | 'hi';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const discountAmount = product.originalPrice - product.price;

  const handleWhatsAppDirect = () => {
    const text = `Namaste Sarika ji! I want to order *${quantity}x ${product.name} (${product.size})* for ₹${(
      product.price * quantity
    ).toLocaleString('en-IN')}. Please confirm batch availability! 🙏`;
    window.open(`https://wa.me/918238163069?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#faf8f5] rounded-2xl border border-[#e2d6c7] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 p-2 text-[#4a3b32] hover:text-black bg-white/80 hover:bg-white rounded-full transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image showcase with brand badge */}
          <div className="relative bg-[#f3ece2] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#e8dfd3]">
            <div className="relative aspect-square w-full max-w-sm rounded-xl overflow-hidden shadow-xs bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-[#1e3a2b]/95 rounded-md shadow-xs">
                  {product.badge}
                </div>
              )}
            </div>

            <div className="w-full mt-4 p-3 bg-white/70 rounded-lg border border-[#e4dacf] text-xs text-[#54463c] space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#1e3a2b] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#8c6747]" />
                <span>Crafted in Surat, Gujarat · Small Batch</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#54463c]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>0% Mineral Oils · 0% Parabens & Sulfates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#705e50]">
                <span className="font-semibold uppercase tracking-wider text-[#8c6747]">
                  {product.size}
                </span>
                <span className="flex items-center gap-1 font-medium text-amber-800">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-[#8a796c]">({product.reviewCount} verified reviews)</span>
                </span>
              </div>

              {/* Title & Hindi Translation */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1e3a2b] leading-tight">
                  {lang === 'hi' && product.hindiName ? product.hindiName : product.name}
                </h2>
                {product.hindiName && (
                  <p className="text-sm font-medium text-[#7a6452] mt-0.5">
                    {product.hindiName}
                  </p>
                )}
              </div>

              {/* Pricing Section */}
              <div className="p-3 bg-white rounded-lg border border-[#e8dfd3] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-[#1e3a2b] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-[#8c7b6e] line-through font-mono tabular-nums">
                        MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#2d5640] font-medium">
                    Inclusive of all taxes · Fresh weekly dispatch
                  </div>
                </div>

                {discountAmount > 0 && (
                  <div className="px-2.5 py-1 text-xs font-bold text-[#8a3324] bg-[#fbf0ee] border border-[#f3d4ce] rounded-md">
                    Save ₹{discountAmount}
                  </div>
                )}
              </div>

              {/* Detailed Description */}
              <p className="text-xs text-[#52443a] leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Key Benefits */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a2b]">
                  {lang === 'en' ? 'Key Ayurvedic Benefits:' : 'प्रमुख आयुर्वेदिक लाभ:'}
                </h4>
                <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#4c3e34]">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Botanical Ingredients */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a2b]">
                  {lang === 'en' ? 'Natural Ingredients / Botanicals:' : 'प्राकृतिक घटक:'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 bg-white border border-[#dfd3c5] rounded-md text-[#524338]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Use */}
              <div className="p-3 bg-[#f3eee5] rounded-lg border border-[#e4d7c7] text-xs space-y-1">
                <div className="font-semibold text-[#1e3a2b] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8c6747]" />
                  <span>How to Use / उपयोग विधि:</span>
                </div>
                <p className="text-[#59493e] leading-relaxed">
                  {product.howToUse}
                </p>
              </div>
            </div>

            {/* Action Bar: Quantity Stepper, Add to Cart, WhatsApp Direct */}
            <div className="space-y-3 pt-3 border-t border-[#e8dfd3]">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-white border border-[#d8ccbe] rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-[#4a3b32] hover:text-black disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-mono font-semibold text-sm tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#4a3b32] hover:text-black cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#1e3a2b] hover:bg-[#284f3a] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Cart · ₹{(product.price * quantity).toLocaleString('en-IN')}
                  </span>
                </button>
              </div>

              {/* Quick WhatsApp Checkout Option */}
              <button
                onClick={handleWhatsAppDirect}
                className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                <span>Quick Order Direct on WhatsApp (+91 82381 63069)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
