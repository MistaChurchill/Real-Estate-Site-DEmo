import React, { useState } from 'react';
import { Property } from '../types';
import { ArrowLeft, Bed, Bath, Maximize, Calendar, MapPin, Check, Shield, Star, Clock, Grid, X, FileText, Download } from 'lucide-react';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onBack }) => {
  const [showGallery, setShowGallery] = useState(false);

  // Normalize images: use imageUrls if available, otherwise fallback to single imageUrl
  const images = property.imageUrls && property.imageUrls.length > 0 
    ? property.imageUrls 
    : [property.imageUrl];

  // Mock detailed data based on the property for demonstration
  const features = [
    'Smart Home System',
    'Hardwood Floors',
    'Custom Kitchen Cabinetry',
    'Spa-like Master Bath',
    'High Ceilings',
    'Energy Efficient Windows',
    'Private Outdoor Space',
    'Attached Garage'
  ];

  const description = `Experience the epitome of luxury living in this stunning ${property.title.toLowerCase()}. 
  Located at ${property.address}, this residence offers a perfect blend of modern sophistication and timeless elegance. 
  
  Spanning ${property.sqft.toLocaleString()} square feet, the open-concept floor plan is flooded with natural light, highlighting the premium finishes throughout. 
  The gourmet kitchen features state-of-the-art appliances and a large island, perfect for entertaining. 
  
  Retreat to the primary suite, a true sanctuary with a spa-inspired bathroom and ample closet space. 
  Whether you're enjoying the views from your private terrace or relaxing by the fireplace, every detail has been carefully curated for your comfort.`;

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500 relative">
      
      {/* Full Screen Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-[60] bg-black text-white overflow-y-auto animate-in fade-in duration-300">
          <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-black/80 backdrop-blur-md border-b border-white/10">
             <div>
               <h3 className="text-xl font-bold font-['Space_Grotesk']">{property.title}</h3>
               <p className="text-sm text-slate-400">{images.length} Photos</p>
             </div>
             <button 
               onClick={() => setShowGallery(false)}
               className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
             >
               <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
             </button>
          </div>
          <div className="container mx-auto px-4 py-8 pb-20">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`relative group overflow-hidden rounded-xl bg-slate-900 ${
                      idx === 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Gallery view ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Hero Image Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden group">
        <img 
          src={images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute top-0 left-0 right-0 p-6 lg:px-24 pt-32 z-10">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-[#181818] transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Listings
          </button>
        </div>

        {/* View Photos Button (visible if multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-32 md:bottom-12 right-6 lg:right-24 z-20">
             <button 
              onClick={() => setShowGallery(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-[#181818] rounded-xl font-bold shadow-xl hover:bg-slate-100 hover:scale-105 transition-all"
            >
              <Grid size={18} />
              View All Photos ({images.length})
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:px-24 pb-12 pointer-events-none">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 pointer-events-auto">
                <span className="px-3 py-1 rounded-full bg-[#AF0c15] text-white text-xs font-bold uppercase tracking-wider">
                  {property.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Listing
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 font-['Space_Grotesk']">{property.title}</h1>
              <div className="flex items-center text-slate-200 text-lg">
                <MapPin className="w-5 h-5 mr-2 text-[#AF0c15]" />
                {property.address}
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm uppercase tracking-widest font-medium mb-1">Price</p>
              <p className="text-5xl font-bold text-white font-['Space_Grotesk']">${property.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-6 lg:px-24 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-center p-4 border-r border-slate-200 last:border-0">
                <Bed className="w-6 h-6 mx-auto mb-2 text-[#AF0c15]" />
                <p className="text-2xl font-bold text-[#181818] font-['Space_Grotesk']">{property.beds}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Bedrooms</p>
              </div>
              <div className="text-center p-4 md:border-r border-slate-200 last:border-0">
                <Bath className="w-6 h-6 mx-auto mb-2 text-[#AF0c15]" />
                <p className="text-2xl font-bold text-[#181818] font-['Space_Grotesk']">{property.baths}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Bathrooms</p>
              </div>
              <div className="text-center p-4 border-r border-slate-200 last:border-0">
                <Maximize className="w-6 h-6 mx-auto mb-2 text-[#AF0c15]" />
                <p className="text-2xl font-bold text-[#181818] font-['Space_Grotesk']">{property.sqft.toLocaleString()}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Square Feet</p>
              </div>
              <div className="text-center p-4">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-[#AF0c15]" />
                <p className="text-2xl font-bold text-[#181818] font-['Space_Grotesk']">2024</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Year Built</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-2xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">About this Property</h3>
              <p className="text-slate-600 leading-8 text-lg whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">Property Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="p-1 rounded-full bg-[#AF0c15]/10 text-[#AF0c15]">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Landmarks */}
            {property.landmarks && (
              <div>
                <h3 className="text-2xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">Nearby Landmarks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.landmarks.map((lm, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                       <div className="flex items-center gap-3">
                         <div className="p-2 bg-white rounded-full text-[#AF0c15] shadow-sm">
                           <MapPin size={16} />
                         </div>
                         <div>
                           <p className="font-bold text-[#181818]">{lm.name}</p>
                           <p className="text-xs text-slate-500">{lm.type}</p>
                         </div>
                       </div>
                       <span className="text-sm font-bold text-slate-400">{lm.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {property.documents && (
              <div>
                <h3 className="text-2xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">Property Documents</h3>
                <div className="space-y-3">
                  {property.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-[#AF0c15] hover:bg-slate-50 transition-all cursor-pointer group">
                       <div className="flex items-center gap-4">
                         <div className="p-3 bg-red-50 text-[#AF0c15] rounded-lg">
                           <FileText size={20} />
                         </div>
                         <div>
                           <p className="font-bold text-[#181818] group-hover:text-[#AF0c15] transition-colors">{doc.title}</p>
                           <p className="text-xs text-slate-500 uppercase font-semibold">{doc.type} • {doc.size}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#AF0c15] transition-colors">
                         <span className="text-sm font-bold hidden sm:block">Download</span>
                         <Download size={20} />
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div className="h-80 bg-slate-100 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.006,40.7128,13,0/800x400?access_token=YOUR_TOKEN')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
               <div className="relative z-10 bg-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-[#AF0c15] font-bold">
                 <MapPin className="w-5 h-5" />
                 View on Map
               </div>
            </div>

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Developer/Owner Card - Highly Conspicuous */}
              {property.developer && (
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-lg text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#AF0c15]"></div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Presented By</p>
                  
                  <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 p-2 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <img src={property.developer.logoUrl} alt={property.developer.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#181818] font-['Space_Grotesk'] mb-1">{property.developer.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">Official Developer</p>
                  
                  <button className="w-full py-2 rounded-lg border border-slate-200 text-xs font-bold text-[#181818] hover:bg-[#181818] hover:text-white transition-all uppercase tracking-wider">
                    View Portfolio
                  </button>
                </div>
              )}

              <div className="p-8 rounded-3xl border border-slate-200 shadow-xl bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" alt="Agent" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-[#181818] text-lg font-['Space_Grotesk']">Sarah Mitchell</p>
                    <p className="text-slate-500 text-sm">Senior Estate Agent</p>
                    <div className="flex gap-1 mt-1">
                       {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                   <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all" />
                   <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all" />
                   <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all" />
                   <textarea rows={3} placeholder="I am interested in this property..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all resize-none"></textarea>
                   
                   <button className="w-full py-4 bg-[#AF0c15] hover:bg-[#8a0910] text-white font-bold rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
                     Schedule Viewing
                   </button>
                   <button className="w-full py-4 bg-white border border-slate-200 text-[#181818] font-bold rounded-xl hover:bg-slate-50 transition-all">
                     Ask a Question
                   </button>
                </form>
              </div>

              <div className="p-6 rounded-3xl bg-[#181818] text-white">
                 <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-[#AF0c15]" />
                    <div>
                      <h4 className="font-bold font-['Space_Grotesk']">Verified Listing</h4>
                      <p className="text-xs text-slate-400">Inspected & Approved</p>
                    </div>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed">
                   This property has passed our comprehensive 150-point inspection and title verification process.
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;