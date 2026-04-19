// @ts-nocheck
import { useState } from 'react';
import { useStipendLogs, useRecordStipend } from '../../api/hooks/useHRMS';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Plus, Loader2, Wallet } from 'lucide-react';
import type { StipendLog } from '../../types';

export function Stipends() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleId, setArticleId] = useState('');
  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  
  const { data, isLoading } = useStipendLogs({ page, limit: 10 });
  const recordStipend = useRecordStipend();

  const handleSave = async () => {
    if (!articleId || !month || !amount) return;
    
    try {
      await recordStipend.mutateAsync({
        articleId: Number(articleId),
        month,
        amount: Number(amount),
      });
      setIsModalOpen(false);
      setArticleId('');
      setMonth('');
      setAmount('');
    } catch {
      // Error handled by hook
    }
  };

  const columns = [
    {
      key: 'articleId',
      header: 'Article ID',
      render: (log: StipendLog) => <span className="font-medium">{log.articleId}</span>,
    },
    {
      key: 'month',
      header: 'Month',
      render: (log: StipendLog) => <span>{log.month}</span>,
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (log: StipendLog) => (
        <span className="font-medium">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
          }).format(log.amount)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (log: StipendLog) => (
        <Badge variant={log.status === 'PAID' ? 'success' : 'warning'}>
          {log.status}
        </Badge>
      ),
    },
    {
      key: 'paidAt',
      header: 'Paid On',
      render: (log: StipendLog) => (
        <span className="text-muted-foreground">
          {new Date(log.paidAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stipends</h2>
          <p className="text-muted-foreground">
            Manage article clerk stipend payments
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Payment History
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
            keyExtractor={(log) => log.id}
          />
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Stipend Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Article ID</label>
              <Input
                type="number"
                value={articleId}
                onChange={(e) => setArticleId(e.target.value)}
                placeholder="Enter article clerk ID"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Month (YYYY-MM)</label>
              <Input
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="2026-04"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (INR)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!articleId || !month || !amount || recordStipend.isPending}
            >
              {recordStipend.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Record Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
