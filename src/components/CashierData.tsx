import {
  Eye,
  // Edit,
  // Trash,
  ArrowLeft,
  ArrowRight,
  Loader,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { GetCashiers } from "../services/Axios";
import AddCashier from "../modal/AddCashier";

type Information = {
  _id: number;
  fullName: string;
  address?: string | number;
  phone?: number;
  method?: string;
  createdAt: string;
  email: string;
  role: "cashier" | "customer";
};

export default function CashierData () {
  const [cashiers, setCashiers] = useState<Information[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetCashiers(page);
        console.log(response, "cashiers fetched successfully");
        setCashiers(response?.data); // Update and store fetched data
      } catch (error: any) {
        console.error("Error fetching cashiers:", error);
        setError(error.response?.data?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [page]);

  const [selected, setSelected] = useState<Information | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-white">
        {[
          { title: "Total Balance", value: "₦900,000" },
          { title: "Total Withdrawn", value: "₦180,000" },
          { title: "Total Contributed", value: "₦90,000" },
          { title: "Total Members", value: "45" },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-300"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-xl font-semibold mt-2">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* TABLE HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Customers</h3>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-800 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 cursor-pointer"
        >
          + Add Cashier
        </button>
        <AddCashier isOpen={open} onClose={() => setOpen(false)} />
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
        {/* when data has been fetched */}
        {!loading && !error && (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 text-left">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* map response from backend api */}
              {cashiers.map((c) => (
                <tr
                  key={c._id}
                  className="border-t border-gray-300 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{c.fullName}</td>
                  <td className="px-6 py-4 font-medium">{c.email}</td>

                  <td className="px-6 py-4 text-gray-500">{c.phone}</td>

                  <td className="px-6 py-4 text-gray-500">{c.createdAt}</td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        c.role === "cashier"
                          ? "bg-green-100 text-green-600"
                          : c.role === "customer"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {c.role}
                    </span>
                  </td>

                  {/* ACTION BUTTON */}
                  <td className=" py-4 ">
                    <button
                      onClick={() => setSelected(c)}
                      className=" hover:underline text-sm cursor-pointer flex items-center gap-3 "
                    >
                      <Eye size={18} className="text-blue-500 text-center" />
                      {/* <Edit size={18} className="text-blue-500"/> */}
                      {/* <Trash size={18} className="text-red-500" /> */}
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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center mt-5">
              cashier Information
            </h2>

            <div className=" text-sm">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className=" ">
                  <label className="block font-medium text-xs ">FullName</label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-xs"
                    readOnly
                    value={selected.fullName}
                  />
                </div>
                <div className=" ">
                  <label className="block font-medium text-xs ">Address</label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-xs"
                    readOnly
                    value={selected.email}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="">
                  <label className="block font-medium text-xs ">Phone</label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-xs"
                    readOnly
                    value={selected.phone}
                  />
                </div>
                <div className=" ">
                  <label className="block font-medium text-xs">Date</label>
                  <input
                    className="flex justify-between font-medium border border-gray-300 w-full rounded-lg px-3 py-2 mt-3 text-xs"
                    readOnly
                    value={selected.createdAt}
                  />
                </div>
              </div>
              <div className=" flex items-center gap-2 justify-between w-full ">
                <h1 className="block font-medium text-xs">Role</h1>
                <p className=" font-medium w-full rounded-lg px-3 py-2 text-xs">
                  {selected.role}
                </p>
              </div>
            </div>

            <div className=" flex items-center gap-4 justify-end mt-2">
              <button
                onClick={() => setSelected(null)}
                className="cursor-pointer w-full bg-blue-800 text-white py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
