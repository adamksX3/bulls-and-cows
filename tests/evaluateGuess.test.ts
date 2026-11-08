import { describe, expect, test } from 'vitest';
import { evaluateGuess } from '../src/logic/evaluation.js';

describe('evaluateGuess', () => {
  test('counts swapped digits as cows in binary', () => {
    expect(evaluateGuess('01', '10')).toEqual({ bulls: 0, cows: 2 });
  });

  test('counts 4 bulls when guess equals secret', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  test('counts zero when no digits match', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  test('counts 4 cows when guess is reversed', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  test('counts bulls and cows together', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
  });

  test('keeps leading zero as a bull', () => {
    expect(evaluateGuess('0123', '0789')).toEqual({ bulls: 1, cows: 0 });
  });

  test('counts only cows when digits are misplaced', () => {
    expect(evaluateGuess('9267', '0789')).toEqual({ bulls: 0, cows: 2 });
  });

  test('counts 4 cows in hex', () => {
    expect(evaluateGuess('a12f', 'f21a')).toEqual({ bulls: 0, cows: 4 });
  });

  test('counts one bull in hex', () => {
    expect(evaluateGuess('b923', 'c12d')).toEqual({ bulls: 1, cows: 0 });
  });

  test('counts bull and cows with letters in hex', () => {
    expect(evaluateGuess('1a34', '4a10')).toEqual({ bulls: 1, cows: 2 });
  });

  test('counts letter cow in hex', () => {
    expect(evaluateGuess('f123', '0f45')).toEqual({ bulls: 0, cows: 1 });
  });
});
