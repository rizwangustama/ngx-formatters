/**
 * Currency & Financial formatters
 */

/**
 * Standard Intl currency formatter.
 * @example formatCurrency(1234.56, 'USD', 'en-US') => '$1,234.56'
 * @example formatCurrency(1234.56, 'EUR', 'de-DE') => '1.234,56 €'
 */
export function formatCurrency(
  value: number | string | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US',
  currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol'
): string {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return '';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay,
    }).format(num);
  } catch {
    return `${currency} ${num.toFixed(2)}`;
  }
}

/**
 * Compact currency formatter (e.g. $1.5M, Rp 2.5jt, €450K).
 * @example formatCurrencyCompact(1500000, 'USD', 'en-US') => '$1.5M'
 */
export function formatCurrencyCompact(
  value: number | string | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return '';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  } catch {
    return formatCurrency(num, currency, locale);
  }
}

/**
 * Formats a number in accounting notation (negative amounts in parentheses: (1,234.56)).
 * @example formatAccounting(-1234.56) => '(1,234.56)'
 * @example formatAccounting(-1234.56, '$') => '($1,234.56)'
 * @example formatAccounting(1234.56, '$') => '$1,234.56'
 */
export function formatAccounting(
  value: number | string | null | undefined,
  currencySymbol: string = '',
  decimals: number = 2
): string {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return '';

  const isNeg = num < 0;
  const absFormatted = Math.abs(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const sym = currencySymbol ? `${currencySymbol}` : '';
  if (isNeg) {
    return sym ? `(${sym}${absFormatted})` : `(${absFormatted})`;
  }
  return sym ? `${sym}${absFormatted}` : absFormatted;
}

/**
 * Formats amount into Indonesian Rupiah standard format (e.g. Rp 1.500.000).
 * @example formatIdrCurrency(1500000) => 'Rp 1.500.000'
 * @example formatIdrCurrency(1500000, false) => '1.500.000'
 */
export function formatIdrCurrency(
  value: number | string | null | undefined,
  withSymbol: boolean = true,
  decimals: number = 0
): string {
  if (value === null || value === undefined || value === '') return '';
  const num = Number(value);
  if (isNaN(num)) return '';

  const formatted = num.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return withSymbol ? `Rp ${formatted}` : formatted;
}

export interface VatResult {
  net: number;
  vat: number;
  total: number;
  formattedTotal: string;
}

/**
 * Calculates and formats total including VAT/Tax.
 * @example formatVat(100000, 11) => '111,000.00'
 */
export function formatVat(
  netAmount: number | string | null | undefined,
  vatRatePercent: number = 11,
  decimals: number = 2
): string {
  if (netAmount === null || netAmount === undefined || netAmount === '') return '';
  const net = Number(netAmount);
  if (isNaN(net)) return '';

  const vat = (net * vatRatePercent) / 100;
  const total = net + vat;
  return total.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
