import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, User, Mail, Phone, MapPin, Globe, FileText, Camera, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: '',
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    await signup(fullName, formData.email, 'password123');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F7F3]">
      
      {/* LEFT COLUMN (50% Width) — Sticky H-Screen Image Container so text never gets pushed below viewport */}
      <div className="hidden lg:flex lg:w-1/2 sticky top-0 h-screen overflow-hidden bg-slate-900 shrink-0">
        <img
          src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1600&q=80"
          alt="GlobeTrotter Tropical Maldives Island"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Bottom Overlay Gradient & Fixed Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-10 xl:p-12 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-md shrink-0">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <span className="font-black text-3xl xl:text-4xl tracking-tight">GlobeTrotter</span>
          </div>
          <p className="text-gray-200 text-xs xl:text-sm max-w-md font-normal leading-relaxed">
            Create city-by-city itineraries, estimate spend, share public plans, and copy trips worth repeating.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN (50% Width) — Scrollable Form View */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 lg:px-12 bg-[#F8F7F3] relative min-h-screen">
        
        {/* Mobile Header Brand */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl text-gray-900 tracking-tight">GlobeTrotter</span>
        </div>

        {/* Floating Registration Card */}
        <div className="w-full max-w-xl bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-gray-100/80 my-auto">
          
          {/* Centered Circular Photo / Avatar Upload */}
          <div className="flex flex-col items-center mb-5">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-500/30 flex items-center justify-center overflow-hidden shadow-md group-hover:border-amber-500 transition-colors">
                {photoPreview ? (
                  <img src={photoPreview} alt="User avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-amber-600/70" />
                )}
              </div>
              <label htmlFor="signup-photo-upload" className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-1.5 rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform">
                <Camera className="w-3.5 h-3.5" />
                <input id="signup-photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-1.5">Upload Profile Photo</span>
          </div>

          <div className="mb-5 text-center">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block">NEW TRAVELER</span>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Registration Screen</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Row 1: First Name | Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">First Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="First Name"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Last Name"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email Address | Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: City | Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="City"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Country</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    placeholder="Country"
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Additional Information .... */}
            <div>
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Additional Information ....</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  rows={2}
                  value={formData.additionalInfo}
                  onChange={(e) => handleChange('additionalInfo', e.target.value)}
                  placeholder="Tell us about your travel preferences..."
                  className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                Register Users
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-5 pt-3 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                Log in
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
