import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

// Dummy data for the FAQ section
const faqData = [
  { 
    id: 1, 
    question: "Why should I partner with IFDP?", 
    answer: "Partnering with JAYAK HUB  expands your reach, increases order volume, and utilizes our delivery network." 
  },
  { 
    id: 2, 
    question: "Is my restaurant a good fit for IFDP?", 
    answer: "JAYAK HUB  welcomes a variety of cuisines and restaurant types, including physical stores and cloud kitchens." 
  },
  { 
    id: 3, 
    question: "What are the requirements to become a partner?", 
    answer: "Key requirements usually include valid business registration, necessary licenses, and an attractive menu." 
  },
  // Add remaining questions here for a complete list
  { id: 4, question: "Can I join without a physical storefront?", answer: "Yes, JAYAK HUB  supports cloud kitchens (delivery-only) models." },
  { id: 5, question: "How do I get started?", answer: "You can start by filling out the online application form on our partner portal." },
  { id: 6, question: "How long does the approval process take?", answer: "The approval time varies, but usually takes a few days after submitting all required documents." },
  { id: 7, question: "How do I know if my business is verified?", answer: "You will receive an official email confirmation once your business verification is complete." },
  { id: 8, question: "What is the commission fee for partners?", answer: "The commission structure is based on the service model and will be discussed during the partnership agreement." },
  { id: 9, question: "Can I pause orders if it gets too busy?", answer: "Yes, you have control through the partner app to temporarily pause orders during peak rushes." },
  { id: 10, question: "How can I contact partner support?", answer: "Partner support is available via phone, email, or through the dedicated help section in the partner app." },
];


const FAQSection: React.FC = () => {
  // State to track which item is currently open. It stores the ID of the open item.
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    // Agar wohi item khula hai, toh usko band kar do. Warna naya item khol do.
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8 ">
      
      {/* Section Title */}
      <h2 className="text-3xl font-normal text-center text-gray-900 mb-10">
        Any questions?
      </h2>

      {/* Accordion Container */}
      <div className="border-t border-[#FFF9EE]">
        {faqData.map((item) => (
          <div key={item.id} className="border-b border-[#FFF9EE]">
            
            {/* Question (Clickable Header) */}
            <button
              className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
              onClick={() => toggleItem(item.id)}
              aria-expanded={openItemId === item.id}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="text-base font-normal text-gray-800">
                {item.question}
              </span>
              
              {/* Icon to show open/close state */}
              {openItemId === item.id ? (
                <IoIosArrowUp className="h-5 w-5 text-[#0B5D4E] transition-transform duration-300" />
              ) : (
                <IoIosArrowDown className="h-5 w-5 text-gray-400 transition-transform duration-300" />
              )}
            </button>

            {/* Answer (Content) - Shows/Hides based on openItemId state */}
            {openItemId === item.id && (
              <div 
                id={`faq-answer-${item.id}`} 
                className="pb-4 pr-6 text-gray-600 text-sm transition-all duration-300 ease-in-out"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;