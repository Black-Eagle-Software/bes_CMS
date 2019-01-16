const tags = require('express').Router();
const all = require('./all');
const deleteTag = require('./delete');
const post = require('./post');
const range = require('./range');
const single = require('./single');

tags.delete('/:id', deleteTag);

tags.get('/', all); //handles limits as well
tags.get('/:from-:to', range);
tags.get('/:id', single);

tags.post('/', post);

module.exports = tags;