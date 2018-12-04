const api = require('express').Router();
const albums = require('./albums');
const auth = require('./auth');
const media = require('./media');
const tags = require('./tags');
const users = require('./users');

api.get('/', (req, res)=>{
    res.status(200).json({ message: "Connected!" });
});

api.use('/albums', albums);
api.use('/a', albums);

api.use('/auth', auth);

api.use('/media', media);
api.use('/m', media);

api.use('/tags', tags);
api.use('/t', tags);

api.use('/users', users);
api.use('/u', users);

module.exports = api;