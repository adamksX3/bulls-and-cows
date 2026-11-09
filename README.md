# Bulls and Cows

A browser version of the classic code-breaking game. The computer picks a secret number with unique digits, and you try to guess it.

- **Bull** — a digit is in the secret and in the right place.
- **Cow** — a digit is in the secret, but in a different place.

Guess all digits in their places to win.

**Play:** https://adamksx3.github.io/bulls-and-cows/

## Features

- Secret length from 2 to 6 digits.
- Four number systems: binary, octal, decimal and hexadecimal (hex digits `A–F` in any case).
- The input accepts only digits that are valid for the selected system.
- History of attempts with bulls and cows; a repeated guess is not added twice.
- Number of attempts and time on win.
- Top-5 leaderboard for every length/base combination, saved in `localStorage`.
- "New game" without reloading the page.

## Tech stack

- TypeScript (compiled with `tsc` to ES modules, no bundler)
- Vitest for tests (TDD: tests were written before every core function)
- ESLint + Prettier
- Husky + lint-staged: pre-commit runs linters, pre-push runs tests
- GitHub Pages via `gh-pages`

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run build
```

Then open `index.html` through a local server (for example, the Live Server extension in VS Code). ES modules don't load from `file://`.

## Scripts

| Script           | What it does                                               |
| ---------------- | ---------------------------------------------------------- |
| `npm test`       | run the tests                                              |
| `npm run build`  | compile `src/` to `dist/`                                  |
| `npm run lint`   | check the code with ESLint                                 |
| `npm run format` | format the code with Prettier                              |
| `npm run deploy` | build and publish `index.html` and `dist/` to GitHub Pages |

## Project structure

```
src/
  logic/          pure game logic, no DOM
    validation.ts   createDigitValidator, isValidGuess
    secret.ts       generateSecret, countPossibleSecrets
    evaluation.ts   evaluateGuess
    game.ts         addToHistory, isWin
    leaderboard.ts  addToLeaderboard, getLeaderboardKey
  storage.ts      localStorage access
  main.ts         user interface (DOM)
tests/            one test file per core function
```

Data structures, algorithms, complexity and clean code principles are described in [DESIGN.md](./DESIGN.md).
