module.exports = (req, res)=>{
    let email = req.query.email;
    if(email){
        res.locals.connection.query("SELECT * FROM users WHERE email=?", email, (error, results, fields)=>{
            if(error) return done(error);
            res.status(200).send(JSON.stringify(results));
        });
    }else{
        res.locals.connection.query("SELECT * FROM users", (error, results, fields)=>{
            if(error) throw error;
            res.status(200).send(JSON.stringify(results));                    
            //res.locals.connection.end();
        });
    }
};