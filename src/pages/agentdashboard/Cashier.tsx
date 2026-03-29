import { useState } from "react";
import CashierStats from "../../components/cashier/CashierStats";
import TransactionsTable from "../../components/cashier/TransactionTable";
import CustomerTable from "../../components/cashier/CustomerTable";
import AddCustomerModal from "../../components/cashier/AddCustomerModal";
import CreateCashierModal from "../../components/cashier/AddCashierModal";




interface Transaction {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  cashier: string;
  date: string;
}
interface customers {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved";
  phone?: string;
}


export default function Cashier() {
  const [transactions] = useState<Transaction[]>([
    { id: "1", amount: 50000, type: "deposit", cashier: "John", date: "Today" },
    { id: "2", amount: 20000, type: "withdrawal", cashier: "Jane", date: "Today" },
  ]);

  const [customers, setCustomers] = useState<customers[]>([
    { id: "1", name: "Mike", email: "mike@mail.com", status: "pending" },
  ]);

  const approveCustomer = (id: string) => {
    setCustomers(prev =>
      prev.map(c => (c.id === id ? { ...c, status: "approved" } : c))
    );
  };

  // const addCustomer = (name: string, email: string) => {
  //   setCustomers(prev => [
  //     ...prev,
  //     { id: Math.random().toString(), name, email, status: "pending" },
  //   ]);
  // };

  const createCashier = (name: string, email: string) => {
    console.log("New cashier:", name, email);
  };
  const [open, setOpen] = useState(false);

  const handleAdd = (name: string, email: string, phone: string) => {
    console.log({ name, email, phone });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      <CashierStats transactions={transactions} />

      <div className="grid md:grid-cols-2 gap-4">
        <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Customer
      </button>

      <AddCustomerModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAdd={handleAdd}
      />
        <CreateCashierModal onCreate={createCashier} />
      </div>

      <CustomerTable
        customers={customers}
        approveCustomer={approveCustomer}
      />

      <TransactionsTable transactions={transactions} />
    </div>
  );
}