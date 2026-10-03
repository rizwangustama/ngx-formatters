/**
 * Number & Math formatters
 */

/**
 * Formats a number into compact representation (e.g. 1.2K, 3.4M, 5.1B).
 * @example formatNumberCompact(1500) => '1.5K'
 * @example formatNumberCompact(2500000) => '2.5M'
 */
export function formatNumberCompact(
  value: number | string | null | undefined,
  locale: string = 'en-US',
  maximumFractionDigits: number = 1
): string {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return '';

  try {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits,
    }).format(num);
  } catch {
    // Fallback if Intl notation compact is not supported
    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    if (abs >= 1e12) return sign + (abs / 1e12).toFixed(maximumFractionDigits) + 'T';
    if (abs >= 1e9) return sign + (abs / 1e9).toFixed(maximumFractionDigits) + 'B';
    if (abs >= 1e6) return sign + (abs / 1e6).toFixed(maximumFractionDigits) + 'M';
    if (abs >= 1e3) return sign + (abs / 1e3).toFixed(maximumFractionDigits) + 'K';
    return String(num);
  }
}

/**
 * Converts a number into ordinal string (e.g., 1st, 2nd, 3rd, 4th, 11th, 21st).
 * @example ordinal(1) => '1st'
 * @example ordinal(22) => '22nd'
 * @example ordinal(113) => '113th'
 */
export function ordinal(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const num = Math.floor(Number(value));
  if (isNaN(num)) return '';

  const abs = Math.abs(num);
  const mod100 = abs % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return `${num}th`;
  }
  switch (abs % 10) {
    case 1:
      return `${num}st`;
    case 2:
      return `${num}nd`;
    case 3:
      return `${num}rd`;
    default:
      return `${num}th`;
  }
}

/**
 * Formats a number to a percentage string.
 * @example formatPercentage(0.125) => '12.50%'
 * @example formatPercentage(50, 0, false) => '50%'
 */
export function formatPercentage(
  value: number | string | null | undefined,
  decimals: number = 2,
  multiply: boolean = true
): string {
  if (value === null || value === undefined || value === '') return '';
  let num = Number(value);
  if (isNaN(num)) return '';
  if (multiply) {
    num *= 100;
  }
  return `${num.toFixed(decimals)}%`;
}

/**
 * Clamps a number between a minimum and maximum value.
 * @example clamp(15, 0, 10) => 10
 * @example clamp(-5, 0, 100) => 0
 */
export function clamp(
  value: number | string | null | undefined,
  min: number,
  max: number
): number {
  if (value === null || value === undefined || value === '') return min;
  const num = Number(value);
  if (isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
}

/**
 * Rounds a number to a specific number of decimal places.
 * @example roundTo(3.14159, 2) => 3.14
 */
export function roundTo(
  value: number | string | null | undefined,
  decimals: number = 2
): number {
  if (value === null || value === undefined || value === '') return 0;
  const num = Number(value);
  if (isNaN(num)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}

/**
 * Pads a number with leading zeroes.
 * @example padNumber(7, 3) => '007'
 */
export function padNumber(
  value: number | string | null | undefined,
  digits: number = 2
): string {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return '';
  const isNegative = num < 0;
  const absStr = Math.abs(num).toString();
  const padded = absStr.padStart(digits, '0');
  return isNegative ? `-${padded}` : padded;
}

/**
 * Converts a positive integer to Roman numerals.
 * Supports numbers between 1 and 3999.
 * @example toRomanNumeral(14) => 'XIV'
 * @example toRomanNumeral(2026) => 'MMXXVI'
 */
export function toRomanNumeral(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  let num = Math.floor(Number(value));
  if (isNaN(num) || num < 1 || num > 3999) return '';

  const lookup: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];

  let roman = '';
  for (const [val, str] of lookup) {
    while (num >= val) {
      roman += str;
      num -= val;
    }
  }
  return roman;
}

/**
 * Formats bytes into human-readable unit (B, KB, MB, GB, TB, etc.).
 * @example formatFileUnit(1024) => '1.00 KB'
 * @example formatFileUnit(1048576, 1) => '1.0 MB'
 */
export function formatFileUnit(
  bytes: number | string | null | undefined,
  decimals: number = 2,
  binary: boolean = false
): string {
  if (bytes === null || bytes === undefined || bytes === '') return '0 B';
  const num = Number(bytes);
  if (isNaN(num) || num === 0) return '0 B';

  const k = binary ? 1024 : 1000;
  const sizes = binary
    ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']
    : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(Math.abs(num)) / Math.log(k));
  const safeI = Math.min(i, sizes.length - 1);
  const formatted = (num / Math.pow(k, safeI)).toFixed(Math.max(0, decimals));
  return `${formatted} ${sizes[safeI]}`;
}
