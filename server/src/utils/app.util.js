const asyncErrorHandle = (callback) => {
  return (res, req, next) => {
    return callback(res, req, next).catch(next);
  };
};

/**
 * Pick fields from object
 * @param {object} obj
 * @param {object} obj.sourceObject
 * @param {string[]} obj.fieldsToPick
 * @return {object}
 * */
function pickFieldsFromObject({ sourceObject, fieldsToPick }) {
  const resultObject = {};
  fieldsToPick.forEach((field) => {
    const valueToSave = sourceObject[field];
    if (valueToSave === undefined) {
      throw new Error(`Applied fieldsToPick[${fieldsToPick}] includes fields which doesn't exist in sourceObject keys`);
    }
    resultObject[field] = valueToSave;
  });
  return resultObject;
}


/**
 * Exclude value from array
 * @param {string | number | boolean} value
 * @param {any[]} array
 * @param {object} errorHandling
 * @param {boolean} errorHandling.shouldThrowError
 * @param {string} errorHandling.errorMessage
 * @param {Object} errorHandling.ErrorObj
 * @return {any[]}
 * */
function excludeValueFromArray(value, array, {
  shouldThrowError = true,
  ErrorObj = Error,
  errorMessage = `Array [${array}] not includes such a value (${value})`
}) {
  const arrayCopy = [...array];
  const indexOfValue = arrayCopy.indexOf(value);

  if (indexOfValue !== -1) {
    return arrayCopy.splice(indexOfValue, 1);
  } else if (shouldThrowError) {
    throw new ErrorObj(errorMessage)
  }

  return arrayCopy
}

/**
 * Slice elements of array
 * @param {object} obj
 * @param {any[]} obj.array
 * @param {number} obj.limit
 * @param {number} obj.offset
 * @return {any[]}
 * */
function sliceElementsOfArray({ array = [], limit, offset }) {
  const sliceStart = offset;
  const sliceEnd = limit + offset;
  return sliceEnd ?
    array.slice(sliceStart, sliceEnd) :
    array.slice(sliceStart);
}


module.exports = {
  asyncErrorHandle,
  pickFieldsFromObject,
  excludeValueFromArray,
  sliceElementsOfArray,
};
