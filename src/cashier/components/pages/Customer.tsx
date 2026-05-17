import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  CreditCard,
  Clock1,
  Users,
  Loader,
} from "lucide-react";
import { StatusBadge, Button, Card } from "../ui";
// import { mockCustomers } from "../../mockData";
import { GetCustomers } from "../../../services/Axios";
import { NewLoanModal } from "./NewLoan";
import { Link } from "react-router-dom";
import CustomerDetail from "../shared/CustomerDetails";
import { CreateTransaction } from "../shared/CreateTransaction";
import { CreateWithdrawalModal } from "../shared/CreateWithdrawalModal";

type Information = {
  publicId: string;
  _id: string;
  fullName: string;
  address?: string | number;
  phone: string;
  method?: string;
  createdAt: string;
  email: string;

  status: "approved" | "pending" | "deactivated";
  CustomerPayload: {
    _id: string;
    fullName: string;
    method?: string;
    createdAt: string;
    title: string;
    surname: string;
    otherName: string;
    gender: string;
    maritalStatus: string;
    dateOfBirth: string;
    nationality: string;
    bvn: string;
    nin: string;
    meansOfIdentification: string;
    phone: string;
    email: string;
    address?: string | number;
    businessAddress: string;
    occupation: string;
    employerName: string;
    employerAddress: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    nextOfKin: { fullName: string; phone: string; address: string };
    emergencyContact: { fullName: string; phone: string; address: string };
  };
};

export const Customer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Information[]>([]);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selected, setSelected] = useState<Information | null>(null)
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null)
  // const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  // const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"deposit" | "withdrawal" | false>(false);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await GetCustomers(1, 100); //get firdt 100 customers
        console.log("Fetched customers:", res);
        setCustomers(res?.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        // Fallback to mock data if API fails
        // setCustomers(mockCustomers);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return customers.filter(
      (cust) =>
        cust.fullName.toLowerCase().includes(query) || // Lowercase both sides
        cust.phone.includes(query)
    );
  }, [searchQuery, customers]);


  const handleApplyLoan = (customer: Information) => {
    setSelectedCustomerId(customer.publicId);
    setIsLoanModalOpen(true);
  };
  const handleAction = (type: "deposit" | "withdrawal", id: string) => {
    setSelectedCustomerId(id);
    setModalType(type);
  };
  // const handleAction = (type: "deposit" | "withdrawal", customer: Information) => {
  //   setSelectedCustomerId(customer.publicId);
  //   setModalType(type);
  // };
  return (
    <motion.div
      key="customers"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 ">Customers</h1>
          <p className="text-slate-500">
            Manage and view your client database.
          </p>
        </div>
        <Link to="/cashiers/create-customers">
          <Button className="flex items-center justify-center gap-2 text-white bg-blue-700">
            <Plus size={20} />
            Add New Customer
          </Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50  border border-slate-200  rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none gap-2 text-slate-500"
            >
              <Filter size={16} />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none gap-2 text-slate-500"
            >
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto pb-7">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-500  text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
           { loading && (
              
                 <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  <tr>
              <td colSpan={5} className="py-10">
                <div className="flex items-center justify-center gap-2">
                  <Loader size={18} className="animate-spin text-slate-500" />
                  <span className="text-sm text-slate-500">Loading customers...</span>
                </div>
              </td>
                </tr>
                </tbody>
               
            )}
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className=" transition-all hover:bg-slate-100"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-700/10 flex items-center justify-center text-sm font-bold text-primary">
                        {customer.fullName
                          ? customer.fullName.split(" ").map((n) => n[0]).join("").toUpperCase()
                          : "???"}

                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 ">
                          {customer.fullName}
                        </p>
                        <p className="text-xs text-slate-400 ">
                          {customer.publicId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-800 ">{customer.phone}</p>
                    <p className="text-xs text-slate-800 ">{customer.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 ">
                    {customer.createdAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* <button
                        onClick={() => handleApplyLoan(customer)}
                        className="p-2 rounded-lg hover:bg-blue-700/10 text-primary transition-all"
                        title="Apply for Loan"
                      >
                        <Plus size={18} />
                      </button> */}
                      <button
                        onClick={() => setSelected(customer)}
                        className=" hover:underline text-sm cursor-pointer flex items-center gap-3 "
                      >
                        <Eye size={18} className="text-green-500" />
                      </button>
                      <div className=" relative  p-1 rounded-lg">
                        <button
                          onClick={() => setActiveDropdownId(activeDropdownId === customer._id ? null : customer._id)}
                          className="p-2 rounded-lg cursor-pointer hover:bg-slate-600/10  text-slate-700 transition-all">
                          <MoreVertical size={18} />
                        </button>
                        {/* menu deopdown */}
                        {activeDropdownId === customer._id && (
                          <div className="absolute  -left-17 top-9 flex  gap-3 shadow-md roinded-xl p-2.5 bg-white duration-300  transotion-all">
                            <button
                              onClick={() => { handleAction("deposit", customer.publicId); setActiveDropdownId(null) }}
                              title="Create Deposit" className="cursor-pointer text-xs  border-2 p-1 rounded-sm  text-blue-700">
                              <Clock1 size={16} />
                            </button>
                            <button title="Create Withdrawal" className="cursor-pointer text-xs  border-2 p-1 rounded-sm  text-blue-700" onClick={() => { handleAction("withdrawal", customer.publicId); setActiveDropdownId(null) }}>
                              <CreditCard size={16} />
                            </button>
                            <button title="Create Loan" className="cursor-pointer text-xs border-2 p-1 rounded-sm  text-blue-700" onClick={() => handleApplyLoan(customer)}>
                              <Users size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL */}
      {selected && (
        <CustomerDetail customer={selected} onClose={() => setSelected(null)} />
      )}

      {/* New Loan Modal */}
      <NewLoanModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        publicId={selectedCustomerId}
      />
      {modalType === "deposit" && (
        <CreateTransaction
          isOpen={true}
          onClose={() => setModalType(false)}
          publicId={selectedCustomerId}
        />
      )}
      {modalType === "withdrawal" && (
        <CreateWithdrawalModal
          isOpen={true}
          onClose={() => setModalType(false)}
          publicId={selectedCustomerId}
        />
      )}
    </motion.div>
  );
};
