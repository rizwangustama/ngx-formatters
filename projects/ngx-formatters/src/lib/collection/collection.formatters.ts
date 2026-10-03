/**
 * Collection, Array & Object formatters
 */

/**
 * Formats any JS object or string into nicely indented JSON.
 * @example jsonPretty({ a: 1, b: 2 }) => '{\n  "a": 1,\n  "b": 2\n}'
 */
export function jsonPretty(value: any, space: number = 2): string {
  if (value === null || value === undefined) return '';
  try {
    if (typeof value === 'string') {
      return JSON.stringify(JSON.parse(value), null, space);
    }
    return JSON.stringify(value, null, space);
  } catch {
    return String(value);
  }
}

/**
 * Joins an array of strings into human-readable list with conjunction (e.g. 'Alice, Bob and Charlie').
 * @example listJoin(['Apple', 'Banana', 'Orange']) => 'Apple, Banana and Orange'
 * @example listJoin(['Apple', 'Banana'], 'or') => 'Apple or Banana'
 */
export function listJoin(
  items: any[] | null | undefined,
  conjunction: string = 'and',
  separator: string = ', '
): string {
  if (!items || !Array.isArray(items) || items.length === 0) return '';
  const cleanItems = items.map((i) => String(i));
  if (cleanItems.length === 1) return cleanItems[0];
  if (cleanItems.length === 2) return `${cleanItems[0]} ${conjunction} ${cleanItems[1]}`;

  const last = cleanItems.pop();
  return `${cleanItems.join(separator)} ${conjunction} ${last}`;
}

/**
 * Pluralizes a word based on count.
 * @example pluralize(1, 'apple') => '1 apple'
 * @example pluralize(3, 'apple') => '3 apples'
 * @example pluralize(0, 'person', 'people') => '0 people'
 * @example pluralize(2, 'car', 'cars', false) => 'cars'
 */
export function pluralize(
  count: number | string | null | undefined,
  singular: string,
  plural?: string,
  includeCount: boolean = true
): string {
  const num = Number(count);
  const safeCount = isNaN(num) ? 0 : num;
  const word =
    safeCount === 1 || safeCount === -1
      ? singular
      : plural || `${singular}s`;

  return includeCount ? `${safeCount} ${word}` : word;
}

/**
 * Extracts uppercase initials from a name (e.g., 'John Fitzgerald Kennedy' => 'JK' or 'JF').
 * @example getInitials('John Doe') => 'JD'
 * @example getInitials('Single') => 'S'
 */
export function getInitials(
  name: string | null | undefined,
  maxChars: number = 2
): string {
  if (!name) return '';
  const words = String(name).trim().split(/\s+/);
  if (words.length === 0 || !words[0]) return '';

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const initials = words
    .filter((w) => w.length > 0)
    .map((w) => w[0].toUpperCase());

  return initials.slice(0, maxChars).join('');
}

/**
 * Returns a tuple of [first, last] item from an array.
 * @example firstAndLast(['A', 'B', 'C', 'D']) => ['A', 'D']
 */
export function firstAndLast<T>(
  items: T[] | null | undefined
): [T, T] | null {
  if (!items || !Array.isArray(items) || items.length === 0) return null;
  return [items[0], items[items.length - 1]];
}

/**
 * Specific binary IEC file size formatter (KiB, MiB, GiB, TiB).
 * @example fileSize(1024) => '1.00 KiB'
 * @example fileSize(1048576) => '1.00 MiB'
 */
export function fileSize(
  bytes: number | string | null | undefined,
  decimals: number = 2
): string {
  if (bytes === null || bytes === undefined || bytes === '') return '0 B';
  const num = Number(bytes);
  if (isNaN(num) || num === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
  const i = Math.floor(Math.log(Math.abs(num)) / Math.log(k));
  const safeI = Math.min(i, sizes.length - 1);
  const formatted = (num / Math.pow(k, safeI)).toFixed(Math.max(0, decimals));
  return `${formatted} ${sizes[safeI]}`;
}

/**
 * Filters out null, undefined, NaN, and empty string from an array.
 * @example filterEmpty(['a', null, 'b', undefined, '', 'c']) => ['a', 'b', 'c']
 */
export function filterEmpty<T>(items: T[] | null | undefined): T[] {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(
    (item) =>
      item !== null &&
      item !== undefined &&
      item !== '' &&
      !Number.isNaN(item as any)
  );
}
