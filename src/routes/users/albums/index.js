const albums = require('express').Router({ mergeParams: true });
const all = require('./all');

albums.get('/', all);

module.exports = albums;