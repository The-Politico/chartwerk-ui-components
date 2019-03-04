import * as d3 from 'd3-format';

const isPositiveNumber = (number) => {
  if (typeof number !== 'number') return false;
  if (parseFloat(number) < 0) return false;
  return true;
};

const isString = (string) => typeof string === 'string';

export default class Transformer {
  constructor({
    operation,
    multiplier,
    rounding,
    precision,
    prefix,
    suffix,
  } = {}) {
    this.multiply = 'multiply';
    this.divide = 'divide';
    this.fixed = 'fixed point';
    this.digits = 'significant digits';
    // Defaults
    this.operation = operation === this.multiply ? this.multiply : this.divide;
    this.multiplier = isPositiveNumber(multiplier) ? parseFloat(multiplier) : null;
    this.rounding = rounding === this.fixed ? this.fixed : this.digits;
    this.precision = isPositiveNumber(precision) ? parseInt(precision) : null;
    this.prefix = isString(prefix) ? prefix : '';
    this.suffix = isString(suffix) ? suffix : '';
  }

  transform(d) {
    try {
      d = parseFloat(d);
    } catch (e) {
      return d;
    }

    const precisionFormat = this.rounding === this.fixed ? 'f' : 'r';
    const format = this.precision !== null && this.precision >= 0 ?
      d3.format(`,.${this.precision}${precisionFormat}`) : d3.format(',');

    if (this.operation === this.multiply && this.multiplier) d *= this.multiplier;
    if (this.operation === this.divide && this.multiplier) d *= (1 / this.multiplier);

    return `${this.prefix}${format(d)}${this.suffix}`;
  }
}
