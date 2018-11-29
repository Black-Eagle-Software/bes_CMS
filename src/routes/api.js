const api = require('express').Router();
const albums = require('./albums');
const login = require('./login');
const media = require('./media');
const tags = require('./tags');
const users = require('./users');

api.get('/', (req, res)=>{
    res.status(200).json({ message: "Connected!" });
});

api.get('/credentials/check', (req, res)=>{
    console.log(req.isAuthenticated());
    req.isAuthenticated() ? res.status(200).send() : res.status(403).send();
});

api.use('/albums', albums);
api.use('/a', albums);

api.use('/login', login);

api.use('/media', media);
api.use('/m', media);

api.use('/tags', tags);
api.use('/t', tags);

api.use('/users', users);
api.use('/u', users);

module.exports = api;