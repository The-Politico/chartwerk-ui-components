import * as d3 from 'd3-dsv';
import { autoTyper, stringTyper } from './typers';
import { PSV, TSV, CSV, NEWLINE } from './regexes';

function parsePSV(data, typer) {
  const headerRow = data.split(NEWLINE)[0];

  if (!PSV.test(headerRow)) return null;

  const parsed = d3.dsvFormat('|').parse(data, typer);
  parsed.dataType = 'psv';
  return parsed;
}

function parseTSV(data, typer) {
  const headerRow = data.split(NEWLINE)[0];

  if (!TSV.test(headerRow)) return null;

  const parsed = d3.tsvParse(data, typer);
  parsed.dataType = 'tsv';
  return parsed;
}

function parseCSV(data, typer) {
  const headerRow = data.split(NEWLINE)[0];

  if (!CSV.test(headerRow)) return null;

  const parsed = d3.csvParse(data, typer);
  parsed.dataType = 'csv';
  return parsed;
}

export const parseToStrings = (dataString) => (
  parsePSV(dataString, stringTyper) ||
  parseTSV(dataString, stringTyper) ||
  parseCSV(dataString, stringTyper)
);

export const parseToTypes = (dataString) => (
  parsePSV(dataString, autoTyper) ||
  parseTSV(dataString, autoTyper) ||
  parseCSV(dataString, autoTyper)
);
