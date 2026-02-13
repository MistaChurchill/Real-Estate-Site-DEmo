import React, { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { SectionId } from '../types';

interface NavbarProps {
  scrollToSection: (id: SectionId) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: SectionId.HOME },
    { label: 'Listings', id: SectionId.LISTINGS },
    { label: 'About Us', id: SectionId.ABOUT },
    { label: 'Blog', id: SectionId.BLOG },
    { label: 'Contact', id: SectionId.CONTACT },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <div 
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ease-out backdrop-blur-md border ${
            isScrolled 
              ? 'bg-white/90 border-slate-200 shadow-2xl w-full max-w-4xl' 
              : 'bg-black/20 border-white/20 shadow-lg w-full max-w-5xl'
          }`}
        >
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            onClick={() => scrollToSection(SectionId.HOME)}
          >
            <div className={`p-1.5 rounded-full transition-colors ${isScrolled ? 'bg-[#AF0c15] text-white' : 'bg-white text-[#AF0c15]'}`}>
              <Home size={18} strokeWidth={2.5} />
            </div>
            <span className={`text-xl font-bold tracking-tight font-['Space_Grotesk'] ${isScrolled ? 'text-[#181818]' : 'text-white'}`}>
              Luxe<span className={isScrolled ? 'text-[#AF0c15]' : 'text-slate-200'}>Estate</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-slate-600 hover:text-[#AF0c15] hover:bg-slate-50' 
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollToSection(SectionId.LISTINGS)}
              className={`hidden md:block px-5 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 ${
                isScrolled 
                  ? 'bg-[#AF0c15] text-white hover:bg-[#8a0910]' 
                  : 'bg-white text-[#AF0c15] hover:bg-slate-100'
              }`}
            >
              Find a Home
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'text-[#181818] hover:bg-slate-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`fixed top-24 left-4 right-4 z-40 bg-white rounded-3xl shadow-2xl p-4 md:hidden transform transition-all duration-300 origin-top border border-slate-100 ${
          isMobileMenuOpen 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-3 px-4 text-[#181818] hover:bg-[#AF0c15]/5 hover:text-[#AF0c15] rounded-xl font-medium font-['Space_Grotesk'] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="h-px bg-slate-100 my-2"></div>
          <button
             onClick={() => {
              scrollToSection(SectionId.LISTINGS);
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-[#AF0c15] text-white rounded-xl font-semibold hover:bg-[#8a0910] transition-colors"
          >
            Find a Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;