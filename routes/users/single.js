module.exports = (req, res)=>{
    //return a specific user
    res.locals.connection.query("SELECT * FROM users WHERE id=?", [req.params.id], (error, results, fields)=>{
        if(error) throw error;
        if(results.length === 0){
            res.status(404).send("Invalid user ID specified");
        }else{
            res.status(200).send(JSON.stringify(results));            
        }
        res.locals.connection.end();
    });
};