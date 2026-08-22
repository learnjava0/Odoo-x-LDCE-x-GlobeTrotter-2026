import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      const msg =
        err?.response?.data?.non_field_errors?.[0] ||
        err?.response?.data?.detail ||
        'Invalid email or password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F7F3]">
      
      {/* LEFT COLUMN (50% Width) — Sticky H-Screen Image Container so text never gets pushed below viewport */}
      <div className="hidden lg:flex lg:w-1/2 sticky top-0 h-screen overflow-hidden bg-slate-900 shrink-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
          alt="GlobeTrotter Alpine Mountain Lake"
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

      {/* RIGHT COLUMN (50% Width) — Login Form View */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-10 lg:px-12 bg-[#F8F7F3] relative min-h-screen">
        
        {/* Mobile Header Brand */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl text-gray-900 tracking-tight">GlobeTrotter</span>
        </div>

        {/* Floating Login Card */}
        <div className="w-full max-w-md bg-white py-10 px-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-gray-100/80 my-auto">
          
          {/* Centered Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 border-4 border-amber-50 flex items-center justify-center shadow-xl shadow-amber-500/20">
              <Compass className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-gray-400 block">TRAVEL DESK</span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back</h2>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                EMAIL / USERNAME
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username or email"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-xs cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Log in'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
            <Link to="/signup" className="text-gray-500 hover:text-emerald-600 transition-colors">
              Create an account
            </Link>
            <Link to="/forgot-password" className="text-gray-500 hover:text-emerald-600 transition-colors">
              Forgot password?
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
