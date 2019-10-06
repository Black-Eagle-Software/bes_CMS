const User = require('../../models/user');
const auth = require('express').Router();
const passport = require('passport');
const axios = require('axios');
const ServerConsole = require('../../helpers/serverConsole');


auth.get('/', (req, res)=>{
    ServerConsole.debug(`Auth get request session ID: ${req.sessionID}`);
    res.send('Login page');
});
auth.get('/check', (req, res)=>{
    req.isAuthenticated() ? res.status(200).send() : res.status(403).send();
});
auth.get('/logout', (req, res)=>{
    req.logout();
    res.status(200).redirect('/');
});
auth.get('/role', (req, res)=>{
    //check a user's role
    ServerConsole.debug(`Auth get role request user: ${req.query.user}`);
    let user = JSON.parse(req.query.user) //error check?
    let queryString = "SELECT userRoleId FROM userRolesToUsersMap ur INNER JOIN users u ON u.id = ur.userId WHERE u.id=?";
    res.locals.connection.query(queryString, [user], (error, results, fields)=>{
        if(error) throw error;
        if(results.count > 0 && results[0].userRoleId === 'Administrator'){
            res.status(200).send({'role': 'Administrator'});
        }else{
            res.status(200).send({'role': 'User'});
        }
    });
});

auth.post('/login', (req, res, next)=>{
    //attempted login.  check if they're a valid user from here.
    passport.authenticate('local', (err, user, info)=>{
        if(info) {
            return res.send(info.message);
        }
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(304).send('Not autheticated or authorized');
        }
        ServerConsole.debug(`req.session.passport ${JSON.stringify(req.session.passport)}`);
        ServerConsole.debug(`req.user ${JSON.stringify(req.user)}`);
        req.login(user, (err)=>{
            if(err){
                return next(err);
            }
            ServerConsole.debug(`req.session.passport ${JSON.stringify(req.session.passport)}`);
            ServerConsole.debug(`req.user ${JSON.stringify(req.user)}`);
            return res.status(200).send('Logged in');
        });
    })(req, res, next);    
});

auth.post('/register', (req, res, next)=>{
    ServerConsole.debug(`Auth post request body: ${req.body}`);        
    if(!req.body){
        res.status(403).send({'message':'Request body was undefined', 'req':req});
        return;
    }
    if(!req.body.name || !req.body.email || !req.body.password){
        res.status(403).send({'message': 'Could not add a new user: name, email, or password were not set'});
        return;
    }
    let data = {
        id: -1,
        name: req.body.name,
        email: req.body.email,
        password: '',
        salt: '',
        requiresPasswordReset: 'false'
    }
    let user = new User(JSON.stringify(data));
    user.setPassword(req.body.password);
    //add our user to the database
    let queryString = 'INSERT INTO users SET name=?, email=?, salt=?, password=?, requiresPasswordReset=?';
    res.locals.connection.query(queryString, [user.name, user.email, user.salt, user.password, user.requiresPasswordReset], (err, results, fields)=>{
        if(err){
            return next(err);
        }
        return res.status(200).send('User successfully registered');
    });
});

auth.post('/passwordChange', (req, res, next)=>{
    ServerConsole.debug(`Auth post pass change request body: ${req.body}`);
    //zeroth confirm that new pass is not the same as the old pass
    if(req.body.new_password === ''){
        return res.status(422).send({message: 'New password can not be empty'});
    }
    if(req.body.old_password === req.body.new_password){
        return res.status(422).send({message: 'New password can not be the same as the old password'});
    }
    //first confirm that the email is registered
    axios.get(`http://localhost:8080/api/users?email=${req.body.email}`).then(results=>{
        if(results.data[0] === undefined){
            return done('No user entry found', null);
        }
        results = JSON.stringify(results.data[0]);
        let user = new User(results);
        //now confirm the old password is correct
        let challenge = user.verifyPassword(req.body.old_password);
        if(!challenge.allowed){
            return res.status(401).send({message: 'Wrong or invalid password specified'});
        } else {
            //only now do we update the password and salt
            user.setPassword(req.body.new_password);
            let queryString = 'UPDATE users SET salt=?, password=?, requiresPasswordReset=? WHERE id=?';
            res.locals.connection.query(queryString, [user.salt, user.password, 'false', user.id], (err, results, fields)=>{
                if(err){
                    return next(err);
                }
                return res.status(200).send('User password successfully updated');
            });           
        }        
    });    
});

module.exports = auth;