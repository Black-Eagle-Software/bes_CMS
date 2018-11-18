const tags = require('express').Router();
const all = require('./all');
const range = require('./range');
const single = require('./single');

tags.get('/', all); //handles limits as well
tags.get('/:from-:to', range);
tags.get('/:id', single);

module.exports = tags;