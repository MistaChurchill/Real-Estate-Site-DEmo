import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Property, SectionId } from '../types';
import { Home, Trees, Key, Search, MapPin, DollarSign, ChevronDown, ArrowUpDown } from 'lucide-react';

type TabType = 'sale' | 'land' | 'rent';

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

const PRICE_RANGES: Record<TabType, PriceRange[]> = {
  sale: [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Under $500k', min: 0, max: 500000 },
    { label: '$500k - $1M', min: 500000, max: 1000000 },
    { label: '$1M - $2.5M', min: 1000000, max: 2500000 },
    { label: 'Over $2.5M', min: 2500000, max: Infinity },
  ],
  rent: [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Under $2k/mo', min: 0, max: 2000 },
    { label: '$2k - $5k/mo', min: 2000, max: 5000 },
    { label: '$5k - $10k/mo', min: 5000, max: 10000 },
    { label: 'Over $10k/mo', min: 10000, max: Infinity },
  ],
  land: [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Under $200k', min: 0, max: 200000 },
    { label: '$200k - $500k', min: 200000, max: 500000 },
    { label: '$500k - $1M', min: 500000, max: 1000000 },
    { label: 'Over $1M', min: 1000000, max: Infinity },
  ]
};

type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'popular';

interface ListingsProps {
  onPropertySelect?: (property: Property) => void;
  properties: Property[];
}

const Listings: React.FC<ListingsProps> = ({ onPropertySelect, properties }) => {
  const [activeTab, setActiveTab] = useState<TabType>('sale');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Reset price filter when switching tabs
  useEffect(() => {
    setSelectedRangeIndex(0);
  }, [activeTab]);

  const currentRanges = PRICE_RANGES[activeTab];

  // Filter properties
  let filteredProperties = properties.filter(p => {
    const matchesTab = p.listingType === activeTab;
    const matchesLocation = 
      p.address.toLowerCase().includes(locationFilter.toLowerCase()) || 
      p.title.toLowerCase().includes(locationFilter.toLowerCase());
    
    const range = currentRanges[selectedRangeIndex];
    const matchesPrice = p.price >= range.min && p.price <= range.max;

    return matchesTab && matchesLocation && matchesPrice;
  });

  // Sort properties
  filteredProperties.sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'newest':
        // If dateAdded is missing, treat as old
        return (new Date(b.dateAdded || '2000-01-01').getTime()) - (new Date(a.dateAdded || '2000-01-01').getTime());
      case 'popular':
        // Sort by isPopular flag (true first), then random or secondary sort
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      default:
        return 0;
    }
  });

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'sale', label: 'Homes for Sale', icon: <Home className="w-4 h-4" /> },
    { id: 'land', label: 'Lands for Sale', icon: <Trees className="w-4 h-4" /> },
    { id: 'rent', label: 'Rentals', icon: <Key className="w-4 h-4" /> },
  ];

  return (
    <section id={SectionId.LISTINGS} className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#181818] mb-6 font-['Space_Grotesk']">
            Discover Your Next Chapter
          </h2>
          <p className="text-slate-600 text-lg">
            Find the perfect property that matches your lifestyle and budget.
          </p>
        </div>
        
        {/* Navigation & Filtering Container */}
        <div className="max-w-5xl mx-auto mb-16 space-y-8">
          
          {/* 1. Category Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white p-2 rounded-2xl shadow-lg border border-slate-100 overflow-x-auto max-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#AF0c15] text-white shadow-md'
                      : 'text-slate-500 hover:text-[#181818] hover:bg-slate-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Advanced Filters Bar */}
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-6 items-center">
            
            {/* Location Input */}
            <div className="w-full md:flex-1 relative">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AF0c15] w-5 h-5" />
                <input 
                  type="text" 
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  placeholder="City, Zip, or Address..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all text-[#181818] placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-slate-100"></div>

            {/* Price Range Dropdown */}
            <div className="w-full md:flex-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Price Range</label>
              <div className="relative">
                 <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AF0c15] w-5 h-5 z-10" />
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                 <select 
                  value={selectedRangeIndex}
                  onChange={(e) => setSelectedRangeIndex(Number(e.target.value))}
                  className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all text-[#181818] font-medium appearance-none cursor-pointer"
                >
                  {currentRanges.map((range, idx) => (
                    <option key={idx} value={idx}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
             <div className="hidden md:block w-px h-12 bg-slate-100"></div>

             {/* Sort By Dropdown */}
            <div className="w-full md:w-48">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block ml-1">Sort By</label>
              <div className="relative">
                 <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AF0c15] w-4 h-4 z-10" />
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                 <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all text-[#181818] font-medium appearance-none cursor-pointer text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>
          
           {/* Results Count */}
            <div className="flex items-center justify-end px-2">
               <div className="flex items-center gap-2 text-slate-500 font-medium whitespace-nowrap">
                  <span className="text-sm">Showing</span>
                  <div className="px-2 py-0.5 rounded-md bg-[#181818] text-white flex items-center justify-center font-bold text-xs">
                    {filteredProperties.length}
                  </div>
                  <span className="text-sm">Properties</span>
               </div>
            </div>
        </div>

        {/* Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onViewDetails={onPropertySelect}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#181818] mb-2">No properties found</h3>
            <p className="text-slate-500 max-w-md">
              We couldn't find any listings matching your criteria. Try adjusting your filters.
            </p>
            <button 
              onClick={() => {
                setSelectedRangeIndex(0);
                setLocationFilter('');
              }}
              className="mt-6 text-[#AF0c15] font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Footer Button (Only show if there are results) */}
        {filteredProperties.length > 0 && (
          <div className="mt-20 text-center">
            <button className="px-10 py-4 bg-white border border-slate-300 rounded-xl font-semibold text-[#181818] hover:bg-[#AF0c15] hover:border-[#AF0c15] hover:text-white transition-all shadow-sm">
              View All {tabs.find(t => t.id === activeTab)?.label}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Listings;