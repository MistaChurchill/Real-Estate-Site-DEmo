import React from 'react';
import { Calendar, Clock, ArrowRight, User, Tag, Mail } from 'lucide-react';
import { SectionId } from '../types';

interface BlogPageProps {
  onNavigate: (id: SectionId) => void;
}

const BLOG_POSTS = [
  {
    id: 1,
    title: "2025 Luxury Market Forecast: What Buyers Need to Know",
    excerpt: "From shifting interest rates to the rise of smart home technology, explore the key trends defining the luxury real estate market this year.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2670&auto=format&fit=crop",
    date: "March 15, 2024",
    readTime: "5 min read",
    author: "Sarah Mitchell",
    category: "Market Trends",
    featured: true
  },
  {
    id: 2,
    title: "Maximizing ROI: Renovation Tips Before Selling",
    excerpt: "Not all renovations are created equal. Discover which upgrades offer the highest return on investment when preparing your home for sale.",
    image: "https://images.unsplash.com/photo-1581858726768-75e0524d9407?q=80&w=2580&auto=format&fit=crop",
    date: "March 10, 2024",
    readTime: "4 min read",
    author: "David Chen",
    category: "Selling Tips"
  },
  {
    id: 3,
    title: "The Rise of Eco-Friendly Architecture",
    excerpt: "Sustainable luxury is no longer an oxymoron. See how green building materials and energy-efficient designs are shaping modern homes.",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2565&auto=format&fit=crop",
    date: "March 5, 2024",
    readTime: "6 min read",
    author: "Elena Rodriguez",
    category: "Design"
  },
  {
    id: 4,
    title: "Interior Design Trends for Spring 2024",
    excerpt: "Refresh your living space with these top interior design trends, from biophilic elements to bold, warm color palettes.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2500&auto=format&fit=crop",
    date: "Feb 28, 2024",
    readTime: "3 min read",
    author: "Michael Ross",
    category: "Lifestyle"
  },
  {
    id: 5,
    title: "First-Time Luxury Home Buyer Guide",
    excerpt: "Navigating the luxury market for the first time? Here are the essential steps and considerations for securing your dream estate.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059ee971?q=80&w=2573&auto=format&fit=crop",
    date: "Feb 20, 2024",
    readTime: "7 min read",
    author: "Sarah Mitchell",
    category: "Buying Guide"
  },
  {
    id: 6,
    title: "Hidden Gems: Emerging Neighborhoods",
    excerpt: "Looking for the next big thing? We've analyzed the data to bring you the top 5 up-and-coming luxury neighborhoods.",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2670&auto=format&fit=crop",
    date: "Feb 15, 2024",
    readTime: "4 min read",
    author: "David Chen",
    category: "Location"
  }
];

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <div className="animate-in fade-in duration-500 pt-20 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="bg-[#181818] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#AF0c15]/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700/20 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Space_Grotesk']">Real Estate Insights</h1>
           <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
             Expert analysis, market trends, and lifestyle inspiration for the discerning homeowner.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-24 py-16">
        
        {/* Featured Post */}
        <div className="mb-16">
           <h2 className="text-sm font-bold text-[#AF0c15] uppercase tracking-widest mb-6">Featured Article</h2>
           <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl grid grid-cols-1 lg:grid-cols-2">
             <div className="relative h-64 lg:h-auto overflow-hidden">
               <img 
                 src={featuredPost.image} 
                 alt={featuredPost.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#AF0c15] uppercase tracking-wide">
                  {featuredPost.category}
               </div>
             </div>
             <div className="p-8 lg:p-12 flex flex-col justify-center">
               <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
               </div>
               <h3 className="text-3xl font-bold text-[#181818] mb-4 font-['Space_Grotesk'] group-hover:text-[#AF0c15] transition-colors leading-tight">
                 {featuredPost.title}
               </h3>
               <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                 {featuredPost.excerpt}
               </p>
               <div className="flex items-center justify-between mt-auto">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                     <User size={40} className="text-slate-400 mt-2" />
                   </div>
                   <span className="font-bold text-[#181818] text-sm">{featuredPost.author}</span>
                 </div>
                 <button className="flex items-center gap-2 text-[#AF0c15] font-bold text-sm uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                   Read Article <ArrowRight size={16} />
                 </button>
               </div>
             </div>
           </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
           {['All Posts', 'Market Trends', 'Buying Guide', 'Selling Tips', 'Design', 'Lifestyle', 'Location'].map((cat, idx) => (
             <button 
               key={idx}
               className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                 idx === 0 
                   ? 'bg-[#181818] text-white border-[#181818]' 
                   : 'bg-white text-slate-600 border-slate-200 hover:border-[#AF0c15] hover:text-[#AF0c15]'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {otherPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full border border-slate-100">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#AF0c15] uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                   <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                   <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-[#181818] mb-3 font-['Space_Grotesk'] leading-tight group-hover:text-[#AF0c15] transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-xs font-bold text-slate-500">{post.author}</span>
                   <span className="text-xs font-bold text-[#AF0c15] flex items-center gap-1 group-hover:underline">
                     Read More <ArrowRight size={12} />
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-[#181818] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#AF0c15]/20 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold text-white mb-2 font-['Space_Grotesk']">Subscribe to our Newsletter</h3>
              <p className="text-slate-400">Get the latest market updates, exclusive listings, and design tips delivered straight to your inbox.</p>
            </div>
            
            <form className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[300px] lg:min-w-[400px]">
               <div className="relative flex-grow">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] transition-all"
                 />
               </div>
               <button type="submit" className="px-6 py-3.5 bg-[#AF0c15] text-white font-bold rounded-xl hover:bg-[#8a0910] transition-colors whitespace-nowrap shadow-lg">
                 Subscribe
               </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;