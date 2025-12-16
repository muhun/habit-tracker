import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HabitContainer } from './HabitContainer';
import * as habitApi from '../api/habitApi';

vi.mock('../api/habitApi');

describe('HabitContainer - Container Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    habitApi.fetchHabits.mockResolvedValue([]);
  });

  it('renders form and list', async () => {
    render(<HabitContainer />);
    
    expect(screen.getByTestId('habit-form')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('empty')).toBeInTheDocument();
    });
  });

  it('creates new habit', async () => {
    const newHabit = { id: 1, name: 'Exercise', description: 'Workout', completedDates: [] };
    habitApi.createHabit.mockResolvedValue(newHabit);
    
    const user = userEvent.setup();
    render(<HabitContainer />);
    
    await waitFor(() => {
      expect(screen.getByTestId('habit-form')).toBeInTheDocument();
    });
    
    await user.type(screen.getByTestId('name-input'), 'Exercise');
    await user.type(screen.getByTestId('description-input'), 'Workout');
    await user.click(screen.getByTestId('submit-button'));
    
    await waitFor(() => {
      expect(habitApi.createHabit).toHaveBeenCalledWith({
        name: 'Exercise',
        description: 'Workout',
      });
    });
  });

  it('loads and displays habits', async () => {
    const mockHabits = [
      { id: 1, name: 'Exercise', description: 'Workout', streak: 5, completedDates: [] },
    ];
    habitApi.fetchHabits.mockResolvedValue(mockHabits);
    
    render(<HabitContainer />);
    
    await waitFor(() => {
      expect(screen.getByText('Exercise')).toBeInTheDocument();
    });
  });
});
