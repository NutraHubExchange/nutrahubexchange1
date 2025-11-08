// Core types for the B2B Nutraceuticals Exchange Platform

export type UserRole = 'buyer' | 'supplier' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName: string;
  avatar?: string;
  createdAt: string;
}

export interface RFQ {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  title: string;
  description: string;
  productCategory: string;
  quantity: number;
  unit: string;
  targetPrice?: number;
  deadline: string;
  status: 'open' | 'closed' | 'awarded';
  certificationRequirements: string[];
  deliveryLocation: string;
  createdAt: string;
  quotesCount: number;
}

export interface Quote {
  id: string;
  rfqId: string;
  supplierId: string;
  supplierName: string;
  supplierCompany: string;
  pricePerUnit: number;
  totalPrice: number;
  leadTime: string;
  notes: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: string;
}

export interface Certification {
  id: string;
  supplierId: string;
  type: string;
  issuingBody: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  documentUrl: string;
  status: 'pending' | 'verified' | 'rejected';
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
}

export interface Dispute {
  id: string;
  rfqId: string;
  quoteId: string;
  initiatedBy: string;
  initiatorName: string;
  respondentId: string;
  respondentName: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  resolvedAt?: string;
  messages: DisputeMessage[];
}

export interface DisputeMessage {
  id: string;
  disputeId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  message: string;
  attachments?: string[];
  timestamp: string;
}

export interface Transaction {
  id: string;
  rfqId: string;
  quoteId: string;
  buyerId: string;
  supplierId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  completedAt?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Supplier {
  id: string;
  companyName: string;
  description: string;
  location: string;
  categories: string[];
  certifications: Certification[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  logo?: string;
  joinedAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  maxRfqs?: number;
  maxQuotes?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  invitedAt: string;
  status: 'active' | 'pending' | 'suspended';
}
