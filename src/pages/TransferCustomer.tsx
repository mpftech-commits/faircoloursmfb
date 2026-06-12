import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import api, { GetCashiers } from "../services/Axios"; 
import { CheckCheck } from "lucide-react";
import toast from "react-hot-toast";

type Cashier = {
  id: string;
  fullName: string;
  publicId: string;
};

type TransferCustomerProps = {
  customerId: string; // Now picking customerId from props
  customerName?: string;
};

const TransferCustomer: React.FC<TransferCustomerProps> = ({
  customerId,
  customerName = "this customer"
}) => {
  const [cashiers, setCashiers] = useState<Cashier[]>([]);
  const [selectedCashier, setSelectedCashier] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch all available Cashiers
  useEffect(() => {
    const fetchCashiers = async () => {
      try {
        setFetching(true);
        const response = await GetCashiers(1, 100); // Fetch first 100 
        const cashierList = response.data?.map((item: any) => ({
           id: item.cashier.id,
          fullName: item.cashier.fullName,
          publicId: item.cashier.publicId
        })) || [];
        setCashiers(cashierList);
        console.log("processed cashiers:", cashierList);
      } catch (error) {
        console.error("Failed to fetch cashiers:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchCashiers();
  }, []);

  // 2. Handle the transfer using selected cashier
  const handleTransfer = async () => {
    if (!selectedCashier) return;
    
    try {
      setLoading(true);
      await api.put("/users/transfer-customer", {
        customerId: customerId, // Fixed ID from props
        newCashierId: selectedCashier, // Chosen from dropdown
      });

      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setSelectedCashier("");
    } catch (error:any) {
      console.error("Transfer failed:", error);
      toast.error(error?.response?.data?.message || "Failed to transfer customer. Please try again.");
      setError(error?.message || "Failed to transfer customer. Please try again.");
      // alert("Failed to transfer customer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCashierName = cashiers.find(
    (c) => c.publicId === selectedCashier
  )?.fullName;

  return (
    <div className="p-4 border border-gray-300 rounded-2xl bg-white shadow-sm ">
      <h3 className="text-xs font-bold text-slate-900 mb-1">Transfer Ownership</h3>
      <p className="text-[10px] text-slate-500 mb-6">Move {customerName} to a different cashier's portfolio.</p>

      {/* Cashier Selection Dropdown */}
      <div className="mb-6">
        <label className="mb-2 block text-[8px] font-semibold text-slate-700">
          <p className="text-[8px]">Select Destination Cashier</p>
        </label>
        <select
          value={selectedCashier}
          onChange={(e) => setSelectedCashier(e.target.value)}
          disabled={fetching}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-slate-50 text-[8px]"
        >
          <option value="" className="text-[8px]">{fetching ? "Loading cashiers..." : "Choose a cashier"}</option>
          {cashiers.map((cashier) => (
            <option key={cashier.id} value={cashier.publicId} className="text-[8px]">
              {cashier.fullName} ({cashier.publicId})
            </option>
          ))}
        </select>
      </div>

      {/* Transfer Button */}
      <button
        onClick={() => setShowConfirmModal(true)}
        disabled={!selectedCashier || loading}
        className="w-full rounded-xl bg-slate-900 px-5 py-2 cursor-pointer text-white font-bold transition-all hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-[8px]"
      >
        Initiate Transfer
      </button>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirmModal && (
      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
            >
                 {error && <p className="text-red-500">{error}</p>}
              <h2 className="mb-2 text-xl font-bold text-slate-900">Confirm Transfer</h2>
              <p className="mb-8 text-slate-500 leading-relaxed">
                You are about to transfer <span className="font-bold text-slate-900">{customerName}</span> to 
                <span className="font-bold text-slate-900"> {selectedCashierName}</span>. 
                This action will update the account manager immediately.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleTransfer}
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-700 py-3 text-white font-bold hover:opacity-90 "
                >
                  {loading ? "Processing..." : "Confirm Transfer"}
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="w-full rounded-xl border border-slate-200 py-3 text-slate-600 font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
                <CheckCheck size={28} className="text-emerald-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-slate-900">Transfer Done!</h2>
              <p className="mb-8 text-slate-500">
                The customer profile has been successfully transferred to {selectedCashierName || "the selected cashier"}.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full rounded-xl bg-slate-900 py-3 text-white font-bold"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferCustomer;
