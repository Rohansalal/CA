import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../ui/utils';
import { SubService, SERVICE_CATEGORIES } from '../../data/services';

// ============================================================
// TYPES
// ============================================================

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string, id: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// ============================================================
// SERVICE CARD  (desktop grid item, supports nested dropdown)
// ============================================================

const ServiceCard: React.FC<{
  service: SubService;
  onClick: (route: string, id: string) => void;
}> = ({ service, onClick }) => {
  const [showNested, setShowNested] = useState(false);
  const hasNested = !!service.subServices?.length;

  return (
    <div
      className="group relative"
      onMouseEnter={() => hasNested && setShowNested(true)}
      onMouseLeave={() => setShowNested(false)}
    >
      <button
        onClick={() => {
          if (!hasNested) onClick(service.route, service.id);
        }}
        className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl border border-slate-100 text-left transition-all duration-150 hover:border-primary/30 hover:bg-primary/5 group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary flex-shrink-0 transition-colors" />
        <span className="text-[13px] text-slate-700 group-hover:text-primary font-medium line-clamp-1 transition-colors flex-1">
          {service.name}
        </span>
        {service.popular && (
          <span className="flex-shrink-0 text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
            Popular
          </span>
        )}
        {hasNested && (
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-slate-300 group-hover:text-primary transition-colors" />
        )}
      </button>

      {/* Nested dropdown */}
      {hasNested && showNested && (
        <div
          className="absolute top-0 left-[calc(100%+8px)] w-72 z-[9999] pt-0"
          onMouseEnter={() => setShowNested(true)}
          onMouseLeave={() => setShowNested(false)}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden py-2 ring-1 ring-black/5">
            <div className="px-4 py-2 border-b border-slate-50 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                {service.name}
              </span>
            </div>
            {service.subServices!.map((nested) => (
              <button
                key={nested.id}
                onClick={() => onClick(nested.route, nested.id)}
                className="w-full text-left px-4 py-2.5 hover:bg-primary/5 text-sm font-medium text-slate-700 hover:text-primary transition-colors flex items-center gap-3 border-l-2 border-transparent hover:border-primary"
              >
                <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                {nested.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// SEARCH RESULT CARD
// ============================================================

const SearchResultCard: React.FC<{
  service: SubService & { categoryTitle: string };
  onClick: () => void;
}> = ({ service, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-start p-3 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
  >
    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">
      {service.categoryTitle}
    </span>
    <span className="text-[13px] font-semibold text-slate-800 group-hover:text-primary leading-snug transition-colors">
      {service.name}
    </span>
  </button>
);

// ============================================================
// MAIN DROPDOWN
// ============================================================

export const ServicesDropdown: React.FC<ServicesDropdownProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(SERVICE_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // ── Search ────────────────────────────────────────────────

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const results: Array<SubService & { categoryTitle: string }> = [];
    for (const cat of SERVICE_CATEGORIES) {
      for (const sub of cat.subServices) {
        if (sub.name.toLowerCase().includes(q))
          results.push({ ...sub, categoryTitle: cat.title });
        sub.subServices?.forEach((nested) => {
          if (nested.name.toLowerCase().includes(q))
            results.push({ ...nested, categoryTitle: cat.title });
        });
      }
    }
    return results;
  }, [searchQuery]);

  // Focus search on open, clear on close
  useEffect(() => {
    if (isOpen) setTimeout(() => searchRef.current?.focus(), 120);
    else setSearchQuery('');
  }, [isOpen]);

  // ── Derived data ──────────────────────────────────────────

  const activeCategoryData = useMemo(
    () => SERVICE_CATEGORIES.find((c) => c.id === activeCategory),
    [activeCategory]
  );

  const flatServices = useMemo(
    () => activeCategoryData?.subServices.filter((s) => !s.subServices?.length) ?? [],
    [activeCategoryData]
  );

  const groupedServices = useMemo(
    () => activeCategoryData?.subServices.filter((s) => s.subServices?.length) ?? [],
    [activeCategoryData]
  );

  // ── Handler ───────────────────────────────────────────────

  const handleServiceClick = useCallback(
    (route: string, id: string) => {
      onNavigate(route, id);
      onClose();
    },
    [onNavigate, onClose]
  );

  // ── Render ────────────────────────────────────────────────

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="absolute top-full left-0 w-full z-50 flex justify-center pointer-events-auto hidden lg:flex"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Invisible bridge — prevents closing when mouse moves from nav bar to dropdown */}
          <div className="absolute top-[-20px] left-0 w-full h-[20px]" />

          <div className="bg-white shadow-2xl shadow-blue-900/10 border border-slate-100 rounded-b-2xl w-[95vw] max-w-[1400px] flex max-h-[82vh] overflow-hidden">

            {/* ── LEFT SIDEBAR ────────────────────────────── */}
            <aside className="w-[260px] min-w-[260px] bg-slate-50 border-r border-slate-100 flex flex-col">

              {/* Search */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-white">
                <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services…"
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>

              {/* Category list */}
              <nav className="flex-1 py-3 overflow-y-auto">
                <p className="px-4 pb-2.5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
                  Service Categories
                </p>
                {SERVICE_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onMouseEnter={() => !searchQuery && setActiveCategory(category.id)}
                      onClick={() => handleServiceClick(category.route, category.id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 group relative',
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-slate-600 hover:bg-white hover:text-slate-900'
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 inset-y-0 w-0.5 bg-white/40 rounded-r-full" />
                      )}
                      <Icon
                        className={cn(
                          'w-4 h-4 flex-shrink-0 transition-colors',
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'
                        )}
                        strokeWidth={1.75}
                      />
                      <span className="text-[13px] font-semibold flex-1 truncate">
                        {category.title}
                      </span>
                      <ChevronRight
                        className={cn(
                          'w-3.5 h-3.5 flex-shrink-0 transition-all duration-150',
                          isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'
                        )}
                      />
                    </button>
                  );
                })}
              </nav>

              {/* All services link */}
              <div className="px-3 py-3 border-t border-slate-200">
                <Link
                  to="/all-services"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold text-primary hover:bg-blue-50 transition-colors"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Browse All Services
                </Link>
              </div>
            </aside>

            {/* ── RIGHT CONTENT PANEL ──────────────────────── */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {searchQuery ? (
                /* Search results */
                <div className="p-6 overflow-y-auto flex-1">
                  {searchResults && searchResults.length > 0 ? (
                    <>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {searchResults.slice(0, 40).map((service) => (
                          <SearchResultCard
                            key={service.id}
                            service={service}
                            onClick={() => handleServiceClick(service.route, service.id)}
                          />
                        ))}
                      </div>
                      {searchResults.length > 40 && (
                        <p className="text-center text-xs text-slate-400 mt-4">
                          Showing 40 of {searchResults.length}. Refine your search.
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="py-16 text-center">
                      <Search className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-slate-400">
                        No results for "{searchQuery}"
                      </p>
                      <p className="text-xs text-slate-300 mt-1">
                        Try a different keyword or browse categories
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Category panel */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    transition={{ duration: 0.13 }}
                    className="flex flex-col h-full overflow-hidden"
                  >
                    {/* Panel header */}
                    <div className="flex items-center justify-between px-8 py-5 bg-neutral-50 border-b border-slate-100 shrink-0">
                      <div>
                        <h3 className="text-xl font-bold text-primary leading-none">
                          {activeCategoryData?.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {activeCategoryData?.subServices.length} services available
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          handleServiceClick(
                            activeCategoryData?.route ?? '#',
                            activeCategoryData?.id ?? ''
                          )
                        }
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-primary transition-colors group"
                      >
                        View all
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* Services grid */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6">

                      {/* Flat services */}
                      {flatServices.length > 0 && (
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
                          {flatServices.map((service) => (
                            <ServiceCard
                              key={service.id}
                              service={service}
                              onClick={handleServiceClick}
                            />
                          ))}
                        </div>
                      )}

                      {/* Grouped services */}
                      {groupedServices.map((group) => (
                        <div key={group.id}>
                          <button
                            onClick={() => handleServiceClick(group.route, group.id)}
                            className="w-full flex items-center gap-3 mb-3 group"
                          >
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                              {group.name}
                            </span>
                            <div className="flex-1 h-px bg-slate-100" />
                            <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-primary transition-colors" />
                          </button>
                          <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
                            {group.subServices!.map((nested) => (
                              <ServiceCard
                                key={nested.id}
                                service={nested}
                                onClick={handleServiceClick}
                              />
                            ))}
                          </div>
                        </div>
                      ))}

                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
