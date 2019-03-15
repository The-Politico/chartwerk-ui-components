// Regexes used to type and split string data input by a user

/**
 * Used to split string data input.
 */
export const NEWLINE = /\r?\n/;

/**
 * Test for separated value formats, run on the first line
 * of the string data.
 */
export const PSV = /^[\w_\- ]+\|[\w_\- ]+/;
export const TSV = /^[\w_\- ]+\t[\w_\- ]+/;
export const CSV = /^[\w_\- ]+,[\w_\- ]+/;

/**
 * Test for date formats parseable by JS Date operator
 */
export const DATE = /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/;

/**
 * If it's got an @, we type it a string.
 */
export const EMAIL = /@/;
