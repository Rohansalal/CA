// @ts-nocheck
import { useState } from 'react';
import { useTickets, useUpdateTicket, useDeleteTicket } from '../../api/hooks/useTickets';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Edit, Trash2, Loader2, Ticket as TicketIcon, MessageSquare } from 'lucide-react';
import type { Ticket } from '../../types';

const statusOptions = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const priorityOptions = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export function SupportTickets() {
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  
  const { data, isLoading } = useTickets({ page, limit: 10 });
  const updateTicket = useUpdateTicket();
  const deleteTicket = useDeleteTicket();

  const handleUpdate = async () => {
    if (!selectedTicket) return;
    
    try {
      await updateTicket.mutateAsync({
        id: selectedTicket.id,
        status: status as any,
        priority: priority as any,
      });
      setSelectedTicket(null);
    } catch {
      // Error handled by hook
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      try {
        await deleteTicket.mutateAsync(id);
      } catch {
        // Error handled by hook
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'destructive';
      case 'HIGH': return 'warning';
      case 'MEDIUM': return 'default';
      default: return 'secondary';
    }
  };

  const columns = [
    {
      key: 'subject',
      header: 'Subject',
      render: (ticket: Ticket) => (
        <div>
          <p className="font-medium">{ticket.subject}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{ticket.description}</p>
        </div>
      ),
    },
    {
      key: 'user',
      header: 'Customer',
      render: (ticket: Ticket) => (
        <div>
          <p className="text-sm">{ticket.user?.name || 'Unknown'}</p>
          <p className="text-xs text-muted-foreground">{ticket.user?.email}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (ticket: Ticket) => (
        <Badge 
          variant={
            ticket.status === 'RESOLVED' ? 'success' : 
            ticket.status === 'CLOSED' ? 'secondary' : 
            ticket.status === 'IN_PROGRESS' ? 'info' : 'warning'
          }
        >
          {ticket.status}
        </Badge>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (ticket: Ticket) => (
        <Badge variant={getPriorityColor(ticket.priority)}>
          {ticket.priority}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (ticket: Ticket) => (
        <span className="text-muted-foreground">
          {new Date(ticket.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  const actions = (ticket: Ticket) => (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setSelectedTicket(ticket);
          setStatus(ticket.status);
          setPriority(ticket.priority);
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-600"
        onClick={() => handleDelete(ticket.id)}
        disabled={deleteTicket.isPending}
      >
        {deleteTicket.isPending && deleteTicket.variables === ticket.id ? (
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
          <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
          <p className="text-muted-foreground">
            Manage customer support requests
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TicketIcon className="h-5 w-5" />
            All Tickets
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
            keyExtractor={(ticket) => ticket.id}
          />
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedTicket(null)} />
          <div className="relative z-50 bg-background rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Update Ticket</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <p className="text-sm">{selectedTicket.subject}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                Cancel
              </Button>
              <Button 
                onClick={handleUpdate}
                disabled={updateTicket.isPending}
              >
                {updateTicket.isPending && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
