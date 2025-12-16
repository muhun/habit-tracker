import { useState } from 'react';
import { HabitList } from './HabitList';
import { HabitForm } from './HabitForm';

// Mock version of HabitContainer for Storybook with sample data
export const HabitContainerMock = ({ initialHabits = [], loading = false, error = null }) => {
  const [habits, setHabits] = useState(initialHabits);
  const [editingHabit, setEditingHabit] = useState(null);

  const handleSubmit = (habitData) => {
    if (editingHabit) {
      setHabits(habits.map(h => h.id === editingHabit.id ? { ...h, ...habitData } : h));
      setEditingHabit(null);
    } else {
      const newHabit = {
        id: Date.now(),
        ...habitData,
        streak: 0,
        completedDates: [],
      };
      setHabits([...habits, newHabit]);
    }
  };

  const handleToggle = (id, date) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;
      const dates = habit.completedDates || [];
      const isCompleted = dates.includes(date);
      const completedDates = isCompleted
        ? dates.filter(d => d !== date)
        : [...dates, date];
      return { ...habit, completedDates, streak: completedDates.length };
    }));
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