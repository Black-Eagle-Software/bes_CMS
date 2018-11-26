const User = require('../../models/user');
const login = require('express').Router();
const passport = require('passport');


login.get('/', (req, res)=>{
    console.log(req.sessionID);
    res.send('Login page')
});

login.post('/', (req, res, next)=>{
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
        console.log(`req.session.passport ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user ${JSON.stringify(req.user)}`);
        req.login(user, (err)=>{
            console.log(`req.session.passport ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user ${JSON.stringify(req.user)}`);
            return res.send('Logged in');
        });
    })(req, res, next);    
});

module.exports = login;