import type { LeaderboardEntry } from './logic/leaderboard.js';

export const loadLeaderboard = (key: string): LeaderboardEntry[] => {
  const saved = localStorage.getItem(key);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
};

export const saveLeaderboard = (key: string, board: LeaderboardEntry[]): void => {
  localStorage.setItem(key, JSON.stringify(board));
};
