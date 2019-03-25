import zipWith from 'lodash/zipWith';

export const zipDataCollections = (stringData, parsedData) =>
  zipWith(stringData, parsedData, (stringObj, parsedObj) => {
    const datum = {};
    Object.keys(stringObj).forEach(key => {
      datum[key] = {
        raw: stringObj[key],
        parsed: parsedObj[key],
      };
    });
    return datum;
  });

export const unzipDataCollections = (data) => {
  const stringData = data.map(d => {
    const datum = {};
    Object.keys(d).forEach(key => {
      datum[key] = d[key].raw;
    });
    return datum;
  });
  const parsedData = data.map(d => {
    const datum = {};
    Object.keys(d).forEach(key => {
      datum[key] = d[key].parsed;
    });
    return datum;
  });
  return [stringData, parsedData];
};
