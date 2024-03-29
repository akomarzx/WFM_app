/* eslint-disable require-jsdoc */
const services = {};
const normalizedPath = require('path').join(__dirname, '/');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

function processFileName(file) {
  const filename = removeExtension(file);
  return capitalizeFirstLetter(filename);
}

require('fs').readdirSync(normalizedPath).forEach(function(file) {
  if (file !== 'index.js' &&
        file.indexOf('.') !== 0 && file.slice(-3) === '.js' ) {
    const service = require(normalizedPath + file);
    const serviceName = processFileName(file);
    services[serviceName] = service;
  }
});
module.exports = services;
