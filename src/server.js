/* 
    A lot of this is taken from here: https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d
    It is incredibly informative and useful.
*/

const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const routes = require('./routes');
const mysql = require('mysql');
const uuid = require('uuid/v4');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const axios = require('axios');
const fs = require('fs');
const { PerformanceObserver, performance } = require('perf_hooks');
const User = require('./models/user');

const path = require('path');
global.__basedir = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var env = process.env;

var port = env.PORT || 8080;    //set our port

//configure mysql connection to database
let config = env.IS_PRODUCTION === "true" ? {   //.env variables are always string
    host: env.DBASE_HOST_PROD,
    user: env.DBASE_USER_PROD,
    password: env.DBASE_PASSWORD_PROD,
    database: env.DBASE_DATABASE_PROD,
    connectionLimit: 100
} : {
    host: env.DBASE_HOST_DEV,
    user: env.DBASE_USER_DEV,
    password: env.DBASE_PASSWORD_DEV,
    database: env.DBASE_DATABASE_DEV,
    connectionLimit: 100
};
var connection = mysql.createPool(config);    //connection pool for all dbase interactions

//configure passport to use our local strategy
passport.use(new localStrategy(
    { 
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done)=>{
        axios.get(`http://localhost:8080/api/users?email=${email}`).then(results=>{
            //email exists in the database, so now check the password
            if(results.data[0] === undefined){
                return done('No user entry found', null);
            }
            results = JSON.stringify(results.data[0]);
            let user = new User(results);
            let challenge = user.verifyPassword(password);
            console.log(challenge);
            if(!challenge.allowed){
                return done(null, false, {message: 'Wrong or invalid password specified'});
            } else {
                console.log(challenge.isDirty);
                if(challenge.isDirty){
                    return done(null, user, {message: 'USER_PASS_UPDATE'});
                }
                axios.get(`http://localhost:8080/api/auth/role?user=${user.id}`).then(results=>{   
                    user.role = results.data.role;
                    return done(null, user);
                });
            }
        }).catch(error => done(error));
    }
));
passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    axios.get(`http://localhost:8080/api/users/${id}`).then(results=>{
        axios.get(`http://localhost:8080/api/auth/role?user=${id}`).then(results2=>{  
            results.data[0].role = results2.data.role;
            results = JSON.stringify(results.data[0]);
            return done(null, results);
        });
    }).catch(error => done(error, false));
});

//configure our session-store in the database
var mysqlSessionStore = require('express-mysql-session')(session);
var sessionConnection = connection;
var sessionStore = new mysqlSessionStore({clearExpired: true, expiration: 3600000}, sessionConnection);

//add & configure sessions
app.use(session({
    genid:(req)=>{
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
    return next();
});

app.use((req, res, next)=>{
    let host = req.get('x-forwarded-host') || '';
    let forwarded = req.get('x-forwarded-for') || '';
    let method = `\x1b[42m\x1b[30m${req.method}\x1b[0m`;

    console.log(`${new Date().toISOString()} [${req.sessionID}, ${host}, ${forwarded}] < ${method} ${req.originalUrl}`);
    res.on('finish', ()=>{
        let color = "";
        switch(res.statusCode){
            case 200: color = "\x1b[32m"; break;
            case 304: color = "\x1b[36m"; break;
            case 403:
            case 404: color = "\x1b[33m"; break;
            default: color = ""; break;
        }
        let status = `${color}${res.statusCode}\x1b[0m`;
        console.log(`${new Date().toISOString()} [${req.sessionID}, ${host}, ${forwarded}] > ${status} ${res.statusMessage} ${res.get('Content-Length') || 0}b sent`);
    });
    return next();
});

//make sure there are no unauthorized attempts at direct media access
app.use('/media', (req, res, next)=>{
    console.log("Requesting item from /media directory");
    console.log(req.isAuthenticated());
    //if this is to the root /media endpoint, let it go 
    //since that's for all public media anyways
    if(req.url === '/'){
        return next();
    }
    //make sure the user can actually access this file
    if(!req.isAuthenticated()){
        res.status(403).send({'message': `User is not authorized to view media item`});
        return;
    }
    let user = JSON.parse(req.user);
    let path = req.url[0] === '/' ? `media${req.url}` : `media/${req.url}`;
    let filePath = path.substring(0, path.lastIndexOf('/'));
    let filename = path.substring(path.lastIndexOf('/') + 1);
    //we need to modify our query terms if we're requesting a thumbnail    
    if(filePath.includes('thumbnails')){
        filePath = filePath.substring(0, filePath.lastIndexOf('/'));    //this should remove /thumbnails from path
        filenameSplit = filename.split('_thumb');                       //this will remove the _thumb suffix from filename
        filename = `${filenameSplit[0]}${filenameSplit[1]}`;            //join our base filename and extension for use in sql query
    }
    let qryString  = `SELECT * FROM media m	
                        LEFT JOIN tagsToMediaMap tmm 
                        ON tmm.media = m.id 
                        LEFT JOIN tagsToAccessLevelMap tam 
                        ON tam.tagId = tmm.tag 
                        WHERE (m.filePath = ? AND m.hashFilename = ?) 
                        AND (m.owner = ? 
                            OR tam.accessLevel = 'Public' 
                            OR m.owner = (SELECT uuf.userId FROM usersToUsersFriendMap uuf 
                                            WHERE uuf.friendId = ?) 
                            OR m.owner = (SELECT uuf.friendId FROM usersToUsersFriendMap uuf 
                                            WHERE uuf.userId = ?))`    
    res.locals.connection.query(qryString, [filePath, filename, user.id, user.id, user.id], (error, results, fields)=>{
        console.log(results);
        if(error){
            res.status(404).send({'message': error.message});
            return;
        }
        //if we have a result, then we should be able to show it
        if(results.length > 0){
            return next();
        }else{
            res.status(403).send({'message': `User is not authorized to view media item`});
            return;
        }
    });
    //return next();
}, express.static("media"));

app.use(express.static("public"));

app.use('/', routes);

let sockets = require('./sockets');
sockets.socketServer(app, server, connection);

server.listen(port, ()=>{
    console.log(`Server now running on port: ${port}`);
});
