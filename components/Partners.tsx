import React from 'react';

const PARTNERS = [
  { name: 'Compass', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Compass_Inc._logo.svg' },
  { name: 'Sothebys', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Sotheby%27s_International_Realty_logo.svg' },
  { name: 'Zillow', url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Zillow_logo.svg' },
  { name: 'Redfin', url: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Redfin_Logo.svg' },
  { name: 'Houzz', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Houzz_logo.svg' },
  { name: 'Realtor', url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Realtor.com_logo.svg' },
  { name: 'Christies', url: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Christies_logo.svg' },
];

const Partners: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Trusted Partners & Featured In</p>
      </div>

      <div className="relative w-full">
        {/* Fade masks for smooth edge transition */}
        <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling track */}
        <div className="flex w-max animate-infinite-scroll hover:pause items-center">
          {/* First set */}
          <div className="flex gap-16 md:gap-24 px-8 md:px-12">
            {PARTNERS.map((partner, idx) => (
              <div key={`p1-${idx}`} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                <img 
                  src={partner.url} 
                  alt={partner.name} 
                  className="h-8 md:h-10 w-auto object-contain max-w-[140px] md:max-w-[160px]" 
                />
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-16 md:gap-24 px-8 md:px-12">
            {PARTNERS.map((partner, idx) => (
              <div key={`p2-${idx}`} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                <img 
                  src={partner.url} 
                  alt={partner.name} 
                  className="h-8 md:h-10 w-auto object-contain max-w-[140px] md:max-w-[160px]" 
                />
              </div>
            ))}
          </div>
           {/* Triplicate set for wide screens to ensure no gaps */}
           <div className="flex gap-16 md:gap-24 px-8 md:px-12">
            {PARTNERS.map((partner, idx) => (
              <div key={`p3-${idx}`} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                <img 
                  src={partner.url} 
                  alt={partner.name} 
                  className="h-8 md:h-10 w-auto object-contain max-w-[140px] md:max-w-[160px]" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .animate-infinite-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;