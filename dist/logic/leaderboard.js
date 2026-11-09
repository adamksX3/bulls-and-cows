export const addToLeaderboard = (board, entry, limit) => {
    return [...board, entry]
        .sort((a, b) => {
        if (a.attempts !== b.attempts)
            return a.attempts - b.attempts;
        return a.time - b.time;
    })
        .slice(0, limit);
};
export const getLeaderboardKey = (length, base) => {
    return `leaderboard-${length}-${base}`;
};
