module.exports = (req, res)=>{
    let limit = req.query.limit * 1;
    let queryString = "SELECT * FROM media WHERE owner=? ORDER BY id DESC";
    if(limit){
        res.locals.connection.query(queryString + " LIMIT ?", [req.params.id, limit], (error, results, fields)=>{
            if(error) throw error;
            if(results.length === 0){
                res.status(404).send("Invalid user ID specified or no media exists");
            }else{
                res.status(200).send(JSON.stringify(results));            
            }
        });
    } else{
        res.locals.connection.query(queryString, [req.params.id], (error, results, fields)=>{
            if(error) throw error;
            if(results.length === 0){
                res.status(404).send("Invalid user ID specified or no media exists");
            }else{
                res.status(200).send(JSON.stringify(results));            
            }
        });
    }    
};