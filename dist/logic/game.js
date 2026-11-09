export const addToHistory = (history, entry) => {
    const isDuplicate = history.some((item) => item.guess === entry.guess);
    if (isDuplicate)
        return history;
    return [...history, entry];
};
export const isWin = (result, length) => {
    return result.bulls === length;
};
