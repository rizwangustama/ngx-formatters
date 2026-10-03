import { Pipe, PipeTransform } from '@angular/core';
import {
  formatCurrency,
  formatCurrencyCompact,
  formatAccounting,
  formatIdrCurrency,
  formatVat,
} from './currency.formatters';

@Pipe({
  name: 'fmtCurrency',
  standalone: true,
})
export class FmtCurrencyPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    currency: string = 'USD',
    locale: string = 'en-US',
    currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' = 'symbol'
  ): string {
    return formatCurrency(value, currency, locale, currencyDisplay);
  }
}

@Pipe({
  name: 'fmtCurrencyCompact',
  standalone: true,
})
export class FmtCurrencyCompactPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    currency: string = 'USD',
    locale: string = 'en-US'
  ): string {
    return formatCurrencyCompact(value, currency, locale);
  }
}

@Pipe({
  name: 'fmtAccounting',
  standalone: true,
})
export class FmtAccountingPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    currencySymbol: string = '',
    decimals: number = 2
  ): string {
    return formatAccounting(value, currencySymbol, decimals);
  }
}

@Pipe({
  name: 'fmtIdrCurrency',
  standalone: true,
})
export class FmtIdrCurrencyPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    withSymbol: boolean = true,
    decimals: number = 0
  ): string {
    return formatIdrCurrency(value, withSymbol, decimals);
  }
}

@Pipe({
  name: 'fmtVat',
  standalone: true,
})
export class FmtVatPipe implements PipeTransform {
  transform(
    netAmount: number | string | null | undefined,
    vatRatePercent: number = 11,
    decimals: number = 2
  ): string {
    return formatVat(netAmount, vatRatePercent, decimals);
  }
}

export const CURRENCY_PIPES = [
  FmtCurrencyPipe,
  FmtCurrencyCompactPipe,
  FmtAccountingPipe,
  FmtIdrCurrencyPipe,
  FmtVatPipe,
] as const;
