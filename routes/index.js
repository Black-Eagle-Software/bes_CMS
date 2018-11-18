const routes = require('express').Router();
const tags = require('./tags');
const users = require('./users');

routes.get('/api', (req, res)=>{
    res.status(200).json({ message: "Connected!" });
});

routes.use('/api/tags', tags);
routes.use('/api/t', tags);

routes.use('/api/users', users);
routes.use('/api/u', users);

module.exports = routes;