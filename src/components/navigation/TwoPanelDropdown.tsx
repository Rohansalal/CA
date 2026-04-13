import React, { useState } from 'react';
import { ChevronRight, ArrowUpRight, Phone } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  route: string;
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  services: Service[];
}

interface TwoPanelDropdownProps {
  categories: Category[];
  onServiceClick?: (service: Service) => void;
  onViewAllClick?: (categoryId: string) => void;
}

// Color constants (CSS vars don't work in inline styles)
const C = {
  primary: '#1a4fa0',
  primaryLight: '#f0f5ff',
  textMuted: '#6b7280',
  textPrimary: '#111827',
  border: '#e5e7eb',
  bgSecondary: '#f9fafb',
  bgWhite: '#ffffff',
};

const F = {
  xs: '11px',
  sm: '13px',
  base: '14px',
  lg: '18px',
  normal: '400',
  medium: '500',
};

const styles = {

  // Component styles
  container: {
    display: 'flex',
    border: `1px solid ${C.border}`,
    borderRadius: '12px',
    minHeight: '420px',
    backgroundColor: C.bgWhite,
    overflow: 'hidden',
  },

  leftPanel: {
    width: '220px',
    backgroundColor: C.bgSecondary,
    borderRight: `0.5px solid ${C.border}`,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '16px 0',
  },

  sectionLabel: {
    fontSize: F.xs,
    fontWeight: F.medium,
    color: C.textMuted,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    padding: '0 16px 12px 16px',
    margin: 0,
  },

  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flex: 1,
  },

  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    borderLeft: '2px solid transparent',
    fontSize: F.base,
    fontWeight: F.normal,
    color: C.textMuted,
  },

  navItemHover: {
    backgroundColor: C.bgWhite,
    color: C.textPrimary,
  },

  navItemActive: {
    backgroundColor: C.bgWhite,
    color: C.primary,
    borderLeft: `2px solid ${C.primary}`,
  },

  navIcon: {
    width: '16px',
    height: '16px',
    flexShrink: 0,
  },

  navArrow: {
    marginLeft: 'auto',
    fontSize: F.lg,
    lineHeight: 1,
  },

  divider: {
    height: '0.5px',
    backgroundColor: C.border,
    margin: '8px 16px',
  },

  viewAllNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    cursor: 'pointer',
    color: C.primary,
    fontSize: F.base,
    fontWeight: F.medium,
  },

  rightPanel: {
    flex: 1,
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: C.bgWhite,
  },

  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },

  panelTitle: {
    fontSize: F.lg,
    fontWeight: F.medium,
    color: C.primary,
    margin: 0,
  },

  viewAllLink: {
    fontSize: F.sm,
    color: C.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    fontWeight: F.medium,
  },

  panelSubtitle: {
    fontSize: F.sm,
    color: C.textMuted,
    margin: '0 0 20px 0',
  },

  contentArea: {
    flex: 1,
    overflowY: 'auto' as const,
  },

  // Grid layout for ≤5 items
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '12px',
  },

  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 14px',
    border: `0.5px solid ${C.border}`,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontSize: F.sm,
    color: C.textPrimary,
    fontWeight: F.normal,
  },

  cardHover: {
    backgroundColor: C.primaryLight,
    borderColor: C.primary,
  },

  cardDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: C.primary,
    flexShrink: 0,
  },

  // List layout for 6+ items
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: `0.5px solid ${C.border}`,
    cursor: 'pointer',
    transition: 'color 0.15s ease',
    fontSize: F.sm,
    color: C.textMuted,
    fontWeight: F.normal,
  },

  listItemLast: {
    borderBottom: 'none',
  },

  listItemHover: {
    color: C.primary,
  },

  // Callback bar
  callbackBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    backgroundColor: C.primaryLight,
    borderRadius: '6px',
    marginTop: '16px',
    fontSize: F.sm,
    color: C.textPrimary,
  },

  callbackLink: {
    color: C.primary,
    textDecoration: 'none',
    fontWeight: F.medium,
    cursor: 'pointer',
  },

  phoneIcon: {
    width: '16px',
    height: '16px',
    color: C.primary,
    flexShrink: 0,
  },
};

export function TwoPanelDropdown({ 
  categories, 
  onServiceClick, 
  onViewAllClick 
}: TwoPanelDropdownProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  const activeCategoryData = categories.find(cat => cat.id === activeCategory);
  const serviceCount = activeCategoryData?.services.length || 0;
  const useGridLayout = serviceCount <= 5;

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleServiceClick = (service: Service) => {
    onServiceClick?.(service);
  };

  const handleViewAll = () => {
    onViewAllClick?.(activeCategory);
  };

  const handleViewAllServices = () => {
    onViewAllClick?.('all');
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <h3 style={styles.sectionLabel}>Categories</h3>
        <ul style={styles.navList}>
          {categories.map((category, index) => (
            <li
              key={category.id}
              style={{
                ...styles.navItem,
                ...(activeCategory === category.id ? styles.navItemActive : {}),
              }}
              onClick={() => handleCategoryClick(category.id)}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  Object.assign(e.currentTarget.style, styles.navItemHover);
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = C.textMuted;
                }
              }}
            >
              <span style={styles.navIcon}>{category.icon}</span>
              <span>{category.label}</span>
              <span style={styles.navArrow}>›</span>
            </li>
          ))}
        </ul>
        
        <div style={styles.divider} />
        
        <div 
          style={styles.viewAllNav}
          onClick={handleViewAllServices}
        >
          <span>View all services</span>
          <ArrowUpRight style={styles.navIcon} />
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>
            {activeCategoryData?.label}
          </h2>
          <span 
            style={styles.viewAllLink}
            onClick={handleViewAll}
          >
            View all ›
          </span>
        </div>
        
        <p style={styles.panelSubtitle}>
          {serviceCount} {serviceCount === 1 ? 'service' : 'services'} available
        </p>

        <div style={styles.contentArea}>
          {useGridLayout ? (
            // Card grid for ≤5 items
            <div style={styles.cardGrid}>
              {activeCategoryData?.services.map((service) => (
                <div
                  key={service.id}
                  style={styles.card}
                  onClick={() => handleServiceClick(service)}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.cardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = C.bgWhite;
                    e.currentTarget.style.borderColor = C.border;
                  }}
                >
                  <span style={styles.cardDot} />
                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          ) : (
            // List for 6+ items
            <ul style={styles.list}>
              {activeCategoryData?.services.map((service, index) => (
                <li
                  key={service.id}
                  style={{
                    ...styles.listItem,
                    ...(index === serviceCount - 1 ? styles.listItemLast : {}),
                  }}
                  onClick={() => handleServiceClick(service)}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.listItemHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = C.textMuted;
                  }}
                >
                  {service.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Callback Bar */}
        <div style={styles.callbackBar}>
          <Phone style={styles.phoneIcon} />
          <span>
            Prefer to talk to a business advisor first?{' '}
            <span 
              style={styles.callbackLink}
              onClick={() => onViewAllClick?.('callback')}
            >
              Book a call back
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TwoPanelDropdown;
