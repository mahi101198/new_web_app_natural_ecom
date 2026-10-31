import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Search, Menu, X, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracking: () => void;
  onOpenQuiz: () => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onSearchChange: (q: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracking,
  onOpenQuiz,
  lang,
  onToggleLang,
  onSearchChange,
  searchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8dfd3]">
      {/* Top micro announcement bar */}
      <div className="bg-[#1e3a2b] text-[#f2ede4] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-medium">
              {lang === 'en'
                ? 'Handcrafted Small Batches in Surat · Free Shipping Above ₹999 Across India'
                : 'सूरत में ताज़ा हस्तनिर्मित बैच · ₹999 से अधिक के ऑर्डर पर पूरे भारत में मुफ़्त डिलीवरी'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-[#dcd3c5]">
            <button
              onClick={onOpenTracking}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3 h-3 text-[#d4af37]" />
              <span>{lang === 'en' ? 'Track Your Order' : 'ऑर्डर ट्रैक करें'}</span>
            </button>
            <span className="text-[#556b5f]">|</span>
            <button
              onClick={onToggleLang}
              className="text-xs px-2 py-0.5 rounded bg-[#2b4c39] hover:bg-[#395e48] text-[#f2ede4] font-medium transition-colors cursor-pointer"
            >
              {lang === 'en' ? 'हिन्दी (Hindi)' : 'English'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Following Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Primary Action & Cart) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex flex-col group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1e3a2b] group-hover:text-[#2d5640] transition-colors whitespace-nowrap">
                {STORE_INFO.name}
              </span>
              <span className="text-[11px] font-medium tracking-widest uppercase text-[#8c6747] -mt-1">
                by Creative Class Sarika
              </span>
            </a>
          </div>

          {/* Zone 2: 4-5 Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4a3b32]">
            <a
              href="#catalog"
              className="hover:text-[#1e3a2b] transition-colors whitespace-nowrap hover:underline underline-offset-4 decoration-[#8c6747]"
            >
              {lang === 'en' ? 'All Products' : 'सभी उत्पाद'}
            </a>
            <a
              href="#haircare"
              className="hover:text-[#1e3a2b] transition-colors whitespace-nowrap hover:underline underline-offset-4 decoration-[#8c6747]"
            >
              {lang === 'en' ? 'Hair Care' : 'हेयर केयर'}
            </a>
            <a
              href="#skincare"
              className="hover:text-[#1e3a2b] transition-colors whitespace-nowrap hover:underline underline-offset-4 decoration-[#8c6747]"
            >
              {lang === 'en' ? 'Glowing Skin' : 'स्किन केयर'}
            </a>
            <a
              href="#oils"
              className="hover:text-[#1e3a2b] transition-colors whitespace-nowrap hover:underline underline-offset-4 decoration-[#8c6747]"
            >
              {lang === 'en' ? 'Cold-Pressed Oils' : 'लकड़ी घाणी तेल'}
            </a>
            <a
              href="#sarika-story"
              className="hover:text-[#1e3a2b] transition-colors whitespace-nowrap hover:underline underline-offset-4 decoration-[#8c6747]"
            >
              {lang === 'en' ? 'Sarika’s Story' : 'सारिका की कहानी'}
            </a>
          </nav>

          {/* Zone 3: Search, Quiz & Cart */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Quick search input or toggle */}
            <div className="relative hidden md:block">
              <div className="relative">
                <Search className="w-4 h-4 text-[#8c7e73] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === 'en' ? 'Search herbal oil, honey, chyawanprash...' : 'खोजें: तेल, शहद, फेसपैक...'}
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-52 lg:w-64 pl-9 pr-3 py-1.5 text-xs bg-white/80 border border-[#e2d7c9] rounded-full focus:outline-none focus:ring-1 focus:ring-[#1e3a2b] focus:border-[#1e3a2b] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8c7e73] hover:text-[#1e3a2b]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Ayurvedic Consultation Button */}
            <button
              onClick={onOpenQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1e3a2b] bg-[#eef4ee] hover:bg-[#dfeade] border border-[#c5d8c6] rounded-full transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2d5640]" />
              <span>{lang === 'en' ? 'Routine Quiz' : 'आयुर्वेदिक क्विज'}</span>
            </button>

            {/* Direct WhatsApp Ordering Assistance */}
            <a
              href={`https://wa.me/918238163069?text=${encodeURIComponent('Namaste Sarika ji! I am visiting your Riddham Naturals website and have a question regarding products.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Us"
              className="inline-flex items-center justify-center p-2 sm:px-3 sm:py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span className="hidden xl:inline ml-1.5">{STORE_INFO.phone}</span>
              <span className="hidden sm:inline xl:hidden ml-1.5">WhatsApp</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="View Shopping Cart"
              className="relative inline-flex items-center justify-center p-2 sm:p-2.5 text-[#1e3a2b] bg-white hover:bg-[#f3ede3] border border-[#d8ccbe] rounded-full shadow-xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-[#b84a39] rounded-full shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-[#4a3b32] hover:text-[#1e3a2b] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8c7e73] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search herbal oil, honey, ubtan...' : 'खोजें: तेल, शहद, फेसपैक...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#e2d7c9] rounded-full focus:outline-none focus:ring-1 focus:ring-[#1e3a2b]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e8dfd3] bg-[#faf8f5] px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between py-2 border-b border-[#e8dfd3]">
            <span className="text-xs font-semibold text-[#66574c]">Language / भाषा:</span>
            <button
              onClick={onToggleLang}
              className="text-xs px-3 py-1 rounded bg-[#2b4c39] text-white font-medium"
            >
              {lang === 'en' ? 'Switch to हिन्दी' : 'Switch to English'}
            </button>
          </div>

          <nav className="flex flex-col gap-2 pt-1 text-sm font-medium text-[#4a3b32]">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              {lang === 'en' ? '🌿 All Natural Products' : '🌿 सभी प्राकृतिक उत्पाद'}
            </a>
            <a
              href="#haircare"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              {lang === 'en' ? '✨ Hair Growth Oils & Packs' : '✨ हेयर ग्रोथ तेल व पैक्स'}
            </a>
            <a
              href="#skincare"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              {lang === 'en' ? '🌸 Glowing Skin & Ubtan' : '🌸 ग्लोइंग स्किन व उबटन'}
            </a>
            <a
              href="#oils"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              {lang === 'en' ? '🫒 Lakdi Ghani Wood-Pressed Oils' : '🫒 लकड़ी घाणी शुद्ध तेल'}
            </a>
            <a
              href="#wellness"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              {lang === 'en' ? '🍯 Raw Honey, Chyawanprash & Masala' : '🍯 शुद्ध शहद, च्यवनप्राश व मसाला'}
            </a>
            <a
              href="#sarika-story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white transition-colors"
            >
              {lang === 'en' ? '👩‍🍳 Sarika\'s Story & 1.6M Community' : '👩‍🍳 सारिका की कहानी'}
            </a>
          </nav>

          <div className="pt-2 border-t border-[#e8dfd3] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="w-full py-2.5 px-3 text-xs font-semibold text-[#1e3a2b] bg-white border border-[#d8ccbe] rounded-lg text-center flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-[#8c6747]" />
              <span>{lang === 'en' ? 'Track Order Status' : 'ऑर्डर स्टेटस ट्रैक करें'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-[#1e3a2b] rounded-lg text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>{lang === 'en' ? 'Find Your Custom Routine' : 'कस्टम आयुर्वेदिक रूटीन खोजें'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
