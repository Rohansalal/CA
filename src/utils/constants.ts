// Animation utilities
export const animationClasses = {
  fadeIn: 'transition-opacity duration-300',
  slideUp: 'transition-all duration-300 transform',
  scaleIn: 'transition-transform duration-300',
  shimmer: 'animate-pulse',
  bounce: 'animate-bounce',
};

// Color utilities for service categories
export const categoryColors = {
  'Business Registrations': 'from-blue-500 to-blue-600',
  'Tax Registrations': 'from-green-500 to-green-600',
  'Tax & Financial Compliances': 'from-purple-500 to-purple-600',
  'Government Registrations & Licenses': 'from-orange-500 to-orange-600',
  'ROC & MCA Compliances': 'from-red-500 to-red-600',
  'Labour Law Compliances': 'from-indigo-500 to-indigo-600',
};

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Spacing constants
export const spacing = {
  section: 'py-16',
  sectionLg: 'py-20',
  sectionSm: 'py-8',
  horizontalPadding: 'px-4 sm:px-6 lg:px-8',
  maxWidth: 'max-w-7xl',
};

// Common CSS classes
export const commonClasses = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  heroGradient: 'bg-gradient-to-br from-primary via-primary to-secondary',
  ctaGradient: 'bg-gradient-to-r from-primary to-secondary',
  shadowMd: 'shadow-md',
  shadowLg: 'shadow-lg',
  shadowXl: 'shadow-xl',
  shadow2xl: 'shadow-2xl',
  roundedLg: 'rounded-lg',
  roundedXl: 'rounded-xl',
  roundedFull: 'rounded-full',
  border: 'border border-neutral-200',
  transition: 'transition-all duration-300',
};

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;
export const IS_DEV = import.meta.env.DEV;
