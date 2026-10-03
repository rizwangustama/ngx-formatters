/**
 * String & Text formatters
 */

/**
 * Capitalizes the first letter of a string.
 * @example capitalize('hello world') => 'Hello world'
 * @example capitalize('hELLO WORLD', false) => 'Hello world'
 * @example capitalize('hELLO WORLD', true) => 'HELLO WORLD'
 */
export function capitalize(
  value: string | null | undefined,
  preserveRest: boolean = false
): string {
  if (!value) return '';
  const str = String(value);
  const first = str.charAt(0).toUpperCase();
  const rest = preserveRest ? str.slice(1) : str.slice(1).toLowerCase();
  return first + rest;
}

/**
 * Converts a string into Title Case.
 * @example titleCase('the quick brown fox') => 'The Quick Brown Fox'
 */
export function titleCase(value: string | null | undefined): string {
  if (!value) return '';
  return String(value)
    .toLowerCase()
    .replace(/(?:^|\s|-|_)\S/g, (char) => char.toUpperCase());
}

/**
 * Converts a string into camelCase.
 * @example camelCase('Hello World-example_string') => 'helloWorldExampleString'
 */
export function camelCase(value: string | null | undefined): string {
  if (!value) return '';
  const matches = String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/);
  if (matches.length === 0 || !matches[0]) return '';
  return (
    matches[0].toLowerCase() +
    matches
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('')
  );
}

/**
 * Converts a string into kebab-case.
 * @example kebabCase('helloWorld Example') => 'hello-world-example'
 */
export function kebabCase(value: string | null | undefined): string {
  if (!value) return '';
  const matches = String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/);
  return matches.map((w) => w.toLowerCase()).join('-');
}

/**
 * Converts a string into snake_case.
 * @example snakeCase('helloWorld Example') => 'hello_world_example'
 */
export function snakeCase(value: string | null | undefined): string {
  if (!value) return '';
  const matches = String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/);
  return matches.map((w) => w.toLowerCase()).join('_');
}

/**
 * Converts a string into PascalCase.
 * @example pascalCase('hello world') => 'HelloWorld'
 */
export function pascalCase(value: string | null | undefined): string {
  if (!value) return '';
  const camel = camelCase(value);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Truncates string to a maximum length with suffix.
 * @example truncate('Super long text to cut off', 10) => 'Super l...'
 * @example truncate('Super long text', 12, '...', true) => 'Super...'
 */
export function truncate(
  value: string | null | undefined,
  length: number = 30,
  suffix: string = '...',
  preserveWord: boolean = false
): string {
  if (!value) return '';
  const str = String(value);
  if (str.length <= length) return str;

  const targetLength = Math.max(0, length - suffix.length);
  if (preserveWord) {
    const cut = str.slice(0, targetLength);
    const lastSpace = cut.lastIndexOf(' ');
    if (lastSpace > 0) {
      return cut.slice(0, lastSpace) + suffix;
    }
  }

  return str.slice(0, targetLength) + suffix;
}

/**
 * Masks characters in a string with a mask character.
 * @example mask('1234567890', 2, 2, '*') => '12******90'
 */
export function mask(
  value: string | null | undefined,
  visibleStart: number = 0,
  visibleEnd: number = 4,
  maskChar: string = '*'
): string {
  if (!value) return '';
  const str = String(value);
  const len = str.length;
  if (len <= visibleStart + visibleEnd) return str;

  const start = str.slice(0, visibleStart);
  const end = visibleEnd > 0 ? str.slice(-visibleEnd) : '';
  const maskedLength = len - visibleStart - visibleEnd;
  const maskedSection = maskChar.repeat(maskedLength);

  return start + maskedSection + end;
}

/**
 * Converts a string into a URL-friendly slug.
 * @example slugify('Hello World! 2026') => 'hello-world-2026'
 */
export function slugify(value: string | null | undefined): string {
  if (!value) return '';
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Strips HTML tags from a string.
 * @example stripHtml('<p>Hello <strong>World</strong>!</p>') => 'Hello World!'
 */
export function stripHtml(value: string | null | undefined): string {
  if (!value) return '';
  return String(value)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}
