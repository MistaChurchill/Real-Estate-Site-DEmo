import React from 'react';
import { Property } from '../types';
import PropertyCard from './PropertyCard';
import { Sparkles, Flame, ArrowRight, MapPin } from 'lucide-react';

interface FeaturedPropertiesProps {
  onPropertySelect: (property: Property) => void;
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ onPropertySelect, properties }) => {
  const newProperties = properties.filter(p => p.isNew);
  const popularProperties = properties.filter(p => p.isPopular).slice(0, 4);

  return (
    <div className="bg-white">
      {/* SECTION 1: Fresh on the Market (Horizontal Scroll) */}
      <section className="py-20 border-b border-slate-100">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2 text-[#AF0c15] font-bold text-sm uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#AF0c15] animate-pulse"></span>
                Fresh on the Market
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#181818] font-['Space_Grotesk']">Just Listed</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-slate-500 hover:text-[#AF0c15] transition-colors font-medium">
              View All New <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative -mx-6 px-6 lg:-mx-24 lg:px-24 overflow-x-auto pb-8 no-scrollbar flex gap-6 snap-x snap-mandatory">
            {newProperties.map((property) => (
              <div key={property.id} className="min-w-[300px] md:min-w-[380px] snap-center">
                <PropertyCard property={property} onViewDetails={onPropertySelect} />
              </div>
            ))}
            {/* CTA Card */}
            <div className="min-w-[200px] flex items-center justify-center snap-center">
               <button className="w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#AF0c15] hover:text-[#AF0c15] hover:scale-110 transition-all">
                 <ArrowRight size={24} />
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Trending / Popular (Grid) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-wider mb-4">
              <Flame size={12} fill="currentColor" /> Hot Properties
            </div>
            <h2 className="text-4xl font-bold text-[#181818] mb-4 font-['Space_Grotesk']">Trending This Week</h2>
            <p className="text-slate-600">The most viewed and requested properties in your area.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Popular Item (Larger) */}
            {popularProperties.length > 0 && (
              <div className="md:col-span-2 md:row-span-2">
                <div className="h-full group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl transition-all relative">
                   <div className="absolute top-6 left-6 z-10 bg-orange-500 text-white px-4 py-1.5 rounded-full font-bold text-sm uppercase tracking-wide flex items-center gap-2 shadow-lg">
                     <Flame size={14} fill="currentColor" /> #1 Trending
                   </div>
                   
                   <div className="h-[60%] overflow-hidden relative">
                     <img 
                       src={popularProperties[0].imageUrl} 
                       alt={popularProperties[0].title} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-3xl font-bold font-['Space_Grotesk']">${popularProperties[0].price.toLocaleString()}</p>
                     </div>
                   </div>
                   
                   <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[#181818] font-['Space_Grotesk'] mb-2">{popularProperties[0].title}</h3>
                          <p className="text-slate-500 flex items-center"><MapPin size={16} className="mr-1 text-[#AF0c15]" /> {popularProperties[0].address}</p>
                        </div>
                        <div className="text-right">
                           <div className="flex gap-4 text-sm font-bold text-slate-600">
                              <span>{popularProperties[0].beds} Beds</span>
                              <span>{popularProperties[0].baths} Baths</span>
                              <span>{popularProperties[0].sqft} sqft</span>
                           </div>
                        </div>
                      </div>
                      <p className="text-slate-600 mb-6 line-clamp-2">Experience the height of luxury in this exclusive property...</p>
                      <button 
                        onClick={() => onPropertySelect(popularProperties[0])}
                        className="w-full py-3 bg-[#181818] text-white font-bold rounded-xl hover:bg-[#AF0c15] transition-colors"
                      >
                        View Property Details
                      </button>
                   </div>
                </div>
              </div>
            )}

            {/* Other Popular Items */}
            <div className="flex flex-col gap-8 md:col-span-1 md:row-span-2">
              {popularProperties.slice(1, 3).map(property => (
                <div key={property.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex gap-4 items-center group cursor-pointer" onClick={() => onPropertySelect(property)}>
                   <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative">
                     <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div>
                     <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">
                        <Flame size={10} fill="currentColor" /> Trending
                     </div>
                     <h4 className="font-bold text-[#181818] leading-tight mb-1">{property.title}</h4>
                     <p className="text-[#AF0c15] font-bold text-sm">${property.price.toLocaleString()}</p>
                   </div>
                </div>
              ))}
              
              <div className="mt-auto bg-[#AF0c15] text-white p-6 rounded-2xl text-center">
                 <Sparkles className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                 <h4 className="font-bold text-xl mb-2 font-['Space_Grotesk']">Unlock Exclusive Listings</h4>
                 <p className="text-sm text-white/80 mb-4">Sign up to get notified before they hit the market.</p>
                 <button className="w-full py-2 bg-white text-[#AF0c15] font-bold rounded-lg hover:bg-slate-100 transition-colors">
                   Join VIP List
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProperties;