import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { 
  MoreHorizontal, 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  LayoutGrid, 
  LayoutList,
  LayoutTemplate
} from 'lucide-react';
import { Task, TaskStatus } from './types';
import { TaskCard } from './TaskCard';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../components/ui/utils';

interface TaskColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask?: (status: TaskStatus) => void;
  onQuickEdit?: (task: Task) => void;
  onOpenDetails?: (task: Task) => void;
}

const statusColors: Record<TaskStatus, { border: string; bg: string; text: string; dot: string }> = {
  UNASSIGNED: { border: 'border-slate-200', bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' },
  TODO: { border: 'border-indigo-100', bg: 'bg-indigo-50/30', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  IN_PROGRESS: { border: 'border-amber-100', bg: 'bg-amber-50/30', text: 'text-amber-700', dot: 'bg-amber-500' },
  REVIEW: { border: 'border-purple-100', bg: 'bg-purple-50/30', text: 'text-purple-700', dot: 'bg-purple-500' },
  COMPLETED: { border: 'border-emerald-100', bg: 'bg-emerald-50/30', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

export const TaskColumn: React.FC<TaskColumnProps> = ({ 
  id, 
  title, 
  tasks, 
  onAddTask, 
  onQuickEdit, 
  onOpenDetails 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setNodeRef } = useDroppable({ id });
  
  const colors = statusColors[id];

  return (
    <div 
      className={cn(
        "flex flex-col h-full min-w-[320px] max-w-[400px] bg-slate-50/50 rounded-[28px] border border-slate-200/60 overflow-hidden transition-all duration-300",
        isCollapsed && "min-w-[80px] w-[80px] max-w-[80px]"
      )}
    >
      {/* Column Header */}
      <div className={cn(
        "p-4 flex items-center justify-between border-b border-slate-200/60 transition-all",
        isCollapsed && "flex-col gap-8 pb-10"
      )}>
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "rotate-90 origin-left ml-6 whitespace-nowrap"
        )}>
          <div className={cn("w-2 h-2 rounded-full animate-pulse", colors.dot)} />
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">{title}</h3>
          <Badge variant="outline" className="bg-white border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg px-2">
            {tasks.length}
          </Badge>
        </div>

        <div className={cn("flex items-center gap-1", isCollapsed && "flex-col")}>
          <button 
            onClick={() => onAddTask?.(id)}
            className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-indigo-600 transition-all"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          {!isCollapsed && (
            <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-400 hover:text-indigo-600 transition-all">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Task List */}
      {!isCollapsed && (
        <div 
          ref={setNodeRef}
          className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-hide"
        >
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onQuickEdit={onQuickEdit}
                  onOpenDetails={onOpenDetails}
                />
              ))
            ) : (
              <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 group hover:border-indigo-200 hover:bg-white/50 transition-all">
                <LayoutTemplate className="w-5 h-5 opacity-20 group-hover:opacity-40" />
                <span className="text-[10px] font-bold uppercase tracking-widest">No Active Tasks</span>
              </div>
            )}
          </SortableContext>
        </div>
      )}

      {/* Column Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200/60 bg-white/30 backdrop-blur-sm">
          <button 
            onClick={() => onAddTask?.(id)}
            className="w-full h-11 border border-dashed border-slate-300 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Record
          </button>
        </div>
      )}
    </div>
  );
};
