'use strict';

var Handlebars = require('handlebars');
var Promise = require('bluebird');
var _ = require('lodash');
var augmentDoxObject = require('./augment-dox');
var dox = require('dox');
var fs = Promise.promisifyAll(require('fs'));
var glob = Promise.promisify(require('glob'));
var path = require('path');

module.exports = function(options) {
  // Load Handlebars partials
  _.each(require(path.join(options.baseDir, 'docs/partials')), function(partial, name) {
    Handlebars.registerPartial(name, partial);
  });

  // Load Handlebars helpers
  _.each(require(path.join(options.baseDir, 'docs/helpers')), function(helper, name) {
    Handlebars.registerHelper(name, helper);
  });

  glob(path.join(options.srcDir, '**/*.js'))
    .then(function(results) {
      return Promise.all(results.map(function(filename) {
        return fs.readFileAsync(filename, 'utf-8');
      }));
    })
    .then(function(contents) {
      return _.flatten(contents.map(function(js) {
        return dox.parseComments(js);
      }, true));
    })
    .then(function(docs) {

      return _.chain(docs)
        .map(augmentDoxObject)
        // Filter items that have no name or should not be displayed
        .reject(function(doc) {
          return !doc.name || doc.isPrivate || doc.ignore;
        })
        // Organize the documentation by category (e.g. Array, Utility, ...)
        .groupBy(function(doc) {
          return doc.category || 'Uncategorized';
        })
        // Sort each of the categories alphabetically
        .mapValues(_.partialRight(_.sortBy, 'name'))
        .value();
    })
    .then(function(docs) {
      var template = fs.readFileSync(path.join(options.baseDir, 'docs/index.html'), 'utf-8');

      return Handlebars.compile(template)({ categories: docs });
    })
    .then(function(results) {
      process.stdout.write(results + '\n');
    })
    .catch(function(err) {
      throw err;
    });
};
