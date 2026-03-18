import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LogOut, Plus, ShoppingCart, FileText, Ticket, Settings, User,
  Upload, CreditCard, CheckCircle, Clock, XCircle, Download, Eye,
  AlertCircle, TrendingUp, Package, Loader, Map, ChevronRight, MessageSquare, Trash2,
  Calendar as CalendarIcon, FileBarChart, LayoutDashboard, Menu, X, Shield, Search,
  Zap, ShieldCheck, DollarSign
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { UniversalServicePanel } from './UniversalServicePanel';
import api from '../../utils/api';

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
  userId: number;
  serviceId: number;
  status: string;
  createdAt: string;
  service: Service;
  documents?: Document[];
  price?: number;
  planName?: string;
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
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'documents' | 'reports' | 'calendar' | 'tickets' | 'billing' | 'va-portal' | 'workspaces'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [reportsSearchQuery, setReportsSearchQuery] = useState('');
  const [reportsCategoryFilter, setReportsCategoryFilter] = useState('all');
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
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Synchronizing session...</p>
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
      const [servicesRes, userServicesRes, docsRes, statsRes, ticketsRes, methodsRes, reportsRes] = await Promise.all([
        api.get('/services/categories'),
        api.get('/services/my-services'),
        api.get('/documents/my-documents'),
        api.get('/dashboard/user'),
        api.get('/tickets/my-tickets'),
        api.get('/payments/methods'),
        api.get('/documents/my-reports')
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
    setShowPaymentModal(true);
  };

  const handleViewRoadmap = (userService: UserService) => {
    setViewingRoadmapService(userService);
    setShowRoadmapModal(true);
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

  const handleChoosePlan = async (service: Service) => {
    setSelectedServiceForPlan(service);
    setShowPlanModal(true);
    
    if (servicePlanData[service.id]) {
      setAvailablePlans(servicePlanData[service.id]);
      return;
    }

    setLoadingPlans(true);

    try {
      const response = await api.get(`/services/${service.id}/plans`);
      const data = response.data;
      const plans = data.plans || data || [];
      setAvailablePlans(plans);
      setServicePlanData(prev => ({ ...prev, [service.id]: plans }));
    } catch (error) {
      console.error('Failed to load plans:', error);
      setAvailablePlans([]);
    } finally {
      setLoadingPlans(false);
    }
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
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-outfit">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-[#136da1]/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#136da1] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#136da1] animate-pulse" />
            </div>
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Accessing CA Workspace</h2>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Secure Connection • Encrypted</p>
        </div>
      </div>
    );
  }

  // Derived Data for Views — use admin-uploaded reports from /my-reports endpoint,
  // falling back to filename-based filter from general documents
  const reportDocuments = (reports.length > 0 ? reports : documents.filter(doc =>
    doc.fileType === 'REPORT' ||
    doc.fileName?.toLowerCase().includes('report') ||
    doc.fileName?.toLowerCase().includes('final')
  )).map((doc: any) => ({
    ...doc,
    // Normalise download URL — backend stores `filePath`, UI needs absolute URL
    // Normalise download URL — backend stores `filePath`, UI needs absolute proxy URL for R2/Decryption
    url: doc.url || (doc.filePath ? `${import.meta.env.VITE_API_BASE_URL}/files/${doc.filePath.replace(/^\//, '')}` : '#')
  }));

  const NavItem = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => { setActiveTab(id); setMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold mb-1 group
        ${activeTab === id
          ? 'bg-white text-black shadow-sm border border-gray-100'
          : 'text-gray-900 hover:text-black hover:bg-gray-50'
        }`}
    >
      <div className={`p-1.5 rounded-lg transition-colors ${activeTab === id ? 'bg-primary text-black' : 'bg-gray-100 text-gray-400 group-hover:bg-[#E2E8F0] group-hover:text-primary'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-sm">{label}</span>
      {activeTab === id && (
        <div className="w-1 h-4 bg-primary rounded-full ml-auto shadow-[0_0_8px_rgba(19,109,161,0.5)]"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-outfit overflow-hidden">
      {/* Sidebar - Desktop (Persistent) */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col shrink-0 h-screen overflow-hidden">
        <div className="h-20 flex items-center px-8 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#136da1] to-[#0b1f3a] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Shield className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="text-black font-black text-sm tracking-tight block leading-none mb-0.5">CA PORTAL</span>
              <span className="text-gray-400 text-[8px] font-black uppercase tracking-[0.1em]">Premium Workspace</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-8">
            <div>
              <p className="px-4 text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-4">Core Panel</p>
              <NavItem id="dashboard" label="Overview" icon={LayoutDashboard} />
              <NavItem id="billing" label="Billing & Services" icon={CreditCard} />
              <NavItem id="calendar" label="Compliance" icon={CalendarIcon} />
            </div>

            <div>
              <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Resources</p>
              <NavItem id="services" label="Browse Services" icon={Package} />
              <NavItem id="documents" label="Documents" icon={FileText} />
              <NavItem id="reports" label="Shared Reports" icon={FileBarChart} />
            </div>

            <div>
              <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Assistance</p>
              <NavItem id="va-portal" label="Virtual Assistance" icon={Zap} />
              <NavItem id="tickets" label="Ask an Expert" icon={MessageSquare} />
              <NavItem id="workspaces" label="Service Workspaces" icon={FileText} />
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-gray-100 bg-white shrink-0">
          <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-200 hover:border-primary/30 transition-all group cursor-pointer" onClick={() => navigate(`/dashboard/users/profile/${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'user'}`)}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center font-black text-black shadow-sm group-hover:text-black group-hover:bg-primary transition-all">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-black font-black text-xs truncate">{user?.name}</p>
                <p className="text-gray-500 text-[10px] font-bold truncate">Premium Client</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl w-full transition-all group font-black text-xs uppercase tracking-widest">
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Secure Exit</span>
          </button>
        </div>
      </aside>



      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 h-20 md:h-24 px-6 md:px-12 flex items-center justify-between shrink-0 sticky top-0 z-40 transition-all">
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 bg-white hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 shadow-sm">
              <Menu className="w-5 h-5 md:w-6 md:h-6 text-[#0b1f3a]" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 bg-[#ee7228] rounded-full"></div>
                <span className="text-[10px] font-black text-[#ee7228] uppercase tracking-[0.2em]">Secure Node</span>
              </div>
              <h1 className="text-2xl font-black text-[#0b1f3a] tracking-tight capitalize leading-none">
                {activeTab === 'dashboard' ? 'Overview' : activeTab.replace('-', ' ')}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center relative px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-400 text-sm gap-4 w-72 lg:w-96 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary/20 transition-all shadow-inner">
              <Search className="w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Quick find services or docs..."
                className="bg-transparent border-none outline-none w-full text-[#0b1f3a] font-bold placeholder:text-gray-400 placeholder:font-medium"
                value={globalSearchQuery}
                onChange={(e) => {
                  setGlobalSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onFocus={() => globalSearchQuery.length > 0 && setShowSearchResults(true)}
              />

              {/* Search Results Dropdown */}
              {showSearchResults && globalSearchQuery && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setShowSearchResults(false)}></div>
                  <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 max-h-[400px] overflow-y-auto z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-6 pb-2 mb-2 border-b border-gray-50 flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Matched Intelligences</span>
                      <button onClick={() => setShowSearchResults(false)}><X className="w-3 h-3 text-gray-300 hover:text-gray-600" /></button>
                    </div>

                    {(() => {
                      const query = globalSearchQuery.toLowerCase();

                      const filteredServices = services.filter(s =>
                        s.name.toLowerCase().includes(query) ||
                        s.description.toLowerCase().includes(query)
                      );

                      const categoryMatchedServices = categories
                        .filter(c => c.name.toLowerCase().includes(query))
                        .flatMap(c => (c.services || []).map(s => ({ ...s, categoryName: c.name })))
                        .filter(s => !filteredServices.find(fs => fs.id === s.id));

                      const combined = [
                        ...filteredServices.map(s => ({ ...s, categoryName: categories.find(c => (c.services || []).some(cs => cs.id === s.id))?.name })),
                        ...categoryMatchedServices
                      ];

                      if (combined.length === 0) {
                        return (
                          <div className="px-6 py-8 text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">No nodes found matching your query</p>
                          </div>
                        );
                      }

                      return combined.map(service => (
                        <button
                          key={service.id}
                          onClick={() => {
                            handleChoosePlan(service);
                            setGlobalSearchQuery('');
                            setShowSearchResults(false);
                          }}
                          className="w-full px-6 py-4 hover:bg-gray-50 text-left transition-colors flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-black transition-colors">
                              <Package className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-[#0b1f3a]">{service.name}</p>
                              {service.categoryName && (
                                <p className="text-[8px] font-black text-primary uppercase tracking-widest mt-0.5">{service.categoryName}</p>
                              )}
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4 text-primary" />
                          </div>
                        </button>
                      ));
                    })()}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-4 p-1.5 bg-white hover:bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all pr-4 group"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-[#136da1] to-[#0b1f3a] rounded-[14px] flex items-center justify-center text-black font-black shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[11px] font-black text-[#0b1f3a] leading-none mb-1 uppercase tracking-wider">{user?.name?.split(' ')[0]}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Active Client</p>
                </div>
                <div className="hidden lg:block w-px h-6 bg-gray-100 mx-1"></div>
                <ChevronRight className={`hidden lg:block w-4 h-4 text-gray-300 transition-transform duration-300 ${showProfileMenu ? 'rotate-90' : ''}`} />
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)}></div>
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 z-50 py-5 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-8 py-5 border-b border-gray-50 mb-3 bg-white">
                      <p className="font-black text-gray-900 truncate tracking-tight">{user?.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate mt-1">{user?.email}</p>
                    </div>
                    <div className="px-3 space-y-1">
                      <button onClick={() => { navigate(`/dashboard/users/profile/${user?.name?.replace(/\s+/g, '-').toLowerCase() || 'user'}`); setShowProfileMenu(false); }} className="w-full flex items-center gap-4 px-5 py-3.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary rounded-2xl transition-all group font-bold">
                        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <span>Identity Profile</span>
                      </button>
                      <button onClick={() => { setShowRoadmapModal(true); setShowProfileMenu(false); }} className="w-full flex items-center gap-4 px-5 py-3.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary rounded-2xl transition-all group font-bold">
                        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Shield className="w-4 h-4" />
                        </div>
                        <span>Security Check</span>
                      </button>
                      <button onClick={() => { setActiveTab('tickets'); setShowProfileMenu(false); }} className="w-full flex items-center gap-4 px-5 py-3.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary rounded-2xl transition-all group font-bold">
                        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span>Preferences</span>
                      </button>
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 px-3">
                      <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-4 text-sm text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black uppercase tracking-widest text-[10px]">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out Workspace</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-14 custom-scrollbar bg-[#F1F5F9]/50">
          <div className="max-w-7xl mx-auto">
            {error && (
              <div className="mb-10 bg-red-50 border border-red-100 text-red-700 px-8 py-5 rounded-[2rem] flex items-center gap-4 shadow-xl shadow-red-500/5 animate-in slide-in-from-top-4 duration-500">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-black shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-black text-sm">Synchronisation Error</p>
                  <p className="text-xs text-red-500/70 font-medium">{error}</p>
                </div>
                <button onClick={fetchData} className="ml-auto px-6 py-2.5 bg-[#0b1f3a] text-black rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Retry Link</button>
              </div>
            )}

            {/* DASHBOARD VIEW CONTENT */}

            {/* UNIVERSAL WORKSPACE VIEW */}
            {activeTab === 'workspaces' && (
              <UniversalServicePanel
                onInitiatePayment={(service) => {
                  setSelectedService(service);
                  setShowPaymentModal(true);
                }}
                initialServices={userServices}
              />
            )}

            {/* VIRTUAL ASSISTANCE PORTAL VIEW */}
            {activeTab === 'va-portal' && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
                {/* VA Hero Section */}
                <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0b1f3a] to-[#136da1] p-10 md:p-16 text-white shadow-2xl">
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
                        <p className="text-2xl font-black text-white">84%</p>
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
                          <h3 className="text-2xl font-black text-white tracking-tight mb-2">Pro Website Builder</h3>
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
                            <p className="text-lg font-black text-white">Elite Corporate V4</p>
                            <div className="mt-6 flex gap-2">
                              <button className="flex-1 py-3 bg-primary text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Edit Site</button>
                              <button className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
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
              <div className="space-y-8 md:space-y-12 pb-16">
                {/* Greeting Section */}
                <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 md:p-16 text-black shadow-xl border border-gray-100">
                  <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/5 rounded-full -mr-40 md:-mr-80 -mt-40 md:-mt-80 blur-[130px]"></div>
                  <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-orange-500/5 rounded-full -ml-20 md:-ml-40 -mb-20 md:-mb-40 blur-[110px]"></div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                    <div className="lg:col-span-8 space-y-6 md:space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-400 shadow-sm">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        Verified Digital Node
                      </div>
                      <h2 className="text-2xl md:text-6xl font-black tracking-tight leading-[1.2] md:leading-[1.05] text-[#0b1f3a]">
                        Excellence In <br />
                        <span className="text-[#136da1]">Accounting Governance</span>
                      </h2>
                      <p className="text-gray-500 font-medium max-w-xl text-sm md:text-base leading-relaxed">
                        Deploy your professional assets, monitor compliance metrics, and collaborate with your elite CA squad through our encrypted decentralized workspace.
                      </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3">
                      <button onClick={() => setActiveTab('services')} className="flex-1 group p-4 bg-primary text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10 hover:bg-[#0b1f3a] hover:text-black transition-all flex items-center justify-between overflow-hidden relative">
                        <span className="relative z-10">Initiate Service</span>
                        <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center transition-colors">
                          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                        </div>
                      </button>
                      <button onClick={() => setActiveTab('tickets')} className="flex-1 p-4 bg-gray-50 border border-gray-100 text-[#0b1f3a] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-between group">
                        <span>Direct Support</span>
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:text-primary transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>


                {/* Stats Cards Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-[#ee7228] rounded-full"></div>
                    <h3 className="text-lg font-black text-[#0b1f3a] uppercase tracking-wider">Performance Analytics</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Active Projects', value: stats?.active ?? 0, icon: ShoppingCart, color: 'from-blue-500 to-[#136da1]' },
                      { label: 'Completed Files', value: stats?.completed ?? 0, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
                      { label: 'Shared Reports', value: reportDocuments.length, icon: FileBarChart, color: 'from-purple-500 to-purple-600' },
                      { label: 'Pending Action', value: userServices.filter(s => s?.status === 'NEED_DOCUMENTS').length, icon: Upload, color: 'from-[#ee7228] to-orange-600' },
                    ].map((stat, i) => (
                      <div key={i} className="group bg-white rounded-[2rem] p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-center text-center">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-4 text-black shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-6`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                          <h3 className="text-3xl font-black text-[#0b1f3a] tracking-tighter">{(stat.value ?? 0).toString().padStart(2, '0')}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity List */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-6 bg-[#136da1] rounded-full"></div>
                      <h3 className="text-lg font-black text-[#0b1f3a] uppercase tracking-wider">Recent Activity</h3>
                    </div>
                    <button onClick={() => setActiveTab('billing')} className="px-6 py-2.5 bg-white border border-gray-200 text-[#0b1f3a] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">Detailed Ledger</button>
                  </div>

                  {expandedServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {expandedServices.slice(0, 6).map(svc => (
                        <div key={(svc as any).displayId || svc.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group h-full">
                          <div className="flex justify-between items-start mb-6">
                            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black border ${getStatusColor(svc.status)} uppercase tracking-widest`}>
                              {svc.status.replace('_', ' ')}
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">{new Date(svc.createdAt).toLocaleDateString()}</span>
                          </div>

                          <h4 className="text-lg font-black text-[#0b1f3a] mb-3 tracking-tight group-hover:text-primary transition-colors">
                            {svc.service?.name} 
                            {(svc as any).instanceNumber && (
                              <span className="text-xs text-gray-400 ml-2 italic">#{ (svc as any).instanceNumber }</span>
                            )}
                          </h4>
                          <div className="flex flex-col gap-1 mb-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {svc.planName && (
                                  <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">
                                    {svc.planName} Plan
                                  </span>
                                )}
                              </div>
                              <span className="text-sm font-black text-[#0b1f3a]">
                                ₹{Number(svc.price || 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed line-clamp-2">{svc.service?.description}</p>

                          <div className="mt-auto pt-6 border-t border-gray-50 flex gap-3">
                            {svc.status === 'NEED_DOCUMENTS' && (
                              <button
                                onClick={() => setActiveTab('workspaces')}
                                className="flex-1 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0b1f3a] hover:text-black transition-all shadow-lg shadow-blue-500/10 active:scale-95"
                              >
                                Open Workspace
                              </button>
                            )}
                            {svc.status === 'PENDING_PAYMENT' && (
                              <button
                                onClick={() => { setSelectedService({ ...svc.service, orderId: svc.orderId, price: svc.price }); setShowPaymentModal(true); }}
                                className="flex-1 py-4 bg-[#ee7228] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0b1f3a] hover:text-black transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                                Pay Dues
                              </button>
                            )}
                            <button
                              onClick={() => handleViewRoadmap(svc)}
                              className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl hover:bg-primary hover:text-black transition-all flex items-center justify-center shrink-0 border border-gray-100"
                              title="View Roadmap"
                            >
                              <Map className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(svc.id)}
                              className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-black transition-all flex items-center justify-center shrink-0 border border-red-100"
                              title="Delete Service"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                      <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100">
                        <Package className="w-8 h-8 text-gray-300" />
                      </div>
                      <h4 className="text-lg font-black text-[#0b1f3a] mb-2">Vault is Empty</h4>
                      <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest mb-8">Start your first service to see activity records</p>
                      <button onClick={() => setActiveTab('services')} className="px-10 py-4 bg-primary text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-[#0b1f3a] transition-all">Select Service</button>
                    </div>
                  )}
                </div>
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

            {/* SERVICES VIEW */}
            {activeTab === 'services' && (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
                {/* Search & Filter Header */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-[#0b1f3a] tracking-tight">Service Directory</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Explore and initiate professional modules</p>
                  </div>
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for a specific service..."
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:border-primary focus:bg-white transition-all font-bold text-sm"
                      value={globalSearchQuery}
                      onChange={(e) => setGlobalSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {categories.length > 0 ? (
                  categories.map((category) => {
                    const filteredServices = category.services.filter(s =>
                      s.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
                      s.description.toLowerCase().includes(globalSearchQuery.toLowerCase())
                    );

                    if (globalSearchQuery && filteredServices.length === 0) return null;

                    return (
                      <div key={category.id} className="space-y-8">
                        <div className="flex items-center gap-4 ml-4">
                          <div className="w-1.5 h-8 bg-primary rounded-full"></div>
                          <div>
                            <h4 className="text-lg font-black text-[#0b1f3a] uppercase tracking-wider">{category.name}</h4>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{category.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {filteredServices.map(service => (
                            <div key={service.id} className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group h-full relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

                              <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100 group-hover:bg-[#0b1f3a] transition-all duration-500">
                                    <Package className="w-7 h-7 text-[#0b1f3a] group-hover:text-primary transition-colors" />
                                  </div>
                                  <h5 className="text-xl font-black text-[#0b1f3a] tracking-tight mb-3 group-hover:text-primary transition-colors leading-tight">{service.name}</h5>
                                  <p className="text-sm text-gray-400 font-medium leading-relaxed line-clamp-3">{service.description}</p>
                                </div>

                                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between gap-4">
                                  <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Starting from</span>
                                    <span className="text-lg font-black text-[#0b1f3a]">
                                      {service.price && Number(service.price) > 0 ? `₹${Number(service.price).toLocaleString()}` : 'Custom'}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => handleChoosePlan(service)}
                                    className="px-6 py-4 bg-[#0b1f3a] text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/10 hover:bg-primary hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                  >
                                    <ShoppingCart className="w-4 h-4" /> Initiate
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
                    <div className="relative w-20 h-20 mb-8">
                      <div className="absolute inset-0 border-4 border-[#136da1]/10 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-[#136da1] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h4 className="text-xl font-black text-[#0b1f3a] mb-2 tracking-tight">Syncing Service Registry</h4>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Retrieving latest compliance modules...</p>
                  </div>
                )}
              </div>
            )}

            {/* DOCUMENTS VIEW */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xl">All Documents</h3>
                      <p className="text-sm text-gray-500">Manage your uploaded files and receipts.</p>
                    </div>
                    <div className="flex gap-2">
                      <select
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-primary outline-none"
                        value={uploadServiceId}
                        onChange={(e) => setUploadServiceId(e.target.value)}
                      >
                        <option value="">Select Service to Upload</option>
                        {userServices.filter(s => s.status !== 'CANCELLED').map(s => (
                          <option key={s.id} value={s.id}>{s.service.name}</option>
                        ))}
                      </select>
                      <label className={`px-4 py-2 bg-black text-black rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer
                           ${!uploadServiceId || uploadingFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}>
                        {uploadingFile ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <span>Upload</span>
                        <input type="file" className="hidden" disabled={!uploadServiceId || uploadingFile} onChange={(e) => handleFileUpload(e, parseInt(uploadServiceId))} accept=".pdf,.png,.jpg" />
                      </label>
                    </div>
                  </div>
                </div>

                {documents.length > 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden overflow-x-auto">
                    <table className="w-full min-w-[600px] text-sm text-left">
                      <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Service</th>
                          <th className="px-6 py-4">Investment</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {documents.map(doc => (
                          <tr key={doc.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-50 text-primary rounded flex items-center justify-center">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <span className="font-medium text-gray-900">{doc.fileName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="font-black text-[#0b1f3a] text-sm">
                                  {doc.userService?.service?.name || doc.order?.items?.[0]?.serviceName || 'General'}
                                </span>
                                {(doc.order?.items?.[0]?.planType || (doc.userService as any)?.planType) && (
                                  <span className="text-[9px] font-black text-primary uppercase tracking-widest mt-1 inline-flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                    {doc.order?.items?.[0]?.planType || (doc.userService as any)?.planType} Plan
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-black text-[#0b1f3a]">
                                {Number(doc.order?.items?.[0]?.price || doc.userService?.price || 0) > 0 && `₹${Number(doc.order?.items?.[0]?.price || doc.userService?.price || 0).toLocaleString('en-IN')}`}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <a href={doc.url} target="_blank" rel="noreferrer" className="text-primary hover:text-black font-medium text-xs border border-primary/20 px-3 py-1 rounded-md hover:bg-primary hover:border-primary transition">
                                Download
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-20 text-gray-400">No documents found.</div>
                )}
              </div>
            )}

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
                                className="px-6 py-3.5 bg-[#0b1f3a] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/10 hover:bg-primary hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
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
              activeTab === 'billing' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                      <div>
                        <h3 className="text-2xl font-black text-[#0b1f3a] tracking-tight">Billing & Subscriptions</h3>
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Full transaction history and service status</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                        {/* Paid Services Card */}
                        <div className="group relative bg-[#0b1f3a] rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                          <div className="flex items-center gap-5 relative z-10">
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                              <CheckCircle className="w-7 h-7" />
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-emerald-500/60 uppercase tracking-[0.2em] mb-1.5">Paid Services</p>
                              <div className="flex flex-col">
                                <span className="text-3xl font-black text-black leading-none mb-2">{userServices.filter(s => s.status === 'ACTIVE' || s.status === 'COMPLETED').length.toString().padStart(2, '0')}</span>
                                <span className="text-[11px] font-bold text-black/40 italic">Investment: ₹{userServices.filter(s => s.status === 'ACTIVE' || s.status === 'COMPLETED').reduce((acc, curr) => acc + (curr.price || 0), 0).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Pending Services Card */}
                        <div className="group relative bg-white rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-xl border border-gray-100 transition-all duration-500 hover:scale-[1.02]">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7228]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                          <div className="flex items-center gap-5 relative z-10">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ee7228] shrink-0">
                              <Clock className="w-7 h-7" />
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Pending Services</p>
                              <div className="flex flex-col">
                                <span className="text-3xl font-black text-[#0b1f3a] leading-none mb-2">{userServices.filter(s => s.status === 'PENDING_PAYMENT' || s.status === 'PENDING_VERIFICATION' || s.status === 'NEED_DOCUMENTS').length.toString().padStart(2, '0')}</span>
                                <span className="text-[11px] font-bold text-gray-400 italic">Dues: ₹{userServices.filter(s => s.status === 'PENDING_PAYMENT').reduce((acc, curr) => acc + (curr.price || 0), 0).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <br />
                    <br />

                    {/* Main Tableservices block  */}
                    <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 custom-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="border-b border-gray-50">
                            <th className="px-4 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Service Insight</th>
                            <th className="px-4 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Purchase Date</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Qty</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Investment</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Service Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Payment Node</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {expandedServices.map(svc => (
                            <tr key={(svc as any).displayId || svc.id} className="group hover:bg-gray-50/50 transition-colors">
                              <td className="px-4 md:px-8 py-6">
                                <div className="flex flex-col">
                                  <span className="text-sm font-black text-[#0b1f3a] group-hover:text-primary transition-colors">
                                    {svc.service?.name}
                                    {(svc as any).instanceNumber && (
                                      <span className="text-xs text-gray-400 ml-2 italic">#{ (svc as any).instanceNumber }</span>
                                    )}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">ID: #{svc.orderId}</span>
                                    {svc.planName && (
                                      <>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-blue-50 px-1.5 py-0.5 rounded">
                                          {svc.planName} Plan
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 md:px-8 py-6">
                                <span className="text-sm text-gray-500 font-medium">{new Date(svc.createdAt).toLocaleDateString()}</span>
                              </td>
                              <td className="px-4 md:px-8 py-6">
                                <span className="text-sm font-black text-[#0b1f3a]">1</span>
                              </td>
                              <td className="px-4 md:px-8 py-6">
                                <div className="flex flex-col">
                                  <span className="text-sm font-black text-[#0b1f3a]">₹{Number(svc.price || 0).toLocaleString()}</span>
                                </div>
                              </td>
                              <td className="px-4 md:px-8 py-6">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black border ${getStatusColor(svc.status)} uppercase tracking-widest`}>
                                  {getStatusIcon(svc.status)}
                                  {svc.status.replace('_', ' ')}
                                </div>
                              </td>
                              <td className="px-4 md:px-8 py-6">
                                {['ACTIVE', 'COMPLETED', 'PENDING_VERIFICATION'].includes(svc.status) ? (
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Linked / Paid</span>
                                    <span className="text-[9px] font-bold text-gray-400 mt-0.5">Verified Transaction</span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Awaiting Link</span>
                                    <span className="text-[9px] font-bold text-gray-400 mt-0.5">Pending Settlement</span>
                                  </div>
                                )}
                              </td>
                              <td className="px-4 md:px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {svc.status === 'PENDING_PAYMENT' && (
                                    <button
                                      onClick={() => { setSelectedService({ ...svc.service, orderId: svc.orderId, price: svc.price }); setShowPaymentModal(true); }}
                                      className="p-2.5 bg-[#ee7228] text-white rounded-xl hover:bg-[#0b1f3a] transition-all shadow-lg shadow-orange-500/10 active:scale-95"
                                      title="Complete Payment"
                                    >
                                      <CreditCard className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleViewRoadmap(svc)}
                                    className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-primary hover:text-black transition-all active:scale-95 border border-gray-100"
                                    title="Trace Roadmap"
                                  >
                                    <Map className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteService(svc.id)}
                                    className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 border border-red-100"
                                    title="Retract Service"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {userServices.length === 0 && (
                      <div className="text-center py-24 bg-gray-50/20 rounded-[3rem] border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100 shadow-sm">
                          <CreditCard className="w-10 h-10 text-gray-200" />
                        </div>
                        <h4 className="text-xl font-black text-[#0b1f3a] mb-2 tracking-tight">Ledger Silent</h4>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest max-w-xs mx-auto leading-relaxed">No transactions found. Purchase a service to activate billing.</p>
                      </div>
                    )}
                  </div>
                </div>
              )
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
          </div>
        </main>

        {/* RETAINED MODALS */}
        {
          showPaymentModal && selectedService && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative shadow-blue-500/10 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar flex-1 relative">
                  <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-[#0b1f3a] tracking-tight">Financial Checkout</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Order Ref: #{selectedService.orderId}</p>
                    </div>
                    <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><XCircle className="w-6 h-6 text-gray-300" /></button>
                  </div>

                  {(() => {
                    const basePrice = Number(selectedService.price) || 0;
                    const gstAmount = Math.round(basePrice * 0.18);
                    const grandTotal = basePrice + gstAmount;
                    return (
                      <div className="mb-6 rounded-2xl overflow-hidden shadow-xl shadow-blue-900/10">
                        {/* Service name header */}
                        <div className="p-5 bg-[#0b1f3a] text-black">
                          <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Service Allocation</p>
                          <p className="text-base md:text-lg font-black tracking-tight text-black">{selectedService.name}</p>
                        </div>
                        {/* Price breakdown */}
                        <div className="bg-[#0f2844] px-5 py-4 space-y-2.5">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-blue-300/80 uppercase tracking-widest">Base Amount</span>
                            <span className="text-sm font-black text-black">₹{basePrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-yellow-300/80 uppercase tracking-widest">GST @ 18%</span>
                            <span className="text-sm font-black text-yellow-300">+ ₹{gstAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center border-t border-blue-800/50 pt-3 mt-1">
                            <span className="text-[11px] font-black text-black uppercase tracking-widest">Grand Total</span>
                            <span className="text-2xl md:text-3xl font-black text-black">₹{grandTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="space-y-3 mb-6">
                    <label className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPaymentMethod === 'manual_qr' ? 'border-primary bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPaymentMethod === 'manual_qr' ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                          {selectedPaymentMethod === 'manual_qr' && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-sm font-black text-[#0b1f3a] uppercase tracking-widest">Bank QR Protocol</span>
                          <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">Instant scan & proof upload</p>
                        </div>
                        <input type="radio" checked={selectedPaymentMethod === 'manual_qr'} onChange={() => setSelectedPaymentMethod('manual_qr')} className="hidden" />
                      </div>
                    </label>
                    {selectedPaymentMethod === 'manual_qr' && (
                      <div className="mt-4 pl-9 animate-fade-in transition-all">
                        <div className="p-3 bg-white rounded-xl border-2 border-primary/30 border-dashed relative group">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) setPaymentProofFile(file);
                            }}
                            className="w-full text-[10px] font-black uppercase text-gray-400 cursor-pointer file:cursor-pointer file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-[#0b1f3a] file:text-white hover:file:bg-primary transition-all relative z-10"
                          />
                        </div>
                      </div>
                    )}
                    <label className={`block p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPaymentMethod === 'pay_later' ? 'border-[#136da1] bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedPaymentMethod === 'pay_later' ? 'border-[#136da1] bg-[#136da1]' : 'border-gray-300'}`}>
                          {selectedPaymentMethod === 'pay_later' && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-sm font-black text-[#0b1f3a] uppercase tracking-widest">Post-Settlement</span>
                          <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-widest">Commit now, remit later</p>
                        </div>
                        <input type="radio" checked={selectedPaymentMethod === 'pay_later'} onChange={() => setSelectedPaymentMethod('pay_later')} className="hidden" />
                      </div>
                    </label>
                  </div>

                  {/* SUBMIT FOOTER */}
                  <div className="shrink-0 px-5 pb-5 pt-4 bg-white border-t border-gray-100">
                    <button
                      onClick={handlePayment}
                      disabled={actionLoading}
                      className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl"
                      style={{ background: 'linear-gradient(135deg, #0b1f3a 0%, #1a6fa8 100%)' }}
                    >
                      {actionLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                      {selectedPaymentMethod === 'pay_later' ? 'Authorize Order - Pay Later' : 'Submit Payment - Pay Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {
          showTicketModal && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-[2.5rem] max-w-lg w-full p-6 md:p-10 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-[#0b1f3a] tracking-tight">Initiate Support Node</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Standard response time: &lt; 24 hours</p>
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
                    }} className="flex-1 py-5 bg-[#0b1f3a] text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10 hover:bg-[#ee7228] transition-all">Send Message</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {
          showPlanModal && selectedServiceForPlan && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-3">
              <div className="bg-white rounded-3xl w-full max-w-[95vw] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-gray-100">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center shrink-0 bg-gradient-to-r from-[#0b1f3a] to-[#136da1]">
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Select Your Plan</h3>
                    <p className="text-xs font-bold text-blue-200 mt-1">{selectedServiceForPlan.name}</p>
                  </div>
                  <button onClick={() => setShowPlanModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X className="w-6 h-6 text-white" /></button>
                </div>

                {/* Plan Cards */}
                <div className="overflow-auto flex-1 p-8 bg-gray-50">
                  {loadingPlans ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                      <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <p className="text-sm font-bold text-gray-400">Loading available plans...</p>
                    </div>
                  ) : availablePlans.length === 0 ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-300" />
                      </div>
                      <p className="text-sm font-bold text-gray-400">No plans available for this service</p>
                      <button onClick={() => setShowPlanModal(false)} className="px-6 py-3 bg-[#0b1f3a] text-white rounded-xl font-bold text-sm">Close</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availablePlans.map((plan, index) => (
                        <div 
                          key={plan.id} 
                          className={`relative bg-white rounded-2xl border-2 transition-all hover:shadow-xl hover:-translate-y-1 ${
                            index === 1 ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-gray-100 hover:border-primary/30'
                          }`}
                        >
                          {index === 1 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#ee7228] to-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                              Most Popular
                            </div>
                          )}
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <span className="px-4 py-2 bg-[#0b1f3a] text-white rounded-xl text-xs font-black uppercase tracking-widest">
                                {plan.planType}
                              </span>
                              {plan.isRecommended && (
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-bold">Recommended</span>
                              )}
                            </div>
                            
                            <div className="mb-6">
                              <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-[#0b1f3a]">₹{Number(plan.discountedPrice || plan.price).toLocaleString()}</span>
                                {plan.discountedPrice && plan.discountedPrice < plan.price && (
                                  <>
                                    <span className="text-sm text-gray-300 line-through">₹{Number(plan.price).toLocaleString()}</span>
                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold">
                                      {Math.round((1 - plan.discountedPrice / plan.price) * 100)}% OFF
                                    </span>
                                  </>
                                )}
                              </div>
                              {plan.gstIncluded === false && (
                                <p className="text-[10px] text-gray-400 mt-1">* GST extra</p>
                              )}
                            </div>

                            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                              {plan.scopes?.map((scope: any, idx: number) => (
                                <div key={idx} className="flex items-start gap-3">
                                  {scope.isIncluded ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-gray-200 shrink-0 mt-0.5" />
                                  )}
                                  <span className={`text-sm ${scope.isIncluded ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                                    {scope.title}
                                  </span>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={() => handleSelectPlan(plan)}
                              disabled={actionLoading}
                              className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-md hover:shadow-lg ${
                                index === 1 
                                  ? 'bg-gradient-to-r from-[#ee7228] to-orange-500 text-white hover:from-orange-500 hover:to-orange-600' 
                                  : 'bg-[#0b1f3a] text-white hover:bg-primary'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {actionLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <Loader className="animate-spin w-4 h-4" /> Processing...
                                </span>
                              ) : (
                                'Select Plan'
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }

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
            <div className="fixed bottom-10 right-10 bg-[#0b1f3a] text-black rounded-3xl shadow-2xl px-8 py-5 z-50 animate-bounce-in flex items-center gap-4 border border-blue-800">
              <Loader className="animate-spin text-primary w-5 h-5" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Protocol Upload</p>
                <p className="text-[9px] font-bold text-blue-300 mt-0.5">Encrypting & Storing Intelligence...</p>
              </div>
            </div>
          )
        }
        {/* Sidebar - Mobile (Slide-over) */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 lg:hidden backdrop-blur-sm transition-opacity" style={{ zIndex: 9998 }} onClick={() => setMobileMenuOpen(false)} />
            <aside className="fixed inset-y-0 left-0 bg-white !bg-white w-72 flex flex-col border-r border-gray-200 animate-in slide-in-from-left duration-500 shadow-2xl" style={{ zIndex: 9999, backgroundColor: '#ffffff' }}>
              <div className="h-20 flex items-center justify-between px-6 bg-white border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-tr from-[#136da1] to-[#0b1f3a] rounded-xl flex items-center justify-center">
                    <Shield className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-[#0b1f3a] font-black text-sm tracking-tight">CA PORTAL</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <nav className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-8">
                  <div>
                    <p className="px-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Core Panel</p>
                    <NavItem id="dashboard" label="Overview" icon={LayoutDashboard} />
                    <NavItem id="billing" label="Billing & Services" icon={CreditCard} />
                    <NavItem id="calendar" label="Compliance" icon={CalendarIcon} />
                  </div>
                  <div>
                    <p className="px-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Resources</p>
                    <NavItem id="services" label="Browse Services" icon={Package} />
                    <NavItem id="documents" label="Documents" icon={FileText} />
                    <NavItem id="reports" label="Shared Reports" icon={FileBarChart} />
                  </div>
                  <div>
                    <p className="px-4 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Support</p>
                    <NavItem id="va-portal" label="Virtual Assistance" icon={Zap} />
                    <NavItem id="tickets" label="Ask an Expert" icon={MessageSquare} />
                  </div>
                </div>
              </nav>
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center font-black text-[#0b1f3a]">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-black font-black text-xs truncate">{user?.name}</p>
                    <p className="text-gray-400 text-[9px] font-bold">Workspace User</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
};









