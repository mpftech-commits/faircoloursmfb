import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button, Input, Select } from "../ui";
import { Modal } from "../ui/Modal";
import { CreateLoan } from "../../../services/Axios";

const initialformstate = {
  publicId: "",
  amount: "",
  duration: "",
  purpose: "",
  repaymentMethod: "monthly",

  guarantorData: {
    fullName: "",
    maritalStatus: "",
    dateOfBirth: "",
    state: "",
    address: "",
    landmark: "",
    lga: "",
    phone: "",
    email: "",
    relationship: "",
    country: "",
  },
};

interface NewLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  publicId: string;
  error?: string;
}

export const NewLoanModal: React.FC<NewLoanModalProps> = ({
  isOpen,
  onClose,
  publicId
,
}) => {
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(initialformstate);

  useEffect(() => {
    if (!isOpen) {
      setForm(initialformstate);
      setErrors({});
      setIsSubmitting(false);
      return;
    }

    setForm((currentForm) => ({
      ...currentForm,
      publicId,
    }));
  }, [isOpen, publicId]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Loan validation
    if (!form.amount || Number(form.amount) <= 0) {
      newErrors.amount = "Enter a valid loan amount";
    }

    if (!form.duration) {
      newErrors.duration = "Select loan duration";
    }

    if (!form.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    }

    if (!form.repaymentMethod) {
      newErrors.repaymentMethod = "Select repayment method";
    }

    // Guarantor validation
    if (!form.guarantorData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!form.guarantorData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^0\d{10}$/.test(form.guarantorData.phone)) {
      newErrors.phone = "Enter a valid Nigerian phone number";
    }

    if (!form.guarantorData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.guarantorData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.guarantorData.relationship.trim()) {
      newErrors.relationship = "Relationship is required";
    }

    if (!form.guarantorData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!form.guarantorData.lga.trim()) {
      newErrors.lga = "LGA is required";
    }

    if (!form.guarantorData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    const payload = {
      ...form,
      publicId,
    };

    try {
      await CreateLoan(payload);
      onClose();
      // Reset form
      setForm(initialformstate);
    } catch (error) {
      console.error("Failed to create loan:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="New Loan Application"
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : null}
            Submit Application
          </Button>
        </div>
      }
    >
      <motion.div
        key="new-loan-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        {/* Customer ID Display */}
        <div className="p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-500">Customer ID</p>
          <p className="font-bold text-slate-900">{publicId}</p>
        </div>

        {/* Loan Details */}
        <div className="space-y-4 bg-white">
          <h3 className="text-lg font-bold text-slate-900">Loan Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Loan Amount (₦)"
              type="number"
              placeholder="e.g. 117000"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              error={errors.amount}
            />
            <Select
              label="Duration (Months)"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              options={[
                { value: "3", label: "3 Months" },
                { value: "6", label: "6 Months" },
                { value: "12", label: "12 Months" },
                { value: "18", label: "18 Months" },
                { value: "24", label: "24 Months" },
              ]}
            />
            <Input
              label="Purpose"
              placeholder="e.g. Business capital for stock purchase"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            />
            <Select
              label="Repayment Method"
              value={form.repaymentMethod}
              onChange={(e) =>
                setForm({ ...form, repaymentMethod: e.target.value })
              }
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "weekly", label: "Weekly" },
                { value: "daily", label: "Daily" },
              ]}
            />
          </div>
        </div>

        {/* Guarantor Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            Guarantor Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. John Doe"
              value={form.guarantorData.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    fullName: e.target.value,
                  },
                })
              }
            />
            <Select
              label="Marital Status"
              value={form.guarantorData.maritalStatus}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    maritalStatus: e.target.value,
                  },
                })
              }
              options={[
                { value: "single", label: "Single" },
                { value: "married", label: "Married" },
                { value: "divorced", label: "Divorced" },
                { value: "widowed", label: "Widowed" },
              ]}
            />
            <Input
              label="Date of Birth"
              type="date"
              value={form.guarantorData.dateOfBirth}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    dateOfBirth: e.target.value,
                  },
                })
              }
            />
            <Input
              label="Phone Number"
              placeholder="e.g. 08098765432"
              value={form.guarantorData.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    phone: e.target.value,
                  },
                })
              }
            />
            <Input
              label="Email"
              type="email"
              placeholder="e.g. john.doe@gmail.com"
              value={form.guarantorData.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    email: e.target.value,
                  },
                })
              }
            />
            <Input
              label="Relationship"
              placeholder="e.g. Brother"
              value={form.guarantorData.relationship}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    relationship: e.target.value,
                  },
                })
              }
            />
            <Input
              label="State"
              placeholder="e.g. Lagos"
              value={form.guarantorData.state}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    state: e.target.value,
                  },
                })
              }
            />
            <Input
              label="LGA"
              placeholder="e.g. Ikeja"
              value={form.guarantorData.lga}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    lga: e.target.value,
                  },
                })
              }
            />
            <div className="sm:col-span-2">
              <Input
                label="Address"
                placeholder="e.g. 5 Abuja Crescent, Ikeja"
                value={form.guarantorData.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    guarantorData: {
                      ...form.guarantorData,
                      address: e.target.value,
                    },
                  })
                }
              />
            </div>
            <Input
              label="Landmark"
              placeholder="e.g. Near Total Filling Station"
              value={form.guarantorData.landmark}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    landmark: e.target.value,
                  },
                })
              }
            />
            <Select
              label="Country"
              value={form.guarantorData.country}
              onChange={(e) =>
                setForm({
                  ...form,
                  guarantorData: {
                    ...form.guarantorData,
                    country: e.target.value,
                  },
                })
              }
              options={[{ value: "Nigeria", label: "Nigeria" }]}
            />
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};
