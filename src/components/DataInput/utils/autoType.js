import moment from 'moment';

// Modified from https://github.com/ExodusMovement/parse-num
function parseNum(value) {
  if (value == null) return NaN;
  const decimalSep = '.';

  // Return the value as-is if it's already a number:
  if (typeof value === 'number') return value;

  // build regex to strip out everything except digits, decimal point and minus sign:
  const regex = new RegExp('[^0-9-' + decimalSep + ']', ['g']);
  const unformatted = value
    .toString()
    .replace(regex, '') // strip out any cruft
    .replace(decimalSep, '.'); // make sure decimal point is standard

  return parseFloat(unformatted);
}

function parsePercent(value) {
  const decimalSep = '.';
  const regex = new RegExp('[^0-9-%' + decimalSep + ']', ['g']);
  const cleanPercent = value.replace(regex, ''); // clean everything but the percent
  if (!/[0-9]%$/.test(cleanPercent)) return false; // if not a percent
  const cleanNum = parseNum(value); // clean number fully
  if (cleanNum) return cleanNum / 100; // if clean, divide by 100 for percent
  return false;
}

// d3's dsv autoType, but with additional date parsing by moment and a few more checks
export const typeStringValue = (string, dateTypes) => {
  let value = string.trim();
  let number;
  if (!value) return null;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
  if (value === 'NaN') return NaN;
  if (!isNaN(number = +value)) return number;
  if ((number = parsePercent(value))) return number;
  if (/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/.test(value)) return new Date(value);
  if (moment(value, dateTypes, true).isValid()) return moment(value, dateTypes, true).toDate();
  if (!isNaN(number = parseNum(value))) return number;
  return value;
};

export default (dateTypes) => (object) => {
  for (let key in object) {
    object[key] = typeStringValue(object[key], dateTypes);
  }
  return object;
};
