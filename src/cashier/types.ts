export type View = 'dashboard' | 'customers' | 'loans' | 'transactions' | 'notifications' | 'settings' | 'new-loan';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  address?: string;
  occupation?: string;
  income?: number;
}

export interface Loan {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  duration: number;
  interestType: 'fixed' | 'reducing';
  status: 'pending' | 'approved' | 'rejected' | 'disbursed';
  dateSubmitted: string;
  documents?: string[];
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  loanId?: string;
  type: 'disbursement' | 'repayment' | 'fee';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'success' | 'warning' | 'error' | 'info';
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'loan' | 'customer' | 'auth' | 'system';
  user: string;
}

export interface Settings {
  notifications: boolean;
  twoFactor: boolean;
  biometric: boolean;
  language: string;
}
