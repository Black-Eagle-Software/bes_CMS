const tags = require('express').Router({ mergeParams: true });
const all = require('./all');
const update = require('./update');

tags.get('/', all);

tags.put('/', update);

module.exports = tags;