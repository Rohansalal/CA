import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut, Plus, ShoppingCart, FileText, Settings, User,
  Upload, CreditCard, CheckCircle, Clock, XCircle, Download, Eye,
  AlertCircle, TrendingUp, Package, Loader, Map, ChevronRight, ChevronLeft, MessageSquare, Trash2,
  Calendar as CalendarIcon, FileBarChart, LayoutDashboard, Menu, X, Shield, Search,
  Zap, ShieldCheck, DollarSign, Bell, ChevronDown, ArrowRight, Sparkles,
  File, FolderOpen, BadgeCheck, ExternalLink,
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PlanSelectionModal } from '../../components/services/PlanSelectionModal';
import { ProfessionalSearchBar } from '../../components/common/ProfessionalSearchBarNew';
import api from '../../utils/api';
const API_URL = (import.meta as any).env.VITE_API_BASE_URL || '/api';

interface RoadmapStep {
  step: number;
  title: string;
  description: string;
  status?: 'pending' | 'in_progress' | 'completed';
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: string | number;
  roadmap?: RoadmapStep[];
  defaultPlanId?: number;
}

interface UserService {
  id: number;
  orderId: number;
  orderItemId?: number;
  userId: number;
  serviceId: number;
  serviceName?: string;
  status: string;
  createdAt: string;
  service: Service;
  documents?: Document[];
  price?: number;
  planName?: string;
  planType?: string;   // canonical: BASIC | STANDARD | PREMIUM | ELITE
  quantity?: number;
}

interface Document {
  id: number;
  fileName: string;
  fileType: string;
  uploadedAt: string;
  url: string;
  userServiceId?: number;
  userService?: UserService;
  order?: {
    id: number;
    items: {
      serviceName: string;
      planType: string;
      price: number;
    }[];
  };
}

interface DashboardStats {
  total: number;
  active: number;
  pending: number;
  completed: number;
}

interface SupportTicket {
  id: number;
  subject: string;
  message: string;
  status: 'OPEN' | 'RESOLVED' | 'CLOSED';
  adminReply?: string;
  createdAt: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  services: Service[];
}

