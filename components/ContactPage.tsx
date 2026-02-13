import React, { useState } from 'react';
import Contact from './Contact';
import { Plus, Minus } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I schedule a property viewing?",
      answer: "You can schedule a viewing directly through any property listing page by clicking 'Schedule Viewing', or by filling out the contact form below with the property details and your preferred time."
    },
    {
      question: "What documents do I need to buy a home?",
      answer: "Typically, you'll need proof of identity, proof of income (pay stubs, tax returns), bank statements, and a pre-approval letter from a lender. Our agents will guide you through the specific requirements for your situation."
    },
    {
      question: "Do you offer property management services?",
      answer: "Yes, we offer comprehensive property management services for landlords and investors, including tenant screening, rent collection, and maintenance coordination."
    },
    {
      question: "How long does the buying process usually take?",
      answer: "On average, the process takes 30-45 days from the time an offer is accepted to closing. However, this can vary based on financing, contingencies, and other factors."
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 pt-20">
      <div className="bg-[#181818] py-20 text-center">
        <div className="container mx-auto px-6">
           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Space_Grotesk']">Contact Us</h1>
           <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
             We're here to help you finding your dream home.
           </p>
        </div>
      </div>

      <Contact />

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-24 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#181818] mb-4 font-['Space_Grotesk']">Frequently Asked Questions</h2>
            <p className="text-slate-600">Find quick answers to common questions about our services.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#AF0c15]/30">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-lg text-[#181818]">{faq.question}</span>
                  {openFaq === idx ? <Minus className="text-[#AF0c15]" /> : <Plus className="text-slate-400" />}
                </button>
                <div 
                  className={`bg-slate-50 text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === idx ? 'max-h-48 p-6 pt-0' : 'max-h-0'
                  }`}
                >
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;