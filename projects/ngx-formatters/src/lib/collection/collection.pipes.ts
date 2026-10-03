import { Pipe, PipeTransform } from '@angular/core';
import {
  jsonPretty,
  listJoin,
  pluralize,
  getInitials,
  firstAndLast,
  fileSize,
  filterEmpty,
} from './collection.formatters';

@Pipe({
  name: 'fmtJsonPretty',
  standalone: true,
})
export class FmtJsonPrettyPipe implements PipeTransform {
  transform(value: any, space: number = 2): string {
    return jsonPretty(value, space);
  }
}

@Pipe({
  name: 'fmtListJoin',
  standalone: true,
})
export class FmtListJoinPipe implements PipeTransform {
  transform(
    items: any[] | null | undefined,
    conjunction: string = 'and',
    separator: string = ', '
  ): string {
    return listJoin(items, conjunction, separator);
  }
}

@Pipe({
  name: 'fmtPluralize',
  standalone: true,
})
export class FmtPluralizePipe implements PipeTransform {
  transform(
    count: number | string | null | undefined,
    singular: string,
    plural?: string,
    includeCount: boolean = true
  ): string {
    return pluralize(count, singular, plural, includeCount);
  }
}

@Pipe({
  name: 'fmtInitials',
  standalone: true,
})
export class FmtInitialsPipe implements PipeTransform {
  transform(name: string | null | undefined, maxChars: number = 2): string {
    return getInitials(name, maxChars);
  }
}

@Pipe({
  name: 'fmtFirstAndLast',
  standalone: true,
})
export class FmtFirstAndLastPipe implements PipeTransform {
  transform<T>(items: T[] | null | undefined): [T, T] | null {
    return firstAndLast(items);
  }
}

@Pipe({
  name: 'fmtFileSize',
  standalone: true,
})
export class FmtFileSizePipe implements PipeTransform {
  transform(
    bytes: number | string | null | undefined,
    decimals: number = 2
  ): string {
    return fileSize(bytes, decimals);
  }
}

@Pipe({
  name: 'fmtFilterEmpty',
  standalone: true,
})
export class FmtFilterEmptyPipe implements PipeTransform {
  transform<T>(items: T[] | null | undefined): T[] {
    return filterEmpty(items);
  }
}

export const COLLECTION_PIPES = [
  FmtJsonPrettyPipe,
  FmtListJoinPipe,
  FmtPluralizePipe,
  FmtInitialsPipe,
  FmtFirstAndLastPipe,
  FmtFileSizePipe,
  FmtFilterEmptyPipe,
] as const;
