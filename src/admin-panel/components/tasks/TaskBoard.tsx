import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { 
  Search, 
  Filter, 
  Settings, 
  Plus, 
  LayoutGrid, 
  List, 
  Kanban,
  Zap,
  ShieldCheck,
  Server
} from 'lucide-react';
import { Task, TaskStatus, Column } from './types';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../components/ui/utils';

interface TaskBoardProps {
  initialTasks: Task[];
  onTaskUpdate?: (task: Task) => void;
  onTaskMove?: (taskId: string | number, newStatus: TaskStatus) => void;
}

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'UNASSIGNED', title: 'Unassigned' },
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'REVIEW', title: 'Review' },
  { id: 'COMPLETED', title: 'Completed' },
];

export const TaskBoard: React.FC<TaskBoardProps> = ({ initialTasks, onTaskUpdate, onTaskMove }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if dragging over a column or another task
    const isOverAColumn = COLUMNS.some((col) => col.id === overId);
    const overTask = tasks.find((t) => t.id === overId);

    if (isOverAColumn) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        setTasks((prev) => 
          prev.map((t) => (t.id === activeId ? { ...t, status: newStatus } : t))
        );
      }
    } else if (overTask) {
      if (activeTask.status !== overTask.status) {
        setTasks((prev) => 
          prev.map((t) => (t.id === activeId ? { ...t, status: overTask.status } : t))
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (activeTask) {
      onTaskMove?.(activeId, activeTask.status);
    }

    setActiveTask(null);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.client?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority ? t.priority === filterPriority : true;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="flex flex-col h-full space-y-8 font-outfit p-4 md:p-8">
      {/* Control Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Zap className="w-4 h-4 fill-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Workflow Management</span>
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Active Task Board</h1>
          <p className="text-slate-500 text-sm font-medium">Real-time synchronization across all departments</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..." 
              className="h-11 pl-11 pr-4 w-[240px] bg-white border-slate-200 rounded-xl text-sm font-semibold focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>
          <Button variant="outline" className="h-11 px-5 border-slate-200 text-slate-600 rounded-xl font-bold text-xs">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="h-11 px-6 bg-[#0F172A] hover:bg-slate-800 text-black rounded-xl font-bold text-xs shadow-lg shadow-slate-200 transition-all active:scale-95">
            <Plus className="w-4 h-4 mr-2" />
            New Assignment
          </Button>
        </div>
      </div>

      {/* Board Metadata */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 rounded-[20px] border border-slate-200/60">
        <div className="flex items-center gap-4">
          <Badge className="bg-white text-indigo-600 border-indigo-100 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
            Total Active: {tasks.length}
          </Badge>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+50}`} alt="Team" />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">+8 Contributors</p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Sync: Active</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg bg-slate-50 text-indigo-600 shadow-sm"><Kanban className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-600"><List className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-600"><LayoutGrid className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      {/* Kanban Container */}
      <div className="flex-1 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-8 h-full items-start min-h-[600px]">
            {COLUMNS.map((column) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.title}
                tasks={filteredTasks.filter((t) => t.status === column.id)}
                onQuickEdit={onTaskUpdate}
              />
            ))}
          </div>

          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: {
                  active: {
                    opacity: '0.5',
                  },
                },
              }),
            }}
          >
            {activeTask ? <TaskCard task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};
