import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Heart, ShieldCheck, Truck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { validateNewsletterEmail } from '../utils/cart';

interface FooterProps {
  onOpenTracking: () => void;
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking, lang }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewsletterEmail(email);
    if (!validation.valid) {
      setError(validation.error || 'Invalid email');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#172e22] text-[#e3ded4] pt-14 pb-8 border-t border-[#234232]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Join Our Wellness Circle Newsletter Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1e3a2b] border border-[#2d523e] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Seasonal Batches & Herbal Wisdom' : 'मौसमी बैच और आयुर्वेदिक टिप्स'}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {lang === 'en' ? 'Join Our Wellness Circle' : 'हमारे वेलनेस सर्कल से जुड़ें'}
              </h3>
              <p className="text-xs sm:text-sm text-[#c4bdae] max-w-xl leading-relaxed">
                {lang === 'en'
                  ? "Receive Sarika's seasonal Ayurvedic hair & skincare rituals, fresh weekly batch alerts from our Surat kitchen, and exclusive member offers."
                  : 'सारिका के मौसमी आयुर्वेदिक स्किनकेयर व हेयरकेयर नुस्खे, ताज़ा साप्ताहिक बैच अलर्ट और विशेष ऑफ़र सीधे अपने इनबॉक्स में पाएं।'}
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-xl bg-[#14281d] border border-emerald-700/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="font-semibold text-white">
                      {lang === 'en' ? 'Welcome to the Wellness Circle!' : 'वेलनेस सर्कल में आपका स्वागत है!'}
                    </div>
                    <p className="text-[#c4bdae]">
                      You're subscribed with <strong className="text-white">{email}</strong>. Use code{' '}
                      <span className="font-mono font-bold text-[#d4af37]">WELCOME50</span> for ₹50 off your next order!
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="flex-1">
                      <label htmlFor="wellness-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="wellness-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder={lang === 'en' ? 'Enter your email address...' : 'अपना ईमेल पता दर्ज करें...'}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#12241a] text-white placeholder-[#8a9a90] border border-[#355c47] rounded-lg focus:outline-none focus:border-[#d4af37] transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#172e22] bg-[#d4af37] hover:bg-[#e0bd48] rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 shadow-xs"
                    >
                      <span>{lang === 'en' ? 'Join Circle' : 'जुड़ें'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {error && (
                    <p role="alert" className="text-xs text-rose-300 font-medium">
                      {error}
                    </p>
                  )}
                  <p className="text-[11px] text-[#9a9180]">
                    {lang === 'en'
                      ? 'Zero spam. Pure Ayurvedic recipes, seasonal skincare tips & fresh batch updates.'
                      : 'कोई स्पैम नहीं। केवल शुद्ध आयुर्वेदिक नुस्खे और ताज़ा बैच अपडेट।'}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="font-serif text-2xl font-bold text-white tracking-tight">
                {STORE_INFO.name}
              </div>
              <div className="text-xs text-[#d4af37] tracking-wider uppercase font-semibold mt-0.5">
                by Creative Class Sarika
              </div>
            </div>
            <p className="text-xs text-[#c4bdae] leading-relaxed">
              Handcrafted Ayurvedic hair care, wood-pressed pure oils, and traditional wellness foods prepared with pure botanicals in Surat, Gujarat. Trusted by over 1.6 Million community members across India.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#a99e8c]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>100% Chemical-Free Small Batches</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Natural Collections' : 'प्राकृतिक श्रेणियां'}
            </h4>
            <ul className="space-y-2 text-xs text-[#c4bdae]">
              <li>
                <a href="#haircare" className="hover:text-white transition-colors">
                  21 Herbs Hair Growth Masala Oil
                </a>
              </li>
              <li>
                <a href="#skincare" className="hover:text-white transition-colors">
                  Bridal Glow Ubtan & Aloe Vera Gels
                </a>
              </li>
              <li>
                <a href="#oils" className="hover:text-white transition-colors">
                  Wood-Pressed Kalonji & Mustard Oils
                </a>
              </li>
              <li>
                <a href="#wellness" className="hover:text-white transition-colors">
                  38 Herbs Amla Chyawanprash & Raw Honey
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-[#d4af37] transition-colors flex items-center gap-1 cursor-pointer pt-1"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track Existing Order</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Workshop & Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Workshop & Direct Support' : 'सूरत वर्कशॉप व संपर्क'}
            </h4>
            <div className="space-y-2.5 text-xs text-[#c4bdae]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  <strong>Workshop & Lab:</strong> Surat, Gujarat, India (Founded by Sarika Chaturvedi, BHU Alumnus)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Hours: {STORE_INFO.workingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Call Support: {STORE_INFO.altPhone} / {STORE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Email: {STORE_INFO.email}</span>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/918238163069?text=${encodeURIComponent(
                    'Namaste Sarika ji! I am reaching out through your Riddham Naturals website for customer support.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium text-xs transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Direct (+91 82381 63069)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#234232] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9a9180]">
          <div>
            © {new Date().getFullYear()} {STORE_INFO.name} (Riddham Foods & Organics). All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by Creative Class Sarika in Surat, Gujarat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
