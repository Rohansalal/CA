import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  Plus, 
  MoreVertical,
  Edit,
  Trash2,
  PauseCircle,
  PlayCircle,
  Eye,
  Filter
} from 'lucide-react';
import { SuperAdminLayout } from '../components/SuperAdminLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { cn } from '../../components/ui/utils';

const mockFirms = [
  {
    id: 1,
    name: 'ProTech Chartered Accountants',
    slug: 'protech-ca',
    email: 'contact@protechca.com',
    phone: '+91-9876543210',
    city: 'Mumbai',
    plan: 'Premium',
    status: 'active',
    clients: 156,
    users: 12,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Tax Solutions India',
    slug: 'tax-solutions',
    email: 'info@taxsolutions.in',
    phone: '+91-9876543220',
    city: 'Delhi',
    plan: 'Pro',
    status: 'active',
    clients: 89,
    users: 8,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    name: 'ABC Financial Services',
    slug: 'abc-financial',
    email: 'support@abcfinserv.com',
    phone: '+91-9876543230',
    city: 'Bangalore',
    plan: 'Basic',
    status: 'active',
    clients: 45,
    users: 4,
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    name: 'Smart Tax Consultants',
    slug: 'smart-tax',
    email: 'hello@smarttax.co.in',
    phone: '+91-9876543240',
    city: 'Chennai',
    plan: 'Pro',
    status: 'suspended',
    clients: 67,
    users: 6,
    createdAt: '2024-04-05',
  },
  {
    id: 5,
    name: 'Excel Accountants',
    slug: 'excel-accountants',
    email: 'team@excelaccountants.com',
    phone: '+91-9876543250',
    city: 'Hyderabad',
    plan: 'Trial',
    status: 'pending',
    clients: 12,
    users: 2,
    createdAt: '2024-06-01',
  },
];

export const SuperAdminFirms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const filteredFirms = mockFirms.filter(firm => {
    const matchesSearch = firm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firm.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      firm.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || firm.status === statusFilter;
    const matchesPlan = planFilter === 'all' || firm.plan.toLowerCase() === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">Suspended</Badge>;
      case 'pending':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Premium':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">Premium</Badge>;
      case 'Pro':
        return <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">Pro</Badge>;
      case 'Basic':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Basic</Badge>;
      case 'Trial':
        return <Badge className="bg-slate-50 text-slate-700 border-slate-200">Trial</Badge>;
      default:
        return <Badge>{plan}</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">CA Firms</h1>
            <p className="text-slate-500">Manage all chartered accountant firms on the platform</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Firm
          </Button>
        </div>

        {/* Filters */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search firms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="h-10 px-3 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                >
                  <option value="all">All Plans</option>
                  <option value="premium">Premium</option>
                  <option value="pro">Pro</option>
                  <option value="basic">Basic</option>
                  <option value="trial">Trial</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Firms Table */}
        <Card className="rounded-xl border-slate-200 bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-semibold text-slate-600">Firm</TableHead>
                <TableHead className="font-semibold text-slate-600">Contact</TableHead>
                <TableHead className="font-semibold text-slate-600">Location</TableHead>
                <TableHead className="font-semibold text-slate-600">Plan</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Clients</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right">Users</TableHead>
                <TableHead className="font-semibold text-slate-600">Joined</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFirms.map((firm) => (
                <TableRow key={firm.id} className="hover:bg-slate-50/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm font-bold">
                          {firm.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-900">{firm.name}</p>
                        <p className="text-xs text-slate-500">/{firm.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-slate-700">{firm.email}</p>
                    <p className="text-xs text-slate-500">{firm.phone}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-700">{firm.city}</span>
                  </TableCell>
                  <TableCell>
                    {getPlanBadge(firm.plan)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(firm.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-medium text-slate-700">{firm.clients}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-medium text-slate-700">{firm.users}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-500">{firm.createdAt}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Firm
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Building2 className="mr-2 h-4 w-4" />
                          View Portal
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {firm.status === 'active' ? (
                          <DropdownMenuItem className="text-amber-600">
                            <PauseCircle className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-emerald-600">
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Firm
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Pagination info */}
        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>Showing {filteredFirms.length} of {mockFirms.length} firms</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminFirms;