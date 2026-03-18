import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatusCard from "../components/StatusCard";
import { Lightbulb, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
interface FormData {
  propertyType: string;
  bedrooms: string;
  rent: string;
  serviceCharge: string;
  damageFee: string;
  agentFee: string;
  title: string;
  description: string;
  address: string;
  images: File[];
}

const steps = [
  "Property Details",
  "Basic Info",
  "Location",
  "Images",
  "Review",
];

const MultiStepForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [form, setForm] = useState<FormData>({
    propertyType: "",
    bedrooms: "",
    rent: "",
    serviceCharge: "",
    damageFee: "",
    agentFee: "",
    title: "",
    description: "",
    address: "",
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prev = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const progress = ((step + 1) / steps.length) * 100;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm p-6 md:p-8  ">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-green-700 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-green-800 mb-1">
          {steps[step]}
        </h2>

        <div className="relative mt-6 ">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className=" w-full"
            >
              <div className="space-y-5 ">
                {step === 0 && (
                  <>
                    <label htmlFor="Property Type *" className="text-xs mb-3">
                      Property Type *
                    </label>
                    <select
                      name="select property Type"
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="" disabled>
                        select Property Type
                      </option>
                      <option>Apartment</option>
                      <option>Land</option>
                      <option>House</option>
                      <option>Condo</option>
                    </select>
                    <label htmlFor="bedroom *" className="text-xs mb-3">
                      Bedroom *
                    </label>
                    <select
                      name="bedrooms"
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Bedrooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <label htmlFor="rent amount *" className="text-xs mb-3">
                      Rent Amount *
                    </label>
                    <input
                      name="rent"
                      placeholder="e.g 500,000"
                      onChange={handleChange}
                      className="input"
                    />
                    <div className="flex gap-3 space-y-5 ">
                      <div>
                        <label htmlFor="rent amount *" className="text-xs mb-3">
                          Service Charge (Optional)
                        </label>
                        <input
                          name="service charge"
                          placeholder="e.g 5% of rent"
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="rent amount *" className="text-xs mb-3">
                          Damage Fee (Optional)
                        </label>
                        <input
                          name="damage fee"
                          placeholder="e.g 5% of rent"
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="rent amount *" className="text-xs mb-3">
                          Agent/Legal Fee (Optional)
                        </label>
                        <input
                          name="agent fee"
                          placeholder="e.g 5% of rent"
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>
                    <StatusCard
                      icon={<Lightbulb />}
                      className="text-blue-500 text-xs"
                      title="  Competitive pricing helps your listing get more views"
                    />
                  </>
                )}

                {step === 1 && (
                  <>
                    <label htmlFor="bedroom *" className="text-xs mb-3">
                      Area *
                    </label>
                    <select
                      name="area"
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select Area</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <label htmlFor="bedroom *" className="text-xs mb-3">
                      Full Address *
                    </label>
                    <input
                      name="area"
                      placeholder="e.g 15 Adamasingba, Apete Ibadan"
                      onChange={handleChange}
                      className="input"
                    />
                    <StatusCard
                      icon={<Lightbulb />}
                      className="text-blue-500 text-xs"
                      title="  Please Note: Fill Address will not be displayed to customers"
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <textarea
                      rows={4}
                      cols={2}
                      name="description"
                      placeholder="Describe the property, amenities, & nearby landmarks or special conditions and requirements..."
                      onChange={handleChange}
                      className="input"
                    />
                    <StatusCard
                      icon={<Lightbulb />}
                      tips={[
                        "list all amenities (parking, generator, etc)",
                        "mention nearby landmarks",
                        "Highlight unique features ",
                        "",
                        "Be honest and accurate",
                      ]}
                      className="text-blue-500 text-xs"
                      title="  Please Note: Fill Address will not be displayed to customers"
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="border border-gray-300 p-5 rounded-xl">
                      {/* Hidden input */}
                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      {/* Upload Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg py-10 hover:bg-gray-50 transition"
                      >
                        <Upload className="w-8 h-8 text-gray-500 mb-2" />
                        <p className="text-sm text-gray-500">
                          Click to upload property images
                        </p>
                      </button>

                      {/* Preview */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {form.images.map((file, i) => (
                          <img
                            key={i}
                            src={URL.createObjectURL(file)}
                            className="h-24 w-full object-cover rounded"
                          />
                        ))}
                      </div>
                       <StatusCard
                      icon={<Lightbulb />}
                      className="text-amber-500 text-xs "
                      title=" Select multiple image to upload"
                    />
                    </div>
                  </>
                )}

                {step === 4 && (
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>Type:</strong> {form.propertyType}
                    </p>
                    <p>
                      <strong>Bedrooms:</strong> {form.bedrooms}
                    </p>
                    <p>
                      <strong>Rent:</strong> {form.rent}
                    </p>
                    <p>
                      <strong>Title:</strong> {form.title}
                    </p>
                    <p>
                      <strong>Address:</strong> {form.address}
                    </p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between pt-4 gap-5">
                  {step > 0 && (
                    <button onClick={prev} className="px-4 py-2 border rounded">
                      Back
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (step === steps.length - 1) {
                        // TODO: api call will be handled here

                        // After submit, navigate back to Add Listing page
                        navigate("/dashboard/listing-submitted");
                      } else {
                        next();
                      }
                    }}
                    className="ml-auto bg-green-800 text-white px-6 py-2 rounded cursor-pointer w-full"
                  >
                    {step === steps.length - 1 ? "Submit" : "Continue"}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default MultiStepForm;
