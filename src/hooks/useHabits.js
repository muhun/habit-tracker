import { useEffect } from 'react';
import { useHabitStore } from '../store/habitStore';
import * as habitApi from '../api/habitApi';

export const useHabits = () => {
  const { habits, loading, error, setHabits, setLoading, setError } = useHabitStore();

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await habitApi.fetchHabits();
      setHabits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { habits, loading, error, refetch: loadHabits };
};

export const useHabitActions = () => {
  const { addHabit, updateHabit, toggleCompletion } = useHabitStore();

  const createHabit = async (habit) => {
    try {
      const newHabit = await habitApi.createHabit(habit);
      addHabit(newHabit);
      return newHabit;
    } catch (err) {
      throw err;
    }
  };

  const editHabit = async (id, updates) => {
    try {
      const updated = await habitApi.updateHabit(id, updates);
      updateHabit(id, updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const toggleHabit = async (id, date) => {
    try {
      await habitApi.toggleHabitCompletion(id, date);
      toggleCompletion(id, date);
    } catch (err) {
      throw err;
    }
  };

  return { createHabit, editHabit, toggleHabit };
};
