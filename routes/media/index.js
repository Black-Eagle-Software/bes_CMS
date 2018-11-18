const media = require('express').Router();
const all = require('./all');
const range = require('./range');
const single = require('./single');

media.get('/', all);    //handles limits as well
media.get('/:from-:to', range);
media.get('/:id', single);

module.exports = media;