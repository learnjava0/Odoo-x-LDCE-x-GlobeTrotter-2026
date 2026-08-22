import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <span className="font-extrabold text-3xl text-white tracking-tight">GlobeTrotter</span>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Start your<br />adventure today.
          </h2>
          <p className="text-white/80 text-lg max-w-md leading-relaxed">
            Join thousands of travelers who plan smarter, spend wiser, and explore further with GlobeTrotter.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-[#F8F7F3]">
        <div className="max-w-md mx-auto w-full">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl text-white">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-gray-900">GlobeTrotter</span>
          </div>

          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create account</h2>
          <p className="text-gray-400 mt-2 text-[15px]">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-600 font-semibold hover:text-amber-700">Sign in</Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-[13px] font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-[13px] font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                <input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>
            <button type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 transition-all flex items-center justify-center gap-2 text-[14px] cursor-pointer">
              Create account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
