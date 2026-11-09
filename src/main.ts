import { generateSecret } from './logic/secret.js';

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';
document.body.append(title);

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
document.body.append(lengthLabel);

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
document.body.append(baseLabel);

const startButton = document.createElement('button');
startButton.textContent = 'Start';
document.body.append(startButton);
startButton.addEventListener('click', () => {
  const length = Number(lengthSelect.value);
  const base = Number(baseSelect.value);
  const secret = generateSecret(length, base);
  lengthSelect.disabled = true;
  baseSelect.disabled = true;
  startButton.disabled = true;
  const gameSection = document.createElement('div');
  const guessInput = document.createElement('input');
  const checkButton = document.createElement('button');
  checkButton.textContent = 'Check';
  gameSection.append(guessInput, checkButton);
  document.body.append(gameSection);
  console.log(secret);
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
