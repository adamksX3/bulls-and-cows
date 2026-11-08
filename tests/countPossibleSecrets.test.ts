import { describe, expect, test } from 'vitest';
import { countPossibleSecrets } from '../src/logic/secret.js';

describe('countPossibleSecrets', () => {
  test('returns 1 for empty secret', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  test('counts 2 secrets of length 2 in binary', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  test('counts 336 secrets of length 3 in octal', () => {
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  test('counts 10 secrets of length 1 in decimal', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });

  test('counts 5040 secrets of length 4 in decimal', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  test('counts 5765760 secrets of length 6 in hex', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });
});
