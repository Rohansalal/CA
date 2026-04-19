import { useState } from 'react';
import { useEDiaryEntries, useApproveDiaryEntry } from '../../api/hooks/useHRMS';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CheckCircle, XCircle, Loader2, BookOpen } from 'lucide-react';
import type { EDiaryEntry } from '../../types';

export function EDiary() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useEDiaryEntries();
  const approveEntry = useApproveDiaryEntry();

  const handleApprove = async (id: number) => {
    try {
      await approveEntry.mutateAsync({ id, approved: true });
    } catch {
      // Error handled by hook
    }
  };

  const handleReject = async (id: number) => {
    try {
      await approveEntry.mutateAsync({ id, approved: false });
    } catch {
      // Error handled by hook
    }
  };

  const columns = [
    {
      key: 'article',
      header: 'Article Clerk',
      render: (entry: EDiaryEntry) => (
        <div>
          <p className="font-medium">ID: {entry.articleId}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (entry: EDiaryEntry) => (
        <span className="text-sm">{new Date(entry.date).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'taskDescription',
      header: 'Task',
      render: (entry: EDiaryEntry) => (
        <p className="text-sm max-w-xs line-clamp-2">{entry.taskDescription}</p>
      ),
    },
    {
      key: 'area',
      header: 'Area',
      render: (entry: EDiaryEntry) => (
        <Badge variant="secondary">{entry.area}</Badge>
      ),
    },
    {
      key: 'hoursSpent',
      header: 'Hours',
      render: (entry: EDiaryEntry) => (
        <span className="font-medium">{entry.hoursSpent}h</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (entry: EDiaryEntry) => (
        <Badge 
          variant={entry.principalApproved ? 'success' : 'warning'}
        >
          {entry.principalApproved ? 'Approved' : 'Pending'}
        </Badge>
      ),
    },
  ];

  const actions = (entry: EDiaryEntry) => {
    if (entry.principalApproved) return null;
    
    return (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-green-600 hover:text-green-700"
          onClick={() => handleApprove(entry.id)}
          disabled={approveEntry.isPending}
        >
          {approveEntry.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-600 hover:text-red-700"
          onClick={() => handleReject(entry.id)}
          disabled={approveEntry.isPending}
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">E-Diary</h2>
          <p className="text-muted-foreground">
            Review article clerk diary entries
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Diary Entries
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
            keyExtractor={(entry) => entry.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
