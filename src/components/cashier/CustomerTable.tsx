import type { Customer } from "../../data/Cashier";

interface Props {
  customers: Customer[];
 
  approveCustomer: (id: string) => void;
}

export default function CustomerTable({ customers, approveCustomer }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-300">
      <h2 className="p-4 font-bold">Customers</h2>

      <table className="w-full">
        <thead className="bg-blue-500">
          <tr>
            <th className="p-3 ">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {customers.map(c => (
            <tr key={c.id} className="border-t border-gray-300 text-center">
              <td className="p-3">{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td className="capitalize">{c.status}</td>

              <td>
                {c.status === "pending" && (
                  <button
                    onClick={() => approveCustomer(c.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}