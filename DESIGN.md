# Bulls and Cows — Design

## 1. Data structures and algorithms

### Secret

`generateSecret` returns the secret as a **string** (e.g. `'0123'`, `'a1f3'`), not a number:

- a number would lose the leading zero (`0123` → `123`);
- hex digits `a–f` can't be stored as separate digits in a number;
- the guess from `<input>` is also a string, so both can be compared character by character (`secret[index]`, `secret.includes(digit)`).

### Game state and history

- `history` is an array of `HistoryEntry` objects: `{ guess: string, result: { bulls, cows } }`. An array keeps the order of attempts, and its `length` is the number of attempts.
- `addToHistory` (`src/logic/game.ts`) never mutates the old array: it returns a new one with `[...history, entry]` instead of `push`. Old entries stay unchanged, and the function stays pure and easy to test.
- A repeated guess is detected with `some`: if the guess is already in the history, the same array is returned, so there are no duplicates.
- The game state (`secret`, `history`, `startTime`) lives inside the Start click handler in `src/main.ts`. Every Start creates a fresh state, so "New game" does not need to reset anything.
- The leaderboard is an array of `LeaderboardEntry` objects saved to `localStorage` as JSON, with a separate key for every length/base combination (`getLeaderboardKey`).

### `evaluateGuess` (`src/logic/evaluation.ts`)

The guess is split into digits, then two `filter` passes are made:

- **bulls**: digits that are equal to the secret digit at the same index (`digit === secret[index]`);
- **cows**: digits that are not on their place but exist somewhere in the secret (`digit !== secret[index] && secret.includes(digit)`).

`.length` of each filtered array is the count. No loops with manual counters are used. A bull is never counted as a cow, because the cow condition excludes the same position.

### `countPossibleSecrets` (`src/logic/secret.ts`)

Counts how many secrets with unique digits exist: the first digit has `base` options, the next one `base − 1`, and so on. This is P(base, length) = base! / (base − length)!.

- **Recursion**: `count(0) = 1` (base case: one empty secret), and `count(length) = count(length − 1) × (base − length + 1)`.
  Example for base 10: `count(1) = 10`, `count(2) = 10 × 9 = 90`, `count(3) = 90 × 8 = 720`.
- **Memoization**: results are stored in a `Map` outside the function with the key `` `${length}-${base}` ``. `base` is part of the key, otherwise `(2, 10)` and `(2, 2)` would share one result.

## 2. Complexity

`n` = `length` (2–6), `b` = `base` (2–16).

### `evaluateGuess` — O(n²)

Two `filter` passes over the guess (n steps each). Inside the cows pass, `secret.includes(digit)` scans the secret, which is up to n more steps for every digit: n × n = O(n²). With n ≤ 6 this is at most 36 comparisons.

### `generateSecret` — O(n · b)

The loop runs n times. On every step a random digit is taken from the "bag" of available digits and removed from it: `bag.slice(0, index) + bag.slice(index + 1)` builds a new string from the remaining digits, which is up to b characters. Total: n × b, at most 6 × 16 = 96 operations. Removing the taken digit guarantees that all digits are unique without retries.

### `isValidGuess` — O(n · b)

- length check — O(1);
- `digits.every(isValidDigit)` — for each of n digits, the validator calls `includes` on the string of allowed digits (up to b characters): O(n · b);
- uniqueness check with `new Set(digits).size === digits.length` — one pass, O(n).

The largest part wins: O(n · b), at most 6 × 16 = 96 operations.

### `countPossibleSecrets` — O(n) first call, O(1) cached

- First call: the recursion goes from `length` down to `0`, which is n + 1 calls with one multiplication each, O(n) time and O(n) call stack depth.
- Repeated call with the same `(length, base)`: the result is read from the `Map` cache immediately, O(1).

## 3. Clean code principles

- **DRY** — the allowed-digit rule is written once in `createDigitValidator` (`src/logic/validation.ts`) and reused in two places: `isValidGuess` and the input filter in `src/main.ts` (`filter(isValidDigit)`).
- **Separation of concerns** — `src/logic/` contains only pure functions without DOM, `src/storage.ts` is the only place that touches `localStorage`, `src/main.ts` is the only file that works with the DOM. Tests are in `tests/`, one file per function.
- **Pure functions and immutability** — logic functions don't change their arguments: `addToHistory` and `addToLeaderboard` return new arrays (`[...history, entry]`, `[...board, entry].sort(...)`).
- **Dependency injection** — `generateSecret(length, base, random = Math.random)` takes the random source as a parameter, so tests can pass a fixed `random` and get repeatable results.
- **Meaningful names** — boolean functions and variables start with `is`: `isValidGuess`, `isWin`, `isDuplicate`, `isValidDigit`.
- **No magic numbers** — `LEADERBOARD_LIMIT` (`src/main.ts`) and `DIGITS` (`src/logic/validation.ts`) are named constants.
- **Guard clauses** — early `return` instead of nested `if`: `if (!isValidGuess(...)) return;` and `if (!isWin(...)) return;` in `src/main.ts`, `if (isDuplicate) return history;` in `addToHistory`.
