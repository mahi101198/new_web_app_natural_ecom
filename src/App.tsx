import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBadges } from './components/TrustBadges';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AyurvedicQuizModal } from './components/AyurvedicQuizModal';
import { FounderStory } from './components/FounderStory';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { PRODUCTS, STORE_INFO } from './data/products';
import { CartItem, Product, OrderDetails } from './types';
import { calculateCartTotals, generateWhatsAppOrderUrl } from './utils/cart';
import { MessageCircle, Check, ArrowUp } from 'lucide-react';

export default function App() {
  // Cart state initialized with 1 popular item so the store feels lively immediately
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('riddham_cart_v2');
      if (saved) {
        const parsed: CartItem[] = JSON.parse(saved);
        return parsed.map((item) => {
          const freshProd = PRODUCTS.find((p) => p.id === item.product.id);
          return freshProd ? { ...item, product: freshProd } : item;
        });
      }
    } catch (e) {
      // fallback
    }
    const defaultProduct = PRODUCTS[0]; // 21 herbs hair oil
    return [{ product: defaultProduct, quantity: 1 }];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('riddham_cart_v2', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to your bag!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddBundleToCart = (bundle: Product[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      bundle.forEach((p) => {
        const idx = updated.findIndex((i) => i.product.id === p.id);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        } else {
          updated.push({ product: p, quantity: 1 });
        }
      });
      return updated;
    });
    showToast(`Added full 3-step Ayurvedic bundle to your bag!`);
    setIsCartOpen(true);
  };

  const handleProceedToCheckout = (coupon: string) => {
    setActiveCoupon(coupon);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleDirectWhatsAppCheckout = (coupon: string) => {
    const totals = calculateCartTotals(cartItems, coupon);
    const mockOrder: OrderDetails = {
      orderId: `RID-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: 'Customer',
      phone: 'To be provided on WhatsApp',
      address: 'Delivery address on WhatsApp',
      city: 'Gujarat/India',
      state: 'India',
      pincode: '------',
      paymentMethod: 'whatsapp',
      items: cartItems,
      totals,
      timestamp: new Date().toLocaleString('en-IN'),
      status: 'Order Placed',
    };
    const waUrl = generateWhatsAppOrderUrl(mockOrder, '918238163069');
    window.open(waUrl, '_blank');
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setConfirmedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]); // Clear cart
  };

  const handleOpenTrackingWithId = (orderId: string) => {
    setTrackingOrderId(orderId);
    setConfirmedOrder(null);
    setIsTrackingOpen(true);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c2420] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e3a2b] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={scrollToCatalog}
          onQuizClick={() => setIsQuizOpen(true)}
          lang={lang}
        />

        {/* 4-Zone Domain Trust Strip */}
        <TrustBadges lang={lang} />

        {/* Product Catalog Grid with category & concern filters */}
        <ProductCatalog
          products={PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenDetail={(product) => setActiveProductDetail(product)}
          searchQuery={searchQuery}
          lang={lang}
        />

        {/* Sarika's Authentic Story & Community Proof */}
        <FounderStory lang={lang} />

        {/* Real Customer Experiences & Testimonials */}
        <CustomerReviews lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        lang={lang}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onDirectWhatsAppCheckout={handleDirectWhatsAppCheckout}
        lang={lang}
      />

      <OrderCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        coupon={activeCoupon}
        onOrderSuccess={handleOrderSuccess}
        lang={lang}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onTrackOrder={handleOpenTrackingWithId}
        lang={lang}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderId={trackingOrderId}
        lang={lang}
      />

      <AyurvedicQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddBundleToCart={handleAddBundleToCart}
        lang={lang}
      />

      {/* Floating Action Button: Quick WhatsApp Order Consultation */}
      <a
        href={`https://wa.me/918238163069?text=${encodeURIComponent(
          'Namaste Sarika ji! I am browsing your Riddham Naturals website and would like advice on placing an order.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group active:scale-95"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
          Chat with Sarika
        </span>
      </a>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-30 bg-white/90 hover:bg-white text-[#1e3a2b] p-2.5 rounded-full border border-[#d8ccbe] shadow-md transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
