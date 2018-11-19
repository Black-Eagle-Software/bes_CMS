const media = require('express').Router({ mergeParams: true });
const all = require('./all');
const range = require('./range');

media.get('/', all);
media.get('/:from-:to', range);

module.exports = media;
