import React from 'react';
import { ArrowRight, Sparkles, Heart, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onQuizClick: () => void;
  lang: 'en' | 'hi';
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onQuizClick, lang }) => {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5] pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#ece4d8]">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f1ebdf] rounded-full blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e6ede6] rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Story, Title, Value Prop, CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Kicker - Zero pill, clean text */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider text-[#8c6747]">
              <span>Handcrafted in Surat, Gujarat</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="text-[#1e3a2b] flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#b84a39] fill-[#b84a39]" />
                1.6M+ Community Trust
              </span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1b3b2b] leading-[1.15]" style={{ textWrap: 'balance' }}>
              {lang === 'en' ? (
                <>
                  Pure, Handmade <span className="italic font-normal text-[#8c6747]">Ayurvedic</span> Care from Our Home to Yours.
                </>
              ) : (
                <>
                  घर का बना शुद्ध <span className="italic font-normal text-[#8c6747]">आयुर्वेदिक</span> पोषण, सीधे आपके परिवार तक।
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#55473d] max-w-2xl leading-relaxed">
              {lang === 'en' ? (
                <>
                  Formulated personally by <strong>Sarika Chaturvedi</strong> using time-honored Indian traditions. 
                  Zero synthetic preservatives, zero mineral oils — only wood-pressed seeds, fresh Himalayan herbs, and raw forest honey crafted in fresh weekly batches.
                </>
              ) : (
                <>
                  <strong>सारिका चतुर्वेदी</strong> द्वारा पारंपरिक भारतीय ज्ञान से तैयार। बिना किसी केमिकल या मिनरल ऑयल के — शुद्ध लकड़ी घाणी तेल, ताज़ी जड़ी-बूटियाँ और शुद्ध शहद।
                </>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#1e3a2b] hover:bg-[#284f3a] rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Shop Bestselling Catalog' : 'सभी उत्पाद देखें'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onQuizClick}
                className="px-6 py-3 text-sm font-semibold text-[#1e3a2b] bg-white hover:bg-[#f5ede3] border border-[#d8ccbe] rounded-lg shadow-2xs transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#8c6747]" />
                <span>{lang === 'en' ? 'Take Routine Quiz (2 mins)' : 'कस्टम रूटीन खोजें'}</span>
              </button>
            </div>

            {/* Adjacency Proof Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e8dfd3]">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#1e3a2b]">100%</div>
                <div className="text-xs text-[#705f52]">Pure & Chemical-Free</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#1e3a2b]">Lakdi Ghani</div>
                <div className="text-xs text-[#705f52]">Cold Wood-Pressed Oils</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#1e3a2b]">1.6M+</div>
                <div className="text-xs text-[#705f52]">Followers on Facebook</div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder & Formulation Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-linear-to-tr from-[#8c6747]/20 via-[#1e3a2b]/10 to-transparent rounded-2xl transform rotate-1 -z-10" />

              <div className="bg-white rounded-xl shadow-md border border-[#e4dacf] overflow-hidden">
                <div className="relative aspect-4/3 overflow-hidden bg-[#e9e3d8]">
                  <img
                    src="/src/assets/images/hero_riddham_ayurveda_1793438756634.jpg"
                    alt="Sarika presenting Riddham Naturals handmade Ayurvedic products"
                    className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white">
                      <div className="text-xs font-medium tracking-wide uppercase text-amber-200">
                        Founder & Culinary Creator
                      </div>
                      <div className="font-serif text-lg font-bold">
                        Sarika Chaturvedi
                      </div>
                      <div className="text-xs text-stone-200">
                        Surat Workshop · @sarikazbeautytips
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Sub-strip with quick highlights */}
                <div className="p-4 bg-[#faf7f2] border-t border-[#ece4d8] space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#52453c]">
                    <span className="flex items-center gap-1.5 font-medium text-[#1e3a2b]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Handmade in small batches
                    </span>
                    <span className="text-[#8c7462]">Gujarat, India</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#52453c]">
                    <span className="flex items-center gap-1.5 font-medium text-[#1e3a2b]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      WhatsApp Direct Ordering
                    </span>
                    <span className="font-mono text-[#1e3a2b] font-semibold">{STORE_INFO.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
