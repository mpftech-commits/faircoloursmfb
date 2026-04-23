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
  error?: string;
}

const InputField: React.FC<InputProps> = ({
  placeholder,
  label,
  name,
  value,
  onChange,
  type = "text",
  error,
}) => {
  // Handle error as string or object
  const errorMessage: string | null =
    typeof error === "string"
      ? error
      : error && typeof error === "object"
        ? (Object.values(error)[0] as string) || null
        : null;

  return (
    <div className="flex flex-col gap-1 w-full mt-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-700"
        }`}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectField: React.FC<SelectProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  error,
}) => {
  // Handle error as string or object
  const errorMessage: string | null =
    typeof error === "string"
      ? error
      : error && typeof error === "object"
        ? (Object.values(error)[0] as string) || null
        : null;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-700"
        }`}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
};
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

    if (step === 0) {
      if (!form.title) newErrors.title = "Title is required";
      if (!form.surname) newErrors.surname = "Surname is required";
      if (!form.gender) newErrors.gender = "Gender is required";
      if (!form.otherName) newErrors.otherName = "Other Name is required";
      if (!form.maritalStatus)
        newErrors.maritalStatus = "Marital Status is required";
      if (!form.dateOfBirth)
        newErrors.dateOfBirth = "Date of Birth is required";
      if (!form.nationality) newErrors.nationality = "Nationality is required";
    }

    if (step === 1) {
      if (!form.phone) newErrors.phone = "Phone is required";
      if (!form.email) newErrors.email = "Email is required";
      if (!form.bvn) newErrors.bvn = "BVN is required";
      if (!form.nin) newErrors.nin = "NIN is required";
    }

    if (step === 2) {
      // Add validations for employment if needed
    }

    if (step === 3) {
      if (!form.nextOfKin.fullName)
        newErrors.nextOfKin = {
          ...newErrors.nextOfKin,
          fullName: "Full Name is required",
        };
      if (!form.nextOfKin.phone)
        newErrors.nextOfKin = {
          ...newErrors.nextOfKin,
          phone: "Phone is required",
        };
      if (!form.nextOfKin.address)
        newErrors.nextOfKin = {
          ...newErrors.nextOfKin,
          address: "Address is required",
        };
    }

    if (step === 4) {
      if (!form.emergencyContact.fullName)
        newErrors.emergencyContact = {
          ...newErrors.emergencyContact,
          fullName: "Full Name is required",
        };
      if (!form.emergencyContact.phone)
        newErrors.emergencyContact = {
          ...newErrors.emergencyContact,
          phone: "Phone is required",
        };
      if (!form.emergencyContact.address)
        newErrors.emergencyContact = {
          ...newErrors.emergencyContact,
          address: "Address is required",
        };
    }

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
      const backendError = err?.response?.data;

      if (backendError?.errors) {
        // Field-specific errors
        setErrors(backendError.errors);
      } else if (backendError?.message) {
        // General error (e.g. duplicate email)
        setErrors({ general: backendError.message });
      } else {
        setErrors({ general: "Something went wrong" });
      }
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
        {/* error */}
        {errors.general && <p className="text-red-500">{errors.general}</p>}
        <div className="space-y-3">
          {step === 0 && (
            <Section title="Personal Information">
              <SelectField
                label="Title"
                name="title"
                value={form.title}
                options={["Mr", "Mrs", "Miss"]}
                onChange={handleChange}
                error={errors.title}
              />
              <InputField
                placeholder="enter your surname"
                label="Surname"
                name="surname"
                value={form.surname}
                onChange={handleChange}
                error={errors.surname}
              />

              <InputField
                placeholder="enter othername"
                label="Other Name"
                name="otherName"
                value={form.otherName}
                onChange={handleChange}
                error={errors.otherName}
              />
              <SelectField
                label="Gender"
                name="gender"
                value={form.gender}
                options={["male", "female"]}
                onChange={handleChange}
                error={errors.gender}
              />
              <SelectField
                label="Marital Status"
                name="maritalStatus"
                value={form.maritalStatus}
                options={["single", "married"]}
                onChange={handleChange}
                error={errors.maritalStatus}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
              />
              <InputField
                placeholder="enter your nationality"
                label="Nationality"
                name="nationality"
                type="text"
                value={form.nationality}
                onChange={handleChange}
                error={errors.nationality}
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
                error={errors.phone}
              />
              <InputField
                placeholder="enter your email"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                placeholder="enter your address"
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={errors.address}
              />
              <InputField
                placeholder="enter your bvn no"
                label="BVN"
                name="bvn"
                value={form.bvn}
                onChange={handleChange}
                error={errors.bvn}
              />
              <InputField
                placeholder="enter your nin no"
                label="NIN"
                name="nin"
                value={form.nin}
                onChange={handleChange}
                error={errors.nin}
              />
              <InputField
                label="Means of Identification"
                name="meansOfIdentification"
                value={form.meansOfIdentification}
                onChange={handleChange}
                error={errors.meansOfIdentification}
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
                error={errors.occupation}
              />
              <InputField
                placeholder="enter your bank name"
                label="Bank Name"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                error={errors}
              />
              <InputField
                label="Account Name"
                name="accountName"
                value={form.accountName}
                onChange={handleChange}
                error={errors.accountName}
              />
              <InputField
                label="Account Number"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                error={errors.accountNumber}
              />
              <InputField
                label="Business Address"
                name="businessAddress"
                value={form.businessAddress}
                onChange={handleChange}
                error={errors.businessAddress}
              />
              <InputField
                label="Employer Name"
                name="employerName"
                value={form.employerName}
                onChange={handleChange}
                error={errors.employerName}
              />
              <InputField
                label="Employer Address"
                name="employerAddress"
                value={form.employerAddress}
                onChange={handleChange}
                error={errors.employerAddress}
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
                error={errors.nextOfKin?.fullName}
              />
              <InputField
                label="Phone"
                name="phone"
                value={form.nextOfKin.phone}
                onChange={(e) => handleNestedChange("nextOfKin", e)}
                error={errors.nextOfKin?.phone}
              />
              <InputField
                label="Address"
                name="address"
                value={form.nextOfKin.address}
                onChange={(e) => handleNestedChange("nextOfKin", e)}
                error={errors.nextOfKin?.address}
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
                error={errors.emergencyContact?.fullName}
              />
              <InputField
                label="Address"
                name="address"
                value={form.emergencyContact.address}
                onChange={(e) => handleNestedChange("emergencyContact", e)}
                error={errors.emergencyContact?.address}
              />
              <InputField
                label="Phone"
                name="phone"
                value={form.emergencyContact.phone}
                onChange={(e) => handleNestedChange("emergencyContact", e)}
                error={errors.emergencyContact?.phone}
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
