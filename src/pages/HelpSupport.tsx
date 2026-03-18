import  { useState } from "react";
import { MessageCircle, Phone, ChevronDown  } from "lucide-react";

const faqs = [
  {
    question: "How do I add a new listing?",
    answer:
      "To add a new listing, log in to your dashboard and click on the 'Add Listing' button. Fill in the required details such as property title, description, price, location, and upload images. Once completed, submit the listing for review.",
  },
  {
    question: "Why was my listing rejected?",
    answer:
      "Listings may be rejected if they contain incomplete information, inaccurate details, low-quality images, or violate platform guidelines. Review the feedback provided and update your listing before resubmitting.",
  },
  {
    question: "How do I upgrade my subscription?",
    answer:
      "Go to your account settings and navigate to the 'Subscription' section. Choose your preferred plan and follow the payment instructions to upgrade. Changes take effect immediately after successful payment.",
  },
  {
    question: "What if I receive a complaint?",
    answer:
      "If you receive a complaint, you will be notified via email or dashboard. Review the issue carefully and respond promptly. Providing accurate information and resolving disputes quickly helps maintain your reputation.",
  },
  {
    question: "How is my trust score calculated?",
    answer:
      "Your trust score is based on multiple factors including listing accuracy, response time, customer feedback, and complaint resolution. Consistently providing quality service improves your score over time.",
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
  icon

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
          How can we help?
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Find answers to common questions or contact support
        </p>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-sm font-medium text-gray-600 mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 ">
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
              icon={<MessageCircle size={18}  className="text-green-600"/>} 
            />
            <ContactCard
              title="Email Support"
              value="support@ogalandlord.com"
              icon={<MessageCircle size={18} className="text-blue-600"/>}
             
            />
            <ContactCard
              title="Phone Support"
              value="+234 800 123 4567"
             icon={<Phone size={18} className="text-purple-600"/>}
            />

            <div className="flex items-center gap-3 p-4 border border-blue-200 rounded-xl bg-blue-50 text-blue-600 text-sm">
              <span>💡</span>
              <p>
                Our support team is available Monday to Friday, 9:00 AM - 6:00 PM WAT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
