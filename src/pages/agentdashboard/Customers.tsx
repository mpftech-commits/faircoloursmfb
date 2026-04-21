import {
  Eye,
  // Edit,
  Trash,
  ArrowLeft,
  ArrowRight,
  Loader,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import api, { GetCustomers } from "../../services/Axios";
import {Link} from "react-router-dom"
import CustomerDetail from "../../modal/CustometDetails";
import {motion, AnimatePresence} from "framer-motion";

type Information = {
  publicId: string;
  _id: string;
  fullName: string;
  address?: string | number;
  phone?: number;
  method?: string;
  createdAt: string;

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



export default function Customers() {
  const [customers, setCustomers] = useState<Information[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);
const [statusFilter, setStatusFilter] = useState<
  "all" | "approved" | "pending" | "deactivated"
>("all");
const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers: () => Promise<void> = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetCustomers(page);
        console.log(response, "customers fetched successfully");
        setCustomers(response?.data); // Update and store fetched data
      } catch (error: any) {
        console.error("Error fetching customers:", error);
        setError(error.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page]);

 const handleDelete = async (publicId: string) => {
   try {
     await api.delete(`/customers/${publicId}/delete`);

     // remove from UI
     setCustomers((prev) => prev.filter((customer) => customer.publicId !== publicId));

     // show success
     setFeedback({
       show: true,
       type: "success",
       message: "Customer deleted successfully",
     });
     
   } catch (err: any) {
     setFeedback({
       show: true,
       type: "error",
       message: err?.response?.data?.message || "Failed to delete customer",
     });
   }

   // auto close
   setTimeout(() => {
     setFeedback((prev) => ({ ...prev, show: false }));
   }, 3000);
 };

  const [selected, setSelected] = useState<Information | null>(null);

  const [feedback, setFeedback] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const filteredCustomers = customers.filter((c) => {
    // filter by status
    const matchesStatus =
      statusFilter === "all" ? true : c.status === statusFilter;

    // filter by search (name + phone)
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      String(c.phone || "").includes(search);

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-white"></div>

      {/* TABLE HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Customers</h3>

        <Link to="/create-customer">
          <button className="bg-blue-800 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 cursor-pointer">
            + Add Customer
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-x-auto">
        {/* shows a loading state when fetching */}
        {loading && (
          <p className="flex p-5 items-center gap-2 font-semibold text-blue-600">
            <Loader size={18} className="animate-spin" /> loading...
          </p>
        )}
        {/* when there is an error */}
        {error && (
          <p className="text-red-500 flex p-5 items-center gap-2 font-semibold">
            <AlertTriangle size={18} /> {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-4 justify-between px-3 mt-3">
          {/* FILTER BUTTONS */}
          <div className="flex gap-2">
            {["all", "pending", "approved", "deactivated"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as any)}
                className={`px-4 py-1 rounded-full text-sm capitalize ${
                  statusFilter === status
                    ? "bg-blue-800 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* SEARCH INPUT */}
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl text-sm w-full sm:w-72 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* when data has been fetched */}
        {!loading && !error && (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-left">
              <tr>
                <th className="px-6 py-3">Name</th>
                {/* <th className="px-6 py-3">Account No</th> */}
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* map response from backend api */}
              {filteredCustomers.map((c) => (
                <tr
                  key={c.publicId}
                  className="border-t border-gray-300 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{c.fullName}</td>

                  <td className="px-6 py-4">{c.address}</td>

                  <td className="px-6 py-4 text-gray-500">{c.phone}</td>

                  <td className="px-6 py-4 text-gray-500">{c.createdAt}</td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : c.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* ACTION BUTTON */}
                  <td className=" py-4 ">
                    <div className="flex gap-4">
                      <button
                        onClick={() => setSelected(c)}
                        className=" hover:underline text-sm cursor-pointer flex items-center gap-3 "
                      >
                        <Eye size={18} className="text-green-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.publicId)}
                        className=" hover:underline text-sm cursor-pointer flex items-center gap-3 "
                      >
                        <Trash size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex justify-between items-center p-3 mt-10">
        <button
          className="flex gap-2 items-center bg-blue-100 px-3 rounded-full font-medium cursor-pointer text-blue-700 py-1"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ArrowLeft size={18} /> Prev
        </button>

        <button
          className="flex gap-2 items-center bg-blue-100 px-3 py-1 cursor-pointer rounded-full font-medium text-blue-700"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {" "}
          Next <ArrowRight size={18} />
        </button>
      </div>

      {/* MODAL */}
      {selected && (
        <CustomerDetail customer={selected} onClose={() => setSelected(null)} />
      )}

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
              <span className="text-green-600 font-semibold">
                ✅ {feedback.message}
              </span>
            ) : (
              <span className="text-red-600 font-semibold flex items-center gap-2">
                <AlertTriangle size={18} />
                {feedback.message}
              </span>
            )}

            <button
              onClick={() => setFeedback((prev) => ({ ...prev, show: false }))}
              className="ml-3 text-gray-500"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
