const media = require('express').Router();
const multer = require('multer');
const multerUpload = multer({ dest: '/tmp' });

const all = require('./all');
const deleteMedia = require('./delete');
const post = require('./post');
const range = require('./range');
const single = require('./single');

const tags = require('./tags');

media.delete('/:id', deleteMedia);

media.get('/', all);    //handles limits as well
media.get('/:from-:to', range);
media.get('/:id', single);

media.post('/', multerUpload.any(), post);

media.use('/:id/tags', tags);
media.use('/:id/t', tags);

module.exports = media;