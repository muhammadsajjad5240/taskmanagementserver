/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
export const pick = (object: any, keys: any) => {
  return keys.reduce((obj, key) => {
    if (
      object &&
      object[key] !== '' &&
      object[key] !== undefined &&
      object[key] !== null &&
      Object.prototype.hasOwnProperty.call(object, key)
    ) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
