import { describe, expect, test } from 'vitest';
import { generateSecret } from '../src/logic/secret.js';
import { isValidGuess } from '../src/logic/validation.js';

describe('generateSecret', () => {
  test('works in binary', () => {
    expect(generateSecret(2, 2, () => 0)).toBe('01');
  });

  test('works in octal', () => {
    expect(generateSecret(3, 8, () => 0.99)).toBe('765');
  });

  test('picks first digits when random returns 0', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
  });

  test('picks last digits when random returns 0.99', () => {
    expect(generateSecret(3, 10, () => 0.99)).toBe('987');
  });

  test('picks middle digits when random returns 0.5', () => {
    expect(generateSecret(3, 10, () => 0.5)).toBe('546');
  });

  test('works in hex', () => {
    expect(generateSecret(2, 16, () => 0.99)).toBe('fe');
  });

  test('generates valid secret with real random', () => {
    expect(isValidGuess(generateSecret(6, 16), 6, 16)).toBe(true);
  });
});
