// =============================================================================
// EcoSwap 🌱 - TypeScript Common Types & Interfaces (Fase 3)
// =============================================================================

export type SubscriptionTier = 'FREE' | 'PREMIUM';
export type UserRole = 'USER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED';
export type AdCampaignStatus = 'ACTIVE' | 'PAUSED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  subscriptionTier: SubscriptionTier;
  stripeCustomerId?: string | null;
  mercadoPagoId?: string | null;
  subscriptionExpiresAt?: Date | string | null;
  ecoPoints: number;
  streakDays: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  price: number;
  stock: number;
  condition: string;
  imageUrl: string;
  distance?: string | null;
  co2Savings: number;
  isSponsored: boolean;
  isExclusive: boolean;
  userId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AdCampaign {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  budget: number;
  status: AdCampaignStatus;
  clicks: number;
  impressions: number;
  createdById?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CartCalculation {
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  ecoPointsEarned: number;
  isPremium: boolean;
}

