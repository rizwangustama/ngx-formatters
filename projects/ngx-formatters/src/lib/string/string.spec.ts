import { describe, it, expect } from 'vitest';
import {
  capitalize,
  titleCase,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  truncate,
  mask,
  slugify,
  stripHtml,
} from './string.formatters';
import {
  FmtCapitalizePipe,
  FmtTitleCasePipe,
  FmtCamelCasePipe,
  FmtKebabCasePipe,
  FmtSnakeCasePipe,
  FmtPascalCasePipe,
  FmtTruncatePipe,
  FmtMaskPipe,
  FmtSlugifyPipe,
  FmtStripHtmlPipe,
} from './string.pipes';

describe('String Formatters & Pipes', () => {
  describe('capitalize', () => {
    it('should capitalize first letter and lowercase the rest by default', () => {
      expect(capitalize('hello world')).toBe('Hello world');
      expect(capitalize('hELLO')).toBe('Hello');
    });

    it('should preserve rest if requested', () => {
      expect(capitalize('hELLO', true)).toBe('HELLO');
    });

    it('should handle empty/null/undefined', () => {
      expect(capitalize('')).toBe('');
      expect(capitalize(null)).toBe('');
      expect(capitalize(undefined)).toBe('');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtCapitalizePipe();
      expect(pipe.transform('angular')).toBe('Angular');
    });
  });

  describe('titleCase', () => {
    it('should title case words', () => {
      expect(titleCase('the quick brown fox')).toBe('The Quick Brown Fox');
      expect(titleCase('hello-world_test')).toBe('Hello-World_Test');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtTitleCasePipe();
      expect(pipe.transform('angular rocks')).toBe('Angular Rocks');
    });
  });

  describe('camelCase', () => {
    it('should convert strings to camelCase', () => {
      expect(camelCase('Hello World')).toBe('helloWorld');
      expect(camelCase('kebab-case-string')).toBe('kebabCaseString');
      expect(camelCase('snake_case_string')).toBe('snakeCaseString');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtCamelCasePipe();
      expect(pipe.transform('user-profile-id')).toBe('userProfileId');
    });
  });

  describe('kebabCase', () => {
    it('should convert strings to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
      expect(kebabCase('Hello World')).toBe('hello-world');
      expect(kebabCase('snake_case_example')).toBe('snake-case-example');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtKebabCasePipe();
      expect(pipe.transform('MyComponent')).toBe('my-component');
    });
  });

  describe('snakeCase', () => {
    it('should convert strings to snake_case', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
      expect(snakeCase('Hello World')).toBe('hello_world');
      expect(snakeCase('kebab-case-example')).toBe('kebab_case_example');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtSnakeCasePipe();
      expect(pipe.transform('FirstName')).toBe('first_name');
    });
  });

  describe('pascalCase', () => {
    it('should convert strings to PascalCase', () => {
      expect(pascalCase('hello world')).toBe('HelloWorld');
      expect(pascalCase('user_profile')).toBe('UserProfile');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtPascalCasePipe();
      expect(pipe.transform('my_button')).toBe('MyButton');
    });
  });

  describe('truncate', () => {
    it('should truncate string with default suffix', () => {
      expect(truncate('Hello Beautiful World', 10)).toBe('Hello B...');
    });

    it('should preserve word boundary when flag is true', () => {
      expect(truncate('Hello Beautiful World', 16, '...', true)).toBe('Hello...');
    });

    it('should not truncate if shorter than length', () => {
      expect(truncate('Short', 10)).toBe('Short');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtTruncatePipe();
      expect(pipe.transform('Long text goes here', 7)).toBe('Long...');
    });
  });

  describe('mask', () => {
    it('should mask string keeping start and end characters', () => {
      expect(mask('1234567890', 2, 2, '*')).toBe('12******90');
      expect(mask('secretpassword', 0, 4, '#')).toBe('##########word');
    });

    it('should handle short strings without negative repeat error', () => {
      expect(mask('abc', 2, 2)).toBe('abc');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtMaskPipe();
      expect(pipe.transform('123456', 1, 1, '*')).toBe('1****6');
    });
  });

  describe('slugify', () => {
    it('should create url-safe slugs', () => {
      expect(slugify('Hello World! 2026')).toBe('hello-world-2026');
      expect(slugify('Café & Restaurant')).toBe('cafe-restaurant');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtSlugifyPipe();
      expect(pipe.transform('Ngx Formatters Rocks!')).toBe('ngx-formatters-rocks');
    });
  });

  describe('stripHtml', () => {
    it('should strip HTML tags and decode basic entities', () => {
      expect(stripHtml('<p>Hello <strong>World</strong>!</p>')).toBe('Hello World!');
      expect(stripHtml('<div>Line &amp; space&nbsp;</div>')).toBe('Line & space');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtStripHtmlPipe();
      expect(pipe.transform('<span>Test</span>')).toBe('Test');
    });
  });
});
