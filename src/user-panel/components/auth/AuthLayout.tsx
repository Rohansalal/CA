import React from 'react';
import { ShieldCheck, Users, Award, TrendingUp, FileCheck, Clock, Star } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  variant?: 'login' | 'register' | 'forgot';
}

const PANEL_CONTENT = {
  login: {
    headline: ['Your Trusted', 'Financial', 'Partner'],
    accentWord: 1,
    accentColor: '#f97316',
    description:
      'Expert CA services for businesses and individuals — compliant, confidential, and always on time.',
    tags: ['GST Compliant', 'ITR Filing', 'MCA Registered', 'ROC Filing', 'TDS Returns'],
  },
  register: {
    headline: ['Start Your', 'Journey', 'With Us'],
    accentWord: 1,
    accentColor: '#22c55e',
    description:
      'Join thousands of businesses who trust us for seamless tax, GST, and compliance management.',
    tags: ['GST Filing', 'ITR Returns', 'Company Reg.', 'Payroll', 'Audit'],
  },
  forgot: {
    headline: ['Secure', 'Account', 'Recovery'],
    accentWord: 0,
    accentColor: '#a78bfa',
    description:
      'Your account security is our priority. All data remains encrypted throughout the recovery process.',
    tags: ['256-bit SSL', 'OTP Verified', 'Secure Reset', 'Data Encrypted'],
  },
};

const STATS = [
  { value: '1,000+', label: 'Happy Clients', icon: Users },
  { value: '15+', label: 'Years Experience', icon: Clock },
  { value: '100%', label: 'Compliance Rate', icon: FileCheck },
  { value: '4.9 ★', label: 'Client Rating', icon: Star },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Bank-grade Security', sub: 'Your data is fully encrypted' },
  { icon: Users, label: '1,000+ Happy Clients', sub: 'Trusted across India' },
  { icon: Award, label: 'ICAI Certified CAs', sub: 'Qualified & experienced team' },
  { icon: TrendingUp, label: '₹50Cr+ Tax Saved', sub: 'For our clients annually' },
];

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, variant = 'login' }) => {
  const panel = PANEL_CONTENT[variant];

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ═══════════════════════════════════════════
          LEFT  –  BRANDING PANEL
      ═══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col w-[46%] xl:w-[44%] relative overflow-hidden"
        style={{
          background: 'linear-gradient(155deg, #0f3460 0%, #0c2340 45%, #071728 100%)',
        }}
      >
        {/* Subtle grid texture */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: 0.04 }}
        >
          <defs>
            <pattern id="auth-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="white" strokeWidth="0.7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#auth-grid)" />
        </svg>

        {/* Blue radial glow – top left */}
        <div
          className="absolute top-[-80px] left-[-60px] w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(19,109,161,0.25) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Accent glow – bottom right */}
        <div
          className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${panel.accentColor}33 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Decorative circles */}
        <div
          className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[340px] h-[340px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(255,255,255,0.05)' }}
        />
        <div
          className="absolute bottom-[60px] right-[40px] w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(255,255,255,0.04)' }}
        />

        {/* ── Scrollable inner content ── */}
        <div className="relative z-10 flex flex-col h-full px-10 xl:px-14 py-10">

          {/* TOP: Logo */}
          <div className="flex items-center gap-3 mb-auto">
            <img src="/logo.png" alt="CA India" className="h-12 w-auto" />
            <div className="w-px h-9 bg-white/15" />
            <div>
              <p className="text-white/60 text-[11px] font-bold tracking-[0.18em] uppercase leading-tight">
                Chartered
              </p>
              <p className="text-white/60 text-[11px] font-bold tracking-[0.18em] uppercase leading-tight">
                Accountants
              </p>
            </div>
          </div>

          {/* MIDDLE: Headline + content */}
          <div className="flex-1 flex flex-col justify-center py-10 xl:py-12 space-y-8">

            {/* Headline */}
            <div>
              <h1
                className="text-[2.6rem] xl:text-[3rem] font-bold leading-[1.08] text-white"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {panel.headline.map((word, i) => (
                  <React.Fragment key={i}>
                    {i === panel.accentWord ? (
                      <span style={{ color: panel.accentColor }}>{word}</span>
                    ) : (
                      word
                    )}
                    {i < panel.headline.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <p className="text-white text-[14.5px] leading-relaxed mt-4 max-w-[290px]">
                {panel.description}
              </p>
            </div>

            {/* Stats grid – 2 × 2 */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl px-4 py-3.5"
                  style={{
                    background: 'rgba(255,255,255,0.055)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <Icon className="w-4 h-4 mb-2" style={{ color: panel.accentColor, opacity: 0.85 }} />
                  <p className="text-white text-[1.25rem] font-bold leading-tight">{value}</p>
                  <p className="text-white/45 text-[11px] mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Trust list */}
            <div className="space-y-3.5">
              {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: 'rgba(19,109,161,0.18)',
                      border: '1px solid rgba(19,109,161,0.3)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#60b4d8]" />
                  </div>
                  <div>
                    <p className="text-white text-[13px] font-semibold leading-tight">{label}</p>
                    <p className="text-white/40 text-[11px]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM: Tag pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {panel.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-[5px] rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.45)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          RIGHT  –  FORM PANEL
      ═══════════════════════════════════════════ */}
      <div
        className="flex-1 flex items-center justify-center overflow-y-auto min-h-screen"
        style={{ background: 'linear-gradient(145deg, #eef2f7 0%, #e4ecf4 100%)' }}
      >
        <div className="w-full max-w-[440px] px-5 py-12 sm:px-8">

          {/* Mobile-only logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <img src="/logo.png" alt="CA India" className="h-11 w-auto" />
          </div>

          {/* Card */}
          <div
            className="bg-white rounded-2xl p-8 sm:p-10"
            style={{
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.07), 0 32px 64px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {children}
          </div>

          {/* SSL note — small text only, no large icon */}
          <p className="text-center text-[12px] text-[#9ca3af] mt-5 flex items-center justify-center gap-1.5">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#9ca3af] shrink-0"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            256-bit SSL encrypted &middot; Your data is safe
          </p>
        </div>
      </div>
    </div>
  );
};
