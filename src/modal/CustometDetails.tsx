import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import {motion, AnimatePresence} from "framer-motion";
import api from "../services/Axios";

interface Props {
  customer: any;
  onClose: () => void;
}

const Field = ({ label, value }: { label: string; value: any }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="font-medium text-gray-800">{value || "-"}</span>
  </div>
);
const Section = ({ title, children }: any) => (
  <div className="bg-gray-50 p-4 rounded-xl space-y-3">
    <h3 className="text-sm font-semibold text-blue-800">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  </div>
);
export default function CustomerDetail({ customer, onClose }: Props) {
  if (!customer) return null;


  // reject customer
   const handleDeactivateCustomer = async (publicId: string) => {
     try {
       await api.patch(`/customers/${publicId}/deactivate`);

       // show success
       setFeedback({
         show: true,
         type: "success",
         message: "Customer approved deactivated",
       });
       console.log("Customer deactivated:", customer);
     } catch (err: any) {
       setFeedback({
         show: true,
         type: "error",
         message: err?.response?.data?.message || "Failed to deactivated customer",
       });
     }
     // auto close
     setTimeout(() => {
       setFeedback((prev) => ({ ...prev, show: false }));
     }, 3000);
   };
  //  approve customers
   const handleApproveCustomer = async (publicId: string) => {
     try {
       await api.patch(`/customers/${publicId}/approve`);

       // show success
       setFeedback({
         show: true,
         type: "success",
         message: "Customer approved successfully",
       });
       console.log("Customer approved:", customer);
     } catch (err: any) {
       setFeedback({
         show: true,
         type: "error",
         message: err?.response?.data?.message || "Failed to approve customer",
       });
     }
     // auto close
     setTimeout(() => {
       setFeedback((prev) => ({ ...prev, show: false }));
     }, 3000);
   };


     const [feedback, setFeedback] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
      }>({
        show: false,
        type: "success",
        message: "",
      });
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      {" "}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-6 space-y-5 overflow-y-auto max-h-[90vh] relative">
        {" "}
        {/* Header */}{" "}
        <div className="flex justify-between items-center relative">
          {" "}
          <h2 className="text-lg font-semibold text-blue-800">
            Customer Details
          </h2>{" "}
          <button
            onClick={onClose}
            className=" fixed right-27 text-sm text-blue-600 bg-blue-100 rounded-full p-1 font-bold"
          >
            <X size={18} />
          </button>{" "}
        </div>
        {/* Personal */}
        <Section title="Personal Information">
          <Field label="Title" value={customer.title} />
          <Field label="Surname" value={customer.surname} />
          <Field label="Other Name" value={customer.otherName} />
          <Field label="Gender" value={customer.gender} />
          <Field label="Marital Status" value={customer.maritalStatus} />
          <Field label="Date of Birth" value={customer.dateOfBirth} />
          <Field label="Nationality" value={customer.nationality} />
        </Section>
        {/* Contact */}
        <Section title="Contact Information">
          <Field label="Phone" value={customer.phone} />
          <Field label="Email" value={customer.email} />
          <Field label="Address" value={customer.address} />
          <Field label="BVN" value={customer.bvn} />
          <Field label="NIN" value={customer.nin} />
          <Field label="Means of ID" value={customer.meansOfIdentification} />
        </Section>
        {/* Employment */}
        <Section title="Employment & Bank">
          <Field label="Occupation" value={customer.occupation} />
          <Field label="Employer Name" value={customer.employerName} />
          <Field label="Employer Address" value={customer.employerAddress} />
          <Field label="Business Address" value={customer.businessAddress} />
          <Field label="Bank Name" value={customer.bankName} />
          <Field label="Account Name" value={customer.accountName} />
          <Field label="Account Number" value={customer.accountNumber} />
        </Section>
        {/* Next of Kin */}
        <Section title="Next of Kin">
          <Field label="Full Name" value={customer.nextOfKin?.fullName} />
          <Field label="Phone" value={customer.nextOfKin?.phone} />
          <Field label="Address" value={customer.nextOfKin?.address} />
        </Section>
        {/* Emergency Contact */}
        <Section title="Emergency Contact">
          <Field
            label="Full Name"
            value={customer.emergencyContact?.fullName}
          />
          <Field label="Phone" value={customer.emergencyContact?.phone} />
          <Field label="Address" value={customer.emergencyContact?.address} />
        </Section>
        <div className="flex gap-5 items-center justify-end">
          {customer.status === "deactivated" ? (
            <button
              disabled
              className="bg-red-200 text-red-700 px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Deactivated
            </button>
          ) : (
            <button
              onClick={() => handleDeactivateCustomer(customer.publicId)}
              className="bg-red-500 px-4 py-2 rounded-lg text-white cursor-pointer"
            >
              Deactivate
          </button>
            )}

          {customer.status === "approved" ? (
            <button
              disabled
              className="bg-green-200 text-green-700 px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Approved
            </button>
          ) : (
            <button
              onClick={() => handleApproveCustomer(customer._id)}
              className="bg-green-500 px-4 py-2 rounded-lg text-white hover:bg-green-600 cursor-pointer"
            >
              Approve
            </button>
          )}
        </div>
      </div>
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
