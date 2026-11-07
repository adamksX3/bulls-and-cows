const DIGITS = '0123456789abcdef';

export const createDigitValidator = (base: number) => {
  const systemValidNumbers = DIGITS.slice(0, base);
  return (char: string): boolean => systemValidNumbers.includes(char.toLowerCase());
};
