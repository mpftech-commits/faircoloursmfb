import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  type Customer,
  type Transaction,
  type Settings as SettingsType,
  type Loan,
  type Notification,
  type ActivityLog,
} from "../types";
import {
  mockCustomers,
  mockLoans,
  mockNotifications,
  mockTransactions,
  mockActivityLogs,
} from "../mockData";

interface DashboardContextType {
  // UI State
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Data State
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (txn: Transaction | null) => void;
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;

  // Loan Process State
  loanStep: number;
  setLoanStep: (step: number) => void;
  newLoanData: Partial<Loan>;
  setNewLoanData: (data: Partial<Loan>) => void;

  // Mock Data
  customers: Customer[];
  loans: Loan[];
  notifications: Notification[];
  transactions: Transaction[];
  activityLogs: ActivityLog[];

  // Filtered Data
  filteredLoans: Loan[];
  filteredCustomers: Customer[];
  filteredTransactions: Transaction[];

  // Actions
  handleApplyLoan: (customer?: Customer) => void;
  exportToCSV: (data: any[], filename: string) => void;
  getTransactionDetails: (txn: Transaction) => {
    customer: Customer | undefined;
    loan: Loan | null | undefined;
  };
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const [settings, setSettings] = useState<SettingsType>({
    notifications: true,
    twoFactor: false,
    language: "English",
    biometric: false,
  });

  const [loanStep, setLoanStep] = useState<number>(1);
  const [newLoanData, setNewLoanData] = useState<Partial<Loan>>({
    customerId: "",
    amount: 0,
    duration: 12,
    interestType: "fixed",
    documents: [],
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const filteredLoans = useMemo(() => {
    return mockLoans.filter(
      (loan) =>
        loan.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loan.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(
      (cust) =>
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.phone.includes(searchQuery),
    );
  }, [searchQuery]);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(
      (txn) =>
        txn.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleApplyLoan = (customer?: Customer) => {
    if (customer) {
      setNewLoanData((prev) => ({
        ...prev,
        customerId: customer.id,
        customerName: customer.name,
      }));
      setLoanStep(2);
    } else {
      setLoanStep(1);
    }
    navigate("loans/new");
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((obj) =>
      Object.values(obj)
        .map((val) =>
          typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val,
        )
        .join(","),
    );
    const csvContent =
      "data:text/csv;charset=utf-8," + headers + "\n" + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTransactionDetails = (txn: Transaction) => {
    const customer = mockCustomers.find((c) => c.id === txn.customerId);
    const loan = txn.loanId ? mockLoans.find((l) => l.id === txn.loanId) : null;
    return { customer, loan };
  };

  const value = {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    searchQuery,
    setSearchQuery,
    darkMode,
    setDarkMode,
    showNotifications,
    setShowNotifications,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    selectedTransaction,
    setSelectedTransaction,
    settings,
    setSettings,
    loanStep,
    setLoanStep,
    newLoanData,
    setNewLoanData,
    customers: mockCustomers,
    loans: mockLoans,
    notifications: mockNotifications,
    transactions: mockTransactions,
    activityLogs: mockActivityLogs,
    filteredLoans,
    filteredCustomers,
    filteredTransactions,
    handleApplyLoan,
    exportToCSV,
    getTransactionDetails,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
