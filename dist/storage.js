export const loadLeaderboard = (key) => {
    const saved = localStorage.getItem(key);
    if (saved === null) {
        return [];
    }
    return JSON.parse(saved);
};
export const saveLeaderboard = (key, board) => {
    localStorage.setItem(key, JSON.stringify(board));
};
