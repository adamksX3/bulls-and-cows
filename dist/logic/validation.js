export const DIGITS = '0123456789abcdef';
export const createDigitValidator = (base) => {
    const systemValidNumbers = DIGITS.slice(0, base);
    return (char) => char.length === 1 && systemValidNumbers.includes(char.toLowerCase());
};
export const isValidGuess = (guess, length, base) => {
    const isValidDigit = createDigitValidator(base);
    const digits = guess.toLowerCase().split('');
    if (guess.length !== length)
        return false;
    if (!digits.every(isValidDigit))
        return false;
    return new Set(digits).size === digits.length;
};
