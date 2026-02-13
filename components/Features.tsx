import React from 'react';
import { Shield, TrendingUp, Users, Clock } from 'lucide-react';
import { SectionId } from '../types';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-[#AF0c15]" />,
      title: 'Trusted Security',
      desc: 'Every transaction is verified with bank-grade security protocols for your peace of mind.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#AF0c15]" />,
      title: 'Market Analysis',
      desc: 'Get real-time data and AI-driven insights to make the best investment decisions.'
    },
    {
      icon: <Users className="w-8 h-8 text-[#AF0c15]" />,
      title: 'Expert Support',
      desc: 'Our dedicated team of agents is available 24/7 to guide you through every step.'
    },
    {
      icon: <Clock className="w-8 h-8 text-[#AF0c15]" />,
      title: 'Fast Processing',
      desc: 'We streamline the paperwork so you can move into your dream home faster than ever.'
    }
  ];

  return (
    <section id={SectionId.ABOUT} className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-[#AF0c15] uppercase tracking-widest mb-3">Why Choose LuxeEstate</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">Redefining the Real Estate Experience</h3>
          <p className="text-slate-600 text-lg">We combine human expertise with cutting-edge technology to provide a seamless, transparent, and enjoyable journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-50 hover:bg-[#AF0c15] border border-slate-100 hover:border-[#AF0c15] shadow-sm hover:shadow-xl hover:shadow-red-900/20 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-100 group-hover:border-white/20">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-[#181818] group-hover:text-white mb-3 font-['Space_Grotesk'] transition-colors">{feature.title}</h4>
              <p className="text-slate-600 group-hover:text-slate-100 leading-relaxed transition-colors">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;