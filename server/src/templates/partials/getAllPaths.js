/* eslint-disable no-console */
const { getPathToFeatures } = require('@honeyscience/product-har-analyzer');
const fs = require('fs');
// const loafers = require('../../test/target.har.loafers.json');

function getAllPaths(evalFields, har, outputPath) {
  const pathsAll = getPathToFeatures(evalFields, har);
  fs.writeFile(outputPath, JSON.stringify(pathsAll, null, 2), 'utf-8', (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log('The file was saved!');
  });
  return pathsAll;
}
// getAllPaths({
//   brand: 'A New Day',
//   title: 'Loafers',
// }, loafers, '../../output/testOutput.json');
exports.getAllPaths = getAllPaths;
