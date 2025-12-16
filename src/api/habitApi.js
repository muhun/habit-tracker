// API layer for network calls
const API_URL = '/api';

export const fetchHabits = async () => {
  const response = await fetch(`${API_URL}/habits`);
  if (!response.ok) throw new Error('Failed to fetch habits');
  return response.json();
};

export const createHabit = async (habit) => {
  const response = await fetch(`${API_URL}/habits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit),
  });
  if (!response.ok) throw new Error('Failed to create habit');
  return response.json();
};

export const updateHabit = async (id, habit) => {
  const response = await fetch(`${API_URL}/habits/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habit),
  });
  if (!response.ok) throw new Error('Failed to update habit');
  return response.json();
};

export const toggleHabitCompletion = async (id, date) => {
  const response = await fetch(`${API_URL}/habits/${id}/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date }),
  });
  if (!response.ok) throw new Error('Failed to toggle habit');
  return response.json();
};
