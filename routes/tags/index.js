const tags = require('express').Router();
const all = require('./all');
const single = require('./single');

tags.get('/', all);
tags.get('/:id', single);

module.exports = tags;