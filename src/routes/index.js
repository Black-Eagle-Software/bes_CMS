const routes = require('express').Router();
const api = require('./api');
const app = require('./app');

/*const albums = require('./albums');
const login = require('./login');
const media = require('./media');
const tags = require('./tags');
const users = require('./users');

routes.get('/api', (req, res)=>{
    res.status(200).json({ message: "Connected!" });
});

routes.get('/credentials/check', (req, res)=>{
    console.log(req.isAuthenticated());
    req.isAuthenticated() ? res.status(200).send() : res.status(403).send();
});*/

routes.get('/home', (req, res)=>{
    console.log(`Can see user home: ${req.isAuthenticated()}`);
    if(req.isAuthenticated()){
        res.status(200);
    }else{
        res.redirect('/');
    }
});

/*routes.use('/api/albums', albums);
routes.use('/api/a', albums);

routes.use('/api/login', login);

routes.use('/api/media', media);
routes.use('/api/m', media);

routes.use('/api/tags', tags);
routes.use('/api/t', tags);

routes.use('/api/users', users);
routes.use('/api/u', users);*/

routes.use('/api', api);
routes.use('/', app);

module.exports = routes;