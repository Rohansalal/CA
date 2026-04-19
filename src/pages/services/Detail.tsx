// @ts-nocheck
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Briefcase, ArrowLeft, Edit, Check, X, Trash2, Loader2,
  IndianRupee, Tag, Plus, Minus, Info, DollarSign,
  ToggleLeft, ToggleRight, AlertTriangle, ChevronDown,
} from 'lucide-react';
import {
  useServiceDetail,
  useUpdateService,
  useDeleteService,
  useServicePlans,
  useUpdateSinglePlan,
  useAddServicePlan,
  useDeleteServicePlan,
  useToggleServicePlan,
} from '../../api/hooks/useServices';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { toast } from 'sonner';

const PLAN_ORDER = ['BASIC', 'STANDARD', 'PREMIUM', 'ELITE', 'CUSTOM'];

const PLAN_META: Record<string, { label: string; color: string; bg: string; badge: string; activeBg: string }> = {
  BASIC:    { label: 'Basic',    color: 'text-slate-700',  bg: 'bg-slate-50',    badge: 'bg-slate-100 text-slate-600 border-slate-200',   activeBg: 'bg-slate-50' },
  STANDARD: { label: 'Standard', color: 'text-blue-700',   bg: 'bg-blue-50/60',  badge: 'bg-blue-100 text-blue-700 border-blue-200',      activeBg: 'bg-blue-50/60' },
  PREMIUM:  { label: 'Premium',  color: 'text-purple-700', bg: 'bg-purple-50/60',badge: 'bg-purple-100 text-purple-700 border-purple-200', activeBg: 'bg-purple-50/60' },
  ELITE:    { label: 'Elite',    color: 'text-amber-700',  bg: 'bg-amber-50/60', badge: 'bg-amber-100 text-amber-700 border-amber-200',   activeBg: 'bg-amber-50/60' },
  CUSTOM:   { label: 'Custom',   color: 'text-green-700',  bg: 'bg-green-50/60', badge: 'bg-green-100 text-green-700 border-green-200',   activeBg: 'bg-green-50/60' },
};

// ─── Individual Plan Card ────────────────────────────────────────────────────

