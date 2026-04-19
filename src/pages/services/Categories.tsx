import { useState } from 'react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../api/hooks/useServices';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../../components/ui/dialog';
import { Edit, Trash2, Loader2, Plus, Layers, Tag, FileText, Hash, CheckCircle2, X } from 'lucide-react';
import type { Category } from '../../types';
import { toast } from 'sonner';

export function Categories() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  
  const { data, isLoading, refetch } = useCategories({ page, limit: 10, search });
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error('Name is required', { description: 'Please provide a category name.' });
      return;
    }
    
    try {
      if (editingCategory) {
        await updateCategory.mutateAsync({
          id: editingCategory.id,
          name: categoryName,
          description: categoryDescription || undefined,
        });
        toast.success('Category updated', { description: `${categoryName} has been successfully updated.` });
      } else {
        await createCategory.mutateAsync({
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          description: categoryDescription || undefined,
        });
        toast.success('Category created', { description: `${categoryName} has been added to the system.` });
      }
      setIsModalOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description || '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    toast.custom((t) => (
      <div className="bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-sm">
        <h3 className="text-lg font-black text-slate-900">Delete Category?</h3>
        <p className="text-sm font-medium text-slate-500 mt-2">All services under this category will become uncategorized. This action is permanent.</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => toast.dismiss(t)} className="font-bold rounded-xl">Cancel</Button>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20"
            onClick={async () => {
              toast.dismiss(t);
              try {
                await deleteCategory.mutateAsync(id);
                toast.success('Category deleted');
                refetch();
              } catch (error) {
                toast.error('Failed to delete category');
              }
            }}
          >
            Delete Permanently
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const resetForm = () => {
    setEditingCategory(null);
    setCategoryName('');
    setCategoryDescription('');
  };

  const columns = [
    {
      key: 'name',
      header: 'Classification',
      render: (category: Category) => (
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
            <Tag size={18} />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">{category.name}</p>
            {category.description && (
              <p className="text-xs font-medium text-slate-400 mt-1.5 line-clamp-1">{category.description}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'slug',
      header: 'Identifier (Slug)',
      render: (category: Category) => (
        <div className="flex items-center gap-2">
          <Hash size={12} className="text-slate-300" />
          <code className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-1 rounded-lg uppercase tracking-wider">{category.slug}</code>
        </div>
      ),
    },
  ];

  const actions = (category: Category) => (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-white hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
        onClick={() => handleEdit(category)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
        onClick={() => handleDelete(category.id)}
        disabled={deleteCategory.isPending}
      >
        {deleteCategory.isPending && deleteCategory.variables === category.id ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-900/5 border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-900/20">
            <Layers size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Taxonomy & Groups</h2>
            <p className="text-slate-500 font-medium mt-1">Organize your services into logical business units.</p>
          </div>
        </div>
        <Button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="rounded-2xl h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg gap-3 shadow-xl shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={24} />
          Create Category
        </Button>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-900/5 border border-slate-100 p-2">
        <DataTable
          data={data?.items || []}
          columns={columns}
          loading={isLoading}
          totalCount={data?.count || 0}
          page={page}
          onPageChange={setPage}
          onSearch={setSearch}
          actions={actions}
          keyExtractor={(category) => category.id}
          emptyMessage="No categories defined yet."
        />
      </div>

      {/* Modern Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg p-0 bg-white border-none rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
          <DialogHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
                  {editingCategory ? 'Update Group' : 'New Classification'}
                </DialogTitle>
                <DialogDescription className="text-sm font-medium text-slate-500 mt-1">
                  Configure the group details below.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Group Name</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. GST Services"
                  className="pl-11 h-14 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all font-bold"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Internal Description</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                <textarea
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="What kind of services belong here?"
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all font-medium text-sm resize-none"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="p-8 pt-0 flex gap-3">
            <Button 
              variant="ghost" 
              onClick={() => setIsModalOpen(false)} 
              className="flex-1 h-12 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
            >
              Discard
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!categoryName.trim() || createCategory.isPending || updateCategory.isPending}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 gap-2"
            >
              {(createCategory.isPending || updateCategory.isPending) ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <CheckCircle2 size={18} />
              )}
              {editingCategory ? 'Commit Changes' : 'Initialize Group'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

