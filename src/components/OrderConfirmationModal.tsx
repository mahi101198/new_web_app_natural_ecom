import React from 'react';
import { CheckCircle2, MessageCircle, Package, Truck, Calendar, MapPin, X, Copy } from 'lucide-react';
import { OrderDetails } from '../types';
import { generateWhatsAppOrderUrl } from '../utils/cart';
import { STORE_INFO } from '../data/products';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
  lang: 'en' | 'hi';
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onTrackOrder,
  lang,
}) => {
  if (!order) return null;

  const [copied, setCopied] = React.useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToWhatsApp = () => {
    const url = generateWhatsAppOrderUrl(order, '918238163069');
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl border border-[#e2d6c7] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Banner */}
        <div className="bg-[#1e3a2b] p-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
            <CheckCircle2 className="w-7 h-7 text-[#d4af37]" />
          </div>
          <h3 className="font-serif text-2xl font-bold">
            {lang === 'en' ? 'Order Placed Successfully!' : 'ऑर्डर सफलतापूर्वक दर्ज हुआ!'}
          </h3>
          <p className="text-xs text-white/80 mt-1">
            Thank you, {order.customerName}! Your fresh batch order is received at our Surat workshop.
          </p>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Order ID Banner */}
          <div className="p-3.5 bg-[#faf8f5] rounded-xl border border-[#e8dfd3] flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#786455] font-medium">Order Number</div>
              <div className="font-mono text-base font-bold text-[#1e3a2b]">#{order.orderId}</div>
            </div>
            <button
              onClick={handleCopyOrderId}
              className="px-2.5 py-1 text-xs font-medium text-[#1e3a2b] bg-white border border-[#d8ccbe] rounded-md hover:bg-[#f3ede3] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy ID'}</span>
            </button>
          </div>

          {/* Delivery & Timeline */}
          <div className="grid grid-cols-2 gap-3 text-xs text-[#52443a]">
            <div className="p-3 bg-[#faf8f5] rounded-lg border border-[#e8dfd3] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#1e3a2b]">
                <Calendar className="w-3.5 h-3.5 text-[#8c6747]" />
                <span>Estimated Dispatch</span>
              </div>
              <p className="text-[11px] text-[#6b584a]">
                Within 24–48 hours (Fresh handmade crafting)
              </p>
            </div>

            <div className="p-3 bg-[#faf8f5] rounded-lg border border-[#e8dfd3] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#1e3a2b]">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Delivery Carrier</span>
              </div>
              <p className="text-[11px] text-[#6b584a]">
                DTDC / India Speed Post Express
              </p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a2b]">
              Ordered Products ({order.items.length})
            </h4>
            <div className="space-y-2 border border-[#f0e7dc] rounded-xl p-3 bg-[#faf8f5]">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs">
                  <div className="truncate mr-3">
                    <span className="font-medium text-[#2c2420]">{item.product.name}</span>
                    <span className="text-[#8c7462] ml-1">× {item.quantity}</span>
                  </div>
                  <span className="font-mono tabular-nums font-semibold text-[#1e3a2b] shrink-0">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#e8dfd3] flex justify-between text-xs font-bold text-[#1e3a2b]">
                <span>Total Amount Paid / Payable</span>
                <span className="font-mono text-sm">₹{order.totals.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="text-xs text-[#52443a] p-3 bg-white border border-[#e8dfd3] rounded-lg space-y-1">
            <div className="font-semibold text-[#1e3a2b] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8c6747]" />
              <span>Delivering To:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#6b584a]">
              {order.customerName} ({order.phone})<br />
              {order.address}, {order.city}, {order.state} - {order.pincode}
            </p>
          </div>

          {/* Direct WhatsApp Confirmation Button */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSendToWhatsApp}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
              <span>Send Receipt on WhatsApp to Sarika (+91 82381 63069)</span>
            </button>

            <button
              onClick={() => onTrackOrder(order.orderId)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#1e3a2b] bg-[#faf8f5] hover:bg-[#f0e7dc] border border-[#d8ccbe] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-[#8c6747]" />
              <span>View Live Order Tracking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
