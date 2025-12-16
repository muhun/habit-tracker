import { HabitContainerMock } from './HabitContainerMock';

export default {
  title: 'Containers/HabitContainer',
  component: HabitContainerMock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Container component that connects state management with presentational components. Handles habit CRUD operations and integrates with the API layer.',
      },
    },
  },
  tags: ['autodocs'],
};

const today = new Date().toISOString().split('T')[0];

export const WithHabits = {
  args: {
    initialHabits: [
      {
        id: 1,
        name: 'Morning Exercise',
        description: '30 minutes of cardio or strength training',
        streak: 4,
        completedDates: [today],
      },
      {
        id: 2,
        name: 'Read Books',
        description: 'Read for at least 20 minutes',
        streak: 10,
        completedDates: [],
      },
      {
        id: 3,
        name: 'Meditation',
        description: '10 minutes of mindfulness meditation',
        streak: 30,
        completedDates: [],
      },
    ],
  },
};

export const EmptyState = {
  args: {
    initialHabits: [],
  },
};

export const LoadingState = {
  args: {
    initialHabits: [],
    loading: true,
  },
};