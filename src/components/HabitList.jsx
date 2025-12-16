import { HabitCard } from './HabitCard';

// Pure presentational component
export const HabitList = ({ habits, onToggle, onEdit, loading, error }) => {
  if (loading) {
    return <div data-testid="loading">Loading habits...</div>;
  }

  if (error) {
    return <div data-testid="error" style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (habits.length === 0) {
    return <div data-testid="empty">No habits yet. Add your first habit!</div>;
  }

  return (
    <div data-testid="habit-list">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onToggle={onToggle} onEdit={onEdit} />
      ))}
    </div>
  );
};
