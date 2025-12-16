import { HabitForm } from './HabitForm';
import { fn } from '@storybook/test';

export default {
  title: 'Components/HabitForm',
  component: HabitForm,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const AddNew = {
  args: {
    habit: null,
    onCancel: null,
  },
};

export const EditExisting = {
  args: {
    habit: {
      id: 1,
      name: 'Morning Exercise',
      description: '30 minutes of cardio or strength training',
    },
  },
};

export const EmptyEdit = {
  args: {
    habit: {
      id: 1,
      name: '',
      description: '',
    },
  },
};