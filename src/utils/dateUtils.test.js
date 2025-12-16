import { describe, it, expect } from 'vitest';
import { getDaysDifference, calculateStreak, getBadgeType } from './dateUtils';

describe('dateUtils - Pure Functions', () => {
  describe('getDaysDifference', () => {
    it('calculates difference between two dates', () => {
      expect(getDaysDifference('2024-01-01', '2024-01-05')).toBe(4);
      expect(getDaysDifference('2024-01-05', '2024-01-01')).toBe(-4);
    });

    it('returns 0 for same date', () => {
      expect(getDaysDifference('2024-01-01', '2024-01-01')).toBe(0);
    });
  });

  describe('calculateStreak', () => {
    it('returns 0 for empty array', () => {
      expect(calculateStreak([])).toBe(0);
    });

    it('calculates consecutive streak', () => {
      const today = new Date();
      const dates = [
        new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        today.toISOString().split('T')[0],
      ];
      expect(calculateStreak(dates)).toBe(3);
    });

    it('stops at first gap', () => {
      const today = new Date();
      const dates = [
        new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        today.toISOString().split('T')[0],
      ];
      expect(calculateStreak(dates)).toBe(2);
    });
  });

  describe('getBadgeType', () => {
    it('returns golden for 30+ days', () => {
      expect(getBadgeType(30)).toBe('golden');
      expect(getBadgeType(50)).toBe('golden');
    });

    it('returns silver for 7-29 days', () => {
      expect(getBadgeType(7)).toBe('silver');
      expect(getBadgeType(26)).toBe('silver');
    });

    it('returns bronze for 3-6 days', () => {
      expect(getBadgeType(3)).toBe('bronze');
      expect(getBadgeType(6)).toBe('bronze');
    });

    it('returns null for less than 3 days', () => {
      expect(getBadgeType(0)).toBe(null);
      expect(getBadgeType(2)).toBe(null);
    });
  });
});
