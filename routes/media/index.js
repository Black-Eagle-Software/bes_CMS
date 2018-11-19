const media = require('express').Router();
const all = require('./all');
const range = require('./range');
const single = require('./single');

const tags = require('./tags');

media.get('/', all);    //handles limits as well
media.get('/:from-:to', range);
media.get('/:id', single);

media.use('/:id/tags', tags);
media.use('/:id/t', tags);

module.exports = media;