import { Badge } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['bronze', 'silver', 'golden', 'diamond'],
    },
    streak: {
      control: { type: 'number', min: 1, max: 100 },
    },
  },
};

export const Bronze = {
  args: {
    type: 'bronze',
    streak: 3,
  },
};

export const Silver = {
  args: {
    type: 'silver',
    streak: 7,
  },
};

export const Golden = {
  args: {
    type: 'golden',
    streak: 30,
  },
};

export const Diamond = {
  args: {
    type: 'diamond',
    streak: 100,
  },
};

export const NoBadge = {
  args: {
    type: null,
    streak: 0,
  },
};