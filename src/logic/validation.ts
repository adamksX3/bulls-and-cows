const DIGITS = '0123456789abcdef';

export const createDigitValidator = (base: number) => {
  const systemValidNumbers = DIGITS.slice(0, base);
  return (char: string): boolean =>
    char.length === 1 && systemValidNumbers.includes(char.toLowerCase());
};

export const isValidGuess = (_guess: string, _length: number, _base: number): boolean => false;
