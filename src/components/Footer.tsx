import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const navigate = useNavigate();

  const getRoutePath = (id: string): string => {
    const routeMap: Record<string, string> = {
      'home': '/',
      'about': '/about',
      'services': '/services',
      'industries': '/industries',
      'resources': '/resources',
      'contact': '/contact',
    };
    return routeMap[id] || '/';
  };

  const handleNavClick = (pageId: string) => {
    const path = getRoutePath(pageId);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'industries', label: 'Industries' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const services = [
    'Taxation Services',
    'GST Compliance',
    'Audit & Assurance',
    'Company Registration',
    'Virtual CFO Services',
    'Startup Advisory',
  ];

  return (
    <footer className="bg-gradient-to-br from-primary via-primary to-secondary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold font-display">CA</span>
              </div>
              <div>
                <div className="text-xl font-bold text-white font-display">Precision Associates</div>
                <div className="text-xs text-neutral-200">Chartered Accountants</div>
              </div>
            </div>
            <p className="text-neutral-200 mb-6 leading-relaxed">
              Your trusted partner for taxation, audit, and business growth. Delivering excellence since 2014.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl text-white mb-6 font-display">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="text-neutral-200 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl text-white mb-6 font-display">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="text-neutral-200 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl text-white mb-6 font-display">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <div className="text-neutral-200 text-sm">
                  123, Business Tower,<br />
                  MG Road, Bangalore<br />
                  Karnataka - 560001
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="tel:+911234567890" className="text-neutral-200 hover:text-accent transition-colors text-sm">
                  +91 123 456 7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href="mailto:info@precisionassociates.com" className="text-neutral-200 hover:text-accent transition-colors text-sm">
                  info@precisionassociates.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm text-white mb-3 font-semibold">Subscribe to Updates</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-200">
            <div>
              © 2026 Precision Associates. All rights reserved. | ICAI Registered Firm
            </div>
            <div className="flex gap-6">
              <button className="hover:text-accent transition-colors">Privacy Policy</button>
              <button className="hover:text-accent transition-colors">Terms of Service</button>
              <button className="hover:text-accent transition-colors">Disclaimer</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
