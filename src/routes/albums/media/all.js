module.exports = (req, res)=>{
    let limit = req.query.limit * 1;    
    let query = "SELECT * FROM media m INNER JOIN albumsToMediaMap amm ON m.id = amm.media WHERE amm.album = ? ORDER BY m.id ASC";
    if(limit){
        res.locals.connection.query(query + " LIMIT ?", [req.params.id, limit], (error, results, fields)=>{
            if(error) throw error;
            res.status(200).send(JSON.stringify(results));
            //res.locals.connection.end();
        });
    }else{
        res.locals.connection.query(query, [req.params.id], (error, results, fields)=>{
            if(error) throw error;
            res.status(200).send(JSON.stringify(results));            
            //res.locals.connection.end();
        });
    }
};