import * as d3 from 'd3-dsv';
import autoTyper from './autoType';

function isJSON(data) {
  let parsed;
  try {
    parsed = JSON.parse(data);
    parsed.dataType = 'json';
    return parsed;
  } catch (e) {
    return null;
  }
}

function isPSV(data, dateFormats) {
  let parsed;
  const row = data.split(/\r?\n/)[0];
  if (/^\w+\s?\|/.test(row)) {
    parsed = d3.dsvFormat('|').parse(data, autoTyper(dateFormats));
    parsed.dataType = 'psv';
    return parsed;
  }
  return null;
}

function isTSV(data, dateFormats) {
  let parsed;
  const row = data.split(/\r?\n/)[0];
  if (/^\w+\s?\t/.test(row)) {
    parsed = d3.tsvParse(data, autoTyper(dateFormats));
    parsed.dataType = 'tsv';
    return parsed;
  }
  return null;
}

function isCSV(data, dateFormats) {
  let parsed;
  const row = data.split(/\r?\n/)[0];
  if (/^\w+\s?,/.test(row)) {
    parsed = d3.csvParse(data, autoTyper(dateFormats));
    parsed.dataType = 'csv';
    return parsed;
  }
  return null;
}

export default function parse(dataString, dateFormats) {
  return (
    isJSON(dataString) ||
    isPSV(dataString, dateFormats) ||
    isTSV(dataString, dateFormats) ||
    isCSV(dataString, dateFormats)
  );
}
