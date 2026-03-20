export type LoanStatus = "pending" | "approved" | "rejected" | "review";

export interface Loan {
  id: string;
  name: string;
  amount: number;
  duration: number;
  status: LoanStatus;
  creditScore: number;
  income: number;
  date: string;
}

export const loans: Loan[] = [
  {
    id: "LN001",
    name: "John Doe",
    amount: 500000,
    duration: 12,
    status: "pending",
    creditScore: 720,
    income: 150000,
    date: "2026-03-19",
  },
  {
    id: "LN002",
    name: "Jane Smith",
    amount: 200000,
    duration: 6,
    status: "approved",
    creditScore: 680,
    income: 100000,
    date: "2026-03-18",
  },
  {
    id: "LN003",
    name: "John Smith",
    amount: 300000,
    duration: 1,
    status: "rejected",
    creditScore: 80,
    income: 210000,
    date: "2026-05-18",
  },
  {
    id: "LN004",
    name: "John Doe",
    amount: 250000,
    duration: 5,
    status: "approved",
    creditScore: 540,
    income: 500000,
    date: "2026-05-18",
  },
  {
    id: "LN005",
    name: "Femi Smith",
    amount: 300000,
    duration: 23,
    status: "pending",
    creditScore: 800,
    income: 300000,
    date: "2026-06-18",
  },
];