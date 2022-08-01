/* eslint-disable require-jsdoc */
const middlewares = {};
const normalizedPath = require('path').join(__dirname, '/');

function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

function processFileName(file) {
  const filename = removeExtension(file);
  return filename;
}

require('fs').readdirSync(normalizedPath).forEach(function(file) {
  if (file !== 'index.js' &&
        file.indexOf('.') !== 0 && file.slice(-3) === '.js' ) {
    const module = require(normalizedPath + file);
    const moduleName = processFileName(file);
    middlewares[moduleName] = module;
  }
});

module.exports = middlewares;
