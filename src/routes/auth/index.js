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

module.exports = auth;