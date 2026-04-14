// import type { Transaction } from "../../data/Cashier";

// export default function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
//   return (
//     <div className="bg-white rounded-2xl shadow border border-gray-300 overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-50 w-full">
//           <tr className="bg-blue-500 text-white  ">
//             <th className="p-3 ">Cashier</th>
//             <th>Type</th>
//             <th>Amount</th>
//             <th>Date</th>
//           </tr>
//         </thead>

//         <tbody className="">
//           {transactions.map(tx => (
//             <tr key={tx.id} className="border-t border-gray-300 text-center ">
//               <td className="p-3">{tx.cashier}</td>
//               <td className="capitalize">{tx.type}</td>
//               <td>₦{tx.amount.toLocaleString()}</td>
//               <td>{tx.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }