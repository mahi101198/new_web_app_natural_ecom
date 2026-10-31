import React from 'react';
import { Droplet, Leaf, Sparkles, Truck, ShieldCheck, HeartHandshake } from 'lucide-react';

interface TrustBadgesProps {
  lang: 'en' | 'hi';
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ lang }) => {
  const badges = [
    {
      icon: Leaf,
      title: lang === 'en' ? '100% Herb & Flower Infused' : '100% ताज़ी जड़ी-बूटियाँ',
      desc: lang === 'en' ? 'No chemical foaming agents, silicones, or toxic sulfates' : 'कोई हानिकारक केमिकल, सल्फेट या पैराबेन नहीं',
    },
    {
      icon: Droplet,
      title: lang === 'en' ? 'Wood-Pressed Lakdi Ghani Oils' : 'लकड़ी घाणी से शुद्ध निष्कर्षण',
      desc: lang === 'en' ? 'Slow traditional extraction preserving natural antioxidants' : 'धीमी गति से प्राकृतिक पोषक तत्वों को सुरक्षित रखते हुए',
    },
    {
      icon: Sparkles,
      title: lang === 'en' ? 'Fresh Small Batch Crafting' : 'ताज़ा छोटे बैच में तैयार',
      desc: lang === 'en' ? 'Prepared weekly in Sarika\'s workshop in Surat' : 'हर हफ्ते सूरत में सारिका द्वारा ताज़ा तैयार',
    },
    {
      icon: Truck,
      title: lang === 'en' ? 'Fast All-India Shipping' : 'पूरे भारत में सुरक्षित डिलीवरी',
      desc: lang === 'en' ? 'Free delivery on orders above ₹999 with live tracking' : '₹999 से अधिक पर मुफ़्त डिलीवरी व ट्रैकिंग',
    },
  ];

  return (
    <section className="bg-white py-8 border-b border-[#ece4d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[#f4ede4] text-[#1e3a2b] shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-[#2d5640]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[#2c2420]">{b.title}</h3>
                  <p className="text-xs text-[#6e5d50] leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
