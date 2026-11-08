export type LeaderboardEntry = {
  attempts: number;
  time: number;
  date: string;
  length: number;
  base: number;
};

export const addToLeaderboard = (
  board: LeaderboardEntry[],
  entry: LeaderboardEntry,
  limit: number,
): LeaderboardEntry[] => {
  return [...board, entry]
    .sort((a, b) => {
      if (a.attempts !== b.attempts) return a.attempts - b.attempts;
      return a.time - b.time;
    })
    .slice(0, limit);
};
