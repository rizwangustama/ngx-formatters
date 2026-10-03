import { Pipe, PipeTransform } from '@angular/core';
import {
  urlHostname,
  urlSanitize,
  highlightText,
  defaultValue,
  formatByteSpeed,
} from './utility.formatters';

@Pipe({
  name: 'fmtUrlHostname',
  standalone: true,
})
export class FmtUrlHostnamePipe implements PipeTransform {
  transform(url: string | null | undefined): string {
    return urlHostname(url);
  }
}

@Pipe({
  name: 'fmtUrlSanitize',
  standalone: true,
})
export class FmtUrlSanitizePipe implements PipeTransform {
  transform(
    url: string | null | undefined,
    defaultUrl: string = '#'
  ): string {
    return urlSanitize(url, defaultUrl);
  }
}

@Pipe({
  name: 'fmtHighlight',
  standalone: true,
})
export class FmtHighlightPipe implements PipeTransform {
  transform(
    text: string | null | undefined,
    search: string | null | undefined,
    cssClass: string = 'fmt-highlight'
  ): string {
    return highlightText(text, search, cssClass);
  }
}

@Pipe({
  name: 'fmtDefaultValue',
  standalone: true,
})
export class FmtDefaultValuePipe implements PipeTransform {
  transform<T>(value: T | null | undefined, fallback: T): T {
    return defaultValue(value, fallback);
  }
}

@Pipe({
  name: 'fmtByteSpeed',
  standalone: true,
})
export class FmtByteSpeedPipe implements PipeTransform {
  transform(
    bytesPerSec: number | string | null | undefined,
    decimals: number = 1
  ): string {
    return formatByteSpeed(bytesPerSec, decimals);
  }
}

export const UTILITY_PIPES = [
  FmtUrlHostnamePipe,
  FmtUrlSanitizePipe,
  FmtHighlightPipe,
  FmtDefaultValuePipe,
  FmtByteSpeedPipe,
] as const;
