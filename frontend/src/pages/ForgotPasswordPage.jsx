
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/30 to-orange-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        {/* Brand */}
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-2xl text-white shadow-lg shadow-amber-200/50 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <span className="font-black text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
            GlobeTrotter
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/40 rounded-3xl border border-gray-100">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100">
                  <Mail className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Reset password</h2>
                <p className="text-gray-400 text-[13px] mt-1.5 leading-relaxed">
                  Enter the email associated with your account and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-[13px] font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-amber-200/50 hover:shadow-xl hover:shadow-amber-300/50 transition-all flex items-center justify-center gap-2 text-[14px] cursor-pointer"
                >
                  Send Reset Link
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Check your email</h2>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                We sent a password reset link to <strong className="text-gray-800">{email}</strong>. Please check your inbox.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-amber-600 font-semibold text-xs hover:underline block mx-auto pt-2"
              >
                Didn't receive email? Try again
              </button>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-amber-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
