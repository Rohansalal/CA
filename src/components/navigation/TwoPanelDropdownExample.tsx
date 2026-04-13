import React from 'react';
import { TwoPanelDropdown } from './TwoPanelDropdown';
import { 
  Building2, 
  Receipt, 
  Calculator, 
  PieChart, 
  Landmark,
  ArrowRight
} from 'lucide-react';

// Example usage with your service categories
export function TwoPanelDropdownExample() {
  const categories = [
    {
      id: 'business-registrations',
      label: 'Business Registration',
      icon: <Building2 size={16} />,
      services: [
        { id: 'proprietorship', name: 'Proprietorship', route: '/services/business-registrations/proprietorship' },
        { id: 'partnership', name: 'Partnership Firm', route: '/services/business-registrations/partnership-firm' },
        { id: 'llp', name: 'LLP Registration', route: '/services/business-registrations/llp-registration' },
        { id: 'pvt-ltd', name: 'Private Limited', route: '/services/business-registrations/private-limited-company' },
        { id: 'opc', name: 'One Person Company', route: '/services/business-registrations/one-person-company' },
        { id: 'public-ltd', name: 'Public Limited', route: '/services/business-registrations/public-limited-company' },
        { id: 'section8', name: 'Section 8 Company', route: '/services/business-registrations/section-8-company' },
        { id: 'trust', name: 'Trust Registration', route: '/services/business-registrations/trust-registration' },
        { id: 'society', name: 'Society Registration', route: '/services/business-registrations/society-registration' },
        { id: 'huf', name: 'HUF Registration', route: '/services/business-registrations/huf' },
      ],
    },
    {
      id: 'tax-registrations',
      label: 'Tax Registration',
      icon: <Receipt size={16} />,
      services: [
        { id: 'gst', name: 'GST Registration', route: '/services/tax-registrations/gst-registration' },
        { id: 'pan', name: 'PAN Application', route: '/services/tax-registrations/pan-application' },
        { id: 'tan', name: 'TAN Application', route: '/services/tax-registrations/tan-application' },
      ],
    },
    {
      id: 'accounting',
      label: 'Accounting Services',
      icon: <Calculator size={16} />,
      services: [
        { id: 'book-keeping', name: 'Book Keeping', route: '/services/business-compliances/book-keeping' },
        { id: 'book-supervision', name: 'Book Supervision', route: '/services/business-compliances/book-supervision' },
      ],
    },
    {
      id: 'tax-compliances',
      label: 'Tax Compliances',
      icon: <PieChart size={16} />,
      services: [
        { id: 'itr', name: 'ITR Filing', route: '/services/tax-compliances/itr-filing' },
        { id: 'tds', name: 'TDS Return', route: '/services/tax-compliances/tds-return-filing' },
        { id: 'gst-return', name: 'GST Return', route: '/services/tax-compliances/gst-return-filing' },
        { id: 'gst-annual', name: 'GST Annual Return', route: '/services/tax-compliances/gst-annual-return' },
        { id: 'advance-tax', name: 'Advance Tax', route: '/services/tax-compliances/advance-tax-calculation' },
      ],
    },
    {
      id: 'other-registrations',
      label: 'Other Registrations',
      icon: <Landmark size={16} />,
      services: [
        { id: 'fssai', name: 'FSSAI Registration', route: '/services/other-registrations/fssai' },
        { id: 'msme', name: 'MSME Registration', route: '/services/other-registrations/msme' },
        { id: 'iec', name: 'Import Export Code', route: '/services/other-registrations/iec' },
        { id: 'trademark', name: 'Trademark', route: '/services/other-registrations/trademark' },
        { id: 'copyright', name: 'Copyright', route: '/services/other-registrations/copyright' },
        { id: 'startup', name: 'Startup India', route: '/services/other-registrations/startup-india' },
      ],
    },
  ];

  const handleServiceClick = (service: { id: string; name: string; route: string }) => {
    console.log('Service clicked:', service);
    // Navigate to service page
    window.location.href = service.route;
  };

  const handleViewAllClick = (categoryId: string) => {
    console.log('View all clicked for:', categoryId);
    if (categoryId === 'all') {
      window.location.href = '/all-services';
    } else if (categoryId === 'callback') {
      window.location.href = '/contact';
    } else {
      window.location.href = `/services/${categoryId}`;
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: 500 }}>
        Two-Panel Dropdown Navigation
      </h1>
      
      <TwoPanelDropdown 
        categories={categories}
        onServiceClick={handleServiceClick}
        onViewAllClick={handleViewAllClick}
      />

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>Usage Instructions</h2>
        <pre style={{ 
          backgroundColor: '#f9fafb', 
          padding: '16px', 
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '13px'
        }}>
{`import { TwoPanelDropdown } from './components/navigation/TwoPanelDropdown';
import { Building2, Receipt } from 'lucide-react';

const categories = [
  {
    id: 'business-registrations',
    label: 'Business Registration',
    icon: <Building2 size={16} />,
    services: [
      { id: 'proprietorship', name: 'Proprietorship', route: '/services/proprietorship' },
      { id: 'partnership', name: 'Partnership Firm', route: '/services/partnership' },
      // ... more services
    ],
  },
  // ... more categories
];

<TwoPanelDropdown 
  categories={categories}
  onServiceClick={(service) => navigate(service.route)}
  onViewAllClick={(categoryId) => navigate(\`/services/\${categoryId}\`)}
/>
`}
        </pre>
      </div>
    </div>
  );
}

export default TwoPanelDropdownExample;
