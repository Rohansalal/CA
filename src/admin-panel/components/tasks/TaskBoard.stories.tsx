import type { Meta, StoryObj } from '@storybook/react';
import { TaskBoard } from './TaskBoard';
import { Task } from './types';

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'GST Return Filing - March 2026',
    description: 'Quarterly GST filing for client ABC Corp. Ensure all invoices are verified.',
    clientId: 101,
    priority: 'HIGH',
    status: 'TODO',
    type: 'GST',
    dueDate: '2026-03-31',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
    client: { id: 101, name: 'ABC Corp', email: 'contact@abccorp.com' },
    assignedTo: { id: 1, name: 'Admin User', role: 'Senior Partner' }
  },
  {
    id: 2,
    title: 'Income Tax Audit',
    description: 'Annual tax audit for XYZ Ltd. Check compliance with Section 44AB.',
    clientId: 102,
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    type: 'ITR',
    dueDate: '2026-04-15',
    createdAt: '2026-03-05',
    updatedAt: '2026-03-10',
    client: { id: 102, name: 'XYZ Ltd', email: 'finance@xyz.com' },
    assignedTo: { id: 2, name: 'Rohan Sharma', role: 'Junior Associate' }
  }
];

const meta: Meta<typeof TaskBoard> = {
  title: 'Admin/TaskBoard',
  component: TaskBoard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskBoard>;

export const Default: Story = {
  args: {
    initialTasks: mockTasks,
  },
};

export const Empty: Story = {
  args: {
    initialTasks: [],
  },
};