export const Dashboard: React.FC = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Data State
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [userServices, setUserServices] = useState<UserService[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [stats, setStats] = useState<DashboardStats>({ total: 0, active: 0, pending: 0, completed: 0 });
  const [reports, setReports] = useState<any[]>([]);

  // UI State
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'documents' | 'reports' | 'calendar' | 'tickets' | 'billing' | 'va-portal' | 'renewals'>('dashboard');
  const [renewals, setRenewals] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [reportsSearchQuery, setReportsSearchQuery] = useState('');
  const [reportsCategoryFilter, setReportsCategoryFilter] = useState('all');
  const [servicesCategoryFilter, setServicesCategoryFilter] = useState('all');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Modals & Forms State
  const [selectedService, setSelectedService] = useState<Service | any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [viewingRoadmapService, setViewingRoadmapService] = useState<UserService | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadServiceId, setUploadServiceId] = useState<string>('');
  const [docFilter, setDocFilter] = useState<'all' | 'uploaded' | 'reports'>('all');
  const [uploadingOrderId, setUploadingOrderId] = useState<number | null>(null);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });
  const [error, setError] = useState<string | null>(null);

  // Calendar State
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Plan Selection State
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedServiceForPlan, setSelectedServiceForPlan] = useState<Service | null>(null);
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [servicePlanData, setServicePlanData] = useState<Record<number, any[]>>({});

  // Payment State
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<any>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('manual_qr');
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);


  const expandedServices = useMemo(() => {
    return userServices.flatMap(svc => {
      const qty = svc.quantity || 1;
      if (qty <= 1) return [svc];
      
      const copies = [];
      for (let i = 0; i < qty; i++) {
        copies.push({ 
          ...svc, 
          displayId: `${svc.id}-${i}`,
          // Optional: distinguish them visually if needed
          instanceNumber: i + 1
        });
      }
      return copies;
    });
  }, [userServices]);

  // Sync activeTab from URL query param (e.g. ?tab=billing)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab as any);
    }
  }, [location.search]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      if (location.pathname !== '/login') navigate('/login');
      return;
    }

    const hasState = location.state?.selectedServiceSlug || location.state?.selectedService;

    if (services.length > 0 && hasState) {
      if (location.state?.selectedServiceSlug) {
        handlePurchaseBySlug(location.state.selectedServiceSlug, location.state.selectedPlan);
        navigate(location.pathname, { replace: true, state: {} });
      } else if (location.state?.selectedService) {
        const initialService = services.find(s => s.name.includes(location.state.selectedService));
        if (initialService) {
          handlePurchaseService(initialService);
          navigate(location.pathname, { replace: true, state: {} });
        }
        setActiveTab('services');
      }
    }

    if (services.length === 0) {
      fetchData();
    }
  }, [user, authLoading, navigate, services, location.state]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  const getAuthHeader = (includeIdempotencyKey = false) => {
    const token = localStorage.getItem('token');
    const headers: any = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (includeIdempotencyKey) {
      headers['X-Idempotency-Key'] = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    return headers;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [servicesRes, userServicesRes, docsRes, statsRes, ticketsRes, methodsRes, reportsRes, renewalsRes] = await Promise.all([
        api.get('/services/categories'),
        api.get('/services/my-services'),
        api.get('/documents/my-documents'),
        api.get('/dashboard/user'),
        api.get('/tickets/my-tickets'),
        api.get('/payments/methods'),
        api.get('/documents/my-reports'),
        api.get('/renewals/my').catch(() => ({ data: { renewals: [] } })),
      ]);

      const categoriesData = servicesRes.data.categories || [];
      setCategories(categoriesData);
      const allServices: Service[] = [];
      if (Array.isArray(categoriesData)) {
        categoriesData.forEach((cat: any) => {
          if (cat.services && Array.isArray(cat.services)) {
            cat.services.forEach((svc: any) => {
              let displayPrice = 0;
              let defaultPlanId = undefined;
              if (svc.plans && svc.plans.length > 0) {
                displayPrice = svc.plans[0].price;
                defaultPlanId = svc.plans[0].id;
              } else if (svc.price !== undefined && svc.price !== null) {
                displayPrice = Number(svc.price);
              }
              allServices.push({
                id: svc.id,
                name: svc.name,
                description: svc.description,
                price: displayPrice,
                defaultPlanId: defaultPlanId
              });
            });
          }
        });
      }
      setServices(allServices);

      setUserServices(userServicesRes.data.userServices || userServicesRes.data || []);
      setDocuments(docsRes.data.documents || []);
      setStats(statsRes.data.stats || { total: 0, active: 0, pending: 0, completed: 0 });
      setTickets(ticketsRes.data.tickets || []);
      
      const methods = methodsRes.data;
      setAvailablePaymentMethods(methods);
      if (methods.razorpay) setSelectedPaymentMethod('razorpay');
      else if (methods.stripe) setSelectedPaymentMethod('stripe');

      setReports(reportsRes.data.reports || []);
      setRenewals(renewalsRes.data.renewals || []);

    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load dashboard data. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePurchaseService = (service: Service) => {
    setSelectedService(service);
    setPaymentProofFile(null);
    setSelectedPaymentMethod('manual_qr');
    setShowPaymentModal(true);
  };

  const handleViewRoadmap = (userService: UserService) => {
    setViewingRoadmapService(userService);
    setShowRoadmapModal(true);
  };

  /** Navigate to the dynamic form page for a NEED_DOCUMENTS order item */
  const handleFillForm = (svc: UserService) => {
    const itemId = svc.orderItemId;
    if (!itemId) { setActiveTab('documents'); return; }
    navigate(`/dashboard/order/${itemId}/form`);
  };

  const handlePurchaseBySlug = async (slug: string, selectedPlan?: any) => {
    setLoading(true);
    try {
      let body: any = { serviceSlug: slug, quantity: selectedPlan?.quantity || 1 };

      if (selectedPlan && selectedPlan.id && selectedPlan.serviceId) {
        body = {
          serviceId: selectedPlan.serviceId,
          planId: selectedPlan.id,
          price: selectedPlan.price,
          quantity: selectedPlan.quantity || 1
        };
      } else if (selectedPlan && selectedPlan.name) {
        try {
          const serviceRes = await api.get(`/services/slug/${slug}`);
          const serviceData = serviceRes.data;
          if (serviceData.service) {
            const matchingPlan = serviceData.service.plans.find((p: any) =>
              (p.planType && p.planType.toLowerCase() === selectedPlan.name.toLowerCase()) ||
              (p.name && p.name.toLowerCase() === selectedPlan.name.toLowerCase())
            );
            if (matchingPlan) {
              body = {
                serviceId: serviceData.service.id,
                planId: matchingPlan.id,
                price: matchingPlan.discountedPrice || matchingPlan.price,
                quantity: selectedPlan.quantity || 1
              };
            }
          }
        } catch (e) {
          console.warn("Failed to resolve plan ID from slug", e);
        }
      }

      await api.post('/services/select', body);

      await fetchData();
      setActiveTab('dashboard');
    } catch (err: any) {
      console.error('Auto-select error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to select service automatically');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (userServiceId: number) => {
    if (!window.confirm('Are you sure you want to remove this service?')) return;
    setLoading(true);
    try {
      await api.delete(`/services/my-services/${userServiceId}`);
      await fetchData();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || err.message || 'Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  const handleChoosePlan = (service: Service) => {
    setSelectedServiceForPlan(service);
    setShowPlanModal(true);
  };

  // Handler for ProfessionalSearchBar - converts any searchable service to Service
  const handleSelectServiceFromSearch = (service: any) => {
    handleChoosePlan(service as Service);
  };

  const handleSelectPlan = async (plan: any) => {
    if (!selectedServiceForPlan) return;
    setActionLoading(true);
    try {
      const headers = getAuthHeader();
      const response = await fetch(`${API_URL}/services/select`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          serviceId: selectedServiceForPlan.id,
          planId: plan.id,
          planType: plan.planType
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to select plan');
      }
      
      const data = await response.json();
      
      setShowPlanModal(false);
      setActiveTab('dashboard');
      await fetchData();
      
      if (data.message) {
        alert(data.message);
      } else {
        alert(`${plan.planType} plan selected successfully! Please upload required documents.`);
      }
    } catch (error: any) {
      console.error('Plan selection error:', error);
      alert(error.message || 'Failed to select plan');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedService) return;
    setActionLoading(true);

    try {
      let orderId = (selectedService as any).orderId;
      if (!orderId) {
        const orderRes = await fetch(`${API_URL}/payments/create-order`, {
          method: 'POST',
          headers: getAuthHeader(true),
          body: JSON.stringify({
            serviceId: selectedService.id,
            amount: selectedService.price,
            provider: 'manual'
          }),
          credentials: 'include'
        });
        if (!orderRes.ok) throw new Error("Failed to init order");
        const orderData = await orderRes.json();
        orderId = orderData.id_db || orderData.id;
      }

      const formData = new FormData();
      if (!orderId) throw new Error("Order ID missing. Please refresh and try again.");
      formData.append('orderId', orderId);
      formData.append('method', selectedPaymentMethod === 'manual_qr' ? 'MANUAL_QR' : 'PAY_LATER');
      if (paymentProofFile) {
        formData.append('file', paymentProofFile);
      }

      const res = await fetch(`${API_URL}/payments/manual-payment`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!res.ok) {
        let errData;
        try { errData = await res.json(); } catch (e) { }
        throw new Error(errData?.error || 'Failed to submit detailed payment');
      }

      alert(selectedPaymentMethod === 'pay_later' ? 'Order placed! You can pay later.' : 'Payment proof submitted for verification!');
      setShowPaymentModal(false);
      await fetchData();
    } catch (err: any) {
      console.error(err);
      alert(`Payment Error: ${err.message || 'Payment process failed'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, userServiceId: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit');
      return;
    }

    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('orderId', userServiceId.toString());

      const response = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Upload failed');
      }

      alert('Document uploaded successfully!');
      fetchData();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to upload document');
    } finally {
      setUploadingFile(false);
    }
  };

  /* Upload a document for a specific order (used by the Document Vault UI) */
  const handleFileUploadForOrder = async (
    event: React.ChangeEvent<HTMLInputElement>,
    orderId: number,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10 MB limit');
      return;
    }
    setUploadingOrderId(orderId);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('orderId', orderId.toString());
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error((err as any).error || 'Upload failed');
      }
      alert('Document uploaded successfully!');
      fetchData();
    } catch (err: any) {
      alert(err.message || 'Failed to upload document');
    } finally {
      setUploadingOrderId(null);
      event.target.value = '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'COMPLETED': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'PENDING_PAYMENT': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'PENDING_VERIFICATION': return 'bg-violet-50 text-violet-600 border-violet-100';
      case 'NEED_DOCUMENTS': return 'bg-[#ee7228]/10 text-[#ee7228] border-[#ee7228]/20';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'COMPLETED': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'PENDING_VERIFICATION': return <Clock className="w-3.5 h-3.5" />;
      case 'NEED_DOCUMENTS': return <Upload className="w-3.5 h-3.5" />;
      case 'PENDING_PAYMENT': return <AlertCircle className="w-3.5 h-3.5" />;
      case 'CANCELLED': return <XCircle className="w-3.5 h-3.5" />;
      default: return <Package className="w-3.5 h-3.5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Loading your dashboard</h2>
          <p className="text-gray-500 text-sm">Fetching your services and documents...</p>
        </div>
      </div>
    );
  }

  // Derived Data for Views — use admin-uploaded reports from /my-reports endpoint,
  // falling back to filename-based filter from general documents
  const getApiBaseUrl = () => {
    return (import.meta as any).env?.VITE_API_BASE_URL || '/api';
  };

  const reportDocuments = (reports.length > 0 ? reports : documents.filter(doc =>
    doc.fileType === 'REPORT' ||
    doc.fileName?.toLowerCase().includes('report') ||
    doc.fileName?.toLowerCase().includes('final')
  )).map((doc: any) => ({
    ...doc,
    // Normalise download URL — backend stores `filePath`, UI needs absolute URL
    // Normalise download URL — backend stores `filePath`, UI needs absolute proxy URL for R2/Decryption
    url: doc.url || (doc.filePath ? `${getApiBaseUrl()}/files/${doc.filePath.replace(/^\//, '')}` : '#')
  }));

  // ── Chart data for dashboard ──
  const serviceActivityData = (() => {
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const now = new Date();
    return months.map((month, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const spend = userServices
        .filter(s => {
          const created = new Date(s.createdAt);
          return created.getMonth() === d.getMonth() && created.getFullYear() === d.getFullYear();
        })
        .reduce((acc, s) => acc + (s.price || 0), 0);
      return { month, spend };
    });
  })();

  const statusDonutData = (() => {
    const total = userServices.length;
    if (total === 0) return [{ name: 'No Services', value: 1, color: '#E5E7EB', pct: 100 }];
    const groups = [
      { name: 'Active',    color: '#22C55E', statuses: ['ACTIVE'] },
      { name: 'In Progress', color: '#6366F1', statuses: ['PENDING_VERIFICATION'] },
      { name: 'Pending',   color: '#F59E0B', statuses: ['PENDING_PAYMENT', 'NEED_DOCUMENTS'] },
      { name: 'Completed', color: '#3B82F6', statuses: ['COMPLETED'] },
      { name: 'Cancelled', color: '#EF4444', statuses: ['CANCELLED'] },
    ];
    return groups
      .map(g => ({
        name: g.name,
        color: g.color,
        value: userServices.filter(s => g.statuses.includes(s.status)).length,
        pct: Math.round((userServices.filter(s => g.statuses.includes(s.status)).length / total) * 100),
      }))
      .filter(g => g.value > 0);
  })();

  // Bug fix: each sidebar instance gets its own layoutId suffix so framer-motion
  // doesn't try to animate the active pill across desktop ↔ mobile sidebars.
  const NavItem = ({
    id, label, icon: Icon, badge, badgeColor = 'indigo', collapsed = false, layoutSuffix = 'desktop'
  }: {
    id: typeof activeTab; label: string; icon: any; badge?: number;
    badgeColor?: 'indigo' | 'amber' | 'red' | 'green'; collapsed?: boolean; layoutSuffix?: string;
  }) => {
    const isActive = activeTab === id;
    const badgeCls: Record<string, string> = {
      indigo: 'bg-indigo-100 text-indigo-700',
      amber:  'bg-amber-100  text-amber-700',
      red:    'bg-red-100    text-red-600',
      green:  'bg-emerald-100 text-emerald-700',
    };
    return (
      <motion.button
        onClick={() => { setActiveTab(id); setMobileMenuOpen(false); }}
        title={collapsed ? label : undefined}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center relative group outline-none
          ${collapsed ? 'justify-center px-2 py-4 rounded-xl mb-3' : 'gap-3.5 px-4 py-3 rounded-xl mb-2.5'}`}
      >
        {/* Animated pill */}
        {isActive && (
          <motion.div
            layoutId={`nav-active-pill-${layoutSuffix}`}
            className="absolute inset-0 rounded-xl"
            style={{ background: '#EEF2FF', boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.15)' }}
            transition={{ type: 'spring', bounce: 0.22, duration: 0.38 }}
          />
        )}
        {/* Hover bg */}
        {!isActive && (
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ background: '#F8FAFC' }} />
        )}

        {/* Icon container */}
        <div className="relative z-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
          style={{ background: isActive ? '#E0E7FF' : 'transparent', width: collapsed ? 36 : 32, height: collapsed ? 36 : 32 }}
        >
          <Icon className={`w-[18px] h-[18px] transition-colors duration-150 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`}
          />
        </div>

        {!collapsed && (
          <>
            <span className={`flex-1 text-[14.5px] text-left relative z-10 tracking-[-0.01em] transition-colors duration-150
              ${isActive ? 'font-semibold text-indigo-700' : 'font-medium text-gray-600 group-hover:text-gray-900'}`}>
              {label}
            </span>
            {badge !== undefined && badge > 0 && (
              <span className={`relative z-10 text-[11px] px-2 py-[3px] rounded-full font-bold min-w-[22px] text-center leading-none ${badgeCls[badgeColor]}`}>
                {badge}
              </span>
            )}
          </>
        )}

        {collapsed && badge !== undefined && badge > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full z-10 ring-2 ring-white" />
        )}
      </motion.button>
    );
  };

  // Bug fix: correct display name for header title bar
  const TAB_LABELS: Record<string, string> = {
    dashboard:  'Dashboard',
    billing:    'Billing & Services',
    calendar:   'Compliance',
    services:   'Browse Services',
    documents:  'Documents',
    reports:    'Reports',
    renewals:   'Renewals',
    'va-portal':'Virtual Assistance',
    tickets:    'Support Tickets',
  };

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#F8FAFC' }}>
      {/* Sidebar - Desktop (Collapsible) */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 72 : 288 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col shrink-0 h-screen overflow-hidden bg-white"
        style={{ minWidth: sidebarCollapsed ? 72 : 288, borderRight: '1px solid #EAECF0' }}
      >
        {/* ── Logo + Collapse ── */}
        <div className="px-5 pt-7 pb-6 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div className="flex items-center gap-3.5 overflow-hidden min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}
            >
              <Shield className="w-[22px] h-[22px] text-white" />
            </div>
            <AnimatePresence initial={false}>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden whitespace-nowrap min-w-0"
                >
                  <p className="text-[16px] font-bold text-gray-900 leading-tight tracking-[-0.02em]">CA Portal</p>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase leading-tight mt-0.5 text-indigo-600">Growth Platform</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="p-2 rounded-lg shrink-0 transition-colors"
            style={{ color: '#94A3B8' }}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto overflow-x-hidden">

          {/* Group: Main */}
          <NavItem id="dashboard"  label="Dashboard"          icon={LayoutDashboard} collapsed={sidebarCollapsed} />
          <NavItem id="billing"    label="Billing & Services"  icon={CreditCard}      collapsed={sidebarCollapsed} badgeColor="red"
            badge={userServices.filter(s => s.status === 'PENDING_PAYMENT').length || undefined} />
          <NavItem id="calendar"   label="Metting"          icon={CalendarIcon}    collapsed={sidebarCollapsed} badgeColor="amber" />

          {/* Group: Resources */}
          <div className="my-5 mx-2 border-b border-gray-100" />
          <NavItem id="services"   label="Browse Services"     icon={Package}         collapsed={sidebarCollapsed} />
          <NavItem id="documents"  label="Documents"            icon={FileText}        collapsed={sidebarCollapsed} />
          <NavItem id="reports"    label="Reports"              icon={FileBarChart}    collapsed={sidebarCollapsed} />

          {/* Group: Support */}
          <div className="my-5 mx-2 border-b border-gray-100" />
          <NavItem id="renewals"   label="Renewals"             icon={TrendingUp}      collapsed={sidebarCollapsed} badgeColor="amber"
            badge={renewals.filter(r => r.status === 'EXPIRING_SOON' || r.status === 'EXPIRED').length || undefined} />
          <NavItem id="va-portal"  label="Virtual Assistance"   icon={Zap}             collapsed={sidebarCollapsed} />
          <NavItem id="tickets"    label="Support Tickets"       icon={MessageSquare}   collapsed={sidebarCollapsed} badgeColor="red"
            badge={tickets.filter(t => t.status === 'OPEN').length || undefined} />
          <div className="h-6" />
        </nav>

        {/* ── User section ── */}
        <div className={`shrink-0 border-t border-gray-100 ${sidebarCollapsed ? 'p-3 flex flex-col items-center gap-3' : 'p-5'}`}>
          {sidebarCollapsed ? (
            <>
              <motion.button
                onClick={() => navigate(`/dashboard/users/profile/${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'user'}`)}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                title={user?.name}
                className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', boxShadow: '0 2px 10px rgba(99,102,241,0.38)' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </motion.button>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
                title="Sign out"
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <div className="flex items-center gap-3.5 px-3.5 py-3.5 rounded-xl bg-gray-50 hover:bg-indigo-50/60 border border-gray-100 hover:border-indigo-100 transition-all cursor-pointer group"
              onClick={() => navigate(`/dashboard/users/profile/${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'user'}`)}>
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-[15px] shrink-0 select-none"
                style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', boxShadow: '0 3px 10px rgba(99,102,241,0.32)' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14.5px] font-semibold text-gray-900 truncate leading-snug">{user?.name}</p>
                <p className="text-[11.5px] font-medium truncate leading-snug text-indigo-400">My Account</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); handleLogout(); }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </motion.aside>



      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-[64px] px-6 flex items-center gap-4 shrink-0 sticky top-0 z-40">
          {/* Mobile menu */}
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors shrink-0">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Central Search Bar - Professional SaaS Design */}
          <div className="flex-1 max-w-xXl">
            <ProfessionalSearchBar
              services={services.map(s => ({
                ...s,
                categoryName: categories.find(c => (c.services || []).some(cs => cs.id === s.id))?.name
              }))}
              onSelectService={handleSelectServiceFromSearch}
              placeholder="Search clients, tasks, documents…"
              compact={true}
              showKbShortcut={true}
            />
            
          </div>

          {/* Right: Bell + FY + User */}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            {/* Notifications Bell */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              {tickets.filter(t => t.status === 'OPEN').length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Fiscal Year Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-[12px] font-semibold text-gray-600">
                FY {new Date().getFullYear()}-{String(new Date().getFullYear() + 1).slice(-2)}
              </span>
            </div>

            {/* User Menu - Professional SaaS Design */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200 group"
              >
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-sm ring-2 ring-white group-hover:ring-gray-100 transition-all">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 leading-tight">{user?.name?.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500 leading-tight">CA Professional</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />

                    {/* Dropdown Menu - Desktop */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200/50 z-50 overflow-hidden hidden sm:block"
                    >
                      {/* User Info Header */}
                      <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-base shadow-sm">
                              {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold text-gray-900 truncate">{user?.name}</p>
                            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              <span className="text-xs text-gray-600 font-medium">Active</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          onClick={() => { navigate(`/dashboard/users/profile/${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'user'}`); setShowProfileMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="font-medium">My Profile</span>
                            <p className="text-xs text-gray-500">View and edit your profile</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                        </button>

                        <button
                          onClick={() => { setActiveTab('tickets'); setShowProfileMenu(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                            <Settings className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="font-medium">Settings</span>
                            <p className="text-xs text-gray-500">Account preferences</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-100 mx-4"></div>

                      {/* Sign Out */}
                      <div className="py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors group"
                        >
                          <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <span className="font-medium">Sign out</span>
                            <p className="text-xs text-red-500">End your session</p>
                          </div>
                        </button>
                      </div>
                    </motion.div>

                    {/* Mobile Menu - Full Screen Overlay */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm sm:hidden"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Mobile Header */}
                        <div className="px-6 py-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Account</h3>
                            <button
                              onClick={() => setShowProfileMenu(false)}
                              className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Mobile User Info */}
                        <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-white">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-semibold text-xl shadow-sm">
                                {user?.name?.charAt(0) || 'U'}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-3 border-white rounded-full"></div>
                            </div>
                            <div className="flex-1">
                              <p className="text-xl font-semibold text-gray-900">{user?.name}</p>
                              <p className="text-base text-gray-500">{user?.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
                                <span className="text-sm text-gray-600 font-medium">Active Professional</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Menu Items */}
                        <div className="px-6 py-4 space-y-1">
                          <button
                            onClick={() => { navigate(`/dashboard/users/profile/${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'user'}`); setShowProfileMenu(false); }}
                            className="w-full flex items-center gap-4 p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                              <User className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <span className="text-base font-medium">My Profile</span>
                              <p className="text-sm text-gray-500">View and edit your profile</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                          </button>

                          <button
                            onClick={() => { setActiveTab('tickets'); setShowProfileMenu(false); }}
                            className="w-full flex items-center gap-4 p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                              <Settings className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <span className="text-base font-medium">Settings</span>
                              <p className="text-sm text-gray-500">Account preferences</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                          </button>
                        </div>

                        {/* Mobile Sign Out */}
                        <div className="px-6 py-4 border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 p-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                              <LogOut className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <span className="text-base font-medium">Sign out</span>
                              <p className="text-sm text-red-500">End your session</p>
                            </div>
                          </button>
                        </div>

                        {/* Safe Area Spacer */}
                        <div className="h-6"></div>
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto" style={{ background: '#F8FAFC' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 py-8 md:px-10 md:py-10"
            >
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">Failed to load data</p>
                  <p className="text-xs text-red-500 mt-0.5">{error}</p>
                </div>
                <button onClick={fetchData} className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors shrink-0">Retry</button>
              </div>
            )}

            {/* DASHBOARD VIEW CONTENT */}

            {/* VIRTUAL ASSISTANCE PORTAL VIEW */}
            {activeTab === 'va-portal' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
                {/* VA Hero Section */}
                <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0b1f3a] to-[#136da1] p-10 md:p-16 text-black shadow-2xl">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -mr-40 -mt-40 blur-[120px]"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full -ml-20 -mb-20 blur-[100px]"></div>

                  <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="max-w-2xl text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-blue-100 mb-6">
                        <Zap className="w-3 h-3 text-orange-400" /> Executive Business Suite
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Virtual Assistance <span className="text-orange-400">Portal</span></h2>
                      <p className="text-blue-100/70 font-medium leading-relaxed">
                        Your all-in-one business growth command center. Manage your clients, build your digital presence, track leads, and connect with your dedicated assistant from a single encrypted node.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Lead Conversion</p>
                        <p className="text-2xl font-black text-black">84%</p>
                      </div>
                      <div className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Site Health</p>
                        <p className="text-2xl font-black text-emerald-400">99.9%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Left Column - CRM & Website Builder */}
                  <div className="lg:col-span-8 space-y-10">

                    {/* CRM Module */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm overflow-hidden relative">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center">
                            <User className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-[#0b1f3a] tracking-tight">Client Relationship Management</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client & Deal Tracking</p>
                          </div>
                        </div>
                        <button className="px-5 py-2.5 bg-gray-50 text-[#0b1f3a] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">Configure CRM</button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                          { label: 'Active Clients', count: '24', trend: '+3 this month' },
                          { label: 'Pending Deals', count: '₹4.2L', trend: '5 high value' },
                          { label: 'Avg. Retention', count: '14 mo', trend: 'Upper Quartile' }
                        ].map((stat, i) => (
                          <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                            <h4 className="text-2xl font-black text-[#0b1f3a]">{stat.count}</h4>
                            <p className="text-[9px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">{stat.trend}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Recent Client Interactions</p>
                        {[
                          { name: 'Quantum Logistics', status: 'Quote Sent', time: '2h ago' },
                          { name: 'Skyline Architects', status: 'Contract Signed', time: '5h ago' },
                          { name: 'E-Commerce Solutions', status: 'Follow-up Needed', time: 'Yesterday' }
                        ].map((client, i) => (
                          <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-gray-100">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:text-primary transition-colors">
                                {client.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-black text-[#0b1f3a]">{client.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{client.status}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-black text-gray-300 group-hover:text-gray-400">{client.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Website Builder Module */}
                    <div className="bg-[#0b1f3a] rounded-[2.5rem] p-10 text-black shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-primary/20 transition-colors"></div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                        <div className="flex-1">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-xl">
                            <TrendingUp className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-black text-black tracking-tight mb-2">Pro Website Builder</h3>
                          <p className="text-blue-100/60 font-medium text-sm leading-relaxed max-w-sm">
                            Manage your professional digital identity. Deploy updates, edit content, and track performance from one dashboard.
                          </p>
                        </div>

                        <div className="w-full md:w-auto space-y-4">
                          <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 min-w-[240px]">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Current Template</span>
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[8px] font-black uppercase tracking-widest">Live</span>
                            </div>
                            <p className="text-lg font-black text-black">Elite Corporate V4</p>
                            <div className="mt-6 flex gap-2">
                              <button className="flex-1 py-3 bg-primary text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Edit Site</button>
                              <button className="w-12 h-12 bg-white/10 text-black rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                                <Eye className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Lead Management & Admin Support */}
                  <div className="lg:col-span-4 space-y-10">

                    {/* Lead Management Module */}
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-[#ee7228]/10 text-[#ee7228] rounded-xl flex items-center justify-center">
                          <Plus className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-black text-[#0b1f3a] tracking-tight">Lead Tracker</h3>
                      </div>

                      <div className="space-y-6">
                        {[
                          { name: 'Arjun Mehra', email: 'arjun@tech.in', service: 'Company Inc.', score: 92 },
                          { name: 'Priya Sharma', email: 'priya.s@corp.com', service: 'Tax Audit', score: 78 },
                          { name: 'Karan Singh', email: 'karan@ind.co', service: 'GST Filing', score: 65 }
                        ].map((lead, i) => (
                          <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all relative group">
                            <div className="absolute top-4 right-4 text-[18px] font-black text-orange-500/10 group-hover:text-orange-500/20 transition-colors">#{lead.score}</div>
                            <p className="text-sm font-black text-[#0b1f3a] mb-1">{lead.name}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{lead.email}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <span className="text-[9px] font-black text-[#ee7228] uppercase tracking-[0.2em]">{lead.service}</span>
                              <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0b1f3a] transition-colors border border-gray-100 shadow-sm">
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="w-full mt-8 py-4 bg-[#0b1f3a] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ee7228] transition-all shadow-lg shadow-blue-900/10">View Full Pipeline</button>
                    </div>

                    {/* Dedicated Admin Support */}
                    <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-emerald-100 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-emerald-500" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-emerald-900 tracking-tight">Dedicated Support</h3>
                            <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Virtual Assistant Online</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-8 p-3 bg-white rounded-2xl border border-emerald-100">
                          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-black font-black text-sm shadow-lg shadow-emerald-500/20">
                            AM
                          </div>
                          <div>
                            <p className="text-xs font-black text-emerald-900 leading-none mb-1">Anjali Mishra</p>
                            <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Senior Associate Assistant</p>
                          </div>
                          <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[8px] font-black text-emerald-600 uppercase">Live</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <button className="w-full py-4 bg-[#0b1f3a] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#ee7228] transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3">
                            <MessageSquare className="w-4 h-4" /> Start Quick Chat
                          </button>
                          <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all border border-emerald-200">
                            Schedule Briefing
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Additional Services Hub */}
                <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                      <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[9px] font-black uppercase tracking-widest text-[#136da1] mb-6">
                          Explore Ecosystem
                        </div>
                        <h3 className="text-3xl font-black text-[#0b1f3a] tracking-tight mb-4">Extend Your <span className="text-primary">Ecosystem</span></h3>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed">
                          Deploy additional high-intelligence modules to your workspace. From specialized audits to legal advisory, access our full range of expert services.
                        </p>
                      </div>
                      <button onClick={() => setActiveTab('services')} className="px-10 py-4 bg-[#0b1f3a] text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10 hover:bg-primary transition-all flex items-center gap-3">
                        Service Directory <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: 'Legal Advisory', desc: 'Expert legal counsel for business operations.', icon: ShieldCheck, color: 'text-emerald-500' },
                        { title: 'Strategic Audit', desc: 'Comprehensive financial health assessments.', icon: FileBarChart, color: 'text-primary' },
                        { title: 'Trademark Registry', desc: 'Secure your brand assets globally.', icon: Shield, color: 'text-orange-500' },
                        { title: 'Wealth Management', desc: 'Personal & corporate investment planning.', icon: DollarSign, color: 'text-violet-500' }
                      ].map((svc, i) => (
                        <div key={i} className="group p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:border-primary hover:bg-white transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl">
                          <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm group-hover:scale-110 group-hover:bg-[#0b1f3a] transition-all duration-500`}>
                            <svc.icon className={`w-6 h-6 ${svc.color} group-hover:text-primary transition-colors`} />
                          </div>
                          <h4 className="text-base font-black text-[#0b1f3a] mb-2 tracking-tight group-hover:text-primary transition-colors">{svc.title}</h4>
                          <p className="text-[11px] text-gray-400 font-bold leading-relaxed">{svc.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="space-y-6 pb-10">

                {/* ── WELCOME HEADER ── */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className=""
                >
                  <h1 className="text-[58px] font-bold text-gray-900 tracking-tight">
                    {new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening'}, {user?.name?.split(' ')[0]}
                  </h1>
                  <p className="text-m text-gray-500 mt-1.5">Here's what's happening across your CA services today.</p>
                </motion.div>

                {/* ── ACTION REQUIRED ── */}
                <AnimatePresence>
                  {userServices.filter(s => s.status === 'NEED_DOCUMENTS' || s.status === 'PENDING_PAYMENT').length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white rounded-xl border border-amber-200 overflow-hidden shadow-sm">
                        {/* Banner header */}
                        <div className="flex items-center gap-3 px-6 py-4" style={{ background: '#FFFBEB', borderBottom: '1px solid #FEF3C7' }}>
                          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-amber-500">
                            <AlertCircle className="w-4 h-4 text-blue" />
                          </div>
                          <p className="text-[14px] font-bold flex-1 text-amber-900">
                            {userServices.filter(s => s.status === 'NEED_DOCUMENTS' || s.status === 'PENDING_PAYMENT').length} action{userServices.filter(s => s.status === 'NEED_DOCUMENTS' || s.status === 'PENDING_PAYMENT').length > 1 ? 's' : ''} required
                          </p>
                          <button onClick={() => setActiveTab('billing')} className="text-[13px] font-semibold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {/* Action rows */}
                        <div className="divide-y divide-gray-50">
                          {userServices.filter(s => s.status === 'NEED_DOCUMENTS' || s.status === 'PENDING_PAYMENT').slice(0, 3).map((svc) => {
                            const isDoc = svc.status === 'NEED_DOCUMENTS';
                            return (
                              <div key={svc.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors">
                                {/* Type icon */}
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 flex-none" style={{ background: isDoc ? '#EEF2FF' : '#FEF3C7' }}>
                                  {isDoc
                                    ? <Upload className="w-4 h-4 text-indigo-600" />
                                    : <CreditCard className="w-4 h-4 text-amber-600" />
                                  }
                                </div>
                                {/* Service info */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[14px] font-semibold text-gray-900 truncate leading-snug">{svc.service?.name}</p>
                                  <p className="text-[12px] font-medium mt-0.5" style={{ color: isDoc ? '#6366F1' : '#D97706' }}>
                                    {isDoc ? 'Documents required' : 'Payment pending'}
                                  </p>
                                </div>
                                {/* Price */}
                                <span className="text-[14px] font-bold text-gray-900 tabular-nums shrink-0 hidden sm:block">
                                  ₹{Number(svc.price || 0).toLocaleString('en-IN')}
                                </span>
                                {/* CTA button */}
                                {isDoc ? (
                                  <button
                                    onClick={() => handleFillForm(svc)}
                                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white rounded-lg active:scale-95 transition-all shrink-0"
                                    style={{ background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}
                                  >
                                    <Upload className="w-3.5 h-3.5" /> Fill Form
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => { setSelectedService({ ...svc.service, orderId: svc.orderId, price: svc.price }); setPaymentProofFile(null); setSelectedPaymentMethod('manual_qr'); setShowPaymentModal(true); }}
                                    className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white rounded-lg active:scale-95 transition-all shrink-0"
                                    style={{ background: '#F59E0B', boxShadow: '0 2px 8px rgba(245,158,11,0.3)' }}
                                  >
                                    <CreditCard className="w-3.5 h-3.5" /> Pay Now
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── KPI STAT CARDS ── */}
                {(() => {
                  const needAttentionCount = userServices.filter(s => s.status === 'NEED_DOCUMENTS' || s.status === 'PENDING_PAYMENT').length;
                  const kpiCards = [
                    {
                      label: 'TOTAL SERVICES',
                      value: userServices.length,
                      icon: Package,
                      iconBg: '#EEF2FF', iconColor: '#6366F1', accentColor: '#6366F1',
                      trend: userServices.length > 0 ? `${userServices.length} purchased` : 'No services yet',
                      trendUp: true,
                      onClick: () => setActiveTab('billing'),
                    },
                    {
                      label: 'ACTIVE',
                      value: stats?.active ?? 0,
                      icon: CheckCircle,
                      iconBg: '#F0FDF4', iconColor: '#22C55E', accentColor: '#22C55E',
                      trend: 'Currently running',
                      trendUp: true,
                      onClick: () => setActiveTab('billing'),
                    },
                    {
                      label: 'NEED ATTENTION',
                      value: needAttentionCount,
                      icon: AlertCircle,
                      iconBg: needAttentionCount > 0 ? '#FFFBEB' : '#F0FDF4',
                      iconColor: needAttentionCount > 0 ? '#F59E0B' : '#22C55E',
                      accentColor: needAttentionCount > 0 ? '#F59E0B' : '#22C55E',
                      trend: needAttentionCount > 0 ? `${needAttentionCount} action${needAttentionCount > 1 ? 's' : ''} required` : 'All clear!',
                      trendUp: needAttentionCount === 0,
                      onClick: () => setActiveTab('documents'),
                    },
                    {
                      label: 'REPORTS',
                      value: reportDocuments.length,
                      icon: FileBarChart,
                      iconBg: '#EFF6FF', iconColor: '#3B82F6', accentColor: '#3B82F6',
                      trend: reportDocuments.length > 0 ? 'Ready to view' : 'No reports yet',
                      trendUp: true,
                      onClick: () => setActiveTab('reports'),
                    },
                  ];
                  return (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {kpiCards.map((card, i) => (
                        <motion.button
                          key={i}
                          onClick={card.onClick}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-white rounded-xl border border-gray-200 text-center w-full group relative overflow-hidden flex flex-col"
                          style={{ transition: 'box-shadow 0.2s ease, transform 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                          onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)')}
                          onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)')}
                        >
                          {/* Colored top accent bar */}
                          <div className="h-[3px] w-full shrink-0" style={{ background: card.accentColor, opacity: 0.7 }} />

                          <div className="px-5 pt-4 pb-4 flex flex-col flex-1 items-center">
                            {/* Label row with icon - centered */}
                            <div className="flex flex-col items-center gap-2 mb-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: card.iconBg }}>
                                <card.icon style={{ color: card.iconColor, width: 18, height: 18 }} />
                              </div>
                              <p className="text-[10.5px] font-bold text-gray-400 tracking-[0.1em] uppercase leading-tight">{card.label}</p>
                            </div>

                            {/* Number - centered */}
                            <p
                              className="text-[34px] font-bold leading-none tabular-nums mb-3"
                              style={{ color: card.label === 'NEED ATTENTION' && needAttentionCount > 0 ? card.accentColor : '#111827' }}
                            >
                              {card.value}
                            </p>

                            {/* Separator */}
                            <div className="border-t border-gray-100 mb-2.5 w-full" />

                            {/* Trend row - centered */}
                            <div className="flex flex-col items-center gap-1">
                              {card.trendUp
                                ? <TrendingUp className="w-3 h-3 shrink-0" style={{ color: card.accentColor }} />
                                : <AlertCircle className="w-3 h-3 shrink-0" style={{ color: card.accentColor }} />
                              }
                              <span className="text-[11.5px] font-semibold leading-snug text-center" style={{ color: card.accentColor }}>
                                {card.trend}
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  );
                })()}

                {/* ── CHARTS ROW ── */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  {/* Revenue Trend Chart */}
                  <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-7 h-full shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-[17px] font-bold text-gray-900 mb-1">Revenue Trend</h3>
                        <p className="text-[13px] text-gray-500 font-medium">Monthly spend (in ₹)</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span className="text-[11px] text-gray-600 font-medium">Service Revenue</span>
                        </div>
                      </div>
                      <div className="flex gap-1 bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button className="px-4 py-2 text-[12px] font-semibold rounded-md bg-white text-gray-900 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">6M</button>
                        <button className="px-4 py-2 text-[12px] font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">1Y</button>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                      <AreaChart data={serviceActivityData} margin={{ top: 8, right: 12, left: -8, bottom: 8 }}>
                        <defs>
                          <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.2} />
                            <stop offset="50%" stopColor="#6366F1" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02} />
                          </linearGradient>
                          <linearGradient id="colorSpendStroke" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="2 4" stroke="#F3F4F6" vertical={false} strokeWidth={1} />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }}
                          axisLine={false}
                          tickLine={false}
                          dy={8}
                          interval={0}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }}
                          axisLine={false}
                          tickLine={false}
                          allowDecimals={false}
                          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: '1px solid #E5E7EB',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            fontSize: 13,
                            padding: '12px 16px',
                            backgroundColor: 'white'
                          }}
                          labelStyle={{ fontWeight: 600, color: '#111827', marginBottom: 6, fontSize: 14 }}
                          formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Monthly Spend']}
                          cursor={{ stroke: '#6366F1', strokeWidth: 2, strokeDasharray: '4 4' }}
                          labelFormatter={(label) => `${label} 2024`}
                        />
                        <Area
                          type="monotone"
                          dataKey="spend"
                          stroke="url(#colorSpendStroke)"
                          strokeWidth={3}
                          fill="url(#colorSpend)"
                          dot={false}
                          activeDot={{
                            r: 6,
                            fill: '#6366F1',
                            stroke: '#fff',
                            strokeWidth: 3,
                            // Recharts activeDot uses SVG circle props; SVG does not support CSS box-shadow directly.
                            // Use a slightly larger outer circle for a glow effect via a custom formatter component if needed.
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Filing Status Donut */}
                  <div className="bg-white rounded-xl border border-gray-200 p-7 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="mb-6">
                      <h3 className="text-[17px] font-bold text-gray-900 mb-1">Filing Status</h3>
                      <p className="text-[13px] text-gray-500 font-medium">Current distribution</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-[11px] text-gray-600 font-medium">Service Tasks</span>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center flex-1" style={{ minHeight: 200 }}>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={statusDonutData}
                            cx="50%" cy="50%"
                            innerRadius={60} outerRadius={85}
                            dataKey="value"
                            paddingAngle={statusDonutData.length > 1 ? 4 : 0}
                            startAngle={90} endAngle={-270}
                            strokeWidth={0}
                          >
                            {statusDonutData.map((entry, index) => (
                              <Cell key={index} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-[32px] font-bold text-gray-900 leading-none tabular-nums mb-1">{userServices.length}</p>
                        <p className="text-[12px] text-gray-500 font-semibold uppercase tracking-wider">Total</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">Services</p>
                      </div>
                    </div>
                    <div className="space-y-3 mt-6 border-t border-gray-100 pt-5">
                      {statusDonutData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ background: item.color }} />
                            <span className="text-[13px] text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-gray-900 tabular-nums">{item.value}</span>
                            <span className="text-[11px] text-gray-500 font-medium">({item.pct}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* ── RECENT SERVICES TABLE ── */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Card header */}
                  <div className="flex items-center bg-[#fffbbb] justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                      <h3 className="text-[16px] font-bold text-indigo-600">Recent Services</h3>
                      <p className="text-[13px] mt-0.5 text-gray-500">Your latest CA engagements</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('billing')}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500 hover:text-indigo-600 group transition-colors"
                    >
                      View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {expandedServices.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left" style={{ minWidth: 600 }}>
                        <thead>
                          <tr className="bg-gray-50/80 border-b border-gray-100">
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">Service</th>
                            <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">Status</th>
                            <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400 text-right">Price</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expandedServices.slice(0, 6).map((svc, idx) => {
                            const isPendingPay  = svc.status === 'PENDING_PAYMENT';
                            const isNeedDocs    = svc.status === 'NEED_DOCUMENTS';

                            type SMap = { bg: string; text: string; dot: string; label: string };
                            const statusMap: Record<string, SMap> = {
                              ACTIVE:               { bg: '#F0FDF4', text: '#16A34A', dot: '#22C55E', label: 'Active'        },
                              COMPLETED:            { bg: '#EFF6FF', text: '#2563EB', dot: '#3B82F6', label: 'Completed'     },
                              PENDING_PAYMENT:      { bg: '#FFFBEB', text: '#B45309', dot: '#F59E0B', label: 'Pay Required'  },
                              NEED_DOCUMENTS:       { bg: '#EEF2FF', text: '#4338CA', dot: '#6366F1', label: 'Docs Required' },
                              PENDING_VERIFICATION: { bg: '#EEF2FF', text: '#4F46E5', dot: '#6366F1', label: 'Under Review'  },
                              CANCELLED:            { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444', label: 'Cancelled'     },
                            };
                            const sm: SMap = statusMap[svc.status] ?? { bg: '#F9FAFB', text: '#6B7280', dot: '#9CA3AF', label: svc.status.replace(/_/g, ' ') };

                            /* icon background matches status urgency */
                            const iconBg    = isPendingPay ? '#FEF3C7' : isNeedDocs ? '#EEF2FF' : '#F3F4F6';
                            const iconColor = isPendingPay ? '#D97706'  : isNeedDocs ? '#6366F1' : '#9CA3AF';

                            return (
                              <motion.tr
                                key={(svc as any).displayId || svc.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 + idx * 0.04 }}
                                className="border-b border-gray-50 transition-colors duration-100 hover:bg-gray-50/70 group"
                              >
                                {/* ── SERVICE ── */}
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div
                                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-150"
                                      style={{ background: iconBg }}
                                    >
                                      <Package className="w-4 h-4" style={{ color: iconColor }} />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[13.5px] font-semibold text-gray-900 leading-snug truncate" style={{ maxWidth: 220 }}>
                                        {svc.service?.name}
                                        {(svc as any).instanceNumber && (
                                          <span className="text-[11.5px] ml-1.5 font-normal text-gray-400">#{(svc as any).instanceNumber}</span>
                                        )}
                                      </p>
                                      {svc.planName && (
                                        <p className="text-[12px] text-gray-400 mt-0.5 truncate">{svc.planName}</p>
                                      )}
                                    </div>
                                  </div>
                                </td>

                                {/* ── STATUS pill ── */}
                                <td className="px-4 py-4">
                                  <span
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold whitespace-nowrap"
                                    style={{ background: sm.bg, color: sm.text }}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: sm.dot }} />
                                    {sm.label}
                                  </span>
                                </td>

                                {/* ── PRICE ── */}
                                <td className="px-4 py-4 text-right">
                                  <span className="text-[14px] font-bold text-gray-900 tabular-nums">
                                    ₹{Number(svc.price || 0).toLocaleString('en-IN')}
                                  </span>
                                </td>

                                {/* ── ACTION ── */}
                                <td className="px-6 py-4">
                                  <div className="flex items-center justify-end gap-2">
                                    {/* Pay Now — amber, consistent with Action Required */}
                                    {isPendingPay && (
                                      <button
                                        onClick={() => { setSelectedService({ ...svc.service, orderId: svc.orderId, price: svc.price }); setPaymentProofFile(null); setSelectedPaymentMethod('manual_qr'); setShowPaymentModal(true); }}
                                        className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white rounded-lg active:scale-95 transition-all shrink-0"
                                        style={{ background: '#F59E0B', boxShadow: '0 2px 8px rgba(245,158,11,0.3)' }}
                                      >
                                        <CreditCard className="w-3.5 h-3.5" /> Pay Now
                                      </button>
                                    )}

                                    {/* Fill Form / Upload Docs */}
                                    {isNeedDocs && (
                                      <button
                                        onClick={() => handleFillForm(svc)}
                                        className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white rounded-lg active:scale-95 transition-all shrink-0"
                                        style={{ background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}
                                      >
                                        <Upload className="w-3.5 h-3.5" /> Fill Form
                                      </button>
                                    )}

                                    {/* divider when CTA present */}
                                    {(isPendingPay || isNeedDocs) && (
                                      <div className="w-px h-5 bg-gray-200 shrink-0" />
                                    )}

                                    {/* View Progress icon */}
                                    <button
                                      onClick={() => handleViewRoadmap(svc)}
                                      className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
                                      title="View Progress"
                                    >
                                      <Map className="w-4 h-4" />
                                    </button>

                                    {/* Delete icon */}
                                    <button
                                      onClick={() => handleDeleteService(svc.id)}
                                      className="p-1.5 rounded-lg transition-colors text-gray-400 hover:text-red-500 hover:bg-red-50"
                                      title="Remove"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                      <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-indigo-50">
                        <Package className="w-7 h-7 text-indigo-500" />
                      </div>
                      <h4 className="text-[15px] font-bold mb-1.5 text-gray-900">No services yet</h4>
                      <p className="text-[13px] mb-5 max-w-xs leading-relaxed text-gray-500">Browse professional CA services — GST filing, ITR, company registration and more.</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setActiveTab('services')} className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-[13px] font-bold active:scale-95 transition-all bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                          <Sparkles className="w-4 h-4" /> Browse Services
                        </button>
                        <button onClick={() => setActiveTab('tickets')} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">Talk to us</button>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* ── QUICK STATS ROW ── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {[
                    { label: 'Open Tickets',  value: tickets.filter(t => t.status === 'OPEN').length,           link: 'tickets'  as typeof activeTab, desc: 'awaiting response', icon: MessageSquare, color: '#6366F1', bg: '#EEF2FF' },
                    { label: 'Expiring Soon', value: renewals.filter(r => r.status === 'EXPIRING_SOON').length,  link: 'renewals' as typeof activeTab, desc: 'service renewals',  icon: TrendingUp,    color: '#F59E0B', bg: '#FFFBEB' },
                    { label: 'Completed',     value: stats?.completed ?? 0,                                      link: 'billing'  as typeof activeTab, desc: 'services finished', icon: CheckCircle,   color: '#22C55E', bg: '#F0FDF4' },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveTab(item.link)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3.5 text-left w-full group hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: item.bg }}>
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[22px] font-bold tabular-nums leading-none text-gray-900">{item.value}</p>
                        <p className="text-[12px] font-semibold mt-0.5 text-gray-700">{item.label}</p>
                        <p className="text-[11px] mt-0.5 text-gray-400">{item.desc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}


            {/* CALENDAR VIEW */}
            {activeTab === 'calendar' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col items-center justify-center">
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-4"
                    modifiersClassNames={{
                      selected: 'bg-primary text-black hover:bg-primary',
                      today: 'text-primary font-bold'
                    }}
                  />
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Upcoming Deadlines
                    </h3>
                    <div className="space-y-4">
                      {/* Mock Data - In real app, derived from UserServices logic */}
                      <div className="flex gap-4 items-start p-3 bg-red-50 rounded-xl border border-red-100">
                        <div className="text-center min-w-[3rem]">
                          <span className="block text-xs font-bold text-red-600 uppercase">Feb</span>
                          <span className="block text-xl font-bold text-red-800">28</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">GST Return Filing</h4>
                          <p className="text-xs text-gray-500">Regular Monthly Filing</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="text-center min-w-[3rem]">
                          <span className="block text-xs font-bold text-blue-600 uppercase">Mar</span>
                          <span className="block text-xl font-bold text-blue-800">15</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Advance Tax Payment</h4>
                          <p className="text-xs text-gray-500">Q4 Installment</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-black">
                    <h3 className="font-bold text-black mb-2">Need a Reminder?</h3>
                    <p className="text-black/80 text-sm mb-4">We'll notify you about important compliance dates for your active services.</p>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-black rounded-lg text-sm font-semibold transition border border-white/30">
                      Sync with Google Calendar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── SERVICES MARKETPLACE ── */}
            {activeTab === 'services' && (() => {
              const allCategoryNames: string[] = categories.map((c: any) => c.name);
              const totalAll = categories.reduce((s: number, c: any) => s + (c.services?.length || 0), 0);

              const filteredCategories = categories
                .map((cat: any) => ({
                  ...cat,
                  services: (cat.services || []).filter((s: Service) => {
                    const q = globalSearchQuery.trim().toLowerCase();
                    if (!q) return true;
                    return s.name.toLowerCase().includes(q) || (s.description || '').toLowerCase().includes(q);
                  }),
                }))
                .filter((cat: any) =>
                  (servicesCategoryFilter === 'all' || cat.name === servicesCategoryFilter) && cat.services.length > 0
                );

              const totalFiltered = filteredCategories.reduce((s: number, c: any) => s + c.services.length, 0);

              const getTag = (svc: Service, idx: number) => {
                if (!svc.price || Number(svc.price) === 0) return { label: 'Custom', color: '#4F46E5', bg: '#EEF2FF' };
                if (idx === 0) return { label: 'Popular', color: '#92400E', bg: '#FEF3C7' };
                if (idx === 1) return { label: 'Fast', color: '#075985', bg: '#E0F2FE' };
                if (Number(svc.price) > 9999) return { label: 'Premium', color: '#6D28D9', bg: '#EDE9FE' };
                return null;
              };

              const featureMap: Record<string, string[]> = {
                tax:        ['Expert CA e-filing',    'Accuracy guaranteed',    '24–48 hr delivery'],
                gst:        ['GSTN compliant filing', 'Auto reconciliation',    'Dedicated CA support'],
                itr:        ['All ITR forms covered', 'Refund maximisation',    'Expert tax planning'],
                company:    ['End-to-end setup',      'MCA / ROC compliant',   'Digital docs handling'],
                business:   ['Fast incorporation',    'Govt-approved process',  'Doorstep assistance'],
                audit:      ['Certified CA audit',    'Detailed audit report',  'Regulatory compliance'],
                compliance: ['Proactive monitoring',  'Deadline reminders',     'Expert CA filing'],
                payroll:    ['100% statutory compliant', 'Auto salary computation', 'ESI & PF filing'],
              };

              const getFeatures = (catName: string): string[] => {
                const n = (catName || '').toLowerCase();
                for (const key of Object.keys(featureMap)) {
                  if (n.includes(key)) return featureMap[key];
                }
                return ['Certified CA professional', 'Secure document handling', 'On-time delivery'];
              };

              /* icon accent colours per category */
              const catColors: Record<string, { icon: string; iconBg: string; bar: string }> = {
                tax:        { icon: '#6366F1', iconBg: '#EEF2FF', bar: 'linear-gradient(90deg,#6366F1,#818CF8)' },
                gst:        { icon: '#059669', iconBg: '#ECFDF5', bar: 'linear-gradient(90deg,#059669,#34D399)' },
                company:    { icon: '#0284C7', iconBg: '#E0F2FE', bar: 'linear-gradient(90deg,#0284C7,#38BDF8)' },
                business:   { icon: '#0284C7', iconBg: '#E0F2FE', bar: 'linear-gradient(90deg,#0284C7,#38BDF8)' },
                audit:      { icon: '#D97706', iconBg: '#FFFBEB', bar: 'linear-gradient(90deg,#D97706,#FCD34D)' },
                compliance: { icon: '#7C3AED', iconBg: '#F5F3FF', bar: 'linear-gradient(90deg,#7C3AED,#A78BFA)' },
                payroll:    { icon: '#DB2777', iconBg: '#FDF2F8', bar: 'linear-gradient(90deg,#DB2777,#F472B6)' },
              };

              const getCatColor = (catName: string) => {
                const n = (catName || '').toLowerCase();
                for (const key of Object.keys(catColors)) {
                  if (n.includes(key)) return catColors[key];
                }
                return { icon: '#6366F1', iconBg: '#EEF2FF', bar: 'linear-gradient(90deg,#6366F1,#818CF8)' };
              };

              return (
                <motion.div
                  key="svc-mkt"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pb-20 space-y-7"
                >

                  {/* ━━━ MODERN SAAS HEADER ━━━ */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="relative px-6 sm:px-8 py-8 sm:py-10">
                      {/* Background accent */}
                      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-50 via-transparent to-transparent opacity-40 -z-0" />

                      <div className="relative z-10">
                        {/* Top section: Badge + Search */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-7">
                          <div>
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase" style={{ background: '#F0F9FF', color: '#0284C7', border: '1px solid #BAE6FD' }}>
                              <Sparkles className="w-3 h-3" /> 
                              Browse Services
                            </div>

                            {/* Main Title */}
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-2">
                              Find Your Perfect Service
                            </h2>

                            {/* Subtitle */}
                            <p className="text-gray-500 text-base  ">
                              Browse our comprehensive catalog of professional CA services designed to keep your business compliant and thriving.
                            </p>

                            {/* Trust Pills - Compact inline */}
                            <div className="flex flex-wrap gap-3 mt-6">
                              {[
                                { icon: Package,     label: `${totalAll} Services` },
                                { icon: CheckCircle, label: '100% Certified' },
                                { icon: Clock,       label: '24-48hr Delivery' },
                              ].map(({ icon: Icon, label }, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                  <Icon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                  <span className="font-medium">{label}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Search Box - Right side */}
                          <div className="w-full sm:w-80 flex-shrink-0">
                            <ProfessionalSearchBar
                              services={services.map(s => ({
                                ...s,
                                categoryName: categories.find(c => (c.services || []).some(cs => cs.id === s.id))?.name
                              }))}
                              onSelectService={handleSelectServiceFromSearch}
                              placeholder="Search services…"
                              compact={false}
                              showKbShortcut={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                   <br />
                  {/* ━━━ MODERN FILTER TABS ━━━ */}
                  <div className="flex items-center gap-2 overflow-x-auto mb-4 pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D1D5DB transparent' }}>
                    <div className="flex gap-2 flex-nowrap">
                      {(['all', ...allCategoryNames] as string[]).map((cat) => {
                        const isActive = servicesCategoryFilter === cat;
                        const cnt = cat === 'all' ? totalAll : (categories.find((c: any) => c.name === cat)?.services?.length || 0);
                        return (
                          <motion.button
                            key={cat}
                            onClick={() => setServicesCategoryFilter(cat)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`flex-none px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 border ${
                              isActive
                                ? 'bg-indigo-600 text-black border-indigo-600 shadow-md shadow-indigo-500/30'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {cat === 'all' ? '✨ All' : cat.split(' ')[0]}
                            <span className={`ml-2 px-2 py-0.5 rounded-md text-xs font-bold ${
                              isActive
                                ? 'bg-white/20'
                                : 'bg-gray-100'
                            }`}>
                              {cnt}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Search results label */}
                  {globalSearchQuery.trim() && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-200"
                    >
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">{totalFiltered} result{totalFiltered !== 1 ? 's' : ''}</span>
                        {' '}found for{' '}
                        <span className="text-indigo-600 font-semibold">"{globalSearchQuery}"</span>
                      </p>
                      <button
                        onClick={() => setGlobalSearchQuery('')}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                      >
                        Clear
                      </button>
                    </motion.div>
                  )}

                  {/* ━━━ LOADING SKELETON ━━━ */}
                  {categories.length === 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse h-64">
                          <div className="h-1.5 bg-gray-200" />
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between gap-2">
                              <div className="w-10 h-10 rounded-lg bg-gray-200" />
                              <div className="h-6 w-14 rounded-full bg-gray-200" />
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 bg-gray-200 rounded w-3/4" />
                              <div className="h-3 bg-gray-100 rounded w-full" />
                            </div>
                            <div className="pt-4 space-y-2">
                              <div className="h-3 bg-gray-100 rounded w-5/6" />
                              <div className="h-3 bg-gray-100 rounded w-4/5" />
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <div className="h-4 w-20 bg-gray-200 rounded" />
                              <div className="w-8 h-8 rounded-lg bg-gray-200" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ━━━ EMPTY STATE ━━━ */}
                  {categories.length > 0 && filteredCategories.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-xl border border-gray-200"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
                        <Search className="w-8 h-8 text-indigo-400" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">No services found</h4>
                      <p className="text-sm text-gray-500 mb-6 text-center max-w-sm">
                        {globalSearchQuery ? `No results for "${globalSearchQuery}". Try a different search term.` : 'No services in this category. Try another one.'}
                      </p>
                      <div className="flex items-center gap-3">
                        {globalSearchQuery && (
                          <button
                            onClick={() => setGlobalSearchQuery('')}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            Clear search
                          </button>
                        )}
                        <button
                          onClick={() => setServicesCategoryFilter('all')}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          View all
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ━━━ MODERN SERVICE GRID ━━━ */}
                  {categories.length > 0 && filteredCategories.length > 0 && (
                    <div className="space-y-12">
                      {filteredCategories.map((category: any) => {
                        const cc = getCatColor(category.name);
                        return (
                          <div key={category.id}>
                            {/* Category Header - Clean & Minimal */}
                            {servicesCategoryFilter === 'all' && (
                              <div className="mb-5">
                                <div className="flex items-center gap-3 mb-1">
                                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110" style={{ background: cc.iconBg }}>
                                    <Package className="w-5 h-5" style={{ color: cc.icon }} />
                                  </div>
                                  <div>
                                    <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {category.services.length} service{category.services.length !== 1 ? 's' : ''} available
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Service Cards Grid - Compact 4-column layout */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {category.services.map((svc: Service, idx: number) => {
                                const tag = getTag(svc, idx);
                                const isCustom = !svc.price || Number(svc.price) === 0;
                                const price = Number(svc.price);

                                return (
                                  <motion.button
                                    key={svc.id}
                                    onClick={() => handleChoosePlan(svc)}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.03, duration: 0.25 }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden text-left h-full hover:border-indigo-300 transition-all duration-200"
                                    style={{
                                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(99,102,241,0.15)';
                                      e.currentTarget.style.borderColor = '#A5B4FC';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                                      e.currentTarget.style.borderColor = '#E5E7EB';
                                    }}
                                  >
                                    {/* Top accent bar */}
                                    <div className="h-1.5 w-full" style={{ background: cc.bar }} />

                                    <div className="p-4 flex flex-col h-full">
                                      {/* Icon + Badge Row */}
                                      <div className="flex items-start justify-between mb-3 gap-2">
                                        <div
                                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                          style={{ background: cc.iconBg }}
                                        >
                                          <Package className="w-5 h-5" style={{ color: cc.icon }} />
                                        </div>
                                        {tag && (
                                          <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
                                            style={{ background: tag.bg, color: tag.color }}
                                          >
                                            {tag.label}
                                          </span>
                                        )}
                                      </div>

                                      {/* Title */}
                                      <h4 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 mb-2 group-hover:text-indigo-700 transition-colors">
                                        {svc.name}
                                      </h4>

                                      {/* Description */}
                                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                                        {svc.description || 'Professional service for your compliance needs.'}
                                      </p>

                                      {/* Divider */}
                                      <div className="h-px bg-gray-100 my-3" />

                                      {/* Footer: Price + CTA */}
                                      <div className="mt-auto pt-2">
                                        {isCustom ? (
                                          <div className="flex items-center justify-between gap-2">
                                            <div>
                                              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Custom</p>
                                              <p className="text-xs font-bold text-gray-900">Get Quote</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-500">
                                              <MessageSquare className="w-4 h-4 text-white" />
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex items-center justify-between gap-2">
                                            <div>
                                              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-0.5">Starts at</p>
                                              <p className="text-sm font-bold text-gray-900">₹{price.toLocaleString('en-IN')}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-500">
                                              <ShoppingCart className="w-4 h-4 text-white" />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })()}

            {/* ══════════════════════════════════════════════════════════
                DOCUMENT VAULT — SaaS redesign
            ══════════════════════════════════════════════════════════ */}
            {activeTab === 'documents' && (() => {
              /* ── Per-file visual style ── */
              const getFileStyle = (fileType: string) => {
                const ft = (fileType || '').toLowerCase();
                if (ft.includes('pdf'))
                  return { Icon: FileText, color: '#EF4444', bg: '#FEF2F2', ext: 'PDF' };
                if (['jpg', 'jpeg', 'png', 'webp', 'gif'].some((x) => ft.includes(x)))
                  return { Icon: FileText, color: '#10B981', bg: '#F0FDF4', ext: 'IMG' };
                if (['doc', 'docx'].some((x) => ft.includes(x)))
                  return { Icon: FileText, color: '#2563EB', bg: '#EFF6FF', ext: 'DOC' };
                if (ft === 'report')
                  return { Icon: FileBarChart, color: '#6366F1', bg: '#EEF2FF', ext: 'RPT' };
                return { Icon: File, color: '#6B7280', bg: '#F9FAFB', ext: 'FILE' };
              };

              /* ── Plan tier colours ── */
              const getTierStyle = (planType: string) => {
                const t = (planType || '').toUpperCase();
                if (t.includes('ELITE'))    return { accent: '#D97706', bg: '#FEF3C7', text: '#B45309' };
                if (t.includes('PREMIUM'))  return { accent: '#7C3AED', bg: '#EDE9FE', text: '#6D28D9' };
                if (t.includes('ADVANCED')) return { accent: '#6366F1', bg: '#E0E7FF', text: '#4338CA' };
                if (t.includes('STANDARD')) return { accent: '#2563EB', bg: '#DBEAFE', text: '#1D4ED8' };
                return { accent: '#64748B', bg: '#F1F5F9', text: '#475569' };
              };

              /* ── Derived counts ── */
              const activeGroups = userServices.filter((s) => s.status !== 'CANCELLED');
              const allEmbeddedDocs: any[] = activeGroups.flatMap((s) => (s as any).documents || []);
              const totalReports = allEmbeddedDocs.filter((d: any) => d.fileType === 'REPORT').length;
              const totalDocs    = allEmbeddedDocs.filter((d: any) => d.fileType !== 'REPORT').length; // exclude CA reports from document vault totals
              const totalUploads = totalDocs; // same value, non-report documents


              /* ── Reusable document card ── */
              const DocCard = ({ doc, tier }: { doc: any; tier: ReturnType<typeof getTierStyle> }) => {
                const fs = getFileStyle(doc.fileType);
                const FIcon = fs.Icon;
                const isReport = doc.fileType === 'REPORT';
                const downloadUrl = `${API_URL}/documents/${doc.id}/download`;
                return (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    whileHover={{ y: -3, transition: { duration: 0.12 } }}
                    className="group relative flex flex-col rounded-xl bg-white overflow-hidden"
                    style={{ border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                  >
                    {/* Accent bar */}
                    <div className="h-[3px] w-full shrink-0" style={{
                      background: isReport
                        ? 'linear-gradient(90deg,#6366F1,#818CF8)'
                        : `linear-gradient(90deg,${tier.accent},${tier.accent}99)`,
                    }} />
                    <div className="p-5 flex flex-col flex-1">
                      {/* Icon + type badge */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: fs.bg }}>
                          <FIcon className="w-5 h-5" style={{ color: fs.color }} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {isReport && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider" style={{ background: '#EEF2FF', color: '#4338CA' }}>CA Report</span>
                          )}
                          {doc.fileType === 'KYC' && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider" style={{ background: '#ECFDF5', color: '#059669' }}>KYC</span>
                          )}
                          {doc.fileType === 'ATTACHMENT' && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider" style={{ background: '#FFF7ED', color: '#C2410C' }}>Attachment</span>
                          )}
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider" style={{ background: fs.bg, color: fs.color }}>{fs.ext}</span>
                        </div>
                      </div>
                      {/* Document type label (primary) */}
                      <p className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-0.5" title={doc.documentType || doc.fileName}>
                        {doc.documentType || doc.fileName}
                      </p>
                      {/* File name (secondary, only shown if different from documentType) */}
                      {doc.documentType && doc.fileName && doc.documentType !== doc.fileName && (
                        <p className="text-[11px] text-gray-400 leading-snug line-clamp-1 mb-0.5" title={doc.fileName}>
                          {doc.fileName}
                        </p>
                      )}
                      {/* Upload date */}
                      <p className="text-[11px] text-gray-400 mb-3 flex-1 flex items-end">
                        {new Date(doc.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      {/* Download button */}
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold text-white w-full active:scale-95 transition-transform"
                        style={{ background: 'linear-gradient(135deg,#4338CA,#6366F1)', boxShadow: '0 2px 8px rgba(99,102,241,0.28)' }}
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    </div>
                  </motion.div>
                );
              };

              return (
                <div className="space-y-6 pb-10 px-4 sm:px-6 lg:px-8">

                  {/* ━━━ HERO STATS BANNER ━━━ */}
                  <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#1E1B4B 0%,#3730A3 55%,#4F46E5 100%)', minHeight: 156 }}>
                    <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle,#fff,transparent)' }} />
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle,rgba(37, 57, 234, 0.78),transparent)' }} />
                    <div className="relative z-10 px-7 py-8 sm:px-8 sm:py-9">
                      <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1.5 rounded-full text-[10px] sm:text-[10.5px] font-bold tracking-widest uppercase" style={{ background: 'rgba(255,255,255,0.14)', color: '#C7D2FE', border: '1px solid rgba(255,255,255,0.18)' }}>
                        <FolderOpen className="w-3 h-3" /> Document Vault
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                        <div>
                          <h2 className="text-[22px] sm:text-[26px] font-bold text-white leading-tight">My Documents</h2>
                          <p className="text-indigo-200 text-white text-[13px] mt-1">All your service files, payment proofs &amp; CA reports — organised by service</p>
                        </div>
                        {/* Stat pills */}
                        <div className="flex flex-wrap gap-3 shrink-0">
                          {[
                            { value: totalDocs,        label: 'Total Files' },
                            { value: activeGroups.length, label: 'Services' },
                          ].map(({ value, label }) => (
                            <div key={label} className="flex flex-col items-center justify-center px-5 py-3 rounded-xl min-w-[94px]" style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.18)' }}>
                              <span className="text-[20px] sm:text-[22px] font-black text-white leading-none">{value}</span>
                              <span className="text-[10px] sm:text-[11px] text-indigo-200 uppercase tracking-wider mt-1">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ━━━ FILTER TABS ━━━ */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-1.5 flex items-center gap-1.5 overflow-x-auto" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)', scrollbarWidth: 'none' }}>
                    {([
                      { id: 'all',      label: 'All Documents', count: totalDocs },
                      { id: 'uploaded', label: 'My Uploads',    count: totalUploads },
                    ] as const).map((tab) => {
                      const active = docFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setDocFilter(tab.id)}
                          className="flex-none flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all duration-200"
                          style={active
                            ? { background: '#4338CA', color: '#fff', boxShadow: '0 2px 10px rgba(67,56,202,0.32)' }
                            : { color: '#6B7280' }}
                        >
                          {tab.label}
                          <span className="text-[11px] min-w-[20px] text-center px-1.5 py-0.5 rounded-full font-bold"
                            style={active
                              ? { background: 'rgba(255,255,255,0.22)', color: '#fff' }
                              : { background: '#F3F4F6', color: '#9CA3AF' }}
                          >{tab.count}</span>
                        </button>
                      );
                    })}
                    <div className="ml-2 py-1 px-3 text-[11px] font-bold text-white bg-primary/90 rounded-full border border-white/30">
                      CA Reports are now exclusively in the Reports tab
                    </div>
                  </div>

                  {/* ━━━ EMPTY STATE — no services ━━━ */}
                  {activeGroups.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 text-center" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
                        <FolderOpen className="w-7 h-7 text-indigo-300" />
                      </div>
                      <h4 className="text-[17px] font-bold text-gray-800 mb-2">No Active Services</h4>
                      <p className="text-[13.5px] text-gray-400 max-w-xs leading-relaxed mb-6">
                        Purchase a CA service to start uploading documents and tracking your compliance files.
                      </p>
                      <button
                        onClick={() => setActiveTab('services')}
                        className="flex items-center gap-2 px-5 py-2.5 text-white text-[13px] font-bold rounded-xl active:scale-95 transition-transform"
                        style={{ background: 'linear-gradient(135deg,#4338CA,#6366F1)', boxShadow: '0 4px 12px rgba(99,102,241,0.28)' }}
                      >
                        <ShoppingCart className="w-4 h-4" /> Browse Services
                      </button>
                    </div>
                  )}

                  {/* ━━━ SERVICE DOCUMENT GROUPS ━━━ */}
                  {activeGroups.map((svc, svcIdx) => {
                    const tier        = getTierStyle((svc as any).planType || (svc as any).planName || 'BASIC');
                    const embeddedDocs: any[] = (svc as any).documents || [];
                    const isUploading = uploadingOrderId === svc.orderId;

                    /* Filter docs by current tab and exclude CA reports from document vault */
                    const visibleDocs = embeddedDocs.filter((d: any) => d.fileType !== 'REPORT').filter((d: any) => {
                      if (docFilter === 'uploaded') return true; // uploaded list for non-report docs
                      return true; // all non-report docs
                    });

                    return (
                      <motion.div
                        key={svc.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: svcIdx * 0.06, duration: 0.28 }}
                        className="bg-white rounded-2xl overflow-hidden"
                        style={{ border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
                      >
                        {/* ── Group header ── */}
                        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            {/* Service icon */}
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: tier.bg }}>
                              <FileText className="w-5 h-5" style={{ color: tier.accent }} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                                <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-900 truncate">
                                  {(svc as any).serviceName || svc.service?.name}
                                </h3>
                                {/* Plan badge */}
                                <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shrink-0"
                                  style={{ background: tier.bg, color: tier.text }}>
                                  {(svc as any).planName || (svc as any).planType || 'BASIC'}
                                </span>
                                {/* Status badge */}
                                <span className={`text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border shrink-0 ${getStatusColor(svc.status)}`}>
                                  {svc.status?.replace(/_/g, ' ')}
                                </span>
                              </div>
                              <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed">
                                {embeddedDocs.length} document{embeddedDocs.length !== 1 ? 's' : ''}
                                {' · '}₹{Number((svc as any).price || 0).toLocaleString('en-IN')}
                                {' · '}{new Date(svc.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          </div>

                          {/* Per-service upload button */}
                          <label
                            className="shrink-0 flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-bold text-white rounded-xl cursor-pointer active:scale-95 transition-all"
                            style={{
                              background: 'linear-gradient(135deg,#4338CA,#6366F1)',
                              boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                              opacity: isUploading ? 0.65 : 1,
                              pointerEvents: isUploading ? 'none' : 'auto',
                            }}
                          >
                            {isUploading
                              ? <><Loader className="w-3.5 h-3.5 animate-spin" /> Uploading…</>
                              : <><Upload className="w-3.5 h-3.5" /> Upload Doc</>}
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                              disabled={isUploading}
                              onChange={(e) => handleFileUploadForOrder(e, svc.orderId)}
                            />
                          </label>
                        </div>

                        {/* ── Documents grid ── */}
                        <div className="p-6">
                          {visibleDocs.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-gray-200 rounded-xl bg-gray-50">
                              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-3">
                                <FileText className="w-5 h-5 text-gray-300" />
                              </div>
                              <p className="text-[13px] font-semibold text-gray-600 mb-1">
                                {docFilter !== 'all'
                                  ? `No ${docFilter === 'reports' ? 'CA reports' : 'uploads'} for this service`
                                  : 'No documents uploaded yet'}
                              </p>
                              <p className="text-[12px] text-gray-400 max-w-xs leading-relaxed">
                                {docFilter !== 'all'
                                  ? 'Switch to "All Documents" to see everything.'
                                  : 'Use the Upload button to add your first document for this service.'}
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {visibleDocs.map((doc: any) => (
                                <DocCard key={doc.id} doc={doc} tier={tier} />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* ── Plan scope summary strip ── */}
                        {(svc as any).scopeSummary && (
                          <div className="mx-5 mb-5 px-4 py-3 rounded-xl flex items-center gap-2.5" style={{ background: tier.bg }}>
                            <BadgeCheck className="w-4 h-4 shrink-0" style={{ color: tier.accent }} />
                            <p className="text-[12px] leading-relaxed" style={{ color: tier.text }}>{(svc as any).scopeSummary}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* ━━━ UNLINKED / GENERAL DOCUMENTS ━━━ */}
                  {(() => {
                    const linkedIds = new Set(activeGroups.flatMap((s) => ((s as any).documents || []).map((d: any) => d.id)));
                    const unlinked  = documents.filter((d) => !linkedIds.has(d.id));
                    const visible   = unlinked.filter((d) => {
                      if (docFilter === 'reports')  return d.fileType === 'REPORT';
                      if (docFilter === 'uploaded') return d.fileType !== 'REPORT';
                      return true;
                    });
                    if (visible.length === 0) return null;
                    const tier = getTierStyle('BASIC');
                    return (
                      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E7EB', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                        <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <File className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-[15px] font-bold text-gray-800">Other Documents</h3>
                            <p className="text-[12px] text-gray-400">{visible.length} file{visible.length !== 1 ? 's' : ''} not linked to a service</p>
                          </div>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          {visible.map((doc) => (
                            <DocCard key={doc.id} doc={doc as any} tier={tier} />
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                </div>
              );
            })()}

            {activeTab === 'reports' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                {/* Elite Reports Header */}
                <div className="relative overflow-hidden rounded-[3rem] bg-[#0b1f3a] p-10 md:p-14 text-black shadow-2xl border border-blue-900/50">
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -mr-40 -mt-40 blur-[120px]"></div>

                  <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-6">
                        <Shield className="w-3 h-3" /> Secure Audit Repository
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Financial Intelligence <span className="text-primary">& Reports</span></h2>
                      <p className="text-blue-100/60 font-medium text-black leading-relaxed">
                        Access your certified audit reports, tax assessments, and compliance filings. All documents are digitally signed and verified by our partner firm.
                      </p>
                    </div>

                    <br />

                    <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                      <div className="flex-1 lg:flex-none relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search identifier..."
                          className="w-full lg:w-64 h-14 pl-12 pr-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-sm placeholder:text-gray-500"
                          value={reportsSearchQuery}
                          onChange={(e) => setReportsSearchQuery(e.target.value)}
                        />
                      </div>
                      <select
                        className="h-14 px-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 transition-all font-black text-[10px] uppercase tracking-widest text-black cursor-pointer"
                        value={reportsCategoryFilter}
                        onChange={(e) => setReportsCategoryFilter(e.target.value)}
                      >
                        <option value="all" className="bg-[#0b1f3a]">All Modules</option>
                        <option value="audit" className="bg-[#0b1f3a]">Financial Audit</option>
                        <option value="tax" className="bg-[#0b1f3a]">Taxation</option>
                        <option value="compliance" className="bg-[#0b1f3a]">Compliance</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Filtered Content Grid */}
                {(() => {
                  const filtered = reportDocuments.filter(doc => {
                    const matchesSearch = doc.fileName.toLowerCase().includes(reportsSearchQuery.toLowerCase());
                    const matchesCat = reportsCategoryFilter === 'all' ||
                      doc.fileName.toLowerCase().includes(reportsCategoryFilter) ||
                      (doc.userService?.service?.name || '').toLowerCase().includes(reportsCategoryFilter);
                    return matchesSearch && matchesCat;
                  });

                  return filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filtered.map((report) => (
                        <div key={report.id} className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[400px] relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

                          <div className="relative z-10 flex flex-col h-full">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-10">
                              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-[#0b1f3a] group-hover:border-[#0b1f3a] transition-all duration-500 relative">
                                <FileBarChart className="w-7 h-7 text-[#0b1f3a] group-hover:text-primary transition-colors" />
                                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-black text-[8px] font-black rounded-lg shadow-lg">PDF</div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Protocol ID</p>
                                <p className="text-xs font-black text-[#0b1f3a]">REF-{report.id.toString().padStart(6, '0')}</p>
                              </div>
                            </div>

                            {/* Title & Context */}
                            <div className="flex-1 mb-8">
                              <h4 className="text-xl font-black text-[#0b1f3a] tracking-tight mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                {report.fileName.replace(/\.[^/.]+$/, "").split('-').join(' ')}
                              </h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Certified Audit Node</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Assigned Service</p>
                                  <p className="text-[11px] font-black text-[#0b1f3a] truncate">
                                    {report.userService?.service?.name || report.order?.items?.[0]?.serviceName || 'Global Settlement'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-gray-400">
                                  <CalendarIcon className="w-3 h-3" />
                                  <span className="text-[11px] font-bold">
                                    {new Date(report.uploadedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                  <Shield className="w-3 h-3" />
                                  <span className="text-[9px] font-black uppercase tracking-widest">2.4 MB • Encrypted</span>
                                </div>
                              </div>

                              <a
                                href={report.url}
                                download={report.fileName || 'report'}
                                className="px-6 py-3.5 bg-[#0b1f3a] text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/10 hover:bg-primary hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                              >
                                <Download className="w-3.5 h-3.5" /> Download PDF
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-[3rem] p-24 border border-dashed border-gray-200 text-center shadow-inner relative overflow-hidden">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
                        <FileBarChart className="w-96 h-96" />
                      </div>
                      <div className="relative z-10">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-gray-100 shadow-sm">
                          <Search className="w-10 h-10 text-gray-200" />
                        </div>
                        <h4 className="text-2xl font-black text-[#0b1f3a] tracking-tight mb-3">No Reports Matched</h4>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                          We couldn't find any reports matching your current filter criteria. Check your spelling or reset the module filter.
                        </p>
                        <button
                          onClick={() => { setReportsSearchQuery(''); setReportsCategoryFilter('all'); }}
                          className="mt-10 px-8 py-4 bg-blue-500 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* Audit Firm Note */}
                <div className="bg-emerald-50/50 rounded-[2rem] p-8 border border-emerald-100/50 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-emerald-100">
                    <Shield className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black text-emerald-800 uppercase tracking-widest mb-1">Regulatory Notice</h5>
                    <p className="text-xs text-emerald-700/70 font-bold leading-relaxed">
                      All reports generated within this workspace are legally compliant with MCA and Income Tax Department guidelines. Electronic signatures are verified against UDIN standards.
                    </p>
                  </div>
                </div>
              </div>
            )}


            {
              activeTab === 'billing' && (() => {
                /* ── Billing computed values ── */
                const fmtLakh = (n: number) =>
                  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L`
                  : n >= 1000  ? `₹${(n / 1000).toFixed(1)}K`
                  : `₹${n.toLocaleString('en-IN')}`;

                const totalBilled   = expandedServices.reduce((a, s) => a + (s.price || 0), 0);
                const collected     = expandedServices.filter(s => s.status === 'COMPLETED').reduce((a, s) => a + (s.price || 0), 0);
                const pendingAmt    = expandedServices.filter(s => s.status === 'PENDING_PAYMENT').reduce((a, s) => a + (s.price || 0), 0);
                const overdueAmt    = expandedServices.filter(s => s.status === 'CANCELLED').reduce((a, s) => a + (s.price || 0), 0);

                type BMap = { bg: string; text: string; dot: string; label: string };
                const statusStyles: Record<string, BMap> = {
                  ACTIVE:               { bg: '#F0FDF4', text: '#16A34A', dot: '#22C55E', label: 'Active'        },
                  COMPLETED:            { bg: '#DCFCE7', text: '#15803D', dot: '#22C55E', label: 'Paid'          },
                  PENDING_PAYMENT:      { bg: '#FFFBEB', text: '#D97706', dot: '#F59E0B', label: 'Pending'       },
                  NEED_DOCUMENTS:       { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316', label: 'Docs Required' },
                  PENDING_VERIFICATION: { bg: '#EEF2FF', text: '#4F46E5', dot: '#6366F1', label: 'Under Review'  },
                  CANCELLED:            { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444', label: 'Overdue'       },
                };

                return (
                  <div className="space-y-6 pb-10">

                    {/* ── Page Header ── */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
                    >
                      <div>
                        <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">Payments & Billing</h2>
                        <p className="text-[14px] text-gray-500 mt-1">Track invoices and manage payments</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('services')}
                        className="flex items-center gap-2 px-5 py-3.5 text-black rounded-xl text-[13px] font-bold active:scale-95 transition-all shrink-0 bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                      >
                        <Plus className="w-5 h-4" /> Generate Invoice
                      </button>
                    </motion.div>

                    {/* ── KPI Cards ── */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'TOTAL BILLED', value: fmtLakh(totalBilled),  color: 'text-gray-900'   },
                        { label: 'COLLECTED',    value: fmtLakh(collected),    color: 'text-green-600'  },
                        { label: 'PENDING',      value: fmtLakh(pendingAmt),   color: 'text-amber-500'  },
                        { label: 'OVERDUE',      value: fmtLakh(overdueAmt),   color: 'text-red-500'    },
                      ].map((card, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="bg-white rounded-xl border border-gray-200 px-6 py-5"
                        >
                          <p className="text-[11px] font-semibold text-gray-400 tracking-[0.1em] uppercase mb-3">{card.label}</p>
                          <p className={`text-[34px] font-bold tabular-nums leading-none ${card.color}`}>{card.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* ── Invoice Table ── */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      {expandedServices.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                          <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center bg-indigo-50">
                            <CreditCard className="w-7 h-7 text-indigo-400" />
                          </div>
                          <h4 className="text-[15px] font-bold text-gray-900 mb-1.5">No invoices yet</h4>
                          <p className="text-[13px] text-gray-500 mb-5 max-w-xs leading-relaxed">Browse our CA services to get started — GST filing, ITR, audit and more.</p>
                          <button onClick={() => setActiveTab('services')} className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-[13px] font-bold active:scale-95 transition-all bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                            <Sparkles className="w-4 h-4" /> Browse Services
                          </button>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left" style={{ minWidth: 700 }}>
                            <thead>
                              <tr className="border-b border-gray-100">
                                <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Invoice</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Service</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Amount</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Status</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] hidden md:table-cell">Due Date</th>
                                <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em]">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {expandedServices.map((svc, idx) => {
                                const sm: BMap = statusStyles[svc.status] ?? { bg: '#F9FAFB', text: '#6B7280', dot: '#9CA3AF', label: svc.status.replace(/_/g, ' ') };
                                const dateStr = new Date(svc.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                                const isPaid  = svc.status === 'COMPLETED';
                                const invoiceNum = `INV-${new Date(svc.createdAt).getFullYear()}-${String(svc.orderId || idx + 1).padStart(3, '0')}`;
                                return (
                                  <motion.tr
                                    key={(svc as any).displayId || svc.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.18 + idx * 0.03 }}
                                    className="border-b border-gray-50 transition-colors duration-100 hover:bg-gray-50/60"
                                  >
                                    {/* Invoice # */}
                                    <td className="px-6 py-4">
                                      <span className="text-[13px] font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">{invoiceNum}</span>
                                    </td>

                                    {/* Service name + plan */}
                                    <td className="px-6 py-4">
                                      <p className="text-[14px] font-semibold text-gray-900 leading-snug">
                                        {svc.service?.name}
                                        {(svc as any).instanceNumber && <span className="text-[11px] ml-1.5 font-normal text-gray-400">#{(svc as any).instanceNumber}</span>}
                                      </p>
                                      {svc.planName && <p className="text-[12px] text-gray-400 mt-0.5">{svc.planName}</p>}
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4">
                                      <span className="text-[14px] font-bold text-gray-900 tabular-nums">₹{Number(svc.price || 0).toLocaleString('en-IN')}</span>
                                    </td>

                                    {/* Status pill */}
                                    <td className="px-6 py-4">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold" style={{ background: sm.bg, color: sm.text }}>
                                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: sm.dot }} />
                                        {sm.label}
                                      </span>
                                    </td>

                                    {/* Due Date */}
                                    <td className="px-6 py-4 hidden md:table-cell">
                                      <span className="text-[13px] text-gray-500">{dateStr}</span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                      {isPaid ? (
                                        <span className="text-[13px] font-semibold text-green-600">{dateStr}</span>
                                      ) : svc.status === 'PENDING_PAYMENT' ? (
                                        <button
                                          onClick={() => { setSelectedService({ ...svc.service, orderId: svc.orderId, price: svc.price }); setPaymentProofFile(null); setSelectedPaymentMethod('manual_qr'); setShowPaymentModal(true); }}
                                          className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white rounded-lg active:scale-95 transition-all shrink-0"
                                          style={{ background: '#F59E0B', boxShadow: '0 2px 8px rgba(245,158,11,0.3)' }}
                                        >
                                          <CreditCard className="w-3.5 h-3.5" /> Pay Now
                                        </button>
                                      ) : svc.status === 'NEED_DOCUMENTS' ? (
                                        <button
                                          onClick={() => handleFillForm(svc)}
                                          className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-white rounded-lg active:scale-95 transition-all shrink-0"
                                          style={{ background: '#6366F1', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}
                                        >
                                          <Upload className="w-3.5 h-3.5" /> Fill Form
                                        </button>
                                      ) : svc.status === 'CANCELLED' ? (
                                        <button
                                          onClick={() => setActiveTab('tickets')}
                                          className="flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors active:scale-95"
                                        >
                                          <MessageSquare className="w-3.5 h-3.5" /> Contact Us
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() => handleViewRoadmap(svc)}
                                          className="flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] font-semibold rounded-lg border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-colors active:scale-95"
                                        >
                                          <Map className="w-3.5 h-3.5" /> View Progress
                                        </button>
                                      )}
                                    </td>
                                  </motion.tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </motion.div>
                  </div>
                );
              })()
            }


            <br />

            {/* TICKETS VIEW */}
            {activeTab === 'tickets' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
                {/* Professional Support Header */}
                <div className="bg-white rounded-3xl p-6 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>

                  <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
                    <div className="max-w-xl text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#136da1] rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 md:mb-4">
                        <MessageSquare className="w-3 h-3" /> Expert Assistance
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black text-[#0b1f3a] tracking-tight mb-3 md:mb-4 leading-tight">Communication <span className="text-primary">Portal</span></h2>
                      <p className="text-gray-500 font-medium text-xs md:text-sm leading-relaxed">
                        Connect directly with our senior partners and chartered accountants. Our team is committed to providing precise, timely responses to your business queries.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowTicketModal(true)}
                      className="px-6 md:px-8 py-3.5 md:py-4 bg-blue-400 text-[#136da1] rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg hover:bg-primary transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      Create Request
                    </button>
                  </div>
                </div>

                {/* Status Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Pending Response', count: (Array.isArray(tickets) ? tickets : []).filter(t => t.status === 'OPEN').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
                    { label: 'Resolved Tickets', count: (Array.isArray(tickets) ? tickets : []).filter(t => t.status === 'RESOLVED').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Service Level', value: 'Prime', icon: Shield, color: 'text-[#136da1]', bg: 'bg-blue-50' }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
                      <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shrink-0`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-xl font-black text-[#0b1f3a]">{stat.count ?? stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ticket List */}
                <div className="space-y-6">
                  {(Array.isArray(tickets) ? tickets : []).map(ticket => (
                    <div key={ticket.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:border-primary/20 hover:shadow-md">
                      <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`px-2.5 py-0.5 text-[8px] font-black rounded uppercase tracking-widest ${ticket.status === 'OPEN' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {ticket.status}
                              </span>
                              <span className="text-[10px] font-bold text-gray-400">ID: #{ticket.id}</span>
                            </div>
                            <h4 className="text-lg font-black text-[#0b1f3a] tracking-tight">{ticket.subject}</h4>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                            <CalendarIcon className="w-3 h-3" />
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Dialogue Section */}
                        <div className="space-y-6">
                          {/* User Message */}
                          <div className="flex gap-3 md:gap-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-black text-[10px] text-gray-500 shrink-0 border border-gray-100 italic">
                              {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1">
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Your Query</p>
                              <div className="bg-gray-50 p-4 md:p-5 rounded-2xl rounded-tl-none border border-gray-100">
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{ticket.message}</p>
                              </div>
                            </div>
                          </div>

                          {/* Expert Reply */}
                          {ticket.adminReply && (
                            <div className="flex gap-4">
                              <div className="w-8 h-8 bg-[#0b1f3a] rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/10">
                                <Shield className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-[9px] font-black text-[#136da1] uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                  CA Official Response
                                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                                </p>
                                <div className="bg-blue-50/50 p-5 rounded-2xl rounded-tl-none border border-blue-100/50">
                                  <p className="text-sm text-[#0b1f3a] font-bold leading-relaxed">{ticket.adminReply}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!Array.isArray(tickets) || tickets.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                        <MessageSquare className="w-8 h-8 text-gray-200" />
                      </div>
                      <h4 className="text-lg font-black text-[#0b1f3a] mb-1">No Active Tickets</h4>
                      <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest">Your communication history is empty</p>
                    </div>
                  )}
                </div>
              </div>
            )
            }

            {activeTab === 'renewals' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-[#0b1f3a] tracking-tight">Service Renewals</h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Track and renew your active CA services</p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Active', count: renewals.filter(r => r.status === 'ACTIVE').length, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                      { label: 'Expiring Soon', count: renewals.filter(r => r.status === 'EXPIRING_SOON').length, color: 'bg-amber-50 text-amber-600 border-amber-100' },
                      { label: 'Expired', count: renewals.filter(r => r.status === 'EXPIRED').length, color: 'bg-red-50 text-red-600 border-red-100' },
                      { label: 'Renewed', count: renewals.filter(r => r.status === 'RENEWED').length, color: 'bg-blue-50 text-blue-600 border-blue-100' },
                    ].map(s => (
                      <div key={s.label} className={`rounded-2xl p-5 border ${s.color} flex flex-col items-center justify-center text-center`}>
                        <p className="text-[9px] font-black uppercase tracking-widest mb-2">{s.label}</p>
                        <p className="text-4xl font-black leading-tight">{s.count}</p>
                      </div>
                    ))}
                  </div>

                  {/* Alert Banner for Expiring Soon */}
                  {renewals.filter(r => r.status === 'EXPIRING_SOON').length > 0 && (
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-black text-amber-800">
                          {renewals.filter(r => r.status === 'EXPIRING_SOON').length} service(s) expiring within 30 days
                        </p>
                        <p className="text-xs text-amber-600 mt-0.5">Contact your CA to renew before expiry to avoid service interruption.</p>
                      </div>
                    </div>
                  )}

                  {/* Renewals List */}
                  {renewals.length === 0 ? (
                    <div className="text-center py-16">
                      <TrendingUp className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                      <h4 className="text-lg font-black text-[#0b1f3a] mb-1">No Renewals Yet</h4>
                      <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest">Service renewals will appear here after your first order</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {renewals.map(r => {
                        const daysLeft = r.expiresAt ? Math.ceil((new Date(r.expiresAt).getTime() - Date.now()) / 86400000) : null;
                        const statusStyles: Record<string, string> = {
                          ACTIVE: 'bg-emerald-100 text-emerald-700',
                          EXPIRING_SOON: 'bg-amber-100 text-amber-700',
                          EXPIRED: 'bg-red-100 text-red-700',
                          RENEWED: 'bg-blue-100 text-blue-700',
                        };
                        return (
                          <div key={r.id} className={`bg-white rounded-2xl border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${r.status === 'EXPIRING_SOON' ? 'border-amber-200 shadow-amber-50 shadow-md' : r.status === 'EXPIRED' ? 'border-red-200' : 'border-gray-100'}`}>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2.5 py-0.5 text-[8px] font-black rounded uppercase tracking-widest ${statusStyles[r.status] || 'bg-gray-100 text-gray-600'}`}>
                                  {r.status.replace('_', ' ')}
                                </span>
                                {daysLeft !== null && daysLeft <= 30 && daysLeft > 0 && (
                                  <span className="px-2 py-0.5 text-[8px] font-black bg-amber-500 text-black rounded uppercase tracking-widest">
                                    {daysLeft}d left
                                  </span>
                                )}
                                {daysLeft !== null && daysLeft <= 0 && (
                                  <span className="px-2 py-0.5 text-[8px] font-black bg-red-500 text-black rounded uppercase tracking-widest">
                                    Expired
                                  </span>
                                )}
                              </div>
                              <h4 className="text-base font-black text-[#0b1f3a]">{r.serviceName || `Service #${r.serviceId}`}</h4>
                              <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">
                                {r.planType && `Plan: ${r.planType} • `}
                                Expires: {r.expiresAt ? new Date(r.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                              </p>
                            </div>
                            {(r.status === 'EXPIRING_SOON' || r.status === 'EXPIRED') && (
                              <button
                                onClick={() => setActiveTab('services')}
                                className="px-5 py-2.5 bg-primary text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0b1f3a] transition-all"
                              >
                                Renew Service
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* RETAINED MODALS */}
        {
          showPaymentModal && selectedService && (() => {
            const basePrice   = Number(selectedService.price) || 0;
            const gstAmount   = Math.round(basePrice * 0.18);
            const grandTotal  = basePrice + gstAmount;
            const isQR        = selectedPaymentMethod === 'manual_qr';
            const hasQR       = !!availablePaymentMethods?.manual_qr?.qrCodeUrl;
            return (
              <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 pt-4" style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(4px)' }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-2xl w-full shadow-2xl"
                  style={{
                    maxWidth: 500,
                    height: 'min(90vh, 700px)',
                    display: 'grid',
                    gridTemplateRows: 'auto 1fr auto',
                    overflow: 'hidden',
                  }}
                >
                  {/* ── HEADER ── */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <CreditCard className="w-4.5 h-4.5 text-indigo-600" style={{ width: 18, height: 18 }} />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-bold text-gray-900 leading-tight">Complete Payment</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">Order #{selectedService.orderId}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setShowPaymentModal(false); setPaymentProofFile(null); }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  {/* ── SCROLLABLE BODY ── */}
                  <div className="overflow-y-auto px-6 py-5 space-y-5" style={{ overflowY: 'auto' }}>

                    {/* Service + Price Summary */}
                    <div className="rounded-xl border border-gray-200 overflow-hidden">
                      <div className="bg-indigo-600 px-5 py-4">
                        <p className="text-[11px] font-semibold text-indigo-200 uppercase tracking-[0.08em] mb-1">Service</p>
                        <p className="text-[16px] font-bold text-white leading-snug">{selectedService.name}</p>
                      </div>
                      <div className="bg-white px-5 py-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-500">Base Amount</span>
                          <span className="text-[13px] font-semibold text-gray-900 tabular-nums">₹{basePrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-gray-500">GST (18%)</span>
                          <span className="text-[13px] font-semibold text-gray-900 tabular-nums">+₹{gstAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="text-[14px] font-bold text-gray-900">Total Payable</span>
                          <span className="text-[22px] font-bold text-indigo-600 tabular-nums">₹{grandTotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* ── Payment Method Toggle ── */}
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.08em] mb-3">Choose Payment Method</p>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Pay Now via QR */}
                        <button
                          onClick={() => setSelectedPaymentMethod('manual_qr')}
                          className="relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all"
                          style={isQR ? { borderColor: '#6366F1', background: '#EEF2FF' } : { borderColor: '#E5E7EB', background: '#fff' }}
                        >
                          {isQR && (
                            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center">
                              <CheckCircle className="w-2.5 h-2.5 text-white" style={{ width: 10, height: 10 }} />
                            </div>
                          )}
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isQR ? '#6366F1' : '#F3F4F6' }}>
                            <CreditCard className="w-5 h-5" style={{ color: isQR ? '#fff' : '#6B7280' }} />
                          </div>
                          <div className="text-center">
                            <p className="text-[13px] font-bold" style={{ color: isQR ? '#4338CA' : '#374151' }}>Pay Now</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Scan QR & upload proof</p>
                          </div>
                        </button>

                        {/* Pay Later */}
                        <button
                          onClick={() => setSelectedPaymentMethod('pay_later')}
                          className="relative flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all"
                          style={!isQR ? { borderColor: '#F59E0B', background: '#FFFBEB' } : { borderColor: '#E5E7EB', background: '#fff' }}
                        >
                          {!isQR && (
                            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                              <CheckCircle className="w-2.5 h-2.5 text-white" style={{ width: 10, height: 10 }} />
                            </div>
                          )}
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: !isQR ? '#F59E0B' : '#F3F4F6' }}>
                            <Clock className="w-5 h-5" style={{ color: !isQR ? '#fff' : '#6B7280' }} />
                          </div>
                          <div className="text-center">
                            <p className="text-[13px] font-bold" style={{ color: !isQR ? '#B45309' : '#374151' }}>Pay Later</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">Confirm now, pay soon</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* ── PAY NOW: QR + Upload ── */}
                    {isQR && (
                      <div className="space-y-4">
                        {/* Steps */}
                        <div className="rounded-xl bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border border-indigo-100 px-4 py-4">
                          <div className="flex items-start justify-between relative">
                            {/* Connector lines */}
                            <div className="absolute top-4 left-[calc(16.67%)] right-[calc(16.67%)] flex items-center gap-0 pointer-events-none" style={{ zIndex: 0 }}>
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                                className="h-[2px] flex-1 origin-left"
                                style={{ background: 'linear-gradient(90deg, #6366F1, #818CF8)' }}
                              />
                              <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                                className="h-[2px] flex-1 origin-left"
                                style={{ background: 'linear-gradient(90deg, #818CF8, #C7D2FE)' }}
                              />
                            </div>
                            {[
                              { label: 'Scan QR Code', icon: '📱' },
                              { label: 'Transfer Amount', icon: '💸' },
                              { label: 'Upload Proof', icon: '📎' },
                            ].map((step, si) => (
                              <motion.div
                                key={si}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: si * 0.15, duration: 0.35 }}
                                className="flex flex-col items-center gap-2 flex-1 relative"
                                style={{ zIndex: 1 }}
                              >
                                <motion.div
                                  animate={{ boxShadow: ['0 0 0 0 rgba(99,102,241,0)', '0 0 0 6px rgba(99,102,241,0.12)', '0 0 0 0 rgba(99,102,241,0)'] }}
                                  transition={{ delay: si * 0.4 + 0.8, duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                                  style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' }}
                                >
                                  {si + 1}
                                </motion.div>
                                <div className="text-center">
                                  <p className="text-[10px] font-bold text-indigo-700 leading-tight">{step.label}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* QR code box */}
                        <div className="rounded-xl border border-gray-200 overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="text-[12px] font-semibold text-gray-700">UPI / All Bank Apps Accepted</span>
                            </div>
                            <span className="text-[11px] font-bold text-indigo-600 tabular-nums">₹{grandTotal.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex items-center justify-center py-6 px-4 bg-white">
                            {hasQR ? (
                              <img
                                src={availablePaymentMethods.manual_qr.qrCodeUrl}
                                alt="Payment QR"
                                className="w-44 h-44 object-contain rounded-lg"
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-3 py-4">
                                <img
                                  src={`https://api.qrserver.com/v1/create-qr-code/?size=176x176&data=upi://pay?pa=caPortal%40upi%26pn=CA+Portal%26am=${grandTotal}%26cu=INR&bgcolor=ffffff&color=1a1a2e&margin=10`}
                                  alt="Payment QR Code"
                                  className="w-44 h-44 object-contain rounded-xl border border-gray-200"
                                />
                                <p className="text-[11px] text-gray-400 font-medium text-center">Scan with any UPI app to pay</p>
                              </div>
                            )}
                          </div>
                          <div className="bg-indigo-50 px-4 py-2.5 text-center border-t border-indigo-100">
                            <p className="text-[11.5px] text-indigo-600 font-semibold">After payment, upload your transaction screenshot or PDF below</p>
                          </div>
                        </div>

                        {/* Upload Proof */}
                        <div>
                          <p className="text-[12px] font-semibold text-gray-700 mb-2">Upload Payment Proof <span className="text-gray-400 font-normal">(screenshot / PDF)</span></p>
                          <label
                            className="flex flex-col items-center justify-center gap-3 w-full rounded-xl border-2 border-dashed cursor-pointer transition-colors"
                            style={{
                              borderColor: paymentProofFile ? '#6366F1' : '#D1D5DB',
                              background: paymentProofFile ? '#F5F3FF' : '#FAFAFA',
                              padding: '20px 16px',
                            }}
                          >
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setPaymentProofFile(file);
                              }}
                            />
                            {paymentProofFile ? (
                              <>
                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="text-center">
                                  <p className="text-[13px] font-semibold text-indigo-700">{paymentProofFile.name}</p>
                                  <p className="text-[11px] text-indigo-400 mt-0.5">{(paymentProofFile.size / 1024).toFixed(1)} KB — click to change</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                                  <Upload className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="text-center">
                                  <p className="text-[13px] font-semibold text-gray-600">Click to upload proof</p>
                                  <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG, PDF — max 10MB</p>
                                </div>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    )}

                    {/* ── PAY LATER ── */}
                    {!isQR && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                            <Clock className="w-4.5 h-4.5 text-amber-600" style={{ width: 18, height: 18 }} />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-amber-900">Pay Later Selected</p>
                            <p className="text-[12.5px] text-amber-700 mt-1 leading-relaxed">
                              Your service order will be confirmed immediately. Complete the payment within the agreed timeframe to avoid service suspension.
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            'Order will be activated upon submission',
                            'Payment due within 7 working days',
                            'You will receive a reminder notification',
                          ].map((point, pi) => (
                            <div key={pi} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                              <span className="text-[12px] text-amber-800">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── FOOTER SUBMIT ── */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <button
                      onClick={handlePayment}
                      disabled={actionLoading}
                      className="w-full py-3.5 rounded-xl text-[14px] font-bold text-white flex items-center justify-center gap-2.5 active:scale-[0.99] transition-all disabled:opacity-50"
                      style={{
                        background: isQR
                          ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
                          : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                        boxShadow: isQR
                          ? '0 4px 14px rgba(99,102,241,0.35)'
                          : '0 4px 14px rgba(245,158,11,0.35)',
                      }}
                    >
                      {actionLoading ? (
                        <Loader className="w-4.5 h-4.5 animate-spin" style={{ width: 18, height: 18 }} />
                      ) : isQR ? (
                        <Shield className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                      ) : (
                        <Clock className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                      )}
                      {actionLoading
                        ? 'Processing…'
                        : isQR
                          ? 'Submit Payment Proof'
                          : 'Confirm — Pay Later'}
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2.5">
                      {isQR
                        ? 'Your proof will be verified by our team within 24 hours'
                        : 'Service will be activated after order confirmation'}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })()
        }

        {
          showTicketModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-6 md:p-10 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-black tracking-tight">Initiate Support Node</h3>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">Standard response time: &lt; 24 hours</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-4">Subject Descriptor</label>
                    <input type="text" placeholder="Brief overview of inquiry..." className="w-full p-4 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-medium text-sm" value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block ml-4">Detailed Intelligence</label>
                    <textarea placeholder="Elaborate on your requirement or issue..." className="w-full p-4 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-medium text-sm h-40 resize-none" value={newTicket.message} onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })} />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button onClick={() => setShowTicketModal(false)} className="flex-1 py-5 border-2 border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"> Cancel</button>
                    <button onClick={async () => {
                      if (!newTicket.subject || !newTicket.message) return alert('Input required fields');
                      setActionLoading(true);
                      try {
                        const res = await fetch(`${API_URL}/tickets`, { method: 'POST', headers: getAuthHeader(), body: JSON.stringify(newTicket), credentials: 'include' });
                        if (!res.ok) throw new Error('Network failure');
                        const data = await res.json();
                        setTickets([data.ticket, ...tickets]);
                        setShowTicketModal(false);
                        setNewTicket({ subject: '', message: '' });
                      } catch (e) { alert('Transmission failed'); } finally { setActionLoading(false); }
                    }} className="flex-1 py-5 bg-white text-black border-2 border-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-gray-50 transition-all">Send Message</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        <PlanSelectionModal
          isOpen={showPlanModal && !!selectedServiceForPlan}
          onClose={() => setShowPlanModal(false)}
          serviceName={selectedServiceForPlan?.name || ''}
        />

        {
          showRoadmapModal && viewingRoadmapService && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
              <div className="bg-white rounded-[2.5rem] max-w-xl w-full p-6 md:p-10 shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-[#0b1f3a] tracking-tight">Service Lifecycle</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Real-time status tracking</p>
                  </div>
                  <button onClick={() => setShowRoadmapModal(false)}><XCircle className="w-8 h-8 text-gray-100 hover:text-gray-200 transition-colors" /></button>
                </div>
                <div className="space-y-10">
                  <div className="flex items-start gap-6 relative">
                    <div className="absolute left-[23px] top-12 bottom-[-40px] w-0.5 bg-gray-100"></div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${viewingRoadmapService.status === 'COMPLETED' ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 'bg-primary text-black shadow-primary/20 animate-pulse'}`}>
                      {viewingRoadmapService.status === 'COMPLETED' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current State</h4>
                      <p className="text-xl font-black text-[#0b1f3a] tracking-tight">{viewingRoadmapService.status.replace('_', ' ')}</p>
                      <p className="text-xs font-bold text-gray-400 mt-2 max-w-[300px]">Our operational team is active on this node. Updates are pushed synchronously with manual verification.</p>
                    </div>
                  </div>
                  <div className="pt-10 border-t border-gray-50">
                    <button onClick={() => setShowRoadmapModal(false)} className="w-full py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#0b1f3a] hover:bg-gray-100 transition-all">Close Lifecycle View</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {
          uploadingFile && (
            <div className="fixed bottom-6 right-6 bg-white border border-gray-200 rounded-xl shadow-lg px-5 py-4 z-50 flex items-center gap-3">
              <Loader className="animate-spin text-indigo-600 w-5 h-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Uploading document...</p>
                <p className="text-xs text-gray-500 mt-0.5">Please wait</p>
              </div>
            </div>
          )
        }
        {/* Sidebar - Mobile (Slide-over) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 lg:hidden backdrop-blur-sm"
                style={{ zIndex: 9998, background: 'rgba(0,0,0,0.55)' }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                transition={{ type: 'spring', bounce: 0.1, duration: 0.35 }}
                className="fixed inset-y-0 left-0 w-[280px] flex flex-col shadow-2xl bg-white"
                style={{ zIndex: 9999, borderRight: '1px solid #EAECF0' }}
              >
                {/* Logo */}
                <div className="px-4 pt-5 pb-4 flex items-center justify-between shrink-0 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-gray-900 leading-tight tracking-[-0.02em]">CA Portal</p>
                      <p className="text-[11px] font-semibold text-indigo-500 tracking-[0.08em] uppercase leading-tight">Growth Platform</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {/* Nav */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] px-3 pt-1 pb-2">Main</p>
                  <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} layoutSuffix="mobile" />
                  <NavItem id="billing" label="Billing & Services" icon={CreditCard} badgeColor="red" layoutSuffix="mobile"
                    badge={userServices.filter(s => s.status === 'PENDING_PAYMENT').length || undefined} />
                  <NavItem id="calendar" label="Compliance" icon={CalendarIcon} badgeColor="amber" layoutSuffix="mobile" />

                  <div className="mt-6 mb-2 px-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gray-100" />
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] shrink-0">Resources</p>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <NavItem id="services" label="Browse Services" icon={Package} layoutSuffix="mobile" />
                  <NavItem id="documents" label="Documents" icon={FileText} layoutSuffix="mobile" />
                  <NavItem id="reports" label="Reports" icon={FileBarChart} layoutSuffix="mobile" />

                  <div className="mt-6 mb-2 px-3 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gray-100" />
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.14em] shrink-0">Support</p>
                    <div className="h-px flex-1 bg-gray-100" />
                  </div>
                  <NavItem id="renewals" label="Renewals" icon={TrendingUp} badgeColor="amber" layoutSuffix="mobile"
                    badge={renewals.filter(r => r.status === 'EXPIRING_SOON' || r.status === 'EXPIRED').length || undefined} />
                  <NavItem id="va-portal" label="Virtual Assistance" icon={Zap} layoutSuffix="mobile" />
                  <NavItem id="tickets" label="Support Tickets" icon={MessageSquare} badgeColor="red" layoutSuffix="mobile"
                    badge={tickets.filter(t => t.status === 'OPEN').length || undefined} />
                  {/* Bottom breathing room */}
                  <div className="h-4" />
                </nav>
                {/* User */}
                <div className="p-4 border-t border-gray-100 shrink-0">
                  <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 hover:bg-indigo-50/60 border border-gray-100 hover:border-indigo-100 transition-all cursor-pointer group"
                    onClick={() => navigate(`/dashboard/users/profile/${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'user'}`)}>
                    <div className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-sm shrink-0"
                      style={{ background: 'linear-gradient(135deg, #6366F1, #4F46E5)', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}>
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">{user?.name}</p>
                      <p className="text-[11px] text-indigo-400 font-medium truncate leading-tight">My Account</p>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); handleLogout(); setMobileMenuOpen(false); }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Sign out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};









