import { CartItem, CartTotals, OrderDetails } from '../types';

export const FREE_SHIPPING_THRESHOLD = 999;
export const STANDARD_SHIPPING_FEE = 70;

export const AVAILABLE_COUPONS: Record<string, { percent?: number; flat?: number; minOrder: number }> = {
  SARIKA10: { percent: 10, minOrder: 800 },
  WELCOME50: { flat: 50, minOrder: 500 },
  FESTIVE15: { percent: 15, minOrder: 1500 },
};

/**
 * Calculates cart subtotal, shipping, discounts, and total savings.
 */
export function calculateCartTotals(items: CartItem[], couponCode: string = ''): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalMrp = items.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);

  const cleanCoupon = couponCode.trim().toUpperCase();
  let couponDiscount = 0;

  if (cleanCoupon && AVAILABLE_COUPONS[cleanCoupon]) {
    const coupon = AVAILABLE_COUPONS[cleanCoupon];
    if (subtotal >= coupon.minOrder) {
      if (coupon.percent) {
        couponDiscount = Math.round((subtotal * coupon.percent) / 100);
      } else if (coupon.flat) {
        couponDiscount = coupon.flat;
      }
    }
  }

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const total = Math.max(0, subtotal - couponDiscount + shipping);
  const catalogSavings = Math.max(0, totalMrp - subtotal);
  const savings = catalogSavings + couponDiscount;

  return {
    itemCount,
    subtotal,
    discount: couponDiscount,
    shipping,
    freeShippingRemaining,
    total,
    savings,
  };
}

/**
 * Generates an Indian WhatsApp direct checkout text message and link
 * pointing to Sarika's actual registered WhatsApp: +91 82381 63069
 */
export function generateWhatsAppOrderUrl(order: OrderDetails, businessPhone: string = '918238163069'): string {
  const itemList = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (${item.product.size})\n   Qty: ${item.quantity} × ₹${item.product.price.toLocaleString('en-IN')} = ₹${(
          item.product.price * item.quantity
        ).toLocaleString('en-IN')}`
    )
    .join('\n');

  const textLines = [
    `🌿 *New Order Request | Riddham Naturals*`,
    `----------------------------------------`,
    `📋 *Order ID:* #${order.orderId}`,
    `👤 *Customer:* ${order.customerName}`,
    `📞 *Phone:* ${order.phone}`,
    order.email ? `📧 *Email:* ${order.email}` : '',
    `📍 *Delivery Address:*`,
    `${order.address}, ${order.city}, ${order.state} - ${order.pincode}`,
    order.notes ? `📝 *Special Note:* ${order.notes}` : '',
    ``,
    `🛒 *Items Ordered:*`,
    itemList,
    ``,
    `----------------------------------------`,
    `💵 *Subtotal:* ₹${order.totals.subtotal.toLocaleString('en-IN')}`,
    order.totals.discount > 0 ? `🏷️ *Discount Applied:* -₹${order.totals.discount.toLocaleString('en-IN')}` : '',
    `🚚 *Shipping:* ${order.totals.shipping === 0 ? 'FREE' : `₹${order.totals.shipping}`}`,
    `💰 *TOTAL AMOUNT PAYABLE:* ₹${order.totals.total.toLocaleString('en-IN')}`,
    `💳 *Payment Preference:* ${order.paymentMethod.toUpperCase()}`,
    `----------------------------------------`,
    `🙏 *Namaste Sarika ji! Please confirm availability, fresh batch dispatch date, and share UPI QR / Payment link.*`,
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${businessPhone}?text=${encodeURIComponent(textLines)}`;
}

/**
 * Simulates real-time order tracking for the home business
 */
export function mockTrackOrder(trackingQuery: string): OrderDetails | null {
  const query = trackingQuery.trim().toLowerCase();
  if (!query) return null;

  // If phone matches or order id matches
  return {
    orderId: 'RID-8942',
    customerName: 'Pooja Verma',
    phone: '+91 98201 44521',
    address: 'B-402, Shivalik Residency, Adajan',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395009',
    paymentMethod: 'upi',
    status: 'Fresh Batch Prepared',
    timestamp: 'Today, 10:30 AM',
    items: [
      {
        product: {
          id: 'hair-masala-oil',
          name: '21 Herbs & 7 Oils Infused Hair Growth Masala Oil',
          hindiName: '21 जड़ी-बूटियों का हेयर ग्रोथ मसाला तेल',
          category: 'haircare',
          concern: 'hairfall',
          price: 1600,
          originalPrice: 1800,
          size: '200 ml',
          rating: 4.9,
          reviewCount: 342,
          inStock: true,
          shortDescription: 'Slow-cooked traditional herbal oil for extreme hair fall control & density.',
          fullDescription: 'Handmade by Sarika using 21 fresh Ayurvedic herbs and 7 cold-pressed pure oils.',
          ingredients: ['Bhringraj', 'Amla', 'Brahmi', 'Fenugreek', 'Kalonji', 'Hibiscus', 'Neem', 'Curry Leaves'],
          benefits: ['Stops hair fall within 14 days', 'Nourishes dry scalp', 'Prevents premature greying'],
          howToUse: 'Gently massage warm oil into scalp 2-3 times a week before washing.',
          image: '/src/assets/images/prod_masala_hair_oil_1793438759046.jpg',
        },
        quantity: 1,
      },
    ],
    totals: {
      itemCount: 1,
      subtotal: 1600,
      discount: 0,
      shipping: 0,
      freeShippingRemaining: 0,
      total: 1600,
      savings: 200,
    },
  };
}

/**
 * Validates user email for the Join Our Wellness Circle newsletter signup
 */
export function validateNewsletterEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address (e.g., priya@example.com).' };
  }
  return { valid: true };
}

