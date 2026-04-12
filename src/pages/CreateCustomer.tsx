import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateCustomer } from "../services/Axios";


// ---------- Reusable Inputs ----------
interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  label,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div className="flex flex-col gap-1 w-full mt-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
    />
  </div>
);

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-blue-800">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
); // ---------- Main Component ----------

export default function CustomerForm() {
  const steps = [
    "Personal",
    "Contact",
    "Employment",
    "Next of Kin",
    "Emergency Contact",
  ];
  const [step, setStep] = useState(0);

  const initialFormState = {
    title: "",
    surname: "",
    otherName: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    nationality: "",
    bvn: "",
    nin: "",
    meansOfIdentification: "",
    phone: "",
    email: "",
    address: "",
    businessAddress: "",
    occupation: "",
    employerName: "",
    employerAddress: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    nextOfKin: { fullName: "", phone: "", address: "" },
    emergencyContact: { fullName: "", phone: "", address: "" },
  };

  const [form, setForm] = useState<any>(initialFormState);

  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNestedChange = (section: string, e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [section]: { ...form[section], [name]: value } });
  };

  // ---------- Validation ----------

  const validateStep = () => {
    let newErrors: any = {};

    // if (step === 0) {
    //   if (!form.title) newErrors.title = "Required";
    //   if (!form.surname) newErrors.surname = "Required";
    //   if (!form.gender) newErrors.gender = "Required";
    // }

    // if (step === 1) {
    //   if (!form.phone) newErrors.phone = "Required";
    //   if (!form.email) newErrors.email = "Required";
    // }
    // if (step === 2) {
    //   if (!form.bvn) newErrors.phone = "Required";
    //   if (!form.nin) newErrors.email = "Required";
    // }
    // if (step === 3) {
    //   if (!form.nextOfKin.phone) newErrors.phone = "Required";
    //   if (!form.nextOfKin.email) newErrors.email = "Required";
    // }

    // if (step === 4) {
    //   if (!form.emergencyContact.fullName)
    //     newErrors.guarantorFullName = "Required";
    //   if (!form.emergencyContact.phone) newErrors.guarantorPhone = "Required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    console.log(form);
    if (step !== steps.length - 1) {
      return;
    }
    if (!validateStep()) return;

    try {
      setIsLoading(true);
      await CreateCustomer(form);
      console.log("user created successfully");
      setSuccess(true);
      setForm(initialFormState);
    } catch (err: any) {
      console.log(
        "Create customer error:",
        err.response?.data || err?.message || err,
      );
    } finally {
      setIsLoading(false);
    }
  };
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {" "}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
        {" "}
        {/* Progress Bar */}{" "}
        <div className="mb-6">
          {" "}
          <div className="w-full bg-gray-200 h-2 rounded-full">
            {" "}
            <div
              className={`bg-blue-700 h-2 rounded-full`}
              style={{ width: `${progress}%` }}
            />{" "}
          </div>{" "}
          <p className="text-sm mt-2 text-gray-600">
            Step {step + 1} of {steps.length}
          </p>{" "}
        </div>
        <div  className="space-y-3">
          {step === 0 && (
            <Section title="Personal Information">
              <SelectField
                label="Title"
                name="title"
                value={form.title}
                options={["Mr", "Mrs", "Miss"]}
                onChange={handleChange}
              />
              <InputField
                placeholder="enter your surname"
                label="Surname"
                name="surname"
                value={form.surname}
                onChange={handleChange}
              />

              <InputField
                placeholder="enter othername"
                label="Other Name"
                name="otherName"
                value={form.otherName}
                onChange={handleChange}
              />
              <SelectField
                label="Gender"
                name="gender"
                value={form.gender}
                options={["male", "female"]}
                onChange={handleChange}
              />
              <SelectField
                label="Marital Status"
                name="maritalStatus"
                value={form.maritalStatus}
                options={["single", "married"]}
                onChange={handleChange}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
              <InputField
                placeholder="enter your nationality"
                label="Nationality"
                name="nationality"
                type="text"
                value={form.nationality}
                onChange={handleChange}
              />
            </Section>
          )}

          {step === 1 && (
            <Section title="Contact">
              <InputField
                placeholder="enter your phone_number"
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
              <InputField
                placeholder="enter your email"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <InputField
                placeholder="enter your address"
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
              <InputField
                placeholder="enter your bvn no"
                label="BVN"
                name="bvn"
                value={form.bvn}
                onChange={handleChange}
              />
              <InputField
                placeholder="enter your nin no"
                label="NIN"
                name="nin"
                value={form.nin}
                onChange={handleChange}
              />
              <InputField
                label="Means of Identification"
                name="meansOfIdentification"
                value={form.meansOfIdentification}
                onChange={handleChange}
              />
            </Section>
          )}

          {step === 2 && (
            <Section title="Employment & Bank">
              <InputField
                placeholder="enter your occupation"
                label="Occupation"
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
              />
              <InputField
                placeholder="enter your bank name"
                label="Bank Name"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
              />
              <InputField
                label="Account Name"
                name="accountName"
                value={form.accountName}
                onChange={handleChange}
              />
              <InputField
                label="Account Number"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
              />
              <InputField
                label="Business Address"
                name="businessAddress"
                value={form.businessAddress}
                onChange={handleChange}
              />
              <InputField
                label="Employer Name"
                name="employerName"
                value={form.employerName}
                onChange={handleChange}
              />
              <InputField
                label="Employer Address"
                name="employerAddress"
                value={form.employerAddress}
                onChange={handleChange}
              />
            </Section>
          )}

          {step === 3 && (
            <Section title="Next of Kin">
              <InputField
                label="Full Name"
                name="fullName"
                value={form.nextOfKin.fullName}
                onChange={(e) => handleNestedChange("nextOfKin", e)}
              />
              <InputField
                label="Phone"
                name="phone"
                value={form.nextOfKin.phone}
                onChange={(e) => handleNestedChange("nextOfKin", e)}
              />
              <InputField
                label="Address"
                name="address"
                value={form.nextOfKin.address}
                onChange={(e) => handleNestedChange("nextOfKin", e)}
              />
            </Section>
          )}

          {step === 4 && (
            <Section title="Emergency Contact">
              <InputField
                label="Full Name"
                name="fullName"
                value={form.emergencyContact.fullName}
                onChange={(e) => handleNestedChange("emergencyContact", e)}
              />
              <InputField
                label="Address"
                name="address"
                value={form.emergencyContact.address}
                onChange={(e) => handleNestedChange("emergencyContact", e)}
              />
              <InputField
                label="Phone"
                name="phone"
                value={form.emergencyContact.phone}
                onChange={(e) => handleNestedChange("emergencyContact", e)}
              />
            </Section>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-4">
            {step > 0 && (
              <button
                type="button"
                onClick={prev}
                className="flex-1 border py-2 rounded-lg cursor-pointer border-gray-300"
              >
                Back
              </button>
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="flex-1 bg-blue-800 text-white py-2 rounded-lg cursor-pointer"
              >
                Next
              </button>
            ) : (
              <button
                disabled={isLoading}
                type="submit"
                onClick={handleSubmit}
                className="flex-1 bg-blue-800 text-white py-2 rounded-lg cursor-pointer"
              >
                {isLoading ? ` creating customer...` : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded-xl text-center">
              <h2 className="text-lg font-semibold text-green-800">Success</h2>
              <p>Customer created successfully</p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 bg-blue-800 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
