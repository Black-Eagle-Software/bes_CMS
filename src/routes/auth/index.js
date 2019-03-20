const User = require('../../models/user');
const auth = require('express').Router();
const passport = require('passport');


auth.get('/', (req, res)=>{
    console.log(req.sessionID);
    res.send('Login page');
});
auth.get('/check', (req, res)=>{
    //console.log(req.isAuthenticated());
    req.isAuthenticated() ? res.status(200).send() : res.status(403).send();
});
auth.get('/logout', (req, res)=>{
    req.logout();
    res.status(200).redirect('/');
});
auth.get('/role', (req, res)=>{
    //check a user's role
    console.log(req.query.user);
    let user = JSON.parse(req.query.user) //error check?
    let queryString = "SELECT userRoleId FROM userRolesToUsersMap ur INNER JOIN users u ON u.id = ur.userId WHERE u.id=?";
    res.locals.connection.query(queryString, [user], (error, results, fields)=>{
        if(error) throw error;
        //console.log(results[0].userRoleId);
        if(results.count > 0 && results[0].userRoleId === 'Administrator'){
            res.status(200).send({'role': 'Administrator'});
        }else{
            res.status(200).send({'role': 'User'});
        }
    });
});

auth.post('/login', (req, res, next)=>{
    //attempted login.  check if they're a valid user from here.
    //console.log(req.body);
    /*res.locals.connection.query("SELECT * FROM users WHERE email=?", [req.body.email], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid user email specified");
        }else{
            //email exists in the database, so now check the password
            let user = new User(JSON.stringify(results));
            let allowed = user.verifyPassword(req.body.password);
            if(!allowed){
                res.status(401).send("Invalid password specified");
            } else {            
                res.status(200).send("Login successful");            
            }
        }
        res.locals.connection.end();
    });*/
    passport.authenticate('local', (err, user, info)=>{
        if(info) {
            return res.send(info.message);
        }
        if(err){
            return next(err);
        }
        if(!user){
            //return res.redirect('/');   //questionable
            return res.status(304).send('Not autheticated or authorized');
        }
        console.log(`req.session.passport ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user ${JSON.stringify(req.user)}`);
        req.login(user, (err)=>{
            if(err){
                return next(err);
            }
            console.log(`req.session.passport ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user ${JSON.stringify(req.user)}`);
            return res.status(200).send('Logged in');
            //return res.status(200).redirect('/home');
        });
    })(req, res, next);    
});

auth.post('/register', (req, res, next)=>{
    console.log(req.body);        
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
        requiresPasswordReset: false
    }
    let user = new User(JSON.stringify(data));
    console.log(user);
    user.setPassword(req.body.password);
    console.log(user);
    //add our user to the database
    let queryString = 'INSERT INTO users SET name=?, email=?, salt=?, password=?, requiresPasswordReset=?';
    res.locals.connection.query(queryString, [user.name, user.email, user.salt, user.password, user.requiresPasswordReset], (err, results, fields)=>{
        if(err){
            return next(err);
        }
        return res.status(200).send('User successfully registered');
    });
});

module.exports = auth;