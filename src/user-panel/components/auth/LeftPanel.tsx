import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Users, Award, TrendingUp, FileCheck, Clock, Star } from 'lucide-react';

const STATS = [
  { value: '1,000+', label: 'Happy Clients', icon: Users },
  { value: '15+', label: 'Years Exp.', icon: Clock },
  { value: '100%', label: 'Compliance', icon: FileCheck },
  { value: '4.9 ★', label: 'Rating', icon: Star },
];

const TRUST = [
  { icon: ShieldCheck, label: 'Bank-grade Security', sub: 'Your data is fully encrypted' },
  { icon: Users, label: '1,000+ Happy Clients', sub: 'Trusted across India' },
  { icon: Award, label: 'ICAI Certified CAs', sub: 'Qualified & experienced team' },
  { icon: TrendingUp, label: '₹50Cr+ Tax Saved', sub: 'For our clients annually' },
];

const TAGS = ['GST Filing', 'ITR Returns', 'Company Reg.', 'ROC Filing', 'TDS', 'Audit'];

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
};

export const LeftPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col w-[45%] xl:w-[42%] 2xl:w-[40%] relative overflow-hidden"
    >
      {/* Subtle vertical border glow on the right edge */}
      <div
        className="absolute top-0 right-0 bottom-0 w-px pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 95%)',
        }}
      />

      {/* Top-left glow */}
      <div
        className="absolute top-[-100px] left-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(33,150,243,0.2) 0%, transparent 65%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Bottom-right accent glow */}
      <div
        className="absolute bottom-[-60px] right-[10%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Dot pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.03 }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* ── Content — single centred column ── */}
      <div className="relative z-10 flex flex-col h-full justify-center px-8 lg:px-10 xl:px-12 2xl:px-14 py-6 lg:py-8 space-y-5 lg:space-y-7">

        {/* Logo / Branding */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5 lg:gap-3"
        >
          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <svg className="w-5 h-5 lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.7"/>
            </svg>
          </div>
          <div>
            <p className="text-[10px] lg:text-[11px] font-bold tracking-[0.2em] uppercase leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Chartered
            </p>
            <p className="text-[10px] lg:text-[11px] font-bold tracking-[0.2em] uppercase leading-tight" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Accountants
            </p>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h1
            className="text-[1.8rem] lg:text-[2rem] xl:text-[2.4rem] 2xl:text-[2.6rem] font-bold tracking-[-0.03em] leading-[1.05] mb-2 lg:mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#f7f9fb' }}
          >
            Premium Audit
            <br />
            & Tax Services
          </h1>
          <p className="text-[13px] lg:text-[14px] xl:text-[15px] leading-[1.5] lg:leading-[1.55] text-white/80 max-w-[24ch] lg:max-w-[26ch]">
            Trusted by businesses across India for compliance, accuracy and on-time filing.
          </p>
        </motion.div>

        {/* Stats 2×2 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-2.5 lg:gap-3"
        >
          {STATS.map(({ value, label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="rounded-xl lg:rounded-2xl px-3 lg:px-4 py-3 lg:py-3.5"
              style={{
                background: 'rgba(255,255,255,0.055)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Icon className="w-4 h-4 lg:w-[17px] lg:h-[17px] mb-1 lg:mb-1.5" style={{ color: 'rgba(251,146,60,0.85)' }} />
              <p className="text-white text-base lg:text-[1.15rem] font-bold leading-tight tracking-[-0.02em]">
                {value}
              </p>
              <p className="text-[10px] lg:text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2.5 lg:space-y-3.5"
        >
          {TRUST.map(({ icon: Icon, label, sub }) => (
            <motion.div key={label} variants={staggerItem} className="flex items-center gap-3 lg:gap-3.5">
              <div
                className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg lg:rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(33,150,243,0.15)',
                  border: '1px solid rgba(33,150,243,0.28)',
                }}
              >
                <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4" style={{ color: '#60b4d8' }} />
              </div>
              <div>
                <p className="text-white text-[12px] lg:text-[13px] font-semibold leading-tight tracking-[-0.01em]">
                  {label}
                </p>
                <p className="text-[10px] lg:text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="flex flex-wrap gap-1.5 lg:gap-2"
        >
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="text-[10px] lg:text-[11px] font-medium px-2.5 lg:px-3 py-1 lg:py-[5px] rounded-full"
              style={{
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.42)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
