import type { GuessResult } from './evaluation.js';

export type HistoryEntry = { guess: string; result: GuessResult };

export const addToHistory = (history: HistoryEntry[], entry: HistoryEntry): HistoryEntry[] => {
  const isDuplicate = history.some((item) => item.guess === entry.guess);
  if (isDuplicate) return history;
  return [...history, entry];
};

export const isWin = (result: GuessResult, length: number): boolean => {
  return result.bulls === length;
};
