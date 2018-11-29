const users = require('express').Router();
const all = require('./all');
const single = require('./single');

const albums = require('./albums');
const media = require('./media');
const tags = require('./tags');

users.get('/', all);
users.get('/:id', single);

users.use('/:id/albums', albums);
users.use('/:id/a', albums);
users.use('/:id/media', media);
users.use('/:id/m', media);
users.use('/:id/tags', tags);
users.use('/:id/t', tags);

module.exports = users;