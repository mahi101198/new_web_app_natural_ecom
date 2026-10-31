import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Tag, Check, Sparkles, Truck } from 'lucide-react';
import { CartItem } from '../types';
import { calculateCartTotals, AVAILABLE_COUPONS } from '../utils/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: (coupon: string) => void;
  onDirectWhatsAppCheckout: (coupon: string) => void;
  lang: 'en' | 'hi';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onDirectWhatsAppCheckout,
  lang,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, appliedCoupon);
  const freeShippingPct = Math.min(100, Math.round((totals.subtotal / 999) * 100));

  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return;

    if (AVAILABLE_COUPONS[clean]) {
      const minOrder = AVAILABLE_COUPONS[clean].minOrder;
      if (totals.subtotal < minOrder) {
        setCouponError(`Min order of ₹${minOrder} required for ${clean}`);
        return;
      }
      setAppliedCoupon(clean);
      setCouponInput(clean);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try SARIKA10 or WELCOME50');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponInput('');
    setCouponError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#faf8f5] h-full shadow-2xl flex flex-col justify-between border-l border-[#e4dacf]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8dfd3] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1e3a2b]" />
            <h3 className="font-serif text-lg font-bold text-[#1e3a2b]">
              {lang === 'en' ? 'Your Shopping Bag' : 'आपकी खरीदारी'}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#f4ede4] text-[#786455] font-mono font-medium">
              {totals.itemCount}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 text-[#5e4f44] hover:text-black rounded-lg hover:bg-[#f4ede4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-4 py-3 bg-[#f2ece2] border-b border-[#e4dacf] text-xs">
          {totals.subtotal >= 999 ? (
            <div className="flex items-center gap-1.5 text-[#1e3a2b] font-medium">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>🎉 Congratulations! You have unlocked <strong>FREE Shipping</strong>!</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[#594a3e]">
                <span>Add <strong>₹{totals.freeShippingRemaining}</strong> more for Free Shipping</span>
                <span className="font-mono">{freeShippingPct}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#e0d5c5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1e3a2b] transition-all duration-300"
                  style={{ width: `${freeShippingPct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#b09e8f] stroke-1" />
              <h4 className="font-serif text-base font-semibold text-[#1e3a2b]">Your bag is currently empty</h4>
              <p className="text-xs text-[#705e50] max-w-xs leading-relaxed">
                Explore Sarika’s handmade herbal hair oils, wood-pressed pure oils, and glowing bridal facepacks.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 text-xs font-semibold text-white bg-[#1e3a2b] rounded-lg hover:bg-[#2c4e3b] transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="p-3 bg-white rounded-xl border border-[#e8dfd3] shadow-2xs flex gap-3 items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#f4ede4] shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h5 className="text-xs font-semibold text-[#1e3a2b] truncate">
                    {lang === 'hi' && item.product.hindiName ? item.product.hindiName : item.product.name}
                  </h5>
                  <div className="text-[11px] text-[#8c6747] font-medium">
                    {item.product.size}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs font-bold font-mono text-[#1e3a2b] tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-[#faf8f5] border border-[#d8ccbe] rounded-md">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#4a3b32] hover:text-black cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#4a3b32] hover:text-black cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  aria-label="Remove item"
                  className="p-1.5 text-[#b09d8e] hover:text-[#b84a39] transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#e8dfd3] space-y-4 shadow-lg">
            {/* Coupon Code Section */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8c7e73] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. SARIKA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#faf8f5] border border-[#d8ccbe] rounded-lg uppercase focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
                  />
                </div>
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="px-3 py-1.5 text-xs font-semibold text-[#b84a39] bg-[#fbf0ee] border border-[#f3d4ce] rounded-lg cursor-pointer"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => handleApplyCoupon(couponInput)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1e3a2b] hover:bg-[#2c4e3b] rounded-lg cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                )}
              </div>

              {couponError && (
                <div className="text-[11px] text-[#b84a39]">{couponError}</div>
              )}

              {appliedCoupon && (
                <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  Coupon <strong>{appliedCoupon}</strong> applied successfully!
                </div>
              )}

              {/* Quick Coupon hints */}
              {!appliedCoupon && (
                <div className="flex items-center gap-2 text-[10px] text-[#705e50]">
                  <span>Available:</span>
                  <button
                    onClick={() => handleApplyCoupon('SARIKA10')}
                    className="underline hover:text-[#1e3a2b] font-medium"
                  >
                    SARIKA10 (10% off)
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => handleApplyCoupon('WELCOME50')}
                    className="underline hover:text-[#1e3a2b] font-medium"
                  >
                    WELCOME50 (₹50 off)
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#54463c] border-t border-[#f0e7db] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums font-semibold">
                  ₹{totals.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
                  <span className="font-mono tabular-nums">
                    -₹{totals.discount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums">
                  {totals.shipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `₹${totals.shipping}`
                  )}
                </span>
              </div>
              {totals.savings > 0 && (
                <div className="flex justify-between text-[#8a3324] text-[11px] font-medium">
                  <span>Total Savings on this order</span>
                  <span className="font-mono tabular-nums">
                    ₹{totals.savings.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#1e3a2b] pt-1.5 border-t border-[#f0e7db]">
                <span>Total Payable</span>
                <span className="font-mono tabular-nums text-base">
                  ₹{totals.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* 2 Primary Checkout Actions */}
            <div className="space-y-2 pt-1">
              {/* WhatsApp 1-Click Checkout (Beloved by her followers) */}
              <button
                onClick={() => onDirectWhatsAppCheckout(appliedCoupon)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
                <span>1-Click Order via WhatsApp (+91 82381 63069)</span>
              </button>

              {/* Online Delivery Address & UPI / COD */}
              <button
                onClick={() => onProceedToCheckout(appliedCoupon)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#1e3a2b] hover:bg-[#284f3a] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Address & Pay via UPI / COD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
