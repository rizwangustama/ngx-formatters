/**
 * Utility, Web & Security formatters
 */

/**
 * Extracts the hostname/domain from a URL string.
 * @example urlHostname('https://sub.example.com/path?foo=bar') => 'sub.example.com'
 */
export function urlHostname(url: string | null | undefined): string {
  if (!url) return '';
  const trimmed = String(url).trim();
  try {
    const parsed = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);
    return parsed.hostname;
  } catch {
    return trimmed;
  }
}

/**
 * Sanitizes a URL to ensure it only uses safe protocols (http, https, mailto, tel).
 * Prevents javascript: and data: XSS vectors.
 * @example urlSanitize('https://google.com') => 'https://google.com'
 * @example urlSanitize('javascript:alert(1)') => '#'
 */
export function urlSanitize(
  url: string | null | undefined,
  defaultUrl: string = '#'
): string {
  if (!url) return defaultUrl;
  const trimmed = String(url).trim();
  const allowedProtocols = /^(https?|mailto|tel):/i;

  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return trimmed;
  }

  if (allowedProtocols.test(trimmed)) {
    return trimmed;
  }

  // If protocol-less domain like 'google.com', assume https://
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return defaultUrl;
}

/**
 * Highlights search matches within text by wrapping them in <mark class="..."> tags.
 * Safely escapes HTML in the search term.
 * @example highlightText('Hello Angular World', 'Angular') => 'Hello <mark class="fmt-highlight">Angular</mark> World'
 */
export function highlightText(
  text: string | null | undefined,
  search: string | null | undefined,
  cssClass: string = 'fmt-highlight'
): string {
  if (!text) return '';
  const str = String(text);
  if (!search || !search.trim()) return str;

  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearch})`, 'gi');
  return str.replace(regex, `<mark class="${cssClass}">$1</mark>`);
}

/**
 * Returns fallback if the value is null, undefined, or empty string.
 * @example defaultValue(null, 'N/A') => 'N/A'
 * @example defaultValue('', 'None') => 'None'
 * @example defaultValue('Valid', 'N/A') => 'Valid'
 */
export function defaultValue<T>(
  value: T | null | undefined,
  fallback: T
): T {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  return value;
}

/**
 * Formats data transfer speed (bytes per second) into readable units (e.g. 1.5 MB/s).
 * @example formatByteSpeed(1048576) => '1.0 MB/s'
 * @example formatByteSpeed(52428800) => '52.4 MB/s'
 */
export function formatByteSpeed(
  bytesPerSec: number | string | null | undefined,
  decimals: number = 1
): string {
  if (bytesPerSec === null || bytesPerSec === undefined || bytesPerSec === '') return '0 B/s';
  const num = Number(bytesPerSec);
  if (isNaN(num) || num === 0) return '0 B/s';

  const units = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s'];
  const i = Math.floor(Math.log(Math.abs(num)) / Math.log(1024));
  const safeI = Math.min(i, units.length - 1);
  const formatted = (num / Math.pow(1024, safeI)).toFixed(decimals);
  return `${formatted} ${units[safeI]}`;
}
