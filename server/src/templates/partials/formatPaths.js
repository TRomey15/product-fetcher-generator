/* eslint-disable no-console */
// const allPaths = require('../../output/testOutput.json');

const formatPaths = (field, paths) => {
  const result = [];
  (paths[field] || []).forEach((e) => {
    (e.jsonPath || []).forEach((i) => {
      (i.path || []).forEach((y) => { // when joining paths we need to convert ints to bracket notation...
        const numConvert = (y || []).map(z => (typeof (z) === 'number' ? `[${z}]` : z));
        if (numConvert) { result.push(numConvert.join('.').replace(/\.\[/g, '[')); }
      });
    });
  });
  console.log(result);
  return result;
};

// console.log(formatPaths('brand', allPaths));
exports.formatPaths = formatPaths;
