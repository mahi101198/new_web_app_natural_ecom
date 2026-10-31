import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, Truck, Package, MessageCircle, MapPin } from 'lucide-react';
import { mockTrackOrder } from '../utils/cart';
import { OrderDetails } from '../types';
import { STORE_INFO } from '../data/products';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
  lang: 'en' | 'hi';
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
  lang,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState(initialOrderId || 'RID-8942');
  const [trackedOrder, setTrackedOrder] = useState<OrderDetails | null>(() => mockTrackOrder(query));
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = mockTrackOrder(query);
    setTrackedOrder(res);
    setSearched(true);
  };

  const steps = [
    { title: 'Order Received', desc: 'Order details verified & queued for fresh crafting', done: true },
    { title: 'Fresh Batch Crafting', desc: 'Handcrafted by Sarika in Surat workshop', done: true },
    { title: 'Quality Inspection & Packing', desc: 'Sealed safely with eco-friendly cushioning', done: true },
    { title: 'Dispatched via DTDC Express', desc: 'In transit with tracking ID #DTDC98231', done: false, active: true },
    { title: 'Doorstep Delivery', desc: 'Out for delivery in 1-2 business days', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#e2d6c7] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8dfd3] bg-[#faf8f5] flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1e3a2b] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#8c6747]" />
              <span>{lang === 'en' ? 'Live Order Tracking' : 'ऑर्डर ट्रैकिंग'}</span>
            </h3>
            <p className="text-xs text-[#735e50]">
              Track your small-batch organic delivery status
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close tracking"
            className="p-1.5 text-[#5e4f44] hover:text-black rounded-lg hover:bg-[#f4ede4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Tracking Search Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8c7e73] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter 10-digit Mobile No or Order ID (e.g. RID-8942)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf8f5] border border-[#d8ccbe] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1e3a2b] hover:bg-[#284f3a] rounded-lg transition-colors cursor-pointer shrink-0"
            >
              Track Status
            </button>
          </form>

          {/* Quick Notice about Sarika's Fresh Small Batches */}
          <div className="p-3 bg-[#fdfaf5] border border-[#eedecb] rounded-xl text-xs text-[#614e41] space-y-1">
            <div className="font-semibold text-[#8c6747] flex items-center gap-1.5">
              <span>🌿 Note from Sarika Chaturvedi:</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              "We prepare each herbal hair oil and facepack in fresh, small weekly batches in our Surat kitchen to ensure maximum botanical potency without chemical preservatives. Thank you for your patience with handmade purity!"
            </p>
          </div>

          {/* Tracking Result View */}
          {trackedOrder ? (
            <div className="space-y-5 border border-[#e8dfd3] rounded-xl p-4 bg-[#faf8f5]">
              {/* Order Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e8dfd3] text-xs">
                <div>
                  <span className="text-[#786455]">Tracking Order:</span>
                  <strong className="font-mono text-[#1e3a2b] ml-1.5 font-bold">#{trackedOrder.orderId}</strong>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                  {trackedOrder.status}
                </div>
              </div>

              {/* Step Timeline */}
              <div className="space-y-4 pt-1">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 relative">
                    {/* Connecting line */}
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-3 top-6 bottom-0 w-0.5 -ml-px ${
                          step.done ? 'bg-[#1e3a2b]' : 'bg-[#e2d5c5]'
                        }`}
                      />
                    )}

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                        step.done
                          ? 'bg-[#1e3a2b] text-white'
                          : step.active
                          ? 'bg-[#8c6747] text-white ring-4 ring-[#8c6747]/20'
                          : 'bg-[#e8ded2] text-[#857365]'
                      }`}
                    >
                      {step.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-semibold text-[#1e3a2b] flex items-center gap-2">
                        <span>{step.title}</span>
                        {step.active && (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#705e50]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Items & Delivery Address */}
              <div className="pt-3 border-t border-[#e8dfd3] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#594a3e]">
                  <span>Package: {trackedOrder.items[0]?.product.name}</span>
                  <span className="font-mono font-semibold text-[#1e3a2b]">
                    ₹{trackedOrder.totals.total.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#786455]">
                  <MapPin className="w-3.5 h-3.5 text-[#8c6747] shrink-0" />
                  <span>
                    Delivering to: {trackedOrder.customerName}, {trackedOrder.city}, {trackedOrder.state} ({trackedOrder.pincode})
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp button for tracking query */}
              <a
                href={`https://wa.me/918238163069?text=${encodeURIComponent(
                  `Namaste Sarika ji! Please provide an update for my order #${trackedOrder.orderId} (${trackedOrder.customerName}). Thank you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                <span>Need assistance? Chat directly on WhatsApp (+91 82381 63069)</span>
              </a>
            </div>
          ) : (
            searched && (
              <div className="p-8 text-center bg-[#faf8f5] rounded-xl border border-[#e8dfd3] space-y-2">
                <Package className="w-8 h-8 text-[#b09e8f] mx-auto" />
                <h4 className="font-semibold text-xs text-[#1e3a2b]">No order found for "{query}"</h4>
                <p className="text-[11px] text-[#705e50] max-w-xs mx-auto">
                  Please verify your 10-digit mobile number or Order ID. If you placed the order via WhatsApp, our team can help you directly.
                </p>
                <a
                  href={`https://wa.me/918238163069?text=${encodeURIComponent(
                    `Namaste! I want to check my order status for: ${query}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Ask Sarika on WhatsApp
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
