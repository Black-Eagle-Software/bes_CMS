const app = require('express').Router();

app.get('/', (req, res)=>{
    var html = "<h1>I hate this at times.</h1>";
    res.status(200).send(html);
});

module.exports = app;