import moment from 'moment';

import flow from 'lodash/flow';
import countBy from 'lodash/countBy';
import entries from 'lodash/entries';
import partialRight from 'lodash/partialRight';
import maxBy from 'lodash/maxBy';
import head from 'lodash/head';

import { DATE } from './regexes';

import dateFormats from '../constants/dateFormats';

export const parseString = string => string.trim();

export const parseDate = (string) => {
  const value = string.trim();
  let parsed;
  if (DATE.test(value)) return new Date(value);
  if ((parsed = moment(value, dateFormats, true)).isValid()) return parsed.utc().toDate();
  return null;
};

// Modified from https://github.com/ExodusMovement/parse-num
export const parseNumber = (value) => {
  // TODO make configurable
  const decimalSeparator = '.';

  if (value == null) return NaN;

  // Return the value as-is if it's already a number:
  if (typeof value === 'number') return value;
  if (typeof value === 'string') value = value.trim();

  // build regex to strip out everything except digits, decimal point and minus sign:
  const regex = new RegExp(`[^0-9-${decimalSeparator}]`, ['g']);
  const unformatted = value
    .toString()
    .replace(regex, '') // strip out any cruft
    .replace(decimalSeparator, '.'); // make sure decimal point is standard

  return parseFloat(unformatted);
};

export const parseType = (value) => {
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  if (value instanceof Date) return 'date';
};

export const parseByType = (value, type) => {
  switch (type) {
    case 'date':
      return parseDate(value);
    case 'number':
      return parseNumber(value);
    default:
      return parseString(value);
  }
};

/**
 * Determines the most frequent data type in an autotyped array.
 *
 * Returns the majority type and a boolean that indicates whether
 * all data were of that type. We use that boolean to determine
 * if we need to re-parse the column data.
 */
export const parseMajorityType = (dataArray) => {
  const typeArray = dataArray.map(d => parseType(d));
  // 👇 fuck if I know how this works...  ¯\_(ツ)_/¯
  const majorityType = flow(
    countBy, entries, partialRight(maxBy, '[1]'), head
  )(typeArray);
  return {
    majorityType,
    unanimous: countBy(typeArray, d => d)[majorityType] === typeArray.length,
  };
};
