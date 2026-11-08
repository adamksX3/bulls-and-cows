import { DIGITS } from './validation.js';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random,
): string => {
  let bag = DIGITS.slice(0, base);
  let secret = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(random() * bag.length);
    secret += bag[index];
    bag = bag.slice(0, index) + bag.slice(index + 1);
  }
  return secret;
};

const cache = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  if (length === 0) return 1;

  const key = `${length}-${base}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  const result = countPossibleSecrets(length - 1, base) * (base - length + 1);
  cache.set(key, result);
  return result;
};
