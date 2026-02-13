import React from 'react';
import Partners from './Partners';
import Features from './Features';
import { SectionId } from '../types';
import { ArrowRight, Star, Users, Building, Globe } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (id: SectionId) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const teamMembers = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop',
    },
    {
      name: 'David Chen',
      role: 'Head of Sales',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Senior Broker',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2669&auto=format&fit=crop',
    },
    {
      name: 'Michael Ross',
      role: 'Investment Specialist',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop',
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Space_Grotesk']">About LuxeEstate</h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light">
            Redefining luxury real estate with a commitment to excellence, innovation, and integrity.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#AF0c15] font-bold uppercase tracking-widest mb-4">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#181818] mb-8 font-['Space_Grotesk']">
                A Legacy of Trust & Excellence
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Founded in 2010, LuxeEstate began with a simple mission: to elevate the real estate experience for the modern buyer. What started as a boutique agency in Beverly Hills has grown into a premier global firm, connecting discerning clients with the world's most exclusive properties.
                </p>
                <p>
                  We believe that a home is more than just a place to live—it's a canvas for your life. Our team of expert agents combines deep market knowledge with a personal touch, ensuring that every transaction is as seamless as it is successful.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <p className="text-4xl font-bold text-[#181818] font-['Space_Grotesk']">15+</p>
                  <p className="text-slate-500">Years of Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#181818] font-['Space_Grotesk']">$2B+</p>
                  <p className="text-slate-500">In Total Sales</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#181818] font-['Space_Grotesk']">1.2k</p>
                  <p className="text-slate-500">Happy Families</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#181818] font-['Space_Grotesk']">50+</p>
                  <p className="text-slate-500">Cities Covered</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059ee971?q=80&w=2573&auto=format&fit=crop" 
                  alt="Office Meeting" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="font-bold text-[#181818] italic text-lg mb-4">
                  "LuxeEstate transformed our search for a dream home into an enjoyable journey. Highly recommended!"
                </p>
                <p className="text-sm font-bold text-[#AF0c15] uppercase tracking-wide">- The Anderson Family</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Features */}
      <Features />

      {/* Team Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">Meet Our Leadership</h2>
            <p className="text-slate-600 text-lg">The visionaries behind our success and your satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#181818] font-['Space_Grotesk']">{member.name}</h3>
                  <p className="text-[#AF0c15] font-medium mb-4">{member.role}</p>
                  <button className="text-slate-400 hover:text-[#181818] text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 mx-auto transition-colors">
                    View Profile <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <Partners />

      {/* CTA */}
      <section className="py-24 bg-[#181818] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 font-['Space_Grotesk']">Ready to work with the best?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
            Whether you're buying, selling, or investing, our team is ready to deliver exceptional results.
          </p>
          <button 
            onClick={() => onNavigate(SectionId.CONTACT)}
            className="px-10 py-4 bg-[#AF0c15] text-white rounded-xl font-bold text-lg hover:bg-white hover:text-[#181818] transition-all"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;