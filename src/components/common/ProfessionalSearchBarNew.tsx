import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Package, TrendingUp, Clock, Tag, ChevronRight, Command, Sparkles, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SearchableService {
  id: number;
  name: string;
  description: string;
  price: string | number;
  categoryName?: string;
  roadmap?: any[];
  defaultPlanId?: number;
  [key: string]: any;
}

interface SearchBarProps {
  services: SearchableService[];
  onSelectService: (service: SearchableService) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
  showKbShortcut?: boolean;
}

export const ProfessionalSearchBar: React.FC<SearchBarProps> = ({
  services,
  onSelectService,
  placeholder = 'Search services, tasks, documents…',
  className = '',
  compact = false,
  showKbShortcut = true,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dashboardRecentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter services based on query
  const filteredServices = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return services
      .filter(s =>
        s.name.toLowerCase().includes(lowerQuery) ||
        (s.description || '').toLowerCase().includes(lowerQuery) ||
        (s.categoryName || '').toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8); // Limit to 8 results
  }, [query, services]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchableService[]> = {};

    filteredServices.forEach(service => {
      const category = service.categoryName || 'Other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(service);
    });

    return groups;
  }, [filteredServices]);

  const handleSelect = (service: SearchableService) => {
    onSelectService(service);

    // Save to recent searches
    const updated = [service.name, ...recentSearches.filter(s => s !== service.name)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('dashboardRecentSearches', JSON.stringify(updated));

    // Reset state
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' && query) setIsOpen(true);
      return;
    }

    const allItems = filteredServices;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < allItems.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : allItems.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          handleSelect(allItems[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    setSelectedIndex(-1);
  };

  const hasResults = query.trim() && filteredServices.length > 0;
  const hasRecentSearches = !query && recentSearches.length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input - Professional SaaS Design */}
      <motion.div
        className={`relative transition-all duration-300 ${
          compact
            ? 'h-10 rounded-xl'
            : 'h-12 rounded-2xl'
        } ${
          isOpen
            ? 'ring-2 ring-indigo-500/40 ring-offset-2 shadow-2xl bg-white'
            : 'hover:shadow-xl bg-white border border-gray-200 hover:border-gray-300'
        }`}
        style={{
          boxShadow: isOpen
            ? '0 25px 50px -12px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
        whileHover={!isOpen ? { scale: 1.01 } : {}}
        whileTap={!isOpen ? { scale: 0.99 } : {}}
      >
        {/* Search Icon with Gradient - Left Side */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4">
          <div className={`relative ${compact ? 'w-5 h-5' : 'w-6 h-6'}`}>
            <Search
              className={`w-full h-full transition-all duration-300 ${
                isOpen ? 'text-indigo-500' : 'text-gray-400'
              }`}
            />
            {isOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm opacity-20"
              />
            )}
          </div>
        </div>

        {/* Right Side Search Icon (Static) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-12">
          <div className={`${compact ? 'w-5 h-5' : 'w-6 h-6'}`}>
            <Search
              className="w-full h-full text-gray-300"
            />
          </div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
            setSelectedIndex(-1);
          }}
          onFocus={() => {
            if (query || recentSearches.length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-500 font-medium transition-all duration-200 ${
            compact ? 'px-10 py-2.5 text-sm pr-10' : 'px-12 py-3.5 text-base pr-12'
          } ${isOpen ? 'placeholder:text-gray-400' : ''}`}
        />

        {/* Enhanced Keyboard Shortcut Badge */}
        {!query && showKbShortcut && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <Command className="w-3 h-3 text-gray-500" />
            <span className="text-gray-600">K</span>
          </motion.div>
        )}

        {/* Clear Button with Animation */}
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Professional Dropdown Results */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]"
              onClick={() => setIsOpen(false)}
            />

            {/* Enhanced Dropdown Panel */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden z-50 max-h-[480px] overflow-y-auto"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              }}
            >
              {/* Results Section */}
              {hasResults ? (
                <div className="py-2">
                  {Object.entries(groupedResults).map(([category, items], categoryIdx) => (
                    <div key={category}>
                      {/* Category Header */}
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: categoryIdx * 0.1 }}
                        className="px-5 py-3 bg-gradient-to-r from-gray-50/80 to-white border-b border-gray-100/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Tag className="w-3.5 h-3.5 text-white" />
                          </div>
                          <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">{category}</p>
                          <div className="ml-auto flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                            <span className="text-xs text-gray-500 font-medium">{items.length}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Service Items */}
                      {items.map((service, itemIdx) => {
                        const globalIdx = filteredServices.indexOf(service);
                        const isSelected = selectedIndex === globalIdx;

                        return (
                          <motion.button
                            key={service.id}
                            onClick={() => handleSelect(service)}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (categoryIdx * 0.1) + (itemIdx * 0.05) }}
                            className={`w-full px-5 py-4 flex items-center gap-4 group text-left transition-all duration-200 relative ${
                              isSelected
                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500'
                                : 'hover:bg-gray-50/80'
                            }`}
                          >
                            {/* Service Icon with Enhanced Design */}
                            <div className="relative">
                              <div
                                className={`w-11 h-11 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110'
                                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:scale-105'
                                }`}
                              >
                                <Package className="w-5 h-5" />
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-xl opacity-20 blur-sm"
                                />
                              )}
                            </div>

                            {/* Service Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className={`font-bold truncate transition-colors ${
                                  isSelected ? 'text-indigo-900' : 'text-gray-900 group-hover:text-gray-800'
                                }`}>
                                  {service.name}
                                </p>
                                {service.price && (
                                  <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    isSelected
                                      ? 'bg-indigo-100 text-indigo-700'
                                      : 'bg-emerald-50 text-emerald-700'
                                  }`}>
                                    ₹{typeof service.price === 'string' ? service.price : service.price.toLocaleString()}
                                  </div>
                                )}
                              </div>
                              <p className={`text-sm truncate transition-colors ${
                                isSelected ? 'text-indigo-700' : 'text-gray-500 group-hover:text-gray-600'
                              }`}>
                                {service.description}
                              </p>
                            </div>

                            {/* Enhanced Chevron */}
                            <div className={`flex-shrink-0 transition-all duration-200 ${
                              isSelected ? 'translate-x-1' : 'group-hover:translate-x-0.5'
                            }`}>
                              <ChevronRight
                                className={`w-5 h-5 transition-colors ${
                                  isSelected
                                    ? 'text-indigo-500'
                                    : 'text-gray-300 group-hover:text-gray-400'
                                }`}
                              />
                            </div>

                            {/* Subtle Selection Indicator */}
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-500 rounded-full"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : hasRecentSearches ? (
                <div className="py-2">
                  {/* Recent Searches Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-5 py-4 bg-gradient-to-r from-amber-50/80 to-orange-50/80 border-b border-amber-100/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">Recent Searches</p>
                        <p className="text-xs text-gray-600">Quick access to your previous searches</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Search Items */}
                  {recentSearches.map((search, idx) => {
                    const matchingService = services.find(
                      s => s.name.toLowerCase() === search.toLowerCase()
                    );
                    return matchingService ? (
                      <motion.button
                        key={idx}
                        onClick={() => handleSelect(matchingService)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className={`w-full px-5 py-4 flex items-center gap-4 text-left transition-all duration-200 relative ${
                          selectedIndex === idx
                            ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500'
                            : 'hover:bg-gray-50/80'
                        }`}
                      >
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                          selectedIndex === idx
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg scale-105'
                            : 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600'
                        }`}>
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold transition-colors ${
                            selectedIndex === idx ? 'text-amber-900' : 'text-gray-800'
                          }`}>
                            {search}
                          </p>
                          <p className="text-sm text-gray-500">Recent search</p>
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-colors ${
                          selectedIndex === idx ? 'text-amber-500' : 'text-gray-300'
                        }`} />
                      </motion.button>
                    ) : null;
                  })}
                </div>
              ) : (
                /* Enhanced Empty State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-6 py-12 text-center"
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto">
                      <Search className="w-7 h-7 text-gray-400" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-indigo-200 border-t-indigo-500 rounded-2xl"
                    />
                  </div>
                  <p className="text-base font-semibold text-gray-700 mb-1">No results found</p>
                  <p className="text-sm text-gray-500 mb-4">Try searching for a service name, category, or description</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Search across {services.length} professional services</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};