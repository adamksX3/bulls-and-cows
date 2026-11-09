import { describe, expect, test } from 'vitest';
import { isValidGuess } from '../src/logic/validation.js';

describe('isValidGuess', () => {
  test('accepts 01 for length 2 in binary', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
  });

  test('rejects too short guess in binary', () => {
    expect(isValidGuess('0', 2, 2)).toBe(false);
  });

  test('rejects letter in binary', () => {
    expect(isValidGuess('0a', 2, 2)).toBe(false);
  });

  test('rejects repeated digits in binary', () => {
    expect(isValidGuess('01110', 5, 2)).toBe(false);
  });

  test('accepts 4567 for length 4 in octal', () => {
    expect(isValidGuess('4567', 4, 8)).toBe(true);
  });

  test('rejects repeated digits in octal', () => {
    expect(isValidGuess('6767', 4, 8)).toBe(false);
  });

  test('rejects letter in octal', () => {
    expect(isValidGuess('12a4', 4, 8)).toBe(false);
  });

  test('rejects 8 in octal', () => {
    expect(isValidGuess('4238', 4, 8)).toBe(false);
  });

  test('accepts 1234 for length 4 in decimal', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  test('rejects too short guess', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
  });

  test('rejects too long guess', () => {
    expect(isValidGuess('123469', 5, 10)).toBe(false);
  });

  test('rejects repeated digits in decimal', () => {
    expect(isValidGuess('2231', 4, 10)).toBe(false);
  });

  test('accepts mixed case hex guess', () => {
    expect(isValidGuess('1aF3', 4, 16)).toBe(true);
  });

  test('rejects j in hex', () => {
    expect(isValidGuess('1a2j89f', 7, 16)).toBe(false);
  });

  test('rejects same hex digit in different case', () => {
    expect(isValidGuess('1aA3', 4, 16)).toBe(false);
  });

  test('rejects space in guess', () => {
    expect(isValidGuess('12 3', 4, 16)).toBe(false);
  });
});
