// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories, useServices, useCreateService, useDeleteService } from '../../api/hooks/useServices';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Briefcase, Layers, Search, Plus, Eye, Trash2, Loader2,
  Tag, Building2, Receipt, BookOpen, ClipboardList, FileText,
  ShieldCheck, Award, ChevronRight, X, Check,
} from 'lucide-react';
import { toast } from 'sonner';

// Icon map for categories
const CAT_ICONS: Record<string, React.ElementType> = {
  Building2, Receipt, BookOpen, ClipboardList, FileText, ShieldCheck, Award, Briefcase, Layers, Tag,
};

const PLAN_COLORS: Record<string, string> = {
  BASIC:    'bg-slate-100 text-slate-600',
  STANDARD: 'bg-blue-100 text-blue-700',
  PREMIUM:  'bg-purple-100 text-purple-700',
  ELITE:    'bg-amber-100 text-amber-700',
  CUSTOM:   'bg-green-100 text-green-700',
};

function AddServiceModal({ categoryId, categoryName, onClose, onSaved }: {
  categoryId: number; categoryName: string; onClose: () => void; onSaved: () => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const createService = useCreateService();

  const slugify = (str: string) =>
    str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g, '');

  const handleSave = async () => {
    if (!name.trim()) { toast.error('Name is required'); return; }
    try {
      await createService.mutateAsync({
        categoryId,
        name: name.trim(),
        slug: slugify(name),
        description: description.trim() || undefined,
        // default 4 plans created by backend
      });
      onSaved();
      onClose();
    } catch { /* handled by hook */ }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Add New Service</h2>
            <p className="text-xs text-slate-400 mt-0.5">Under <strong>{categoryName}</strong></p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Service Name *</label>
            <Input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Proprietorship Registration"
              className="mt-1.5 rounded-xl"
              onKeyDown={e => e.key === 'Enter' && handleSave()}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
              placeholder="Brief description of the service..."
              className="w-full mt-1.5 px-3 py-2 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-slate-400">4 pricing plans (BASIC, STANDARD, PREMIUM, ELITE) will be created automatically.</p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="ghost" onClick={onClose} className="flex-1 rounded-xl">Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={createService.isPending || !name.trim()}
            className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {createService.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Service
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ServiceList() {
  const navigate = useNavigate();
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addToCatId, setAddToCatId] = useState<number | null>(null);

  const { data: catData, isLoading: catsLoading, refetch: refetchCats } = useCategories({ limit: 50 });
  const { data: svcData, isLoading: svcsLoading, refetch: refetchSvcs } = useServices({ limit: 200 });
  const deleteService = useDeleteService();

  const categories = catData?.items ?? [];
  const allServices = svcData?.items ?? [];

  // Filter by active category + search
  const filtered = allServices.filter(s => {
    const matchCat = activeCatId ? s.categoryId === activeCatId : true;
    const matchSearch = search
      ? s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category?.name?.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  const handleDelete = (id: number, name: string) => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <h3 className="font-bold text-slate-900">Delete Service?</h3>
        <p className="text-sm text-slate-500 mt-1">Remove <strong>{name}</strong> and all its plans?</p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-xl" onClick={async () => {
            toast.dismiss(t);
            await deleteService.mutateAsync(id);
            refetchSvcs();
          }}>Delete</Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const activeCatName = categories.find(c => c.id === activeCatId)?.name ?? '';

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Services</h1>
            <p className="text-xs text-slate-400">{allServices.length} services across {categories.length} categories</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/services/categories')}
            className="rounded-xl border-slate-200 text-slate-700 gap-2"
          >
            <Layers className="w-4 h-4" />
            Categories
          </Button>
          <Button
            onClick={() => { setAddToCatId(activeCatId ?? categories[0]?.id ?? null); setShowAddModal(true); }}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-2">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
          <button
            onClick={() => setActiveCatId(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeCatId === null
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All ({allServices.length})
          </button>
          {catsLoading
            ? [...Array(5)].map((_, i) => <div key={i} className="h-8 w-24 bg-slate-100 rounded-lg animate-pulse" />)
            : categories.map(cat => {
                const count = allServices.filter(s => s.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCatId(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                      activeCatId === cat.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search services…"
          className="pl-9 bg-white border-slate-200 rounded-xl"
        />
      </div>

      {/* Services Grid */}
      {svcsLoading ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 p-5 animate-pulse space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 bg-slate-100 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
              <div className="flex gap-1">
                <div className="h-5 bg-slate-100 rounded-full w-14" />
                <div className="h-5 bg-slate-100 rounded-full w-16" />
                <div className="h-5 bg-slate-100 rounded-full w-14" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 py-16 text-center">
          <Briefcase className="w-10 h-10 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No services found.</p>
          {activeCatId && (
            <button
              onClick={() => { setAddToCatId(activeCatId); setShowAddModal(true); }}
              className="mt-3 text-blue-600 text-sm font-medium hover:underline"
            >
              + Add first service in this category
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {filtered.map(service => {
            const plans: any[] = service.plans ?? [];
            const lowestPlan = plans.find(p => p.planType === 'BASIC') || plans[0];
            const lowestPrice = lowestPlan?.discountedPrice || lowestPlan?.price || 0;

            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200 p-5 flex flex-col gap-3 cursor-pointer"
                onClick={() => navigate(`/dashboard/services/${service.id}`)}
              >
                {/* Top row */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-blue-700">
                      {service.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {service.category?.name ?? 'Uncategorized'}
                    </p>
                  </div>
                </div>

                {/* Plan badges */}
                <div className="flex flex-wrap gap-1">
                  {plans.length > 0
                    ? plans.map((p: any) => (
                        <span key={p.id} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${PLAN_COLORS[p.planType] ?? 'bg-slate-100 text-slate-600'}`}>
                          {p.planType}
                        </span>
                      ))
                    : <span className="text-xs text-slate-300">No plans</span>
                  }
                </div>

                {/* Price + action row */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                  <div>
                    {lowestPrice > 0 ? (
                      <p className="text-sm font-bold text-slate-900">
                        ₹{lowestPrice.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-slate-400"> /start</span>
                      </p>
                    ) : (
                      <p className="text-xs text-slate-300 italic">Price not set</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/dashboard/services/${service.id}`); }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(service.id, service.name); }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add Service card */}
          {activeCatId && (
            <button
              onClick={() => { setAddToCatId(activeCatId); setShowAddModal(true); }}
              className="bg-white rounded-xl border border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all p-5 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-600 min-h-[140px]"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm font-medium">Add Service</span>
            </button>
          )}
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && addToCatId && (
        <AddServiceModal
          categoryId={addToCatId}
          categoryName={categories.find(c => c.id === addToCatId)?.name ?? ''}
          onClose={() => setShowAddModal(false)}
          onSaved={() => { refetchSvcs(); refetchCats(); }}
        />
      )}
    </div>
  );
}
