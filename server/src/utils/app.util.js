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
 * @param {string | number} value
 * @param {any[]} array
 * @return {any[]}
 * */
function excludeValueFromArray(value, array) {
  const arrayCopy = [...array];
  const indexOfValue = arrayCopy.indexOf(value);
  arrayCopy.splice(indexOfValue, 1);
  return arrayCopy;
}


module.exports = {
  asyncErrorHandle,
  pickFieldsFromObject,
  excludeValueFromArray,
};
