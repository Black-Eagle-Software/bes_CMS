const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mysql = require('mysql');
const uuid = require('uuid/v4');
const dBase_config = require('./dbase/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;    //set our port

app.use((req, res, next)=>{
    let config = new dBase_config();
    res.locals.connection = mysql.createConnection(config.getConfig());
    res.locals.connection.connect();
    next();
});

app.use((req, res, next)=>{
    req.uuid = uuid();
    let host = req.get('x-forwarded-host') || '';
    let forwarded = req.get('x-forwarded-for') || '';
    //should log sesion ID when that gets implemented

    //console.log(req.headers);
    console.log(`${new Date().toISOString()} [${req.uuid}, ${host}, ${forwarded}] < ${req.method} ${req.originalUrl}`);
    res.on('finish', ()=>{
        console.log(`${new Date().toISOString()} [${req.uuid}, ${host}, ${forwarded}] > ${res.statusCode} ${res.statusMessage} ${res.get('Content-Length') || 0}b sent`);
    });
    next();
});

app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Server now running on port: ${port}`);
});