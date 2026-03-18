import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskCard } from './TaskCard';
import { Task } from './types';

const mockTask: Task = {
  id: 'task-1',
  title: 'Audit Report Review',
  description: 'Detailed review of quarterly audit reports.',
  clientId: 1,
  priority: 'URGENT',
  status: 'TODO',
  type: 'AUDIT',
  dueDate: '2026-03-31',
  createdAt: '2026-03-01',
  updatedAt: '2026-03-01',
  client: { id: 1, name: 'ABC Global', email: 'audit@abc.com' }
};

describe('TaskCard', () => {
  it('renders correctly with task details', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText('Audit Report Review')).toBeInTheDocument();
    expect(screen.getByText('Detailed review of quarterly audit reports.')).toBeInTheDocument();
    expect(screen.getByText('URGENT')).toBeInTheDocument();
    expect(screen.getByText('ABC Global')).toBeInTheDocument();
  });

  it('displays the correct priority badge', () => {
    const { rerender } = render(<TaskCard task={mockTask} />);
    expect(screen.getByText('URGENT')).toBeInTheDocument();

    rerender(<TaskCard task={{ ...mockTask, priority: 'LOW' }} />);
    expect(screen.getByText('LOW')).toBeInTheDocument();
  });
});
