import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useHabits, useHabitActions } from './useHabits';
import * as habitApi from '../api/habitApi';

vi.mock('../api/habitApi');

describe('useHabits hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads habits on mount', async () => {
    const mockHabits = [{ id: 1, name: 'Exercise', completedDates: [] }];
    habitApi.fetchHabits.mockResolvedValue(mockHabits);

    const { result } = renderHook(() => useHabits());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.habits).toEqual(mockHabits);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error', async () => {
    habitApi.fetchHabits.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useHabits());

    await waitFor(() => {
      expect(result.current.error).toBe('Network error');
    });
  });
});

describe('useHabitActions hook', () => {
  it('creates habit via API', async () => {
    const newHabit = { name: 'Read', completedDates: [] };
    habitApi.createHabit.mockResolvedValue({ id: 1, ...newHabit });

    const { result } = renderHook(() => useHabitActions());
    const created = await result.current.createHabit(newHabit);

    expect(created.id).toBe(1);
    expect(habitApi.createHabit).toHaveBeenCalledWith(newHabit);
  });
});
