import { describe, it, expect } from 'vitest';
import {
  formatNumberCompact,
  ordinal,
  formatPercentage,
  clamp,
  roundTo,
  padNumber,
  toRomanNumeral,
  formatFileUnit,
} from './number.formatters';
import {
  FmtNumberCompactPipe,
  FmtOrdinalPipe,
  FmtPercentagePipe,
  FmtClampPipe,
  FmtRoundPipe,
  FmtPadNumberPipe,
  FmtRomanNumeralPipe,
  FmtFileUnitPipe,
} from './number.pipes';

describe('Number Formatters & Pipes', () => {
  describe('formatNumberCompact', () => {
    it('should format numbers compactly', () => {
      const res1k = formatNumberCompact(1500);
      expect(res1k).toMatch(/1\.5K/i);
      const res1m = formatNumberCompact(2500000);
      expect(res1m).toMatch(/2\.5M/i);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtNumberCompactPipe();
      expect(pipe.transform(1000)).toMatch(/1K/i);
    });
  });

  describe('ordinal', () => {
    it('should convert numbers to ordinals', () => {
      expect(ordinal(1)).toBe('1st');
      expect(ordinal(2)).toBe('2nd');
      expect(ordinal(3)).toBe('3rd');
      expect(ordinal(4)).toBe('4th');
      expect(ordinal(11)).toBe('11th');
      expect(ordinal(12)).toBe('12th');
      expect(ordinal(13)).toBe('13th');
      expect(ordinal(21)).toBe('21st');
      expect(ordinal(102)).toBe('102nd');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtOrdinalPipe();
      expect(pipe.transform(3)).toBe('3rd');
    });
  });

  describe('formatPercentage', () => {
    it('should format decimals to percentage', () => {
      expect(formatPercentage(0.125)).toBe('12.50%');
      expect(formatPercentage(0.5, 0)).toBe('50%');
      expect(formatPercentage(85, 1, false)).toBe('85.0%');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtPercentagePipe();
      expect(pipe.transform(0.25)).toBe('25.00%');
    });
  });

  describe('clamp', () => {
    it('should clamp numbers to range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtClampPipe();
      expect(pipe.transform(100, 0, 50)).toBe(50);
    });
  });

  describe('roundTo', () => {
    it('should round numbers to decimals', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
      expect(roundTo(3.145, 2)).toBe(3.15);
      expect(roundTo(10.5555, 3)).toBe(10.556);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtRoundPipe();
      expect(pipe.transform(4.567, 1)).toBe(4.6);
    });
  });

  describe('padNumber', () => {
    it('should pad number with zeros', () => {
      expect(padNumber(7, 3)).toBe('007');
      expect(padNumber(42, 2)).toBe('42');
      expect(padNumber(-5, 3)).toBe('-005');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtPadNumberPipe();
      expect(pipe.transform(9, 2)).toBe('09');
    });
  });

  describe('toRomanNumeral', () => {
    it('should convert integers to Roman numerals', () => {
      expect(toRomanNumeral(1)).toBe('I');
      expect(toRomanNumeral(4)).toBe('IV');
      expect(toRomanNumeral(9)).toBe('IX');
      expect(toRomanNumeral(14)).toBe('XIV');
      expect(toRomanNumeral(2026)).toBe('MMXXVI');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtRomanNumeralPipe();
      expect(pipe.transform(10)).toBe('X');
    });
  });

  describe('formatFileUnit', () => {
    it('should format bytes to decimal and binary units', () => {
      expect(formatFileUnit(1000)).toBe('1.00 KB');
      expect(formatFileUnit(1024, 2, true)).toBe('1.00 KiB');
      expect(formatFileUnit(1000000, 1)).toBe('1.0 MB');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtFileUnitPipe();
      expect(pipe.transform(0)).toBe('0 B');
    });
  });
});
