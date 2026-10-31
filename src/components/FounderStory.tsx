import React from 'react';
import { Award, Users, Heart, Sparkles, CheckCircle2, Play, Instagram, Facebook, Youtube } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface FounderStoryProps {
  lang: 'en' | 'hi';
}

export const FounderStory: React.FC<FounderStoryProps> = ({ lang }) => {
  return (
    <section id="sarika-story" className="py-16 bg-white border-b border-[#ece4d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid: Story Text + Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual collage with real community proof */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#e2d5c5] shadow-md bg-[#f7f2eb]">
              <img
                src="/src/assets/images/founder_sarika_workshop_1793438758342.jpg"
                alt="Sarika Chaturvedi crafting Ayurvedic herbs and botanicals in her Surat workshop"
                className="w-full aspect-4/3 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-[#faf7f2] border-t border-[#e8dfd3]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#1e3a2b] text-white flex items-center justify-center font-serif font-bold text-xs">
                      CC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1e3a2b]">Creative class sarika</div>
                      <div className="text-[11px] text-[#786455]">Digital Creator · Surat, Gujarat</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#1e3a2b]">1.6M+</span>
                    <div className="text-[10px] text-[#8c6747] uppercase tracking-wider font-semibold">Followers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Proof badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#fdfaf5] border border-[#e8dfd3] rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1e3a2b]">
                  <Award className="w-3.5 h-3.5 text-[#8c6747]" />
                  <span>BHU Alumnus</span>
                </div>
                <p className="text-[11px] text-[#705e50]">
                  Banaras Hindu University, Varanasi education rooted in culture.
                </p>
              </div>

              <div className="p-3 bg-[#fdfaf5] border border-[#e8dfd3] rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#1e3a2b]">
                  <Users className="w-3.5 h-3.5 text-[#2d5640]" />
                  <span>160K+ Instagram</span>
                </div>
                <p className="text-[11px] text-[#705e50]">
                  Active daily home remedies on @sarikazbeautytips.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story Prose */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8c6747]">
              {lang === 'en' ? 'Meet The Founder' : 'संस्थापक से मिलें'}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e3a2b] leading-snug">
              {lang === 'en' ? (
                <>
                  "I started making these in my own kitchen because my family deserved purity, not chemicals."
                </>
              ) : (
                <>
                  "मैंने इसे अपनी रसोई से शुरू किया, क्योंकि मेरा परिवार शुद्धता का हकदार था।"
                </>
              )}
            </h2>

            <div className="space-y-4 text-sm text-[#54463c] leading-relaxed">
              <p>
                Namaste! I am <strong>Sarika Chaturvedi</strong>, the creator behind <em>Creative Class Sarika</em>. For years, through my cooking videos and traditional Indian vegetarian recipes, I connected with millions of households across India who yearned for authentic, chemical-free living.
              </p>
              <p>
                When searching for remedies for persistent postpartum hair loss and skin blemishes, I was disheartened by commercial cosmetics filled with mineral oils, cheap petroleum bases, and artificial silicones pretending to be "herbal."
              </p>
              <p>
                That is why I created <strong>Riddham Naturals</strong> in Surat, Gujarat. We revive authentic Ayurvedic preparation methods:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Pure Wood-Pressed (Lakdi Ghani) seed oils extracted cold',
                  '21 herbs infused slowly in copper vessels without harmful boiling',
                  '100% fresh inner-leaf aloe vera scooped by hand weekly',
                  'Raw, unpasteurized forest honey and wild mountain herbs',
                  'Traditional Desi A2 Cow Ghee base in our Chyawanprash',
                  'Strictly zero artificial colors, synthetic fragrances, or fillers',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#3a2f27]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="pt-2">
                Every bottle shipped from our workshop carries my personal guarantee of handmade sincerity. We take orders directly on WhatsApp so you can talk to us, understand your routine, and receive fresh batches crafted this very week.
              </p>
            </div>

            {/* Social channels lockup */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#ece4d8]">
              <span className="text-xs font-semibold text-[#1e3a2b]">Connect with Sarika:</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1e3a2b] bg-[#faf8f5] border border-[#d8ccbe] rounded-lg hover:bg-white transition-colors"
              >
                <Facebook className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                <span>Facebook (1.6M Followers)</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1e3a2b] bg-[#faf8f5] border border-[#d8ccbe] rounded-lg hover:bg-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@sarikazbeautytips (160K+)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
