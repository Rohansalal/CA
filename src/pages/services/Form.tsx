// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategories, useCreateService, useUpdateService, useServiceDetail, useServicePlans, useUpdateServicePlansBulk } from '../../api/hooks/useServices';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';
import type { ServicePlan } from '../../types';

export function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  // Queries
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();
  const { data: service, isLoading: isLoadingService } = useServiceDetail(Number(id), { enabled: isEdit });
  const { data: plansData, isLoading: isLoadingPlans } = useServicePlans(Number(id), { enabled: isEdit });
  
  // Mutations
  const createService = useCreateService();
  const updateService = useUpdateService();
  const updatePlansBulk = useUpdateServicePlansBulk();

  // Form State - Base Info
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState('0');

  // Form State - Plans
  const [plans, setPlans] = useState<Partial<ServicePlan>[]>([
    { planType: 'BASIC', price: 0, isActive: true, displayOrder: 0, shortTitle: 'Essential', scopeSummary: 'Basic compliance and support' },
    { planType: 'STANDARD', price: 0, isActive: true, displayOrder: 1, shortTitle: 'Professional', scopeSummary: 'Standard filing with advisory' },
    { planType: 'PREMIUM', price: 0, isActive: true, displayOrder: 2, shortTitle: 'Business', scopeSummary: 'Complete management & strategy' },
    { planType: 'ELITE', price: 0, isActive: true, displayOrder: 3, shortTitle: 'Enterprise', scopeSummary: 'Priority handling & 24/7 support' },
  ]);

  // Sync state if editing
  useEffect(() => {
    if (isEdit && service) {
      setName(service.name);
      setSlug(service.slug);
      setCategoryId(String(service.categoryId));
      setDescription(service.description || '');
      setIsActive(service.isActive);
      setOrder(String(service.order));
    }
  }, [isEdit, service]);

  useEffect(() => {
    if (isEdit && plansData) {
      setPlans(plansData);
    }
  }, [isEdit, plansData]);

  // Auto-generate slug
  useEffect(() => {
    if (!isEdit && name) {
      setSlug(name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
    }
  }, [name, isEdit]);

  const handlePlanChange = (index: number, field: keyof ServicePlan, value: any) => {
    const newPlans = [...plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setPlans(newPlans);
  };

  const onSave = async () => {
    if (!name || !slug || !categoryId) {
      toast.error('Missing fields', { description: 'Please fill name, slug and category.' });
      return;
    }

    try {
      let serviceId = Number(id);
      
      if (isEdit) {
        await updateService.mutateAsync({
          id: serviceId,
          name,
          slug,
          categoryId: Number(categoryId),
          description,
          isActive,
          order: Number(order)
        });
        
        // Update plans
        await updatePlansBulk.mutateAsync({
          serviceId,
          plans: plans as ServicePlan[]
        });
        
        toast.success('Service updated successfully');
      } else {
        await createService.mutateAsync({
          name,
          slug,
          categoryId: Number(categoryId),
          description,
          isActive: true,
          order: Number(order),
          plans: plans.filter(p => p.isActive) as ServicePlan[]
        });
        
        toast.success('Service created successfully');
        navigate('/dashboard/services');
      }
    } catch (error) {
      // toast.error handled by mutation
    }
  };

  if (isEdit && (isLoadingService || isLoadingPlans)) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const getPlanIcon = (type: string) => {
    return <Settings size={20} />;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12 rounded-2xl border-slate-200 hover:bg-slate-50 transition-all"
            onClick={() => navigate('/dashboard/services')}
          >
            {'<'}
          </Button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {isEdit ? 'Refine Service' : 'Initialize Service'}
            </h2>
            <p className="text-slate-500 font-medium">
              {isEdit ? 'Update details, pricing and features' : 'Define your new professional offering'}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={onSave}
          disabled={createService.isPending || updateService.isPending}
          className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-900/20 gap-3 transition-all hover:scale-[1.02]"
        >
          {createService.isPending || updateService.isPending ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            null
          )}
          {isEdit ? 'Sync Changes' : 'Go Live'}
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Basic Configuration */}
        <div className="xl:col-span-1 space-y-8">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-900/5 overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
              <div className="flex items-center gap-4">
                <div>
                  <CardTitle className="text-xl font-black text-slate-900">Baseline Config</CardTitle>
                  <CardDescription className="font-medium text-slate-400">Identity and classification</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Service Name</Label>
                <div className="relative">
                  <Input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. GST Registration"
                    className="h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">URL Identifier (Slug)</Label>
                <div className="relative">
                  <Input 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="gst-registration"
                    className="h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl transition-all font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Business Category</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger className="h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl transition-all font-bold">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
                    {categoriesData?.items.map((cat: any) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Display Priority</Label>
                <Input 
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="h-14 bg-slate-50 border-transparent rounded-2xl font-bold"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-900">{isActive ? 'Publicly visible' : 'Staged (Private)'}</p>
                  <p className="text-[10px] font-medium text-slate-400 leading-none">Status in your public website</p>
                </div>
                <Switch 
                  checked={isActive} 
                  onCheckedChange={setIsActive}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-900/5 overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black">Professional Brief</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Elaborate on the service scope..."
                className="min-h-[150px] bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl transition-all font-medium resize-none p-4"
              />
            </CardContent>
          </Card>
        </div>

        {/* Pricing Strategy */}
        <div className="xl:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <Card key={plan.planType} className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-slate-900/5 overflow-hidden group hover:border-indigo-200 transition-all duration-500">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100/50 p-6 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {getPlanIcon(plan.planType!)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{plan.planType}</p>
                      <CardTitle className="text-lg font-black text-slate-900">{plan.shortTitle}</CardTitle>
                    </div>
                  </div>
                  <Switch 
                    checked={plan.isActive}
                    onCheckedChange={(val) => handlePlanChange(index, 'isActive', val)}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </CardHeader>
                <CardContent className={`p-8 space-y-6 transition-opacity duration-300 ${!plan.isActive ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fee (INR)</Label>
                        <Input 
                          type="number"
                          value={plan.price}
                          onChange={(e) => handlePlanChange(index, 'price', e.target.value)}
                          className="h-12 bg-slate-50 border-transparent rounded-xl font-black text-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marketing Title</Label>
                        <Input 
                          value={plan.shortTitle}
                          onChange={(e) => handlePlanChange(index, 'shortTitle', e.target.value)}
                          className="h-12 bg-slate-50 border-transparent rounded-xl font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tagline Recap</Label>
                      <Input 
                        value={plan.scopeSummary}
                        onChange={(e) => handlePlanChange(index, 'scopeSummary', e.target.value)}
                        className="h-12 bg-slate-50 border-transparent rounded-xl font-medium"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-indigo-950 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-800/50 flex items-center justify-center">
                  <Gem size={28} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">Deployment Strategy</h3>
                  <p className="text-indigo-300 font-medium max-w-md mt-2">
                    Initialized services will be immediately published to the public portal for client acquisition.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                   <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                   <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Active Monitoring</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                   <CheckCircle2 size={16} className="text-indigo-400" />
                   <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Global Reach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
