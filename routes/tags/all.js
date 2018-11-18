module.exports = (req, res)=>{
    let limit = req.query.limit * 1;
    if(limit){
        res.locals.connection.query("SELECT * FROM tags ORDER BY id DESC LIMIT ?", [limit], (error, results, fields)=>{
            if(error) throw error;
            res.status(200).send(JSON.stringify(results));
            res.locals.connection.end();
        });
    }else{
        res.locals.connection.query("SELECT * FROM tags", (error, results, fields)=>{
            if(error) throw error;
            res.status(200).send(JSON.stringify(results));            
            res.locals.connection.end();
        });
    }
};