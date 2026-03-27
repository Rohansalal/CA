import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Loader2, AlertCircle, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { useSuperAdmin } from '../contexts/SuperAdminContext';

export const SuperAdminLogin: React.FC = () => {
  const [email, setEmail] = useState('rohan@protechplanner.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useSuperAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/super-admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC] font-sans overflow-hidden selection:bg-[#6C5CE7]/10 selection:text-[#6C5CE7]">
      {/* LEFT SIDE - Branding / Context Panel (Lightened for Black Text) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#F8FAFC] text-black border-r border-[#E5E7EB]">
        {/* Subtle Abstract Pattern (Darkened for visibility) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2 mb-20">
            <div className="w-10 h-10 bg-[#6C5CE7] rounded-xl flex items-center justify-center shadow-lg shadow-[#6C5CE7]/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-black">ProtechPlanner</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold leading-[1.1] mb-8 text-black tracking-tight">
              Enterprise SaaS <br /> 
              <span className="text-[#6C5CE7]">Control Platform</span>
            </h1>
            
            <div className="space-y-6">
              {[
                "Real-time system monitoring",
                "Advanced security enforcement",
                "Unified analytics dashboard"
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-black/70"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-[#6C5CE7]/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#6C5CE7]" />
                  </div>
                  <span className="text-lg font-semibold">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 text-black/40 text-sm font-semibold tracking-wide">
          &copy; 2024 PROTECHPLANNER SYSTEMS
        </div>
      </div>

      {/* RIGHT SIDE - Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-white">
        {/* Mobile Header */}
        <div className="absolute top-10 left-10 lg:hidden flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#6C5CE7]" />
          <span className="text-xl font-bold text-[#0F172A]">ProtechPlanner</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px]"
        >
          <Card className="bg-white border-[#E5E7EB] shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[16px] p-8 md:p-10 border-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F5F3FF] rounded-2xl mb-4">
                <Lock className="w-7 h-7 text-[#6C5CE7]" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-2 tracking-tight">Admin Sign In</h2>
              <p className="text-[#64748B] text-[15px] font-medium">Access your platform securely</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-3"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0F172A] text-xs font-bold uppercase tracking-widest ml-1 opacity-60">Email Address</Label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#6C5CE7] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 pl-12 bg-[#F8FAFC] border-[#E5E7EB] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#6C5CE7] focus:bg-white focus:ring-4 focus:ring-[#6C5CE7]/10 transition-all duration-200 rounded-[10px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-[#0F172A] text-xs font-bold uppercase tracking-widest opacity-60">Password</Label>
                  <button type="button" className="text-xs text-[#6C5CE7] hover:text-[#5a4acf] font-bold uppercase tracking-wider transition-colors">Forgot Password?</button>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] group-focus-within:text-[#6C5CE7] transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pl-12 pr-12 bg-[#F8FAFC] border-[#E5E7EB] text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#6C5CE7] focus:bg-white focus:ring-4 focus:ring-[#6C5CE7]/10 transition-all duration-200 rounded-[10px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-white border border-[#E5E7EB] hover:bg-slate-50 text-black font-bold rounded-[10px] shadow-sm transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-black" />
                    <span className="text-black">Verifying...</span>
                  </>
                ) : (
                  'Sign In Securely'
                )}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-[#F1F5F9] flex items-center justify-center">
              <div className="flex items-center gap-2 text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" />
                <span>Enterprise Grade Encryption</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
