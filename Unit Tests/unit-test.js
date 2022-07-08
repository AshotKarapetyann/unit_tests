const axios = require("axios");

const sum = (a, b) => a + b;

const nativeNull = () => null;

const compact = (array) => array.filter((val) => !!val);

const groupBy = (array, prop) => {
  return array.reduce((acc, i) => {
    const key = typeof prop === "function" ? prop(i) : i[prop];
    if (!acc[key]) {
      acc[key] = [];
    }
    console.log(acc);
    acc[key].push(i);
    return acc;
  }, {});
};

const map = (array, callback) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
};

module.exports = { sum, nativeNull, compact, groupBy, map };
