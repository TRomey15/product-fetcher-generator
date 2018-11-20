const loafers = require('../../test/target.har.loafers.json');
const { getAllPaths } = require('./getAllPaths');
const { formatPaths } = require('./formatPaths');

const testOutput = require('../../output/testOutput.json');

const fieldsFixed = {
  brand: 'A New Day',
  title: 'Loafers',
};

// TODO: figure out the database / async of this...
getAllPaths(fieldsFixed, loafers, '../../output/testOutput.json');
formatPaths('brand', testOutput);
