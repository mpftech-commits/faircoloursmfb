import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import Step1UploadID from "../pages/Steps/Step1UploadID";
import Step2IDDetails from "../pages/Steps/Step2IdDetails";
import Step3Selfie from "../pages/Steps/Step3TakeSelfie";
import Step4BusinessUpload from "./Steps/Step4BusinessUpload";
import { LeftSection } from "../components/LeftSection";
import Step5ReviewDetails from "./Steps/Step5ReviewDocuments";
export default function StepForm() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen grid lg:grid-cols-2 max-w-7xl mx-auto">
      {/* LEFT SIDE */}
      <LeftSection />

      {/* RIGHT SIDE */}

      <div className="bg-[rgb(242,253,245)] py-1">
         <div className="flex items-center gap-2 mb-5 border-b py-3 border-b-gray-300 ">
        <img
          src="/logo.svg"
          alt="OgaLandlord Logo"
          className="pb-5 px-10 md:w-[35%] w-[50%]"
        />
      </div>
        <div className=" flex flex-col ">
          <div className="px-10 ">
            <ProgressBar step={step} total={5} />
          </div>
          <div className="flex flex-1 items-center justify-center px-6">
            {step === 1 && <Step1UploadID next={next} />}
            {step === 2 && <Step2IDDetails next={next} prev={prev} />}
            {step === 3 && <Step3Selfie next={next} prev={prev} />}
            {step === 4 && <Step4BusinessUpload next={next} prev={prev} />}
            {step === 5 && <Step5ReviewDetails next={next} prev={prev} />}
          </div>
          {/* FOOTER */}
          <div className="flex justify-between text-xs md:px-10 px-5 text-gray-500 mt-12 border-t border-gray-300 pt-5">
            <span>© {new Date().getFullYear()} OgaLandlord</span>
            <div className="flex gap-5">
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Terms</span>
              <span className="hover:underline cursor-pointer">Get help</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
