import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
} from "lucide-react";
import { StatusBadge, Button, Card } from "../ui";
// import { mockCustomers } from "../../mockData";
import { GetCustomers } from "../../../services/Axios";
import { NewLoanModal } from "./NewLoan";
import { Link } from "react-router-dom";

interface CustomerData {
  publicId: string;
  fullName: string;
  phone: string;
  email: string;
  status: string;
  updatedAt: string;
}

export const Customer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await GetCustomers(1, 10);
        console.log("Fetched customers:", res);
        // Transform API response to match expected format
        // const transformedCustomers =
        //   res.customers?.map((cust: any) => ({
        //     id: cust.id || cust.customerId,
        //     name: `${cust.surname} ${cust.otherName}`,
        //     phone: cust.phone,
        //     email: cust.email,
        //     status: cust.status || "active",
        //     joinedDate: cust.createdAt
        //       ? new Date(cust.createdAt).toLocaleDateString()
        //       : new Date().toLocaleDateString(),
        //   })) || [];
        setCustomers(res?.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        // Fallback to mock data if API fails
        // setCustomers(mockCustomers);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (cust) =>
        cust.fullName.includes(searchQuery.toLowerCase()) ||
        cust.phone.includes(searchQuery),
    );
  }, [searchQuery, customers]);

  const handleApplyLoan = (customer: CustomerData) => {
    setSelectedCustomerId(customer.publicId);
    setIsLoanModalOpen(true);
  };
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
        <div className="overflow-x-auto">
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
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className=" transition-all hover:bg-slate-100"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-700/10 flex items-center justify-center text-sm font-bold text-primary">
                        {cust.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 ">
                          {cust.fullName}
                        </p>
                        <p className="text-xs text-slate-400 ">{cust.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-800 ">{cust.phone}</p>
                    <p className="text-xs text-slate-800 ">{cust.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={cust.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800 ">
                    {cust.updatedAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleApplyLoan(cust)}
                        className="p-2 rounded-lg hover:bg-blue-700/10 text-primary transition-all"
                        title="Apply for Loan"
                      >
                        <Plus size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100  text-slate-500 transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100  text-slate-400 transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Loan Modal */}
      <NewLoanModal
        isOpen={isLoanModalOpen}
        onClose={() => setIsLoanModalOpen(false)}
        publicId={selectedCustomerId}
      />
    </motion.div>
  );
};
