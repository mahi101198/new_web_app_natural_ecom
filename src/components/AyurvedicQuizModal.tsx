import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShoppingBag, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface AyurvedicQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBundleToCart: (products: Product[]) => void;
  lang: 'en' | 'hi';
}

export const AyurvedicQuizModal: React.FC<AyurvedicQuizModalProps> = ({
  isOpen,
  onClose,
  onAddBundleToCart,
  lang,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<'hair' | 'skin' | 'wellness' | 'cooking'>('hair');
  const [skinType, setSkinType] = useState<'dry' | 'oily' | 'sensitive'>('dry');
  const [preference, setPreference] = useState<'essential' | 'complete'>('complete');

  const handleReset = () => {
    setStep(1);
    setGoal('hair');
    setSkinType('dry');
    setPreference('complete');
  };

  // Determine curated recommendations based on answers
  const recommendedProducts: Product[] = React.useMemo(() => {
    if (goal === 'hair') {
      const p1 = PRODUCTS.find((p) => p.id === 'hair-masala-oil')!;
      const p2 = PRODUCTS.find((p) => p.id === 'herb-hibiscus-shampoo')!;
      const p3 = PRODUCTS.find((p) => p.id === 'protein-hair-pack')!;
      return preference === 'complete' ? [p1, p2, p3] : [p1, p2];
    }
    if (goal === 'skin') {
      const p1 = PRODUCTS.find((p) => p.id === 'bridal-glow-facepack')!;
      const p2 = PRODUCTS.find((p) => p.id === 'rose-hyaluronic-aloe-gel')!;
      const p3 = PRODUCTS.find((p) => p.id === 'face-brightening-serum')!;
      return preference === 'complete' ? [p1, p2, p3] : [p1, p2];
    }
    if (goal === 'cooking') {
      const p1 = PRODUCTS.find((p) => p.id === 'cold-pressed-mustard-oil')!;
      const p2 = PRODUCTS.find((p) => p.id === 'cold-pressed-groundnut-oil')!;
      const p3 = PRODUCTS.find((p) => p.id === 'multipurpose-kitchen-masala')!;
      return [p1, p2, p3];
    }
    // Wellness & immunity
    const p1 = PRODUCTS.find((p) => p.id === '38-herbs-amla-chyawanprash')!;
    const p2 = PRODUCTS.find((p) => p.id === 'organic-honey')!;
    const p3 = PRODUCTS.find((p) => p.id === 'virgin-kalonji-oil')!;
    return preference === 'complete' ? [p1, p2, p3] : [p1, p2];
  }, [goal, skinType, preference]);

  const bundleTotal = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscounted = Math.round(bundleTotal * 0.9); // 10% bundle saving

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#e2d6c7] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8dfd3] bg-[#faf8f5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#8c6747]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1e3a2b]">
                {lang === 'en' ? 'Sarika’s Ayurvedic Routine Finder' : 'कस्टम आयुर्वेदिक रूटीन खोजें'}
              </h3>
              <p className="text-xs text-[#735e50]">
                Answer 3 quick questions to discover your personalized botanical bundle
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quiz"
            className="p-1.5 text-[#5e4f44] hover:text-black rounded-lg hover:bg-[#f4ede4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Steps */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {step <= 3 && (
            <div className="flex items-center justify-between text-xs text-[#735e50] border-b border-[#f0e7db] pb-3">
              <span>Question {step} of 3</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-1.5 rounded-full transition-all ${
                      s <= step ? 'bg-[#1e3a2b]' : 'bg-[#e2d5c5]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Main Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#1e3a2b]">
                What is your primary wellness goal today?
              </h4>
              <p className="text-xs text-[#6e5d50]">
                Choose the main area you want to heal naturally:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'hair', title: 'Severe Hair Fall & Regrowth', desc: 'Slow-cooked herbs for root density & scalp health' },
                  { id: 'skin', title: 'Glowing Skin & Pigmentation', desc: 'Saffron ubtan, pure aloe & botanical serums' },
                  { id: 'wellness', title: 'Immunity & Seasonal Vitality', desc: 'Desi cow ghee Chyawanprash & raw honey' },
                  { id: 'cooking', title: 'Pure Wood-Pressed Cooking', desc: 'Lakdi Ghani mustard, peanut oils & magic masala' },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setGoal(opt.id as any)}
                    className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                      goal === opt.id
                        ? 'bg-[#f4ede4] border-[#1e3a2b] ring-1 ring-[#1e3a2b]'
                        : 'bg-white border-[#d8ccbe] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#1e3a2b] mb-1">{opt.title}</div>
                    <div className="text-[11px] text-[#6b584a]">{opt.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1e3a2b] rounded-lg hover:bg-[#284f3a] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Skin/Hair Type */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#1e3a2b]">
                How would you describe your texture & concern?
              </h4>

              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { id: 'dry', title: 'Dry, brittle or frizzy', desc: 'Needs deep oil moisture, hydration, and lipid barrier repair' },
                  { id: 'oily', title: 'Greasy scalp or acne-prone skin', desc: 'Needs gentle pore clarification without harsh chemicals' },
                  { id: 'sensitive', title: 'Sensitive / Combination', desc: 'Easily irritated by market cosmetics, needs soothing botanicals' },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setSkinType(opt.id as any)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      skinType === opt.id
                        ? 'bg-[#f4ede4] border-[#1e3a2b] ring-1 ring-[#1e3a2b]'
                        : 'bg-white border-[#d8ccbe] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#1e3a2b]">{opt.title}</div>
                    <div className="text-[11px] text-[#6b584a] mt-0.5">{opt.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-[#594a3e] hover:text-black cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1e3a2b] rounded-lg hover:bg-[#284f3a] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Intensity */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-serif text-xl font-bold text-[#1e3a2b]">
                Which treatment routine fits your lifestyle?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'essential', title: 'Essential 2-Step Routine', desc: 'Core daily hero products for quick results' },
                  { id: 'complete', title: 'Complete 3-Step Holistic Ritual', desc: 'Full therapeutic regimen with extra 10% bundle saving' },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setPreference(opt.id as any)}
                    className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                      preference === opt.id
                        ? 'bg-[#f4ede4] border-[#1e3a2b] ring-1 ring-[#1e3a2b]'
                        : 'bg-white border-[#d8ccbe] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <div className="font-semibold text-sm text-[#1e3a2b] mb-1">{opt.title}</div>
                    <div className="text-[11px] text-[#6b584a]">{opt.desc}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-[#594a3e] hover:text-black cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1e3a2b] rounded-lg hover:bg-[#284f3a] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Reveal My Custom Ritual</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Curated Recommendation Output */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 bg-[#f5efe6] rounded-xl border border-[#e4d7c7] text-center space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8c6747]">
                  Curated Specially For You
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#1e3a2b]">
                  {goal === 'hair' && 'The Ayurvedic Hair Fall Recovery Ritual'}
                  {goal === 'skin' && 'The Bridal Radiance & Spot Correction Ritual'}
                  {goal === 'wellness' && 'The Charaka Samhita Rasayana Immunity Kit'}
                  {goal === 'cooking' && 'The Pure Gujarat Kitchen Lakdi Ghani Box'}
                </h4>
                <p className="text-xs text-[#6e5c4f] max-w-md mx-auto">
                  Hand-selected by Sarika to address your exact goals without mineral oils or toxic preservatives.
                </p>
              </div>

              {/* Recommended Items List */}
              <div className="space-y-2.5">
                {recommendedProducts.map((p, idx) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white rounded-xl border border-[#e8dfd3] flex items-center gap-3"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-lg object-cover bg-[#f4ede4] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 text-[11px] text-[#8c6747] font-medium">
                        <span>Step {idx + 1}</span>
                        <span>·</span>
                        <span>{p.size}</span>
                      </div>
                      <h5 className="text-xs font-semibold text-[#1e3a2b] truncate">{p.name}</h5>
                      <p className="text-[11px] text-[#705e50] line-clamp-1">{p.shortDescription}</p>
                    </div>
                    <div className="font-mono text-xs font-bold text-[#1e3a2b] tabular-nums shrink-0">
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Breakdown */}
              <div className="p-3.5 bg-[#faf8f5] rounded-xl border border-[#e8dfd3] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold font-mono text-[#1e3a2b] tabular-nums">
                      ₹{bundleDiscounted.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#8c7b6e] line-through font-mono tabular-nums">
                      ₹{bundleTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    10% Special Bundle Discount Applied!
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddBundleToCart(recommendedProducts);
                    onClose();
                  }}
                  className="py-2 px-4 text-xs font-semibold text-white bg-[#1e3a2b] hover:bg-[#284f3a] rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add All to Cart</span>
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handleReset}
                  className="text-xs text-[#705e50] hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={onClose}
                  className="text-xs font-medium text-[#1e3a2b] hover:underline"
                >
                  Browse Full Catalog Instead
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
