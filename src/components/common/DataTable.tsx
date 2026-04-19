import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Download, Loader2, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { cn } from '../../utils/cn';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  totalCount?: number;
  page?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onExport?: () => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  keyExtractor: (item: T) => string | number;
}

export function DataTable<T>({
  data,
  columns,
  loading,
  totalCount = 0,
  page = 1,
  limit = 10,
  onPageChange,
  onSearch,
  onFilter,
  onExport,
  actions,
  emptyMessage = 'No matching records found',
  keyExtractor,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const totalPages = Math.ceil(totalCount / limit);
  const startItem = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalCount);

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Quick search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-11 h-11 bg-white border-slate-200 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 rounded-xl transition-all"
            />
          </div>
          {onFilter && (
            <Button variant="outline" onClick={onFilter} className="h-11 rounded-xl border-slate-200 font-bold gap-2 hover:bg-white hover:text-blue-600 transition-all">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {onExport && (
            <Button variant="outline" onClick={onExport} className="h-11 rounded-xl border-slate-200 font-bold gap-2 hover:bg-white hover:text-emerald-600 transition-all flex-1 md:flex-none">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          )}
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 hidden lg:block">
            {totalCount} total results
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]',
                      column.sortable && 'cursor-pointer hover:text-blue-600 transition-colors'
                    )}
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center gap-2">
                      {column.header}
                      {column.sortable && <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-20 text-center"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-widest">Retrieving data...</p>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-20 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-2">
                        <Search size={32} />
                      </div>
                      <p className="text-base font-bold text-slate-900">{emptyMessage}</p>
                      <p className="text-sm font-medium text-slate-400 max-w-xs mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr 
                    key={keyExtractor(item)} 
                    className="hover:bg-blue-50/30 transition-colors group"
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-700">
                          {column.render
                            ? column.render(item)
                            : (item as any)[column.key]}
                        </div>
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          {actions(item)}
                        </div>
                        <div className="group-hover:hidden text-slate-300">
                          <MoreHorizontal className="w-5 h-5 ml-auto" />
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <div className="text-sm font-bold text-slate-500">
          Showing <span className="text-slate-900">{startItem}</span> to <span className="text-slate-900">{endItem}</span> of <span className="text-slate-900">{totalCount}</span> records
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange?.(page - 1)}
            disabled={page === 1 || loading}
            className="w-10 h-10 rounded-xl border-slate-200 hover:bg-white hover:text-blue-600 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-1 mx-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              const isCurrent = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange?.(pageNum)}
                  className={cn(
                    'w-10 h-10 rounded-xl text-sm font-black transition-all',
                    isCurrent 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 scale-110' 
                      : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && <span className="text-slate-300 px-2">•••</span>}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange?.(page + 1)}
            disabled={page === totalPages || loading}
            className="w-10 h-10 rounded-xl border-slate-200 hover:bg-white hover:text-blue-600 disabled:opacity-30 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ACTIVE: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    INACTIVE: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    PENDING: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    COMPLETED: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    FAILED: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    PROCESSING: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    SUCCESS: 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 border-transparent',
    PAID: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    UNPAID: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    OPEN: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    CLOSED: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    APPROVED: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    REJECTED: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'rounded-lg px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider border transition-all',
        styles[status] || 'bg-slate-500/10 text-slate-600 border-slate-500/20'
      )}
    >
      {status}
    </Badge>
  );
}
