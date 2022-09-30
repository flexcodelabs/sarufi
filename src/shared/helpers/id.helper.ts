const sample = (id = [], fn = Math.random): string | undefined => {
  if (id.length === 0) return;
  return id[Math.round(fn() * (id.length - 1))];
};

const geratedId = (limit = 13, fn = Math.random): string => {
  const allowedLetters: any = [
    'abcdefghijklmnopqrstuvwxyz',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ].join('');
  const allowedCharacters: any = ['0123456789', allowedLetters].join('');

  const generatedId = [sample(allowedLetters, fn)];

  for (let i = 0; i < limit - 1; i++) {
    generatedId.push(sample(allowedCharacters, fn));
  }

  return generatedId.join('');
};

export const id = geratedId();
