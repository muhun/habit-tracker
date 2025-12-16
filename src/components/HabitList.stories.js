import { HabitList } from './HabitList';
import { fn } from '@storybook/test';

export default {
  title: 'Components/HabitList',
  component: HabitList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
    onEdit: fn(),
    loading: false,
    error: null,
  },
};

const today = new Date().toISOString().split('T')[0];

export const Empty = {
  args: {
    habits: [],
  },
};

export const Loading = {
  args: {
    habits: [],
    loading: true,
  },
};

export const Error = {
  args: {
    habits: [],
    error: 'Failed to load habits',
  },
};

export const WithHabits = {
  args: {
    habits: [
      {
        id: 1,
        name: 'Morning Exercise',
        description: '30 minutes of cardio',
        streak: 4,
        completedDates: [today],
      },
      {
        id: 2,
        name: 'Read Books',
        description: 'Read for 20 minutes',
        streak: 10,
        completedDates: [],
      },
      {
        id: 3,
        name: 'Meditation',
        description: '10 minutes mindfulness',
        streak: 30,
        completedDates: [],
      },
    ],
  },
};

export const MixedStreaks = {
  args: {
    habits: [
      {
        id: 1,
        name: 'New Habit',
        description: 'Just started',
        streak: 0,
        completedDates: [],
      },
      {
        id: 2,
        name: 'Bronze Level',
        description: 'Getting started',
        streak: 3,
        completedDates: [],
      },
      {
        id: 3,
        name: 'Silver Level',
        description: 'Making progress',
        streak: 7,
        completedDates: [],
      },
      {
        id: 4,
        name: 'Golden Level',
        description: 'Excellent habit',
        streak: 30,
        completedDates: [today],
      },
      {
        id: 5,
        name: 'Diamond Level',
        description: 'Master level',
        streak: 100,
        completedDates: [],
      },
    ],
  },
};