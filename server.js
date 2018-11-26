const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mysql = require('mysql');
const uuid = require('uuid/v4');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var env = process.env;

var port = env.PORT || 8080;    //set our port
//configure mysql connection to database
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
var connection = mysql.createConnection(config);    //single connection object for all dbase interactions

//configure passport to use our local strategy
passport.use(new localStrategy(
    { 
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done)=>{        
        connection.query("SELECT * FROM users WHERE email=?", email, (error, results, fields)=>{
            //connection.end();
            if(error) return done(error);            
            if(results.length === 0){
                return done(null, false, req.flash('loginMessage', 'No user found'));
            }else{
                //email exists in the database, so now check the password
                let user = new User(JSON.stringify(results));
                let allowed = user.verifyPassword(password);
                if(!allowed){
                    return done(null, false, req.flash('loginMessage', 'Wrong or invalid password specified'));
                } else {            
                    return done(null, user);            
                }
            }
        });
    }
));
passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    connection.query("SELECT * FROM users WHERE id=?", id, (error, results, fields)=>{
        //connection.end();
        if(error){
            return done(null, error);
        }
        done(null, results[0]);
    });
});

//configure our session-store in the database
var mysqlSessionStore = require('express-mysql-session')(session);
var sessionConnection = connection;
var sessionStore = new mysqlSessionStore({clearExpired: true, expiration: 3600000}, sessionConnection);

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
app.use(passport.initialize());
app.use(passport.session());

//configure the database connection
app.use((req, res, next)=>{
    res.locals.connection = connection;
    //res.locals.connection.connect();
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