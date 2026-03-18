import type { Meta, StoryObj } from '@storybook/react';
import { TaskCard } from './TaskCard';
import { Task } from './types';

const mockTask: Task = {
  id: 'task-1',
  title: 'Urgent Audit Compliance Check',
  description: 'Review all financial records for compliance with new tax regulations. Ensure all documentation is uploaded to the secure portal.',
  clientId: 1,
  priority: 'URGENT',
  status: 'TODO',
  type: 'AUDIT',
  dueDate: '2026-03-31',
  createdAt: '2026-03-01',
  updatedAt: '2026-03-01',
  client: { id: 1, name: 'ABC Global Solutions', email: 'audit@abcglobal.com' },
  assignedTo: { id: 1, name: 'Admin User', role: 'Partner' }
};

const meta: Meta<typeof TaskCard> = {
  title: 'Admin/TaskCard',
  component: TaskCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  args: {
    task: mockTask,
  },
};

export const HighPriority: Story = {
  args: {
    task: { ...mockTask, priority: 'HIGH' },
  },
};

export const MediumPriority: Story = {
  args: {
    task: { ...mockTask, priority: 'MEDIUM' },
  },
};

export const LowPriority: Story = {
  args: {
    task: { ...mockTask, priority: 'LOW' },
  },
};
