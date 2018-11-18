const media = require('express').Router({ mergeParams: true });
const all = require('./all');

media.get('/', all);

module.exports = media;