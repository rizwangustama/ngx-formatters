/**
 * Phone, Masking & Identifier formatters
 */

/**
 * Formats a phone number according to a pattern (where # represents a digit).
 * If no pattern is provided and length is 10, defaults to '(###) ###-####'.
 * @example formatPhoneNumber('1234567890') => '(123) 456-7890'
 * @example formatPhoneNumber('08123456789', '####-####-####') => '0812-3456-789'
 */
export function formatPhoneNumber(
  value: string | number | null | undefined,
  pattern: string = '(###) ###-####'
): string {
  if (value === null || value === undefined || value === '') return '';
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return '';

  let digitIndex = 0;
  let result = '';

  for (let i = 0; i < pattern.length; i++) {
    if (digitIndex >= digits.length) break;
    const char = pattern[i];
    if (char === '#') {
      result += digits[digitIndex++];
    } else {
      result += char;
    }
  }

  // Append remaining digits if any
  if (digitIndex < digits.length) {
    result += digits.slice(digitIndex);
  }

  return result;
}

/**
 * Masks an email address preserving the first char and domain.
 * @example maskEmail('john.doe@example.com') => 'j***e@example.com'
 */
export function maskEmail(
  value: string | null | undefined,
  maskLength: number = 3
): string {
  if (!value) return '';
  const str = String(value).trim();
  const atIndex = str.indexOf('@');
  if (atIndex <= 1) return str;

  const local = str.slice(0, atIndex);
  const domain = str.slice(atIndex);

  if (local.length <= 2) {
    return `${local[0]}${'*'.repeat(maskLength)}${domain}`;
  }

  const first = local[0];
  const last = local[local.length - 1];
  return `${first}${'*'.repeat(maskLength)}${last}${domain}`;
}

/**
 * Masks payment card numbers keeping only the last 4 digits visible.
 * @example maskCard('4111222233334444') => '**** **** **** 4444'
 */
export function maskCard(
  value: string | number | null | undefined,
  maskChar: string = '*',
  delimiter: string = ' '
): string {
  if (value === null || value === undefined || value === '') return '';
  const digits = String(value).replace(/\s+/g, '');
  if (digits.length < 4) return digits;

  const last4 = digits.slice(-4);
  const totalLength = digits.length;
  const maskedSectionLen = totalLength - 4;
  const maskedChars = maskChar.repeat(maskedSectionLen) + last4;

  // Split into chunks of 4
  const chunks = maskedChars.match(/.{1,4}/g);
  return chunks ? chunks.join(delimiter) : maskedChars;
}

/**
 * Formats an IBAN code into 4-character separated groups.
 * @example formatIban('GB29XAAA10123456789012') => 'GB29 XAAA 1012 3456 7890 12'
 */
export function formatIban(
  value: string | null | undefined,
  separator: string = ' '
): string {
  if (!value) return '';
  const clean = String(value).replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const chunks = clean.match(/.{1,4}/g);
  return chunks ? chunks.join(separator) : clean;
}

/**
 * Normalizes and formats a MAC address (e.g. 001422012345 -> 00:14:22:01:23:45).
 * @example formatMacAddress('001422012345') => '00:14:22:01:23:45'
 * @example formatMacAddress('001422012345', '-') => '00-14-22-01-23-45'
 */
export function formatMacAddress(
  value: string | null | undefined,
  separator: ':' | '-' = ':'
): string {
  if (!value) return '';
  const clean = String(value).replace(/[^a-fA-F0-9]/g, '').toUpperCase();
  if (clean.length !== 12) return value;
  const chunks = clean.match(/.{1,2}/g);
  return chunks ? chunks.join(separator) : clean;
}

/**
 * Shortens / masks a UUID string.
 * @example maskUuid('123e4567-e89b-12d3-a456-426614174000') => '123e...4000'
 */
export function maskUuid(
  value: string | null | undefined,
  visibleChars: number = 4
): string {
  if (!value) return '';
  const str = String(value).trim();
  if (str.length <= visibleChars * 2) return str;
  return `${str.slice(0, visibleChars)}...${str.slice(-visibleChars)}`;
}

/**
 * Converts a hex color string to RGB or RGBA string.
 * @example hexToRgb('#ff0000') => 'rgb(255, 0, 0)'
 * @example hexToRgb('#ff0000', 0.5) => 'rgba(255, 0, 0, 0.5)'
 */
export function hexToRgb(
  hex: string | null | undefined,
  alpha?: number
): string {
  if (!hex) return '';
  let clean = String(hex).replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  if (clean.length !== 6 && clean.length !== 8) return '';

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return '';

  if (alpha !== undefined) {
    const clampedAlpha = Math.min(Math.max(alpha, 0), 1);
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}
