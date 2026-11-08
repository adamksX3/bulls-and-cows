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
document.body.append(lengthSelect);

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
document.body.append(baseSelect);
