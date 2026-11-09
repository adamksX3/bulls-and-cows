import { evaluateGuess } from './logic/evaluation.js';
import { generateSecret } from './logic/secret.js';
import { createDigitValidator, isValidGuess } from './logic/validation.js';
import { addToHistory, HistoryEntry, isWin } from './logic/game.js';
import { addToLeaderboard, getLeaderboardKey } from './logic/leaderboard.js';
import type { LeaderboardEntry } from './logic/leaderboard.js';
import { loadLeaderboard, saveLeaderboard } from './storage.js';

const LEADERBOARD_LIMIT = 5;

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';
document.body.append(title);

const settingsSection = document.createElement('div');
settingsSection.classList.add('settings');
document.body.append(settingsSection);

const lengthSelect = document.createElement('select');
const lengths = [2, 3, 4, 5, 6];
lengths.forEach((length) => {
  const option = document.createElement('option');
  option.value = String(length);
  option.textContent = String(length);
  lengthSelect.append(option);
});

const lengthLabel = document.createElement('label');
lengthLabel.textContent = 'Length ';
lengthLabel.append(lengthSelect);
settingsSection.append(lengthLabel);

const baseSelect = document.createElement('select');
const bases = [
  { label: 'bin', base: 2 },
  { label: 'oct', base: 8 },
  { label: 'dec', base: 10 },
  { label: 'hex', base: 16 },
];
bases.forEach((system) => {
  const option = document.createElement('option');
  option.value = String(system.base);
  option.textContent = system.label;
  baseSelect.append(option);
});
baseSelect.value = '10';

const baseLabel = document.createElement('label');
baseLabel.textContent = 'Base ';
baseLabel.append(baseSelect);
settingsSection.append(baseLabel);

const startButton = document.createElement('button');
startButton.textContent = 'Start';
settingsSection.append(startButton);

startButton.addEventListener('click', () => {
  const length = Number(lengthSelect.value);
  const base = Number(baseSelect.value);
  const secret = generateSecret(length, base);

  lengthSelect.disabled = true;
  baseSelect.disabled = true;
  startButton.disabled = true;

  const controlsSection = document.createElement('div');
  controlsSection.classList.add('controls');

  const gameSection = document.createElement('div');
  gameSection.classList.add('house');

  const guessInput = document.createElement('input');
  const isValidDigit = createDigitValidator(base);
  guessInput.maxLength = length;
  guessInput.addEventListener('input', () => {
    guessInput.value = guessInput.value.split('').filter(isValidDigit).join('');
  });

  let history: HistoryEntry[] = [];
  const startTime = Date.now();
  const historyList = document.createElement('ul');

  const newGameButton = document.createElement('button');
  newGameButton.textContent = 'New game';
  newGameButton.addEventListener('click', () => {
    controlsSection.remove();
    gameSection.remove();
    lengthSelect.disabled = false;
    baseSelect.disabled = false;
    startButton.disabled = false;
  });

  const checkButton = document.createElement('button');
  checkButton.textContent = 'Check';
  checkButton.addEventListener('click', () => {
    const guess = guessInput.value.toLowerCase();
    if (!isValidGuess(guess, length, base)) return;
    const result = evaluateGuess(secret, guess);
    history = addToHistory(history, { guess, result });

    historyList.replaceChildren();
    history.forEach((entry) => {
      const li = document.createElement('li');
      li.textContent = `${entry.guess} - ${entry.result.bulls}B ${entry.result.cows}C`;
      historyList.append(li);
    });

    if (!isWin(result, length)) return;
    const time = Math.round((Date.now() - startTime) / 1000);
    const attempts = history.length;
    guessInput.disabled = true;
    checkButton.disabled = true;
    const winMessage = document.createElement('p');
    winMessage.textContent = `You won! Attempts: ${attempts}, time: ${time}s`;
    gameSection.append(winMessage);

    const key = getLeaderboardKey(length, base);
    const entry: LeaderboardEntry = {
      attempts,
      time,
      date: new Date().toLocaleDateString(),
      length,
      base,
    };
    const board = addToLeaderboard(loadLeaderboard(key), entry, LEADERBOARD_LIMIT);
    saveLeaderboard(key, board);

    const leaderboardList = document.createElement('ol');
    board.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.attempts} attempts, ${item.time}s, ${item.date}`;
      leaderboardList.append(li);
    });
    gameSection.append(leaderboardList);
  });

  controlsSection.append(guessInput, checkButton, newGameButton);
  gameSection.append(historyList);
  document.body.append(controlsSection, gameSection);
});

baseSelect.addEventListener('change', () => {
  const base = Number(baseSelect.value);
  Array.from(lengthSelect.options).forEach((option) => {
    option.disabled = Number(option.value) > base;
  });
  if (Number(lengthSelect.value) > base) {
    lengthSelect.value = '2';
  }
});
