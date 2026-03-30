import type { Customer, Loan, Notification, Transaction, ActivityLog } from './types';

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    customerId: 'CUST-001',
    customerName: 'Rahim Ahmed',
    loanId: 'LOAN-101',
    amount: 500000,
    type: 'disbursement',
    status: 'completed',
    date: '2024-03-12'
  },
  {
    id: 'TXN-002',
    customerId: 'CUST-002',
    customerName: 'Sumaiya Akter',
    loanId: 'LOAN-102',
    amount: 15000,
    type: 'fee',
    status: 'completed',
    date: '2024-03-26'
  },
  {
    id: 'TXN-003',
    customerId: 'CUST-001',
    customerName: 'Rahim Ahmed',
    loanId: 'LOAN-101',
    amount: 25000,
    type: 'repayment',
    status: 'completed',
    date: '2024-03-28'
  },
  {
    id: 'TXN-004',
    customerId: 'CUST-004',
    customerName: 'Nusrat Jahan',
    loanId: 'LOAN-103',
    amount: 10000,
    type: 'fee',
    status: 'failed',
    date: '2024-03-01'
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'LOG-1',
    action: 'Loan Submitted',
    user: 'Mercy Goodness',
    timestamp: '2024-03-29 14:30',
    details: 'Submitted loan LOAN-102 for Sumaiya Akter',
    type: 'loan'
  },
  {
    id: 'LOG-2',
    action: 'Customer Registered',
    user: 'Mercy Goodness',
    timestamp: '2024-03-29 10:15',
    details: 'Registered new customer Nusrat Jahan',
    type: 'customer'
  },
  {
    id: 'LOG-3',
    action: 'Login',
    user: 'Mercy Goodness',
    timestamp: '2024-03-29 08:00',
    details: 'User logged into the dashboard',
    type: 'auth'
  },
  {
    id: 'LOG-4',
    action: 'Settings Updated',
    user: 'Mercy Goodness',
    timestamp: '2024-03-28 16:45',
    details: 'Updated notification preferences',
    type: 'system'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Rahim Ahmed',
    phone: '+880 1711-223344',
    email: 'rahim.ahmed@example.com',
    status: 'active',
    joinedDate: '2024-01-15',
    address: 'Dhaka, Bangladesh',
    occupation: 'Software Engineer',
    income: 85000
  },
  {
    id: 'CUST-002',
    name: 'Sumaiya Akter',
    phone: '+880 1822-334455',
    email: 'sumaiya.a@example.com',
    status: 'active',
    joinedDate: '2024-02-10',
    address: 'Chittagong, Bangladesh',
    occupation: 'Teacher',
    income: 45000
  },
  {
    id: 'CUST-003',
    name: 'Karim Ullah',
    phone: '+880 1933-445566',
    email: 'karim.u@example.com',
    status: 'inactive',
    joinedDate: '2023-11-20',
    address: 'Sylhet, Bangladesh',
    occupation: 'Business Owner',
    income: 120000
  },
  {
    id: 'CUST-004',
    name: 'Nusrat Jahan',
    phone: '+880 1644-556677',
    email: 'nusrat.j@example.com',
    status: 'active',
    joinedDate: '2024-03-05',
    address: 'Rajshahi, Bangladesh',
    occupation: 'Doctor',
    income: 95000
  }
];

export const mockLoans: Loan[] = [
  {
    id: 'LOAN-101',
    customerId: 'CUST-001',
    customerName: 'Rahim Ahmed',
    amount: 500000,
    duration: 24,
    interestType: 'fixed',
    status: 'approved',
    dateSubmitted: '2024-03-10',
    documents: ['NID.pdf', 'IncomeProof.pdf']
  },
  {
    id: 'LOAN-102',
    customerId: 'CUST-002',
    customerName: 'Sumaiya Akter',
    amount: 150000,
    duration: 12,
    interestType: 'reducing',
    status: 'pending',
    dateSubmitted: '2024-03-25',
    documents: ['NID.pdf']
  },
  {
    id: 'LOAN-103',
    customerId: 'CUST-004',
    customerName: 'Nusrat Jahan',
    amount: 1000000,
    duration: 36,
    interestType: 'fixed',
    status: 'rejected',
    dateSubmitted: '2024-02-28',
    documents: ['NID.pdf', 'TaxReturn.pdf']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'N-1',
    title: 'Loan Approved',
    message: 'Loan application LOAN-101 for Rahim Ahmed has been approved.',
    type: 'success',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'N-2',
    title: 'New Customer Added',
    message: 'Nusrat Jahan has been successfully registered.',
    type: 'info',
    timestamp: '1 day ago',
    read: true
  }
];
