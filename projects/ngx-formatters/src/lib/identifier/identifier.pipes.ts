import { Pipe, PipeTransform } from '@angular/core';
import {
  formatPhoneNumber,
  maskEmail,
  maskCard,
  formatIban,
  formatMacAddress,
  maskUuid,
  hexToRgb,
} from './identifier.formatters';

@Pipe({
  name: 'fmtPhoneNumber',
  standalone: true,
})
export class FmtPhoneNumberPipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    pattern: string = '(###) ###-####'
  ): string {
    return formatPhoneNumber(value, pattern);
  }
}

@Pipe({
  name: 'fmtMaskEmail',
  standalone: true,
})
export class FmtMaskEmailPipe implements PipeTransform {
  transform(value: string | null | undefined, maskLength: number = 3): string {
    return maskEmail(value, maskLength);
  }
}

@Pipe({
  name: 'fmtMaskCard',
  standalone: true,
})
export class FmtMaskCardPipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    maskChar: string = '*',
    delimiter: string = ' '
  ): string {
    return maskCard(value, maskChar, delimiter);
  }
}

@Pipe({
  name: 'fmtIban',
  standalone: true,
})
export class FmtIbanPipe implements PipeTransform {
  transform(value: string | null | undefined, separator: string = ' '): string {
    return formatIban(value, separator);
  }
}

@Pipe({
  name: 'fmtMacAddress',
  standalone: true,
})
export class FmtMacAddressPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    separator: ':' | '-' = ':'
  ): string {
    return formatMacAddress(value, separator);
  }
}

@Pipe({
  name: 'fmtMaskUuid',
  standalone: true,
})
export class FmtMaskUuidPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    visibleChars: number = 4
  ): string {
    return maskUuid(value, visibleChars);
  }
}

@Pipe({
  name: 'fmtHexToRgb',
  standalone: true,
})
export class FmtHexToRgbPipe implements PipeTransform {
  transform(hex: string | null | undefined, alpha?: number): string {
    return hexToRgb(hex, alpha);
  }
}

export const IDENTIFIER_PIPES = [
  FmtPhoneNumberPipe,
  FmtMaskEmailPipe,
  FmtMaskCardPipe,
  FmtIbanPipe,
  FmtMacAddressPipe,
  FmtMaskUuidPipe,
  FmtHexToRgbPipe,
] as const;
