import { create } from 'zustand';
import { calculateStreak } from '../utils/dateUtils';

export const useHabitStore = create((set, get) => ({
  habits: [],
  loading: false,
  error: null,

  setHabits: (habits) => set({ habits }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  addHabit: (habit) => set((state) => ({
    habits: [...state.habits, habit],
  })),

  updateHabit: (id, updates) => set((state) => ({
    habits: state.habits.map((h) => h.id === id ? { ...h, ...updates } : h),
  })),

  toggleCompletion: (id, date) => set((state) => ({
    habits: state.habits.map((h) => {
      if (h.id !== id) return h;
      const dates = h.completedDates || [];
      const isCompleted = dates.includes(date);
      const completedDates = isCompleted
        ? dates.filter((d) => d !== date)
        : [...dates, date];
      return { ...h, completedDates, streak: calculateStreak(completedDates) };
    }),
  })),

  getHabitById: (id) => get().habits.find((h) => h.id === id),
}));
