import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HabitCard } from './HabitCard';

describe('HabitCard - Pure Component', () => {
  const mockHabit = {
    id: 1,
    name: 'Exercise',
    description: 'Daily workout',
    streak: 5,
    completedDates: [],
  };

  it('renders habit details', () => {
    render(<HabitCard habit={mockHabit} onToggle={vi.fn()} onEdit={vi.fn()} />);
    
    expect(screen.getByText('Exercise')).toBeInTheDocument();
    expect(screen.getByText('Daily workout')).toBeInTheDocument();
    expect(screen.getByText(/Streak: 5 days/)).toBeInTheDocument();
  });

  it('shows bronze badge for 5 day streak', () => {
    render(<HabitCard habit={mockHabit} onToggle={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });

  it('calls onToggle when mark done clicked', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    
    render(<HabitCard habit={mockHabit} onToggle={onToggle} onEdit={vi.fn()} />);
    
    await user.click(screen.getByTestId('toggle-button'));
    expect(onToggle).toHaveBeenCalledWith(1, expect.any(String));
  });

  it('calls onEdit when edit clicked', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    
    render(<HabitCard habit={mockHabit} onToggle={vi.fn()} onEdit={onEdit} />);
    
    await user.click(screen.getByTestId('edit-button'));
    expect(onEdit).toHaveBeenCalledWith(mockHabit);
  });

  it('shows completed state when habit done today', () => {
    const today = new Date().toISOString().split('T')[0];
    const completedHabit = { ...mockHabit, completedDates: [today] };
    
    render(<HabitCard habit={completedHabit} onToggle={vi.fn()} onEdit={vi.fn()} />);
    expect(screen.getByText('✓ Done')).toBeInTheDocument();
  });
});
