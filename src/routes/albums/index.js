const albums = require('express').Router();
const all = require('./all');
const deleteAlbum = require('./delete');
const post = require('./post');
const range = require('./range');
const single = require('./single');
const update = require('./update');

const media = require('./media');

albums.delete('/:id', deleteAlbum);

albums.get('/', all);    //handles limits as well
albums.get('/:from-:to', range);
albums.get('/:id', single);

albums.post('/', post);

albums.put('/:id', update);

albums.use('/:id/media', media);
albums.use('/:id/m', media);

module.exports = albums;