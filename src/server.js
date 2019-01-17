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
//const io = require('socket.io').listen(server);
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
            //console.log(results.data[0]);
            results = JSON.stringify(results.data[0]);
            let user = new User(results);
            let allowed = user.verifyPassword(password);
            if(!allowed){
                return done(null, false, {message: 'Wrong or invalid password specified'});
            } else {
                //confirm user role for use later
                /*let queryString = "SELECT userRoleId FROM userRolesToUsersMap ur INNER JOIN users u ON u.id = ur.userId WHERE u.email=?";
                connection.query(queryString, [email], (error, results, fields)=>{
                    //if(error) throw error;
                    //console.log(results[0].userRoleId);
                    results[0].userRoleId === 'Administrator' ? user.role = 'Administrator' : user.role = 'User';
                    return done(null, user);
                });*/
                axios.get(`http://localhost:8080/api/auth/role?user=${user.id}`).then(results=>{
                    //console.log(results.data);    
                    user.role = results.data.role;
                    return done(null, user);
                });         
                //return done(null, user);
            }
        }).catch(error => done(error));
    }
));
passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser((id, done)=>{
    axios.get(`http://localhost:8080/api/users/${id}`).then(results=>{
        //console.log(results.data[0]);
        //results = JSON.stringify(results.data[0]);
        //console.log(results);
        //done(null, results);
        axios.get(`http://localhost:8080/api/auth/role?user=${id}`).then(results2=>{
            //console.log(results.data);    
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
    //from here: https://github.com/mysqljs/mysql#pooling-connections
    //every result gets a reference to the dbase connection pool
    //res.locals.connection.query("",(error, results, fields)=>{});
    //if need multiple serial queries, do things by hand:
    //res.locals.connection.getConnection((err, connection)=>{
    //  if(err) throw err;
    //  connection.query("", (error, results, fields)=>{
    //      //make additional queries here    
    //      connection.release();   //release connection when done
    //      if(error) throw error;
    //      //do any remaining tasks  
    //  })        
    //})
    res.locals.connection = connection;
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

app.use(express.static("public"));

app.use('/', routes);

let sockets = require('./sockets');
sockets.socketServer(app, server, connection);
//most of this is from here: https://code.tutsplus.com/tutorials/how-to-create-a-resumable-video-uploader-in-nodejs--net-25445
/*let upload_files = {};
let buffer = 10485760;
let chunk = 524288;
io.on('connection', (socket)=>{
    let id = uuid();
    console.log(`A new socket.io connection was established [${id}]`);
    socket.on('disconnect', ()=>{
        console.log(`Socket [${id}] disconnected`);
    });
    socket.on('start_upload', (data) => {
        let name = data.name;
        upload_files[name] = {
            filename    : `/tmp/${name}`,
            fileSize    : data.size,
            data        : "",
            downloaded  : 0,
            start       : performance.now()
        };
        let place = 0;
        try{
            let stat = fs.statSync(upload_files[name].filename);
            if(stat.isFile()){
                upload_files[name].downloaded = stat.size;
                place = stat.size / chunk;     //send file in .5 MB chunks
            }
        } catch(err){}  //new file
        fs.open(upload_files[name].filename, "a", "0755", (err, fd)=>{
            if(err){
                console.log(err);
                return;
            }
            upload_files[name].handler = fd;
            socket.emit(`next_upload_chunk_${name}`, {'place' : place, 'percent' : 0});
        });
    });
    socket.on('upload', (data) => {
        let name = data.name;
        let file = upload_files[name];
        file.downloaded += data.data.length;
        file.data += data.data;
        if(file.downloaded === file.fileSize){
            fs.write(file.handler, file.data, null, 'Binary', (err, written) => {
                //do something
                let time = (performance.now() - file.start) / 1000; //elapsed time in seconds
                let speed = (file.fileSize / 1000000) / time            //transer speed in Mbps
                socket.emit(`upload_done_${name}`, {'tmp_file' : file.filename, 'elapsed_time' : time, 'transfer_speed' : speed});
            });
        } else if(file.data.length > buffer){ //buffer is 10 MB and it's full
            fs.write(file.handler, file.data, null, 'Binary', (err, written) => {
                file.data = "";
                let place = file.downloaded / chunk;
                let percent = (file.downloaded / file.fileSize) * 100;
                socket.emit(`next_upload_chunk_${name}`, {'place' : place, 'percent' : percent});
            });
        } else {
            let place = file.downloaded / chunk;
            let percent = (file.downloaded / file.fileSize) * 100;
            socket.emit(`next_upload_chunk_${name}`, {'place' : place, 'percent' : percent});
        }
    });
});*/

server.listen(port, ()=>{
    console.log(`Server now running on port: ${port}`);
});
