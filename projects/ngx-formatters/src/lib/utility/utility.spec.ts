import { describe, it, expect } from 'vitest';
import {
  urlHostname,
  urlSanitize,
  highlightText,
  defaultValue,
  formatByteSpeed,
} from './utility.formatters';
import {
  FmtUrlHostnamePipe,
  FmtUrlSanitizePipe,
  FmtHighlightPipe,
  FmtDefaultValuePipe,
  FmtByteSpeedPipe,
} from './utility.pipes';

describe('Utility Formatters & Pipes', () => {
  describe('urlHostname', () => {
    it('should extract hostname from url', () => {
      expect(urlHostname('https://angular.dev/overview')).toBe('angular.dev');
      expect(urlHostname('http://sub.example.com:8080/path')).toBe('sub.example.com');
      expect(urlHostname('github.com/google')).toBe('github.com');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtUrlHostnamePipe();
      expect(pipe.transform('https://google.com/search')).toBe('google.com');
    });
  });

  describe('urlSanitize', () => {
    it('should allow safe urls and block dangerous schemes', () => {
      expect(urlSanitize('https://example.com')).toBe('https://example.com');
      expect(urlSanitize('javascript:alert(1)')).toBe('#');
      expect(urlSanitize('data:text/html;base64,...')).toBe('#');
      expect(urlSanitize('/relative/path')).toBe('/relative/path');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtUrlSanitizePipe();
      expect(pipe.transform('javascript:void(0)', '/fallback')).toBe('/fallback');
    });
  });

  describe('highlightText', () => {
    it('should wrap search term in mark tag', () => {
      expect(highlightText('Hello Angular World', 'Angular')).toBe(
        'Hello <mark class="fmt-highlight">Angular</mark> World'
      );
      expect(highlightText('Hello World', 'notfound')).toBe('Hello World');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtHighlightPipe();
      expect(pipe.transform('Test string', 'string')).toBe(
        'Test <mark class="fmt-highlight">string</mark>'
      );
    });
  });

  describe('defaultValue', () => {
    it('should provide fallback when null/undefined/empty', () => {
      expect(defaultValue(null, 'N/A')).toBe('N/A');
      expect(defaultValue(undefined, 'None')).toBe('None');
      expect(defaultValue('', '-')).toBe('-');
      expect(defaultValue('Actual', 'Fallback')).toBe('Actual');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtDefaultValuePipe();
      expect(pipe.transform(null, 'default')).toBe('default');
    });
  });

  describe('formatByteSpeed', () => {
    it('should format speed in B/s, KB/s, MB/s, GB/s', () => {
      expect(formatByteSpeed(1048576)).toBe('1.0 MB/s');
      expect(formatByteSpeed(512)).toBe('512.0 B/s');
      expect(formatByteSpeed(0)).toBe('0 B/s');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtByteSpeedPipe();
      expect(pipe.transform(2097152, 2)).toBe('2.00 MB/s');
    });
  });
});
