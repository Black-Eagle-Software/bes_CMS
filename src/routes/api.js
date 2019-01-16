const api = require('express').Router();
const albums = require('./albums');
const auth = require('./auth');
const media = require('./media');
const tags = require('./tags');
const users = require('./users');
const search = require('./search');

api.get('/', (req, res)=>{
    res.status(200).json({ message: "Connected!" });
});
api.get('/access_levels', (req, res)=>{
    //retreive access levels from the database
    let queryString = "SELECT * FROM accessLevels";
    res.locals.connection.query(queryString, (error, results, fields)=>{
        if(error){
            res.status(404).send({'message': error.message});
            return;
        }
        res.status(200).send(JSON.stringify(results));
    });
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

api.use('/search', search);
api.use('/s', search);

module.exports = api;