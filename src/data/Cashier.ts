export interface Transaction {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  cashier: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
   phone?: string;
  status: "pending" | "approved";
}

export interface Cashier {
  id: string;
  name: string;
  email: string;
}