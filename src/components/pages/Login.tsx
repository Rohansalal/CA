import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, AlertCircle, Loader, ShoppingCart, Eye, EyeOff } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect info from location state
  const returnTo = location.state?.returnTo || '/dashboard';
  const selectedService = location.state?.selectedService;
  const selectedServiceSlug = location.state?.selectedServiceSlug;
  const companyType = location.state?.companyType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      return;
    }

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser?.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        // Redirect to the intended destination with service info
        navigate(returnTo, {
          state: { selectedService, selectedServiceSlug, companyType }
        });
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const isFormValid = email && password && !loading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-[380px]">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Login</h1>
          <p className="text-neutral-100 text-sm">Professional CA Services</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <h2 className="text-xl font-bold text-primary mb-5 text-center">Welcome Back</h2>

          {/* Service Selection Notice */}
          {selectedService && (
            <div className="mb-5 flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 font-medium text-xs">Service Selected</p>
                <p className="text-blue-700 text-xs mt-0.5">
                  {selectedService}
                  {companyType && ` - ${companyType}`}
                </p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-5 flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-9 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80 font-medium transition">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-400 text-xs font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-xs">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:text-primary/80 transition">
              Create an account
            </Link>
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/50">
            Protected by reCAPTCHA and Subject to the Precision Associates <a href="#" className="hover:text-white underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};
