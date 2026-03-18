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
  Download
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

interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 1
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, role]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
        role
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/users?${params}`,
        { headers: { "Authorization": `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users || []);
      const total = data.count || data.users?.length || 0;
      setPagination(prev => ({
        ...prev,
        total,
        pages: Math.ceil(total / prev.limit) || 1
      }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 pb-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Management</h1>
            <p className="text-slate-500 font-medium">View and manage all registered users and administrators.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 px-4 rounded-lg font-semibold text-xs border-slate-200 hover:bg-slate-50 shadow-sm transition-all flex items-center gap-2 uppercase tracking-wider">
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
            <Button className="h-10 px-4 rounded-lg font-semibold text-xs bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 uppercase tracking-wider">
              <UserPlus className="h-3.5 w-3.5" /> Add New User
            </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
          <CardContent className="p-4 md:p-6 bg-white">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search by name, email, or phone..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-11 border-slate-200 rounded-lg focus:ring-indigo-500/10 focus:border-indigo-500/20"
                  onKeyDown={(e) => e.key === "Enter" && fetchUsers()}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="h-11 px-4 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500/10 outline-none min-w-[140px]"
                >
                  <option value="ALL">All Roles</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
                <Button className="h-11 px-6 rounded-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2" onClick={fetchUsers}>
                  <Filter className="h-4 w-4" /> Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-lg font-bold text-slate-900">User Directory</CardTitle>
                <CardDescription className="text-xs font-medium text-slate-500">List of all system users and their access levels</CardDescription>
              </div>
              <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-3 py-1 font-bold">{pagination.total} Total Users</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/30">
                    <th className="text-left px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">User Identity</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Contact Info</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Verification Status</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Access Role</th>
                    <th className="text-left px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Join Date</th>
                    <th className="text-right px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[11px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    [1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={6} className="px-6 py-8">
                          <div className="h-12 bg-slate-100 rounded-lg w-full" />
                        </td>
                      </tr>
                    ))
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-24 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Users className="h-12 w-12 text-slate-200" />
                          <p className="text-lg font-bold text-slate-900">No users found</p>
                          <p className="text-sm text-slate-500 mb-2">Try adjusting your filters or search criteria.</p>
                          <Button variant="outline" className="rounded-lg" onClick={() => { setSearch(""); setRole("ALL"); fetchUsers(); }}>Clear all filters</Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{user.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">UID: #{user.id.toString().padStart(4, "0")}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-slate-600 font-medium">
                              <Mail className="h-3.5 w-3.5 text-slate-400" /> {user.email}
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 font-medium">
                              <Phone className="h-3.5 w-3.5 text-slate-400" /> {user.phone || "Not provided"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-1.5">
                            <div className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit",
                              user.isEmailVerified ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                            )}>
                              {user.isEmailVerified ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              Email
                            </div>
                            <div className={cn(
                              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit",
                              user.isPhoneVerified ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                            )}>
                              {user.isPhoneVerified ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                              Phone
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <Badge 
                            className={cn(
                              "font-bold uppercase tracking-widest text-[10px] border-none shadow-none px-3 py-1",
                              user.role === "SUPER_ADMIN" ? "bg-slate-900 text-white" :
                              user.role === "ADMIN" ? "bg-indigo-600 text-white" :
                              "bg-slate-100 text-slate-600"
                            )}
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-600 font-medium">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-slate-200">
                              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500">User Operations</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-slate-100" />
                              <DropdownMenuItem className="gap-3 px-2 py-2.5 rounded-lg font-medium text-slate-700 focus:bg-slate-50 focus:text-indigo-600 cursor-pointer">
                                <Users className="h-4 w-4 text-slate-400" /> View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-3 px-2 py-2.5 rounded-lg font-medium text-slate-700 focus:bg-slate-50 focus:text-indigo-600 cursor-pointer">
                                <Mail className="h-4 w-4 text-slate-400" /> Send Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-slate-100" />
                              <DropdownMenuItem className="text-rose-600 gap-3 px-2 py-2.5 rounded-lg font-medium focus:bg-rose-50 focus:text-rose-700 cursor-pointer">
                                <XCircle className="h-4 w-4" /> Deactivate Node
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
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-6 bg-slate-50/50 border-t border-slate-100 gap-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Showing <span className="text-slate-900">{(pagination.page - 1) * pagination.limit + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="text-slate-900">{pagination.total}</span> entries
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  disabled={pagination.page === 1}
                  className="h-10 px-4 rounded-lg font-bold text-xs uppercase tracking-widest border-slate-200 hover:bg-white hover:shadow-sm disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                </Button>
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => (
                    <Button 
                      key={i} 
                      variant={pagination.page === i + 1 ? "default" : "ghost"} 
                      size="sm"
                      className={cn(
                        "h-10 w-10 p-0 rounded-lg font-bold text-xs transition-all",
                        pagination.page === i + 1 ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "text-slate-600 hover:bg-white hover:shadow-sm"
                      )}
                      onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setPagination(prev => ({ ...prev, page: Math.min(pagination.pages, prev.page + 1) }))}
                  disabled={pagination.page === pagination.pages}
                  className="h-10 px-4 rounded-lg font-bold text-xs uppercase tracking-widest border-slate-200 hover:bg-white hover:shadow-sm disabled:opacity-50"
                >
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};
