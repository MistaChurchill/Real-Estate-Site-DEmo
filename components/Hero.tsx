import React from 'react';
import { Search, ArrowRight, Star, CheckCircle, MapPin } from 'lucide-react';
import { SectionId } from '../types';

interface HeroProps {
  scrollToSection: (id: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id={SectionId.HOME} className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-[#0f0f0f]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
          alt="Luxury Interior"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Advanced Gradient Overlay for text readability and mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#AF0c15]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 lg:px-24 relative z-10 h-full flex flex-col lg:flex-row items-center">
        
        {/* Left Content (Text & Search) */}
        <div className="flex-1 pt-32 lg:pt-0 max-w-2xl space-y-8 z-20">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#AF0c15] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#AF0c15]"></span>
            </span>
            #1 Real Estate Agency 2024
          </div>
          
          {/* Headlines */}
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] font-['Space_Grotesk'] tracking-tight">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Sanctuary.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg font-light leading-relaxed">
              Experience the pinnacle of modern living with our curated collection of exclusive properties tailored to your lifestyle.
            </p>
          </div>

          {/* Glassmorphism Search Bar */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-xl">
              <div className="flex-1 flex items-center px-4 h-14 rounded-xl transition-colors">
                <MapPin className="text-slate-400 w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="City, Neighborhood, or Address" 
                  className="w-full bg-transparent border-none outline-none text-white placeholder-slate-400 font-medium"
                />
              </div>
              <button 
                onClick={() => scrollToSection(SectionId.LISTINGS)}
                className="h-14 px-8 rounded-xl bg-[#AF0c15] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#8a0910] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-900/20"
              >
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-6 text-sm font-medium text-slate-400">
                <span>Popular:</span>
                <button className="hover:text-white underline decoration-[#AF0c15] decoration-2 underline-offset-4 transition-colors">Penthouse</button>
                <button className="hover:text-white underline decoration-[#AF0c15] decoration-2 underline-offset-4 transition-colors">Beachfront</button>
                <button className="hover:text-white underline decoration-[#AF0c15] decoration-2 underline-offset-4 transition-colors">Modern Villa</button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 md:gap-12 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div>
              <p className="text-3xl font-bold font-['Space_Grotesk'] text-white">1.2k+</p>
              <p className="text-slate-400 text-xs tracking-wide uppercase mt-1">Premium Listings</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-['Space_Grotesk'] text-white">4.9</p>
              <p className="text-slate-400 text-xs tracking-wide uppercase mt-1">Customer Rating</p>
            </div>
             <div>
              <p className="text-3xl font-bold font-['Space_Grotesk'] text-white">24/7</p>
              <p className="text-slate-400 text-xs tracking-wide uppercase mt-1">AI Support</p>
            </div>
          </div>
        </div>

        {/* Right Content - The Person Image Composition */}
        <div className="flex-1 h-full relative hidden lg:flex items-center justify-center xl:justify-end z-10 pointer-events-none">
             <div className="relative w-[420px] h-[580px] mt-12 animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
                {/* Abstract Shapes behind */}
                <div className="absolute top-10 right-10 w-full h-full border-[1px] border-white/10 rounded-[4rem] rounded-tr-[8rem]"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#AF0c15] rounded-full blur-[60px] opacity-40"></div>
                
                {/* Main Image Container - Arch Shape */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] rounded-tr-[10rem] overflow-hidden shadow-2xl border border-white/10">
                    <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2669&auto=format&fit=crop"
                        alt="Luxury Real Estate Agent"
                        className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Floating Info inside Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-white font-bold font-['Space_Grotesk'] text-lg">Elena Rodriguez</p>
                                <p className="text-slate-300 text-xs uppercase tracking-wider">Senior Broker</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                <ArrowRight className="text-[#181818] w-5 h-5 -rotate-45" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Badge Outside */}
                <div className="absolute top-20 -left-12 bg-white p-4 pr-6 rounded-r-2xl rounded-l-md shadow-xl border-l-4 border-[#AF0c15] flex items-center gap-3 animate-bounce duration-[4000ms]">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <p className="text-[#181818] font-bold text-sm">Verified Agent</p>
                        <p className="text-slate-500 text-[10px]">Top 1% Performer</p>
                    </div>
                </div>
             </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;