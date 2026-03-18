import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Calendar, 
  MessageSquare, 
  Paperclip, 
  MoreVertical, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  User,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { format } from 'date-fns';
import { Task, Priority } from './types';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { cn } from '../../../components/ui/utils';

interface TaskCardProps {
  task: Task;
  onQuickEdit?: (task: Task) => void;
  onOpenDetails?: (task: Task) => void;
}

const priorityConfig: Record<Priority, { color: string; bg: string; icon: any }> = {
  LOW: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2 },
  MEDIUM: { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
  HIGH: { color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertCircle },
  URGENT: { color: 'text-rose-600', bg: 'bg-rose-50', icon: AlertCircle },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onQuickEdit, onOpenDetails }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const priority = priorityConfig[task.priority];
  const PriorityIcon = priority.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing",
        isDragging && "shadow-xl border-indigo-200 ring-2 ring-indigo-500/10"
      )}
      {...attributes}
      {...listeners}
    >
      <div className="space-y-4">
        {/* Header: Type & Priority */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
            {task.type}
          </Badge>
          <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-full", priority.bg)}>
            <PriorityIcon className={cn("w-3 h-3", priority.color)} />
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", priority.color)}>
              {task.priority}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#0F172A] leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
            {task.title}
          </h4>
          <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
          <Avatar className="w-6 h-6 border border-white">
            <AvatarImage src={task.client?.avatar} />
            <AvatarFallback className="bg-indigo-100 text-indigo-600 text-[8px] font-bold">
              {task.client?.name?.charAt(0) || 'C'}
            </AvatarFallback>
          </Avatar>
          <span className="text-[11px] font-bold text-slate-700 truncate">{task.client?.name}</span>
        </div>

        {/* Footer: Date, User, Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-400 group-hover:text-indigo-500 transition-colors">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-tight">
                {format(new Date(task.dueDate), 'MMM d')}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Paperclip className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">2</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {task.assignedTo ? (
              <div className="relative group/avatar">
                <Avatar className="w-7 h-7 ring-2 ring-white border border-slate-200">
                  <AvatarImage src={task.assignedTo.avatar} />
                  <AvatarFallback className="bg-slate-100 text-[#0F172A] text-[10px] font-bold">
                    {task.assignedTo.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover/avatar:block animate-in fade-in zoom-in-95">
                  <div className="bg-[#0F172A] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    {task.assignedTo.name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-indigo-300 hover:text-indigo-400 transition-all cursor-pointer">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions Overlay */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <button 
          onClick={(e) => { e.stopPropagation(); onQuickEdit?.(task); }}
          className="p-1.5 bg-white shadow-sm border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenDetails?.(task); }}
          className="p-1.5 bg-white shadow-sm border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
