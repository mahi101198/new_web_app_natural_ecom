export type ProductCategory = 
  | 'all' 
  | 'haircare' 
  | 'skincare' 
  | 'bathbody' 
  | 'oils' 
  | 'wellness';

export type ProductConcern = 
  | 'all'
  | 'hairfall'
  | 'pigmentation'
  | 'glow'
  | 'dryness'
  | 'immunity'
  | 'pure_cooking'
  | 'dailyhealth';

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  category: ProductCategory;
  concern: ProductConcern;
  price: number;
  originalPrice: number;
  size: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  image: string;
  isBestseller?: boolean;
  isHandmadeFresh?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  freeShippingRemaining: number;
  total: number;
  savings: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'whatsapp' | 'upi' | 'cod';
  notes?: string;
  items: CartItem[];
  totals: CartTotals;
  timestamp: string;
  status: 'Order Placed' | 'Confirmed' | 'Fresh Batch Prepared' | 'Shipped' | 'Out for Delivery';
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  productName: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}
