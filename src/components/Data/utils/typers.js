import { EMAIL } from './regexes';
import { parseNumber, parseDate, parseString } from './parsers';

/**
 * Guesses the datatype of a string value.
 *
 * Mostly d3's dsv autoType, but with additional date parsing and a few more
 * explicit checks.
 *
 * NOTE: this sequence is biased to prefer typing as a number, so dates
 * like YYYY are parsed as numbers.
 */
export const autoTypeString = (string) => {
  const value = parseString(string);
  let number;
  let date;
  if (!value) return null;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  if (value === 'NaN') return NaN;
  if (value === 'null') return null;
  if (EMAIL.test(value)) return value;
  if (!isNaN(number = +value)) return number;
  if ((date = parseDate(value)) instanceof Date) return date;
  if (!isNaN(number = parseNumber(value))) return number;
  return value;
};

export const autoTyper = (object) => {
  for (const key in object) {
    object[key] = autoTypeString(object[key]);
  }
  return object;
};

export const stringTyper = (object) => {
  for (const key in object) {
    object[key] = object[key].trim();
  }
  return object;
};
