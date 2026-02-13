import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Listings from './components/Listings';
import FeaturedProperties from './components/FeaturedProperties';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import WhatsAppButton from './components/WhatsAppButton';
import Partners from './components/Partners';
import PropertyDetails from './components/PropertyDetails';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import BlogPage from './components/BlogPage';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import AdminDashboard from './components/AdminDashboard';
import { SectionId, Property } from './types';
import { PROPERTIES as INITIAL_PROPERTIES } from './data/mockData';

function App() {
  const [view, setView] = useState<'home' | 'about' | 'contact' | 'blog' | 'admin'>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Data State with LocalStorage Persistence
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('luxe_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  useEffect(() => {
    localStorage.setItem('luxe_properties', JSON.stringify(properties));
  }, [properties]);

  // Admin Actions
  const handleAddProperty = (newProperty: Property) => {
    setProperties(prev => [newProperty, ...prev]);
  };

  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };

  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleNavigation = (id: SectionId) => {
    // Check if the navigation target matches a specific page view
    if (id === SectionId.ABOUT) {
      setView('about');
      setSelectedProperty(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === SectionId.CONTACT) {
      setView('contact');
      setSelectedProperty(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === SectionId.BLOG) {
      setView('blog');
      setSelectedProperty(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // For Home, Listings, etc., switch to home view first
      if (view !== 'home' || selectedProperty) {
        setView('home');
        setSelectedProperty(null);
        // Delay scroll to allow render
        setTimeout(() => {
          if (id === SectionId.HOME) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 100);
      } else {
        // Already on home view, just scroll
        if (id === SectionId.HOME) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (view === 'admin') {
      return (
        <AdminDashboard 
          properties={properties}
          onAddProperty={handleAddProperty}
          onUpdateProperty={handleUpdateProperty}
          onDeleteProperty={handleDeleteProperty}
          onExit={() => setView('home')}
        />
      );
    }

    if (selectedProperty) {
      return (
        <PropertyDetails 
          property={selectedProperty} 
          onBack={() => {
            setSelectedProperty(null);
            setTimeout(() => {
              document.getElementById(SectionId.LISTINGS)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }} 
        />
      );
    }

    if (view === 'about') {
      return <AboutPage onNavigate={handleNavigation} />;
    }

    if (view === 'contact') {
      return <ContactPage />;
    }

    if (view === 'blog') {
      return <BlogPage onNavigate={handleNavigation} />;
    }

    // Default Home View
    return (
      <>
        <Hero scrollToSection={handleNavigation} />
        <Partners />
        {/* Featured Section for New & Trending items */}
        <FeaturedProperties onPropertySelect={handlePropertySelect} properties={properties} />
        {/* Main Searchable Catalog */}
        <Listings onPropertySelect={handlePropertySelect} properties={properties} />
        <Features />
        <Testimonials />
        {/* We keep the Contact section on home as a CTA, but navigation link goes to Contact Page */}
        <Contact /> 
        <FAQ />
      </>
    );
  };

  // If in admin view, don't show the standard layout wrappers (Navbar/Footer)
  if (view === 'admin') {
    return (
      <div className="font-sans text-[#181818] bg-white min-h-screen">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="font-sans text-[#181818] bg-white min-h-screen flex flex-col">
      <Navbar scrollToSection={handleNavigation} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      <Footer 
        scrollToSection={handleNavigation} 
        onAdminClick={() => {
          setView('admin');
          window.scrollTo(0, 0);
        }} 
      />
      <WhatsAppButton />
      <AIChat />
    </div>
  );
}

export default App;