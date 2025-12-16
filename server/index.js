import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes

// GET /api/habits - Get all habits
app.get('/api/habits', (req, res) => {
  const habits = db.getAllHabits();
  res.json(habits);
});

// GET /api/habits/:id - Get habit by ID
app.get('/api/habits/:id', (req, res) => {
  const habit = db.getHabitById(req.params.id);
  if (!habit) {
    return res.status(404).json({ error: 'Habit not found' });
  }
  res.json(habit);
});

// POST /api/habits - Create new habit
app.post('/api/habits', (req, res) => {
  const { name, description } = req.body;
  
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newHabit = db.createHabit({ name, description });
  res.status(201).json(newHabit);
});

// PUT /api/habits/:id - Update habit
app.put('/api/habits/:id', (req, res) => {
  const { name, description } = req.body;
  
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const updatedHabit = db.updateHabit(req.params.id, { name, description });
  
  if (!updatedHabit) {
    return res.status(404).json({ error: 'Habit not found' });
  }
  
  res.json(updatedHabit);
});

// DELETE /api/habits/:id - Delete habit
app.delete('/api/habits/:id', (req, res) => {
  const success = db.deleteHabit(req.params.id);
  
  if (!success) {
    return res.status(404).json({ error: 'Habit not found' });
  }
  
  res.status(204).send();
});

// POST /api/habits/:id/toggle - Toggle habit completion
app.post('/api/habits/:id/toggle', (req, res) => {
  const { date } = req.body;
  const updatedHabit = db.toggleHabitCompletion(req.params.id, date);
  
  if (!updatedHabit) {
    return res.status(404).json({ error: 'Habit not found' });
  }
  
  res.json(updatedHabit);
});

// POST /api/reset - Reset database (for testing)
app.post('/api/reset', (req, res) => {
  db.resetDatabase();
  res.json({ message: 'Database reset successfully' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Habits API: http://localhost:${PORT}/api/habits`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

export default app;
