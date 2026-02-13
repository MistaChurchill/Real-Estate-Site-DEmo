import React, { useState } from 'react';
import { SectionId } from '../types';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-white text-[#181818] relative overflow-hidden border-t border-slate-100">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#AF0c15]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['Space_Grotesk'] text-[#181818]">Let's find your dream home together.</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-lg">
              Have questions about a listing or want to schedule a viewing? 
              Fill out the form, and our team (or Lux AI) will get back to you instantly.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#AF0c15]/10 flex items-center justify-center text-[#AF0c15] group-hover:bg-[#AF0c15] group-hover:text-white transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Call Us 24/7</p>
                  <p className="text-xl font-bold text-[#181818] font-['Space_Grotesk']">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#AF0c15]/10 flex items-center justify-center text-[#AF0c15] group-hover:bg-[#AF0c15] group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Email Us</p>
                  <p className="text-xl font-bold text-[#181818] font-['Space_Grotesk']">hello@luxeestate.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-[#AF0c15]/10 flex items-center justify-center text-[#AF0c15] group-hover:bg-[#AF0c15] group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Visit HQ</p>
                  <p className="text-xl font-bold text-[#181818] font-['Space_Grotesk']">100 Luxury Blvd, Beverly Hills</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-[2rem] p-8 md:p-10 text-[#181818] shadow-2xl shadow-slate-200 border border-slate-100">
            {submitted ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-[#AF0c15]/10 text-[#AF0c15] rounded-full flex items-center justify-center mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 font-['Space_Grotesk']">Message Sent!</h3>
                <p className="text-slate-600">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#181818] ml-1">First Name</label>
                    <input required type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all text-[#181818] placeholder-slate-400" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#181818] ml-1">Last Name</label>
                    <input required type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all text-[#181818] placeholder-slate-400" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#181818] ml-1">Email Address</label>
                  <input required type="email" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all text-[#181818] placeholder-slate-400" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#181818] ml-1">Message</label>
                  <textarea required rows={4} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all resize-none text-[#181818] placeholder-slate-400" placeholder="I'm interested in the villa..."></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-[#AF0c15] hover:bg-[#8a0910] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;