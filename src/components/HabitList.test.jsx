import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HabitList } from './HabitList';

describe('HabitList - Pure Component', () => {
  const mockHabits = [
    { id: 1, name: 'Exercise', description: 'Workout', streak: 5, completedDates: [] },
    { id: 2, name: 'Read', description: 'Books', streak: 10, completedDates: [] },
  ];

  it('renders loading state', () => {
    render(<HabitList habits={[]} loading={true} onToggle={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading habits...');
  });

  it('renders error state', () => {
    render(
      <HabitList
        habits={[]}
        loading={false}
        error="Network error"
        onToggle={vi.fn()}
        onEdit={vi.fn()}
      />
    );
    expect(screen.getByTestId('error')).toHaveTextContent('Error: Network error');
  });

  it('renders empty state', () => {
    render(<HabitList habits={[]} loading={false} onToggle={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByTestId('empty')).toHaveTextContent('No habits yet');
  });

  it('renders list of habits', () => {
    render(<HabitList habits={mockHabits} loading={false} onToggle={vi.fn()} onEdit={vi.fn()} />);
    
    expect(screen.getByTestId('habit-list')).toBeInTheDocument();
    expect(screen.getByText('Exercise')).toBeInTheDocument();
    expect(screen.getByText('Read')).toBeInTheDocument();
  });
});
