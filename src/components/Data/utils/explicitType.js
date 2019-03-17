import { parseByType, parseType } from './parsers';

/**
 * Retypes a column of data in a collection.
 * @param  {Array} typedCollection  The collection with the column whose type
 *                                   you want to change.
 * @param  {Array} stringCollection The same data in a collection where all
 *                                   data is typed a string.
 * @param  {String} column           The column you want to re-type
 * @param  {String} type             The type to re-type the column
 * @return {Array}                  The re-typed collection.
 */
const explicitlyTypeCollectionByColumn = (typedCollection, stringCollection, column, type) => {
  stringCollection.forEach((obj, i) => {
    if (parseType(typedCollection[i][column]) !== type) {
      typedCollection[i][column] = parseByType(obj[column], type);
    }
  });
  return typedCollection;
};

export default explicitlyTypeCollectionByColumn;
