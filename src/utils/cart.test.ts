import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals, generateWhatsAppOrderUrl, validateNewsletterEmail, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from './cart';
import { PRODUCTS } from '../data/products';
import { CartItem, Product, OrderDetails } from '../types';

const mockProductA: Product = {
  id: 'prod-a',
  name: 'Herb Infused Masala Hair Oil',
  hindiName: '21 जड़ी-बूटियों का तेल',
  category: 'haircare',
  concern: 'hairfall',
  price: 1600,
  originalPrice: 1800,
  size: '200g',
  rating: 4.9,
  reviewCount: 120,
  inStock: true,
  shortDescription: 'Slow-cooked herbal hair oil',
  fullDescription: 'Pure Ayurvedic concoction',
  ingredients: ['Amla', 'Bhringraj'],
  benefits: ['Reduces hair fall'],
  howToUse: 'Apply twice a week',
  image: '/src/assets/images/prod_masala_hair_oil_1793438759046.jpg',
};

const mockProductB: Product = {
  id: 'prod-b',
  name: 'Organic Honey',
  hindiName: 'शुद्ध जंगली शहद',
  category: 'wellness',
  concern: 'pure_cooking',
  price: 580,
  originalPrice: 600,
  size: '250g',
  rating: 4.8,
  reviewCount: 88,
  inStock: true,
  shortDescription: 'Raw forest honey',
  fullDescription: '100% unfiltered raw honey',
  ingredients: ['Wild Honey'],
  benefits: ['Immunity booster'],
  howToUse: 'Take 1 spoon with warm water',
  image: '/src/assets/images/prod_chyawanprash_honey_masala_1793438774831.jpg',
};

test('calculateCartTotals calculates subtotal and free shipping above threshold', () => {
  const items: CartItem[] = [{ product: mockProductA, quantity: 1 }];
  const totals = calculateCartTotals(items);

  assert.equal(totals.subtotal, 1600);
  assert.equal(totals.shipping, 0); // >= 999 is free shipping
  assert.equal(totals.freeShippingRemaining, 0);
  assert.equal(totals.total, 1600);
  assert.equal(totals.savings, 200); // 1800 - 1600
});

test('calculateCartTotals adds shipping fee below threshold', () => {
  const items: CartItem[] = [{ product: mockProductB, quantity: 1 }];
  const totals = calculateCartTotals(items);

  assert.equal(totals.subtotal, 580);
  assert.equal(totals.shipping, STANDARD_SHIPPING_FEE);
  assert.equal(totals.freeShippingRemaining, FREE_SHIPPING_THRESHOLD - 580);
  assert.equal(totals.total, 580 + STANDARD_SHIPPING_FEE);
  assert.equal(totals.savings, 20); // 600 - 580
});

test('calculateCartTotals applies percentage coupon code correctly', () => {
  const items: CartItem[] = [{ product: mockProductA, quantity: 1 }];
  const totals = calculateCartTotals(items, 'SARIKA10'); // 10% off on >= 800

  assert.equal(totals.subtotal, 1600);
  assert.equal(totals.discount, 160); // 10% of 1600
  assert.equal(totals.total, 1600 - 160);
  assert.equal(totals.savings, 200 + 160);
});

test('generateWhatsAppOrderUrl builds valid wa.me link with order details', () => {
  const items: CartItem[] = [{ product: mockProductA, quantity: 1 }];
  const totals = calculateCartTotals(items);
  const order: OrderDetails = {
    orderId: 'RID-1234',
    customerName: 'Aarti Patel',
    phone: '+91 99887 76655',
    address: '42, Green Park',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395007',
    paymentMethod: 'whatsapp',
    items,
    totals,
    timestamp: '2026-10-31',
    status: 'Order Placed',
  };

  const url = generateWhatsAppOrderUrl(order, '918238163069');
  assert.ok(url.startsWith('https://wa.me/918238163069?text='));
  assert.ok(decodeURIComponent(url).includes('RID-1234'));
  assert.ok(decodeURIComponent(url).includes('Aarti Patel'));
  assert.ok(decodeURIComponent(url).includes('Herb Infused Masala Hair Oil'));
});

test('validateNewsletterEmail validates email format properly', () => {
  assert.equal(validateNewsletterEmail('').valid, false);
  assert.equal(validateNewsletterEmail('invalid-email').valid, false);
  assert.equal(validateNewsletterEmail('ananya@riddhamnaturals.in').valid, true);
});

test('all catalog products use genuine studio photography and zero WhatsApp screenshots', () => {
  assert.ok(PRODUCTS.length > 20);
  for (const p of PRODUCTS) {
    assert.ok(
      p.image.startsWith('/src/assets/images/prod_'),
      `Expected studio image for ${p.id}, got ${p.image}`
    );
    assert.equal(p.image.includes('WhatsApp'), false);
  }
});

