import { describe, it, expect } from 'vitest';
import {
  timeAgo,
  formatDuration,
  isoToLocale,
  dayOfWeek,
  monthName,
  isFutureDate,
  isPastDate,
  calculateAge,
} from './datetime.formatters';
import {
  FmtTimeAgoPipe,
  FmtDurationPipe,
  FmtIsoToLocalePipe,
  FmtDayOfWeekPipe,
  FmtMonthNamePipe,
  FmtIsFuturePipe,
  FmtIsPastPipe,
  FmtAgePipe,
} from './datetime.pipes';

describe('DateTime Formatters & Pipes', () => {
  describe('timeAgo', () => {
    it('should format relative past time', () => {
      const past = new Date(Date.now() - 3600 * 1000);
      expect(timeAgo(past)).toMatch(/hour/i);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtTimeAgoPipe();
      const justNow = new Date(Date.now() - 10000);
      expect(pipe.transform(justNow)).toBe('just now');
    });
  });

  describe('formatDuration', () => {
    it('should format durations', () => {
      expect(formatDuration(3665, 'short')).toBe('1h 1m 5s');
      expect(formatDuration(3665, 'digital')).toBe('01:01:05');
      expect(formatDuration(125, 'long')).toBe('2 minutes 5 seconds');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtDurationPipe();
      expect(pipe.transform(45)).toBe('45s');
    });
  });

  describe('isoToLocale', () => {
    it('should format date string to locale', () => {
      const d = '2026-10-03T12:00:00Z';
      expect(isoToLocale(d, 'en-US')).toMatch(/2026/);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtIsoToLocalePipe();
      expect(pipe.transform('2026-01-01')).toMatch(/2026/);
    });
  });

  describe('dayOfWeek', () => {
    it('should return day name', () => {
      // 2026-10-03 is a Saturday
      expect(dayOfWeek('2026-10-03', 'long', 'en-US')).toBe('Saturday');
      expect(dayOfWeek('2026-10-03', 'short', 'en-US')).toBe('Sat');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtDayOfWeekPipe();
      expect(pipe.transform('2026-10-03')).toBe('Saturday');
    });
  });

  describe('monthName', () => {
    it('should return month name', () => {
      expect(monthName('2026-10-03', 'long', 'en-US')).toBe('October');
      expect(monthName('2026-10-03', 'short', 'en-US')).toBe('Oct');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtMonthNamePipe();
      expect(pipe.transform('2026-10-03')).toBe('October');
    });
  });

  describe('isFutureDate & isPastDate', () => {
    it('should detect future and past dates', () => {
      const future = new Date(Date.now() + 100000000);
      const past = new Date(Date.now() - 100000000);
      expect(isFutureDate(future)).toBe(true);
      expect(isFutureDate(past)).toBe(false);
      expect(isPastDate(past)).toBe(true);
      expect(isPastDate(future)).toBe(false);
    });

    it('pipes should transform correctly', () => {
      const futurePipe = new FmtIsFuturePipe();
      const pastPipe = new FmtIsPastPipe();
      const future = new Date(Date.now() + 100000000);
      expect(futurePipe.transform(future)).toBe(true);
      expect(pastPipe.transform(future)).toBe(false);
    });
  });

  describe('calculateAge', () => {
    it('should calculate age accurately', () => {
      const today = new Date();
      const birth = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
      expect(calculateAge(birth)).toBe(25);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtAgePipe();
      const today = new Date();
      const birth = new Date(today.getFullYear() - 30, today.getMonth(), today.getDate());
      expect(pipe.transform(birth)).toBe(30);
    });
  });
});
