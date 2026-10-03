import { NgModule } from '@angular/core';
import { STRING_PIPES } from './string/string.pipes';
import { NUMBER_PIPES } from './number/number.pipes';
import { CURRENCY_PIPES } from './currency/currency.pipes';
import { DATETIME_PIPES } from './datetime/datetime.pipes';
import { IDENTIFIER_PIPES } from './identifier/identifier.pipes';
import { COLLECTION_PIPES } from './collection/collection.pipes';
import { UTILITY_PIPES } from './utility/utility.pipes';

/**
 * Array of all 50 standalone pipes provided by `ngx-formatters`.
 * Use directly in standalone component imports:
 * @example
 * ```ts
 * @Component({
 *   imports: [NGX_FORMATTERS_PIPES]
 * })
 * ```
 */
export const NGX_FORMATTERS_PIPES = [
  ...STRING_PIPES,
  ...NUMBER_PIPES,
  ...CURRENCY_PIPES,
  ...DATETIME_PIPES,
  ...IDENTIFIER_PIPES,
  ...COLLECTION_PIPES,
  ...UTILITY_PIPES,
] as const;

/**
 * NgModule for applications that still use NgModule-based architecture.
 */
@NgModule({
  imports: [...NGX_FORMATTERS_PIPES],
  exports: [...NGX_FORMATTERS_PIPES],
})
export class NgxFormattersModule {}
