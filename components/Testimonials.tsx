import React, { useState } from 'react';
import { Star, Quote, Home, TrendingUp, MapPin } from 'lucide-react';

type ClientType = 'buyer' | 'seller';

const TESTIMONIALS = [
  // BUYERS
  {
    id: 1,
    type: 'buyer',
    name: 'The Harrison Family',
    role: 'First-time Homeowners',
    location: 'Beverly Hills, CA',
    image: 'https://images.unsplash.com/photo-1513258496098-882717dbf58c?q=80&w=2670&auto=format&fit=crop',
    quote: "Finding our first home felt overwhelming until we met the LuxeEstate team. They didn't just show us houses; they listened to our story and found a place where we could build our future. The attention to detail was unmatched.",
    rating: 5
  },
  {
    id: 2,
    type: 'buyer',
    name: 'Marcus Chen',
    role: 'Tech Entrepreneur',
    location: 'Downtown Loft',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
    quote: "I needed a space that matched my lifestyle—modern, central, and ready to move in. Lux AI helped me narrow down the options instantly, and the agent had me touring my dream loft the next day. Efficient and professional.",
    rating: 5
  },
  {
    id: 3,
    type: 'buyer',
    name: 'Elena & Sofia',
    role: 'Property Investors',
    location: 'Miami, FL',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2669&auto=format&fit=crop',
    quote: "We've worked with many agencies over the years, but LuxeEstate's market analysis and investment insights are on another level. They helped us secure a vacation rental that has already appreciated by 15% in six months.",
    rating: 5
  },
  // SELLERS
  {
    id: 4,
    type: 'seller',
    name: 'Robert Fox',
    role: 'Sold in 14 Days',
    location: 'Seattle, WA',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop',
    quote: "I was skeptical about getting the asking price in this market, but their marketing strategy was brilliant. The photography and virtual tour attracted multiple offers within the first week. We closed faster than I imagined possible.",
    rating: 5
  },
  {
    id: 5,
    type: 'seller',
    name: 'Sarah Jenkins',
    role: 'Relocating Executive',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop',
    quote: "Moving overseas is stressful enough without worrying about selling a property. LuxeEstate handled everything—from staging to negotiations—while I was already in London. They made a complex process feel effortless.",
    rating: 5
  },
  {
    id: 6,
    type: 'seller',
    name: 'James & Linda Wilson',
    role: 'Downsizing',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2588&auto=format&fit=crop',
    quote: "Leaving our family home of 30 years was emotional. The agents treated us with such care and respect, finding a buyer who loved the house as much as we did. It wasn't just a transaction; it was a transition handled with grace.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ClientType>('buyer');

  const filteredTestimonials = TESTIMONIALS.filter(t => t.type === activeTab);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#AF0c15]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-[#AF0c15] uppercase tracking-widest mb-3">Client Success Stories</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">
            Trusted by Buyers & Sellers Alike
          </h3>
          <p className="text-slate-600 text-lg">
            Don't just take our word for it. Hear from the people who found their perfect match with LuxeEstate.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-1.5 rounded-full shadow-lg border border-slate-100 flex items-center relative">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'buyer' 
                  ? 'text-white' 
                  : 'text-slate-500 hover:text-[#181818]'
              }`}
            >
              <Home size={18} />
              For Buyers
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'seller' 
                  ? 'text-white' 
                  : 'text-slate-500 hover:text-[#181818]'
              }`}
            >
              <TrendingUp size={18} />
              For Sellers
            </button>
            
            {/* Sliding Background */}
            <div 
              className={`absolute top-1.5 bottom-1.5 rounded-full bg-[#AF0c15] shadow-md transition-all duration-300 ease-in-out ${
                activeTab === 'buyer' ? 'left-1.5 w-[160px]' : 'left-[165px] w-[160px]'
              }`}
            ></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                 <div className="flex gap-1">
                   {[...Array(item.rating)].map((_, i) => (
                     <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                   ))}
                 </div>
                 <Quote className="text-[#AF0c15]/20 w-8 h-8" />
              </div>

              <blockquote className="text-slate-600 leading-relaxed mb-8 flex-grow italic">
                "{item.quote}"
              </blockquote>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-50">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-[#181818] font-['Space_Grotesk'] leading-tight">{item.name}</h4>
                  <p className="text-xs text-[#AF0c15] font-semibold uppercase tracking-wide mb-0.5">{item.role}</p>
                  <div className="flex items-center text-slate-400 text-xs">
                    <MapPin size={10} className="mr-1" />
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;