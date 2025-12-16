// In-memory database
let habits = [];
let nextId = 1;

// Helper to calculate streak
const calculateStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) return 0;
  
  const sorted = [...completedDates].sort((a, b) => new Date(b) - new Date(a));
  const today = new Date().toISOString().split('T')[0];
  
  const getDaysDiff = (date1, date2) => {
    const d1 = new Date(date1).setHours(0, 0, 0, 0);
    const d2 = new Date(date2).setHours(0, 0, 0, 0);
    return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
  };
  
  if (getDaysDiff(sorted[0], today) > 1) return 0;
  
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = getDaysDiff(sorted[i], sorted[i - 1]);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
};

// Seed data
const seedData = () => {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);
  const threeDaysAgo = new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000);
  
  habits = [
    {
      id: nextId++,
      name: 'Morning Exercise',
      description: '30 minutes of cardio or strength training',
      completedDates: [
        threeDaysAgo.toISOString().split('T')[0],
        twoDaysAgo.toISOString().split('T')[0],
        yesterday.toISOString().split('T')[0],
        today.toISOString().split('T')[0],
      ],
      streak: 4,
    },
    {
      id: nextId++,
      name: 'Read Books',
      description: 'Read for at least 20 minutes',
      completedDates: Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        return date.toISOString().split('T')[0];
      }),
      streak: 10,
    },
    {
      id: nextId++,
      name: 'Meditation',
      description: '10 minutes of mindfulness meditation',
      completedDates: Array.from({ length: 30 }, (_, i) => {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        return date.toISOString().split('T')[0];
      }),
      streak: 30,
    },
    {
      id: nextId++,
      name: 'Drink Water',
      description: '8 glasses of water daily',
      completedDates: [],
      streak: 0,
    },
  ];
};

// Initialize with seed data
seedData();

// Database operations
const db = {
  getAllHabits: () => habits,
  
  getHabitById: (id) => habits.find(h => h.id === parseInt(id)),
  
  createHabit: (habitData) => {
    const newHabit = {
      id: nextId++,
      name: habitData.name,
      description: habitData.description || '',
      completedDates: [],
      streak: 0,
    };
    habits.push(newHabit);
    return newHabit;
  },
  
  updateHabit: (id, updates) => {
    const index = habits.findIndex(h => h.id === parseInt(id));
    if (index === -1) return null;
    
    habits[index] = {
      ...habits[index],
      ...updates,
      id: habits[index].id, // Preserve ID
    };
    return habits[index];
  },
  
  deleteHabit: (id) => {
    const index = habits.findIndex(h => h.id === parseInt(id));
    if (index === -1) return false;
    
    habits.splice(index, 1);
    return true;
  },
  
  toggleHabitCompletion: (id, date) => {
    const habit = habits.find(h => h.id === parseInt(id));
    if (!habit) return null;
    
    const dateStr = date || new Date().toISOString().split('T')[0];
    const dateIndex = habit.completedDates.indexOf(dateStr);
    
    if (dateIndex > -1) {
      habit.completedDates.splice(dateIndex, 1);
    } else {
      habit.completedDates.push(dateStr);
    }
    
    habit.streak = calculateStreak(habit.completedDates);
    return habit;
  },
  
  resetDatabase: () => {
    habits = [];
    nextId = 1;
    seedData();
  },
};

export default db;
