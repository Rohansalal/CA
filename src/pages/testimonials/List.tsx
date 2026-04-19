import { useState } from 'react';
import { useTestimonials, useDeleteTestimonial, type Testimonial } from '../../api/hooks/useTestimonials';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  Star, 
  Quote, 
  MoreVertical,
  LayoutGrid,
  List as ListIcon,
  CheckCircle2,
  XCircle,
  Building2,
  User as UserIcon
} from 'lucide-react';
import { toast } from 'sonner';

export function TestimonialList() {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { data: testimonials, isLoading } = useTestimonials();
  const deleteTestimonial = useDeleteTestimonial();

  const filteredTestimonials = testimonials?.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase()) || 
           item.company.toLowerCase().includes(search.toLowerCase()) ||
           item.content.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = async (id: number) => {
    toast.custom((t) => (
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-sm text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={32} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Delete Testimonial?</h3>
        <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">This review will be permanently removed from your system and website.</p>
        <div className="flex gap-3 mt-8">
          <Button variant="ghost" onClick={() => toast.dismiss(t)} className="flex-1 font-bold rounded-xl h-12">Keep it</Button>
          <Button 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl h-12 shadow-lg shadow-red-900/20 transition-all"
            onClick={async () => {
              toast.dismiss(t);
              try {
                await deleteTestimonial.mutateAsync(id);
                toast.success('Testimonial removed');
              } catch (error) {
                toast.error('Failed to remove');
              }
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-900/20">
            <Quote size={40} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Client <span className="text-indigo-600">Testimonials</span></h2>
            <p className="text-slate-500 font-medium mt-2 text-lg">Manage your social proof and display professional success stories.</p>
          </div>
        </div>
        <Button 
          className="rounded-2xl h-16 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg gap-3 shadow-2xl shadow-indigo-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={28} />
          Add New Review
        </Button>
      </div>

      {/* Modern Toolbar */}
      <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <Input
            placeholder="Search by client name, company, or feedback content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 rounded-2xl transition-all font-medium text-lg"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid size={24} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ListIcon size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="h-[400px] flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-500/10 border-t-indigo-600 rounded-full animate-spin" />
            <Quote className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 w-8 h-8" />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] animate-pulse">Loading Success Stories...</p>
        </div>
      ) : filteredTestimonials && filteredTestimonials.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-6"}>
          {filteredTestimonials.map((item) => (
            <article
              key={item.id}
              className={`group bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.1)] transition-all duration-500 overflow-hidden border border-slate-100 hover:border-indigo-500/20 flex flex-col`}
            >
              <div className="p-8 lg:p-10 flex flex-col flex-1">
                {/* Header info */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500" />
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="relative w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-md"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex flex-col mt-1">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{item.role}</span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                          <Building2 size={10} />
                          <span>{item.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <MoreVertical size={18} className="text-slate-400" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-indigo-500 text-indigo-500" />
                  ))}
                </div>

                {/* Content */}
                <div className="relative">
                  <Quote className="absolute -top-4 -left-4 w-10 h-10 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors" />
                  <p className="text-slate-600 mb-8 italic leading-relaxed font-medium text-lg relative z-10">
                    "{item.content}"
                  </p>
                </div>

                {/* Action Bar */}
                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.status === 'VISIBLE' ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        <CheckCircle2 size={12} />
                        Live on Site
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                        <XCircle size={12} />
                        Hidden
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline"
                      className="h-11 px-6 rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="h-11 w-11 rounded-2xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-slate-400 transition-all"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-slate-200 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-8 text-slate-300">
            <MessageSquare size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">No testimonials found</h3>
          <p className="text-slate-500 font-medium mt-3 max-w-md mx-auto leading-relaxed text-lg">Your filters didn't return any matches. Try adjusting your search to find specific reviews.</p>
          <Button 
            variant="outline" 
            onClick={() => setSearch('')}
            className="mt-10 rounded-2xl h-14 px-8 border-slate-200 font-black text-slate-700 hover:bg-slate-50 transition-all"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
