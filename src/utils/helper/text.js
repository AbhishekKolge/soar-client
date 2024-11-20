import _ from "lodash";

export const omitEmptyKeys = (obj, excludes = []) =>
  _.omitBy(obj, (value, key) => {
    return (
      (!excludes.includes(key) &&
        (value === "" || value === undefined || value === null)) ||
      (_.isArray(value) && value.length === 0) ||
      (_.isObject(value) && _.isEmpty(value))
    );
  });

export const omitNullishKeys = (obj, excludes = []) =>
  _.omitBy(obj, (value, key) => {
    return !excludes.includes(key) && !value;
  });

export const updateEmptyToNull = (obj) => {
  if (_.isArray(obj)) {
    return obj.map((item) => updateEmptyToNull(item));
  }

  if (_.isObject(obj) && !_.isArray(obj)) {
    return _.mapValues(obj, (value) => {
      if (_.isObject(value) || _.isArray(value)) {
        return updateEmptyToNull(value);
      }
      return value === "" || value === undefined ? null : value;
    });
  }

  return obj;
};

export const pickExactObjKeys = (obj, pickObj) =>
  _.pick(pickObj, Object.keys(obj));

export const getInitials = (str) => {
  const words = str.split(" ");
  const firstTwoLetters = words.map((word) => word.charAt(0)).slice(0, 2);
  const result = firstTwoLetters.join("");

  return result;
};

export const createQueryString = (name, value, searchParams) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
};

export const stringBool = {
  true: true,
  false: false,
};

export const slugToName = (slug) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};