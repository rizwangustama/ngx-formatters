import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCurrencyCompact,
  formatAccounting,
  formatIdrCurrency,
  formatVat,
} from './currency.formatters';
import {
  FmtCurrencyPipe,
  FmtCurrencyCompactPipe,
  FmtAccountingPipe,
  FmtIdrCurrencyPipe,
  FmtVatPipe,
} from './currency.pipes';

describe('Currency Formatters & Pipes', () => {
  describe('formatCurrency', () => {
    it('should format currency via Intl', () => {
      const res = formatCurrency(1234.56, 'USD', 'en-US');
      expect(res).toBe('$1,234.56');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtCurrencyPipe();
      expect(pipe.transform(10, 'USD', 'en-US')).toBe('$10.00');
    });
  });

  describe('formatCurrencyCompact', () => {
    it('should format currency compactly', () => {
      const res = formatCurrencyCompact(1500000, 'USD', 'en-US');
      expect(res).toMatch(/\$1\.5M/i);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtCurrencyCompactPipe();
      expect(pipe.transform(1000000, 'USD', 'en-US')).toMatch(/\$1M/i);
    });
  });

  describe('formatAccounting', () => {
    it('should format negative numbers in parentheses', () => {
      expect(formatAccounting(-1234.56)).toBe('(1,234.56)');
      expect(formatAccounting(-1234.56, '$')).toBe('($1,234.56)');
      expect(formatAccounting(1234.56, '$')).toBe('$1,234.56');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtAccountingPipe();
      expect(pipe.transform(-50, '€')).toBe('(€50.00)');
    });
  });

  describe('formatIdrCurrency', () => {
    it('should format Indonesian Rupiah', () => {
      const res = formatIdrCurrency(1500000);
      expect(res).toMatch(/Rp\s*1\.500\.000/);
      const resNoSym = formatIdrCurrency(1500000, false);
      expect(resNoSym).toMatch(/1\.500\.000/);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtIdrCurrencyPipe();
      expect(pipe.transform(50000)).toMatch(/Rp\s*50\.000/);
    });
  });

  describe('formatVat', () => {
    it('should calculate total including VAT', () => {
      expect(formatVat(100000, 11)).toBe('111,000.00');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtVatPipe();
      expect(pipe.transform(200, 10)).toBe('220.00');
    });
  });
});
