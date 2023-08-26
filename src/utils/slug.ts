export const createSlug = (value) => {
  if (value) {
    value = value.toString();
    value = value
      .replace(/[^0-9a-zA-Z- ]/gi, '') // remove everything that is not an alphanumeric character, space, or dash
      .replace(/ /gi, '-') // replace all spaces with dashes
      .replace(/-+/gi, '-') // replace multiple consecutive dashes with one dash
      .toLowerCase();
  }
  return value;
};
