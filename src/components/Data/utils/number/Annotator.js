import * as d3 from 'd3-format';

import { isPositiveNumber, isString } from './checkers';

export const FIXED = 'fixed point';
export const DIGITS = 'significant digits';

export default class Annotator {
  constructor({ rounding, precision, prefix, suffix } = {}) {
    this.rounding = rounding === FIXED ? FIXED : DIGITS;
    this.precision = isPositiveNumber(precision) ? parseInt(precision) : null;
    this.prefix = isString(prefix) ? prefix : '';
    this.suffix = isString(suffix) ? suffix : '';
  }

  fixed = FIXED
  digits = DIGITS

  get formatString() {
    const precisionFormat = this.rounding === FIXED ? 'f' : 'r';
    return this.precision !== null && this.precision >= 0 ?
      `,.${this.precision}${precisionFormat}` : ',';
  }

  get format() {
    return d3.format(this.formatString);
  }

  annotate(d) {
    try { d = parseFloat(d); } catch (e) { return d; }

    return `${this.prefix}${this.format(d)}${this.suffix}`;
  }
}
