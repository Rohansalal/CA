import { useState } from 'react';
import { useInsights, useDeleteInsight, type Insight } from '../../api/hooks/useInsights';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Eye, 
  Trash2, 
  Loader2, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Filter,
  CheckCircle2,
  TrendingUp,
  MoreVertical,
  LayoutGrid,
  List as ListIcon
} from 'lucide-react';
import { toast } from 'sonner';

export function InsightList() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { data: insights, isLoading } = useInsights();
  const deleteInsight = useDeleteInsight();

  const categories = ['All', 'Taxation', 'GST', 'Business Advisory', 'Compliance'];

  const filteredInsights = insights?.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                         item.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: number) => {
    toast.custom((t) => (
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-sm">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">Archive Insight?</h3>
        <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">This will remove the article from the public website. You can restore it later from the archives.</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => toast.dismiss(t)} className="font-bold rounded-xl h-11 px-6">Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white font-black rounded-xl h-11 px-6 shadow-lg shadow-red-900/20 transition-all"
            onClick={async () => {
              toast.dismiss(t);
              try {
                await deleteInsight.mutateAsync(id);
                toast.success('Insight archived successfully');
              } catch (error) {
                toast.error('Failed to archive insight');
              }
            }}
          >
            Archive Now
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-900/20">
            <BookOpen size={40} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Tax & Compliance <span className="text-blue-600">Insights</span></h2>
            <p className="text-slate-500 font-medium mt-2 text-lg">Manage professional guidance and regulatory updates for your clients.</p>
          </div>
        </div>
        <Button 
          className="rounded-2xl h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg gap-3 shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={28} />
          Draft New Insight
        </Button>
      </div>

      {/* Modern Toolbar */}
      <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-900/5 border border-slate-50 flex flex-col lg:flex-row items-center gap-6">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <Input
            placeholder="Search insights by title, content, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 rounded-2xl transition-all font-medium text-lg"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="h-10 w-px bg-slate-200 mx-2 hidden lg:block" />
          
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <ListIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="h-[400px] flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/10 border-t-blue-600 rounded-full animate-spin" />
            <BookOpen className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600 w-8 h-8" />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.2em] animate-pulse">Loading Intelligence...</p>
        </div>
      ) : filteredInsights && filteredInsights.length > 0 ? (
        <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-10" : "space-y-6"}>
          {filteredInsights.map((item) => (
            <article
              key={item.id}
              className={`group bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.1)] transition-all duration-500 overflow-hidden border border-slate-100 hover:border-blue-500/20 flex ${viewMode === 'grid' ? 'flex-col' : 'flex-row'}`}
            >
              {/* Image & Overlays */}
              <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'h-64' : 'w-80 h-full'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl backdrop-blur-md border ${
                    item.status === 'PUBLISHED' ? 'bg-emerald-500/90 text-white border-emerald-400/30' : 'bg-amber-500/90 text-white border-amber-400/30'
                  }`}>
                    {item.status}
                  </span>
                </div>

                {/* Category Tag */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl shadow-blue-900/20">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-10 flex flex-col flex-1">
                {/* Meta info with high contrast */}
                <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                  <span className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {item.readTime}
                  </span>
                  <span className="flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4 text-blue-500" />
                    {item.views} views
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight tracking-tight">
                  {item.title}
                </h3>

                <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed font-medium text-base">
                  {item.excerpt}
                </p>

                {/* Action Bar */}
                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-11 w-11 rounded-2xl hover:bg-blue-50 hover:text-blue-600 text-slate-400 transition-all"
                    >
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-11 w-11 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 transition-all"
                    >
                      <TrendingUp className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline"
                      className="h-11 px-6 rounded-2xl border-slate-200 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                      Edit Content
                    </Button>
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="h-11 w-11 rounded-2xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 text-slate-400 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
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
            <Search size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">No results matched your filter</h3>
          <p className="text-slate-500 font-medium mt-3 max-w-md mx-auto leading-relaxed text-lg">Try adjusting your search query or selecting a different category to find the insights you're looking for.</p>
          <Button 
            variant="outline" 
            onClick={() => { setSearch(''); setActiveCategory('All'); }}
            className="mt-10 rounded-2xl h-14 px-8 border-slate-200 font-black text-slate-700 hover:bg-slate-50 transition-all"
          >
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Professional Footer Advice */}
      <Card className="bg-slate-900 rounded-[3rem] border-none overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <CardContent className="p-14 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <h3 className="text-3xl font-black text-white leading-tight tracking-tight mb-4">Master Your <span className="text-blue-400">Content Strategy</span></h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">Publishing consistent, high-quality insights builds authority and trust. Aim for 2-3 detailed guides per month to maximize engagement and SEO impact.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center w-full sm:w-44">
                <p className="text-3xl font-black text-blue-400">12.4k</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Total Monthly Reads</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center w-full sm:w-44">
                <p className="text-3xl font-black text-emerald-400">+18%</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Growth this Period</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
