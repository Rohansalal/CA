import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskBoard } from './TaskBoard';
import { Task } from './types';

const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Test Task 1',
    description: 'Description 1',
    clientId: 1,
    priority: 'HIGH',
    status: 'TODO',
    type: 'GST',
    dueDate: '2026-03-31',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
    client: { id: 1, name: 'Client A', email: 'a@client.com' }
  }
];

describe('TaskBoard', () => {
  it('renders correctly with initial tasks', () => {
    render(<TaskBoard initialTasks={mockTasks} />);
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Client A')).toBeInTheDocument();
  });

  it('filters tasks based on search input', () => {
    render(<TaskBoard initialTasks={mockTasks} />);
    const searchInput = screen.getByPlaceholderText('Search records...');
    
    fireEvent.change(searchInput, { target: { value: 'Non-existent Task' } });
    expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Test Task' } });
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  });

  it('renders all status columns', () => {
    render(<TaskBoard initialTasks={[]} />);
    expect(screen.getByText('Unassigned')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });
});
