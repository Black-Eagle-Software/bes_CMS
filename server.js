const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mysql = require('mysql');
const uuid = require('uuid/v4');
const session = require('express-session');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var env = process.env;

var port = env.PORT || 8080;    //set our port

//configure our session-store in the database
var mysqlSessionStore = require('express-mysql-session')(session);
let options = env.IS_PRODUCTION === "true" ? {
    host: env.DBASE_HOST_PROD,
    user: env.DBASE_USER_PROD,
    password: env.DBASE_PASSWORD_PROD,
    database: env.DBASE_DATABASE_PROD
} : {
    host: env.DBASE_HOST_DEV,
    user: env.DBASE_USER_DEV,
    password: env.DBASE_PASSWORD_DEV,
    database: env.DBASE_DATABASE_DEV
};
var sessionConnection = mysql.createConnection(options);
var sessionStore = new mysqlSessionStore({}, sessionConnection);

//add & configure sessions
app.use(session({
    genid:(req)=>{
        //console.log('Inside the session middleware');
        //console.log(req.sessionID);
        return uuid();
    },
    name: 'besCMS.sid',
    store: sessionStore,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//configure the database connection
app.use((req, res, next)=>{
    let config = env.IS_PRODUCTION === "true" ? {   //.env variables are always string
        host: env.DBASE_HOST_PROD,
        user: env.DBASE_USER_PROD,
        password: env.DBASE_PASSWORD_PROD,
        database: env.DBASE_DATABASE_PROD
    } : {
        host: env.DBASE_HOST_DEV,
        user: env.DBASE_USER_DEV,
        password: env.DBASE_PASSWORD_DEV,
        database: env.DBASE_DATABASE_DEV
    };
    res.locals.connection = mysql.createConnection(config);
    res.locals.connection.connect();
    next();
});

app.use((req, res, next)=>{
    //req.uuid = uuid();
    let host = req.get('x-forwarded-host') || '';
    let forwarded = req.get('x-forwarded-for') || '';

    //console.log(req.headers);
    console.log(`${new Date().toISOString()} [${req.sessionID}, ${host}, ${forwarded}] < ${req.method} ${req.originalUrl}`);
    res.on('finish', ()=>{
        console.log(`${new Date().toISOString()} [${req.sessionID}, ${host}, ${forwarded}] > ${res.statusCode} ${res.statusMessage} ${res.get('Content-Length') || 0}b sent`);
    });
    next();
});

app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Server now running on port: ${port}`);
});