const media = require('express').Router();
const all = require('./all');
const single = require('./single');

media.get('/', all);    //handles limits as well
media.get('/:id', single);

module.exports = media;