'use strict';

var fs = require('fs');
var path = require('path');

var rHandlebarsFile = /(.*)(\.(html|handlebars|hbs))$/;

module.exports = fs.readdirSync(__dirname).reduce(function(acc, filename) {
  var parts = filename.match(rHandlebarsFile);

  if (parts) {
    acc[parts[1]] = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
  }

  return acc;
}, {});
