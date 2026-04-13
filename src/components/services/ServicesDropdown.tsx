import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Phone, Search, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../../data/services';

// ============================================================
// TYPES
// ============================================================

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string, id: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Color constants
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

// ============================================================
// MAIN DROPDOWN - Two Panel Design
// ============================================================

export const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>(SERVICE_CATEGORIES[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const activeCategoryData = useMemo(
    () => SERVICE_CATEGORIES.find((c) => c.id === activeCategory),
    [activeCategory]
  );

  const allServices = useMemo(() => {
    const services: Array<{ id: string; name: string; route: string; category: string }> = [];
    for (const cat of SERVICE_CATEGORIES) {
      for (const sub of cat.subServices) {
        services.push({ ...sub, category: cat.title });
        sub.subServices?.forEach((nested) => {
          services.push({ ...nested, category: cat.title });
        });
      }
    }
    return services;
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allServices.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 20);
  }, [searchQuery, allServices]);

  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearchQuery('');
  }, [isOpen]);

  const handleServiceClick = (route: string, id: string) => {
    onNavigate?.(route, id);
    onClose();
    navigate(route);
  };

  const handleViewAll = (categoryId?: string) => {
    onClose();
    if (categoryId && categoryId !== 'all') {
      navigate(`/services/${categoryId}`);
    } else if (categoryId === 'callback') {
      navigate('/contact');
    } else {
      navigate('/all-services');
    }
  };

  const servicesCount = activeCategoryData?.subServices.length || 0;
  // Always use grid layout for all categories (box style)
  const useGridLayout = true;

  if (!isOpen) return null;

  // Mobile view - Accordion style
  const MobileDropdown = () => (
    <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-auto">
      {/* Mobile Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: `1px solid ${C.border}`,
          backgroundColor: C.bgWhite,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: F.lg,
            fontWeight: F.medium,
            color: C.primary,
            margin: 0,
          }}
        >
          Services
        </h2>
        <button
          onClick={onClose}
          style={{
            padding: '8px',
            borderRadius: '6px',
            border: `1px solid ${C.border}`,
            backgroundColor: C.bgWhite,
            cursor: 'pointer',
          }}
        >
          <X size={20} color={C.textMuted} />
        </button>
      </div>

      {/* Mobile Search */}
      <div style={{ padding: '16px', borderBottom: `1px solid ${C.border}` }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            border: `1px solid ${C.border}`,
            borderRadius: '8px',
            backgroundColor: C.bgSecondary,
          }}
        >
          <Search size={18} color={C.textMuted} />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: F.base,
              color: C.textPrimary,
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X size={16} color={C.textMuted} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Content */}
      <div style={{ padding: '16px' }}>
        {searchQuery ? (
          // Search Results
          <>
            <p
              style={{
                fontSize: F.sm,
                color: C.textMuted,
                marginBottom: '16px',
              }}
            >
              {filteredServices.length} results for "{searchQuery}"
            </p>
            {filteredServices.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceClick(service.route, service.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      border: `0.5px solid ${C.border}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: C.bgWhite,
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: C.primary,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontSize: F.base,
                          color: C.textPrimary,
                          fontWeight: F.medium,
                          display: 'block',
                        }}
                      >
                        {service.name}
                      </span>
                      <span
                        style={{
                          fontSize: F.xs,
                          color: C.textMuted,
                          marginTop: '2px',
                        }}
                      >
                        {service.category}
                      </span>
                    </div>
                    <ChevronRight size={16} color={C.textMuted} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: C.textMuted }}>
                <Search size={40} style={{ marginBottom: '12px', opacity: 0.3 }} />
                <p>No services found</p>
              </div>
            )}
          </>
        ) : (
          // Category Accordion
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isExpanded = activeCategory === category.id;
              return (
                <div
                  key={category.id}
                  style={{
                    border: `1px solid ${C.border}`,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: C.bgWhite,
                  }}
                >
                  {/* Category Header */}
                  <div
                    onClick={() => setActiveCategory(isExpanded ? '' : category.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      backgroundColor: isExpanded ? C.primaryLight : C.bgWhite,
                      borderBottom: isExpanded ? `1px solid ${C.border}` : 'none',
                    }}
                  >
                    <Icon size={20} color={isExpanded ? C.primary : C.textMuted} />
                    <span
                      style={{
                        flex: 1,
                        fontSize: F.base,
                        fontWeight: F.medium,
                        color: isExpanded ? C.primary : C.textPrimary,
                      }}
                    >
                      {category.title}
                    </span>
                    <span style={{ fontSize: F.sm, color: C.textMuted }}>
                      {category.subServices.length}
                    </span>
                    <ChevronRight
                      size={18}
                      color={C.textMuted}
                      style={{
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </div>

                  {/* Category Services */}
                  {isExpanded && (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: C.bgSecondary,
                      }}
                    >
                      {category.subServices.map((service, index) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceClick(service.route, service.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px 12px 48px',
                            cursor: 'pointer',
                            borderBottom:
                              index === category.subServices.length - 1
                                ? 'none'
                                : `0.5px solid ${C.border}`,
                            backgroundColor: C.bgSecondary,
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: C.primary,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: F.sm,
                              color: C.textPrimary,
                              flex: 1,
                            }}
                          >
                            {service.name}
                          </span>
                          <ChevronRight size={14} color={C.textMuted} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* View All Services Button */}
            <div
              onClick={() => handleViewAll('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px 16px',
                marginTop: '8px',
                border: `1px solid ${C.primary}`,
                borderRadius: '8px',
                cursor: 'pointer',
                color: C.primary,
                fontSize: F.base,
                fontWeight: F.medium,
                backgroundColor: C.bgWhite,
              }}
            >
              <span>View all services</span>
              <ArrowUpRight size={18} />
            </div>

            {/* Callback Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 16px',
                backgroundColor: C.primaryLight,
                borderRadius: '8px',
                marginTop: '8px',
                fontSize: F.sm,
                color: C.textPrimary,
              }}
            >
              <Phone size={18} color={C.primary} />
              <span>
                Prefer to talk to a business advisor?{' '}
                <span
                  onClick={() => handleViewAll('callback')}
                  style={{
                    color: C.primary,
                    fontWeight: F.medium,
                    cursor: 'pointer',
                  }}
                >
                  Book a call back
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Dropdown */}
      <MobileDropdown />

      {/* Desktop Dropdown */}
      <div
        className="absolute top-full left-0 w-full z-50 justify-center pointer-events-auto hidden lg:flex"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
      {/* Invisible bridge */}
      <div className="absolute top-[-20px] left-0 w-full h-[20px]" />

      {/* Main Container */}
      <div
        style={{
          display: 'flex',
          border: `1px solid ${C.border}`,
          borderRadius: '12px',
          minHeight: '420px',
          maxHeight: '500px',
          backgroundColor: C.bgWhite,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          width: '900px',
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          style={{
            width: '220px',
            backgroundColor: C.bgSecondary,
            borderRight: `0.5px solid ${C.border}`,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 0',
          }}
        >
          {/* Search */}
          <div style={{ padding: '0 16px 12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                border: `1px solid ${C.border}`,
                borderRadius: '6px',
                backgroundColor: C.bgWhite,
              }}
            >
              <Search size={14} color={C.textMuted} />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: F.sm,
                  color: C.textPrimary,
                  width: '80px',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ padding: '2px', lineHeight: 0 }}
                >
                  <X size={12} color={C.textMuted} />
                </button>
              )}
            </div>
          </div>

          {/* Categories Label */}
          <h3
            style={{
              fontSize: F.xs,
              fontWeight: F.medium,
              color: C.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '0 16px 8px',
              margin: 0,
            }}
          >
            Categories
          </h3>

          {/* Category List */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, flex: 1 }}>
            {SERVICE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <li
                  key={category.id}
                  onClick={() => handleServiceClick(category.route, category.id)}
                  onMouseEnter={(e) => {
                    if (!searchQuery) {
                      setActiveCategory(category.id);
                      if (!isActive) {
                        (e.currentTarget as HTMLLIElement).style.backgroundColor = C.bgWhite;
                        (e.currentTarget as HTMLLIElement).style.color = C.textPrimary;
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLLIElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLLIElement).style.color = C.textMuted;
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    borderLeft: `2px solid ${isActive ? C.primary : 'transparent'}`,
                    fontSize: F.base,
                    fontWeight: F.normal,
                    color: isActive ? C.primary : C.textMuted,
                    backgroundColor: isActive ? C.bgWhite : 'transparent',
                  }}
                >
                  <Icon size={16} color={isActive ? C.primary : C.textMuted} />
                  <span>{category.title}</span>
                  <span style={{ marginLeft: 'auto', fontSize: F.lg }}>›</span>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div
            style={{
              height: '0.5px',
              backgroundColor: C.border,
              margin: '8px 16px',
            }}
          />

          {/* View All Services */}
          <div
            onClick={() => handleViewAll('all')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              cursor: 'pointer',
              color: C.primary,
              fontSize: F.base,
              fontWeight: F.medium,
            }}
          >
            <span>View all services</span>
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            flex: 1,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: C.bgWhite,
          }}
        >
          {searchQuery ? (
            // Search Results
            <>
              <div style={{ marginBottom: '16px' }}>
                <h2
                  style={{
                    fontSize: F.lg,
                    fontWeight: F.medium,
                    color: C.primary,
                    margin: 0,
                  }}
                >
                  Search Results
                </h2>
                <p
                  style={{
                    fontSize: F.sm,
                    color: C.textMuted,
                    margin: '4px 0 0 0',
                  }}
                >
                  {filteredServices.length} results for "{searchQuery}"
                </p>
              </div>

              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredServices.length > 0 ? (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                      gap: '12px',
                    }}
                  >
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceClick(service.route, service.id)}
                        style={{
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
                          backgroundColor: C.bgWhite,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = C.primaryLight;
                          (e.currentTarget as HTMLDivElement).style.borderColor = C.primary;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = C.bgWhite;
                          (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: C.primary,
                            flexShrink: 0,
                          }}
                        />
                        <span>{service.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: C.textMuted }}>
                    <Search size={32} style={{ marginBottom: '12px', opacity: 0.3 }} />
                    <p>No services found</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Category Content
            <>
              {/* Panel Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}
              >
                <h2
                  style={{
                    fontSize: F.lg,
                    fontWeight: F.medium,
                    color: C.primary,
                    margin: 0,
                  }}
                >
                  {activeCategoryData?.title}
                </h2>
                <span
                  onClick={() => handleViewAll(activeCategoryData?.id)}
                  style={{
                    fontSize: F.sm,
                    color: C.primary,
                    cursor: 'pointer',
                    fontWeight: F.medium,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  View all ›
                </span>
              </div>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: F.sm,
                  color: C.textMuted,
                  margin: '0 0 20px 0',
                }}
              >
                {servicesCount} {servicesCount === 1 ? 'service' : 'services'} available
              </p>

              {/* Content Area */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {useGridLayout ? (
                  // Grid for ≤5 items
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                      gap: '12px',
                    }}
                  >
                    {activeCategoryData?.subServices.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceClick(service.route, service.id)}
                        style={{
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
                          backgroundColor: C.bgWhite,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor =
                            C.primaryLight;
                          (e.currentTarget as HTMLDivElement).style.borderColor = C.primary;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor =
                            C.bgWhite;
                          (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: C.primary,
                            flexShrink: 0,
                          }}
                        />
                        <span>{service.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List for 6+ items
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {activeCategoryData?.subServices.map((service, index) => (
                      <li
                        key={service.id}
                        onClick={() => handleServiceClick(service.route, service.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px 0',
                          borderBottom:
                            index === servicesCount - 1
                              ? 'none'
                              : `0.5px solid ${C.border}`,
                          cursor: 'pointer',
                          transition: 'color 0.15s ease',
                          fontSize: F.sm,
                          color: C.textMuted,
                          fontWeight: F.normal,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLLIElement).style.color = C.primary;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLLIElement).style.color = C.textMuted;
                        }}
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          {/* Callback Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: C.primaryLight,
              borderRadius: '6px',
              marginTop: '16px',
              fontSize: F.sm,
              color: C.textPrimary,
            }}
          >
            <Phone size={16} color={C.primary} />
            <span>
              Prefer to talk to a business advisor first?{' '}
              <span
                onClick={() => handleViewAll('callback')}
                style={{
                  color: C.primary,
                  textDecoration: 'none',
                  fontWeight: F.medium,
                  cursor: 'pointer',
                }}
              >
                Book a call back
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServicesDropdown;
