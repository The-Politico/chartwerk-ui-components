import * as d3 from 'd3-format';

import { isPositiveNumber, isString } from './checkers';

const FIXED = 'fixed point';
const DIGITS = 'significant digits';

export default class Annotator {
  constructor({ rounding, precision, prefix, suffix } = {}) {
    this.rounding = rounding === FIXED ? FIXED : DIGITS;
    this.precision = isPositiveNumber(precision) ? parseInt(precision) : null;
    this.prefix = isString(prefix) ? prefix : '';
    this.suffix = isString(suffix) ? suffix : '';
  }

  fixed = FIXED
  digits = DIGITS

  get format() {
    const precisionFormat = this.rounding === FIXED ? 'f' : 'r';

    if (this.precision !== null && this.precision >= 0) {
      return d3.format(`,.${this.precision}${precisionFormat}`);
    } else {
      return d3.format(',');
    }
  }

  annotate(d) {
    try { d = parseFloat(d); } catch (e) { return d; }

    return `${this.prefix}${this.format(d)}${this.suffix}`;
  }
}
