import { useState } from 'react';
import { useHabits, useHabitActions } from '../hooks/useHabits';
import { HabitList } from './HabitList';
import { HabitForm } from './HabitForm';

// Container component - connects state and actions to presentational components
export const HabitContainer = () => {
  const { habits, loading, error } = useHabits();
  const { createHabit, editHabit, toggleHabit } = useHabitActions();
  const [editingHabit, setEditingHabit] = useState(null);

  const handleSubmit = async (habitData) => {
    try {
      if (editingHabit) {
        await editHabit(editingHabit.id, habitData);
        setEditingHabit(null);
      } else {
        await createHabit(habitData);
      }
    } catch (err) {
      console.error('Failed to save habit:', err);
    }
  };

  const handleToggle = async (id, date) => {
    try {
      await toggleHabit(id, date);
    } catch (err) {
      console.error('Failed to toggle habit:', err);
    }
  };

  const handleEdit = (habit) => {
    setEditingHabit(habit);
  };

  const handleCancel = () => {
    setEditingHabit(null);
  };

  return (
    <div data-testid="habit-container">
      <h1>Habit Tracker</h1>
      <HabitForm
        habit={editingHabit}
        onSubmit={handleSubmit}
        onCancel={editingHabit ? handleCancel : null}
      />
      <HabitList
        habits={habits}
        loading={loading}
        error={error}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
    </div>
  );
};
