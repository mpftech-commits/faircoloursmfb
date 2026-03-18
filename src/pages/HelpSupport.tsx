import { useState } from "react";
import { MessageCircle, Phone, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I open an account?",
    answer:
      "To open an account, click on 'Sign Up' and provide your personal details such as name, phone number, and valid ID. Once verified, your account will be activated and ready for use.",
  },
  {
    question: "How can I deposit or withdraw money?",
    answer:
      "You can deposit or withdraw money through any of our registered cashiers/agents or via bank transfer. Simply provide your account details and follow the transaction steps.",
  },
  {
    question: "How do I apply for a loan?",
    answer:
      "Log in to your account, go to the 'Loans' section, and choose your preferred loan option. Fill in the required details and submit your application. Approval is subject to eligibility checks.",
  },
  {
    question: "Why was my transaction declined?",
    answer:
      "Transactions may be declined due to insufficient balance, network issues, or security checks. Please confirm your details and try again or contact support if the issue persists.",
  },
  {
    question: "How do I keep my account secure?",
    answer:
      "Never share your PIN or password with anyone. Always log out after use and report any suspicious activity immediately to our support team.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-sm text-gray-700">{question}</span>
        <span
          className={`text-gray-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      <div
        className={`px-5 text-sm text-gray-500 leading-relaxed transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 pb-4 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        {answer}
      </div>
    </div>
  );
}

function ContactCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-white">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-lg">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400">{title}</p>
        <p className="text-sm text-gray-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default function HelpSupport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white rounded-xl drop-shadow-lg py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          How can we assist you?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Get help with your account, transactions, and financial services
        </p>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onClick={() => toggle(i)}
              />
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div>
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Contact Support
          </h2>

          <div className="space-y-3">
            <ContactCard
              title="WhatsApp Support"
              value="+234 800 123 4567"
              icon={<MessageCircle size={18} className="text-green-600" />}
            />
            <ContactCard
              title="Email Support"
              value="support@faircolorsmfb.com"
              icon={<MessageCircle size={18} className="text-blue-600" />}
            />
            <ContactCard
              title="Phone Support"
              value="+234 800 123 4567"
              icon={<Phone size={18} className="text-purple-600" />}
            />

            <div className="flex items-center gap-3 p-4 border border-blue-200 rounded-xl bg-blue-50 text-blue-600 text-sm">
              <span>💡</span>
              <p>
                Our support team is available Monday to Friday, 9:00 AM - 5:00 PM WAT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}