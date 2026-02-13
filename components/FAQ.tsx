import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I schedule a property viewing?",
      answer: "Scheduling a viewing is simple. Navigate to any property listing you love, click the 'View Details' button, and use the 'Schedule Viewing' form. Alternatively, you can contact us directly via phone or email."
    },
    {
      question: "What documents do I need to prepare for buying a home?",
      answer: "Generally, you will need a valid government ID, proof of income (recent pay stubs or tax returns), bank statements for proof of funds, and a pre-approval letter from your mortgage lender."
    },
    {
      question: "Do you assist with securing a mortgage?",
      answer: "Yes, we have strong partnerships with leading banks and mortgage brokers. We can connect you with trusted professionals who can help you find the best rates and loan terms for your financial situation."
    },
    {
      question: "What are your agency fees for buyers?",
      answer: "In most residential real estate transactions, the agency fee (commission) is paid by the seller. As a buyer, you typically do not pay us a direct fee for our services, making it easier for you to find your dream home."
    },
    {
      question: "How long does the entire buying process take?",
      answer: "The timeline can vary. On average, once an offer is accepted, the closing process takes about 30 to 45 days. This allows time for inspections, appraisals, and finalizing financing. We guide you through every step to ensure no delays."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-24 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#181818] mb-4 font-['Space_Grotesk']">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-lg">Everything you need to know about finding your place.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#AF0c15]/30 bg-slate-50/50">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white transition-colors"
              >
                <span className="font-bold text-lg text-[#181818] font-['Space_Grotesk']">{faq.question}</span>
                {openFaq === idx ? <Minus className="text-[#AF0c15] shrink-0 ml-4" /> : <Plus className="text-slate-400 shrink-0 ml-4" />}
              </button>
              <div 
                className={`bg-white text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === idx ? 'max-h-48 p-6 pt-0 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;