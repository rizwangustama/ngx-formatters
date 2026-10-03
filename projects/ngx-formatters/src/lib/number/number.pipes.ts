import { Pipe, PipeTransform } from '@angular/core';
import {
  formatNumberCompact,
  ordinal,
  formatPercentage,
  clamp,
  roundTo,
  padNumber,
  toRomanNumeral,
  formatFileUnit,
} from './number.formatters';

@Pipe({
  name: 'fmtNumberCompact',
  standalone: true,
})
export class FmtNumberCompactPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    locale: string = 'en-US',
    maximumFractionDigits: number = 1
  ): string {
    return formatNumberCompact(value, locale, maximumFractionDigits);
  }
}

@Pipe({
  name: 'fmtOrdinal',
  standalone: true,
})
export class FmtOrdinalPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    return ordinal(value);
  }
}

@Pipe({
  name: 'fmtPercentage',
  standalone: true,
})
export class FmtPercentagePipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    decimals: number = 2,
    multiply: boolean = true
  ): string {
    return formatPercentage(value, decimals, multiply);
  }
}

@Pipe({
  name: 'fmtClamp',
  standalone: true,
})
export class FmtClampPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    min: number,
    max: number
  ): number {
    return clamp(value, min, max);
  }
}

@Pipe({
  name: 'fmtRound',
  standalone: true,
})
export class FmtRoundPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    decimals: number = 2
  ): number {
    return roundTo(value, decimals);
  }
}

@Pipe({
  name: 'fmtPadNumber',
  standalone: true,
})
export class FmtPadNumberPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    digits: number = 2
  ): string {
    return padNumber(value, digits);
  }
}

@Pipe({
  name: 'fmtRomanNumeral',
  standalone: true,
})
export class FmtRomanNumeralPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    return toRomanNumeral(value);
  }
}

@Pipe({
  name: 'fmtFileUnit',
  standalone: true,
})
export class FmtFileUnitPipe implements PipeTransform {
  transform(
    bytes: number | string | null | undefined,
    decimals: number = 2,
    binary: boolean = false
  ): string {
    return formatFileUnit(bytes, decimals, binary);
  }
}

export const NUMBER_PIPES = [
  FmtNumberCompactPipe,
  FmtOrdinalPipe,
  FmtPercentagePipe,
  FmtClampPipe,
  FmtRoundPipe,
  FmtPadNumberPipe,
  FmtRomanNumeralPipe,
  FmtFileUnitPipe,
] as const;
