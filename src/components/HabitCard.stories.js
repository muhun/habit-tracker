import { HabitCard } from './HabitCard';
import { fn } from '@storybook/test';

export default {
  title: 'Components/HabitCard',
  component: HabitCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
    onEdit: fn(),
  },
};

const today = new Date().toISOString().split('T')[0];

export const NewHabit = {
  args: {
    habit: {
      id: 1,
      name: 'Morning Exercise',
      description: '30 minutes of cardio or strength training',
      streak: 0,
      completedDates: [],
    },
  },
};

export const CompletedToday = {
  args: {
    habit: {
      id: 1,
      name: 'Read Books',
      description: 'Read for at least 20 minutes',
      streak: 5,
      completedDates: [today],
    },
  },
};

export const BronzeBadge = {
  args: {
    habit: {
      id: 1,
      name: 'Meditation',
      description: '10 minutes of mindfulness',
      streak: 3,
      completedDates: [],
    },
  },
};

export const SilverBadge = {
  args: {
    habit: {
      id: 1,
      name: 'Drink Water',
      description: '8 glasses daily',
      streak: 7,
      completedDates: [],
    },
  },
};

export const GoldenBadge = {
  args: {
    habit: {
      id: 1,
      name: 'Daily Journal',
      description: 'Write thoughts and reflections',
      streak: 30,
      completedDates: [],
    },
  },
};

export const DiamondBadge = {
  args: {
    habit: {
      id: 1,
      name: 'Code Practice',
      description: 'Practice coding for 1 hour',
      streak: 100,
      completedDates: [],
    },
  },
};