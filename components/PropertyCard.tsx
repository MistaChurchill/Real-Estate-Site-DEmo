import React, { useState, useEffect } from 'react';
import { Bed, Bath, Maximize, Heart, MapPin, Trees, ChevronLeft, ChevronRight, Sparkles, Flame } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
  minimal?: boolean; // For carousel views
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails, minimal = false }) => {
  const isLand = property.listingType === 'land';
  const isRent = property.listingType === 'rent';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Use provided imageUrls or fallback to single imageUrl wrapped in array
  const images = property.imageUrls && property.imageUrls.length > 0 
    ? property.imageUrls 
    : [property.imageUrl];

  // Auto-slide effect: Changes image every 2 seconds, resets on interaction, pauses on hover
  useEffect(() => {
    // Don't auto-slide if hovered (so user can use controls) or if there's only one image
    if (isHovered || images.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentImageIndex, isHovered, images.length]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:border-[#AF0c15] transition-all duration-300 hover:-translate-y-1 flex flex-col h-full relative">
      {/* Image Container */}
      <div 
        className="relative h-64 overflow-hidden shrink-0 group/image"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full shrink-0">
              <img
                src={img}
                alt={`${property.title} - Image ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
        
        {/* Carousel Controls (only if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-md text-slate-800 hover:bg-[#AF0c15] hover:text-white transition-all opacity-0 group-hover/image:opacity-100 z-20 hover:scale-110"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-md text-slate-800 hover:bg-[#AF0c15] hover:text-white transition-all opacity-0 group-hover/image:opacity-100 z-20 hover:scale-110"
            >
              <ChevronRight size={18} />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover/image:opacity-100 transition-opacity">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${
                    idx === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'
                  }`} 
                />
              ))}
            </div>
          </>
        )}

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {property.isNew && (
            <div className="bg-emerald-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
              <Sparkles size={10} fill="currentColor" /> Just Listed
            </div>
          )}
          {property.isPopular && (
            <div className="bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
              <Flame size={10} fill="currentColor" /> Trending
            </div>
          )}
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#AF0c15] border border-[#AF0c15]/20 shadow-sm">
            {property.tag}
          </div>
        </div>

        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md text-[#181818] hover:bg-[#AF0c15] hover:text-white transition-colors z-10 shadow-sm">
          <Heart className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-10">
          <p className="text-white text-2xl font-bold font-['Space_Grotesk']">
            ${property.price.toLocaleString()}
            {isRent && <span className="text-sm font-normal text-slate-200">/mo</span>}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-white hover:bg-[#AF0c15] transition-colors duration-300">
        <h3 className="text-lg font-bold text-[#181818] mb-1 line-clamp-1 group-hover:text-white transition-colors font-['Space_Grotesk']">{property.title}</h3>
        <div className="flex items-center text-slate-500 text-sm mb-4 group-hover:text-slate-200 transition-colors">
          <MapPin className="w-4 h-4 mr-1 text-[#AF0c15] group-hover:text-white transition-colors shrink-0" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        <div className={`mt-auto flex items-center ${isLand ? 'justify-center' : 'justify-between'} py-4 border-t border-slate-100 group-hover:border-white/20 transition-colors`}>
          
          {!isLand && (
            <>
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 rounded-full bg-slate-50 text-[#AF0c15] group-hover:bg-white group-hover:text-[#AF0c15] transition-colors">
                  <Bed className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-500 group-hover:text-slate-200 transition-colors">{property.beds} Beds</span>
              </div>
              <div className="w-px h-8 bg-slate-200 group-hover:bg-white/20 transition-colors"></div>
              <div className="flex flex-col items-center gap-1">
                <div className="p-2 rounded-full bg-slate-50 text-[#AF0c15] group-hover:bg-white group-hover:text-[#AF0c15] transition-colors">
                  <Bath className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-500 group-hover:text-slate-200 transition-colors">{property.baths} Baths</span>
              </div>
              <div className="w-px h-8 bg-slate-200 group-hover:bg-white/20 transition-colors"></div>
            </>
          )}

          <div className={`flex flex-col items-center gap-1 ${isLand ? 'flex-row gap-3' : ''}`}>
            <div className="p-2 rounded-full bg-slate-50 text-[#AF0c15] group-hover:bg-white group-hover:text-[#AF0c15] transition-colors">
              {isLand ? <Trees className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </div>
            <span className={`text-xs font-medium text-slate-500 group-hover:text-slate-200 transition-colors ${isLand ? 'text-base' : ''}`}>
              {property.sqft.toLocaleString()} {isLand ? 'Acres' : 'sqft'}
            </span>
          </div>
        </div>

        <button 
          onClick={() => onViewDetails?.(property)}
          className="w-full mt-2 py-3 rounded-xl border border-slate-200 text-[#181818] font-semibold group-hover:bg-white group-hover:border-white group-hover:text-[#AF0c15] transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;