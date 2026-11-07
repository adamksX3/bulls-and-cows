import { describe, expect, test } from 'vitest';
import { createDigitValidator } from '../src/logic/validation.js';

describe('createDigitValidator', () => {
  test('accepts 0 in binary', () => {
    expect(createDigitValidator(2)('0')).toBe(true);
  });

  test('accepts 1 in binary', () => {
    expect(createDigitValidator(2)('1')).toBe(true);
  });

  test('rejects 2 in binary', () => {
    expect(createDigitValidator(2)('2')).toBe(false);
  });

  test('rejects two characters in binary', () => {
    expect(createDigitValidator(2)('15')).toBe(false);
  });

  test('accepts 0 in octal', () => {
    expect(createDigitValidator(8)('0')).toBe(true);
  });

  test('accepts 5 in octal', () => {
    expect(createDigitValidator(8)('5')).toBe(true);
  });

  test('rejects 8 in octal', () => {
    expect(createDigitValidator(8)('8')).toBe(false);
  });

  test('rejects two characters in octal', () => {
    expect(createDigitValidator(8)('15')).toBe(false);
  });

  test('accepts 9 in decimal', () => {
    expect(createDigitValidator(10)('9')).toBe(true);
  });

  test('rejects minus sign in decimal', () => {
    expect(createDigitValidator(10)('-')).toBe(false);
  });

  test('rejects a in decimal', () => {
    expect(createDigitValidator(10)('a')).toBe(false);
  });

  test('accepts 0 in decimal', () => {
    expect(createDigitValidator(10)('0')).toBe(true);
  });

  test('accepts lowercase a in hex', () => {
    expect(createDigitValidator(16)('a')).toBe(true);
  });

  test('accepts uppercase A in hex', () => {
    expect(createDigitValidator(16)('A')).toBe(true);
  });

  test('rejects k in hex', () => {
    expect(createDigitValidator(16)('k')).toBe(false);
  });

  test('rejects two characters in hex', () => {
    expect(createDigitValidator(16)('11')).toBe(false);
  });

  test('rejects 01 in binary', () => {
    expect(createDigitValidator(2)('01')).toBe(false);
  });

  test('rejects 12 in hex', () => {
    expect(createDigitValidator(16)('12')).toBe(false);
  });

  test('rejects empty string', () => {
    expect(createDigitValidator(10)('')).toBe(false);
  });
});
