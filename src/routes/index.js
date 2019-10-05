const routes = require('express').Router();
const api = require('./api');
const app = require('./app');

routes.use('/api', api);
routes.use('/', app);

module.exports = routes;