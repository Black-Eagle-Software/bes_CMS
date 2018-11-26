//const User = require('../../models/user.js');

module.exports = (req, res)=>{
    //return a specific user
    res.locals.connection.query("SELECT * FROM users WHERE id=?", [req.params.id], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid user ID specified");
        }else{
            //let user = new User(JSON.stringify(results));
            //user.verifyPassword("Wr3tch3d");
            //user.setPassword("Penis");
            res.status(200).send(JSON.stringify(results));            
        }
        //res.locals.connection.end();
    });
};