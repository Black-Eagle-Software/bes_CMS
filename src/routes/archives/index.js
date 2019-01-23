const archives = require('express').Router();

const zip_get = require('./zip_get');
const zip_post = require('./zip_post');

archives.get('/zip/:file', zip_get);
archives.post('/zip', zip_post);

module.exports = archives;