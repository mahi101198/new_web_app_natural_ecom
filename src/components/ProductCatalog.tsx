import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, ProductConcern } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onOpenDetail: (p: Product) => void;
  searchQuery: string;
  lang: 'en' | 'hi';
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onOpenDetail,
  searchQuery,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedConcern, setSelectedConcern] = useState<ProductConcern>('all');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('bestseller');

  const categories: { id: ProductCategory; labelEn: string; labelHi: string }[] = [
    { id: 'all', labelEn: 'All Products', labelHi: 'सभी उत्पाद' },
    { id: 'haircare', labelEn: 'Hair Care & Regrowth', labelHi: 'हेयर केयर' },
    { id: 'skincare', labelEn: 'Glowing Skin & Ubtan', labelHi: 'स्किन केयर व उबटन' },
    { id: 'bathbody', labelEn: 'Bath & Artisan Soaps', labelHi: 'बाथ व हर्बल साबुन' },
    { id: 'oils', labelEn: 'Lakdi Ghani Pure Oils', labelHi: 'लकड़ी घाणी तेल' },
    { id: 'wellness', labelEn: 'Honey, Chyawanprash & Spices', labelHi: 'किचन व स्वास्थ्य' },
  ];

  const concerns: { id: ProductConcern; labelEn: string; labelHi: string }[] = [
    { id: 'all', labelEn: 'All Concerns', labelHi: 'सभी समस्याएं' },
    { id: 'hairfall', labelEn: 'Hair Fall & Regrowth', labelHi: 'हेयर फॉल कंट्रोल' },
    { id: 'pigmentation', labelEn: 'Pigmentation & Blemishes', labelHi: 'पिगमेंटेशन व दाग-धब्बे' },
    { id: 'glow', labelEn: 'Instant Radiance & Tan', labelHi: 'नेचुरल ग्लो व टैन' },
    { id: 'dryness', labelEn: 'Dry Skin & Frizz', labelHi: 'रूखापन व नमी' },
    { id: 'immunity', labelEn: 'Immunity & Vitality', labelHi: 'इम्युनिटी व ताक़त' },
    { id: 'pure_cooking', labelEn: 'Pure Cooking & Kitchen', labelHi: 'शुद्ध खानपान' },
  ];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        // Concern filter
        if (selectedConcern !== 'all' && item.concern !== selectedConcern) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchHindi = item.hindiName.toLowerCase().includes(q);
          const matchDesc = item.shortDescription.toLowerCase().includes(q);
          const matchIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
          if (!matchName && !matchHindi && !matchDesc && !matchIngredients) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'bestseller') {
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0;
      });
  }, [products, selectedCategory, selectedConcern, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-12 sm:py-16 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8c6747]">
            {lang === 'en' ? 'Crafted Fresh in Small Batches' : 'ताज़ा छोटे बैच में निर्मित'}
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1e3a2b]">
            {lang === 'en' ? 'Explore Our Pure Organics' : 'हमारा संपूर्ण शुद्ध कैटलॉग'}
          </h2>
          <p className="text-sm text-[#665446]">
            {lang === 'en'
              ? 'Every product is hand-formulated by Sarika with organic herbs, cold-pressed oils, and 0% harmful chemicals.'
              : 'हर उत्पाद सारिका द्वारा शुद्ध जड़ी-बूटियों, लकड़ी घाणी तेलों और बिना किसी केमिकल के हस्तनिर्मित है।'}
          </p>
        </div>

        {/* Category Filter Tabs - Interactive Segmented Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#f0e7dc] rounded-xl overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1e3a2b] text-white shadow-xs font-semibold'
                    : 'text-[#5a483b] hover:text-[#1e3a2b] hover:bg-white/60'
                }`}
              >
                {lang === 'en' ? cat.labelEn : cat.labelHi}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Sort Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Concern pills/filters */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-xs font-medium text-[#7d695b] flex items-center gap-1 whitespace-nowrap shrink-0">
              <Filter className="w-3.5 h-3.5" />
              {lang === 'en' ? 'Concern:' : 'समस्या:'}
            </span>
            <div className="flex items-center gap-1.5">
              {concerns.map((con) => (
                <button
                  key={con.id}
                  onClick={() => setSelectedConcern(con.id)}
                  className={`px-3 py-1 text-xs rounded-full border whitespace-nowrap transition-colors cursor-pointer ${
                    selectedConcern === con.id
                      ? 'bg-[#8c6747] text-white border-[#8c6747] font-semibold'
                      : 'bg-white text-[#57463a] border-[#e2d5c5] hover:border-[#8c6747]'
                  }`}
                >
                  {lang === 'en' ? con.labelEn : con.labelHi}
                </button>
              ))}
            </div>
          </div>

          {/* Sort selector & Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 text-xs">
            <span className="text-[#7d695b] font-mono tabular-nums">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>
            <div className="flex items-center gap-1.5 bg-white border border-[#e2d5c5] rounded-lg px-2.5 py-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8c6747]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-transparent text-xs text-[#2c2420] focus:outline-none cursor-pointer"
              >
                <option value="bestseller">Featured & Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenDetail={onOpenDetail}
                lang={lang}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-xl border border-[#e8dfd3] max-w-md mx-auto space-y-3">
            <Sparkles className="w-8 h-8 text-[#8c6747] mx-auto" />
            <h3 className="font-semibold text-[#1e3a2b]">No products found</h3>
            <p className="text-xs text-[#705e50]">
              Try adjusting your search or clearing active filters to see our full herbal catalog.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedConcern('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1e3a2b] rounded-lg hover:bg-[#2c4e3b] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
