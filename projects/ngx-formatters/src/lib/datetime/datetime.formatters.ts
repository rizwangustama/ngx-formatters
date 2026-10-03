/**
 * Date & Time formatters
 */

/**
 * Helper to parse various date inputs safely.
 */
export function parseDate(val: Date | string | number | null | undefined): Date | null {
  if (val === null || val === undefined || val === '') return null;
  const d = val instanceof Date ? val : new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Converts a date into a relative time string (e.g., 'just now', '5 minutes ago', 'in 2 hours').
 * @example timeAgo(new Date(Date.now() - 60000)) => '1 minute ago'
 */
export function timeAgo(
  value: Date | string | number | null | undefined,
  locale: string = 'en-US'
): string {
  const d = parseDate(value);
  if (!d) return '';

  const now = Date.now();
  const diffInSeconds = Math.round((d.getTime() - now) / 1000);

  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const absDiff = Math.abs(diffInSeconds);

    if (absDiff < 45) return diffInSeconds <= 0 ? 'just now' : 'soon';
    if (absDiff < 90) return rtf.format(Math.round(diffInSeconds / 60), 'minute');
    if (absDiff < 3600) return rtf.format(Math.round(diffInSeconds / 60), 'minute');
    if (absDiff < 86400) return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
    if (absDiff < 2592000) return rtf.format(Math.round(diffInSeconds / 86400), 'day');
    if (absDiff < 31536000) return rtf.format(Math.round(diffInSeconds / 2592000), 'month');
    return rtf.format(Math.round(diffInSeconds / 31536000), 'year');
  } catch {
    // Fallback if Intl.RelativeTimeFormat not supported
    const abs = Math.abs(diffInSeconds);
    const suffix = diffInSeconds <= 0 ? 'ago' : 'from now';
    if (abs < 60) return 'just now';
    if (abs < 3600) return `${Math.floor(abs / 60)} minutes ${suffix}`;
    if (abs < 86400) return `${Math.floor(abs / 3600)} hours ${suffix}`;
    return `${Math.floor(abs / 86400)} days ${suffix}`;
  }
}

/**
 * Formats a duration in seconds into human-readable string.
 * @example formatDuration(3665, 'short') => '1h 1m 5s'
 * @example formatDuration(3665, 'digital') => '01:01:05'
 * @example formatDuration(125, 'long') => '2 minutes 5 seconds'
 */
export function formatDuration(
  seconds: number | string | null | undefined,
  format: 'short' | 'long' | 'digital' = 'short'
): string {
  if (seconds === null || seconds === undefined || seconds === '') return '';
  const totalSeconds = Math.max(0, Math.floor(Number(seconds)));
  if (isNaN(totalSeconds)) return '';

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  if (format === 'digital') {
    const pad = (n: number) => n.toString().padStart(2, '0');
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }
    return `${pad(minutes)}:${pad(secs)}`;
  }

  const parts: string[] = [];
  if (format === 'long') {
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    if (secs > 0 || parts.length === 0)
      parts.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);
    return parts.join(' ');
  }

  // format === 'short'
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
  return parts.join(' ');
}

/**
 * Formats an ISO string or Date to localized date string.
 * @example isoToLocale('2026-10-03T08:00:00Z', 'en-US') => '10/3/2026'
 */
export function isoToLocale(
  value: Date | string | number | null | undefined,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string {
  const d = parseDate(value);
  if (!d) return '';
  try {
    return new Intl.DateTimeFormat(locale, options).format(d);
  } catch {
    return d.toLocaleDateString();
  }
}

/**
 * Returns the name of the day of week.
 * @example dayOfWeek('2026-10-03', 'long', 'en-US') => 'Saturday'
 * @example dayOfWeek('2026-10-03', 'short', 'en-US') => 'Sat'
 */
export function dayOfWeek(
  value: Date | string | number | null | undefined,
  format: 'long' | 'short' | 'narrow' = 'long',
  locale: string = 'en-US'
): string {
  const d = parseDate(value);
  if (!d) return '';
  return new Intl.DateTimeFormat(locale, { weekday: format }).format(d);
}

/**
 * Returns the name of the month.
 * @example monthName('2026-10-03', 'long', 'en-US') => 'October'
 * @example monthName('2026-10-03', 'short', 'en-US') => 'Oct'
 */
export function monthName(
  value: Date | string | number | null | undefined,
  format: 'long' | 'short' | 'narrow' = 'long',
  locale: string = 'en-US'
): string {
  const d = parseDate(value);
  if (!d) return '';
  return new Intl.DateTimeFormat(locale, { month: format }).format(d);
}

/**
 * Checks if the given date is in the future.
 * @example isFutureDate('2099-01-01') => true
 */
export function isFutureDate(
  value: Date | string | number | null | undefined
): boolean {
  const d = parseDate(value);
  if (!d) return false;
  return d.getTime() > Date.now();
}

/**
 * Checks if the given date is in the past.
 * @example isPastDate('2000-01-01') => true
 */
export function isPastDate(
  value: Date | string | number | null | undefined
): boolean {
  const d = parseDate(value);
  if (!d) return false;
  return d.getTime() < Date.now();
}

/**
 * Calculates current age in years given a birthdate.
 * @example calculateAge('2000-01-15') => 26 (as of 2026)
 */
export function calculateAge(
  birthDate: Date | string | number | null | undefined
): number {
  const d = parseDate(birthDate);
  if (!d) return 0;

  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
    age--;
  }
  return Math.max(0, age);
}
