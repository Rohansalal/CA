import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Check, Loader2, Sparkles, Star, Shield, Zap,
  ArrowRight, ChevronLeft, ChevronRight, BadgeCheck, Clock,
} from 'lucide-react';
import { useAuth } from '../../user-panel/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const API = import.meta.env.VITE_API_BASE_URL || '/api';

interface PlanScope { id: number; title: string; isIncluded: boolean; }
interface ServicePlan {
  id: number; planType: string; price: string;
  discountedPrice?: string; shortTitle?: string;
  scopeSummary?: string; scopes: PlanScope[];
}
interface Props { isOpen: boolean; onClose: () => void; serviceName: string; }

/* ── Plan tier visual tokens ── */
const TIERS: Record<string, {
  accent: string; accentBg: string; accentLight: string;
  badge?: string; badgeStyle: React.CSSProperties;
  icon: React.ElementType; btnBg: string;
}> = {
  BASIC: {
    accent: '#64748B', accentBg: '#F1F5F9', accentLight: '#F8FAFC',
    badgeStyle: { background: '#F1F5F9', color: '#475569' },
    icon: Shield, btnBg: 'linear-gradient(135deg,#475569,#334155)',
  },
  STANDARD: {
    accent: '#2563EB', accentBg: '#DBEAFE', accentLight: '#EFF6FF',
    badge: 'Recommended', badgeStyle: { background: '#DBEAFE', color: '#1D4ED8' },
    icon: Zap, btnBg: 'linear-gradient(135deg,#2563EB,#1D4ED8)',
  },
  ADVANCED: {
    accent: '#6366F1', accentBg: '#E0E7FF', accentLight: '#EEF2FF',
    badge: 'Popular', badgeStyle: { background: '#E0E7FF', color: '#4338CA' },
    icon: Zap, btnBg: 'linear-gradient(135deg,#6366F1,#4F46E5)',
  },
  PREMIUM: {
    accent: '#7C3AED', accentBg: '#EDE9FE', accentLight: '#F5F3FF',
    badge: 'Most Popular', badgeStyle: { background: '#EDE9FE', color: '#6D28D9' },
    icon: Star, btnBg: 'linear-gradient(135deg,#7C3AED,#6D28D9)',
  },
  ELITE: {
    accent: '#D97706', accentBg: '#FEF3C7', accentLight: '#FFFBEB',
    badge: 'Best Value', badgeStyle: { background: '#FEF3C7', color: '#B45309' },
    icon: Sparkles, btnBg: 'linear-gradient(135deg,#F59E0B,#D97706)',
  },
};
const getTier = (planType: string) => TIERS[planType.toUpperCase()] ?? TIERS.BASIC;

const savePct = (price: string, discounted?: string) => {
  const p = parseFloat(price), d = parseFloat(discounted || '0');
  if (!p || !d || d >= p) return null;
  return Math.round(((p - d) / p) * 100);
};

