import React  from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import api from '../../../services/Axios';
import { useState } from 'react';



export const CreateTransaction: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  publicId: string;
  error?: string;
}> = ({ isOpen, onClose, publicId }) => {
    const [form, setForm] = useState<any>({ amount: '', note: '' });  
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);


  const CreateDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post('/transactions/deposit', {
        amount: parseFloat(form.amount),
        narration: form.narration,
        customerId: publicId,
      });
      setForm({ amount: '', narration: '' });
      console.log("deposit created succefully:", res);
    } catch (error:any) {
      console.error("Failed to creating transactions:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
          >
            {error && (
              <div className="p-4 bg-red-100 text-red-700 text-sm">
                {error}
              </div>
            )}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <h3 className="text-xl font-bold text-slate-900 ">Create Deposit</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            {/* form for creating account */}
            <form onSubmit={CreateDeposit} className="p-6 flex flex-col gap-2 overflow-y-auto">
                <div className="px-6 pt-2 text-sm text-slate-600">
                  Customer:ID <span className="font-medium text-slate-900">{publicId}</span>
                </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Amount</label>
                    <input
                      required
                      placeholder="Enter amount"
                      type="number"
                      value={form.amount}
                      onChange={(e) => setForm({...form, amount: e.target.value})}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1.5 px-3"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Narration</label>
                    <input
                      required
                      type="text"
                       placeholder="Enter narration"
                      value={form.narration}
                      onChange={(e) => setForm({...form, note: e.target.value})}
                      className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 py-1.5 px-3"
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                  </div>
                  <button
                  disabled={loading}
                   type="submit" className='bg-blue-700 text-white rounded-lg px-3 py-2 disabled:bg-blue-300 disabled:cursor-not-allowed'>
                    {loading ? 'Creating Deposit...' : 'Create Deposit'}
                    </button>
              </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
