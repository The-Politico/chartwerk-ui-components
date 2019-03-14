import * as d3 from 'd3-dsv';
import autoTyper from './autoTyper';
import { PSV, TSV, CSV, NEWLINE } from './regexes';

function isPSV(data, typer) {
  let parsed;
  const row = data.split(NEWLINE)[0];
  if (PSV.test(row)) {
    parsed = d3.dsvFormat('|').parse(data, typer);
    parsed.dataType = 'psv';
    return parsed;
  }
  return null;
}

function isTSV(data, typer) {
  let parsed;
  const row = data.split(NEWLINE)[0];
  if (TSV.test(row)) {
    parsed = d3.tsvParse(data, typer);
    parsed.dataType = 'tsv';
    return parsed;
  }
  return null;
}

function isCSV(data, typer) {
  let parsed;
  const row = data.split(NEWLINE)[0];
  if (CSV.test(row)) {
    parsed = d3.csvParse(data, typer);
    parsed.dataType = 'csv';
    return parsed;
  }
  return null;
}

export const parseToStrings = (dataString) => {
  const stringTyper = (object) => {
    for (let key in object) {
      object[key] = object[key].trim();
    }
    return object;
  };

  return (
    isPSV(dataString, stringTyper) ||
    isTSV(dataString, stringTyper) ||
    isCSV(dataString, stringTyper)
  );
};

export const parseToTypes = (dataString) => {
  return (
    isPSV(dataString, autoTyper) ||
    isTSV(dataString, autoTyper) ||
    isCSV(dataString, autoTyper)
  );
};
