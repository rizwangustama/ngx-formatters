import { Pipe, PipeTransform } from '@angular/core';
import {
  capitalize,
  titleCase,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  truncate,
  mask,
  slugify,
  stripHtml,
} from './string.formatters';

@Pipe({
  name: 'fmtCapitalize',
  standalone: true,
})
export class FmtCapitalizePipe implements PipeTransform {
  transform(value: string | null | undefined, preserveRest: boolean = false): string {
    return capitalize(value, preserveRest);
  }
}

@Pipe({
  name: 'fmtTitleCase',
  standalone: true,
})
export class FmtTitleCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return titleCase(value);
  }
}

@Pipe({
  name: 'fmtCamelCase',
  standalone: true,
})
export class FmtCamelCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return camelCase(value);
  }
}

@Pipe({
  name: 'fmtKebabCase',
  standalone: true,
})
export class FmtKebabCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return kebabCase(value);
  }
}

@Pipe({
  name: 'fmtSnakeCase',
  standalone: true,
})
export class FmtSnakeCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return snakeCase(value);
  }
}

@Pipe({
  name: 'fmtPascalCase',
  standalone: true,
})
export class FmtPascalCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return pascalCase(value);
  }
}

@Pipe({
  name: 'fmtTruncate',
  standalone: true,
})
export class FmtTruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    length: number = 30,
    suffix: string = '...',
    preserveWord: boolean = false
  ): string {
    return truncate(value, length, suffix, preserveWord);
  }
}

@Pipe({
  name: 'fmtMask',
  standalone: true,
})
export class FmtMaskPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    visibleStart: number = 0,
    visibleEnd: number = 4,
    maskChar: string = '*'
  ): string {
    return mask(value, visibleStart, visibleEnd, maskChar);
  }
}

@Pipe({
  name: 'fmtSlugify',
  standalone: true,
})
export class FmtSlugifyPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return slugify(value);
  }
}

@Pipe({
  name: 'fmtStripHtml',
  standalone: true,
})
export class FmtStripHtmlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return stripHtml(value);
  }
}

export const STRING_PIPES = [
  FmtCapitalizePipe,
  FmtTitleCasePipe,
  FmtCamelCasePipe,
  FmtKebabCasePipe,
  FmtSnakeCasePipe,
  FmtPascalCasePipe,
  FmtTruncatePipe,
  FmtMaskPipe,
  FmtSlugifyPipe,
  FmtStripHtmlPipe,
] as const;
