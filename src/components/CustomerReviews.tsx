import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { REVIEWS } from '../data/products';

interface CustomerReviewsProps {
  lang: 'en' | 'hi';
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ lang }) => {
  return (
    <section className="py-16 bg-[#faf8f5] border-b border-[#ece4d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8c6747]">
            {lang === 'en' ? 'Verified Buyer Experiences' : 'सत्यापित ग्राहकों के अनुभव'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1e3a2b]">
            {lang === 'en' ? 'Loved by 1.6 Million+ Families' : 'हजारों परिवारों का अटूट विश्वास'}
          </h2>
          <p className="text-sm text-[#665446]">
            Real results from customers using our wood-pressed oils, hair regrowth masala, and bridal facepacks.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white rounded-xl border border-[#e8dfd3] shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars & Verified Marker */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Product Mention */}
                <div className="text-xs font-semibold text-[#8c6747] line-clamp-1">
                  {rev.productName}
                </div>

                {/* Comment */}
                <p className="text-xs text-[#52443a] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & City */}
              <div className="pt-3 border-t border-[#f0e7db] text-xs">
                <div className="font-bold text-[#1e3a2b]">{rev.author}</div>
                <div className="text-[11px] text-[#786455]">{rev.location} · {rev.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
