import {
  Eye,
  // Edit,
  Trash,
  ArrowLeft,
  ArrowRight,
  Loader,
  AlertTriangle,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import api, { GetCashiers } from "../services/Axios";
import AddCashier from "../modal/AddCashier";
import {motion, AnimatePresence} from "framer-motion";
// import type { ReportFilter } from "../services/ReportService";

type CashierStats = {
  deposits: number;
  loans: number;
  netBalance: number;
  totalCustomers: number;
  totalLoans: number;
  totalTransactions: number;
  withdrawals: number;
};

type Information = {
  publicId: string;
  fullName: string;
  address?: string | number;
  phone?: number;
  method?: string;
  createdAt: string;
  email: string;
  stats?: CashierStats;
};

export default function CashierData() {
  const [cashiers, setCashiers] = useState<Information[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");


   const [feedback, setFeedback] = useState<{
      show: boolean;
      type: "success" | "error";
      message: string;
    }>({
      show: false,
      type: "success",
      message: "",
    });

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        // call api to fetch cashiers
        const response = await GetCashiers(page);
        console.log(response, "cashiers fetched successfully");
        // handle different response structures
        const cashierData: any =
          response?.data ??
          response?.data?.data ??
          response?.cashier ??
          response?.cashiers ??
          response ??
          [];
          // normalize data to ensure we have stats for each cashier
        const parsedCashiers = Array.isArray(cashierData)
          ? cashierData.map((item: any) => {
              const cashier = item?.cashier ?? item;
              const stats = item?.stats ?? cashier?.stats;
              return {
                ...cashier,
                stats,
              };
            })
          : [];
        setCashiers(parsedCashiers);
      } catch (error: any) {
        console.error("Error fetching cashiers:", error);
        setError(error.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page]);

  // delete logic
        const HandleDeleteCashier = async (publicId: string) => {
          try {
            // call api to delete cashier
            await api.delete(`/users/cashiers/${publicId}`);
            // remove cashier from the ui
            setCashiers((prev) =>
              prev.filter((cashier) => cashier.publicId !== publicId),
            );
            // show success feedback
            setFeedback({
              show: true,
              type: "success",
              message: "Customer deleted successfully",
            });
          } catch (err: any) {
            console.error("Error deleting cashier:", err);
            // show error feedback
            setFeedback({
              show: true,
              type: "error",
              message:
                err?.response?.data?.message || "Failed to delete customer",
            });
          }
          //  auto hide feedback after 3 seconds
          setTimeout(() => {
            setFeedback((prev) => ({ ...prev, show: false }));
          }, 3000);
        };

  

  const [selected, setSelected] = useState<Information | null>(null);
  const filteredCashiers = cashiers.filter((c) => {
    // filter by search (name + phone)
    const matchesSearch =
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      String(c.phone || "").includes(search);

    return matchesSearch;
  });
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* TABLE HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-xs ">Cashiers</h3>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-800 text-white px-2 py-1.5 rounded-lg text-[8px] hover:bg-blue-700 cursor-pointer"
        >
          + Add Cashier
        </button>
        <AddCashier isOpen={open} onClose={() => setOpen(false)} />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-x-auto">
        {/* shows a loading state when fetching */}
        {loading && (
          <p className="flex p-5 items-center gap-2 font-semibold text-blue-600 text-[10px]">
            <Loader size={14} className="animate-spin" /> loading...
          </p>
        )}
        {/* when there is an error */}
        {error && (
          <p className="text-red-500 flex p-5 items-center gap-2 font-semibold text-[10px]">
            <AlertTriangle size={14} /> {error}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between px-3 mt-5">
          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-xl text-sm w-full sm:w-72 outline-none focus:ring-2 text-[10px] focus:ring-blue-400"
          />
        </div>

        {/* when data has been fetched */}
        {!loading && !error && (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-center text-[10px]">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* map response from backend api (c= cashier) */}
              {filteredCashiers.map((c) => (
                <tr
                  key={c.publicId}
                  className="border-t border-gray-300 hover:bg-gray-50 transition text-[8px]"
                >
                  <td className="px-6 py-4 font-medium">{c.fullName}</td>
                  <td className="px-6 py-4 font-medium">{c.email}</td>

                  <td className="px-6 py-4 text-gray-500">{c.phone}</td>

                  {/* ACTION BUTTON */}
                  <td className=" py-4 gap-4 flex justify-center px-3 ">
                    <button
                      onClick={() => setSelected(c)}
                      className=" hover:underline text-sm cursor-pointer flex items-center gap-3 "
                    >
                      <Eye size={12} className="text-blue-500 text-center" />
                    </button>
                    <button
                      onClick={() => HandleDeleteCashier(c.publicId)}
                      className=" hover:underline text-sm cursor-pointer flex items-center gap-3 "
                    >
                      <Trash size={12} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center p-3 mt-10">
        <button
          className="flex gap-2 items-center bg-blue-100 px-3 rounded-full font-medium cursor-pointer text-blue-700 py-1 text-[10px]"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ArrowLeft size={12} /> Prev
        </button>

        <button
          className="flex gap-2 items-center bg-blue-100 px-3 py-1 cursor-pointer rounded-full font-medium text-blue-700 text-[10px]"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {" "}
          Next <ArrowRight size={12} />
        </button>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4  z-50">
          <div className="bg-white rounded-2xl p-6 w-full lg:max-w-2xl max-w-md shadow-lg overflow-auto max-h-[80vh] mt-8 ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] bg-blue-700 text-white p-1 rounded-sm  font-semibold mb-4 text-center mt-5">
                cashier Information
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="cursor-pointer w-fit bg-blue-100 text-gray-600  rounded-full  p-1 text-[8px] hover:bg-blue-200 transition"
              >
                <X size={ 12} />
              </button>
            </div>

            <div className=" text-sm">
              <div className="grid lg:grid-cols-2 grid-cols-2 gap-3 ">
                <div className=" ">
                  <label className="block font-medium text-[8px] "><p className="block font-medium text-[8px] ">FullName</p></label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-[8px]"
                    readOnly
                    value={selected.fullName}
                  />
                </div>
                <div className=" ">
                  <label className="block font-medium text-[8px] "><p className="block font-medium text-[8px] ">Email</p></label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-[8px]"
                    readOnly
                    value={selected.email}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 grid-cols-2 gap-3">
                <div className="">
                  <label className="block font-medium text-[10px] "><p className="block font-medium text-[8px] ">Phone</p></label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-[8px]"
                    readOnly
                    value={selected.phone}
                  />
                </div>
                <div className=" ">
                  <label className="block font-medium text-[10px]"><p className="block font-medium text-[8px] ">Date</p></label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-[8px]"
                    readOnly
                    value={selected.createdAt}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full">
                {selected.stats ? (
                  [
                    { label: "Deposits", value: selected.stats.deposits },
                    { label: "Withdrawals", value: selected.stats.withdrawals },
                    { label: "Loans", value: selected.stats.loans },
                    {
                      label: "Total Customers",
                      value: selected.stats.totalCustomers,
                    },
                    { label: "Total Loans", value: selected.stats.totalLoans },
                    {
                      label: "Total Transactions",
                      value: selected.stats.totalTransactions,
                    },
                    { label: "Net Balance", value: selected.stats.netBalance },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-gray-50 rounded-lg border border-gray-200 px-2 py-2"
                    >
                      <p className="text-[8px] text-gray-500 uppercase mb-1">
                        {item.label}
                      </p>
                      <p className="text-[8px] md:text-[10px] font-semibold">{item.value ?? 0}</p>
                    </div>
                  ))
                ) : (
                    <p className="text-[8px] text-gray-500 col-span-full">
                    No cashier stats available.
                  </p>
                )}
              </div>
            </div>

            <div className=" flex items-center gap-4 justify-end mt-2">
              <button
                onClick={() => setSelected(null)}
                className="cursor-pointer w-full bg-blue-700 text-white py-2 rounded-xl text-[8px]"
              >
                Close
              </button>
              {/* DOWNLOAD REPORT BUTTON */}
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-[8px] hover:opacity-90 disabled:opacity-50 w-full">
                Download report
              </button>
            </div>
          </div>
        </div>
      )}

{/* FEEDBACK TOADT MODAL */}
       <AnimatePresence>
        {feedback.show && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white shadow-xl border rounded-xl px-6 py-4 flex items-center gap-3 z-50"
          >
            {feedback.type === "success" ? (
              <span className="text-green-600 font-semibold text-[10px]">
                ✅ {feedback.message}
              </span>
            ) : (
                <span className="text-red-600 font-semibold flex items-center gap-2 text-[10px]">
                <AlertTriangle size={18} />
                {feedback.message}
              </span>
            )}

            <button
              onClick={() => setFeedback((prev) => ({ ...prev, show: false }))}
              className="ml-3 text-gray-500 text-sm"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
