const prettier = require('prettier');
const { logToConsole } = require('./partials/snippet.js');

exports.generate = function generate() {
  return prettier.format(`function print() { ${logToConsole`Hello World`} }`);
};
