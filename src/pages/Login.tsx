import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useLogin } from '../api/hooks/useAuth';
import { useAuthStore } from '../store';
import { Loader2, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const REASON_MESSAGES: Record<string, string> = {
  expired: 'Your session has expired. Please sign in again.',
  unauthorized: 'You were signed out due to an authentication error.',
};

export function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const reason = searchParams.get('reason') || searchParams.get('expired') ? 'expired' : null;
  const sessionMessage = reason ? REASON_MESSAGES[reason] : null;

  useEffect(() => {
    // Clear all cached query data on login page mount — stale admin data must not persist
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Missing credentials', {
        description: 'Please enter both email and password.',
      });
      return;
    }

    try {
      await login.mutateAsync({ email, password });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          CA Admin Portal
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Chartered Accountants
        </p>

        {/* Session expiry banner */}
        {sessionMessage && (
          <div className="mb-4 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 font-medium">{sessionMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <Input
              type="email"
              placeholder="admin@protechplanner.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={login.isPending}
            className="w-full bg-blue-700 text-white py-2.5 rounded-md hover:bg-blue-800 transition"
          >
            {login.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            © 2026 Protech Planner Project. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
