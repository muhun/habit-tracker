import { Badge } from './Badge';
import { getBadgeType } from '../utils/dateUtils';

// Pure presentational component
export const HabitCard = ({ habit, onToggle, onEdit }) => {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates?.includes(today);
  const badgeType = getBadgeType(habit.streak || 0);

  return (
    <div
      data-testid="habit-card"
      style={{
        border: '1px solid #ddd',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '12px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: '0 0 8px 0' }}>{habit.name}</h3>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{habit.description}</p>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              Streak: {habit.streak || 0} days
            </span>
            {badgeType && (
              <div style={{ marginTop: '4px' }}>
                <Badge type={badgeType} streak={habit.streak} />
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            data-testid="toggle-button"
            onClick={() => onToggle(habit.id, today)}
            style={{
              padding: '8px 16px',
              backgroundColor: isCompletedToday ? '#4CAF50' : '#ddd',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isCompletedToday ? '✓ Done' : 'Mark Done'}
          </button>
          <button
            data-testid="edit-button"
            onClick={() => onEdit(habit)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
