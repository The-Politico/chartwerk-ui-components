/**
 * A helper to parse dates back from their stringified representation in JSON.
 * Used to transform the data prop that seeds state when first initializing
 * the Data component.
 * @param {Object} data The props that seeds Data state.
 */
const parseDates = (dataState) => {
  const { columns } = dataState;
  const dateColumns = Object.keys(columns).filter(c => columns[c].type === 'date');
  dataState.data.forEach(d => {
    dateColumns.forEach(c => { d[c].parsed = new Date(d[c].parsed); });
  });
  return dataState;
};

export default parseDates;
