const albums = require('express').Router();
const all = require('./all');
const range = require('./range');
const single = require('./single');

const media = require('./media');

albums.get('/', all);    //handles limits as well
albums.get('/:from-:to', range);
albums.get('/:id', single);

albums.use('/:id/media', media);
albums.use('/:id/m', media);

module.exports = albums;