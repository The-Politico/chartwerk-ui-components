import { isPositiveNumber } from './checkers';

const MULTIPLY = 'multiply';
const DIVIDE = 'divide';

export default class Transformer {
  constructor({ operation, multiplier } = {}) {
    this.operation = operation === MULTIPLY ? MULTIPLY : DIVIDE;
    this.multiplier = isPositiveNumber(multiplier) ? parseFloat(multiplier) : null;
  }

  multiply = MULTIPLY
  divide = DIVIDE

  transform(d) {
    try { d = parseFloat(d); } catch (e) { return d; }

    if (!this.multiplier) return d;

    if (this.operation === MULTIPLY) d *= this.multiplier;
    if (this.operation === DIVIDE) d *= (1 / this.multiplier);

    return d;
  }
}
