const tags = require('express').Router({ mergeParams: true });
const all = require('./all');

tags.get('/', all);

module.exports = tags;