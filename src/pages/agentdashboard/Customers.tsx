import { Eye } from "lucide-react";
import { useState } from "react";

type Information = {
  id: number;
  name: string;
  email: string;
  phone?: number;
  method?: string;
  date: string;
  status: "Verified" | "Pending" ;
};

const transactions: Information[] = [
  {
    id: 1,
    name: "Christian Albert",
    email: "user@mail.com",
    phone: 234812345678,
    date: "23/04/23",
    status: "Verified",
  },
  {
    id: 2,
    name: "Josephine Dee",
    email: "user@mail.com",
     phone: 234812345678,
    date: "20/04/23",
    status: "Verified",
  },
  {
    id: 3,
    name: "Caroline James",
    email: "user@mail.com",
     phone: 234812345678,
    date: "19/04/23",
    status: "Pending",
  },
  {
    id: 3,
    name: "Fred James",
    email: "user@mail.com",
     phone: +234-812345678,
    date: "19/04/23",
    status: "Pending",
  },
  {
    id: 3,
    name: "Femi Falana",
    email: "user@mail.com",
     phone: 234812345678,
    date: "19/04/23",
    status: "Verified",
  },
];

export default function Customers() {
  const [selected, setSelected] = useState<Information | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700">
          + Add Payment
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">phone Number</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{t.name}</td>

                <td className="px-6 py-4">
                  {t.email}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {t.phone}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {t.date}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      t.status === "Verified"
                        ? "bg-green-100 text-green-600"
                        : t.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>

                {/* ACTION BUTTON */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelected(t)}
                    className="text-blue-600 hover:underline text-sm cursor-pointer"
                  >
                    <Eye size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Transaction Details
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Date:</strong> {selected.date}</p>
              <p><strong>Status:</strong> {selected.status}</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-6 w-full bg-black text-white py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}