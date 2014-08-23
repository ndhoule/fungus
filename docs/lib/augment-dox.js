'use strict';

/**
 * HERE BE UNDERAGED DRAGONS
 *
 * Some gross stuff goes on here to format a dox object into something usable in
 * our template.
 *
 * TODO: Clean this file up a bit
 */

var _ = require('lodash');
var marked = require('marked');

var renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  return '<h' + level + '>' + text + '</h' + level + '>\n';
};
renderer.paragraph = function (text) {
  return '<p>' + text + '</p>';
};
renderer.br = function () {
  return '<br />';
};

var inlineRenderer = new marked.Renderer();

inlineRenderer.paragraph = function(text) {
  return text;
};

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

var trimWhitespace = function trimWhitespace(string) {
  return string.replace(/^\s|\s$/, '');
};

var toCodeBlock = function toCodeBlock(string, lang) {
  lang = lang || '';

  return '```' + lang + '\n' + trimWhitespace(string) + '\n' + '```';
};

var addNameToDoxObject = function addNameToDoxObject(doc) {
  var name = _.find(doc.tags, function(tag) {
    return tag.type === 'name';
  });

  doc.name = name && name.string;

  return doc;
};

var addCategoryToDoxObject = function addCategoryToDoxObject(doc) {
  var category = _.find(doc.tags, function(tag) {
    return tag.type === 'category';
  });

  doc.category = category && category.string;

  return doc;
};

var addParamsToDoxObject = function addParamsToDoxObject(doc) {
  doc.params = _.chain(doc.tags)
  .filter(function(tag) {
    return tag.type === 'param';
  })
  .map(_.partialRight(_.omit, 'type'))
  .forEach(function(param) {
    param.description = marked(param.description, { renderer: inlineRenderer });
  })
  .value();

  return doc;
};

var addReturnsToDoxObject = function addReturnsToDoxObject(doc) {
  var returns = _.find(doc.tags, function(tag) {
    return tag.type === 'return';
  });

  if (returns) {
    returns = _.omit(returns, 'type');
    returns.description = marked(returns.description, { renderer: inlineRenderer });
  }

  doc.returns = returns;

  return doc;
};

var addExampleToDoxObject = function addExampleToDoxObject(doc) {
  var example = _.find(doc.tags, function(tag) {
    return tag.type === 'example';
  });

  if (example && example.string) {
    example = marked(toCodeBlock(example.string));
  }

  doc.example = example;

  return doc;
};

var enhanceCodeBlock = function enhanceCodeBlock(doc) {
  if (doc.code) {
    doc.code = marked(toCodeBlock(doc.code));
  }

  return doc;
};

module.exports = (function() {
  var augmentor = _.compose(
    addNameToDoxObject,
    addCategoryToDoxObject,
    addParamsToDoxObject,
    addReturnsToDoxObject,
    addExampleToDoxObject,
    enhanceCodeBlock
  );

  return function augmentDoxObject(doc) {
    return augmentor(doc);
  };
}());
