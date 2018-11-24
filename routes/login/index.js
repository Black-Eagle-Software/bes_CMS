const User = require('../../models/user');
const login = require('express').Router();


login.get('/', (req, res)=>{
    console.log(req.sessionID);
    res.send('Login page')
});

login.post('/', (req, res)=>{
    //attempted login.  check if they're a valid user from here.
    //console.log(req.body);
    res.locals.connection.query("SELECT * FROM users WHERE email=?", [req.body.email], (error, results, fields)=>{
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
    });    
});

module.exports = login;