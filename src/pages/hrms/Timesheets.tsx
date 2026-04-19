// @ts-nocheck
import { useState } from 'react';
import { useTimesheets, useApproveTimesheet } from '../../api/hooks/useHRMS';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CheckCircle, Loader2, Clock, User } from 'lucide-react';
import type { Timesheet } from '../../types';

export function Timesheets() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTimesheets({ page, limit: 10 });
  const approveTimesheet = useApproveTimesheet();

  const handleApprove = async (id: number) => {
    try {
      await approveTimesheet.mutateAsync({ id, approved: true });
    } catch {
      // Error handled by hook
    }
  };

  const handleReject = async (id: number) => {
    try {
      await approveTimesheet.mutateAsync({ id, approved: false });
    } catch {
      // Error handled by hook
    }
  };

  const formatDuration = (hours: number) => {
    return `${hours}h ${Math.round((hours % 1) * 60)}m`;
  };

  const columns = [
    {
      key: 'user',
      header: 'Employee',
      render: (timesheet: Timesheet) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-medium">{timesheet.user?.name || 'Unknown'}</p>
            <p className="text-xs text-muted-foreground">{timesheet.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (timesheet: Timesheet) => (
        <span className="text-sm">{new Date(timesheet.date).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'hours',
      header: 'Duration',
      render: (timesheet: Timesheet) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{formatDuration(timesheet.hours)}</span>
        </div>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (timesheet: Timesheet) => (
        <p className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
          {timesheet.description || 'No description'}
        </p>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (timesheet: Timesheet) => (
        <Badge 
          variant={
            timesheet.status === 'APPROVED' ? 'success' : 
            timesheet.status === 'REJECTED' ? 'destructive' : 'warning'
          }
        >
          {timesheet.status}
        </Badge>
      ),
    },
  ];

  const actions = (timesheet: Timesheet) => {
    if (timesheet.status !== 'PENDING') return null;
    
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="text-green-600 hover:text-green-700"
          onClick={() => handleApprove(timesheet.id)}
          disabled={approveTimesheet.isPending && approveTimesheet.variables?.id === timesheet.id}
        >
          {approveTimesheet.isPending && approveTimesheet.variables?.id === timesheet.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          Approve
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700"
          onClick={() => handleReject(timesheet.id)}
          disabled={approveTimesheet.isPending && approveTimesheet.variables?.id === timesheet.id}
        >
          Reject
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Timesheets</h2>
          <p className="text-muted-foreground">
            Review and approve employee timesheets
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            All Timesheets
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
            keyExtractor={(timesheet) => timesheet.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