/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
export const PlanSelectionModal: React.FC<Props> = ({ isOpen, onClose, serviceName }) => {
  const [plans, setPlans]       = useState<ServicePlan[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selecting, setSelecting] = useState<number | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [activeMobile, setActiveMobile] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && serviceName) { setActiveMobile(0); fetchPlans(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, serviceName]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const slug = serviceName.toLowerCase()
        .replace(/[–—]/g, '').replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-').replace(/-+/g, '-');
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(`${API}/services/slug/${slug}`, { headers, credentials: 'include' });
      if (!res.ok) throw new Error('Service not found');
      const data = await res.json();
      setServiceId(data.service.id);
      setPlans(data.service.plans || []);
    } catch {
      toast.error('Could not load plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPlan = async (plan: ServicePlan) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnTo: window.location.pathname, openPlanModal: serviceName } });
      return;
    }
    setSelecting(plan.id);
    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(`${API}/orders/create`, {
        method: 'POST', headers, credentials: 'include',
        body: JSON.stringify({ serviceId, planId: plan.id }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create order');
      }
      const data = await response.json();
      toast.success('Service added! Redirecting to fill your details…');
      onClose();

      const orderItemId = data.order?.items?.[0]?.id;
      const orderId     = data.order?.id;
      const planType    = (data.order?.items?.[0]?.planType || '').toUpperCase();
      const isITR       = serviceName.toLowerCase().includes('itr') ||
                          serviceName.toLowerCase().includes('income tax');

      if (isITR && orderItemId) {
        if (planType.includes('BASIC'))         navigate(`/dashboard/itr/basic/${orderItemId}`);
        else if (planType.includes('STANDARD')) navigate(`/dashboard/itr/standard/${orderItemId}`);
        else if (planType.includes('PREMIUM'))  navigate(`/dashboard/itr/premium/${orderItemId}`);
        else if (planType.includes('ELITE'))    navigate(`/dashboard/itr/elite/${orderItemId}`);
        else navigate('/dashboard');
      } else if (orderId) {
        navigate(`/dashboard/order/${orderId}/submit-details`);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to select plan');
    } finally {
      setSelecting(null);
    }
  };

  /* derived cols for desktop grid */
  const desktopCols = plans.length <= 1 ? 1 : plans.length === 2 ? 2 : plans.length === 3 ? 3 : 2;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog wrapper — centres on desktop, bottom-sheet on mobile */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            <motion.div
              key="dlg"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', bounce: 0.14, duration: 0.42 }}
              className="pointer-events-auto w-full sm:max-w-5xl bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl"
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                height: 'min(92vh, 780px)',
                maxHeight: '92vh',
                overflow: 'hidden',
              }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ══ HEADER ══ */}
              <div className="px-6 py-5 border-b border-gray-100 shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center">
                        <BadgeCheck className="w-3 h-3 text-indigo-600" />
                      </div>
                      <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">Choose Your Plan</p>
                    </div>
                    <h2 className="text-[18px] sm:text-[22px] font-bold text-gray-900 leading-tight truncate">{serviceName}</h2>
                    <p className="text-[12.5px] text-gray-500 mt-1">Select the plan that fits your needs. All plans include expert CA support.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* ══ BODY ══ */}
              <div className="overflow-y-auto" style={{ overflowY: 'auto' }}>
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[280px] gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
                    </div>
                    <p className="text-[14px] text-gray-500 font-medium">Loading plans…</p>
                  </div>
                ) : plans.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[280px] gap-3 px-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-2">
                      <Shield className="w-7 h-7 text-gray-300" />
                    </div>
                    <p className="text-[16px] font-bold text-gray-700">No plans available</p>
                    <p className="text-[13px] text-gray-400 max-w-xs leading-relaxed">
                      No active plans for this service. Please contact our team for custom pricing.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-2 px-5 py-2.5 bg-indigo-600 text-white text-[13px] font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Contact Support
                    </button>
                  </div>
                ) : (
                  <div className="p-5 sm:p-6">

                    {/* ── MOBILE: stacked cards with prev/next nav ── */}
                    <div className="sm:hidden">
                      {plans.length > 1 && (
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => setActiveMobile(Math.max(0, activeMobile - 1))}
                            disabled={activeMobile === 0}
                            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-1.5">
                            {plans.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveMobile(i)}
                                className="rounded-full transition-all duration-200"
                                style={{
                                  width: i === activeMobile ? 24 : 8,
                                  height: 8,
                                  background: i === activeMobile ? '#6366F1' : '#E5E7EB',
                                }}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => setActiveMobile(Math.min(plans.length - 1, activeMobile + 1))}
                            disabled={activeMobile === plans.length - 1}
                            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeMobile}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.2 }}
                        >
                          <PlanCard
                            plan={plans[activeMobile]}
                            index={activeMobile}
                            totalPlans={plans.length}
                            selecting={selecting}
                            onSelect={handleSelectPlan}
                          />
                        </motion.div>
                      </AnimatePresence>
                      {plans.length > 1 && (
                        <p className="text-[11px] text-gray-400 text-center mt-3">
                          Plan {activeMobile + 1} of {plans.length} — swipe or use arrows to compare
                        </p>
                      )}
                    </div>

                    {/* ── DESKTOP: responsive grid ── */}
                    <div
                      className="hidden sm:grid gap-4"
                      style={{ gridTemplateColumns: `repeat(${desktopCols}, minmax(0, 1fr))` }}
                    >
                      {plans.map((plan, idx) => (
                        <PlanCard
                          key={plan.id}
                          plan={plan}
                          index={idx}
                          totalPlans={plans.length}
                          selecting={selecting}
                          onSelect={handleSelectPlan}
                        />
                      ))}
                    </div>

                    {/* trust row */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                      {[
                        { icon: Shield,     label: '100% Secure & Encrypted' },
                        { icon: BadgeCheck, label: 'Expert CA Support' },
                        { icon: Clock,      label: '7-Day Money-Back' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5 text-[12px] text-gray-400">
                          <Icon className="w-3.5 h-3.5 text-emerald-500" />
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ══ FOOTER ══ */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0 flex items-center justify-between gap-4">
                <p className="text-[12px] text-gray-400 leading-relaxed hidden sm:block">
                  All prices are inclusive of taxes. Expert CA assigned within 24 hours of purchase.
                </p>
                <button
                  onClick={onClose}
                  className="ml-auto flex items-center gap-1.5 px-4 py-2 text-[13px] text-gray-500 font-semibold hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Close
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════════════════════════
   PLAN CARD
══════════════════════════════════════════════════════════ */
interface PlanCardProps {
  plan: ServicePlan;
  index: number;
  totalPlans: number;
  selecting: number | null;
  onSelect: (plan: ServicePlan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, index, totalPlans, selecting, onSelect }) => {
  const tier = getTier(plan.planType);
  const Icon = tier.icon;
  const pct  = savePct(plan.price, plan.discountedPrice);
  const isLoading  = selecting === plan.id;
  const isDisabled = selecting !== null;
  const isHighlighted = tier.badge === 'Recommended';
  const displayPrice = parseInt(plan.discountedPrice || plan.price).toLocaleString('en-IN');
  const originalPrice = plan.discountedPrice ? parseInt(plan.price).toLocaleString('en-IN') : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.32 }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        border: isHighlighted ? `2px solid ${tier.accent}` : '1.5px solid #E5E7EB',
        boxShadow: isHighlighted
          ? `0 8px 30px ${tier.accent}22, 0 2px 8px rgba(0,0,0,0.06)`
          : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Highlight glow ring */}
      {isHighlighted && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px ${tier.accent}33` }} />
      )}

      {/* ── TOP ACCENT BAR ── */}
      <div className="h-1 w-full shrink-0" style={{ background: tier.btnBg }} />

      {/* ── PLAN HEADER ── */}
      <div className="px-5 pt-5 pb-4 shrink-0" style={{ background: tier.accentLight }}>
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: tier.accentBg }}>
            <Icon className="w-5 h-5" style={{ color: tier.accent }} />
          </div>
          {/* Badge */}
          {tier.badge && (
            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={tier.badgeStyle}>
              {tier.badge}
            </span>
          )}
        </div>

        {/* Plan name */}
        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: tier.accent }}>
          {plan.planType}
        </p>
        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">
          {plan.shortTitle || plan.planType}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-2 flex-wrap">
          <span className="text-[30px] font-black text-gray-900 leading-none tabular-nums">
            ₹{displayPrice}
          </span>
          {originalPrice && (
            <span className="text-[14px] text-gray-400 line-through mb-0.5 tabular-nums">
              ₹{originalPrice}
            </span>
          )}
        </div>
        {pct && (
          <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: '#DCFCE7' }}>
            <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
            <span className="text-[11px] font-bold text-emerald-700">Save {pct}%</span>
          </div>
        )}

        {/* Scope summary */}
        {plan.scopeSummary && (
          <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">{plan.scopeSummary}</p>
        )}
      </div>

      {/* ── SCOPE LIST ── */}
      <div className="flex-1 px-5 py-4 bg-white overflow-y-auto" style={{ minHeight: 0 }}>
        {plan.scopes.length === 0 ? (
          <p className="text-[13px] text-gray-400 text-center py-4">All standard features included</p>
        ) : (
          <ul className="space-y-2.5">
            {plan.scopes.map((scope) => (
              <li key={scope.id} className="flex items-start gap-2.5">
                <div
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={scope.isIncluded
                    ? { background: tier.accentBg }
                    : { background: '#F3F4F6' }
                  }
                >
                  <Check
                    className="w-3 h-3"
                    strokeWidth={3}
                    style={{ color: scope.isIncluded ? tier.accent : '#D1D5DB' }}
                  />
                </div>
                <span
                  className="text-[13px] leading-snug"
                  style={scope.isIncluded ? { color: '#374151', fontWeight: 500 } : { color: '#D1D5DB', textDecoration: 'line-through' }}
                >
                  {scope.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── CTA BUTTON ── */}
      <div className="px-5 pb-5 pt-3 bg-white shrink-0">
        <button
          onClick={() => onSelect(plan)}
          disabled={isDisabled}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: tier.btnBg,
            boxShadow: isHighlighted ? `0 6px 18px ${tier.accent}45` : '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
          ) : (
            <>Get Started <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        {/* Micro trust label per card */}
        <p className="text-[11px] text-gray-400 text-center mt-2">
          {isHighlighted ? '⭐ Most popular choice' : 'Cancel anytime'}
        </p>
      </div>
    </motion.div>
  );
};
