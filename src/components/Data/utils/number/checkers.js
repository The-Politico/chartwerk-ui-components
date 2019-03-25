
export const isPositiveNumber = (number) => {
  if (typeof number !== 'number') return false;
  if (parseFloat(number) < 0) return false;
  return true;
};

export const isString = (string) => typeof string === 'string';
