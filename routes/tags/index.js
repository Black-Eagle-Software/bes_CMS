const tags = require('express').Router();
const all = require('./all');
const single = require('./single');

tags.get('/', all); //handles limits as well
tags.get('/:id', single);

module.exports = tags;