function PlanCard({
  plan,
  serviceId,
  onSaved,
  onDeleted,
}: {
  plan: any;
  serviceId: number;
  onSaved: () => void;
  onDeleted: () => void;
}) {
  const [editing, setEditing]       = useState(false);
  const [price, setPrice]           = useState(String(plan.price ?? 0));
  const [discounted, setDiscounted] = useState(String(plan.discountedPrice ?? ''));
  const [title, setTitle]           = useState(plan.shortTitle ?? '');
  const [summary, setSummary]       = useState(plan.scopeSummary ?? '');
  const [scopes, setScopes]         = useState<{ id?: number; title: string; isIncluded: boolean }[]>(
    (plan.scopes ?? []).map((s: any) => ({ id: s.id, title: s.title, isIncluded: Boolean(s.isIncluded) }))
  );

  const updatePlan   = useUpdateSinglePlan();
  const deletePlan   = useDeleteServicePlan();
  const toggleActive = useToggleServicePlan();

  const isActive = Boolean(plan.isActive);
  const meta     = PLAN_META[plan.planType] ?? PLAN_META.BASIC;

  const handleSave = async () => {
    await updatePlan.mutateAsync({
      planId: plan.id,
      serviceId,
      price: Number(price) || 0,
      discountedPrice: discounted !== '' ? Number(discounted) : null,
      shortTitle: title,
      scopeSummary: summary,
      isActive,
      scopes,
    });
    setEditing(false);
    onSaved();
  };

  const handleCancel = () => {
    setPrice(String(plan.price ?? 0));
    setDiscounted(String(plan.discountedPrice ?? ''));
    setTitle(plan.shortTitle ?? '');
    setSummary(plan.scopeSummary ?? '');
    setScopes((plan.scopes ?? []).map((s: any) => ({ id: s.id, title: s.title, isIncluded: Boolean(s.isIncluded) })));
    setEditing(false);
  };

  const handleToggle = async () => {
    await toggleActive.mutateAsync({ planId: plan.id, serviceId });
    onSaved();
  };

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h3 className="font-bold text-slate-900">Remove {meta.label} Plan?</h3>
        </div>
        <p className="text-sm text-slate-500 mt-1">This will permanently delete this plan and all its scope items.</p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-xl" onClick={async () => {
            toast.dismiss(t);
            await deletePlan.mutateAsync({ planId: plan.id, serviceId });
            onDeleted();
          }}>Delete</Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const addScope    = () => setScopes(p => [...p, { title: '', isIncluded: true }]);
  const removeScope = (i: number) => setScopes(p => p.filter((_, idx) => idx !== i));
  const updateScope = (i: number, field: 'title' | 'isIncluded', val: any) =>
    setScopes(p => p.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  return (
    <div className={`rounded-xl border overflow-hidden transition-all duration-200 ${
      editing
        ? 'border-blue-400 shadow-lg ring-1 ring-blue-200'
        : isActive
          ? 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
          : 'border-dashed border-slate-200 opacity-60 hover:opacity-80'
    }`}>
      {/* Plan header */}
      <div className={`flex items-center justify-between px-4 py-2.5 ${isActive ? meta.bg : 'bg-slate-50'} border-b border-slate-100`}>
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border shrink-0 ${meta.badge}`}>
            {meta.label}
          </span>
          {!editing && title && (
            <span className="text-xs text-slate-500 truncate">{title}</span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          {/* Toggle active (always visible) */}
          <button
            onClick={handleToggle}
            disabled={toggleActive.isPending}
            title={isActive ? 'Deactivate plan' : 'Activate plan'}
            className="p-1 rounded-lg text-slate-400 hover:bg-white/80 transition-all"
          >
            {toggleActive.isPending
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : isActive
                ? <ToggleRight className="w-4 h-4 text-green-500" />
                : <ToggleLeft className="w-4 h-4 text-slate-300" />
            }
          </button>

          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={updatePlan.isPending}
                className="p-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all"
              >
                {updatePlan.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              </button>
              <button onClick={handleCancel} className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all">
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                title="Edit plan"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDelete}
                disabled={deletePlan.isPending}
                className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Delete plan"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Status bar */}
      {!isActive && !editing && (
        <div className="px-4 py-1.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
          <span className="text-xs text-slate-400 font-medium">Inactive — not shown to clients</span>
        </div>
      )}

      {/* Plan body */}
      <div className="p-4 bg-white">
        {editing ? (
          <div className="space-y-3">
            {/* Price row */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Price (₹)</label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                  <Input type="number" value={price} onChange={e => setPrice(e.target.value)}
                    className="pl-7 h-8 rounded-lg text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Discounted (₹)</label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                  <Input type="number" value={discounted} onChange={e => setDiscounted(e.target.value)}
                    placeholder="Optional" className="pl-7 h-8 rounded-lg text-sm" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Plan Title</label>
              <Input value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Basic Filing" className="mt-1 h-8 rounded-lg text-sm" />
            </div>

            {/* Summary */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Scope Summary</label>
              <textarea value={summary} onChange={e => setSummary(e.target.value)}
                rows={2} placeholder="What's included..."
                className="w-full mt-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Scope items */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Scope Items</label>
                <button onClick={addScope}
                  className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:text-blue-800">
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
              <div className="space-y-1.5">
                {scopes.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <button onClick={() => updateScope(i, 'isIncluded', !s.isIncluded)}
                      className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${s.isIncluded ? 'bg-green-500 text-white' : 'bg-red-400 text-white'}`}>
                      {s.isIncluded ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                    </button>
                    <Input value={s.title} onChange={e => updateScope(i, 'title', e.target.value)}
                      placeholder="Feature description..." className="flex-1 h-7 text-xs rounded-md" />
                    <button onClick={() => removeScope(i)} className="text-slate-300 hover:text-red-500 transition-all">
                      <Minus className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {scopes.length === 0 && (
                  <p className="text-xs text-slate-300 italic py-1">No items — click Add</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {/* Price display */}
            <div className="flex items-baseline gap-2">
              {Number(price) > 0 ? (
                <>
                  {discounted && Number(discounted) > 0 ? (
                    <>
                      <span className="text-xl font-black text-slate-900">
                        ₹{Number(discounted).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{Number(price).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        {Math.round(((Number(price) - Number(discounted)) / Number(price)) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-black text-slate-900">
                      ₹{Number(price).toLocaleString('en-IN')}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-slate-300 text-xs italic">Price not set</span>
              )}
            </div>

            {summary && <p className="text-xs text-slate-500 leading-relaxed">{summary}</p>}

            {scopes.length > 0 && (
              <div className="space-y-1 pt-0.5">
                {scopes.slice(0, 4).map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${s.isIncluded ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-400'}`}>
                      {s.isIncluded ? <Check className="w-2 h-2" /> : <X className="w-2 h-2" />}
                    </span>
                    <span className={s.isIncluded ? 'text-slate-700' : 'text-slate-400 line-through'}>{s.title}</span>
                  </div>
                ))}
                {scopes.length > 4 && (
                  <p className="text-xs text-slate-400 pl-5">+{scopes.length - 4} more items</p>
                )}
              </div>
            )}

            {scopes.length === 0 && !summary && (
              <p className="text-xs text-slate-300 italic">Click Edit to add details</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Add Plan Selector ───────────────────────────────────────────────────────

function AddPlanDropdown({
  serviceId,
  existingTypes,
  onAdded,
}: {
  serviceId: number;
  existingTypes: string[];
  onAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const addPlan = useAddServicePlan();

  const available = PLAN_ORDER.filter(t => !existingTypes.includes(t));

  if (available.length === 0) return null;

  const handleAdd = async (planType: string) => {
    setOpen(false);
    await addPlan.mutateAsync({ serviceId, planType });
    onAdded();
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(o => !o)}
        disabled={addPlan.isPending}
        className="rounded-xl border-dashed border-slate-300 text-slate-500 hover:text-blue-600 hover:border-blue-300 gap-1.5"
      >
        {addPlan.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
        Add Plan
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 z-20 bg-white rounded-xl shadow-lg border border-slate-100 py-1 min-w-36 overflow-hidden">
            {available.map(type => {
              const m = PLAN_META[type] ?? PLAN_META.BASIC;
              return (
                <button
                  key={type}
                  onClick={() => handleAdd(type)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 transition-colors"
                >
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${m.badge}`}>{m.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Service Detail Page ─────────────────────────────────────────────────────

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const serviceId = Number(id);
  const [tab, setTab] = useState<'info' | 'plans'>('plans');

  const { data: service, isLoading, refetch } = useServiceDetail(serviceId);
  const { data: plans, isLoading: plansLoading, refetch: refetchPlans } = useServicePlans(serviceId);
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [editingInfo, setEditingInfo] = useState(false);
  const [name, setName]               = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive]       = useState(true);

  const startEditInfo = () => {
    setName(service?.name ?? '');
    setDescription(service?.description ?? '');
    setIsActive(Boolean(service?.isActive));
    setEditingInfo(true);
  };

  const saveInfo = async () => {
    await updateService.mutateAsync({ id: serviceId, name, description, isActive });
    setEditingInfo(false);
    refetch();
  };

  const handleDelete = () => {
    toast.custom((t) => (
      <div className="bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-80">
        <h3 className="font-bold text-slate-900">Delete Service?</h3>
        <p className="text-sm text-slate-500 mt-1">
          This removes <strong>{service?.name}</strong> and all plans permanently.
        </p>
        <div className="flex gap-2 mt-4 justify-end">
          <Button variant="ghost" size="sm" onClick={() => toast.dismiss(t)} className="rounded-xl">Cancel</Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-xl" onClick={async () => {
            toast.dismiss(t);
            await deleteService.mutateAsync(serviceId);
            navigate('/dashboard/services');
          }}>Delete</Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
  );

  if (!service) return (
    <div className="text-center py-20 text-slate-400">
      <p>Service not found.</p>
      <Button variant="outline" className="mt-4 rounded-xl" onClick={() => navigate('/dashboard/services')}>
        Back to Services
      </Button>
    </div>
  );

  const sortedPlans = [...(plans ?? [])].sort(
    (a, b) => PLAN_ORDER.indexOf(a.planType) - PLAN_ORDER.indexOf(b.planType)
  );

  const activePlans   = sortedPlans.filter(p => p.isActive);
  const inactivePlans = sortedPlans.filter(p => !p.isActive);
  const existingTypes = sortedPlans.map(p => p.planType);

  return (
    <div className="max-w-5xl space-y-5 animate-in fade-in duration-500">
      {/* Back + title */}
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <button
          onClick={() => navigate('/dashboard/services')}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 truncate">{service.name}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Tag className="w-3 h-3 shrink-0" />
              {service.category?.name ?? 'Uncategorized'}
              <span className="mx-1">·</span>
              <span className="font-mono truncate">{service.slug}</span>
            </p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${
          service.isActive
            ? 'bg-green-100 text-green-700 border-green-200'
            : 'bg-slate-100 text-slate-500 border-slate-200'
        }`}>
          {service.isActive ? 'Active' : 'Inactive'}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
          className="rounded-xl border-red-200 text-red-500 hover:bg-red-50 shrink-0"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {[
          { id: 'plans', label: 'Plans & Pricing', icon: DollarSign },
          { id: 'info',  label: 'Service Info',    icon: Info },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* ── PLANS TAB ── */}
      {tab === 'plans' && (
        <div className="space-y-5">
          {plansLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-slate-100 h-48 animate-pulse bg-slate-50" />
              ))}
            </div>
          ) : (
            <>
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-700">
                    {sortedPlans.length} plan{sortedPlans.length !== 1 ? 's' : ''}
                  </p>
                  {activePlans.length > 0 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      {activePlans.length} active
                    </span>
                  )}
                  {inactivePlans.length > 0 && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                      {inactivePlans.length} inactive
                    </span>
                  )}
                </div>
                <AddPlanDropdown
                  serviceId={serviceId}
                  existingTypes={existingTypes}
                  onAdded={refetchPlans}
                />
              </div>

              {sortedPlans.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-slate-200 py-14 text-center">
                  <DollarSign className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm font-medium">No plans yet</p>
                  <p className="text-slate-300 text-xs mt-1">Use "Add Plan" to create your first pricing plan</p>
                </div>
              ) : (
                <>
                  {/* Active plans grid */}
                  {activePlans.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                      {activePlans.map((plan: any) => (
                        <PlanCard
                          key={plan.id}
                          plan={plan}
                          serviceId={serviceId}
                          onSaved={refetchPlans}
                          onDeleted={refetchPlans}
                        />
                      ))}
                    </div>
                  )}

                  {/* Inactive plans section */}
                  {inactivePlans.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                        Inactive Plans
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                        {inactivePlans.map((plan: any) => (
                          <PlanCard
                            key={plan.id}
                            plan={plan}
                            serviceId={serviceId}
                            onSaved={refetchPlans}
                            onDeleted={refetchPlans}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* ── INFO TAB ── */}
      {tab === 'info' && (
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-900">Service Details</h2>
            {editingInfo ? (
              <div className="flex gap-2">
                <Button size="sm" onClick={saveInfo} disabled={updateService.isPending}
                  className="rounded-xl bg-blue-600 text-white">
                  {updateService.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingInfo(false)} className="rounded-xl">Cancel</Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={startEditInfo} className="rounded-xl">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
            )}
          </div>

          {editingInfo ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Service Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} className="mt-1.5 rounded-xl" />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
                  className="w-full mt-1.5 px-3 py-2 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded" />
                <span className="text-sm text-slate-600 font-medium">Active (visible to clients)</span>
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-400 font-medium">Name</p>
                <p className="font-semibold text-slate-900 mt-0.5">{service.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Category</p>
                <p className="font-semibold text-slate-900 mt-0.5">{service.category?.name ?? '—'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Slug</p>
                <code className="text-xs bg-slate-100 px-2 py-0.5 rounded-lg text-slate-600 font-mono">{service.slug}</code>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Status</p>
                <span className={`inline-block mt-0.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${service.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-400 font-medium">Description</p>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  {service.description || <span className="italic text-slate-300">No description</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
