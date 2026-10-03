import { describe, it, expect } from 'vitest';
import {
  formatPhoneNumber,
  maskEmail,
  maskCard,
  formatIban,
  formatMacAddress,
  maskUuid,
  hexToRgb,
} from './identifier.formatters';
import {
  FmtPhoneNumberPipe,
  FmtMaskEmailPipe,
  FmtMaskCardPipe,
  FmtIbanPipe,
  FmtMacAddressPipe,
  FmtMaskUuidPipe,
  FmtHexToRgbPipe,
} from './identifier.pipes';

describe('Identifier Formatters & Pipes', () => {
  describe('formatPhoneNumber', () => {
    it('should format phone numbers with patterns', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
      expect(formatPhoneNumber('08123456789', '####-####-####')).toBe('0812-3456-789');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtPhoneNumberPipe();
      expect(pipe.transform('1234567890')).toBe('(123) 456-7890');
    });
  });

  describe('maskEmail', () => {
    it('should mask email addresses', () => {
      expect(maskEmail('john.doe@example.com')).toBe('j***e@example.com');
      expect(maskEmail('ab@example.com')).toBe('a***@example.com');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtMaskEmailPipe();
      expect(pipe.transform('alex@test.org')).toBe('a***x@test.org');
    });
  });

  describe('maskCard', () => {
    it('should mask card number preserving last 4 digits', () => {
      expect(maskCard('4111222233334444')).toBe('**** **** **** 4444');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtMaskCardPipe();
      expect(pipe.transform('5500000000001234')).toBe('**** **** **** 1234');
    });
  });

  describe('formatIban', () => {
    it('should chunk IBAN in 4-character blocks', () => {
      expect(formatIban('GB29XAAA10123456789012')).toBe('GB29 XAAA 1012 3456 7890 12');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtIbanPipe();
      expect(pipe.transform('DE89370400440532013000')).toBe('DE89 3704 0044 0532 0130 00');
    });
  });

  describe('formatMacAddress', () => {
    it('should format MAC address with separators', () => {
      expect(formatMacAddress('001422012345')).toBe('00:14:22:01:23:45');
      expect(formatMacAddress('001422012345', '-')).toBe('00-14-22-01-23-45');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtMacAddressPipe();
      expect(pipe.transform('AABBCCDDEEFF')).toBe('AA:BB:CC:DD:EE:FF');
    });
  });

  describe('maskUuid', () => {
    it('should mask UUID with visible ends', () => {
      expect(maskUuid('123e4567-e89b-12d3-a456-426614174000')).toBe('123e...4000');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtMaskUuidPipe();
      expect(pipe.transform('abcdef1234567890')).toBe('abcd...7890');
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex to RGB/RGBA', () => {
      expect(hexToRgb('#ff0000')).toBe('rgb(255, 0, 0)');
      expect(hexToRgb('#00ff00', 0.5)).toBe('rgba(0, 255, 0, 0.5)');
      expect(hexToRgb('#fff')).toBe('rgb(255, 255, 255)');
    });

    it('pipe should transform correctly', () => {
      const pipe = new FmtHexToRgbPipe();
      expect(pipe.transform('#000000')).toBe('rgb(0, 0, 0)');
    });
  });
});
