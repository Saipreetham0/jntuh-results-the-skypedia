/**
 * Result Alert Types
 * Email notification system for JNTUH results
 */

export interface ResultAlert {
  id: string;
  rollNumber: string;
  email: string;
  phone?: string;
  notifyVia: ('email' | 'sms' | 'push')[];
  semesters: string[];
  regulations: string[]; // R22, R20, R18, etc.
  isActive: boolean;
  verified: boolean;
  verificationToken?: string;
  createdAt: Date;
  updatedAt: Date;
  lastNotified?: Date;
}

export interface AlertSubscription {
  rollNumber: string;
  email: string;
  phone?: string;
  notifyVia: ('email' | 'sms')[];
  semesters?: string[];
  regulations?: string[];
}

export interface ResultCheckStatus {
  examCode: string;
  regulation: string;
  semester: string;
  status: 'not_declared' | 'declared' | 'checking';
  lastChecked: Date;
  declaredAt?: Date;
}

export interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
}
