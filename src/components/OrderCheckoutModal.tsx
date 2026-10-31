import React, { useState } from 'react';
import { X, Check, ShieldCheck, MapPin, Phone, User, QrCode, CreditCard, MessageCircle, Truck } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { calculateCartTotals, generateWhatsAppOrderUrl } from '../utils/cart';
import { STORE_INFO } from '../data/products';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  coupon: string;
  onOrderSuccess: (order: OrderDetails) => void;
  lang: 'en' | 'hi';
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  coupon,
  onOrderSuccess,
  lang,
}) => {
  if (!isOpen) return null;

  const totals = calculateCartTotals(items, coupon);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Surat');
  const [state, setState] = useState('Gujarat');
  const [pincode, setPincode] = useState('395007');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'whatsapp' | 'cod'>('upi');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit WhatsApp/mobile number';
    }
    if (!address.trim()) errs.address = 'Please enter your complete street address';
    if (!city.trim()) errs.city = 'Please enter your city';
    if (!pincode.trim() || pincode.length < 6) errs.pincode = 'Please enter a valid 6-digit Pincode';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = `RID-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: OrderDetails = {
      orderId,
      customerName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      paymentMethod,
      notes: notes.trim() || undefined,
      items,
      totals,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Order Placed',
    };

    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#faf8f5] rounded-2xl border border-[#e2d6c7] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8dfd3] bg-white flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1e3a2b]">
              {lang === 'en' ? 'Direct Delivery & Checkout' : 'डिलीवरी पता व भुगतान'}
            </h3>
            <p className="text-xs text-[#735e50]">
              Handmade & packed with care at our Surat workshop
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checkout modal"
            className="p-1.5 text-[#5e4f44] hover:text-black rounded-lg hover:bg-[#f4ede4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Order Snapshot */}
          <div className="p-3.5 bg-white rounded-xl border border-[#e8dfd3] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#54463c]">
              <span>Items ({totals.itemCount})</span>
              <span className="font-mono font-semibold">₹{totals.subtotal.toLocaleString('en-IN')}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-700">
                <span>Coupon ({coupon})</span>
                <span className="font-mono">-₹{totals.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-[#54463c]">
              <span>Shipping Fee</span>
              <span className="font-mono">
                {totals.shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${totals.shipping}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-[#1e3a2b] pt-2 border-t border-[#f0e7db]">
              <span>Total Amount to Pay</span>
              <span className="font-mono text-base">₹{totals.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Customer & Address Form */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a2b] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#8c6747]" />
              <span>Delivery Details (India)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Meenakshi Patel"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#d8ccbe] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
                />
                {errors.fullName && <p className="text-[10px] text-[#b84a39] mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">
                  WhatsApp Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98201 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#d8ccbe] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
                />
                {errors.phone && <p className="text-[10px] text-[#b84a39] mt-0.5">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4a3b32] mb-1">
                Complete House / Street Address *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Flat / House No., Society / Street Name, Landmark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#d8ccbe] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
              />
              {errors.address && <p className="text-[10px] text-[#b84a39] mt-0.5">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#d8ccbe] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#d8ccbe] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4a3b32] mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#d8ccbe] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
                />
                {errors.pincode && <p className="text-[10px] text-[#b84a39] mt-0.5">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1e3a2b]">
              Payment Preference
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* UPI Option */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'upi'
                    ? 'bg-white border-[#1e3a2b] ring-1 ring-[#1e3a2b] shadow-xs'
                    : 'bg-white/60 border-[#d8ccbe] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#1e3a2b] flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-emerald-700" />
                    Instant UPI QR
                  </span>
                  {paymentMethod === 'upi' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-[#705e50]">
                  GPay, PhonePe, Paytm directly to Sarika's registered UPI
                </p>
              </div>

              {/* WhatsApp Invoice */}
              <div
                onClick={() => setPaymentMethod('whatsapp')}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'whatsapp'
                    ? 'bg-white border-[#1e3a2b] ring-1 ring-[#1e3a2b] shadow-xs'
                    : 'bg-white/60 border-[#d8ccbe] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#1e3a2b] flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    WhatsApp Pay
                  </span>
                  {paymentMethod === 'whatsapp' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-[#705e50]">
                  Confirm on WhatsApp chat & get payment link directly
                </p>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                  paymentMethod === 'cod'
                    ? 'bg-white border-[#1e3a2b] ring-1 ring-[#1e3a2b] shadow-xs'
                    : 'bg-white/60 border-[#d8ccbe] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#1e3a2b] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#8c6747]" />
                    Cash on Delivery
                  </span>
                  {paymentMethod === 'cod' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <p className="text-[10px] text-[#705e50]">
                  Pay cash upon doorstep package arrival
                </p>
              </div>
            </div>

            {/* UPI QR Code Preview Box when UPI is chosen */}
            {paymentMethod === 'upi' && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-4">
                <div className="w-20 h-20 bg-white p-1 rounded-lg border border-emerald-300 flex items-center justify-center shrink-0">
                  <QrCode className="w-14 h-14 text-emerald-800" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-emerald-950">
                    Official Business UPI: 8238163069@okbizaxis
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Registered to <strong>Creative Class Sarika (Sarika Chaturvedi)</strong>. Once you submit, you'll receive the direct WhatsApp verification and confirmation!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#1e3a2b] hover:bg-[#284f3a] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Place Order · ₹{totals.total.toLocaleString('en-IN')}</span>
            </button>
            <p className="text-[11px] text-center text-[#7a685b] mt-2">
              🔒 100% Genuine Ayurvedic Small-Batch Guarantee · Surat, Gujarat
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
