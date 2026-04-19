// @ts-nocheck
import { useState } from 'react';
import { useComplianceItems, useCreateComplianceItem, useUpdateComplianceItem, useDeleteComplianceItem } from '../../api/hooks/useCompliance';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Plus, Loader2, Calendar, Trash2, Edit } from 'lucide-react';
import type { ComplianceItem } from '../../types';

const complianceTypes = ['GST', 'ITR', 'TDS', 'ROC', 'PF', 'ESI', 'MCA', 'CUSTOM'];
const statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'];

export function ComplianceCalendar() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ComplianceItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    complianceType: 'GST',
    dueDate: '',
    status: 'PENDING',
  });
  
  const { data, isLoading } = useComplianceItems({ page, limit: 10 });
  const createItem = useCreateComplianceItem();
  const updateItem = useUpdateComplianceItem();
  const deleteItem = useDeleteComplianceItem();

  const handleSave = async () => {
    if (!formData.title || !formData.dueDate) return;
    
    try {
      if (editingItem) {
        await updateItem.mutateAsync({
          id: editingItem.id,
          ...formData,
        });
      } else {
        await createItem.mutateAsync({
          title: formData.title,
          description: formData.description || undefined,
          complianceType: formData.complianceType as any,
          dueDate: formData.dueDate,
        });
      }
      setIsModalOpen(false);
      resetForm();
    } catch {
      // Error handled by hook
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem.mutateAsync(id);
      } catch {
        // Error handled by hook
      }
    }
  };

  const openEditModal = (item: ComplianceItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      complianceType: item.complianceType,
      dueDate: item.dueDate.split('T')[0],
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      complianceType: 'GST',
      dueDate: '',
      status: 'PENDING',
    });
  };

  const columns = [
    {
      key: 'title',
      header: 'Compliance Item',
      render: (item: ComplianceItem) => (
        <div>
          <p className="font-medium">{item.title}</p>
          {item.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
          )}
        </div>
      ),
    },
    {
      key: 'complianceType',
      header: 'Type',
      render: (item: ComplianceItem) => (
        <Badge variant="secondary">{item.complianceType}</Badge>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (item: ComplianceItem) => {
        const due = new Date(item.dueDate);
        const isOverdue = due < new Date() && item.status !== 'COMPLETED';
        return (
          <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
            {due.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: ComplianceItem) => (
        <Badge 
          variant={
            item.status === 'COMPLETED' ? 'success' : 
            item.status === 'OVERDUE' ? 'destructive' : 
            item.status === 'IN_PROGRESS' ? 'info' : 'warning'
          }
        >
          {item.status}
        </Badge>
      ),
    },
  ];

  const actions = (item: ComplianceItem) => (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openEditModal(item)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-600"
        onClick={() => handleDelete(item.id)}
        disabled={deleteItem.isPending}
      >
        {deleteItem.isPending && deleteItem.variables === item.id ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Compliance Calendar</h2>
          <p className="text-muted-foreground">
            Track and manage compliance deadlines
          </p>
        </div>
        <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Compliance Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data?.items || []}
            columns={columns}
            loading={isLoading}
            totalCount={data?.count || 0}
            page={page}
            onPageChange={setPage}
            actions={actions}
            keyExtractor={(item) => item.id}
          />
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Compliance Item' : 'Add Compliance Item'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., GST Filing - April 2026"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select 
                value={formData.complianceType} 
                onValueChange={(v) => setFormData({ ...formData, complianceType: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {complianceTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            {editingItem && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select 
                  value={formData.status} 
                  onValueChange={(v) => setFormData({ ...formData, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formData.title || !formData.dueDate || createItem.isPending || updateItem.isPending}
            >
              {(createItem.isPending || updateItem.isPending) && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
