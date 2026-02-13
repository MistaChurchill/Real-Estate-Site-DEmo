import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { 
  LayoutDashboard, 
  Plus, 
  LogOut, 
  Search, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Image as ImageIcon, 
  DollarSign, 
  Home, 
  MapPin,
  Upload
} from 'lucide-react';

interface AdminDashboardProps {
  properties: Property[];
  onUpdateProperty: (property: Property) => void;
  onAddProperty: (property: Property) => void;
  onDeleteProperty: (id: string) => void;
  onExit: () => void;
}

const emptyProperty: Property = {
  id: '',
  title: '',
  price: 0,
  address: '',
  beds: 0,
  baths: 0,
  sqft: 0,
  imageUrl: '',
  imageUrls: [],
  tag: 'New',
  listingType: 'sale',
  isNew: true,
  isPopular: false,
  dateAdded: new Date().toISOString()
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  properties, 
  onUpdateProperty, 
  onAddProperty, 
  onDeleteProperty,
  onExit
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Property>(emptyProperty);
  const [searchTerm, setSearchTerm] = useState('');

  // Simple Auth Check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleEdit = (property: Property) => {
    setFormData({ ...property });
    setEditingId(property.id);
    setView('form');
  };

  const handleCreate = () => {
    setFormData({ ...emptyProperty, id: Date.now().toString() });
    setEditingId(null);
    setView('form');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.price || !formData.address) {
      alert("Please fill in required fields");
      return;
    }

    // Ensure imageUrls has at least the main image
    const finalData = {
      ...formData,
      imageUrls: formData.imageUrls && formData.imageUrls.length > 0 
        ? formData.imageUrls 
        : [formData.imageUrl]
    };

    if (editingId) {
      onUpdateProperty(finalData);
    } else {
      onAddProperty(finalData);
    }
    setView('list');
  };

  const handleImageAdd = () => {
    const url = prompt("Enter image URL");
    if (url) {
      setFormData(prev => ({
        ...prev,
        imageUrls: [...(prev.imageUrls || []), url],
        imageUrl: prev.imageUrl || url // Set main image if empty
      }));
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#AF0c15] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <LayoutDashboard size={32} />
            </div>
            <h2 className="text-2xl font-bold font-['Space_Grotesk']">Admin Portal</h2>
            <p className="text-slate-500">Secure access for staff only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all"
                placeholder="Enter access code"
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button type="submit" className="w-full py-3 bg-[#181818] text-white font-bold rounded-xl hover:bg-[#AF0c15] transition-colors">
              Access Dashboard
            </button>
            <button type="button" onClick={onExit} className="w-full py-3 text-slate-500 font-bold hover:text-[#181818]">
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#181818] text-white hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold font-['Space_Grotesk']">LuxeEstate<span className="text-[#AF0c15]">.Admin</span></h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setView('list')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'list' ? 'bg-[#AF0c15] text-white' : 'hover:bg-white/10 text-slate-400'}`}
          >
            <LayoutDashboard size={20} />
            Properties
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={onExit} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-slate-400 transition-colors">
            <LogOut size={20} />
            Exit Portal
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#181818] font-['Space_Grotesk']">Property Management</h1>
              <p className="text-slate-500">Manage your listings, prices, and availability.</p>
            </div>
            {view === 'list' && (
              <button 
                onClick={handleCreate}
                className="flex items-center gap-2 px-6 py-3 bg-[#AF0c15] text-white rounded-xl font-bold hover:bg-[#8a0910] transition-colors shadow-lg shadow-red-900/20"
              >
                <Plus size={20} />
                Add Property
              </button>
            )}
          </div>

          {view === 'list' ? (
            /* LIST VIEW */
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
                <Search className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search properties by name or address..." 
                  className="flex-1 outline-none text-[#181818] placeholder-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="p-4 md:p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Property</th>
                        <th className="p-4 md:p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                        <th className="p-4 md:p-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Price</th>
                        <th className="p-4 md:p-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProperties.map((property) => (
                        <tr key={property.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="p-4 md:p-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                <img src={property.imageUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h3 className="font-bold text-[#181818]">{property.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-1">{property.address}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 md:p-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                              property.listingType === 'sale' ? 'bg-emerald-100 text-emerald-600' :
                              property.listingType === 'rent' ? 'bg-blue-100 text-blue-600' :
                              'bg-orange-100 text-orange-600'
                            }`}>
                              {property.listingType}
                            </span>
                          </td>
                          <td className="p-4 md:p-6 font-bold text-[#181818]">
                            ${property.price.toLocaleString()}
                          </td>
                          <td className="p-4 md:p-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleEdit(property)}
                                className="p-2 text-slate-400 hover:text-[#181818] hover:bg-slate-200 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => {
                                  if(window.confirm('Are you sure you want to delete this listing?')) {
                                    onDeleteProperty(property.id);
                                  }
                                }}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredProperties.length === 0 && (
                  <div className="p-12 text-center text-slate-400">
                    No properties found matching your search.
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* FORM VIEW */
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 className="text-xl font-bold text-[#181818]">{editingId ? 'Edit Property' : 'New Listing'}</h2>
                <button onClick={() => setView('list')} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X size={20} className="text-slate-400 hover:text-[#181818]" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: Basic Info */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Title</label>
                      <div className="relative">
                        <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="text" 
                          value={formData.title}
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all font-bold"
                          placeholder="e.g. Modern Sunset Villa"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="text" 
                          value={formData.address}
                          onChange={e => setFormData({...formData, address: e.target.value})}
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all"
                          placeholder="e.g. 123 Palm Ave, Miami FL"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input 
                            type="number" 
                            value={formData.price}
                            onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all font-bold"
                          />
                        </div>
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Listing Type</label>
                         <select 
                           value={formData.listingType}
                           onChange={e => setFormData({...formData, listingType: e.target.value as any})}
                           className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all appearance-none cursor-pointer"
                         >
                           <option value="sale">For Sale</option>
                           <option value="rent">For Rent</option>
                           <option value="land">Land</option>
                         </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Beds</label>
                        <input 
                          type="number" 
                          value={formData.beds}
                          onChange={e => setFormData({...formData, beds: Number(e.target.value)})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Baths</label>
                        <input 
                          type="number" 
                          value={formData.baths}
                          onChange={e => setFormData({...formData, baths: Number(e.target.value)})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Sqft/Acres</label>
                        <input 
                          type="number" 
                          value={formData.sqft}
                          onChange={e => setFormData({...formData, sqft: Number(e.target.value)})}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all"
                        />
                      </div>
                    </div>

                     <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Property Tag</label>
                      <input 
                        type="text" 
                        value={formData.tag}
                        onChange={e => setFormData({...formData, tag: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#AF0c15] focus:ring-1 focus:ring-[#AF0c15] outline-none transition-all"
                        placeholder="e.g. Condo, Family, Historic"
                      />
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.isNew}
                          onChange={e => setFormData({...formData, isNew: e.target.checked})}
                          className="w-5 h-5 text-[#AF0c15] rounded focus:ring-[#AF0c15]"
                        />
                        <span className="font-bold text-slate-700">Mark as New</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.isPopular}
                          onChange={e => setFormData({...formData, isPopular: e.target.checked})}
                          className="w-5 h-5 text-[#AF0c15] rounded focus:ring-[#AF0c15]"
                        />
                        <span className="font-bold text-slate-700">Mark as Trending</span>
                      </label>
                    </div>
                  </div>

                  {/* Right Column: Images */}
                  <div className="space-y-6">
                     <div>
                        <div className="flex justify-between items-center mb-2">
                           <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Images</label>
                           <button 
                             type="button" 
                             onClick={handleImageAdd}
                             className="text-xs font-bold text-[#AF0c15] flex items-center gap-1 hover:underline"
                           >
                             <Plus size={14} /> Add URL
                           </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                           {formData.imageUrls?.map((url, idx) => (
                             <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group bg-slate-100 border border-slate-200">
                               <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                               <button
                                 type="button"
                                 onClick={() => {
                                   const newUrls = formData.imageUrls?.filter((_, i) => i !== idx);
                                   setFormData({
                                     ...formData,
                                     imageUrls: newUrls,
                                     imageUrl: idx === 0 && newUrls && newUrls.length > 0 ? newUrls[0] : (newUrls?.length === 0 ? '' : formData.imageUrl)
                                   });
                                 }}
                                 className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                               >
                                 <Trash2 size={14} />
                               </button>
                               {idx === 0 && (
                                 <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold rounded uppercase">Main Cover</div>
                               )}
                             </div>
                           ))}
                           
                           <button 
                             type="button"
                             onClick={handleImageAdd}
                             className="aspect-video rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-[#AF0c15] hover:text-[#AF0c15] hover:bg-slate-50 transition-all"
                           >
                             <Upload size={24} className="mb-2" />
                             <span className="text-xs font-bold">Add Image URL</span>
                           </button>
                        </div>
                     </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end gap-4">
                  <button 
                    type="button" 
                    onClick={() => setView('list')}
                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 hover:text-[#181818] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-8 py-3 bg-[#181818] text-white rounded-xl font-bold hover:bg-[#AF0c15] transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    {editingId ? 'Update Property' : 'Create Listing'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;