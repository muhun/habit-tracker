// Pure functions for date calculations
export const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1).setHours(0, 0, 0, 0);
  const d2 = new Date(date2).setHours(0, 0, 0, 0);
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
};

export const calculateStreak = (completedDates) => {
  if (!completedDates || completedDates.length === 0) return 0;
  
  const sorted = [...completedDates].sort((a, b) => new Date(b) - new Date(a));
  const today = new Date().toISOString().split('T')[0];
  
  if (getDaysDifference(sorted[0], today) > 1) return 0;
  
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = getDaysDifference(sorted[i], sorted[i - 1]);
    if (diff === 1) streak++;
    else break;
  }
  return streak;
};

export const getBadgeType = (streak) => {
  if (streak >= 90) return 'diamond';
  if (streak >= 30) return 'golden';
  if (streak >= 7) return 'silver';
  if (streak >= 3) return 'bronze';
  return null;
};
