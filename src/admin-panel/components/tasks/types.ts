export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'UNASSIGNED' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';

export interface User {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  email?: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string | number;
  title: string;
  description: string;
  clientId: number;
  assignedToId?: number;
  priority: Priority;
  status: TaskStatus;
  type: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  assignedTo?: User;
}

export interface Column {
  id: TaskStatus;
  title: string;
  taskIds: (string | number)[];
}
