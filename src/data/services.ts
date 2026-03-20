import { 
  Building2, Receipt, Calculator, PieChart, Landmark 
} from 'lucide-react';
import React from 'react';

export interface SubService {
  id: string;
  name: string;
  route: string;
  description?: string;
  popular?: boolean;
  comingSoon?: boolean;
  subServices?: SubService[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  route: string;
  icon: React.ElementType;
  color: string;
  subServices: SubService[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'business-registrations',
    title: 'Business Registration',
    route: '/services/business-registrations',
    icon: Building2,
    color: 'blue',
    subServices: [
      { id: 'proprietorship-registration', name: 'Proprietorship Registration', route: '/services/business-registrations/proprietorship' },
      { id: 'huf-registration', name: 'HUF Registration', route: '/services/business-registrations/huf' },
      { id: 'partnership-firm', name: 'Partnership Firm', route: '/services/business-registrations/partnership-firm' },
      { id: 'llp-registration', name: 'LLP Registration', route: '/services/business-registrations/llp-registration' },
      { id: 'private-limited-company', name: 'Private Limited Company', route: '/services/business-registrations/private-limited-company' },
      { id: 'one-person-company', name: 'One Person Company – OPC', route: '/services/business-registrations/one-person-company' },
      { id: 'public-limited-company', name: 'Public Limited Company', route: '/services/business-registrations/public-limited-company' },
      { id: 'section-8-company', name: 'Section 8 Company', route: '/services/business-registrations/section-8-company' },
      { id: 'trust-registration', name: 'Trust Registration', route: '/services/business-registrations/trust-registration' },
      { id: 'society-registration', name: 'Society Registration', route: '/services/business-registrations/society-registration' },
    ]
  },
  {
    id: 'tax-registrations',
    title: 'Tax Registration',
    route: '/services/tax-registrations',
    icon: Receipt,
    color: 'blue',
    subServices: [
      { id: 'gst-registration', name: 'GST Registration', route: '/services/tax-registrations/gst-registration' },
      { id: 'pan-application', name: 'PAN Application', route: '/services/tax-registrations/pan-application' },
      { id: 'tan-application', name: 'TAN Application', route: '/services/tax-registrations/tan-application' },
    ]
  },
  {
    id: 'accounting-services',
    title: 'Accounting Services',
    route: '/services/business-compliances/book-keeping',
    icon: Calculator,
    color: 'blue',
    subServices: [
      { id: 'book-keeping', name: 'Book Keeping', route: '/services/business-compliances/book-keeping' },
      { id: 'book-supervision', name: 'Book Supervision', route: '/services/business-compliances/book-supervision' },
      {
        id: 'roc-mca-compliance',
        name: 'ROC / MCA Compliance',
        route: '/services/roc-mca-compliance',
        subServices: [
          { id: 'change-directors-kmp', name: 'Change in directors/KMP', route: '/services/business-compliances/change-directors-kmp' },
          { id: 'change-registered-office', name: 'Change in Registered office', route: '/services/business-compliances/change-registered-office' },
          { id: 'annual-filing-company', name: 'Annual filling-Company', route: '/services/business-compliances/annual-filing-company' },
          { id: 'din', name: 'DIN', route: '/services/business-compliances/din-dir3-kyc' },
          { id: 'dir3-kyc', name: 'DIR3-KYC', route: '/services/business-compliances/din-dir3-kyc' },
          { id: 'dir-wkyc', name: 'DIR-WKYC', route: '/services/business-compliances/din-dir3-kyc' },
          { id: 'minutes-book', name: 'Minutes Book', route: '/services/business-compliances/minutes-book' },
          { id: 'statutory-record', name: 'Statutory record', route: '/services/business-compliances/statutory-record' },
          { id: 'annual-filing-llp', name: 'Annual filling-LLP', route: '/services/business-compliances/annual-filing-llp' },
        ]
      },
    ]
  },
  {
    id: 'tax-compliances',
    title: 'Tax Compliances',
    route: '/services/tax-financial-compliances',
    icon: Calculator,
    color: 'blue',
    subServices: [
      { id: 'advance-tax-calculation', name: 'Advance Tax Calculation', route: '/services/tax-compliances/advance-tax-calculation' },
      { id: 'itr-filing', name: 'ITR Filing', route: '/services/tax-compliances/itr-filing' },
      { id: 'tds-return-filing', name: 'TDS Return Filing', route: '/services/tax-compliances/tds-return-filing' },
      { id: 'gst-return-filing', name: 'GST Return Filing', route: '/services/tax-compliances/gst-return-filing' },
      { id: 'gst-annual-return', name: 'GST Annual Return', route: '/services/tax-compliances/gst-annual-return' },
    ]
  },
  {
    id: 'audit-assurance',
    title: 'Audit & Assurance',
    route: '/services/audit-assurance',
    icon: PieChart,
    color: 'blue',
    subServices: [
      { id: 'statutory-audit', name: 'Statutory Audit', route: '/services/audit-assurance/statutory-audit' },
      { id: 'tax-audit', name: 'Tax Audit', route: '/services/audit-assurance/tax-audit' },
      { id: 'gst-audit', name: 'GST Audit', route: '/services/audit-assurance/gst-audit' },
      { id: 'internal-audit', name: 'Internal Audit', route: '/services/audit-assurance/internal-audit' },
    ]
  },
  {
    id: 'other-registrations',
    title: 'Other Registrations',
    route: '/services/government-registrations-compliances',
    icon: Landmark,
    color: 'blue',
    subServices: [
      { id: 'fssai-registration', name: 'FSSAI Registration', route: '/services/other-registrations/fssai' },
      { id: 'import-export-code', name: 'Import Export Code (IEC)', route: '/services/other-registrations/iec' },
      { id: 'msme-registration', name: 'MSME Registration', route: '/services/other-registrations/msme' },
      { id: 'dsc', name: 'Digital Signature (DSC)', route: '/services/other-registrations/dsc' },
      { id: 'pf-esic-registration', name: 'PF & ESIC Registration', route: '/services/other-registrations/pf-esic' },
      { id: 'trademark-registration', name: 'Trademark Registration', route: '/services/other-registrations/trademark' },
      { id: 'copyright-registration', name: 'Copyright Registration', route: '/services/other-registrations/copyright' },
      { id: 'startup-india', name: 'Startup India', route: '/services/other-registrations/startup-india' },
      { id: 'trade-license', name: 'Trade License', route: '/services/other-registrations/trade-license' },
      { id: 'labour-registration', name: 'Shop & Establishment', route: '/services/other-registrations/labour-registration' },
      { id: 'drug-license', name: 'Drug License', route: '/services/other-registrations/drug-license' },
      { id: 'pollution-control', name: 'Pollution Control (NOC)', route: '/services/other-registrations/pollution-control' },
    ]
  },
];

// Utility to generate 1000+ services for performance testing
export const MOCK_LARGE_SERVICE_LIST: SubService[] = Array.from({ length: 1200 }).map((_, i) => ({
  id: `mock-service-${i}`,
  name: `Professional Service ${i + 1}`,
  route: `/services/mock-${i}`,
  description: `High-performance regulatory module ${i + 1} for enterprise compliance and financial oversight.`,
  popular: i % 50 === 0,
}));

export const getAllServices = (): SubService[] => {
  const all: SubService[] = [];
  SERVICE_CATEGORIES.forEach(cat => {
    cat.subServices.forEach(s => {
      all.push(s);
      if (s.subServices) {
        all.push(...s.subServices);
      }
    });
  });
  return [...all, ...MOCK_LARGE_SERVICE_LIST];
};
