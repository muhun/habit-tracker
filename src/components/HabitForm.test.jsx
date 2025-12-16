import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HabitForm } from './HabitForm';

describe('HabitForm - Pure Component', () => {
  it('renders form inputs', () => {
    render(<HabitForm onSubmit={vi.fn()} />);
    
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('submits form with input values', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<HabitForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByTestId('name-input'), 'Exercise');
    await user.type(screen.getByTestId('description-input'), 'Daily workout');
    await user.click(screen.getByTestId('submit-button'));
    
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Exercise',
      description: 'Daily workout',
    });
  });

  it('does not submit with empty name', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    
    render(<HabitForm onSubmit={onSubmit} />);
    await user.click(screen.getByTestId('submit-button'));
    
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('populates form when editing habit', () => {
    const habit = { name: 'Read', description: 'Books' };
    render(<HabitForm habit={habit} onSubmit={vi.fn()} />);
    
    expect(screen.getByTestId('name-input')).toHaveValue('Read');
    expect(screen.getByTestId('description-input')).toHaveValue('Books');
  });

  it('shows cancel button when onCancel provided', () => {
    render(<HabitForm onSubmit={vi.fn()} onCancel={vi.fn()} />);
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
  });

  it('calls onCancel when cancel clicked', async () => {
    const onCancel = vi.fn();
    const user = userEvent.setup();
    
    render(<HabitForm onSubmit={vi.fn()} onCancel={onCancel} />);
    await user.click(screen.getByTestId('cancel-button'));
    
    expect(onCancel).toHaveBeenCalled();
  });
});
