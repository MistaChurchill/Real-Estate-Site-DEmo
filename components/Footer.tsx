import React from 'react';
import { Home, Facebook, Twitter, Instagram, Linkedin, Lock } from 'lucide-react';
import { SectionId } from '../types';

interface FooterProps {
  scrollToSection: (id: SectionId) => void;
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection, onAdminClick }) => {
  return (
    <footer className="bg-[#181818] text-slate-400 py-20 border-t border-slate-800">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6 text-white">
                <div className="p-2 rounded-lg bg-[#AF0c15]">
                  <Home size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold tracking-tight font-['Space_Grotesk']">
                  LuxeEstate
                </span>
              </div>
            <p className="max-w-md mb-8 leading-relaxed text-slate-400">
              LuxeEstate brings you the finest selection of luxury properties. 
              Our mission is to help you find not just a house, but a place where memories are made.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#AF0c15] hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#AF0c15] hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#AF0c15] hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center hover:bg-[#AF0c15] hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 font-['Space_Grotesk'] text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={() => scrollToSection(SectionId.HOME)} className="hover:text-[#AF0c15] transition-colors">Home</button></li>
              <li><button onClick={() => scrollToSection(SectionId.LISTINGS)} className="hover:text-[#AF0c15] transition-colors">Listings</button></li>
              <li><button onClick={() => scrollToSection(SectionId.ABOUT)} className="hover:text-[#AF0c15] transition-colors">About Us</button></li>
              <li><button onClick={() => scrollToSection(SectionId.BLOG)} className="hover:text-[#AF0c15] transition-colors">Blog</button></li>
              <li><button onClick={() => scrollToSection(SectionId.CONTACT)} className="hover:text-[#AF0c15] transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 font-['Space_Grotesk'] text-lg">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-[#AF0c15] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#AF0c15] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#AF0c15] transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-[#AF0c15] transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} LuxeEstate. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="text-slate-500">Designed for the Modern Era.</p>
            <button 
              onClick={onAdminClick} 
              className="text-slate-800 hover:text-slate-700 transition-colors flex items-center gap-1 text-xs"
              title="Staff Login"
            >
              <Lock size={10} /> Staff
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;