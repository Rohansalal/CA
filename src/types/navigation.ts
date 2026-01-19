export interface NavItem {
  id: string;
  label: string;
  submenu?: NavSubmenu[];
}

export interface NavSubmenu {
  id: string;
  label: string;
  icon: string;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { 
    id: 'services', 
    label: 'Services',
    submenu: [
      { id: 'company-incorporation', label: 'Company Incorporation', icon: '🏢' },
      { id: 'llp-formation', label: 'LLP Formation', icon: '👥' },
      { id: 'partnership-firm', label: 'Partnership Firm', icon: '🤝' },
      { id: 'tax-registrations', label: 'Tax Registrations', icon: '📋' },
      { id: 'tax-compliances', label: 'Tax Compliances', icon: '✓' },
      { id: 'government-registrations', label: 'Gov. Registrations', icon: '🏛️' },
    ]
  },
  { id: 'about', label: 'About Us' },
  { id: 'industries', label: 'Industries' },
  { id: 'resources', label: 'Resources' },
  { id: 'contact', label: 'Contact Us' },
];
