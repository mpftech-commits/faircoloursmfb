import { useState } from "react";

export default function CreateCashierModal({ onCreate }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="font-bold mb-2">Create Cashier</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full mb-2"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        className="border p-2 w-full mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={() => onCreate(name, email)}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg"
      >
        Create
      </button>
    </div>
  );
}