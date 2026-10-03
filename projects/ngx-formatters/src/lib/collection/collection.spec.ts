import { describe, it, expect } from 'vitest';
import {
  jsonPretty,
  listJoin,
  pluralize,
  getInitials,
  firstAndLast,
  fileSize,
  filterEmpty,
} from './collection.formatters';
import {
  FmtJsonPrettyPipe,
  FmtListJoinPipe,
  FmtPluralizePipe,
  FmtInitialsPipe,
  FmtFirstAndLastPipe,
  FmtFileSizePipe,
  FmtFilterEmptyPipe,
} from './collection.pipes';

describe('Collection Formatters & Pipes', () => {
  describe('jsonPretty', () => {
    it('should format object into pretty JSON string', () => {
      const obj = { name: 'Alice', age: 30 };
      expect(jsonPretty(obj)).toBe(JSON.stringify(obj, null, 2));
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtJsonPrettyPipe();
      expect(pipe.transform({ x: 1 }, 4)).toBe('{\n    "x": 1\n}');
    });
  });

  describe('listJoin', () => {
    it('should join array with conjunction', () => {
      expect(listJoin(['Apple', 'Banana', 'Orange'])).toBe('Apple, Banana and Orange');
      expect(listJoin(['Apple', 'Banana'], 'or')).toBe('Apple or Banana');
      expect(listJoin(['Single'])).toBe('Single');
      expect(listJoin([])).toBe('');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtListJoinPipe();
      expect(pipe.transform(['A', 'B'])).toBe('A and B');
    });
  });

  describe('pluralize', () => {
    it('should pluralize nouns based on count', () => {
      expect(pluralize(1, 'apple')).toBe('1 apple');
      expect(pluralize(2, 'apple')).toBe('2 apples');
      expect(pluralize(0, 'person', 'people')).toBe('0 people');
      expect(pluralize(5, 'box', 'boxes', false)).toBe('boxes');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtPluralizePipe();
      expect(pipe.transform(3, 'car')).toBe('3 cars');
    });
  });

  describe('getInitials', () => {
    it('should extract initials', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('John Fitzgerald Kennedy', 3)).toBe('JFK');
      expect(getInitials('Single')).toBe('S');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtInitialsPipe();
      expect(pipe.transform('Angular Material')).toBe('AM');
    });
  });

  describe('firstAndLast', () => {
    it('should return tuple of first and last item', () => {
      expect(firstAndLast([10, 20, 30, 40])).toEqual([10, 40]);
      expect(firstAndLast([99])).toEqual([99, 99]);
      expect(firstAndLast([])).toBeNull();
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtFirstAndLastPipe();
      expect(pipe.transform(['start', 'mid', 'end'])).toEqual(['start', 'end']);
    });
  });

  describe('fileSize', () => {
    it('should format bytes with binary IEC units', () => {
      expect(fileSize(1024)).toBe('1.00 KiB');
      expect(fileSize(1048576)).toBe('1.00 MiB');
      expect(fileSize(0)).toBe('0 B');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtFileSizePipe();
      expect(pipe.transform(2048)).toBe('2.00 KiB');
    });
  });

  describe('filterEmpty', () => {
    it('should filter null, undefined, empty strings and NaN', () => {
      expect(filterEmpty(['hello', null, '', undefined, 'world'])).toEqual(['hello', 'world']);
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtFilterEmptyPipe();
      expect(pipe.transform([1, null, 2, undefined])).toEqual([1, 2]);
    });
  });
});
