export type GuessResult = { bulls: number; cows: number };

export const evaluateGuess = (_secret: string, _guess: string): GuessResult => ({
  bulls: 0,
  cows: 0,
});
