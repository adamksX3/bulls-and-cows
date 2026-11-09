export type GuessResult = { bulls: number; cows: number };

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const guessDigits = guess.split('');
  const bulls = guessDigits.filter((digit, index) => digit === secret[index]).length;
  const cows = guessDigits.filter(
    (digit, index) => digit !== secret[index] && secret.includes(digit),
  ).length;
  return { bulls: bulls, cows: cows };
};
