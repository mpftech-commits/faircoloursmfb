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

type Information = {
  _id: string;
  fullName: string;
  address?: string | number;
  phone?: number;
  method?: string;
  createdAt: string;
  
  status: "approved" | "pending";
  CustomerPayload : {
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
  status: "approved" | "pending";
};
};


export default function Customers() {
  const [customers, setCustomers] = useState<Information[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [page, setPage] = useState(1);


  useEffect(() => {
    const fetchCustomers = async () => {
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

  const handleDelete = async (_id: string) => {
    // Implement delete functionality here
    try{
      await api.delete(`/customers/${_id}/delete`);
      setCustomers((prev:any[]) =>
      prev.filter((customer) => customer._id !==_id)
    );
   
      
    }catch(err){
        console.log("Delete customer with ID:", _id);
    }
  
  }
  const [selected, setSelected] = useState(null);

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
              {customers.map((c) => (
                <tr
                  key={c._id}
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
                    <button className=" hover:underline text-sm cursor-pointer flex items-center gap-3 ">
                      <Eye
                        size={18}
                        className="text-green-500"
                        onClick={() => setSelected(c)}
                      />
                      {/* <Edit size={18} className="text-blue-500"/> */}
                      <Trash size={18} className="text-red-500" onClick={() => handleDelete(c._id)}/>
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
       <CustomerDetail  customer={selected} onClose={() => setSelected(null)}/>
      )}
    </div>
  );
}
