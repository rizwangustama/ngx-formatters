import { Pipe, PipeTransform } from '@angular/core';
import {
  timeAgo,
  formatDuration,
  isoToLocale,
  dayOfWeek,
  monthName,
  isFutureDate,
  isPastDate,
  calculateAge,
} from './datetime.formatters';

@Pipe({
  name: 'fmtTimeAgo',
  standalone: true,
})
export class FmtTimeAgoPipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    locale: string = 'en-US'
  ): string {
    return timeAgo(value, locale);
  }
}

@Pipe({
  name: 'fmtDuration',
  standalone: true,
})
export class FmtDurationPipe implements PipeTransform {
  transform(
    seconds: number | string | null | undefined,
    format: 'short' | 'long' | 'digital' = 'short'
  ): string {
    return formatDuration(seconds, format);
  }
}

@Pipe({
  name: 'fmtIsoToLocale',
  standalone: true,
})
export class FmtIsoToLocalePipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    locale: string = 'en-US',
    options?: Intl.DateTimeFormatOptions
  ): string {
    return isoToLocale(value, locale, options);
  }
}

@Pipe({
  name: 'fmtDayOfWeek',
  standalone: true,
})
export class FmtDayOfWeekPipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format: 'long' | 'short' | 'narrow' = 'long',
    locale: string = 'en-US'
  ): string {
    return dayOfWeek(value, format, locale);
  }
}

@Pipe({
  name: 'fmtMonthName',
  standalone: true,
})
export class FmtMonthNamePipe implements PipeTransform {
  transform(
    value: Date | string | number | null | undefined,
    format: 'long' | 'short' | 'narrow' = 'long',
    locale: string = 'en-US'
  ): string {
    return monthName(value, format, locale);
  }
}

@Pipe({
  name: 'fmtIsFuture',
  standalone: true,
})
export class FmtIsFuturePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): boolean {
    return isFutureDate(value);
  }
}

@Pipe({
  name: 'fmtIsPast',
  standalone: true,
})
export class FmtIsPastPipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined): boolean {
    return isPastDate(value);
  }
}

@Pipe({
  name: 'fmtAge',
  standalone: true,
})
export class FmtAgePipe implements PipeTransform {
  transform(birthDate: Date | string | number | null | undefined): number {
    return calculateAge(birthDate);
  }
}

export const DATETIME_PIPES = [
  FmtTimeAgoPipe,
  FmtDurationPipe,
  FmtIsoToLocalePipe,
  FmtDayOfWeekPipe,
  FmtMonthNamePipe,
  FmtIsFuturePipe,
  FmtIsPastPipe,
  FmtAgePipe,
] as const;
