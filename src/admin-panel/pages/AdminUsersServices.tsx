import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle2,
  XCircle,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Download,
  ShoppingBag,
  Plus,
  Edit2,
  Trash2,
  Tag,
  ListChecks,
  Loader2,
  DollarSign,
  Save,
  X,
  ChevronDown
} from "lucide-react";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../components/ui/utils";
import { toast } from "sonner";
import api from "../../utils/api";

// --- Types ---
interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
}

interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  isActive: boolean;
  categoryId: number;
  plans?: ServicePlan[];
}

interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  services: Service[];
}

interface ServicePlan {
  id?: number;
  planType: string;
  price: number;
  discountedPrice?: number;
  shortTitle?: string;
  scopeSummary?: string;
  isActive: boolean;
  scopes?: PlanScope[];
  displayOrder?: number;
}

interface PlanScope {
  id?: number;
  title: string;
  isIncluded: boolean;
}

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export const AdminUsersServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"users" | "services">("users");
  
  // --- Users State ---
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersSearch, setUsersSearch] = useState("");
  const [usersRole, setUsersRole] = useState("ALL");
  const [usersPagination, setUsersPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1
  });

  // --- Services State ---
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: ''
  });

  // --- Plans State ---
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [selectedServiceForPlans, setSelectedServiceForPlans] = useState<Service | null>(null);
  const [plans, setPlans] = useState<ServicePlan[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    else fetchCategories();
  }, [activeTab, usersPagination.page, usersRole]);

  // --- User Functions ---
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const params = new URLSearchParams({
        page: usersPagination.page.toString(),
        limit: usersPagination.limit.toString(),
        search: usersSearch,
        role: usersRole
      });

      const response = await api.get(`/admin/users?${params}`);
      const data = response.data;

      setUsers(data.users || []);
      const total = data.count || data.users?.length || 0;
      setUsersPagination(prev => ({
        ...prev,
        total,
        pages: Math.ceil(total / prev.limit) || 1
      }));
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  };

  // --- Service Functions ---
  const fetchCategories = async () => {
    try {
      setServicesLoading(true);
      const response = await api.get('/admin/categories');
      const data = response.data;
      setCategories(data.categories || []);
      
      const expanded = (data.categories || []).reduce((acc: any, cat: any) => ({
        ...acc, [cat.id]: true
      }), {});
      setExpandedCategories(expanded);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load services');
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchPlans = async (serviceId: number) => {
    try {
      setPlansLoading(true);
      const response = await api.get(`/admin/services/${serviceId}/plans`);
      const data = response.data;
      setPlans(data.plans || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Could not load plans");
    } finally {
      setPlansLoading(false);
    }
  };

  const handleOpenPlans = (service: Service) => {
    setSelectedServiceForPlans(service);
    setIsPlansModalOpen(true);
    fetchPlans(service.id);
  };

  const handleSaveAllPlans = async () => {
    try {
      await api.put(`/admin/services/${selectedServiceForPlans!.id}/plans`, { plans });

      toast.success('All plans updated successfully');
      setIsPlansModalOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save plans');
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = serviceFormData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const payload = {
        name: serviceFormData.name,
        slug,
        description: serviceFormData.description,
        price: parseFloat(serviceFormData.price),
        categoryId: parseInt(serviceFormData.categoryId),
        isActive: true
      };
      
      if (editingService) {
        await api.put(`/admin/services/${editingService.id}`, payload);
      } else {
        await api.post('/admin/services', payload);
      }

      toast.success('Saved successfully');
      setIsServiceModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save');
    }
  };

  const handleServiceDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/admin/services/${id}`);
      toast.success('Service deleted');
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1.5">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Users & Services</h1>
            <p className="text-slate-500 font-medium">Manage platform members and professional service offerings</p>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex p-1 bg-white rounded-xl border-2 border-slate-200 w-fit">
            <button 
              onClick={() => setActiveTab("users")}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === "users" ? "bg-slate-900 text-black shadow-sm border border-slate-900" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Users className="h-4 w-4" /> Users
            </button>
            <button 
              onClick={() => setActiveTab("services")}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === "services" ? "bg-slate-900 text-black shadow-sm border border-slate-900" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <ShoppingBag className="h-4 w-4" /> Services
            </button>
          </div>
        </div>

        {/* --- USERS TAB --- */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Filters */}
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search by name, email, or ID..." 
                      value={usersSearch}
                      onChange={(e) => setUsersSearch(e.target.value)}
                      className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-black/5 outline-none transition-all"
                      onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="relative min-w-[180px]">
                      <select 
                        value={usersRole}
                        onChange={(e) => setUsersRole(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold uppercase tracking-wider focus:ring-2 focus:ring-black/5 outline-none appearance-none cursor-pointer"
                      >
                        <option value="ALL">All Roles</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                    <Button 
                      className="h-11 px-6 rounded-xl font-bold text-xs bg-black text-black hover:bg-slate-800 shadow-sm transition-all"
                      onClick={fetchUsers}
                    >
                      Search Users
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-y border-slate-100">
                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Member</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-8 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {usersLoading ? (
                        [1, 2, 3, 4, 5].map((i) => (
                          <tr key={i} className="animate-pulse">
                            <td colSpan={5} className="px-8 py-8">
                              <div className="h-10 bg-slate-100 rounded-xl w-full" />
                            </td>
                          </tr>
                        ))
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Users className="h-6 w-6 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No members found</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Try adjusting your search or filters.</p>
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 font-bold text-sm border border-slate-200 group-hover:scale-105 transition-transform">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 text-[13px]">{user.name}</p>
                                  <p className="text-[11px] font-medium text-slate-400">ID: #{user.id.toString().padStart(4, "0")}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[12px] font-medium text-slate-600">
                                  <Mail className="h-3.5 w-3.5 text-slate-400" /> {user.email}
                                </div>
                                <div className="flex items-center gap-2 text-[12px] font-medium text-slate-600">
                                  <Phone className="h-3.5 w-3.5 text-slate-400" /> {user.phone || "No phone"}
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex flex-col gap-1.5">
                                <div className={cn(
                                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit",
                                  user.isEmailVerified ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                )}>
                                  {user.isEmailVerified ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                  Email
                                </div>
                                <div className={cn(
                                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold w-fit",
                                  user.isPhoneVerified ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                )}>
                                  {user.isPhoneVerified ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                  Phone
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <Badge variant="outline" className={cn(
                                "text-[10px] font-bold px-2.5 py-0.5 rounded-lg border-slate-200",
                                user.role === "SUPER_ADMIN" ? "bg-black text-black border-black" :
                                user.role === "ADMIN" ? "bg-slate-900 text-black border-slate-900" :
                                "bg-slate-50 text-slate-600"
                              )}>
                                {user.role?.replace('_', ' ') || 'USER'}
                              </Badge>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 border-slate-200 shadow-xl">
                                  <DropdownMenuLabel className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="rounded-lg py-2 px-3 text-xs font-bold gap-2 cursor-pointer">
                                    <Users className="h-3.5 w-3.5" /> View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="rounded-lg py-2 px-3 text-xs font-bold gap-2 cursor-pointer">
                                    <Mail className="h-3.5 w-3.5" /> Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="rounded-lg py-2 px-3 text-xs font-bold gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                                    <XCircle className="h-3.5 w-3.5" /> Disable Account
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-5 bg-slate-50/50 border-t border-slate-100 gap-4">
                  <p className="text-[11px] font-bold text-slate-500">
                    Showing <span className="text-slate-900">{(usersPagination.page - 1) * usersPagination.limit + 1}-{Math.min(usersPagination.page * usersPagination.limit, usersPagination.total)}</span> of <span className="text-slate-900">{usersPagination.total}</span> members
                  </p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setUsersPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                      disabled={usersPagination.page === 1}
                      className="h-9 px-4 rounded-lg border-slate-200 bg-white font-bold text-[11px] shadow-sm disabled:opacity-50"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 mr-1" /> Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, usersPagination.pages) }, (_, i) => (
                        <Button 
                          key={i} 
                          variant={usersPagination.page === i + 1 ? "default" : "ghost"} 
                          className={cn(
                            "h-9 w-9 rounded-lg text-[11px] font-bold",
                            usersPagination.page === i + 1 ? "bg-black text-black shadow-sm" : "text-slate-500 hover:bg-white"
                          )}
                          onClick={() => setUsersPagination(prev => ({ ...prev, page: i + 1 }))}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setUsersPagination(prev => ({ ...prev, page: Math.min(usersPagination.pages, prev.page + 1) }))}
                      disabled={usersPagination.page === usersPagination.pages}
                      className="h-9 px-4 rounded-lg border-slate-200 bg-white font-bold text-[11px] shadow-sm disabled:opacity-50"
                    >
                      Next <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* --- SERVICES TAB --- */}
        {activeTab === "services" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            {/* Service Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 sm:p-6 rounded-2xl border-2 border-slate-200 shadow-sm gap-3 sm:gap-4">
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-950">Service Directory</p>
                <p className="text-xs font-bold text-slate-900">Manage and deploy professional service modules</p>
              </div>
              <Button
                onClick={() => {
                  setEditingService(null);
                  setServiceFormData({ name: '', description: '', price: '', categoryId: categories[0]?.id.toString() || '' });
                  setIsServiceModalOpen(true);
                }}
                className="h-10 sm:h-11 px-4 sm:px-6 rounded-xl font-black text-xs bg-white text-slate-950 border-2 border-slate-950 hover:bg-slate-50 shadow-sm transition-all w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            </div>

            {/* Categories and Services */}
            {servicesLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 text-slate-400 animate-spin" />
                <p className="text-xs font-bold text-slate-500 animate-pulse">Loading Services...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-12">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-6">
                    <div 
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !prev[category.id] }))}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "h-8 w-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center transition-all duration-300",
                          expandedCategories[category.id] ? "rotate-0" : "-rotate-90"
                        )}>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-black transition-colors">{category.name}</h3>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">{category.services?.length || 0} active services</p>
                        </div>
                      </div>
                      <div className="h-px flex-1 mx-8 bg-slate-100"></div>
                    </div>

                    {expandedCategories[category.id] && (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
                        {category.services?.map(service => (
                          <Card key={service.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                            <CardContent className="p-8 flex flex-col h-full">
                              <div className="flex justify-between items-start mb-6">
                                <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                  <ShoppingBag className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <div className={cn(
                                    "px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm",
                                    service.isActive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                  )}>
                                    {service.isActive ? "Active" : "Inactive"}
                                  </div>
                                  <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-100 rounded-full">
                                    <Tag className="h-3 w-3 text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-600">{service.plans?.length || 0} Plans</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex-1 space-y-3">
                                <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-black transition-colors">{service.name}</h4>
                                <p className="text-[13px] text-slate-500 font-medium line-clamp-2 leading-relaxed">{service.description}</p>
                              </div>

                              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                                <Button 
                                  variant="outline"
                                  className="flex-1 h-10 rounded-xl font-bold text-[11px] border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                                  onClick={() => handleOpenPlans(service)}
                                >
                                  <ListChecks className="h-3.5 w-3.5 mr-2" /> Plans & Scope
                                </Button>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                                    onClick={() => {
                                      setEditingService(service);
                                      setServiceFormData({
                                        name: service.name,
                                        description: service.description,
                                        price: service.price?.toString() || '0',
                                        categoryId: category.id.toString()
                                      });
                                      setIsServiceModalOpen(true);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                    onClick={() => handleServiceDelete(service.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        {(!category.services || category.services.length === 0) && (
                          <div className="col-span-full py-16 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center">
                            <ShoppingBag className="h-10 w-10 text-slate-200 mb-3" />
                            <p className="text-xs font-bold text-slate-400">No active services in this category</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- MODALS --- */}
        {/* Service Edit Modal */}
        {isServiceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-2xl rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] border-2 border-slate-900 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] overflow-y-auto">
              <CardHeader className="p-4 sm:p-6 md:p-10 pb-3 sm:pb-4 md:pb-6 flex flex-row items-center justify-between bg-white">
                <div className="min-w-0">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-950">{editingService ? 'Edit Module' : 'Deploy New Module'}</CardTitle>
                  <CardDescription className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 mt-1 sm:mt-2">Configure service registry parameters</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl text-slate-950 hover:bg-slate-100 shrink-0" onClick={() => setIsServiceModalOpen(false)}>
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 md:p-10 pt-0">
                <form onSubmit={handleServiceSubmit} className="space-y-5 sm:space-y-6 md:space-y-8">
                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Module Identity</label>
                      <Input
                        value={serviceFormData.name}
                        onChange={e => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                        placeholder="e.g. GST Registration Node"
                        className="h-12 sm:h-14 md:h-16 px-4 sm:px-6 bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold outline-none focus:ring-2 focus:ring-slate-900/10 transition-all text-slate-950"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Description Telemetry</label>
                      <textarea
                        value={serviceFormData.description}
                        onChange={e => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                        placeholder="Describe the service scope and operational vectors..."
                        className="w-full min-h-[100px] sm:min-h-[120px] md:min-h-[140px] p-4 sm:p-6 bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl md:rounded-3xl text-sm sm:text-base font-bold outline-none focus:ring-2 focus:ring-slate-900/10 transition-all resize-none text-slate-950"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Category Vector</label>
                        <div className="relative">
                          <select
                            value={serviceFormData.categoryId}
                            onChange={e => setServiceFormData({ ...serviceFormData, categoryId: e.target.value })}
                            className="w-full h-12 sm:h-14 md:h-16 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-200 text-xs sm:text-sm font-black uppercase tracking-widest focus:ring-2 focus:ring-slate-900/10 outline-none appearance-none cursor-pointer text-slate-950"
                            required
                          >
                            <option value="">Select Domain</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Base Valuation (₹)</label>
                        <div className="relative">
                          <DollarSign className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-900" />
                          <Input
                            type="number"
                            value={serviceFormData.price}
                            onChange={e => setServiceFormData({ ...serviceFormData, price: e.target.value })}
                            placeholder="0.00"
                            className="h-12 sm:h-14 md:h-16 pl-12 sm:pl-14 pr-4 sm:pr-6 bg-white border-2 border-slate-200 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold outline-none focus:ring-2 focus:ring-slate-900/10 transition-all text-slate-950"
                            required
                            disabled={!!editingService}
                          />
                        </div>
                        {editingService && <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest ml-1 mt-1">Managed via Tiers</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <Button type="button" variant="ghost" onClick={() => setIsServiceModalOpen(false)} className="flex-1 h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-900 hover:bg-slate-100 order-2 sm:order-1">Abort</Button>
                    <Button type="submit" className="flex-1 sm:flex-[2] h-12 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl font-black text-[11px] uppercase tracking-widest bg-white text-slate-950 border-2 border-slate-950 hover:bg-slate-50 shadow-sm order-1 sm:order-2">Commit Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plans Management Modal */}
        {isPlansModalOpen && selectedServiceForPlans && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/90 backdrop-blur-md p-2 sm:p-4 md:p-6 animate-in fade-in duration-300">
            <Card className="w-full max-w-[98vw] md:max-w-[90vw] h-[95vh] sm:h-[90vh] rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] border-2 border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
              <CardHeader className="p-4 sm:p-6 md:p-10 pb-3 sm:pb-4 md:pb-6 flex flex-col sm:flex-row sm:items-center justify-between shrink-0 bg-white gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200 shrink-0">
                    <ListChecks className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-lg sm:text-xl md:text-3xl font-black tracking-tight text-slate-900 truncate">Tier Architecture: {selectedServiceForPlans.name}</CardTitle>
                    <CardDescription className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 mt-1 sm:mt-2">Define pricing vectors and feature scope matrices</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 shrink-0">
                  <Button
                    onClick={() => setPlans([...plans, { planType: 'CUSTOM', price: 0, isActive: true, scopes: [], displayOrder: plans.length }])}
                    variant="outline"
                    className="h-10 sm:h-12 md:h-14 px-3 sm:px-5 md:px-8 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest border-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                  >
                    <Plus className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden xs:inline">Add</span> Tier
                  </Button>
                  <Button
                    onClick={handleSaveAllPlans}
                    className="h-10 sm:h-12 md:h-14 px-4 sm:px-6 md:px-10 rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-50 shadow-sm"
                  >
                    <Save className="h-4 w-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Commit</span> Save
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl text-slate-900 hover:bg-slate-100 shrink-0" onClick={() => setIsPlansModalOpen(false)}>
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent
                className="flex-1 overflow-hidden p-0 bg-white relative min-h-0"
                role="region"
                aria-label="Service plans grid"
              >
                {plansLoading ? (
                  <div className="h-full flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-12 w-12 text-slate-900 animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">Syncing Tier Data...</p>
                  </div>
                ) : (
                  <div
                    className="h-full w-full overflow-auto custom-scrollbar p-3 sm:p-6 md:p-10 scroll-smooth"
                    style={{
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 pb-10 auto-rows-fr">
                      {plans.map((plan, index) => (
                        <Card key={plan.id || `plan-${index}`} className={cn(
                          "rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] border-2 shadow-sm overflow-hidden flex flex-col h-[420px] sm:h-[480px] md:h-[560px] lg:h-[600px] w-full group transition-all duration-500",
                          plan.isActive ? "bg-white border-slate-200" : "bg-slate-50 grayscale opacity-60 border-transparent"
                        )}>
                        {/* Plan Header */}
                        <div className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 flex items-center gap-2 sm:gap-3 bg-slate-50 border-b border-slate-100 shrink-0">
                          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-white border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
                            <Tag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </div>
                          <Input
                            value={plan.planType}
                            onChange={e => {
                              const newPlans = [...plans];
                              newPlans[index] = { ...newPlans[index], planType: e.target.value.toUpperCase() };
                              setPlans(newPlans);
                            }}
                            className="h-8 bg-transparent border-none text-[10px] sm:text-[11px] font-black uppercase tracking-widest focus:ring-0 p-0 text-slate-900"
                            placeholder="TIER NAME"
                          />
                        </div>

                        {/* Plan Body - Constrained height with internal scroll */}
                        <div className="flex-1 flex flex-col overflow-hidden bg-white min-h-0">
                          <div className="p-3 sm:p-4 md:p-6 pb-2 space-y-3 sm:space-y-4 md:space-y-5 shrink-0">
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                              <div className="space-y-1">
                                <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Base (₹)</label>
                                <Input
                                  type="number"
                                  value={plan.price}
                                  onChange={e => {
                                    const newPlans = [...plans];
                                    newPlans[index] = { ...newPlans[index], price: parseFloat(e.target.value) || 0 };
                                    setPlans(newPlans);
                                  }}
                                  className="h-8 sm:h-10 px-2 sm:px-3 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-xs font-bold focus:ring-2 focus:ring-slate-900/5 text-slate-900"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Offer (₹)</label>
                                <Input
                                  type="number"
                                  value={plan.discountedPrice || ''}
                                  onChange={e => {
                                    const newPlans = [...plans];
                                    newPlans[index] = { ...newPlans[index], discountedPrice: e.target.value ? parseFloat(e.target.value) : undefined };
                                    setPlans(newPlans);
                                  }}
                                  className="h-8 sm:h-10 px-2 sm:px-3 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-xs font-bold focus:ring-2 focus:ring-slate-900/5 text-slate-900"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Telemetry Summary</label>
                              <textarea
                                value={plan.scopeSummary || ''}
                                onChange={e => {
                                  const newPlans = [...plans];
                                  newPlans[index] = { ...newPlans[index], scopeSummary: e.target.value };
                                  setPlans(newPlans);
                                }}
                                className="w-full min-h-[48px] sm:min-h-[60px] p-2 sm:p-3 bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-medium outline-none focus:ring-2 focus:ring-slate-900/5 resize-none text-slate-900"
                                placeholder="Describe this tier's positioning..."
                              />
                            </div>
                          </div>

                          {/* Features Matrix - This part scrolls */}
                          <div className="flex-1 flex flex-col min-h-0 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                            <div className="flex items-center justify-between mb-2 sm:mb-3 shrink-0">
                              <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Feature Scope Matrix</label>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-[7px] font-black uppercase tracking-widest text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-md"
                                onClick={() => {
                                  const newPlans = [...plans];
                                  const newScopes = [...(newPlans[index].scopes || []), { title: 'New Vector', isIncluded: true }];
                                  newPlans[index] = { ...newPlans[index], scopes: newScopes };
                                  setPlans(newPlans);
                                }}
                              >
                                + ADD
                              </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1.5 sm:space-y-2 pr-1 border-t border-slate-50 pt-2 sm:pt-3">
                              {plan.scopes?.map((scope, sIdx) => (
                                <div key={scope.id || `scope-${sIdx}`} className="flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 bg-slate-50/50 border border-slate-100 rounded-lg group/item hover:bg-white hover:border-slate-200 transition-all">
                                  <input
                                    type="checkbox"
                                    checked={scope.isIncluded}
                                    onChange={e => {
                                      const newPlans = [...plans];
                                      const newScopes = [...(newPlans[index].scopes || [])];
                                      newScopes[sIdx] = { ...newScopes[sIdx], isIncluded: e.target.checked };
                                      newPlans[index] = { ...newPlans[index], scopes: newScopes };
                                      setPlans(newPlans);
                                    }}
                                    className="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-0 cursor-pointer shrink-0"
                                  />
                                  <input
                                    value={scope.title}
                                    onChange={e => {
                                      const newPlans = [...plans];
                                      const newScopes = [...(newPlans[index].scopes || [])];
                                      newScopes[sIdx] = { ...newScopes[sIdx], title: e.target.value };
                                      newPlans[index] = { ...newPlans[index], scopes: newScopes };
                                      setPlans(newPlans);
                                    }}
                                    className="flex-1 min-w-0 bg-transparent border-none text-[10px] font-bold focus:ring-0 p-0 text-slate-900"
                                    placeholder="Feature title..."
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 rounded-md opacity-100 sm:opacity-0 group-hover/item:opacity-100 text-destructive hover:bg-destructive/5 transition-opacity shrink-0"
                                    onClick={() => {
                                      const newPlans = [...plans];
                                      const newScopes = (newPlans[index].scopes || []).filter((_, i) => i !== sIdx);
                                      newPlans[index] = { ...newPlans[index], scopes: newScopes };
                                      setPlans(newPlans);
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              {(!plan.scopes || plan.scopes.length === 0) && (
                                <p className="text-[8px] text-center py-6 sm:py-8 text-slate-400 font-black uppercase tracking-widest opacity-50 border-2 border-dashed border-slate-50 rounded-xl">Empty Scope Matrix</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Plan Footer */}
                        <div className="p-3 sm:p-4 md:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={plan.isActive}
                                onChange={() => {
                                  const newPlans = [...plans];
                                  newPlans[index] = { ...newPlans[index], isActive: !newPlans[index].isActive };
                                  setPlans(newPlans);
                                }}
                                className="sr-only peer"
                              />
                              <div className={cn(
                                "h-5 w-10 rounded-full transition-all duration-500 after:content-[''] after:absolute after:top-[3px] after:h-3.5 after:w-3.5 after:rounded-full after:bg-white after:shadow-sm after:transition-all after:duration-500",
                                plan.isActive ? "bg-emerald-500 after:left-[22px]" : "bg-slate-300 after:left-[3px]"
                              )} />
                            </label>
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">
                              {plan.isActive ? "Operational" : "Offline"}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 sm:h-8 px-2 sm:px-3 rounded-lg sm:rounded-xl text-destructive hover:bg-destructive/10 font-black text-[8px] sm:text-[9px] uppercase tracking-widest"
                            onClick={() => {
                              if (window.confirm('Terminate this tier module?')) {
                                setPlans(plans.filter((_, i) => i !== index));
                              }
                            }}
                          >
                            Terminate
                          </Button>
                        </div>
                      </Card>
                    ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
