import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle, Loader, ShoppingCart, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

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
  const selectedPlan = location.state?.selectedPlan;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }

    // Auto-intercept admin login attempts on the regular user page
    if (email.toLowerCase() === 'admin@caavinash.in' || email.toLowerCase().startsWith('admin@')) {
      toast.info('Redirecting to secure admin panel...');
      navigate('/admin/login');
      return;
    }

    try {
      const loggedInUser = await login(email, password);
      toast.success('Welcome back!');

      setTimeout(() => {
        if (loggedInUser?.role === 'ADMIN') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          // Redirect to the intended destination with service info
          navigate(returnTo, {
            state: { selectedService, selectedServiceSlug, companyType, selectedPlan },
            replace: true
          });
        }
      }, 800);
    } catch (err) {
      toast.error('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    }
  };

  const isFormValid = email && password && !loading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-secondary flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Precision Associates</h1>
          <p className="text-neutral-100">Professional CA Services</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Welcome Back</h2>

          {/* Service Selection Notice */}
          {selectedService && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-900 font-medium text-sm">Service Selected</p>
                <p className="text-blue-700 text-sm mt-0.5">
                  {selectedService}
                  {companyType && ` - ${companyType}`}
                </p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link to="/forgot-password" title="Click to reset your password" className="text-sm text-primary hover:text-primary/80 font-medium transition">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link
              to="/register"
              state={{ returnTo, selectedService, selectedServiceSlug, companyType, selectedPlan }}
              className="font-semibold text-primary hover:text-primary/80 transition"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Legal Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/50">
            Protected by reCAPTCHA and subject to the Precision Associates <Link to="/privacy-policy" className="hover:text-white underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};









