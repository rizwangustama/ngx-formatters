# ngx-formatters

A lightweight, modular, and comprehensive formatting library for Angular applications.  
Includes **50 essential formatters** available both as **Standalone Angular Pipes** and **pure TypeScript utility functions**.

[![npm version](https://img.shields.io/npm/v/ngx-formatters.svg)](https://www.npmjs.com/package/ngx-formatters)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Features

- **50 Formatters**: String, Number, Currency, DateTime, Identifier, Collection, and Utility.
- **Dual Usage**: Use as Angular template pipes (`| fmt...`) or pure TypeScript functions (`capitalize(...)`).
- **Standalone Ready**: Compatible with Angular standalone components and signals.
- **Tree-shakeable**: Import only what you need, or import all at once using `NGX_FORMATTERS_PIPES`.
- **Zero Heavy Dependencies**: Built on standard Web & ECMAScript APIs (`Intl`, `Date`, etc.).
- **100% Type-Safe**: Written in TypeScript with full JSDoc and test coverage.

---

## 📦 Installation

```bash
npm install ngx-formatters
```

---

## 🛠️ Quick Start

### Option 1: Standalone Components (Recommended)

Import either specific pipes or all pipes via `NGX_FORMATTERS_PIPES`:

```typescript
import { Component } from '@angular/core';
import { 
  FmtCapitalizePipe, 
  FmtCurrencyPipe, 
  FmtTimeAgoPipe 
} from 'ngx-formatters';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FmtCapitalizePipe, FmtCurrencyPipe, FmtTimeAgoPipe],
  template: `
    <p>{{ 'hello world' | fmtCapitalize }}</p>
    <!-- Output: Hello world -->

    <p>{{ 1250000 | fmtCurrency:'USD' }}</p>
    <!-- Output: $1,250,000.00 -->

    <p>{{ commentDate | fmtTimeAgo }}</p>
    <!-- Output: 5 minutes ago -->
  `
})
export class AppComponent {
  commentDate = new Date(Date.now() - 5 * 60 * 1000);
}
```

Or import all 50 pipes at once:

```typescript
import { Component } from '@angular/core';
import { NGX_FORMATTERS_PIPES } from 'ngx-formatters';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NGX_FORMATTERS_PIPES],
  templateUrl: './app.component.html',
})
export class AppComponent {}
```

### Option 2: Pure TypeScript Functions

You can also use all formatters directly in your services, stores, or components:

```typescript
import { 
  capitalize, 
  formatCurrency, 
  timeAgo, 
  slugify, 
  formatPhoneNumber 
} from 'ngx-formatters';

const title = capitalize('angular library'); // "Angular library"
const price = formatCurrency(5000, 'EUR', 'de-DE'); // "5.000,00 €"
const relative = timeAgo(new Date()); // "just now"
const slug = slugify('Angular Formatters 2026!'); // "angular-formatters-2026"
const phone = formatPhoneNumber('08123456789', '####-####-####'); // "0812-3456-789"
```

---

## 📚 Complete List of 50 Formatters

### 1. String & Text Formatters (10)

| Pipe Name | Function Name | Description & Example |
| :--- | :--- | :--- |
| `fmtCapitalize` | `capitalize(val, preserveRest?)` | `'hello WORLD'` ➔ `'Hello world'` |
| `fmtTitleCase` | `titleCase(val)` | `'the quick brown fox'` ➔ `'The Quick Brown Fox'` |
| `fmtCamelCase` | `camelCase(val)` | `'hello world'` ➔ `'helloWorld'` |
| `fmtKebabCase` | `kebabCase(val)` | `'helloWorld'` ➔ `'hello-world'` |
| `fmtSnakeCase` | `snakeCase(val)` | `'helloWorld'` ➔ `'hello_world'` |
| `fmtPascalCase` | `pascalCase(val)` | `'hello world'` ➔ `'HelloWorld'` |
| `fmtTruncate` | `truncate(val, len, suffix?, preserveWord?)` | `'Super long text'` ➔ `'Super l...'` |
| `fmtMask` | `mask(val, start?, end?, char?)` | `'1234567890'` ➔ `'12******90'` |
| `fmtSlugify` | `slugify(val)` | `'Hello World! 2026'` ➔ `'hello-world-2026'` |
| `fmtStripHtml` | `stripHtml(val)` | `'<p>Hello <b>World</b></p>'` ➔ `'Hello World'` |

---

### 2. Number & Math Formatters (8)

| Pipe Name | Function Name | Description & Example |
| :--- | :--- | :--- |
| `fmtNumberCompact` | `formatNumberCompact(val, locale?, precision?)` | `1500000` ➔ `'1.5M'` |
| `fmtOrdinal` | `ordinal(val)` | `1` ➔ `'1st'`, `22` ➔ `'22nd'`, `103` ➔ `'103rd'` |
| `fmtPercentage` | `formatPercentage(val, decimals?, multiply?)` | `0.125` ➔ `'12.50%'` |
| `fmtClamp` | `clamp(val, min, max)` | `clamp(15, 0, 10)` ➔ `10` |
| `fmtRound` | `roundTo(val, decimals?)` | `3.14159` ➔ `3.14` |
| `fmtPadNumber` | `padNumber(val, digits?)` | `7` ➔ `'007'` (digits: 3) |
| `fmtRomanNumeral` | `toRomanNumeral(val)` | `2026` ➔ `'MMXXVI'`, `14` ➔ `'XIV'` |
| `fmtFileUnit` | `formatFileUnit(bytes, decimals?, binary?)` | `1024` ➔ `'1.00 KB'` / `'1.00 KiB'` |

---

### 3. Currency & Financial Formatters (5)

| Pipe Name | Function Name | Description & Example |
| :--- | :--- | :--- |
| `fmtCurrency` | `formatCurrency(val, cur?, locale?, display?)` | `1234.56` ➔ `'$1,234.56'` |
| `fmtCurrencyCompact` | `formatCurrencyCompact(val, cur?, locale?)` | `1500000` ➔ `'$1.5M'` |
| `fmtAccounting` | `formatAccounting(val, sym?, decimals?)` | `-1234.56` ➔ `'($1,234.56)'` |
| `fmtIdrCurrency` | `formatIdrCurrency(val, withSymbol?, decimals?)` | `1500000` ➔ `'Rp 1.500.000'` |
| `fmtVat` | `formatVat(netAmount, vatRate?, decimals?)` | `100000` (11%) ➔ `'111,000.00'` |

---

### 4. Date, Time & Relative Formatters (8)

| Pipe Name | Function Name | Description & Example |
| :--- | :--- | :--- |
| `fmtTimeAgo` | `timeAgo(date, locale?)` | Relative time: `'2 hours ago'`, `'just now'` |
| `fmtDuration` | `formatDuration(sec, 'short' \| 'long' \| 'digital')` | `3665` ➔ `'1h 1m 5s'` or `'01:01:05'` |
| `fmtIsoToLocale` | `isoToLocale(date, locale?, options?)` | `'2026-10-03'` ➔ `'Oct 3, 2026'` |
| `fmtDayOfWeek` | `dayOfWeek(date, format?, locale?)` | `'2026-10-03'` ➔ `'Saturday'` |
| `fmtMonthName` | `monthName(date, format?, locale?)` | `'2026-10-03'` ➔ `'October'` |
| `fmtIsFuture` | `isFutureDate(date)` | Returns boolean `true`/`false` |
| `fmtIsPast` | `isPastDate(date)` | Returns boolean `true`/`false` |
| `fmtAge` | `calculateAge(birthDate)` | Computes accurate age in years |

---

### 5. Phone, Masking & Identifiers (7)

| Pipe Name | Function Name | Description & Example |
| :--- | :--- | :--- |
| `fmtPhoneNumber` | `formatPhoneNumber(val, pattern?)` | `'1234567890'` ➔ `'(123) 456-7890'` |
| `fmtMaskEmail` | `maskEmail(val, maskLen?)` | `'john.doe@example.com'` ➔ `'j***e@example.com'` |
| `fmtMaskCard` | `maskCard(val, char?, delimiter?)` | `'4111222233334444'` ➔ `'**** **** **** 4444'` |
| `fmtIban` | `formatIban(val, separator?)` | Formats IBAN in groups of 4 chars |
| `fmtMacAddress` | `formatMacAddress(val, separator?)` | `'001422012345'` ➔ `'00:14:22:01:23:45'` |
| `fmtMaskUuid` | `maskUuid(val, visibleChars?)` | `'123e4567-e89b...4000'` ➔ `'123e...4000'` |
| `fmtHexToRgb` | `hexToRgb(hex, alpha?)` | `'#ff0000'` ➔ `'rgb(255, 0, 0)'` |

---

### 6. Collection, Array & Object Formatters (7)

| Pipe Name | Function Name | Description & Example |
| :--- | :--- | :--- |
| `fmtJsonPretty` | `jsonPretty(val, indent?)` | Formats object into indented JSON string |
| `fmtListJoin` | `listJoin(array, conjunction?, sep?)` | `['A', 'B', 'C']` ➔ `'A, B and C'` |
| `fmtPluralize` | `pluralize(count, singular, plural?, includeCount?)` | `1, 'apple'` ➔ `'1 apple'`, `3, 'apple'` ➔ `'3 apples'` |
| `fmtInitials` | `getInitials(name, maxChars?)` | `'John Fitzgerald Kennedy'` ➔ `'JK'` / `'JFK'` |
| `fmtFirstAndLast` | `firstAndLast(array)` | Returns `[first, last]` tuple or null |
| `fmtFileSize` | `fileSize(bytes, decimals?)` | `1048576` ➔ `'1.00 MiB'` |
| `fmtFilterEmpty` | `filterEmpty(array)` | Filters out `null`, `undefined`, `''`, `NaN` |

---

### 7. Utility, Web & Security Formatters (5)

| Pipe Name | Function Name | Description & Example |
| :--- | :--- | :--- |
| `fmtUrlHostname` | `urlHostname(url)` | `'https://sub.domain.com/path'` ➔ `'sub.domain.com'` |
| `fmtUrlSanitize` | `urlSanitize(url, fallback?)` | Prevents `javascript:`/`data:` XSS vectors |
| `fmtHighlight` | `highlightText(text, search, class?)` | Wraps matches in `<mark class="fmt-highlight">` |
| `fmtDefaultValue` | `defaultValue(val, fallback)` | Returns fallback if null, undefined, or empty |
| `fmtByteSpeed` | `formatByteSpeed(bytesPerSec, decimals?)` | `1048576` ➔ `'1.0 MB/s'` |

---

## 🧪 Testing

Run Vitest unit tests:

```bash
npm test
```

## 🏗️ Build

Build the Angular library:

```bash
npm run build
```

## 📄 License

MIT © [Rizwan Gustama](https://github.com/rizwangustama)
