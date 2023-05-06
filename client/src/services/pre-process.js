export const preProcessData = (obj) => {
  Object.keys(obj).forEach((item) => {
    if (
      obj[item] === "" ||
      obj[item] === undefined ||
      (Array.isArray(obj[item]) && !obj[item].length)
    ) {
      delete obj[item];
    }
  });
  return obj;
};
